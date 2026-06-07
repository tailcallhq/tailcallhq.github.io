import React, {useCallback, useEffect, useRef, useState} from "react"
import clsx from "clsx"

// ---------------------------------------------------------------------------
// Types & helpers for the JSON-Schema-driven form
// ---------------------------------------------------------------------------

const SCHEMA_URL =
  "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

type JsonSchema = {
  type?: string | string[]
  description?: string
  properties?: Record<string, JsonSchema>
  items?: JsonSchema
  $ref?: string
  anyOf?: JsonSchema[]
  allOf?: JsonSchema[]
  enum?: (string | number | boolean | null)[]
  required?: string[]
  default?: unknown
  minimum?: number
  format?: string
}

type SchemaRoot = {
  definitions: Record<string, JsonSchema>
  properties: Record<string, JsonSchema>
}

function resolveRef(ref: string, root: SchemaRoot): JsonSchema {
  const name = ref.replace("#/definitions/", "")
  return root.definitions?.[name] ?? {}
}

function effectiveSchema(schema: JsonSchema, root: SchemaRoot): JsonSchema {
  if (schema.$ref) return resolveRef(schema.$ref, root)
  if (schema.allOf?.length === 1) return effectiveSchema(schema.allOf[0], root)
  if (schema.anyOf) {
    const nonNull = schema.anyOf.find((s) => s.type !== "null" && !("type" in s && s.type === "null"))
    if (nonNull) return effectiveSchema(nonNull, root)
  }
  return schema
}

function isNullable(schema: JsonSchema): boolean {
  const types = Array.isArray(schema.type) ? schema.type : [schema.type]
  if (types.includes("null")) return true
  if (schema.anyOf?.some((s) => s.type === "null")) return true
  return false
}

function baseType(schema: JsonSchema): string {
  const types = Array.isArray(schema.type) ? schema.type : [schema.type]
  return types.find((t) => t && t !== "null") ?? "string"
}

// Strip nulls/undefined recursively for clean JSON output
function stripEmpty(val: unknown): unknown {
  if (val === null || val === undefined || val === "") return undefined
  if (Array.isArray(val)) {
    const arr = val.map(stripEmpty).filter((v) => v !== undefined)
    return arr.length ? arr : undefined
  }
  if (typeof val === "object") {
    const obj: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      const cleaned = stripEmpty(v)
      if (cleaned !== undefined) obj[k] = cleaned
    }
    return Object.keys(obj).length ? obj : undefined
  }
  return val
}

// ---------------------------------------------------------------------------
// Schema-driven field renderer
// ---------------------------------------------------------------------------

type FieldProps = {
  name: string
  schema: JsonSchema
  root: SchemaRoot
  value: unknown
  onChange: (val: unknown) => void
  depth?: number
}

const INDENT_PX = 16

