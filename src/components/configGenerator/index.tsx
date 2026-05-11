import React, {useEffect, useMemo, useState} from "react"
import {Check, Copy, Download, ExternalLink, Plus, Search, Trash2} from "lucide-react"

type JsonSchema = {
  properties?: Record<string, SchemaProperty>
  definitions?: Record<string, SchemaProperty>
}

type SchemaProperty = {
  type?: string | string[]
  description?: string
  enum?: string[]
  items?: SchemaProperty
  properties?: Record<string, SchemaProperty>
  anyOf?: SchemaProperty[]
  allOf?: SchemaProperty[]
  $ref?: string
  minimum?: number
}

type LinkInput = {
  id: string
  type: string
  src: string
}

const schemaUrl = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

const linkTypes = ["Config", "Protobuf", "Grpc"]
const sectionNames = ["server", "upstream", "telemetry", "links"]

const defaultConfig = {
  server: {
    port: 8000,
    hostname: "0.0.0.0",
    introspection: true,
  },
  upstream: {
    httpCache: 42,
    timeout: 30,
  },
  telemetry: {
    requestHeaders: [],
  },
  links: [] as LinkInput[],
}

const fieldInputClasses =
  "w-full rounded-md border border-solid border-tailCall-border-light-500 bg-white px-SPACE_03 py-SPACE_02 font-space-grotesk text-content-tiny outline-none focus:border-tailCall-dark-700"
const labelClasses = "mb-SPACE_01 block text-content-tiny font-bold text-tailCall-dark-500"

const resolveRef = (schema: JsonSchema | null, property?: SchemaProperty): SchemaProperty | undefined => {
  if (!property) return undefined
  if (property.$ref && schema?.definitions) {
    const key = property.$ref.replace("#/definitions/", "")
    return schema.definitions[key]
  }
  if (property.allOf?.[0]) return resolveRef(schema, property.allOf[0])
  if (property.anyOf) {
    const concrete = property.anyOf.find((item) => item.type !== "null")
    return resolveRef(schema, concrete)
  }
  return property
}

const propertyKind = (property?: SchemaProperty) => {
  const type = Array.isArray(property?.type) ? property?.type.find((item) => item !== "null") : property?.type
  if (property?.enum) return "select"
  if (type === "boolean") return "boolean"
  if (type === "integer" || type === "number") return "number"
  if (type === "array") return "array"
  if (type === "object" || property?.properties) return "object"
  return "text"
}

