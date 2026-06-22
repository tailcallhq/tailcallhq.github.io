import React, {useEffect, useMemo, useState} from "react"
import CodeBlock from "@theme/CodeBlock"
import Heading from "@theme/Heading"

const SCHEMA_URL = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

type JsonScalar = string | number | boolean | null
type JsonValue = JsonScalar | JsonObject | JsonValue[]
type JsonObject = {
  [key: string]: JsonValue
}

type JsonSchema = {
  $ref?: string
  $defs?: Record<string, JsonSchema>
  definitions?: Record<string, JsonSchema>
  anyOf?: JsonSchema[]
  oneOf?: JsonSchema[]
  allOf?: JsonSchema[]
  default?: JsonValue
  description?: string
  enum?: JsonValue[]
  items?: JsonSchema
  properties?: Record<string, JsonSchema>
  required?: string[]
  title?: string
  type?: string | string[]
}

type OutputFormat = "json" | "yaml" | "graphql"

const isObject = (value: JsonValue | undefined): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const cloneObject = (value: JsonObject): JsonObject => JSON.parse(JSON.stringify(value)) as JsonObject

const getJsonPointer = (schema: JsonSchema, pointer: string): JsonSchema | undefined => {
  const parts = pointer
    .replace(/^#\//, "")
    .split("/")
    .map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"))

  let current: unknown = schema
  for (const part of parts) {
    if (typeof current !== "object" || current === null || !(part in current)) {
      return undefined
    }
    current = (current as Record<string, unknown>)[part]
  }

  return typeof current === "object" && current !== null ? (current as JsonSchema) : undefined
}

const resolveSchema = (schema: JsonSchema, root: JsonSchema): JsonSchema => {
  if (schema.$ref) {
    const referenced = getJsonPointer(root, schema.$ref)
    return referenced ? resolveSchema(referenced, root) : schema
  }

  const composed = schema.anyOf?.[0] || schema.oneOf?.[0]
  if (composed) {
    return {...schema, ...resolveSchema(composed, root)}
  }

  if (schema.allOf?.length) {
    return schema.allOf.reduce<JsonSchema>((merged, entry) => ({...merged, ...resolveSchema(entry, root)}), schema)
  }

  return schema
}

const getSchemaType = (schema: JsonSchema): string => {
  if (Array.isArray(schema.type)) {
    return schema.type.find((entry) => entry !== "null") || "string"
  }

  if (schema.type) {
    return schema.type
  }

  if (schema.properties) {
    return "object"
  }

  if (schema.items) {
    return "array"
  }

  return "string"
}

const createInitialValue = (schema: JsonSchema, root: JsonSchema): JsonValue => {
  const resolved = resolveSchema(schema, root)

  if (resolved.default !== undefined) {
    return resolved.default
  }

  if (resolved.enum?.length) {
    return resolved.enum[0]
  }

  switch (getSchemaType(resolved)) {
    case "boolean":
      return false
    case "integer":
    case "number":
      return 0
    case "array":
      return []
    case "object":
      return {}
    default:
      return ""
  }
}

const formatScalar = (value: JsonValue): string => {
  if (value === null) {
    return "null"
  }

  if (typeof value === "string") {
    return value
  }

  return String(value)
}

const toYaml = (value: JsonValue, level = 0): string => {
  const pad = "  ".repeat(level)

  if (Array.isArray(value)) {
    if (!value.length) {
      return "[]"
    }

    return value
      .map((entry) => {
        if (isObject(entry) || Array.isArray(entry)) {
          return `${pad}-\n${toYaml(entry, level + 1)}`
        }
        return `${pad}- ${formatScalar(entry)}`
      })
      .join("\n")
  }

  if (isObject(value)) {
    const entries = Object.entries(value).filter(([, entry]) => entry !== "" && entry !== undefined)
    if (!entries.length) {
      return "{}"
    }

    return entries
      .map(([key, entry]) => {
        if (isObject(entry) || Array.isArray(entry)) {
          return `${pad}${key}:\n${toYaml(entry, level + 1)}`
        }
        return `${pad}${key}: ${formatScalar(entry)}`
      })
      .join("\n")
  }

  return `${pad}${formatScalar(value)}`
}

const scalarDirectiveArgs = (value: JsonValue): string => {
  if (!isObject(value)) {
    return ""
  }

  return Object.entries(value)
    .filter(([, entry]) => !isObject(entry) && !Array.isArray(entry) && entry !== "")
    .map(([key, entry]) => {
      if (typeof entry === "string") {
        return `${key}: "${entry}"`
      }
      return `${key}: ${String(entry)}`
    })
    .join(" ")
}

const toGraphQLPreview = (config: JsonObject): string => {
  const schemaConfig = isObject(config.schema) ? config.schema : {}
  const schemaLines = [
    "schema",
    ...["server", "upstream", "telemetry"]
      .filter((key) => config[key] !== undefined)
      .map((key) => {
        const args = scalarDirectiveArgs(config[key])
        return args ? `  @${key}(${args})` : `  @${key}`
      }),
    "{",
    `  query: ${typeof schemaConfig.query === "string" && schemaConfig.query ? schemaConfig.query : "Query"}`,
  ]

  if (typeof schemaConfig.mutation === "string" && schemaConfig.mutation) {
    schemaLines.push(`  mutation: ${schemaConfig.mutation}`)
  }

  if (typeof schemaConfig.subscription === "string" && schemaConfig.subscription) {
    schemaLines.push(`  subscription: ${schemaConfig.subscription}`)
  }

  schemaLines.push("}", "", "type Query {", "  _tailcallConfig: String", "}")

  return schemaLines.join("\n")
}

const downloadText = (name: string, text: string): void => {
  const blob = new Blob([text], {type: "text/plain;charset=utf-8"})
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = name
  link.click()
  URL.revokeObjectURL(link.href)
}

const updateAtPath = (source: JsonObject, path: string[], value: JsonValue): JsonObject => {
  const next = cloneObject(source)
  let cursor: JsonObject = next

  path.slice(0, -1).forEach((part) => {
    if (!isObject(cursor[part])) {
      cursor[part] = {}
    }
    cursor = cursor[part] as JsonObject
  })

  cursor[path[path.length - 1]] = value
  return next
}

const removeAtPath = (source: JsonObject, path: string[]): JsonObject => {
  const next = cloneObject(source)
  let cursor: JsonObject = next

  path.slice(0, -1).forEach((part) => {
    if (!isObject(cursor[part])) {
      return
    }
    cursor = cursor[part] as JsonObject
  })

  delete cursor[path[path.length - 1]]
  return next
}

const getValueAtPath = (source: JsonObject, path: string[]): JsonValue | undefined =>
  path.reduce<JsonValue | undefined>((value, part) => (isObject(value) ? value[part] : undefined), source)

const FieldPicker = ({
  existingKeys,
  id,
  onAdd,
  schema,
}: {
  existingKeys: string[]
  id: string
  onAdd: (fieldName: string) => void
  schema: JsonSchema
}): JSX.Element | null => {
  const options = Object.keys(schema.properties || {}).filter((key) => !existingKeys.includes(key)).sort()
  const [selected, setSelected] = useState(options[0] || "")

  useEffect(() => {
    setSelected(options[0] || "")
  }, [options.join("|")])

  if (!options.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-SPACE_02 rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_04 md:flex-row md:items-center">
      <label htmlFor={id} className="font-space-grotesk text-content-small font-semibold">
        Add field
      </label>
      <input
        id={id}
        list={`${id}-options`}
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
        className="min-h-11 flex-1 rounded-lg border border-solid border-tailCall-border-light-500 px-SPACE_03"
        placeholder="Search schema fields"
      />
      <datalist id={`${id}-options`}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
      <button
        type="button"
        className="rounded-lg bg-tailCall-yellow px-SPACE_04 py-SPACE_02 font-bold text-black"
        disabled={!options.includes(selected)}
        onClick={() => onAdd(selected)}
      >
        Add
      </button>
    </div>
  )
}

const ConfigGenerator = (): JSX.Element => {
  const [schema, setSchema] = useState<JsonSchema | null>(null)
  const [schemaError, setSchemaError] = useState<string>("")
  const [config, setConfig] = useState<JsonObject>({})
  const [format, setFormat] = useState<OutputFormat>("json")

  useEffect(() => {
    const loadSchema = async () => {
      try {
        const response = await fetch(SCHEMA_URL)
        if (!response.ok) {
          throw new Error(`Schema request failed with ${response.status}`)
        }
        setSchema((await response.json()) as JsonSchema)
      } catch (error) {
        setSchemaError(error instanceof Error ? error.message : "Unable to load the Tailcall schema")
      }
    }

    void loadSchema()
  }, [])

  const output = useMemo(() => {
    if (format === "yaml") {
      return toYaml(config)
    }

    if (format === "graphql") {
      return toGraphQLPreview(config)
    }

    return JSON.stringify(config, null, 2)
  }, [config, format])

  const fileName = format === "yaml" ? "tailcall-config.yaml" : format === "graphql" ? "tailcall-config.graphql" : "tailcall-config.json"

  const addField = (path: string[], parentSchema: JsonSchema, fieldName: string) => {
    if (!schema || !parentSchema.properties?.[fieldName]) {
      return
    }

    setConfig(updateAtPath(config, [...path, fieldName], createInitialValue(parentSchema.properties[fieldName], schema)))
  }

  const renderField = (path: string[], fieldSchema: JsonSchema, value: JsonValue | undefined): JSX.Element | null => {
    if (!schema) {
      return null
    }

    const resolved = resolveSchema(fieldSchema, schema)
    const type = getSchemaType(resolved)
    const key = path.join(".")
    const label = path[path.length - 1]
    const description = resolved.description || resolved.title

    if (type === "object") {
      const objectValue = isObject(value) ? value : {}
      const existingKeys = Object.keys(objectValue)

      return (
        <div key={key} className="rounded-xl border border-solid border-tailCall-border-light-500 bg-white p-SPACE_04">
          <div className="mb-SPACE_03 flex items-start justify-between gap-SPACE_04">
            <div>
              <h3 className="m-0 text-content-large font-bold">{label}</h3>
              {description && <p className="m-0 mt-SPACE_01 text-content-small text-tailCall-light-700">{description}</p>}
            </div>
            <button
              type="button"
              className="rounded-lg border border-solid border-tailCall-border-light-500 px-SPACE_03 py-SPACE_01"
              onClick={() => setConfig(removeAtPath(config, path))}
            >
              Remove
            </button>
          </div>
          <div className="flex flex-col gap-SPACE_03">
            {existingKeys.map((childKey) =>
              renderField([...path, childKey], resolved.properties?.[childKey] || {}, getValueAtPath(config, [...path, childKey])),
            )}
            <FieldPicker
              id={`field-picker-${key || "root"}`}
              existingKeys={existingKeys}
              schema={resolved}
              onAdd={(fieldName) => addField(path, resolved, fieldName)}
            />
          </div>
        </div>
      )
    }

    if (type === "array") {
      return (
        <div key={key} className="rounded-xl border border-solid border-tailCall-border-light-500 bg-white p-SPACE_04">
          <div className="mb-SPACE_02 flex items-start justify-between gap-SPACE_04">
            <label htmlFor={key} className="font-bold">
              {label}
            </label>
            <button
              type="button"
              className="rounded-lg border border-solid border-tailCall-border-light-500 px-SPACE_03 py-SPACE_01"
              onClick={() => setConfig(removeAtPath(config, path))}
            >
              Remove
            </button>
          </div>
          {description && <p className="mt-0 text-content-small text-tailCall-light-700">{description}</p>}
          <textarea
            id={key}
            value={JSON.stringify(Array.isArray(value) ? value : [], null, 2)}
            onChange={(event) => {
              try {
                const nextValue = JSON.parse(event.target.value) as JsonValue
                setConfig(updateAtPath(config, path, Array.isArray(nextValue) ? nextValue : []))
              } catch {
                return
              }
            }}
            className="min-h-32 w-full rounded-lg border border-solid border-tailCall-border-light-500 p-SPACE_03 font-mono"
          />
        </div>
      )
    }

    return (
      <div key={key} className="rounded-xl border border-solid border-tailCall-border-light-500 bg-white p-SPACE_04">
        <div className="mb-SPACE_02 flex items-start justify-between gap-SPACE_04">
          <label htmlFor={key} className="font-bold">
            {label}
          </label>
          <button
            type="button"
            className="rounded-lg border border-solid border-tailCall-border-light-500 px-SPACE_03 py-SPACE_01"
            onClick={() => setConfig(removeAtPath(config, path))}
          >
            Remove
          </button>
        </div>
        {description && <p className="mt-0 text-content-small text-tailCall-light-700">{description}</p>}
        {resolved.enum?.length ? (
          <>
            <input
              id={key}
              list={`${key}-enum-options`}
              value={formatScalar(value || "")}
              onChange={(event) => setConfig(updateAtPath(config, path, event.target.value))}
              className="min-h-11 w-full rounded-lg border border-solid border-tailCall-border-light-500 px-SPACE_03"
            />
            <datalist id={`${key}-enum-options`}>
              {resolved.enum.map((option) => (
                <option key={formatScalar(option)} value={formatScalar(option)} />
              ))}
            </datalist>
          </>
        ) : type === "boolean" ? (
          <input
            id={key}
            type="checkbox"
            checked={value === true}
            onChange={(event) => setConfig(updateAtPath(config, path, event.target.checked))}
          />
        ) : (
          <input
            id={key}
            type={type === "number" || type === "integer" ? "number" : "text"}
            value={formatScalar(value || "")}
            onChange={(event) => {
              const nextValue =
                type === "number" || type === "integer" ? Number(event.target.value) : event.target.value
              setConfig(updateAtPath(config, path, nextValue))
            }}
            className="min-h-11 w-full rounded-lg border border-solid border-tailCall-border-light-500 px-SPACE_03"
          />
        )}
      </div>
    )
  }

  if (schemaError) {
    return (
      <section className="mx-auto max-w-5xl px-SPACE_04 py-SPACE_12">
        <Heading as="h1">Config Generator</Heading>
        <p>Unable to load the Tailcall schema: {schemaError}</p>
      </section>
    )
  }

  if (!schema) {
    return (
      <section className="mx-auto max-w-5xl px-SPACE_04 py-SPACE_12">
        <Heading as="h1">Config Generator</Heading>
        <p>Loading Tailcall schema...</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-SPACE_04 py-SPACE_12">
      <div className="mb-SPACE_08 max-w-3xl">
        <Heading as="h1" className="text-display-tiny md:text-display-small">
          Tailcall Config Generator
        </Heading>
        <p className="text-content-medium">
          Build a Tailcall configuration from the generated schema, keep fields discoverable with search, and download
          the result without leaving the playground flow.
        </p>
        <p className="text-content-small">
          Schema source: <a href={SCHEMA_URL}>generated .tailcallrc.schema.json</a>
        </p>
      </div>

      <div className="grid gap-SPACE_06 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)]">
        <div className="flex flex-col gap-SPACE_04">
          <FieldPicker
            id="root-field-picker"
            existingKeys={Object.keys(config)}
            schema={schema}
            onAdd={(fieldName) => addField([], schema, fieldName)}
          />
          {Object.entries(config).map(([key, value]) => renderField([key], schema.properties?.[key] || {}, value))}
        </div>

        <aside className="h-fit rounded-2xl border border-solid border-tailCall-border-light-500 bg-white p-SPACE_04 lg:sticky lg:top-SPACE_06">
          <div className="mb-SPACE_04 flex flex-col gap-SPACE_03 md:flex-row md:items-center md:justify-between">
            <label htmlFor="config-output-format" className="font-bold">
              Output
            </label>
            <select
              id="config-output-format"
              value={format}
              onChange={(event) => setFormat(event.target.value as OutputFormat)}
              className="min-h-11 rounded-lg border border-solid border-tailCall-border-light-500 px-SPACE_03"
            >
              <option value="json">JSON</option>
              <option value="yaml">YAML</option>
              <option value="graphql">GraphQL preview</option>
            </select>
          </div>
          {format === "graphql" && (
            <p className="text-content-small">
              The GraphQL preview covers schema-level scalar directives. Use JSON or YAML for the complete generated
              configuration.
            </p>
          )}
          <CodeBlock language={format === "yaml" ? "yaml" : format === "graphql" ? "graphql" : "json"}>{output}</CodeBlock>
          <button
            type="button"
            className="mt-SPACE_04 w-full rounded-lg bg-tailCall-yellow px-SPACE_04 py-SPACE_03 font-bold text-black"
            onClick={() => downloadText(fileName, output)}
          >
            Download {fileName}
          </button>
        </aside>
      </div>
    </section>
  )
}

export default ConfigGenerator