function SchemaField({name, schema, root, value, onChange, depth = 0}: FieldProps): JSX.Element {
  const eff = effectiveSchema(schema, root)
  const nullable = isNullable(schema) || isNullable(eff)
  const type = baseType(eff)
  const indent = depth * INDENT_PX

  // Enum → searchable select
  if (eff.enum) {
    const options = eff.enum as string[]
    return (
      <FieldWrapper label={name} description={eff.description ?? schema.description} indent={indent}>
        <SearchableSelect
          options={options}
          value={(value as string) ?? ""}
          onChange={(v) => onChange(v === "" && nullable ? undefined : v)}
          placeholder={nullable ? `— optional —` : `Select ${name}`}
          nullable={nullable}
        />
      </FieldWrapper>
    )
  }

  // Object → nested section
  if (type === "object" && eff.properties) {
    return (
      <ObjectSection
        label={name}
        description={eff.description ?? schema.description}
        schema={eff}
        root={root}
        value={value as Record<string, unknown>}
        onChange={onChange}
        depth={depth}
        nullable={nullable}
      />
    )
  }

  // Array of refs/objects → array manager
  if (type === "array") {
    return (
      <ArrayField
        name={name}
        schema={eff}
        root={root}
        value={value as unknown[]}
        onChange={onChange}
        depth={depth}
        description={eff.description ?? schema.description}
      />
    )
  }

  // Boolean
  if (type === "boolean") {
    const checked = value === true
    const indeterminate = value === undefined || value === null
    return (
      <FieldWrapper label={name} description={eff.description ?? schema.description} indent={indent}>
        <div className="flex items-center gap-SPACE_03">
          {nullable && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className={clsx(
                "text-xs px-2 py-0.5 rounded border border-solid",
                indeterminate
                  ? "border-tailCall-yellow bg-tailCall-yellow text-tailCall-dark-500"
                  : "border-tailCall-border-light-500 text-tailCall-dark-100 hover:border-tailCall-dark-100",
              )}
              title="Set to unset/null"
            >
              {indeterminate ? "unset" : "clear"}
            </button>
          )}
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={clsx(
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
              checked ? "bg-tailCall-yellow" : "bg-tailCall-border-light-500",
            )}
          >
            <span
              className={clsx(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200",
                checked ? "translate-x-5" : "translate-x-0",
              )}
            />
          </button>
          <span className="text-sm text-tailCall-dark-200">{checked ? "true" : indeterminate ? "—" : "false"}</span>
        </div>
      </FieldWrapper>
    )
  }

  // Number / integer
  if (type === "number" || type === "integer") {
    return (
      <FieldWrapper label={name} description={eff.description ?? schema.description} indent={indent}>
        <input
          type="number"
          value={value === undefined || value === null ? "" : String(value)}
          min={eff.minimum}
          onChange={(e) => {
            const v = e.target.value
            onChange(v === "" ? undefined : type === "integer" ? parseInt(v, 10) : parseFloat(v))
          }}
          placeholder={nullable ? "optional" : ""}
          className={inputCls}
        />
      </FieldWrapper>
    )
  }

  // Default: string
  return (
    <FieldWrapper label={name} description={eff.description ?? schema.description} indent={indent}>
      <input
        type="text"
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value === "" && nullable ? undefined : e.target.value)}
        placeholder={nullable ? "optional" : ""}
        className={inputCls}
      />
    </FieldWrapper>
  )
}

