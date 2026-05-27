import React, {useCallback, useEffect, useMemo, useState} from "react"
import Link from "@docusaurus/Link"
import {
  AlertCircle,
  CheckCircle2,
  Clipboard,
  Download,
  FileCode2,
  FileJson,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from "lucide-react"

type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonObject | JsonValue[]
type JsonObject = {[key: string]: JsonValue}

type JsonSchema = {
  $ref?: string
  title?: string
  description?: string
  type?: string | string[]
  enum?: JsonPrimitive[]
  default?: JsonValue
  properties?: Record<string, JsonSchema>
  required?: string[]
  items?: JsonSchema
  oneOf?: JsonSchema[]
  anyOf?: JsonSchema[]
  allOf?: JsonSchema[]
  minimum?: number
  maximum?: number
  additionalProperties?: boolean | JsonSchema
}

type RootSchema = JsonSchema & {
  definitions?: Record<string, JsonSchema>
  $defs?: Record<string, JsonSchema>
}

type OutputFormat = "json" | "yaml" | "graphql"

type FieldProps = {
  root: RootSchema
  schema: JsonSchema
  value: JsonValue | undefined
  path: string[]
  label: string
  search: string
  required?: boolean
  rootField?: boolean
  onChange: (path: string[], value: JsonValue) => void
  onDelete: (path: string[]) => void
}

const schemaUrl = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"
const storageKey = "tailcall-config-builder-v1"

const sectionLabels: Record<string, string> = {
  links: "Links",
  server: "Server",
  telemetry: "Telemetry",
  upstream: "Upstream",
}

const formatLabels: Record<OutputFormat, string> = {
  json: "JSON",
  yaml: "YAML",
  graphql: "GraphQL",
}

const fieldShell =
  "rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_04 shadow-sm dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-400"

const controlClass =
  "min-h-11 w-full rounded-md border border-solid border-tailCall-border-light-500 bg-white px-SPACE_03 py-SPACE_02 font-space-grotesk text-content-tiny text-tailCall-dark-500 outline-none transition focus:border-tailCall-dark-500 dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-500 dark:text-tailCall-light-100"

const iconButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-md border border-solid border-tailCall-border-light-500 bg-white text-tailCall-dark-200 transition hover:border-tailCall-dark-500 hover:text-tailCall-dark-500 dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-500 dark:text-tailCall-light-400 dark:hover:text-tailCall-yellow"

const isRecord = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const cloneJson = <T extends JsonValue>(value: T): T => JSON.parse(JSON.stringify(value)) as T

const titleize = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

const cleanDescription = (description?: string) =>
  (description ?? "")
    .replace(/`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim()

const definitionsOf = (root: RootSchema) => root.definitions ?? root.$defs ?? {}

const resolveRef = (schema: JsonSchema, root: RootSchema): JsonSchema => {
  if (!schema.$ref) return schema

  const key = schema.$ref.replace("#/definitions/", "").replace("#/$defs/", "")
  return definitionsOf(root)[key] ?? schema
}

const mergeSchemas = (schemas: JsonSchema[]): JsonSchema => {
  const merged = schemas.reduce<JsonSchema>((acc, schema) => ({...acc, ...schema}), {})

  return {
    ...merged,
    properties: schemas.reduce<Record<string, JsonSchema>>(
      (acc, schema) => ({...acc, ...(schema.properties ?? {})}),
      {},
    ),
    required: Array.from(new Set(schemas.flatMap((schema) => schema.required ?? []))),
  }
}

const normalizeSchema = (schema: JsonSchema | undefined, root: RootSchema): JsonSchema => {
  if (!schema) return {}

  const resolved = resolveRef(schema, root)
  if (resolved !== schema) {
    return normalizeSchema({...resolved, ...schema, $ref: undefined}, root)
  }

  if (resolved.allOf?.length) {
    return normalizeSchema(mergeSchemas(resolved.allOf.map((item) => normalizeSchema(item, root))), root)
  }

  return resolved
}

const nonNullOptions = (schemas: JsonSchema[] | undefined, root: RootSchema) =>
  (schemas ?? [])
    .map((schema) => normalizeSchema(schema, root))
    .filter((schema) => getSchemaType(schema, root) !== "null")

const renderableSchema = (schema: JsonSchema | undefined, root: RootSchema): JsonSchema => {
  const normalized = normalizeSchema(schema, root)
  const variants = nonNullOptions(normalized.oneOf ?? normalized.anyOf, root)

  if (variants.length === 1) return variants[0]
  return normalized
}

const getSchemaType = (schema: JsonSchema | undefined, root: RootSchema): string => {
  const normalized = normalizeSchema(schema, root)

  if (Array.isArray(normalized.type)) return normalized.type.find((item) => item !== "null") ?? "null"
  if (normalized.type) return normalized.type
  if (normalized.enum) return "string"
  if (normalized.properties) return "object"
  if (normalized.items) return "array"

  const variants = nonNullOptions(normalized.oneOf ?? normalized.anyOf, root)
  return variants.length > 0 ? getSchemaType(variants[0], root) : "string"
}

const enumValues = (schema: JsonSchema | undefined, root: RootSchema): JsonPrimitive[] => {
  const normalized = normalizeSchema(schema, root)
  if (normalized.enum) return normalized.enum.filter((item) => item !== null)

  return nonNullOptions(normalized.oneOf ?? normalized.anyOf, root).flatMap((variant) => variant.enum ?? [])
}

const objectVariants = (schema: JsonSchema | undefined, root: RootSchema) =>
  nonNullOptions(normalizeSchema(schema, root).oneOf ?? normalizeSchema(schema, root).anyOf, root)
    .map((variant, index) => {
      const properties = Object.keys(variant.properties ?? {})
      const key = properties[0] ?? variant.title ?? `option${index + 1}`

      return {
        key,
        label: titleize(variant.title ?? key),
        schema: variant.properties?.[key] ?? variant,
      }
    })
    .filter((variant) => variant.key)

const emptyValue = (value: JsonValue | undefined): boolean => {
  if (value === undefined || value === null || value === "") return true
  if (Array.isArray(value)) return value.length === 0
  if (isRecord(value)) return Object.keys(value).length === 0
  return false
}

const defaultValue = (schema: JsonSchema | undefined, root: RootSchema): JsonValue => {
  const normalized = renderableSchema(schema, root)
  if (normalized.default !== undefined) return cloneJson(normalized.default)

  const variants = objectVariants(normalized, root)
  if (variants.length > 0) return {[variants[0].key]: defaultValue(variants[0].schema, root)}

  const enums = enumValues(normalized, root)
  if (enums.length > 0) return enums[0]

  const type = getSchemaType(normalized, root)
  if (type === "boolean") return false
  if (type === "integer" || type === "number") return 0
  if (type === "array") return []
  if (type === "object") return {}

  return ""
}

const updatePath = (source: JsonValue | undefined, path: string[], value: JsonValue): JsonValue => {
  if (path.length === 0) return value

  const [head, ...tail] = path
  if (Array.isArray(source)) {
    const index = Number(head)
    const next = [...source]
    next[index] = updatePath(next[index], tail, value)
    return next
  }

  const next = isRecord(source) ? {...source} : {}
  next[head] = updatePath(next[head], tail, value)
  return next
}

const deletePath = (source: JsonValue | undefined, path: string[]): JsonValue | undefined => {
  if (path.length === 0) return undefined

  const [head, ...tail] = path
  if (Array.isArray(source)) {
    const index = Number(head)
    const next = [...source]
    if (tail.length === 0) next.splice(index, 1)
    else next[index] = deletePath(next[index], tail) ?? null
    return next
  }

  if (!isRecord(source)) return source

  const next = {...source}
  if (tail.length === 0) delete next[head]
  else {
    const child = deletePath(next[head], tail)
    if (child === undefined || emptyValue(child)) delete next[head]
    else next[head] = child
  }

  return next
}

const pruneValue = (
  value: JsonValue | undefined,
  schema: JsonSchema | undefined,
  root: RootSchema,
): JsonValue | undefined => {
  if (emptyValue(value)) return undefined

  const normalized = renderableSchema(schema, root)
  const type = getSchemaType(normalized, root)

  if (type === "object") {
    if (!isRecord(value)) return undefined

    const next = Object.entries(normalized.properties ?? {}).reduce<JsonObject>((acc, [key, childSchema]) => {
      const child = pruneValue(value[key], childSchema, root)
      if (child !== undefined && !emptyValue(child)) acc[key] = child
      return acc
    }, {})

    return emptyValue(next) ? undefined : next
  }

  if (type === "array") {
    if (!Array.isArray(value)) return undefined

    const items = value
      .map((item) => pruneValue(item, normalized.items ?? {}, root))
      .filter((item): item is JsonValue => item !== undefined && !emptyValue(item))

    return items.length > 0 ? items : undefined
  }

  if (type === "integer" || type === "number") {
    return typeof value === "number" && Number.isFinite(value) ? value : undefined
  }

  if (type === "boolean") {
    return typeof value === "boolean" ? value : undefined
  }

  if (type === "string") {
    return typeof value === "string" && value.trim() !== "" ? value : undefined
  }

  return value
}

const pruneConfig = (value: JsonObject, root: RootSchema) =>
  Object.entries(root.properties ?? {}).reduce<JsonObject>((acc, [key, childSchema]) => {
    const child = pruneValue(value[key], childSchema, root)
    if (child !== undefined && !emptyValue(child)) acc[key] = child
    return acc
  }, {})

const validateValue = (
  value: JsonValue | undefined,
  schema: JsonSchema | undefined,
  root: RootSchema,
  path: string,
): string[] => {
  if (emptyValue(value)) return []

  const normalized = renderableSchema(schema, root)
  const type = getSchemaType(normalized, root)
  const errors: string[] = []

  if (type === "object") {
    if (!isRecord(value)) return [`${path} must be an object`]

    const required = normalized.required ?? []
    required.forEach((key) => {
      if (emptyValue(value[key])) errors.push(`${path}.${key} is required`)
    })

    Object.entries(normalized.properties ?? {}).forEach(([key, childSchema]) => {
      errors.push(...validateValue(value[key], childSchema, root, `${path}.${key}`))
    })

    return errors
  }

  if (type === "array") {
    if (!Array.isArray(value)) return [`${path} must be a list`]

    value.forEach((item, index) => {
      errors.push(...validateValue(item, normalized.items ?? {}, root, `${path}[${index}]`))
    })

    return errors
  }

  if ((type === "integer" || type === "number") && typeof value !== "number") errors.push(`${path} must be a number`)
  if (type === "integer" && typeof value === "number" && !Number.isInteger(value))
    errors.push(`${path} must be an integer`)
  if (type === "boolean" && typeof value !== "boolean") errors.push(`${path} must be true or false`)
  if (type === "string" && typeof value !== "string") errors.push(`${path} must be text`)
  if (typeof value === "number" && normalized.minimum !== undefined && value < normalized.minimum) {
    errors.push(`${path} must be at least ${normalized.minimum}`)
  }
  if (typeof value === "number" && normalized.maximum !== undefined && value > normalized.maximum) {
    errors.push(`${path} must be at most ${normalized.maximum}`)
  }

  const enums = enumValues(normalized, root)
  if (enums.length > 0 && !enums.includes(value as JsonPrimitive)) {
    errors.push(`${path} must be one of: ${enums.map(String).join(", ")}`)
  }

  return errors
}

const validateConfig = (value: JsonObject, root: RootSchema) =>
  Object.entries(root.properties ?? {}).flatMap(([key, childSchema]) =>
    validateValue(value[key], childSchema, root, key),
  )

const yamlScalar = (value: JsonValue) => {
  if (typeof value === "string") return JSON.stringify(value)
  if (value === null) return "null"
  return String(value)
}

const toYaml = (value: JsonValue, indent = 0): string => {
  const padding = " ".repeat(indent)

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (isRecord(item) || Array.isArray(item)) {
          return `${padding}-\n${toYaml(item, indent + 2)}`
        }
        return `${padding}- ${yamlScalar(item)}`
      })
      .join("\n")
  }

  if (isRecord(value)) {
    return Object.entries(value)
      .map(([key, item]) => {
        if (isRecord(item) || Array.isArray(item)) {
          return `${padding}${key}:\n${toYaml(item, indent + 2)}`
        }
        return `${padding}${key}: ${yamlScalar(item)}`
      })
      .join("\n")
  }

  return `${padding}${yamlScalar(value)}`
}

const schemaProperty = (schema: JsonSchema | undefined, key: string, root: RootSchema) =>
  renderableSchema(schema, root).properties?.[key] ?? {}

const graphqlValue = (value: JsonValue, schema: JsonSchema | undefined, root: RootSchema): string => {
  const normalized = renderableSchema(schema, root)

  if (typeof value === "string") {
    return enumValues(normalized, root).includes(value) ? value : JSON.stringify(value)
  }
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (Array.isArray(value)) return `[${value.map((item) => graphqlValue(item, normalized.items, root)).join(", ")}]`
  if (isRecord(value)) {
    return `{${Object.entries(value)
      .map(([key, item]) => `${key}: ${graphqlValue(item, schemaProperty(normalized, key, root), root)}`)
      .join(", ")}}`
  }

  return "null"
}

const directiveArgs = (value: JsonValue | undefined, schema: JsonSchema | undefined, root: RootSchema) => {
  if (!isRecord(value)) return ""

  return Object.entries(value)
    .map(([key, item]) => `${key}: ${graphqlValue(item, schemaProperty(schema, key, root), root)}`)
    .join(", ")
}

const toGraphql = (config: JsonObject, root: RootSchema): string => {
  const directives: string[] = []

  if (Array.isArray(config.links)) {
    config.links.forEach((link) => {
      const args = directiveArgs(link, renderableSchema(root.properties?.links, root).items, root)
      if (args) directives.push(`  @link(${args})`)
    })
  }

  ;(["server", "upstream", "telemetry"] as const).forEach((key) => {
    const args = directiveArgs(config[key], root.properties?.[key], root)
    if (args) directives.push(`  @${key}(${args})`)
  })

  return [`schema`, ...directives, `{`, `  query: Query`, `}`, ``, `type Query {`, `  _empty: String`, `}`].join("\n")
}

const formatOutput = (value: JsonObject, root: RootSchema, format: OutputFormat) => {
  if (format === "json") return JSON.stringify(value, null, 2)
  if (format === "yaml") return toYaml(value)
  return toGraphql(value, root)
}

const downloadFile = (contents: string, filename: string) => {
  const blob = new Blob([contents], {type: "text/plain;charset=utf-8"})
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

const FieldHeader = ({
  label,
  description,
  required,
  rootField,
  path,
  onDelete,
}: {
  label: string
  description?: string
  required?: boolean
  rootField?: boolean
  path: string[]
  onDelete: (path: string[]) => void
}) => (
  <div className="flex items-start justify-between gap-SPACE_03">
    <div>
      <div className="flex flex-wrap items-center gap-SPACE_02">
        <h3 className="m-0 text-title-tiny text-tailCall-dark-500 dark:text-tailCall-light-100">{label}</h3>
        {required && (
          <span className="rounded-full bg-tailCall-yellow px-SPACE_02 py-SPACE_01 text-content-mini font-bold text-tailCall-dark-500">
            Required
          </span>
        )}
      </div>
      {description && (
        <p className="m-0 mt-SPACE_01 text-content-mini text-tailCall-dark-100 dark:text-tailCall-light-500">
          {description}
        </p>
      )}
    </div>
    {!rootField && !required && (
      <button type="button" className={iconButtonClass} onClick={() => onDelete(path)} aria-label={`Remove ${label}`}>
        <Trash2 size={16} />
      </button>
    )}
  </div>
)

const PrimitiveField = ({
  root,
  schema,
  value,
  path,
  onChange,
}: {
  root: RootSchema
  schema: JsonSchema
  value: JsonValue | undefined
  path: string[]
  onChange: (path: string[], value: JsonValue) => void
}) => {
  const type = getSchemaType(schema, root)
  const enums = enumValues(schema, root)
  const fieldId = `tailcall-${path.join("-")}`.replace(/[^a-zA-Z0-9_-]/g, "-")

  if (type === "boolean") {
    return (
      <label className="mt-SPACE_04 flex w-fit items-center gap-SPACE_03 text-content-tiny text-tailCall-dark-500 dark:text-tailCall-light-100">
        <input
          type="checkbox"
          checked={value === true}
          className="h-5 w-5 accent-tailCall-yellow"
          onChange={(event) => onChange(path, event.target.checked)}
        />
        Enabled
      </label>
    )
  }

  if (type === "integer" || type === "number") {
    return (
      <input
        className={`${controlClass} mt-SPACE_04`}
        type="number"
        value={typeof value === "number" ? value : ""}
        min={schema.minimum}
        max={schema.maximum}
        step={type === "integer" ? 1 : "any"}
        onChange={(event) => {
          const raw = event.target.value
          onChange(path, raw === "" ? "" : Number(raw))
        }}
      />
    )
  }

  if (enums.length > 0) {
    return (
      <div className="mt-SPACE_04">
        <input
          className={controlClass}
          list={`${fieldId}-options`}
          value={String(value ?? "")}
          onChange={(event) => onChange(path, event.target.value)}
        />
        <datalist id={`${fieldId}-options`}>
          {enums.map((item) => (
            <option key={String(item)} value={String(item)} />
          ))}
        </datalist>
        <p className="m-0 mt-SPACE_01 text-content-mini text-tailCall-dark-100 dark:text-tailCall-light-500">
          Search or select one of: {enums.map(String).join(", ")}
        </p>
      </div>
    )
  }

  return (
    <input
      className={`${controlClass} mt-SPACE_04`}
      type="text"
      value={typeof value === "string" ? value : ""}
      onChange={(event) => onChange(path, event.target.value)}
      placeholder="Value"
    />
  )
}

const Field = ({root, schema, value, path, label, search, required, rootField, onChange, onDelete}: FieldProps) => {
  const normalized = renderableSchema(schema, root)
  const type = getSchemaType(normalized, root)
  const description = cleanDescription(normalized.description)
  const variants = objectVariants(normalized, root)

  if (search && !rootField) {
    const haystack = `${label} ${description}`.toLowerCase()
    if (!haystack.includes(search.toLowerCase())) return null
  }

  if (!rootField && !required && emptyValue(value)) {
    return (
      <div className={fieldShell}>
        <div className="flex flex-col gap-SPACE_03 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-SPACE_02">
              <span className="text-title-tiny text-tailCall-dark-500 dark:text-tailCall-light-100">{label}</span>
              <span className="rounded-full bg-tailCall-light-200 px-SPACE_02 py-SPACE_01 text-content-mini text-tailCall-dark-100 dark:bg-tailCall-dark-300 dark:text-tailCall-light-500">
                Optional
              </span>
            </div>
            {description && (
              <p className="m-0 mt-SPACE_01 text-content-mini text-tailCall-dark-100 dark:text-tailCall-light-500">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            className={iconButtonClass}
            aria-label={`Add ${label}`}
            onClick={() => onChange(path, defaultValue(normalized, root))}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    )
  }

  if (variants.length > 0) {
    const current = isRecord(value) ? value : {}
    const selectedKey =
      variants.find((variant) => Object.prototype.hasOwnProperty.call(current, variant.key))?.key ?? variants[0].key
    const active = variants.find((variant) => variant.key === selectedKey) ?? variants[0]

    return (
      <div className={fieldShell}>
        <FieldHeader
          label={label}
          description={description}
          required={required}
          rootField={rootField}
          path={path}
          onDelete={onDelete}
        />
        <label className="mt-SPACE_04 block text-content-mini font-bold text-tailCall-dark-500 dark:text-tailCall-light-100">
          Exporter type
          <select
            value={selectedKey}
            className={`${controlClass} mt-SPACE_02`}
            onChange={(event) => {
              const next = variants.find((variant) => variant.key === event.target.value) ?? variants[0]
              onChange(path, {[next.key]: defaultValue(next.schema, root)})
            }}
          >
            {variants.map((variant) => (
              <option key={variant.key} value={variant.key}>
                {variant.label}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-SPACE_04">
          <Field
            root={root}
            schema={active.schema}
            value={current[active.key]}
            path={[...path, active.key]}
            label={active.label}
            search={search}
            required
            onChange={onChange}
            onDelete={onDelete}
          />
        </div>
      </div>
    )
  }

  if (type === "object") {
    const record = isRecord(value) ? value : {}
    const properties = Object.entries(normalized.properties ?? {})

    return (
      <div className={fieldShell}>
        <FieldHeader
          label={label}
          description={description}
          required={required}
          rootField={rootField}
          path={path}
          onDelete={onDelete}
        />
        {properties.length === 0 ? (
          <p className="m-0 mt-SPACE_03 text-content-mini text-tailCall-dark-100 dark:text-tailCall-light-500">
            No schema properties are available for this section.
          </p>
        ) : (
          <div className="mt-SPACE_04 grid gap-SPACE_04">
            {properties.map(([key, property]) => (
              <Field
                key={key}
                root={root}
                schema={property}
                value={record[key]}
                path={[...path, key]}
                label={titleize(key)}
                search={search}
                required={Boolean(normalized.required?.includes(key))}
                onChange={onChange}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (type === "array") {
    const items = Array.isArray(value) ? value : []
    const itemSchema = normalized.items ?? {}

    return (
      <div className={fieldShell}>
        <FieldHeader
          label={label}
          description={description}
          required={required}
          rootField={rootField}
          path={path}
          onDelete={onDelete}
        />
        <div className="mt-SPACE_04 grid gap-SPACE_03">
          {items.map((item, index) => (
            <Field
              key={index}
              root={root}
              schema={itemSchema}
              value={item}
              path={[...path, String(index)]}
              label={`${label} ${index + 1}`}
              search={search}
              required
              onChange={onChange}
              onDelete={onDelete}
            />
          ))}
        </div>
        <button
          type="button"
          className="mt-SPACE_04 inline-flex items-center gap-SPACE_02 rounded-md border border-solid border-tailCall-dark-500 bg-tailCall-yellow px-SPACE_04 py-SPACE_02 text-content-tiny font-bold text-tailCall-dark-500 transition hover:opacity-90"
          onClick={() => onChange(path, [...items, defaultValue(itemSchema, root)])}
        >
          <Plus size={16} />
          Add {label}
        </button>
      </div>
    )
  }

  return (
    <div className={fieldShell}>
      <FieldHeader
        label={label}
        description={description}
        required={required}
        rootField={rootField}
        path={path}
        onDelete={onDelete}
      />
      <PrimitiveField root={root} schema={normalized} value={value} path={path} onChange={onChange} />
    </div>
  )
}

const ConfigBuilder = (): JSX.Element => {
  const [schema, setSchema] = useState<RootSchema | null>(null)
  const [schemaError, setSchemaError] = useState("")
  const [loading, setLoading] = useState(true)
  const [draftLoaded, setDraftLoaded] = useState(false)
  const [config, setConfig] = useState<JsonObject>({})
  const [activeSection, setActiveSection] = useState("server")
  const [format, setFormat] = useState<OutputFormat>("json")
  const [search, setSearch] = useState("")
  const [importText, setImportText] = useState("")
  const [importError, setImportError] = useState("")
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle")

  const loadSchema = useCallback(async () => {
    setLoading(true)
    setSchemaError("")

    try {
      const response = await fetch(schemaUrl)
      if (!response.ok) throw new Error(`Schema request failed with ${response.status}`)
      const nextSchema = (await response.json()) as RootSchema
      setSchema(nextSchema)

      const sections = Object.keys(nextSchema.properties ?? {})
      if (sections.length > 0) setActiveSection((current) => (sections.includes(current) ? current : sections[0]))
    } catch (error) {
      setSchemaError(error instanceof Error ? error.message : "Unable to load the Tailcall schema")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadSchema()
  }, [loadSchema])

  useEffect(() => {
    if (typeof window === "undefined") return

    const saved = window.localStorage.getItem(storageKey)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (isRecord(parsed)) setConfig(parsed)
      } catch {
        window.localStorage.removeItem(storageKey)
      }
    }

    setDraftLoaded(true)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !draftLoaded) return
    window.localStorage.setItem(storageKey, JSON.stringify(config))
  }, [config, draftLoaded])

  const sections = useMemo(() => Object.keys(schema?.properties ?? {}), [schema])
  const prunedConfig = useMemo(() => (schema ? pruneConfig(config, schema) : {}), [config, schema])
  const validationErrors = useMemo(() => (schema ? validateConfig(prunedConfig, schema) : []), [prunedConfig, schema])
  const output = useMemo(
    () => (schema ? formatOutput(prunedConfig, schema, format) : ""),
    [format, prunedConfig, schema],
  )

  const handleChange = useCallback((path: string[], value: JsonValue) => {
    setConfig((current) => updatePath(current, path, value) as JsonObject)
  }, [])

  const handleDelete = useCallback((path: string[]) => {
    setConfig((current) => (deletePath(current, path) as JsonObject | undefined) ?? {})
  }, [])

  const importConfig = () => {
    setImportError("")

    try {
      const parsed = JSON.parse(importText)
      if (!isRecord(parsed)) throw new Error("The imported config must be a JSON object")
      setConfig(parsed)
      setImportText("")
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Invalid JSON")
    }
  }

  const copyOutput = async () => {
    setCopyState("idle")

    try {
      await navigator.clipboard.writeText(output)
      setCopyState("copied")
    } catch {
      setCopyState("failed")
    }
  }

  const extension = format === "json" ? "json" : format === "yaml" ? "yml" : "graphql"
  const isValid = validationErrors.length === 0 && Object.keys(prunedConfig).length > 0

  return (
    <main
      data-testid="config-builder"
      className="min-h-screen bg-tailCall-light-100 px-SPACE_04 py-SPACE_08 dark:bg-tailCall-dark-700 md:px-SPACE_08 lg:px-SPACE_12"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-SPACE_06">
        <section className="rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_06 dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-500 md:p-SPACE_08">
          <div className="flex flex-col gap-SPACE_05 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="m-0 mb-SPACE_02 text-content-tiny font-bold uppercase tracking-[0.08em] text-tailCall-dark-100 dark:text-tailCall-light-500">
                Tailcall Config Builder
              </p>
              <h1 className="m-0 text-title-large text-tailCall-dark-500 dark:text-tailCall-light-100">
                Generate runtime configuration
              </h1>
              <p className="m-0 mt-SPACE_03 text-content-small text-tailCall-dark-100 dark:text-tailCall-light-500">
                Build valid Tailcall configuration from the live runtime schema, then export it as JSON, YAML, or
                GraphQL.
              </p>
            </div>
            <div className="flex flex-wrap gap-SPACE_03">
              <Link
                to="/playground"
                className="inline-flex h-11 items-center rounded-md border border-solid border-tailCall-border-light-500 px-SPACE_04 text-content-tiny font-bold text-tailCall-dark-500 hover:no-underline dark:border-tailCall-border-dark-200 dark:text-tailCall-light-100"
              >
                Playground
              </Link>
              <button
                type="button"
                className="inline-flex h-11 items-center gap-SPACE_02 rounded-md border border-solid border-tailCall-dark-500 bg-tailCall-yellow px-SPACE_04 text-content-tiny font-bold text-tailCall-dark-500"
                onClick={loadSchema}
              >
                <RefreshCw size={16} />
                Reload schema
              </button>
            </div>
          </div>
        </section>

        {loading && (
          <section className="rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_06 text-content-small dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-500 dark:text-tailCall-light-100">
            Loading the latest Tailcall schema...
          </section>
        )}

        {schemaError && (
          <section className="flex items-start gap-SPACE_03 rounded-lg border border-solid border-red-300 bg-red-50 p-SPACE_05 text-content-small text-red-900">
            <AlertCircle className="mt-SPACE_01 shrink-0" size={18} />
            <div>
              <p className="m-0 font-bold">Schema could not be loaded</p>
              <p className="m-0 mt-SPACE_01">{schemaError}</p>
            </div>
          </section>
        )}

        {schema && (
          <section className="grid gap-SPACE_06 xl:grid-cols-[minmax(0,1fr)_440px]">
            <div className="flex flex-col gap-SPACE_05">
              <div className="rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_04 dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-500">
                <div className="flex flex-col gap-SPACE_03 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap gap-SPACE_02">
                    {sections.map((section) => (
                      <button
                        key={section}
                        type="button"
                        className={`rounded-md border border-solid px-SPACE_04 py-SPACE_02 text-content-tiny font-bold transition ${
                          activeSection === section
                            ? "border-tailCall-dark-500 bg-tailCall-yellow text-tailCall-dark-500"
                            : "border-tailCall-border-light-500 bg-transparent text-tailCall-dark-100 hover:border-tailCall-dark-500 dark:border-tailCall-border-dark-200 dark:text-tailCall-light-500"
                        }`}
                        onClick={() => setActiveSection(section)}
                      >
                        {sectionLabels[section] ?? titleize(section)}
                      </button>
                    ))}
                  </div>
                  <label className="relative flex min-w-64 items-center">
                    <Search
                      className="absolute left-SPACE_03 text-tailCall-dark-100 dark:text-tailCall-light-500"
                      size={16}
                    />
                    <input
                      className={`${controlClass} pl-SPACE_08`}
                      value={search}
                      placeholder="Filter fields"
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </label>
                </div>
              </div>

              <Field
                root={schema}
                schema={schema.properties?.[activeSection] ?? {}}
                value={config[activeSection]}
                path={[activeSection]}
                label={sectionLabels[activeSection] ?? titleize(activeSection)}
                search={search}
                rootField
                onChange={handleChange}
                onDelete={handleDelete}
              />

              <div className="rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_05 dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-500">
                <div className="flex items-center gap-SPACE_03">
                  <Upload size={18} className="text-tailCall-dark-100 dark:text-tailCall-light-500" />
                  <h2 className="m-0 text-title-tiny text-tailCall-dark-500 dark:text-tailCall-light-100">
                    Import JSON config
                  </h2>
                </div>
                <textarea
                  data-testid="config-import"
                  className={`${controlClass} mt-SPACE_04 min-h-32 font-space-mono`}
                  value={importText}
                  placeholder='{"server":{"port":8000}}'
                  onChange={(event) => setImportText(event.target.value)}
                />
                {importError && <p className="m-0 mt-SPACE_02 text-content-mini text-red-600">{importError}</p>}
                <button
                  type="button"
                  className="mt-SPACE_03 rounded-md border border-solid border-tailCall-dark-500 px-SPACE_04 py-SPACE_02 text-content-tiny font-bold text-tailCall-dark-500 dark:border-tailCall-light-100 dark:text-tailCall-light-100"
                  onClick={importConfig}
                >
                  Import
                </button>
              </div>
            </div>

            <aside className="xl:sticky xl:top-SPACE_06 xl:h-fit">
              <div className="rounded-lg border border-solid border-tailCall-border-light-500 bg-tailCall-dark-500 p-SPACE_05 text-tailCall-light-100 dark:border-tailCall-border-dark-200">
                <div className="flex flex-col gap-SPACE_04 sm:flex-row sm:items-center sm:justify-between xl:flex-col xl:items-stretch">
                  <div className="flex items-center gap-SPACE_03">
                    {format === "graphql" ? <FileCode2 size={18} /> : <FileJson size={18} />}
                    <h2 className="m-0 text-title-tiny">Generated config</h2>
                  </div>
                  <select
                    className={`${controlClass} bg-tailCall-dark-400 text-tailCall-light-100`}
                    value={format}
                    onChange={(event) => setFormat(event.target.value as OutputFormat)}
                  >
                    {(["json", "yaml", "graphql"] as OutputFormat[]).map((item) => (
                      <option key={item} value={item}>
                        {formatLabels[item]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-SPACE_04 flex items-center gap-SPACE_02 text-content-mini">
                  {isValid ? (
                    <>
                      <CheckCircle2 size={16} className="text-tailCall-yellow" />
                      Ready to export
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} className="text-tailCall-yellow" />
                      Add at least one valid setting to export
                    </>
                  )}
                </div>

                {validationErrors.length > 0 && (
                  <ul className="mt-SPACE_03 rounded-md border border-solid border-yellow-300/30 bg-yellow-300/10 p-SPACE_03 text-content-mini">
                    {validationErrors.slice(0, 6).map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                )}

                <pre
                  data-testid="config-output"
                  className="mt-SPACE_04 max-h-[520px] overflow-auto rounded-md bg-tailCall-dark-700 p-SPACE_04 font-space-mono text-content-mini text-tailCall-light-100"
                >
                  {output || "{}"}
                </pre>

                <div className="mt-SPACE_04 grid grid-cols-2 gap-SPACE_03">
                  <button
                    type="button"
                    disabled={!isValid}
                    className="inline-flex h-11 items-center justify-center gap-SPACE_02 rounded-md border border-solid border-tailCall-light-100 px-SPACE_03 text-content-tiny font-bold text-tailCall-light-100 disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={copyOutput}
                  >
                    <Clipboard size={16} />
                    Copy
                  </button>
                  <button
                    type="button"
                    disabled={!isValid}
                    className="inline-flex h-11 items-center justify-center gap-SPACE_02 rounded-md bg-tailCall-yellow px-SPACE_03 text-content-tiny font-bold text-tailCall-dark-500 disabled:cursor-not-allowed disabled:opacity-40"
                    onClick={() => downloadFile(output, `tailcall.config.${extension}`)}
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
                {copyState === "copied" && (
                  <p className="m-0 mt-SPACE_02 text-content-mini text-tailCall-yellow">Copied to clipboard.</p>
                )}
                {copyState === "failed" && (
                  <p className="m-0 mt-SPACE_02 text-content-mini text-red-300">Clipboard access failed.</p>
                )}
              </div>
            </aside>
          </section>
        )}
      </div>
    </main>
  )
}

export default ConfigBuilder
