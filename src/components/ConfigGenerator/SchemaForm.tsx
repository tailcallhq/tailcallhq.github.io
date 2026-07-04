import React, {useState} from "react"
import SearchableSelect, {type SelectOption} from "./SearchableSelect"
import {deref, typeOf, variantLabel, variantsOf, type JSONSchema} from "./jsonSchema"
import styles from "./styles.module.css"

type FormProps = {
  schema: JSONSchema
  root: JSONSchema
  value: unknown
  onChange: (value: unknown) => void
  // Extra options offered to string controls (e.g. known GraphQL type names).
  suggestions?: SelectOption[]
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v)

// A sensible empty value for a freshly added property of the given schema.
function defaultFor(schema: JSONSchema, root: JSONSchema): unknown {
  const node = deref(schema, root)
  const type = typeOf(node)
  if (type === "object") return {}
  if (type === "array") return []
  if (type === "boolean") return false
  return ""
}

// -- primitive controls -------------------------------------------------------

const StringControl = ({value, onChange, suggestions, node}: FormProps & {node: JSONSchema}): JSX.Element => {
  if (suggestions && suggestions.length > 0) {
    return (
      <SearchableSelect
        value={typeof value === "string" ? value : ""}
        options={suggestions}
        onChange={onChange}
        allowCustom
        placeholder={node.description ? undefined : "Enter a value…"}
      />
    )
  }
  return (
    <input
      className={styles.input}
      type="text"
      value={typeof value === "string" ? value : ""}
      placeholder={node.default !== undefined ? String(node.default) : ""}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

const NumberControl = ({value, onChange}: FormProps): JSX.Element => (
  <input
    className={styles.input}
    type="number"
    value={typeof value === "number" ? value : ""}
    onChange={(e) => {
      const raw = e.target.value
      onChange(raw === "" ? "" : Number(raw))
    }}
  />
)

const BooleanControl = ({value, onChange}: FormProps): JSX.Element => (
  <label className={styles.toggle}>
    <input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} />
    <span>{value === true ? "true" : "false"}</span>
  </label>
)

const EnumControl = ({value, onChange, node}: FormProps & {node: JSONSchema}): JSX.Element => {
  const options: SelectOption[] = (node.enum ?? []).map((option) => ({value: String(option), label: String(option)}))
  return (
    <SearchableSelect
      value={value === undefined || value === null ? "" : String(value)}
      options={options}
      onChange={onChange}
      placeholder="Select…"
    />
  )
}

// -- variant (anyOf / oneOf) --------------------------------------------------

const VariantForm = ({schema, root, value, onChange, suggestions}: FormProps): JSX.Element => {
  const variants = variantsOf(schema) ?? []
  const [index, setIndex] = useState(0)
  const options: SelectOption[] = variants.map((variant, i) => ({
    value: String(i),
    label: variantLabel(variant, root, i),
  }))
  const active = variants[index] ?? {}
  return (
    <div className={styles.group}>
      <SearchableSelect value={String(index)} options={options} onChange={(v) => setIndex(Number(v))} />
      <div className={styles.groupBody}>
        <SchemaForm schema={active} root={root} value={value} onChange={onChange} suggestions={suggestions} />
      </div>
    </div>
  )
}

// -- arrays -------------------------------------------------------------------

const ArrayEditor = ({schema, root, value, onChange, suggestions}: FormProps): JSX.Element => {
  const items = Array.isArray(value) ? value : []
  const itemSchema = schema.items ?? {type: "string"}
  const update = (i: number, next: unknown) => onChange(items.map((item, j) => (j === i ? next : item)))
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i))
  const add = () => onChange([...items, defaultFor(itemSchema, root)])
  return (
    <div className={styles.group}>
      {items.map((item, i) => (
        <div className={styles.arrayRow} key={i}>
          <div className={styles.arrayItem}>
            <SchemaForm
              schema={itemSchema}
              root={root}
              value={item}
              onChange={(v) => update(i, v)}
              suggestions={suggestions}
            />
          </div>
          <button type="button" className={styles.removeBtn} aria-label="Remove item" onClick={() => remove(i)}>
            ✕
          </button>
        </div>
      ))}
      <button type="button" className={styles.addBtn} onClick={add}>
        + Add item
      </button>
    </div>
  )
}

// -- object with fixed properties ---------------------------------------------

