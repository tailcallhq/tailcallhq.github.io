// Serializers that turn the in-memory configuration model into the three
// formats Tailcall accepts: JSON, YAML and GraphQL SDL. Everything here is a
// pure function so it can be unit- or e2e-tested in isolation.

type Dict = Record<string, unknown>

const isPlainObject = (v: unknown): v is Dict => typeof v === "object" && v !== null && !Array.isArray(v)

// Drop empty/undefined leaves so the generated output stays clean: undefined,
// empty strings, empty objects and empty arrays are all treated as "unset".
export function prune(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(prune).filter((v) => v !== undefined)
  }
  if (isPlainObject(value)) {
    const out: Dict = {}
    for (const [key, raw] of Object.entries(value)) {
      const pruned = prune(raw)
      if (pruned === undefined) continue
      if (pruned === "") continue
      if (isPlainObject(pruned) && Object.keys(pruned).length === 0) continue
      if (Array.isArray(pruned) && pruned.length === 0) continue
      out[key] = pruned
    }
    return out
  }
  return value
}

export function toJSON(model: unknown): string {
  return JSON.stringify(prune(model), null, 2)
}

// -- YAML ---------------------------------------------------------------------

function needsQuote(s: string): boolean {
  if (s === "") return true
  if (/^\s|\s$/.test(s)) return true
  if (/[\n\t\r]/.test(s)) return true
  if (/[:#\[\]{}&*!|>'"%@`,]/.test(s)) return true
  if (/^[-?]/.test(s)) return true
  if (/^(true|false|null|~|yes|no|on|off)$/i.test(s)) return true
  if (/^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/.test(s)) return true
  return false
}

function scalarYaml(value: unknown): string {
  if (value === null || value === undefined) return "null"
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "number") return String(value)
  if (typeof value === "object") return JSON.stringify(value)
  const s = String(value)
  if (!needsQuote(s)) return s
  const escaped = s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t")
    .replace(/\r/g, "\\r")
  return `"${escaped}"`
}

function yamlLines(value: unknown, indent: number): string[] {
  const pad = "  ".repeat(indent)
  if (Array.isArray(value)) {
    const lines: string[] = []
    for (const item of value) {
      if (isPlainObject(item) && Object.keys(item).length > 0) {
        const entries = Object.entries(item).filter(([, v]) => v !== undefined)
        entries.forEach(([key, raw], i) => {
          const prefix = i === 0 ? `${pad}- ` : `${pad}  `
          appendEntry(lines, prefix, `${pad}  `, key, raw)
        })
      } else {
        lines.push(`${pad}- ${scalarYaml(item)}`)
      }
    }
    return lines
  }
  if (isPlainObject(value)) {
    const lines: string[] = []
    for (const [key, raw] of Object.entries(value)) {
      if (raw === undefined) continue
      appendEntry(lines, pad, pad, key, raw)
    }
    return lines
  }
  return [`${pad}${scalarYaml(value)}`]
}

// Emit a single `key: value` entry, recursing for containers. `firstPad` is the
// indentation for the key line; `childIndentPad` is used to compute the child
// indent level for nested blocks.
function appendEntry(lines: string[], firstPad: string, childIndentPad: string, key: string, raw: unknown): void {
  const childIndent = childIndentPad.length / 2 + 1
  if (Array.isArray(raw)) {
    if (raw.length === 0) {
      lines.push(`${firstPad}${key}: []`)
      return
    }
    lines.push(`${firstPad}${key}:`)
    for (const line of yamlLines(raw, childIndent)) lines.push(line)
    return
  }
  if (isPlainObject(raw)) {
    if (Object.keys(raw).length === 0) {
      lines.push(`${firstPad}${key}: {}`)
      return
    }
    lines.push(`${firstPad}${key}:`)
    for (const line of yamlLines(raw, childIndent)) lines.push(line)
    return
  }
  lines.push(`${firstPad}${key}: ${scalarYaml(raw)}`)
}

export function toYAML(model: unknown): string {
  const pruned = prune(model)
  if (!isPlainObject(pruned) || Object.keys(pruned).length === 0) return "{}\n"
  return yamlLines(pruned, 0).join("\n") + "\n"
}

// -- GraphQL SDL --------------------------------------------------------------

function gqlValue(value: unknown): string {
  if (typeof value === "string") return JSON.stringify(value)
  if (typeof value === "boolean" || typeof value === "number") return String(value)
  if (Array.isArray(value)) return `[${value.map(gqlValue).join(", ")}]`
  if (isPlainObject(value)) {
    return `{${Object.entries(value)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${k}: ${gqlValue(v)}`)
      .join(", ")}}`
  }
  return JSON.stringify(value)
}

// Directive arguments whose values are GraphQL enums — emitted as bare
// identifiers (e.g. `method: POST`) rather than quoted strings, which is what
// valid SDL requires.
const ENUM_ARG_KEYS = new Set(["method", "type", "encoding", "format"])
const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/

function gqlArgs(obj: unknown): string {
  if (!isPlainObject(obj)) return ""
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => {
      if (ENUM_ARG_KEYS.has(k) && typeof v === "string" && IDENTIFIER.test(v)) return `${k}: ${v}`
      return `${k}: ${gqlValue(v)}`
    })
    .join(", ")
}

const RESERVED_FIELD_KEYS = new Set(["type", "required", "doc", "args", "name"])

function gqlField(name: string, field: unknown): string {
  const f = isPlainObject(field) ? field : {}
  let type = typeof f.type === "string" ? f.type : "JSON"
  if (f.required === true && !type.endsWith("!")) type = `${type}!`
  const directives: string[] = []
  for (const [key, value] of Object.entries(f)) {
    if (RESERVED_FIELD_KEYS.has(key)) continue
    if (isPlainObject(value)) {
      const args = gqlArgs(value)
      directives.push(args ? `@${key}(${args})` : `@${key}`)
    } else if (value === true) {
      directives.push(`@${key}`)
    }
  }
  const suffix = directives.length > 0 ? ` ${directives.join(" ")}` : ""
  return `  ${name}: ${type}${suffix}`
}

export function toGraphQL(model: unknown): string {
  const m = isPlainObject(model) ? model : {}
  const blocks: string[] = []

  const directives: string[] = []
  if (isPlainObject(m.server) && Object.keys(m.server).length > 0) directives.push(`@server(${gqlArgs(m.server)})`)
  if (isPlainObject(m.upstream) && Object.keys(m.upstream).length > 0) {
    directives.push(`@upstream(${gqlArgs(m.upstream)})`)
  }
  if (Array.isArray(m.links)) {
    for (const link of m.links) {
      const args = gqlArgs(link)
      if (args) directives.push(`@link(${args})`)
    }
  }
  const roots = isPlainObject(m.schema) ? m.schema : {}
  const rootLines = ["query", "mutation", "subscription"]
    .filter((k) => typeof roots[k] === "string" && roots[k] !== "")
    .map((k) => `  ${k}: ${roots[k]}`)
  if (directives.length > 0 || rootLines.length > 0) {
    const dir = directives.length > 0 ? ` ${directives.join(" ")}` : ""
    const body = rootLines.length > 0 ? ` {\n${rootLines.join("\n")}\n}` : ""
    blocks.push(`schema${dir}${body}`)
  }

  if (isPlainObject(m.enums)) {
    for (const [name, def] of Object.entries(m.enums)) {
      const variants = isPlainObject(def) && Array.isArray(def.variants) ? def.variants : []
      blocks.push(`enum ${name} {\n${variants.map((v) => `  ${v}`).join("\n")}\n}`)
    }
  }

  if (isPlainObject(m.unions)) {
    for (const [name, def] of Object.entries(m.unions)) {
      const types = isPlainObject(def) && Array.isArray(def.types) ? def.types : []
      blocks.push(`union ${name} = ${types.join(" | ")}`)
    }
  }

  if (isPlainObject(m.types)) {
    for (const [name, def] of Object.entries(m.types)) {
      const fields = isPlainObject(def) && isPlainObject(def.fields) ? def.fields : {}
      const lines = Object.entries(fields).map(([fieldName, field]) => gqlField(fieldName, field))
      blocks.push(`type ${name} {\n${lines.join("\n")}\n}`)
    }
  }

  return blocks.length > 0 ? `${blocks.join("\n\n")}\n` : ""
}

export type OutputFormat = "graphql" | "json" | "yaml"

export function serialize(model: unknown, format: OutputFormat): string {
  if (format === "json") return toJSON(model)
  if (format === "yaml") return toYAML(model)
  return toGraphQL(model)
}
