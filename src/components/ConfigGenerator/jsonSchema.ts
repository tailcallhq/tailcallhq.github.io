// Minimal JSON Schema (draft-07) model and helpers used to drive the
// Tailcall configuration form. The real schema is fetched at runtime from
// `.tailcallrc.schema.json`; these helpers stay deliberately small and only
// depend on the constructs schemars (Tailcall's generator) actually emits:
// `$ref`, `definitions`, `allOf`, `anyOf`/`oneOf`, `enum`, `properties`,
// `required`, `additionalProperties`, `items`.

export type JSONSchema = {
  $ref?: string
  $schema?: string
  title?: string
  description?: string
  type?: string | string[]
  format?: string
  properties?: Record<string, JSONSchema>
  required?: string[]
  items?: JSONSchema
  enum?: Array<string | number | boolean | null>
  additionalProperties?: boolean | JSONSchema
  allOf?: JSONSchema[]
  anyOf?: JSONSchema[]
  oneOf?: JSONSchema[]
  default?: unknown
  definitions?: Record<string, JSONSchema>
  $defs?: Record<string, JSONSchema>
  [key: string]: unknown
}

export type ConfigValue = unknown

// The canonical location of the Tailcall config schema. Loaded dynamically so
// the form always reflects the current shape of the configuration.
export const SCHEMA_URL = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

// Resolve a local `$ref` ("#/definitions/Foo" or "#/$defs/Foo") against the
// root schema. Returns `undefined` for unknown or remote refs.
export function resolveRef(ref: string, root: JSONSchema): JSONSchema | undefined {
  if (!ref.startsWith("#/")) return undefined
  const parts = ref.slice(2).split("/")
  let node: unknown = root
  for (const part of parts) {
    if (node && typeof node === "object" && part in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[part]
    } else {
      return undefined
    }
  }
  return node as JSONSchema
}

// Collapse a schema node into something directly renderable: follow a single
// `$ref` and merge `allOf` branches (properties/required union). Bounded depth
// guards against cyclic schemas.
export function deref(node: JSONSchema | undefined, root: JSONSchema, depth = 0): JSONSchema {
  if (!node || depth > 32) return node ?? {}
  if (node.$ref) {
    const target = resolveRef(node.$ref, root)
    return deref(target, root, depth + 1)
  }
  if (node.allOf && node.allOf.length > 0) {
    const merged: JSONSchema = {type: "object", properties: {}, required: []}
    for (const branch of node.allOf) {
      const resolved = deref(branch, root, depth + 1)
      merged.properties = {...merged.properties, ...resolved.properties}
      merged.required = [...(merged.required ?? []), ...(resolved.required ?? [])]
      if (resolved.type) merged.type = resolved.type
      if (resolved.enum) merged.enum = resolved.enum
      if (resolved.additionalProperties !== undefined) merged.additionalProperties = resolved.additionalProperties
    }
    // Preserve sibling keywords declared alongside allOf.
    return {...node, ...merged, properties: merged.properties, required: merged.required}
  }
  return node
}

// The list of variant schemas for a `anyOf`/`oneOf` node, if any.
export function variantsOf(node: JSONSchema): JSONSchema[] | undefined {
  return node.anyOf ?? node.oneOf
}

// A short human label for a schema variant, used in the variant selector.
export function variantLabel(node: JSONSchema, root: JSONSchema, index: number): string {
  if (node.$ref) return node.$ref.split("/").pop() ?? `Option ${index + 1}`
  const d = deref(node, root)
  if (d.title) return d.title
  if (typeof d.type === "string") return d.type
  if (d.enum && d.enum.length > 0) return String(d.enum[0])
  return `Option ${index + 1}`
}

// The effective `type` string of a node, if unambiguous.
export function typeOf(node: JSONSchema): string | undefined {
  if (typeof node.type === "string") return node.type
  if (Array.isArray(node.type)) return node.type.find((t) => t !== "null")
  return undefined
}

// Fetch the schema over the network. Callers are expected to fall back to the
// bundled snapshot when this rejects (offline, rate-limited, or CI).
export async function fetchSchema(url: string = SCHEMA_URL): Promise<JSONSchema> {
  const res = await fetch(url, {headers: {Accept: "application/json"}})
  if (!res.ok) throw new Error(`Schema request failed with ${res.status}`)
  return (await res.json()) as JSONSchema
}