const ObjectControl = ({schema, root, value, onChange, suggestions}: FormProps): JSX.Element => {
  const obj = isPlainObject(value) ? value : {}
  const properties = schema.properties ?? {}
  const required = new Set(schema.required ?? [])
  const propKeys = Object.keys(properties)
  const mapSchema = isPlainObject(schema.additionalProperties) ? (schema.additionalProperties as JSONSchema) : undefined

  const setProp = (key: string, next: unknown) => onChange({...obj, [key]: next})
  const unsetProp = (key: string) => {
    const {[key]: _removed, ...rest} = obj
    onChange(rest)
  }

  const visibleKeys = propKeys.filter((key) => required.has(key) || obj[key] !== undefined)
  const hiddenKeys = propKeys.filter((key) => !required.has(key) && obj[key] === undefined)
  const addOptions: SelectOption[] = hiddenKeys.map((key) => ({
    value: key,
    label: key,
    description: shortDescription(properties[key], root),
  }))

  return (
    <div className={styles.objectBody}>
      {visibleKeys.map((key) => {
        const childSchema = properties[key]
        const child = deref(childSchema, root)
        const isRequired = required.has(key)
        const childIsObjectLike =
          child.type === "object" ||
          Boolean(child.properties) ||
          isPlainObject(child.additionalProperties) ||
          Boolean(child.anyOf) ||
          Boolean(child.oneOf)
        // Offer the type picker on `type` fields; otherwise only propagate the
        // suggestion list through nested objects so deeper `type` fields see it.
        const childSuggestions = key === "type" ? suggestions : childIsObjectLike ? suggestions : undefined
        return (
          <div className={styles.field} key={key}>
            <div className={styles.fieldHeader}>
              <label className={styles.fieldLabel}>
                {key}
                {isRequired && <span className={styles.requiredMark}>*</span>}
              </label>
              {!isRequired && (
                <button type="button" className={styles.clearBtn} onClick={() => unsetProp(key)}>
                  remove
                </button>
              )}
            </div>
            {child.description && <p className={styles.fieldDesc}>{child.description}</p>}
            <SchemaForm
              schema={childSchema}
              root={root}
              value={obj[key]}
              onChange={(next) => setProp(key, next)}
              suggestions={childSuggestions}
            />
          </div>
        )
      })}

      {mapSchema && (
        <MapEditor
          schema={mapSchema}
          root={root}
          value={obj}
          onChange={onChange}
          propKeys={propKeys}
          suggestions={suggestions}
        />
      )}

      {addOptions.length > 0 && (
        <div className={styles.addRow}>
          <SearchableSelect
            value=""
            options={addOptions}
            onChange={(key) => setProp(key, defaultFor(properties[key], root))}
            placeholder="+ Add field"
          />
        </div>
      )}
    </div>
  )
}

// -- object used as a map (additionalProperties) ------------------------------

type MapProps = FormProps & {propKeys: string[]}

const MapEditor = ({schema, root, value, onChange, propKeys, suggestions}: MapProps): JSX.Element => {
  const obj = isPlainObject(value) ? value : {}
  const reserved = new Set(propKeys)
  const entries = Object.keys(obj).filter((key) => !reserved.has(key))
  const [draft, setDraft] = useState("")

  const addEntry = () => {
    const key = draft.trim()
    if (!key || key in obj) return
    onChange({...obj, [key]: defaultFor(schema, root)})
    setDraft("")
  }

  return (
    <div className={styles.mapEditor}>
      {entries.map((key) => (
        <MapEntry
          key={key}
          name={key}
          schema={schema}
          root={root}
          value={obj[key]}
          existing={Object.keys(obj)}
          suggestions={suggestions}
          onChangeValue={(next) => onChange({...obj, [key]: next})}
          onRename={(nextName) => {
            const nextName2 = nextName.trim()
            if (!nextName2 || nextName2 === key || nextName2 in obj) return
            const rebuilt: Record<string, unknown> = {}
            for (const [k, v] of Object.entries(obj)) rebuilt[k === key ? nextName2 : k] = v
            onChange(rebuilt)
          }}
          onRemove={() => {
            const {[key]: _removed, ...rest} = obj
            onChange(rest)
          }}
        />
      ))}
      <div className={styles.addRow}>
        <input
          className={styles.input}
          value={draft}
          placeholder="New name…"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addEntry()
            }
          }}
        />
        <button type="button" className={styles.addBtn} onClick={addEntry}>
          + Add
        </button>
      </div>
    </div>
  )
}

type MapEntryProps = {
  name: string
  schema: JSONSchema
  root: JSONSchema
  value: unknown
  existing: string[]
  suggestions?: SelectOption[]
  onChangeValue: (value: unknown) => void
  onRename: (name: string) => void
  onRemove: () => void
}

const MapEntry = ({
  name,
  schema,
  root,
  value,
  suggestions,
  onChangeValue,
  onRename,
  onRemove,
}: MapEntryProps): JSX.Element => {
  const [localName, setLocalName] = useState(name)
  return (
    <div className={styles.mapEntry}>
      <div className={styles.mapEntryHeader}>
        <input
          className={styles.mapKey}
          value={localName}
          aria-label="Name"
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={() => onRename(localName)}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur()
          }}
        />
        <button type="button" className={styles.removeBtn} aria-label="Remove" onClick={onRemove}>
          ✕
        </button>
      </div>
      <div className={styles.mapEntryBody}>
        <SchemaForm schema={schema} root={root} value={value} onChange={onChangeValue} suggestions={suggestions} />
      </div>
    </div>
  )
}

function shortDescription(schema: JSONSchema, root: JSONSchema): string | undefined {
  const node = deref(schema, root)
  if (!node.description) return undefined
  return node.description.length > 80 ? `${node.description.slice(0, 77)}…` : node.description
}

// -- dispatch -----------------------------------------------------------------

const SchemaForm = (props: FormProps): JSX.Element => {
  const node = deref(props.schema, props.root)

  if (node.anyOf || node.oneOf) {
    // schemars encodes Option<T> as anyOf: [T, {type: "null"}]. Drop the null
    // branch so an optional field renders as its real control, not a pointless
    // two-way "Type / null" selector.
    const variants = (variantsOf(node) ?? []).filter((v) => typeOf(deref(v, props.root)) !== "null")
    if (variants.length <= 1) return <SchemaForm {...props} schema={variants[0] ?? {type: "string"}} />
    return <VariantForm {...props} schema={{...node, anyOf: undefined, oneOf: variants}} />
  }
  if (node.enum && node.enum.length > 0) return <EnumControl {...props} node={node} />

  const type = typeOf(node)
  if (type === "boolean") return <BooleanControl {...props} />
  if (type === "integer" || type === "number") return <NumberControl {...props} />
  if (type === "array") return <ArrayEditor {...props} schema={node} />
  if (type === "object" || node.properties || isPlainObject(node.additionalProperties)) {
    return <ObjectControl {...props} schema={node} />
  }
  return <StringControl {...props} node={node} />
}

export default SchemaForm
