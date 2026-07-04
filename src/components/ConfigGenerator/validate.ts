// A small, defensive JSON Schema validator. It intentionally covers only the
// checks that keep a Tailcall config "correct": required properties, primitive
// types, enum membership, array items and map (additionalProperties) values.
// Anything it cannot confidently evaluate (anyOf/oneOf variants) is accepted
// rather than reported, so the surface never produces false positives.

import {deref, typeOf, type JSONSchema} from "./jsonSchema"

export type ValidationError = {path: string; message: string}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v)

function matchesType(value: unknown, type: string): boolean {
  switch (type) {
    case "object":
      return isPlainObject(value)
    case "array":
      return Array.isArray(value)
    case "string":
      return typeof value === "string"
    case "boolean":
      return typeof value === "boolean"
    case "integer":
      return typeof value === "number" && Number.isInteger(value)
    case "number":
      return typeof value === "number"
    case "null":
      return value === null
    default:
      return true
  }
}

function walk(value: unknown, schema: JSONSchema, root: JSONSchema, path: string, out: ValidationError[]): void {
  if (out.length > 200) return
  if (value === undefined || value === null) return
  const node = deref(schema, root)

  // Variants: accept if any branch is plausible; never report here.
  if (node.anyOf || node.oneOf) return

  if (node.enum && node.enum.length > 0) {
    if (!node.enum.some((option) => option === value)) {
      out.push({path, message: `must be one of: ${node.enum.map((o) => String(o)).join(", ")}`})
    }
    return
  }

  const type = typeOf(node)
  if (type && !matchesType(value, type)) {
    out.push({path, message: `expected ${type}`})
    return
  }

  if (isPlainObject(value)) {
    for (const key of node.required ?? []) {
      const present = value[key] !== undefined && value[key] !== null && value[key] !== ""
      if (!present) out.push({path: path ? `${path}.${key}` : key, message: "is required"})
    }
    const props = node.properties ?? {}
    const extra = node.additionalProperties
    for (const [key, child] of Object.entries(value)) {
      const childPath = path ? `${path}.${key}` : key
      if (props[key]) {
        walk(child, props[key], root, childPath, out)
      } else if (isPlainObject(extra)) {
        walk(child, extra, root, childPath, out)
      } else if (extra === false && Object.keys(props).length > 0) {
        out.push({path: childPath, message: "unknown property"})
      }
    }
  }

  if (Array.isArray(value) && node.items) {
    value.forEach((item, i) => walk(item, node.items as JSONSchema, root, `${path}[${i}]`, out))
  }
}

export function validateConfig(value: unknown, schema: JSONSchema): ValidationError[] {
  const out: ValidationError[] = []
  try {
    walk(value, schema, schema, "", out)
  } catch {
    // Validation is advisory; a malformed schema must never break the UI.
  }
  return out
}
