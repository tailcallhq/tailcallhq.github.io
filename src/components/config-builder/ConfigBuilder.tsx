import React, {useEffect, useMemo, useState} from "react"
import {AlertCircle, CheckCircle2, Copy, Download, FileJson, Plus, RefreshCw, Trash2, X} from "lucide-react"

type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonValue[] | {[key: string]: JsonValue}
type JsonObject = {[key: string]: JsonValue}
type PathPart = string | number

type JsonSchema = {
  $ref?: string
  title?: string
  description?: string
  type?: string | string[]
  properties?: Record<string, JsonSchema>
  items?: JsonSchema
  required?: string[]
  enum?: string[]
  oneOf?: JsonSchema[]
  anyOf?: JsonSchema[]
  allOf?: JsonSchema[]
  default?: JsonValue
  minimum?: number
  format?: string
  additionalProperties?: boolean
}

type RootSchema = JsonSchema & {
  definitions?: Record<string, JsonSchema>
}

type OutputFormat = "json" | "yaml" | "graphql"

const schemaUrl = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"
const rootSections = ["links", "server", "upstream", "telemetry"]

const inputClasses =
  "min-h-11 w-full rounded-md border border-solid border-tailCall-border-light-500 bg-white px-SPACE_03 py-SPACE_02 font-space-grotesk text-content-tiny outline-none transition focus:border-tailCall-dark-100"

const textAreaClasses = `${inputClasses} min-h-28 font-space-mono`

const isRecord = (value: unknown): value is JsonObject => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const humanize = (key: string) => {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase())
}