// ---------------------------------------------------------------------------
// FieldWrapper
// ---------------------------------------------------------------------------
function FieldWrapper({
  label,
  description,
  indent,
  children,
}: {
  label: string
  description?: string
  indent: number
  children: React.ReactNode
}) {
  const [showDesc, setShowDesc] = useState(false)
  return (
    <div className="flex flex-col gap-1 py-2" style={{paddingLeft: `${indent}px`}}>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-tailCall-dark-400 font-space-mono">{label}</label>
        {description && (
          <button
            type="button"
            onClick={() => setShowDesc((v) => !v)}
            className="text-xs text-tailCall-dark-100 hover:text-tailCall-dark-400 underline"
            title="Toggle description"
          >
            {showDesc ? "hide" : "?"}
          </button>
        )}
      </div>
      {showDesc && description && (
        <p className="text-xs text-tailCall-dark-100 mb-1 max-w-prose leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ObjectSection
// ---------------------------------------------------------------------------
function ObjectSection({
  label,
  description,
  schema,
  root,
  value,
  onChange,
  depth,
  nullable,
}: {
  label: string
  description?: string
  schema: JsonSchema
  root: SchemaRoot
  value: Record<string, unknown> | undefined | null
  onChange: (v: unknown) => void
  depth: number
  nullable: boolean
}) {
  const [open, setOpen] = useState(depth < 2)
  const [enabled, setEnabled] = useState(value !== undefined && value !== null)
  const indent = depth * INDENT_PX

  const handleEnable = (v: boolean) => {
    setEnabled(v)
    if (!v) onChange(undefined)
    else onChange(value ?? {})
  }

  return (
    <div className="border border-solid border-tailCall-border-light-500 rounded-lg my-2" style={{marginLeft: indent}}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-tailCall-border-light-100 rounded-lg transition-colors"
      >
        <span className={clsx("text-xs transition-transform", open ? "rotate-90" : "")}>▶</span>
        <span className="font-medium text-sm text-tailCall-dark-400 font-space-mono">{label}</span>
        {nullable && (
          <span
            onClick={(e) => {
              e.stopPropagation()
              handleEnable(!enabled)
            }}
            className={clsx(
              "ml-auto text-xs px-2 py-0.5 rounded border border-solid cursor-pointer transition-colors",
              enabled
                ? "border-tailCall-yellow bg-tailCall-yellow text-tailCall-dark-500"
                : "border-tailCall-border-light-500 text-tailCall-dark-100",
            )}
          >
            {enabled ? "enabled" : "disabled"}
          </span>
        )}
      </button>
      {open && (
        <div className="px-4 pb-4">
          {description && <p className="text-xs text-tailCall-dark-100 mb-3 leading-relaxed">{description}</p>}
          {nullable && !enabled ? (
            <p className="text-xs text-tailCall-dark-100 italic">Click "disabled" to enable this section.</p>
          ) : (
            schema.properties &&
            Object.entries(schema.properties).map(([key, propSchema]) => {
              const resolved = effectiveSchema(propSchema, root)
              return (
                <SchemaField
                  key={key}
                  name={key}
                  schema={propSchema}
                  root={root}
                  value={(value as Record<string, unknown>)?.[key]}
                  onChange={(v) => {
                    const next = {...((value as Record<string, unknown>) ?? {}), [key]: v}
                    onChange(next)
                  }}
                  depth={depth + 1}
                />
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ArrayField
// ---------------------------------------------------------------------------
function ArrayField({
  name,
  schema,
  root,
  value,
  onChange,
  depth,
  description,
}: {
  name: string
  schema: JsonSchema
  root: SchemaRoot
  value: unknown[] | undefined | null
  onChange: (v: unknown) => void
  depth: number
  description?: string
}) {
  const [open, setOpen] = useState(false)
  const indent = depth * INDENT_PX
  const items = schema.items ? effectiveSchema(schema.items, root) : undefined
  const arr = (value as unknown[]) ?? []

  const addItem = () => {
    const newItem = items?.type === "object" ? {} : items?.enum ? items.enum[0] : ""
    onChange([...arr, newItem])
  }

  const removeItem = (i: number) => {
    const next = arr.filter((_, idx) => idx !== i)
    onChange(next.length ? next : undefined)
  }

  const updateItem = (i: number, v: unknown) => {
    const next = [...arr]
    next[i] = v
    onChange(next)
  }

  return (
    <div className="border border-solid border-tailCall-border-light-500 rounded-lg my-2" style={{marginLeft: indent}}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-tailCall-border-light-100 rounded-lg transition-colors"
      >
        <span className={clsx("text-xs transition-transform", open ? "rotate-90" : "")}>▶</span>
        <span className="font-medium text-sm text-tailCall-dark-400 font-space-mono">{name}</span>
        <span className="ml-auto text-xs text-tailCall-dark-100">{arr.length} item(s)</span>
      </button>
      {open && (
        <div className="px-4 pb-4">
          {description && <p className="text-xs text-tailCall-dark-100 mb-3 leading-relaxed">{description}</p>}
          {arr.map((item, i) => (
            <div key={i} className="flex items-start gap-2 my-2">
              <div className="flex-1">
                {items ? (
                  <SchemaField
                    name={`[${i}]`}
                    schema={schema.items!}
                    root={root}
                    value={item}
                    onChange={(v) => updateItem(i, v)}
                    depth={depth + 1}
                  />
                ) : (
                  <input
                    type="text"
                    value={String(item ?? "")}
                    onChange={(e) => updateItem(i, e.target.value)}
                    className={inputCls}
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="mt-2 text-xs text-red-500 hover:text-red-700 border border-solid border-red-300 rounded px-2 py-1"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mt-2 text-xs font-medium px-3 py-1.5 rounded border border-solid border-tailCall-border-dark-100 text-tailCall-dark-400 hover:bg-tailCall-border-light-100 transition-colors"
          >
            + Add item
          </button>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SearchableSelect
// ---------------------------------------------------------------------------
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  nullable,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  placeholder: string
  nullable: boolean
}) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={ref} className="relative w-full">
      <div
        className={clsx(inputCls, "flex items-center cursor-pointer")}
        onClick={() => setOpen((v) => !v)}
        role="combobox"
        tabIndex={0}
        aria-expanded={open}
        onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
      >
        <span className={value ? "text-tailCall-dark-400" : "text-tailCall-dark-100"}>{value || placeholder}</span>
        <span className="ml-auto text-tailCall-dark-100">▾</span>
      </div>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-solid border-tailCall-border-light-500 rounded-lg shadow-lg max-h-60 overflow-auto">
          <div className="p-2 border-b border-solid border-tailCall-border-light-500">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full text-sm outline-none px-2 py-1 border border-solid border-tailCall-border-light-500 rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {nullable && (
            <button
              type="button"
              className="w-full text-left px-3 py-2 text-sm text-tailCall-dark-100 hover:bg-tailCall-border-light-100"
              onClick={() => {
                onChange("")
                setOpen(false)
                setQuery("")
              }}
            >
              — clear —
            </button>
          )}
          {filtered.map((opt) => (
            <button
              key={opt}
              type="button"
              className={clsx(
                "w-full text-left px-3 py-2 text-sm hover:bg-tailCall-border-light-100",
                opt === value ? "font-bold text-tailCall-dark-500" : "text-tailCall-dark-400",
              )}
              onClick={() => {
                onChange(opt)
                setOpen(false)
                setQuery("")
              }}
            >
              {opt}
            </button>
          ))}
          {filtered.length === 0 && <p className="px-3 py-2 text-xs text-tailCall-dark-100">No matches</p>}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Format tabs
// ---------------------------------------------------------------------------
type Format = "json" | "yaml"

function toYaml(obj: unknown, indent = 0): string {
  if (obj === undefined || obj === null) return "null"
  if (typeof obj === "boolean" || typeof obj === "number") return String(obj)
  if (typeof obj === "string") {
    // Quote strings that look like YAML keywords or contain special chars
    if (/[:#\[\]{},|>&*!%@`]/.test(obj) || /^(true|false|null|yes|no|on|off)$/i.test(obj)) {
      return `"${obj.replace(/"/g, '\\"')}"`
    }
    return obj
  }
  const pad = "  ".repeat(indent)
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]"
    return "\n" + obj.map((item) => `${pad}- ${toYaml(item, indent + 1)}`).join("\n")
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>).filter(([, v]) => v !== undefined)
    if (entries.length === 0) return "{}"
    return "\n" + entries.map(([k, v]) => `${pad}${k}: ${toYaml(v, indent + 1)}`).join("\n")
  }
  return String(obj)
}

function formatOutput(config: Record<string, unknown>, format: Format): string {
  const cleaned = stripEmpty(config) as Record<string, unknown>
  if (!cleaned || Object.keys(cleaned).length === 0) return ""
  if (format === "json") return JSON.stringify(cleaned, null, 2)
  // Simple YAML serialization
  const entries = Object.entries(cleaned)
  return entries.map(([k, v]) => `${k}:${toYaml(v, 1)}`).join("\n") + "\n"
}

// ---------------------------------------------------------------------------
// Main ConfigGenerator component
// ---------------------------------------------------------------------------

const inputCls =
  "border border-solid border-tailCall-border-light-500 rounded-lg font-space-grotesk text-sm h-9 w-full px-3 outline-none focus:border-tailCall-dark-200 text-tailCall-dark-400 bg-white"

type ConfigState = Record<string, unknown>

export default function ConfigGenerator(): JSX.Element {
  const [schema, setSchema] = useState<SchemaRoot | null>(null)
  const [schemaError, setSchemaError] = useState<string | null>(null)
  const [config, setConfig] = useState<ConfigState>({})
  const [format, setFormat] = useState<Format>("json")
  const [copied, setCopied] = useState(false)

  // Load schema on mount
  useEffect(() => {
    fetch(SCHEMA_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: SchemaRoot) => setSchema(data))
      .catch((err: Error) => setSchemaError(err.message))
  }, [])

  const updateField = useCallback((key: string, val: unknown) => {
    setConfig((prev) => ({...prev, [key]: val}))
  }, [])

  const output = schema ? formatOutput(config, format) : ""

  const handleDownload = () => {
    const ext = format === "json" ? "json" : "yaml"
    const blob = new Blob([output], {type: "text/plain"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tailcall-config.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const handleReset = () => {
    if (window.confirm("Reset all fields to defaults?")) setConfig({})
  }

  return (
    <div className="w-full min-h-screen bg-tailCall-light-200 font-space-grotesk">
      {/* Header */}
      <div className="w-full bg-tailCall-dark-500 px-6 py-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-display-small font-bold text-tailCall-light-100 mb-2">Config Generator</h1>
          <p className="text-tailCall-light-500 text-sm md:text-base max-w-2xl">
            Build a Tailcall configuration visually. Fields are driven directly from the{" "}
            <a
              href="https://github.com/tailcallhq/tailcall/blob/main/generated/.tailcallrc.schema.json"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-tailCall-yellow hover:opacity-80"
            >
              official schema
            </a>{" "}
            and stay up-to-date automatically.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-16 lg:px-24">
        {schemaError && (
          <div className="mb-6 p-4 border border-solid border-red-300 bg-red-50 rounded-lg text-sm text-red-700">
            Failed to load schema: {schemaError}. Please refresh or try again later.
          </div>
        )}

        {!schema && !schemaError && (
          <div className="flex items-center justify-center py-24">
            <span className="text-tailCall-dark-100 text-sm animate-pulse">Loading schema…</span>
          </div>
        )}

        {schema && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ---- Left: form ---- */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl border border-solid border-tailCall-border-light-500 overflow-hidden">
                <div className="px-6 py-4 border-b border-solid border-tailCall-border-light-500 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-tailCall-dark-400">Configuration Fields</h2>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-tailCall-dark-100 hover:text-red-500 border border-solid border-tailCall-border-light-500 rounded px-2 py-1 transition-colors"
                  >
                    Reset
                  </button>
                </div>
                <div className="px-6 py-4">
                  {Object.entries(schema.properties ?? {}).map(([key, propSchema]) => (
                    <SchemaField
                      key={key}
                      name={key}
                      schema={propSchema}
                      root={schema}
                      value={config[key]}
                      onChange={(v) => updateField(key, v)}
                      depth={0}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Right: output ---- */}
            <div className="lg:w-[420px] xl:w-[480px] flex-shrink-0">
              <div className="sticky top-4">
                <div className="bg-tailCall-dark-500 rounded-xl border border-solid border-tailCall-border-dark-200 overflow-hidden">
                  {/* Format tabs + actions */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-solid border-tailCall-border-dark-200">
                    {(["json", "yaml"] as Format[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFormat(f)}
                        className={clsx(
                          "text-xs font-bold px-3 py-1 rounded transition-colors uppercase",
                          f === format
                            ? "bg-tailCall-yellow text-tailCall-dark-500"
                            : "text-tailCall-light-500 hover:text-tailCall-light-100",
                        )}
                      >
                        {f}
                      </button>
                    ))}
                    <div className="ml-auto flex gap-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        disabled={!output}
                        className="text-xs px-3 py-1 rounded border border-solid border-tailCall-border-dark-200 text-tailCall-light-500 hover:text-tailCall-light-100 disabled:opacity-40 transition-colors"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>
                      <button
                        type="button"
                        onClick={handleDownload}
                        disabled={!output}
                        className="text-xs px-3 py-1 rounded bg-tailCall-yellow text-tailCall-dark-500 font-bold hover:opacity-90 disabled:opacity-40 transition-opacity"
                      >
                        Download
                      </button>
                    </div>
                  </div>

                  {/* Code preview */}
                  <pre className="text-xs text-tailCall-light-300 p-4 overflow-auto max-h-[70vh] font-space-mono leading-relaxed whitespace-pre-wrap break-words">
                    {output || (
                      <span className="text-tailCall-dark-100 italic">
                        Fill in fields on the left to generate your configuration…
                      </span>
                    )}
                  </pre>
                </div>

                {/* Tips */}
                <div className="mt-4 p-4 bg-white rounded-xl border border-solid border-tailCall-border-light-500">
                  <h3 className="text-xs font-bold text-tailCall-dark-400 mb-2">Tips</h3>
                  <ul className="text-xs text-tailCall-dark-100 space-y-1 list-disc list-inside leading-relaxed">
                    <li>Click section headers to expand/collapse nested config.</li>
                    <li>Optional fields are marked with an "disabled" badge — toggle to enable.</li>
                    <li>Use the format buttons to switch between JSON and YAML output.</li>
                    <li>Download saves the config file ready for use with Tailcall CLI.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