const formatDescription = (description?: string) => {
  if (!description) return ""
  return description.replace(/`/g, "").replace(/\s+/g, " ").trim()
}

const pruneEmpty = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(pruneEmpty).filter((item) => item !== undefined)
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).flatMap(([key, nested]) => {
      const pruned = pruneEmpty(nested)
      if (
        pruned === undefined ||
        pruned === "" ||
        (Array.isArray(pruned) && pruned.length === 0) ||
        (typeof pruned === "object" && pruned !== null && Object.keys(pruned).length === 0)
      ) {
        return []
      }
      return [[key, pruned]]
    })
    return Object.fromEntries(entries)
  }
  return value
}

const quoteGraphqlValue = (value: unknown): string => {
  if (typeof value === "string") return JSON.stringify(value)
  if (typeof value === "boolean" || typeof value === "number") return String(value)
  if (Array.isArray(value)) return `[${value.map(quoteGraphqlValue).join(", ")}]`
  if (value && typeof value === "object") {
    return `{${Object.entries(value)
      .map(([key, item]) => `${key}: ${quoteGraphqlValue(item)}`)
      .join(", ")}}`
  }
  return "null"
}

const directiveArgs = (value: Record<string, unknown>) =>
  Object.entries(value)
    .map(([key, item]) => `${key}: ${quoteGraphqlValue(item)}`)
    .join(", ")

const toGraphqlConfig = (config: Record<string, unknown>) => {
  const directives = ["server", "upstream", "telemetry"]
    .filter((key) => config[key])
    .map((key) => `@${key}(${directiveArgs(config[key] as Record<string, unknown>)})`)
    .join("\n  ")

  const links = Array.isArray(config.links)
    ? config.links
        .map((link) => {
          const args = directiveArgs(link as Record<string, unknown>)
          return `  @link(${args})`
        })
        .join("\n")
    : ""

  return `schema ${directives ? `\n  ${directives}` : ""}${links ? `\n${links}` : ""} {\n  query: Query\n}\n\ntype Query {\n  health: String\n}\n`
}

const toYaml = (value: unknown, indent = 0): string => {
  const pad = " ".repeat(indent)
  if (Array.isArray(value)) {
    if (!value.length) return "[]"
    return value
      .map((item) => {
        if (typeof item === "object" && item !== null) {
          return `${pad}-\n${toYaml(item, indent + 2)}`
        }
        return `${pad}- ${String(item)}`
      })
      .join("\n")
  }
  if (value && typeof value === "object") {
    return Object.entries(value)
      .map(([key, item]) => {
        if (typeof item === "object" && item !== null) {
          return `${pad}${key}:\n${toYaml(item, indent + 2)}`
        }
        return `${pad}${key}: ${String(item)}`
      })
      .join("\n")
  }
  return `${pad}${String(value)}`
}

const ConfigGenerator = (): JSX.Element => {
  const [schema, setSchema] = useState<JsonSchema | null>(null)
  const [schemaError, setSchemaError] = useState("")
  const [activeSection, setActiveSection] = useState("server")
  const [searchTerm, setSearchTerm] = useState("")
  const [outputFormat, setOutputFormat] = useState<"json" | "yaml" | "graphql">("json")
  const [server, setServer] = useState<Record<string, unknown>>(defaultConfig.server)
  const [upstream, setUpstream] = useState<Record<string, unknown>>(defaultConfig.upstream)
  const [telemetry, setTelemetry] = useState<Record<string, unknown>>(defaultConfig.telemetry)
  const [links, setLinks] = useState<LinkInput[]>(defaultConfig.links)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(schemaUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Schema request failed: ${response.status}`)
        return response.json()
      })
      .then((nextSchema) => setSchema(nextSchema))
      .catch((error) => setSchemaError(error instanceof Error ? error.message : "Unable to load schema"))
  }, [])

  const sectionState = {server, upstream, telemetry}
  const setSectionState = {
    server: setServer,
    upstream: setUpstream,
    telemetry: setTelemetry,
  }

  const activeSchema = useMemo(() => {
    if (!schema || activeSection === "links") return undefined
    return resolveRef(schema, schema.properties?.[activeSection])
  }, [schema, activeSection])

  const filteredProperties = useMemo(() => {
    const properties = activeSchema?.properties ?? {}
    return Object.entries(properties).filter(([key, property]) => {
      const query = searchTerm.toLowerCase()
      return key.toLowerCase().includes(query) || formatDescription(property.description).toLowerCase().includes(query)
    })
  }, [activeSchema, searchTerm])

  const generatedConfig = useMemo(() => {
    return pruneEmpty({server, upstream, telemetry, links}) as Record<string, unknown>
  }, [server, upstream, telemetry, links])

  const output = useMemo(() => {
    if (outputFormat === "graphql") return toGraphqlConfig(generatedConfig)
    if (outputFormat === "yaml") return `${toYaml(generatedConfig)}\n`
    return `${JSON.stringify(generatedConfig, null, 2)}\n`
  }, [generatedConfig, outputFormat])

  const updateField = (
    section: "server" | "upstream" | "telemetry",
    key: string,
    property: SchemaProperty,
    raw: string,
  ) => {
    const kind = propertyKind(property)
    let value: unknown = raw
    if (kind === "number") value = raw === "" ? "" : Number(raw)
    if (kind === "boolean") value = raw === "true"
    if (kind === "array")
      value = raw
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    setSectionState[section]((current) => ({...current, [key]: value}))
  }

  const addLink = () => {
    setLinks((current) => [...current, {id: `link-${current.length + 1}`, type: "Config", src: "./config.graphql"}])
  }

  const removeLink = (index: number) => {
    setLinks((current) => current.filter((_, itemIndex) => itemIndex !== index))
  }

  const updateLink = (index: number, key: keyof LinkInput, value: string) => {
    setLinks((current) => current.map((link, itemIndex) => (itemIndex === index ? {...link, [key]: value} : link)))
  }

  const downloadConfig = () => {
    const extension = outputFormat === "graphql" ? "graphql" : outputFormat === "yaml" ? "yml" : "json"
    const blob = new Blob([output], {type: "text/plain"})
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `tailcall.config.${extension}`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const copyConfig = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <main className="min-h-[90vh] bg-tailCall-light-100 px-SPACE_04 py-SPACE_08 font-space-grotesk text-tailCall-dark-500">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-SPACE_06">
        <div className="flex flex-col justify-between gap-SPACE_04 border-b border-solid border-tailCall-border-light-500 pb-SPACE_05 md:flex-row md:items-end">
          <div>
            <h1 className="mb-SPACE_02 text-title-large">Configuration generator</h1>
            <p className="max-w-[760px] text-content-small text-tailCall-dark-100">
              Build valid Tailcall runtime config from the live JSON schema, then export JSON, YAML, or GraphQL.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-SPACE_02 text-content-tiny font-bold text-tailCall-dark-700"
            href="/playground"
          >
            Open playground <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid gap-SPACE_05 lg:grid-cols-[280px_minmax(0,1fr)_minmax(380px,0.85fr)]">
          <aside className="rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_04">
            <div className="mb-SPACE_04 flex items-center gap-SPACE_02 rounded-md border border-solid border-tailCall-border-light-500 px-SPACE_03 py-SPACE_02">
              <Search size={16} />
              <input
                className="w-full border-none bg-transparent text-content-tiny outline-none"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search schema fields"
              />
            </div>
            <div className="flex flex-col gap-SPACE_02">
              {sectionNames.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => setActiveSection(section)}
                  className={`rounded-md border border-solid px-SPACE_03 py-SPACE_02 text-left text-content-tiny font-bold capitalize ${
                    activeSection === section
                      ? "border-tailCall-dark-700 bg-tailCall-yellow text-tailCall-dark-700"
                      : "border-tailCall-border-light-500 bg-white text-tailCall-dark-100"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            <p className="mt-SPACE_04 text-content-tiny text-tailCall-dark-100">
              {schema
                ? `Loaded ${Object.keys(schema.definitions ?? {}).length} schema definitions.`
                : "Loading schema..."}
              {schemaError && ` ${schemaError}`}
            </p>
          </aside>

          <section className="rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_04">
            {activeSection === "links" ? (
              <div className="flex flex-col gap-SPACE_04">
                <button
                  type="button"
                  onClick={addLink}
                  className="inline-flex w-fit items-center gap-SPACE_02 rounded-md border border-solid border-tailCall-dark-700 bg-tailCall-dark-700 px-SPACE_04 py-SPACE_02 text-content-tiny font-bold text-white"
                >
                  <Plus size={16} /> Add link
                </button>
                {links.map((link, index) => (
                  <div
                    key={`${link.id}-${index}`}
                    className="grid gap-SPACE_03 rounded-lg bg-tailCall-light-100 p-SPACE_04 md:grid-cols-3"
                  >
                    <label>
                      <span className={labelClasses}>ID</span>
                      <input
                        className={fieldInputClasses}
                        value={link.id}
                        onChange={(event) => updateLink(index, "id", event.target.value)}
                      />
                    </label>
                    <label>
                      <span className={labelClasses}>Type</span>
                      <select
                        className={fieldInputClasses}
                        value={link.type}
                        onChange={(event) => updateLink(index, "type", event.target.value)}
                      >
                        {linkTypes.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span className={labelClasses}>Source</span>
                      <div className="flex gap-SPACE_02">
                        <input
                          className={fieldInputClasses}
                          value={link.src}
                          onChange={(event) => updateLink(index, "src", event.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeLink(index)}
                          className="rounded-md border border-solid border-tailCall-border-light-500 px-SPACE_03"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-SPACE_04 md:grid-cols-2">
                {filteredProperties.map(([key, property]) => {
                  const resolved = resolveRef(schema, property) ?? property
                  const section = activeSection as "server" | "upstream" | "telemetry"
                  const value = sectionState[section][key]
                  const kind = propertyKind(resolved)
                  return (
                    <label key={key} className="rounded-lg bg-tailCall-light-100 p-SPACE_04">
                      <span className={labelClasses}>{key}</span>
                      {kind === "boolean" ? (
                        <select
                          className={fieldInputClasses}
                          value={String(value ?? false)}
                          onChange={(event) => updateField(section, key, resolved, event.target.value)}
                        >
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </select>
                      ) : kind === "select" ? (
                        <select
                          className={fieldInputClasses}
                          value={String(value ?? "")}
                          onChange={(event) => updateField(section, key, resolved, event.target.value)}
                        >
                          <option value="">Unset</option>
                          {resolved.enum?.map((item) => <option key={item}>{item}</option>)}
                        </select>
                      ) : (
                        <input
                          className={fieldInputClasses}
                          type={kind === "number" ? "number" : "text"}
                          value={Array.isArray(value) ? value.join(", ") : String(value ?? "")}
                          onChange={(event) => updateField(section, key, resolved, event.target.value)}
                          placeholder={kind === "array" ? "comma, separated, values" : "Unset"}
                        />
                      )}
                      <span className="mt-SPACE_02 block min-h-[42px] text-content-tiny text-tailCall-dark-100">
                        {formatDescription(resolved.description)}
                      </span>
                    </label>
                  )
                })}
              </div>
            )}
          </section>

          <section className="rounded-lg border border-solid border-tailCall-border-light-500 bg-tailCall-dark-700 p-SPACE_04 text-white">
            <div className="mb-SPACE_04 flex flex-wrap items-center justify-between gap-SPACE_03">
              <select
                className="rounded-md border border-solid border-tailCall-border-light-500 bg-tailCall-dark-500 px-SPACE_03 py-SPACE_02 text-content-tiny text-white"
                value={outputFormat}
                onChange={(event) => setOutputFormat(event.target.value as "json" | "yaml" | "graphql")}
              >
                <option value="json">JSON</option>
                <option value="yaml">YAML</option>
                <option value="graphql">GraphQL</option>
              </select>
              <div className="flex gap-SPACE_02">
                <button
                  type="button"
                  onClick={copyConfig}
                  className="inline-flex items-center gap-SPACE_02 rounded-md bg-tailCall-yellow px-SPACE_03 py-SPACE_02 text-content-tiny font-bold text-tailCall-dark-700"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copied" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={downloadConfig}
                  className="inline-flex items-center gap-SPACE_02 rounded-md bg-white px-SPACE_03 py-SPACE_02 text-content-tiny font-bold text-tailCall-dark-700"
                >
                  <Download size={16} /> Download
                </button>
              </div>
            </div>
            <pre className="max-h-[70vh] overflow-auto rounded-md bg-tailCall-dark-500 p-SPACE_04 text-content-tiny text-tailCall-light-100">
              <code>{output}</code>
            </pre>
          </section>
        </div>
      </div>
    </main>
  )
}

export default ConfigGenerator