const cleanDescription = (description?: string) => {
  if (!description) return ""
  return description
    .replace(/[`*_#]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

const isNullSchema = (schema?: JsonSchema) => {
  if (!schema) return false
  if (schema.type === "null") return true
  return Array.isArray(schema.type) && schema.type.length === 1 && schema.type[0] === "null"
}

const resolveRef = (schema: JsonSchema, root: RootSchema): JsonSchema => {
  if (!schema.$ref) return schema
  const definitionName = schema.$ref.replace("#/definitions/", "")
  return root.definitions?.[definitionName] ?? schema
}

const mergeSchemas = (schemas: JsonSchema[]): JsonSchema => {
  return schemas.reduce<JsonSchema>((merged, schema) => {
    return {
      ...merged,
      ...schema,
      properties: {
        ...(merged.properties ?? {}),
        ...(schema.properties ?? {}),
      },
      required: Array.from(new Set([...(merged.required ?? []), ...(schema.required ?? [])])),
    }
  }, {})
}

const normalizeSchema = (schema: JsonSchema, root: RootSchema): JsonSchema => {
  const resolved = resolveRef(schema, root)

  if (resolved.allOf?.length) {
    const normalizedParts = resolved.allOf.map((part) => normalizeSchema(part, root))
    const ownSchema = {...resolved}
    delete ownSchema.allOf
    return mergeSchemas([...normalizedParts, ownSchema])
  }

  return resolved
}

const pickRenderableSchema = (schema: JsonSchema, root: RootSchema): JsonSchema => {
  const normalized = normalizeSchema(schema, root)
  if (normalized.anyOf?.length) {
    const firstNonNull = normalized.anyOf.find((item) => !isNullSchema(normalizeSchema(item, root)))
    if (firstNonNull) return normalizeSchema(firstNonNull, root)
  }
  return normalized
}

const getSchemaType = (schema: JsonSchema, root: RootSchema): string => {
  const normalized = pickRenderableSchema(schema, root)
  const schemaType = normalized.type
  if (Array.isArray(schemaType)) {
    return schemaType.find((type) => type !== "null") ?? "string"
  }
  if (schemaType) return schemaType
  if (normalized.properties) return "object"
  if (normalized.items) return "array"
  if (getEnumValues(normalized, root).length > 0) return "string"
  return "unknown"
}

const getEnumValues = (schema: JsonSchema, root: RootSchema): string[] => {
  const normalized = normalizeSchema(schema, root)
  if (normalized.enum?.length) return normalized.enum

  if (normalized.oneOf?.length) {
    const values = normalized.oneOf.flatMap((option) => getEnumValues(option, root))
    return Array.from(new Set(values))
  }

  if (normalized.anyOf?.length) {
    const values = normalized.anyOf.flatMap((option) => getEnumValues(option, root))
    return Array.from(new Set(values))
  }

  if (normalized.allOf?.length) {
    const values = normalized.allOf.flatMap((option) => getEnumValues(option, root))
    return Array.from(new Set(values))
  }

  return []
}

const getOneOfObjectVariants = (schema: JsonSchema, root: RootSchema) => {
  const normalized = normalizeSchema(schema, root)
  if (!normalized.oneOf?.length) return []

  return normalized.oneOf
    .map((option) => normalizeSchema(option, root))
    .map((option) => {
      const keys = Object.keys(option.properties ?? {})
      if (keys.length !== 1) return null
      const key = keys[0]
      return {
        key,
        label: humanize(key),
        schema: option.properties?.[key] as JsonSchema,
      }
    })
    .filter(Boolean) as Array<{key: string; label: string; schema: JsonSchema}>
}

const setValueAtPath = (source: JsonObject, path: PathPart[], nextValue: JsonValue): JsonObject => {
  const root: JsonObject = {...source}
  let cursor: JsonObject | JsonValue[] = root

  path.forEach((key, index) => {
    const isLast = index === path.length - 1
    if (isLast) {
      ;(cursor as any)[key] = nextValue
      return
    }

    const nextKey = path[index + 1]
    const existing = (cursor as any)[key]
    const nextContainer =
      typeof nextKey === "number"
        ? Array.isArray(existing)
          ? [...existing]
          : []
        : isRecord(existing)
          ? {...existing}
          : {}

    ;(cursor as any)[key] = nextContainer
    cursor = nextContainer
  })

  return root
}

const deleteValueAtPath = (source: JsonObject, path: PathPart[]): JsonObject => {
  const root: JsonObject = {...source}
  let cursor: JsonObject | JsonValue[] = root

  path.slice(0, -1).forEach((key) => {
    const existing = (cursor as any)[key]
    if (Array.isArray(existing)) {
      const copy = [...existing]
      ;(cursor as any)[key] = copy
      cursor = copy
    } else if (isRecord(existing)) {
      const copy = {...existing}
      ;(cursor as any)[key] = copy
      cursor = copy
    }
  })

  const last = path[path.length - 1]
  if (Array.isArray(cursor) && typeof last === "number") {
    cursor.splice(last, 1)
  } else if (isRecord(cursor) && typeof last === "string") {
    delete cursor[last]
  }

  return root
}

const isEmptyValue = (value: JsonValue | undefined): boolean => {
  if (value === undefined || value === null || value === "") return true
  if (Array.isArray(value)) return value.length === 0
  if (isRecord(value)) return Object.keys(value).length === 0
  return false
}

const createEmptyValue = (schema: JsonSchema, root: RootSchema): JsonValue => {
  const normalized = pickRenderableSchema(schema, root)
  if (normalized.default !== undefined) return normalized.default

  const variants = getOneOfObjectVariants(normalized, root)
  if (variants.length > 0) {
    const variant = variants[0]
    return {[variant.key]: createEmptyValue(variant.schema, root)}
  }

  const enumValues = getEnumValues(normalized, root)
  if (enumValues.length > 0) return enumValues[0]

  const schemaType = getSchemaType(normalized, root)
  if (schemaType === "object") return {}
  if (schemaType === "array") return []
  if (schemaType === "boolean") return false
  if (schemaType === "integer" || schemaType === "number") return 0
  return ""
}

const pruneValue = (value: JsonValue | undefined, schema: JsonSchema, root: RootSchema): JsonValue | undefined => {
  if (value === undefined || value === null || value === "") return undefined

  const normalized = pickRenderableSchema(schema, root)
  const variants = getOneOfObjectVariants(normalized, root)
  if (variants.length > 0 && isRecord(value)) {
    const selectedVariant = variants.find((variant) => Object.prototype.hasOwnProperty.call(value, variant.key))
    if (!selectedVariant) return undefined

    const childValue = pruneValue(value[selectedVariant.key], selectedVariant.schema, root)
    if (childValue === undefined && getSchemaType(selectedVariant.schema, root) !== "object") return undefined
    return {[selectedVariant.key]: childValue ?? {}}
  }

  const schemaType = getSchemaType(normalized, root)

  if (schemaType === "array") {
    if (!Array.isArray(value)) return undefined
    const prunedItems = value
      .map((item) => pruneValue(item, normalized.items ?? {}, root))
      .filter((item): item is JsonValue => item !== undefined)
    return prunedItems.length > 0 ? prunedItems : undefined
  }

  if (schemaType === "object") {
    if (!isRecord(value)) return undefined
    const output: JsonObject = {}
    Object.entries(normalized.properties ?? {}).forEach(([key, propertySchema]) => {
      const prunedChild = pruneValue(value[key], propertySchema, root)
      if (prunedChild !== undefined) {
        output[key] = prunedChild
      }
    })
    return Object.keys(output).length > 0 ? output : undefined
  }

  return value
}

const validateValue = (value: JsonValue | undefined, schema: JsonSchema, root: RootSchema, label: string): string[] => {
  if (value === undefined) return []

  const normalized = pickRenderableSchema(schema, root)

  if (normalized.anyOf?.length) {
    const nonNullOptions = normalized.anyOf.filter((option) => !isNullSchema(normalizeSchema(option, root)))
    const matched = nonNullOptions.some((option) => validateValue(value, option, root, label).length === 0)
    return matched ? [] : [`${label} does not match the schema`]
  }

  const variants = getOneOfObjectVariants(normalized, root)
  if (variants.length > 0) {
    if (!isRecord(value)) return [`${label} must select one exporter`]
    const selected = variants.filter((variant) => Object.prototype.hasOwnProperty.call(value, variant.key))
    if (selected.length !== 1) return [`${label} must select one exporter`]
    return validateValue(value[selected[0].key], selected[0].schema, root, `${label}.${selected[0].key}`)
  }

  const enumValues = getEnumValues(normalized, root)
  if (enumValues.length > 0 && typeof value === "string" && !enumValues.includes(value)) {
    return [`${label} must be one of ${enumValues.join(", ")}`]
  }

  const schemaType = getSchemaType(normalized, root)

  if (schemaType === "object") {
    if (!isRecord(value)) return [`${label} must be an object`]
    const errors: string[] = []
    ;(normalized.required ?? []).forEach((requiredKey) => {
      if (isEmptyValue(value[requiredKey])) {
        errors.push(`${label}.${requiredKey} is required`)
      }
    })
    Object.entries(normalized.properties ?? {}).forEach(([key, propertySchema]) => {
      errors.push(...validateValue(value[key], propertySchema, root, `${label}.${key}`))
    })
    return errors
  }

  if (schemaType === "array") {
    if (!Array.isArray(value)) return [`${label} must be a list`]
    return value.flatMap((item, index) => validateValue(item, normalized.items ?? {}, root, `${label}[${index}]`))
  }

  if (schemaType === "integer" || schemaType === "number") {
    if (typeof value !== "number" || Number.isNaN(value)) return [`${label} must be a number`]
    if (normalized.minimum !== undefined && value < normalized.minimum) {
      return [`${label} must be at least ${normalized.minimum}`]
    }
  }

  if (schemaType === "boolean" && typeof value !== "boolean") return [`${label} must be true or false`]
  if (schemaType === "string" && typeof value !== "string") return [`${label} must be text`]

  return []
}

const yamlScalar = (value: JsonPrimitive): string => {
  if (value === null) return "null"
  if (typeof value === "boolean" || typeof value === "number") return String(value)
  if (value === "") return '""'
  if (/^[A-Za-z0-9_./:-]+$/.test(value)) return value
  return JSON.stringify(value)
}

const toYaml = (value: JsonValue, depth = 0): string => {
  const indent = "  ".repeat(depth)
  const childIndent = "  ".repeat(depth + 1)

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]"
    return value
      .map((item) => {
        if (isRecord(item) || Array.isArray(item)) {
          return `${indent}-\n${toYaml(item, depth + 1)}`
        }
        return `${indent}- ${yamlScalar(item as JsonPrimitive)}`
      })
      .join("\n")
  }

  if (isRecord(value)) {
    const entries = Object.entries(value)
    if (entries.length === 0) return "{}"
    return entries
      .map(([key, item]) => {
        if (isRecord(item) || Array.isArray(item)) {
          return `${indent}${key}:\n${toYaml(item, depth + 1)}`
        }
        return `${indent}${key}: ${yamlScalar(item as JsonPrimitive)}`
      })
      .join("\n")
  }

  return `${childIndent}${yamlScalar(value as JsonPrimitive)}`
}

const getPropertySchema = (schema: JsonSchema, key: string, root: RootSchema) => {
  const normalized = pickRenderableSchema(schema, root)
  return normalized.properties?.[key] ?? {}
}

const toGraphqlValue = (value: JsonValue, schema: JsonSchema, root: RootSchema): string => {
  const normalized = pickRenderableSchema(schema, root)
  const enumValues = getEnumValues(normalized, root)

  if (value === null) return "null"
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (typeof value === "string") {
    return enumValues.includes(value) ? value : JSON.stringify(value)
  }
  if (Array.isArray(value)) {
    const itemSchema = normalized.items ?? {}
    return `[${value.map((item) => toGraphqlValue(item, itemSchema, root)).join(", ")}]`
  }
  if (isRecord(value)) {
    const entries = Object.entries(value)
    return `{${entries
      .map(([key, item]) => `${key}: ${toGraphqlValue(item, getPropertySchema(normalized, key, root), root)}`)
      .join(", ")}}`
  }
  return JSON.stringify(value)
}

const toGraphqlArgs = (value: JsonValue | undefined, schema: JsonSchema, root: RootSchema) => {
  if (!isRecord(value)) return ""
  return Object.entries(value)
    .map(([key, item]) => `${key}: ${toGraphqlValue(item, getPropertySchema(schema, key, root), root)}`)
    .join(", ")
}

const toGraphqlDirective = (name: string, value: JsonValue | undefined, schema: JsonSchema, root: RootSchema) => {
  const args = toGraphqlArgs(value, schema, root)
  return args ? `@${name}(${args})` : `@${name}`
}

const toGraphql = (value: JsonObject, root: RootSchema): string => {
  const directives: string[] = []

  if (Array.isArray(value.links)) {
    const linkSchema = getPropertySchema(root, "links", root).items ?? {}
    value.links.forEach((link) => {
      directives.push(toGraphqlDirective("link", link, linkSchema, root))
    })
  }

  ;(["server", "upstream", "telemetry"] as const).forEach((sectionKey) => {
    if (value[sectionKey] !== undefined) {
      directives.push(
        toGraphqlDirective(sectionKey, value[sectionKey], getPropertySchema(root, sectionKey, root), root),
      )
    }
  })

  const directiveLines = directives.length > 0 ? `\n  ${directives.join("\n  ")}` : ""
  return `schema${directiveLines} {\n  query: Query\n}\n\ntype Query {\n  _empty: String\n}`
}

const formatOutput = (value: JsonObject, format: OutputFormat, root?: RootSchema) => {
  if (format === "json") return JSON.stringify(value, null, 2)
  if (format === "graphql" && root) return toGraphql(value, root)
  return toYaml(value)
}

type SchemaFieldProps = {
  root: RootSchema
  schema: JsonSchema
  value: JsonValue | undefined
  path: PathPart[]
  label: string
  required?: boolean
  rootField?: boolean
  onChange: (path: PathPart[], value: JsonValue) => void
  onDelete: (path: PathPart[]) => void
}

const SchemaField = ({root, schema, value, path, label, required, rootField, onChange, onDelete}: SchemaFieldProps) => {
  const normalized = pickRenderableSchema(schema, root)
  const schemaType = getSchemaType(normalized, root)
  const description = cleanDescription(normalized.description)
  const isOptionalObject = !required && !rootField && schemaType === "object" && isEmptyValue(value)
  const isOptionalArray = !required && !rootField && schemaType === "array" && isEmptyValue(value)
  const variants = getOneOfObjectVariants(normalized, root)

  if (variants.length > 0) {
    const selectedKey = isRecord(value)
      ? Object.keys(value).find((key) => variants.some((variant) => variant.key === key))
      : undefined
    const activeVariant = variants.find((variant) => variant.key === selectedKey) ?? variants[0]
    const activeValue = isRecord(value) ? value[activeVariant.key] : undefined

    return (
      <div className="rounded-md border border-solid border-tailCall-border-light-400 p-SPACE_04">
        <FieldHeader
          label={label}
          description={description}
          required={required}
          onRemove={!required ? () => onDelete(path) : undefined}
        />
        <label className="mt-SPACE_03 block text-content-mini font-bold uppercase text-tailCall-dark-100">
          Exporter
        </label>
        <select
          className={inputClasses}
          value={activeVariant.key}
          onChange={(event) => {
            const nextVariant = variants.find((variant) => variant.key === event.target.value) ?? variants[0]
            onChange(path, {[nextVariant.key]: createEmptyValue(nextVariant.schema, root)})
          }}
        >
          {variants.map((variant) => (
            <option key={variant.key} value={variant.key}>
              {variant.label}
            </option>
          ))}
        </select>
        <div className="mt-SPACE_04">
          <SchemaField
            root={root}
            schema={activeVariant.schema}
            value={activeValue}
            path={[...path, activeVariant.key]}
            label={activeVariant.label}
            required
            onChange={onChange}
            onDelete={onDelete}
          />
        </div>
      </div>
    )
  }

  if (isOptionalObject) {
    return <AddFieldButton label={label} onClick={() => onChange(path, createEmptyValue(normalized, root))} />
  }

  if (isOptionalArray) {
    return (
      <div className="rounded-md border border-solid border-tailCall-border-light-400 p-SPACE_04">
        <FieldHeader label={label} description={description} required={required} />
        <button
          type="button"
          className="mt-SPACE_03 inline-flex h-10 items-center gap-SPACE_02 rounded-md border border-solid border-tailCall-border-light-500 bg-white px-SPACE_03 text-content-tiny font-bold text-tailCall-dark-100"
          onClick={() => onChange(path, [createEmptyValue(normalized.items ?? {}, root)])}
        >
          <Plus size={16} aria-hidden />
          Add item
        </button>
      </div>
    )
  }

  if (schemaType === "object") {
    const properties = normalized.properties ?? {}
    const requiredFields = new Set(normalized.required ?? [])

    return (
      <section className="rounded-md border border-solid border-tailCall-border-light-400 bg-white p-SPACE_04">
        <FieldHeader
          label={label}
          description={description}
          required={required}
          onRemove={!required && !rootField ? () => onDelete(path) : undefined}
        />
        <div className="mt-SPACE_04 grid gap-SPACE_04 md:grid-cols-2">
          {Object.entries(properties).map(([key, propertySchema]) => (
            <SchemaField
              key={key}
              root={root}
              schema={propertySchema}
              value={isRecord(value) ? value[key] : undefined}
              path={[...path, key]}
              label={humanize(key)}
              required={requiredFields.has(key)}
              onChange={onChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      </section>
    )
  }

  if (schemaType === "array") {
    const arrayValue = Array.isArray(value) ? value : []
    return (
      <section className="rounded-md border border-solid border-tailCall-border-light-400 bg-white p-SPACE_04">
        <FieldHeader
          label={label}
          description={description}
          required={required}
          onRemove={!required && !rootField ? () => onDelete(path) : undefined}
        />
        <div className="mt-SPACE_04 space-y-SPACE_04">
          {arrayValue.map((item, index) => (
            <div key={index} className="rounded-md border border-solid border-tailCall-border-light-300 p-SPACE_04">
              <div className="mb-SPACE_03 flex items-center justify-between gap-SPACE_03">
                <span className="text-content-tiny font-bold text-tailCall-dark-100">
                  {label} {index + 1}
                </span>
                <IconButton label="Remove item" onClick={() => onDelete([...path, index])}>
                  <Trash2 size={16} aria-hidden />
                </IconButton>
              </div>
              <SchemaField
                root={root}
                schema={normalized.items ?? {}}
                value={item}
                path={[...path, index]}
                label={label}
                required
                onChange={onChange}
                onDelete={onDelete}
              />
            </div>
          ))}
          <button
            type="button"
            className="inline-flex h-10 items-center gap-SPACE_02 rounded-md border border-solid border-tailCall-border-light-500 bg-white px-SPACE_03 text-content-tiny font-bold text-tailCall-dark-100"
            onClick={() => onChange(path, [...arrayValue, createEmptyValue(normalized.items ?? {}, root)])}
          >
            <Plus size={16} aria-hidden />
            Add item
          </button>
        </div>
      </section>
    )
  }

  return (
    <PrimitiveField
      root={root}
      schema={normalized}
      value={value}
      path={path}
      label={label}
      required={required}
      onChange={onChange}
      onDelete={onDelete}
    />
  )
}

type PrimitiveFieldProps = {
  root: RootSchema
  schema: JsonSchema
  value: JsonValue | undefined
  path: PathPart[]
  label: string
  required?: boolean
  onChange: (path: PathPart[], value: JsonValue) => void
  onDelete: (path: PathPart[]) => void
}

const PrimitiveField = ({root, schema, value, path, label, required, onChange, onDelete}: PrimitiveFieldProps) => {
  const schemaType = getSchemaType(schema, root)
  const enumValues = getEnumValues(schema, root)
  const description = cleanDescription(schema.description)
  const inputId = `config-${path.join("-")}`

  if (schemaType === "boolean") {
    return (
      <div>
        <FieldLabel inputId={inputId} label={label} required={required} description={description} />
        <div className="mt-SPACE_02 flex h-11 overflow-hidden rounded-md border border-solid border-tailCall-border-light-500 bg-white">
          {[
            ["unset", "Unset"],
            ["true", "True"],
            ["false", "False"],
          ].map(([optionValue, optionLabel]) => {
            const active =
              (optionValue === "unset" && value === undefined) ||
              (optionValue === "true" && value === true) ||
              (optionValue === "false" && value === false)
            return (
              <button
                key={optionValue}
                type="button"
                className={`flex-1 border-0 px-SPACE_02 text-content-mini font-bold ${
                  active ? "bg-tailCall-yellow text-tailCall-dark-700" : "bg-white text-tailCall-dark-100"
                }`}
                onClick={() => {
                  if (optionValue === "unset") onDelete(path)
                  if (optionValue === "true") onChange(path, true)
                  if (optionValue === "false") onChange(path, false)
                }}
              >
                {optionLabel}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (schemaType === "integer" || schemaType === "number") {
    return (
      <div>
        <FieldLabel inputId={inputId} label={label} required={required} description={description} />
        <input
          id={inputId}
          className={inputClasses}
          type="text"
          inputMode="numeric"
          value={typeof value === "number" ? value : ""}
          onChange={(event) => {
            if (event.target.value === "") {
              onDelete(path)
              return
            }
            const parsedValue = Number(event.target.value)
            if (!Number.isNaN(parsedValue)) {
              onChange(path, parsedValue)
            }
          }}
        />
      </div>
    )
  }

  if (enumValues.length > 0) {
    const listId = `${inputId}-list`
    return (
      <div>
        <FieldLabel inputId={inputId} label={label} required={required} description={description} />
        <input
          id={inputId}
          list={listId}
          className={inputClasses}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => {
            if (event.target.value === "") {
              onDelete(path)
              return
            }
            onChange(path, event.target.value)
          }}
        />
        <datalist id={listId}>
          {enumValues.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>
    )
  }

  if (schemaType === "unknown") {
    return (
      <div>
        <FieldLabel inputId={inputId} label={label} required={required} description={description} />
        <textarea
          id={inputId}
          className={textAreaClasses}
          value={typeof value === "string" ? value : value ? JSON.stringify(value, null, 2) : ""}
          onChange={(event) => {
            const text = event.target.value
            if (text.trim() === "") {
              onDelete(path)
              return
            }
            try {
              onChange(path, JSON.parse(text))
            } catch {
              onChange(path, text)
            }
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <FieldLabel inputId={inputId} label={label} required={required} description={description} />
      <input
        id={inputId}
        className={inputClasses}
        value={typeof value === "string" ? value : ""}
        onChange={(event) => {
          if (event.target.value === "") {
            onDelete(path)
            return
          }
          onChange(path, event.target.value)
        }}
      />
    </div>
  )
}

const FieldHeader = ({
  label,
  description,
  required,
  onRemove,
}: {
  label: string
  description?: string
  required?: boolean
  onRemove?: () => void
}) => {
  return (
    <div className="flex items-start justify-between gap-SPACE_03">
      <div>
        <h2 className="m-0 text-title-tiny text-tailCall-dark-700">
          {label}
          {required ? " *" : ""}
        </h2>
        {description && (
          <p className="m-0 mt-SPACE_01 max-w-3xl text-content-mini text-tailCall-dark-100">{description}</p>
        )}
      </div>
      {onRemove && (
        <IconButton label="Remove field" onClick={onRemove}>
          <Trash2 size={16} aria-hidden />
        </IconButton>
      )}
    </div>
  )
}

const FieldLabel = ({
  inputId,
  label,
  required,
  description,
}: {
  inputId: string
  label: string
  required?: boolean
  description?: string
}) => {
  return (
    <label htmlFor={inputId} className="block">
      <span className="text-content-tiny font-bold text-tailCall-dark-700">
        {label}
        {required ? " *" : ""}
      </span>
      {description && <span className="mt-SPACE_01 block text-content-mini text-tailCall-dark-100">{description}</span>}
    </label>
  )
}

const AddFieldButton = ({label, onClick}: {label: string; onClick: () => void}) => {
  return (
    <button
      type="button"
      className="flex min-h-14 w-full items-center justify-between gap-SPACE_03 rounded-md border border-dashed border-tailCall-border-light-500 bg-white px-SPACE_04 py-SPACE_03 text-left text-content-tiny font-bold text-tailCall-dark-100"
      onClick={onClick}
    >
      <span>{label}</span>
      <Plus size={16} aria-hidden />
    </button>
  )
}

const IconButton = ({label, onClick, children}: {label: string; onClick: () => void; children: React.ReactNode}) => {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-solid border-tailCall-border-light-500 bg-white text-tailCall-dark-100 transition hover:border-tailCall-dark-100"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const ConfigBuilder = () => {
  const [schema, setSchema] = useState<RootSchema | null>(null)
  const [schemaError, setSchemaError] = useState("")
  const [config, setConfig] = useState<JsonObject>({})
  const [format, setFormat] = useState<OutputFormat>("json")
  const [importOpen, setImportOpen] = useState(false)
  const [importText, setImportText] = useState("")
  const [importError, setImportError] = useState("")
  const [copied, setCopied] = useState(false)

  const loadSchema = async () => {
    setSchemaError("")
    try {
      const response = await fetch(schemaUrl)
      if (!response.ok) throw new Error(`Schema request failed with ${response.status}`)
      const nextSchema = (await response.json()) as RootSchema
      setSchema(nextSchema)
    } catch (error) {
      setSchemaError(error instanceof Error ? error.message : "Schema request failed")
    }
  }

  useEffect(() => {
    loadSchema()
  }, [])

  const outputConfig = useMemo(() => {
    if (!schema) return {}
    return (pruneValue(config, schema, schema) as JsonObject | undefined) ?? {}
  }, [config, schema])

  const validationErrors = useMemo(() => {
    if (!schema) return []
    return validateValue(outputConfig, schema, schema, "config")
  }, [outputConfig, schema])

  const output = useMemo(() => formatOutput(outputConfig, format, schema ?? undefined), [outputConfig, format, schema])
  const canExport = Boolean(schema) && validationErrors.length === 0 && !schemaError

  const onChange = (path: PathPart[], value: JsonValue) => {
    setConfig((current) => setValueAtPath(current, path, value))
  }

  const onDelete = (path: PathPart[]) => {
    setConfig((current) => deleteValueAtPath(current, path))
  }

  const copyOutput = async () => {
    if (!canExport) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  const importJsonConfig = () => {
    setImportError("")
    try {
      const parsedConfig = JSON.parse(importText) as JsonValue
      if (!isRecord(parsedConfig)) {
        setImportError("Imported config must be a JSON object.")
        return
      }
      setConfig(parsedConfig)
      setImportText("")
      setImportOpen(false)
    } catch {
      setImportError("Imported config is not valid JSON.")
    }
  }

  const downloadOutput = () => {
    if (!canExport) return
    const extension = format === "json" ? "json" : format === "yaml" ? "yml" : "graphql"
    const mime = format === "json" ? "application/json" : format === "yaml" ? "application/yaml" : "application/graphql"
    const blob = new Blob([output], {type: mime})
    const url = window.URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = `.tailcallrc.${extension}`
    anchor.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-tailCall-light-100 px-SPACE_04 py-SPACE_08 text-tailCall-dark-700 md:px-SPACE_08">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-SPACE_06">
        <header className="flex flex-col justify-between gap-SPACE_04 border-b border-solid border-tailCall-border-light-400 pb-SPACE_06 lg:flex-row lg:items-end">
          <div>
            <p className="m-0 text-content-mini font-bold uppercase text-tailCall-dark-100">Tailcall</p>
            <h1 className="m-0 mt-SPACE_01 text-title-large text-tailCall-dark-700">Config Builder</h1>
          </div>
          <div className="flex flex-wrap items-center gap-SPACE_03">
            <div className="flex h-11 overflow-hidden rounded-md border border-solid border-tailCall-border-light-500 bg-white">
              {(["json", "yaml", "graphql"] as OutputFormat[]).map((nextFormat) => (
                <button
                  key={nextFormat}
                  type="button"
                  className={`border-0 px-SPACE_04 text-content-tiny font-bold uppercase ${
                    format === nextFormat
                      ? "bg-tailCall-yellow text-tailCall-dark-700"
                      : "bg-white text-tailCall-dark-100"
                  }`}
                  onClick={() => setFormat(nextFormat)}
                >
                  {nextFormat}
                </button>
              ))}
            </div>
            <IconButton label="Reload schema" onClick={loadSchema}>
              <RefreshCw size={16} aria-hidden />
            </IconButton>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-SPACE_02 rounded-md border border-solid border-tailCall-border-light-500 bg-white px-SPACE_04 text-content-tiny font-bold text-tailCall-dark-100"
              onClick={() => {
                setImportError("")
                setImportOpen((open) => !open)
              }}
            >
              <FileJson size={16} aria-hidden />
              Import JSON
            </button>
            <button
              type="button"
              disabled={!canExport}
              className="inline-flex h-11 items-center gap-SPACE_02 rounded-md border border-solid border-tailCall-border-light-500 bg-white px-SPACE_04 text-content-tiny font-bold text-tailCall-dark-100 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={copyOutput}
            >
              <Copy size={16} aria-hidden />
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              disabled={!canExport}
              className="inline-flex h-11 items-center gap-SPACE_02 rounded-md border border-solid border-tailCall-dark-700 bg-tailCall-dark-700 px-SPACE_04 text-content-tiny font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={downloadOutput}
            >
              <Download size={16} aria-hidden />
              Download
            </button>
          </div>
        </header>

        {importOpen && (
          <section className="rounded-md border border-solid border-tailCall-border-light-400 bg-white p-SPACE_04">
            <div className="flex items-start justify-between gap-SPACE_03">
              <div>
                <h2 className="m-0 text-title-tiny text-tailCall-dark-700">Import JSON</h2>
                {importError && <p className="m-0 mt-SPACE_01 text-content-mini text-red-700">{importError}</p>}
              </div>
              <IconButton label="Close import" onClick={() => setImportOpen(false)}>
                <X size={16} aria-hidden />
              </IconButton>
            </div>
            <textarea
              className={`${textAreaClasses} mt-SPACE_04 min-h-40`}
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
              spellCheck={false}
            />
            <div className="mt-SPACE_03 flex justify-end">
              <button
                type="button"
                disabled={importText.trim() === ""}
                className="inline-flex h-11 items-center rounded-md border border-solid border-tailCall-dark-700 bg-tailCall-dark-700 px-SPACE_04 text-content-tiny font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                onClick={importJsonConfig}
              >
                Load JSON
              </button>
            </div>
          </section>
        )}

        {schemaError && (
          <div className="flex items-center gap-SPACE_03 rounded-md border border-solid border-red-300 bg-red-50 p-SPACE_04 text-content-tiny text-red-800">
            <AlertCircle size={18} aria-hidden />
            {schemaError}
          </div>
        )}

        {!schema && !schemaError && (
          <div className="rounded-md border border-solid border-tailCall-border-light-400 bg-white p-SPACE_06 text-content-small text-tailCall-dark-100">
            Loading schema...
          </div>
        )}

        {schema && (
          <div className="grid gap-SPACE_06 xl:grid-cols-[minmax(0,1fr)_480px]">
            <div className="space-y-SPACE_04">
              {rootSections.map((sectionKey) => {
                const sectionSchema = schema.properties?.[sectionKey]
                if (!sectionSchema) return null
                return (
                  <SchemaField
                    key={sectionKey}
                    root={schema}
                    schema={sectionSchema}
                    value={config[sectionKey]}
                    path={[sectionKey]}
                    label={humanize(sectionKey)}
                    rootField
                    onChange={onChange}
                    onDelete={onDelete}
                  />
                )
              })}
            </div>

            <aside className="xl:sticky xl:top-SPACE_06 xl:self-start">
              <div className="rounded-md border border-solid border-tailCall-border-light-400 bg-white">
                <div className="flex items-center justify-between gap-SPACE_03 border-b border-solid border-tailCall-border-light-400 p-SPACE_04">
                  <div className="flex items-center gap-SPACE_02 text-content-tiny font-bold text-tailCall-dark-700">
                    {canExport ? <CheckCircle2 size={18} aria-hidden /> : <AlertCircle size={18} aria-hidden />}
                    {canExport
                      ? "Valid"
                      : `${validationErrors.length} issue${validationErrors.length === 1 ? "" : "s"}`}
                  </div>
                  <span className="rounded-md bg-tailCall-light-200 px-SPACE_02 py-SPACE_01 font-space-mono text-content-mini uppercase text-tailCall-dark-100">
                    {format}
                  </span>
                </div>
                {validationErrors.length > 0 && (
                  <div className="border-b border-solid border-tailCall-border-light-400 p-SPACE_04">
                    <ul className="m-0 space-y-SPACE_02 pl-SPACE_04 text-content-mini text-red-700">
                      {validationErrors.slice(0, 6).map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <pre className="m-0 max-h-[70vh] overflow-auto whitespace-pre-wrap p-SPACE_04 font-space-mono text-content-mini text-tailCall-dark-700">
                  {output}
                </pre>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}

export default ConfigBuilder
