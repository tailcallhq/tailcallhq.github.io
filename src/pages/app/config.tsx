import React, {useEffect, useMemo, useState} from "react"
import Layout from "@theme/Layout"

const SCHEMA_URL = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

type JsonSchema = {
  title?: string
  description?: string
  type?: string | string[]
  properties?: Record<string, JsonSchema>
  definitions?: Record<string, JsonSchema>
  required?: string[]
  default?: unknown
  enum?: unknown[]
  items?: JsonSchema
  allOf?: JsonSchema[]
  anyOf?: JsonSchema[]
  oneOf?: JsonSchema[]
  $ref?: string
}

type ConfigValue = string | number | boolean | null | ConfigObject | ConfigValue[]

interface ConfigObject {
  [key: string]: ConfigValue
}

const isObject = (value: unknown): value is ConfigObject =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const getSchemaType = (schema: JsonSchema): string => {
  if (Array.isArray(schema.type)) {
    return schema.type.find((type) => type !== "null") || "string"
  }

  return schema.type || "object"
}

const resolveSchema = (schema: JsonSchema, root: JsonSchema): JsonSchema => {
  if (schema.$ref?.startsWith("#/definitions/")) {
    const definitionName = schema.$ref.replace("#/definitions/", "")
    return root.definitions?.[definitionName] || schema
  }

  const composedSchema = schema.allOf?.[0] || schema.anyOf?.find((item) => item.type !== "null") || schema.oneOf?.[0]
  if (composedSchema) {
    return {...schema, ...resolveSchema(composedSchema, root)}
  }

  return schema
}

const coerceValue = (rawValue: string, schema: JsonSchema): ConfigValue | undefined => {
  if (rawValue.trim() === "") return undefined

  const schemaType = getSchemaType(schema)

  if (schemaType === "integer" || schemaType === "number") {
    const parsed = Number(rawValue)
    return Number.isFinite(parsed) ? parsed : undefined
  }

  if (schemaType === "boolean") {
    return rawValue === "true"
  }

  if (schemaType === "array") {
    return rawValue
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  }

  return rawValue
}

const pruneEmpty = (value: ConfigValue | undefined): ConfigValue | undefined => {
  if (Array.isArray(value)) {
    const nextValue = value.map(pruneEmpty).filter((item): item is ConfigValue => item !== undefined)
    return nextValue.length > 0 ? nextValue : undefined
  }

  if (isObject(value)) {
    const nextValue = Object.entries(value).reduce<ConfigObject>((result, [key, entry]) => {
      const pruned = pruneEmpty(entry)
      if (pruned !== undefined) result[key] = pruned
      return result
    }, {})

    return Object.keys(nextValue).length > 0 ? nextValue : undefined
  }

  return value
}

const setPathValue = (source: ConfigObject, path: string[], value: ConfigValue | undefined): ConfigObject => {
  const [head, ...rest] = path
  if (!head) return source

  if (rest.length === 0) {
    const next = {...source}
    if (value === undefined) {
      delete next[head]
    } else {
      next[head] = value
    }
    return next
  }

  const child = isObject(source[head]) ? (source[head] as ConfigObject) : {}
  const nextChild = setPathValue(child, rest, value)
  const next = {...source}

  if (Object.keys(nextChild).length === 0) {
    delete next[head]
  } else {
    next[head] = nextChild
  }

  return next
}

const getPathValue = (source: ConfigObject, path: string[]): ConfigValue | undefined => {
  return path.reduce<ConfigValue | undefined>((value, key) => {
    if (!isObject(value)) return undefined
    return value[key]
  }, source)
}

const FieldControl = ({
  config,
  rootSchema,
  schema,
  path,
  onChange,
}: {
  config: ConfigObject
  rootSchema: JsonSchema
  schema: JsonSchema
  path: string[]
  onChange: (nextConfig: ConfigObject) => void
}) => {
  const resolvedSchema = resolveSchema(schema, rootSchema)
  const schemaType = getSchemaType(resolvedSchema)
  const id = path.join(".")
  const value = getPathValue(config, path)
  const stringValue = Array.isArray(value)
    ? value.join(", ")
    : value === undefined || isObject(value)
      ? ""
      : String(value)

  if (schemaType === "object" && resolvedSchema.properties) {
    return (
      <fieldset className="rounded-xl border border-solid border-tailCall-border-light-500 p-SPACE_04">
        <legend className="px-SPACE_02 font-space-grotesk text-lg font-semibold">{path[path.length - 1]}</legend>
        <div className="grid gap-SPACE_04 md:grid-cols-2">
          {Object.entries(resolvedSchema.properties).map(([propertyName, propertySchema]) => (
            <FieldControl
              key={`${id}.${propertyName}`}
              config={config}
              rootSchema={rootSchema}
              schema={propertySchema}
              path={[...path, propertyName]}
              onChange={onChange}
            />
          ))}
        </div>
      </fieldset>
    )
  }

  const handleValueChange = (rawValue: string) => {
    onChange(setPathValue(config, path, coerceValue(rawValue, resolvedSchema)))
  }

  return (
    <label className="flex flex-col gap-SPACE_02 rounded-lg border border-solid border-tailCall-border-light-500 p-SPACE_04">
      <span className="font-space-grotesk text-base font-semibold">{path[path.length - 1]}</span>
      {resolvedSchema.description && (
        <span className="text-sm text-tailCall-light-700">{resolvedSchema.description}</span>
      )}
      {schemaType === "boolean" ? (
        <select
          value={stringValue}
          onChange={(event) => handleValueChange(event.target.value)}
          className="h-11 rounded-lg border border-solid border-tailCall-border-light-500 bg-white px-SPACE_03"
        >
          <option value="">Not set</option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      ) : (
        <>
          <input
            list={resolvedSchema.enum ? `${id}-options` : undefined}
            value={stringValue}
            onChange={(event) => handleValueChange(event.target.value)}
            className="h-11 rounded-lg border border-solid border-tailCall-border-light-500 px-SPACE_03"
            placeholder={schemaType === "array" ? "Comma-separated values" : String(resolvedSchema.default ?? "")}
            type={schemaType === "integer" || schemaType === "number" ? "number" : "text"}
          />
          {resolvedSchema.enum && (
            <datalist id={`${id}-options`}>
              {resolvedSchema.enum.map((option) => (
                <option key={String(option)} value={String(option)} />
              ))}
            </datalist>
          )}
        </>
      )}
    </label>
  )
}

const ConfigGeneratorPage = () => {
  const [schema, setSchema] = useState<JsonSchema | null>(null)
  const [config, setConfig] = useState<ConfigObject>({})
  const [activeSection, setActiveSection] = useState("")
  const [status, setStatus] = useState("Loading Tailcall schema...")

  useEffect(() => {
    const loadSchema = async () => {
      try {
        const response = await fetch(SCHEMA_URL)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const nextSchema = (await response.json()) as JsonSchema
        setSchema(nextSchema)
        setActiveSection(Object.keys(nextSchema.properties || {})[0] || "")
        setStatus("Schema loaded from Tailcall main branch.")
      } catch (error) {
        setStatus(`Unable to load schema: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    loadSchema()
  }, [])

  const sectionNames = useMemo(() => Object.keys(schema?.properties || {}), [schema])
  const generatedConfig = pruneEmpty(config) || {}
  const generatedJson = JSON.stringify(generatedConfig, null, 2)

  const downloadConfig = () => {
    const blob = new Blob([generatedJson], {type: "application/json"})
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = ".tailcallrc.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Layout title="Tailcall Config Generator" description="Build Tailcall runtime configuration from the live schema.">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-SPACE_06 px-SPACE_04 py-SPACE_08">
        <header className="flex flex-col gap-SPACE_03">
          <p className="font-space-grotesk text-sm uppercase tracking-wide text-tailCall-light-700">
            Tailcall configuration
          </p>
          <h1 className="font-space-grotesk text-4xl font-bold md:text-5xl">Config generator</h1>
          <p className="max-w-3xl text-lg text-tailCall-light-700">
            Build a runtime config from the latest Tailcall JSON schema, preview the generated file, and download a
            ready-to-edit `.tailcallrc.json`.
          </p>
          <p className="text-sm text-tailCall-light-700">{status}</p>
        </header>

        {schema && (
          <div className="grid gap-SPACE_06 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
            <section className="flex flex-col gap-SPACE_05">
              <label className="flex flex-col gap-SPACE_02">
                <span className="font-space-grotesk text-base font-semibold">Config section</span>
                <input
                  list="config-sections"
                  value={activeSection}
                  onChange={(event) => setActiveSection(event.target.value)}
                  className="h-12 rounded-lg border border-solid border-tailCall-border-light-500 px-SPACE_03"
                />
                <datalist id="config-sections">
                  {sectionNames.map((sectionName) => (
                    <option key={sectionName} value={sectionName} />
                  ))}
                </datalist>
              </label>

              {activeSection && schema.properties?.[activeSection] && (
                <FieldControl
                  config={config}
                  rootSchema={schema}
                  schema={schema.properties[activeSection]}
                  path={[activeSection]}
                  onChange={setConfig}
                />
              )}
            </section>

            <aside className="flex flex-col gap-SPACE_04 lg:sticky lg:top-SPACE_06 lg:h-fit">
              <div className="flex items-center justify-between gap-SPACE_03">
                <h2 className="font-space-grotesk text-2xl font-semibold">Preview</h2>
                <button
                  type="button"
                  onClick={downloadConfig}
                  className="rounded-lg bg-tailCall-dark-600 px-SPACE_04 py-SPACE_03 font-space-grotesk text-white"
                >
                  Download
                </button>
              </div>
              <pre className="max-h-[70vh] overflow-auto rounded-xl bg-tailCall-dark-700 p-SPACE_04 text-sm text-white">
                <code>{generatedJson}</code>
              </pre>
            </aside>
          </div>
        )}
      </main>
    </Layout>
  )
}

export default ConfigGeneratorPage
