import React, {useState} from "react"
import {ChevronDown, ChevronRight, Plus, Trash2, Info} from "lucide-react"
import SearchableSelect from "./SearchableSelect"

interface SchemaFormProps {
  schema: any
  config: any
  onChange: (config: any) => void
}

const SchemaForm: React.FC<SchemaFormProps> = ({schema, config, onChange}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["server", "upstream"]))

  const toggleSection = (key: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedSections(newExpanded)
  }

  const updateConfig = (path: string[], value: any) => {
    const newConfig = {...config}
    let current: any = newConfig

    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {}
      }
      current = current[path[i]]
    }

    if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
      delete current[path[path.length - 1]]
    } else {
      current[path[path.length - 1]] = value
    }

    onChange(newConfig)
  }

  const renderField = (key: string, property: any, path: string[], value: any, required = false) => {
    const fieldPath = [...path, key]
    const fieldId = fieldPath.join(".")

    // Handle references
    if (property.$ref) {
      const refPath = property.$ref.split("/").slice(1)
      let refSchema = schema
      for (const part of refPath) {
        refSchema = refSchema[part]
      }
      if (refSchema) {
        return renderField(key, refSchema, path, value, required)
      }
    }

    // Handle anyOf, oneOf, allOf
    if (property.anyOf || property.oneOf) {
      const options = property.anyOf || property.oneOf
      // Use the first non-null option as the primary schema
      const primaryOption = options.find((opt: any) => opt.type !== "null") || options[0]
      return renderField(key, primaryOption, path, value, required)
    }

    const type = property.type
    const description = property.description

    // Arrays
    if (type === "array" || Array.isArray(type) && type.includes("array")) {
      return renderArrayField(key, property, fieldPath, value || [], description, required)
    }

    // Objects
    if (type === "object" || property.properties) {
      return renderObjectField(key, property, fieldPath, value || {}, description, required)
    }

    // Enums
    if (property.enum) {
      return renderEnumField(key, property, fieldPath, value, description, required)
    }

    // Booleans
    if (type === "boolean" || (Array.isArray(type) && type.includes("boolean"))) {
      return renderBooleanField(key, fieldPath, value, description, required)
    }

    // Numbers
    if (type === "number" || type === "integer" || (Array.isArray(type) && (type.includes("number") || type.includes("integer")))) {
      return renderNumberField(key, property, fieldPath, value, description, required)
    }

    // Strings
    return renderStringField(key, property, fieldPath, value, description, required)
  }

  const renderStringField = (
    key: string,
    property: any,
    path: string[],
    value: any,
    description?: string,
    required = false,
  ) => {
    return (
      <div key={path.join(".")} className="mb-SPACE_04">
        <label className="block text-content-small font-medium text-tailCall-dark-700 mb-SPACE_02">
          {formatLabel(key)}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {description && (
          <div className="flex items-start gap-SPACE_02 mb-SPACE_02 text-content-tiny text-tailCall-dark-100">
            <Info size={14} className="mt-0.5 flex-shrink-0" />
            <span>{description}</span>
          </div>
        )}
        <input
          type="text"
          value={value || ""}
          onChange={(e) => updateConfig(path, e.target.value)}
          placeholder={property.default || `Enter ${formatLabel(key).toLowerCase()}`}
          className="w-full px-SPACE_04 py-SPACE_03 border border-solid border-tailCall-border-light-500 rounded-lg text-content-small outline-none focus:border-tailCall-yellow"
        />
      </div>
    )
  }

  const renderNumberField = (
    key: string,
    property: any,
    path: string[],
    value: any,
    description?: string,
    required = false,
  ) => {
    return (
      <div key={path.join(".")} className="mb-SPACE_04">
        <label className="block text-content-small font-medium text-tailCall-dark-700 mb-SPACE_02">
          {formatLabel(key)}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {description && (
          <div className="flex items-start gap-SPACE_02 mb-SPACE_02 text-content-tiny text-tailCall-dark-100">
            <Info size={14} className="mt-0.5 flex-shrink-0" />
            <span>{description}</span>
          </div>
        )}
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => {
            const val = e.target.value === "" ? undefined : property.type === "integer" ? parseInt(e.target.value) : parseFloat(e.target.value)
            updateConfig(path, val)
          }}
          min={property.minimum}
          max={property.maximum}
          step={property.type === "integer" ? 1 : 0.1}
          placeholder={property.default?.toString() || `Enter ${formatLabel(key).toLowerCase()}`}
          className="w-full px-SPACE_04 py-SPACE_03 border border-solid border-tailCall-border-light-500 rounded-lg text-content-small outline-none focus:border-tailCall-yellow"
        />
      </div>
    )
  }

  const renderBooleanField = (key: string, path: string[], value: any, description?: string, required = false) => {
    return (
      <div key={path.join(".")} className="mb-SPACE_04">
        <label className="flex items-center gap-SPACE_03 cursor-pointer">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => updateConfig(path, e.target.checked)}
            className="w-5 h-5 rounded border-tailCall-border-light-500 text-tailCall-yellow focus:ring-tailCall-yellow cursor-pointer"
          />
          <span className="text-content-small font-medium text-tailCall-dark-700">
            {formatLabel(key)}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </label>
        {description && (
          <div className="flex items-start gap-SPACE_02 mt-SPACE_02 ml-8 text-content-tiny text-tailCall-dark-100">
            <Info size={14} className="mt-0.5 flex-shrink-0" />
            <span>{description}</span>
          </div>
        )}
      </div>
    )
  }

  const renderEnumField = (
    key: string,
    property: any,
    path: string[],
    value: any,
    description?: string,
    required = false,
  ) => {
    const options = property.enum.map((val: any) => ({
      value: val,
      label: String(val),
    }))

    return (
      <div key={path.join(".")} className="mb-SPACE_04">
        <label className="block text-content-small font-medium text-tailCall-dark-700 mb-SPACE_02">
          {formatLabel(key)}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {description && (
          <div className="flex items-start gap-SPACE_02 mb-SPACE_02 text-content-tiny text-tailCall-dark-100">
            <Info size={14} className="mt-0.5 flex-shrink-0" />
            <span>{description}</span>
          </div>
        )}
        <SearchableSelect
          options={options}
          value={value}
          onChange={(val) => updateConfig(path, val)}
          placeholder={`Select ${formatLabel(key).toLowerCase()}`}
        />
      </div>
    )
  }

  const renderArrayField = (
    key: string,
    property: any,
    path: string[],
    value: any[],
    description?: string,
    required = false,
  ) => {
    const items = property.items || {}
    const isExpanded = expandedSections.has(path.join("."))

    const addItem = () => {
      const newValue = [...value]
      // Initialize new item based on type
      if (items.type === "object" || items.properties) {
        newValue.push({})
      } else if (items.type === "array") {
        newValue.push([])
      } else if (items.type === "boolean") {
        newValue.push(false)
      } else if (items.type === "number" || items.type === "integer") {
        newValue.push(0)
      } else {
        newValue.push("")
      }
      updateConfig(path, newValue)
    }

    const removeItem = (index: number) => {
      const newValue = value.filter((_, i) => i !== index)
      updateConfig(path, newValue.length > 0 ? newValue : undefined)
    }

    const updateItem = (index: number, itemValue: any) => {
      const newValue = [...value]
      newValue[index] = itemValue
      updateConfig(path, newValue)
    }

    return (
      <div key={path.join(".")} className="mb-SPACE_04 border border-solid border-tailCall-border-light-500 rounded-lg p-SPACE_04">
        <div className="flex items-start justify-between mb-SPACE_03">
          <div className="flex-1">
            <button
              onClick={() => toggleSection(path.join("."))}
              className="flex items-center gap-SPACE_02 text-content-small font-medium text-tailCall-dark-700 hover:text-tailCall-dark-500"
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              {formatLabel(key)}
              {required && <span className="text-red-500 ml-1">*</span>}
              <span className="text-content-tiny text-tailCall-dark-100 ml-2">({value.length} items)</span>
            </button>
            {description && (
              <div className="flex items-start gap-SPACE_02 mt-SPACE_02 text-content-tiny text-tailCall-dark-100">
                <Info size={14} className="mt-0.5 flex-shrink-0" />
                <span>{description}</span>
              </div>
            )}
          </div>
          <button
            onClick={addItem}
            className="flex items-center gap-SPACE_02 px-SPACE_03 py-SPACE_01 bg-tailCall-yellow text-tailCall-dark-700 rounded text-content-tiny font-medium hover:opacity-90"
          >
            <Plus size={14} />
            Add
          </button>
        </div>

        {isExpanded && value.length > 0 && (
          <div className="space-y-SPACE_03 mt-SPACE_03">
            {value.map((item, index) => (
              <div key={index} className="bg-white rounded p-SPACE_03 border border-solid border-tailCall-border-light-300">
                <div className="flex items-start justify-between mb-SPACE_02">
                  <span className="text-content-tiny font-medium text-tailCall-dark-700">Item {index + 1}</span>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                {renderArrayItemField(items, [...path, index.toString()], item, (val) => updateItem(index, val))}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderArrayItemField = (itemSchema: any, path: string[], value: any, onChange: (value: any) => void) => {
    // Handle references
    if (itemSchema.$ref) {
      const refPath = itemSchema.$ref.split("/").slice(1)
      let refSchema = schema
      for (const part of refPath) {
        refSchema = refSchema[part]
      }
      if (refSchema) {
        itemSchema = refSchema
      }
    }

    if (itemSchema.type === "object" || itemSchema.properties) {
      const properties = itemSchema.properties || {}
      const required = itemSchema.required || []

      return (
        <div className="space-y-SPACE_03">
          {Object.entries(properties).map(([propKey, propSchema]: [string, any]) => {
            const propValue = value?.[propKey]
            return renderField(propKey, propSchema, path, propValue, required.includes(propKey))
          })}
        </div>
      )
    }

    if (itemSchema.enum) {
      const options = itemSchema.enum.map((val: any) => ({
        value: val,
        label: String(val),
      }))

      return (
        <SearchableSelect
          options={options}
          value={value}
          onChange={onChange}
          placeholder="Select value"
        />
      )
    }

    if (itemSchema.type === "boolean") {
      return (
        <label className="flex items-center gap-SPACE_02 cursor-pointer">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 rounded border-tailCall-border-light-500 text-tailCall-yellow focus:ring-tailCall-yellow cursor-pointer"
          />
          <span className="text-content-small">Enabled</span>
        </label>
      )
    }

    if (itemSchema.type === "number" || itemSchema.type === "integer") {
      return (
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => {
            const val = e.target.value === "" ? undefined : itemSchema.type === "integer" ? parseInt(e.target.value) : parseFloat(e.target.value)
            onChange(val)
          }}
          className="w-full px-SPACE_03 py-SPACE_02 border border-solid border-tailCall-border-light-500 rounded text-content-small outline-none focus:border-tailCall-yellow"
        />
      )
    }

    return (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-SPACE_03 py-SPACE_02 border border-solid border-tailCall-border-light-500 rounded text-content-small outline-none focus:border-tailCall-yellow"
      />
    )
  }

  const renderObjectField = (
    key: string,
    property: any,
    path: string[],
    value: any,
    description?: string,
    required = false,
  ) => {
    const properties = property.properties || {}
    const requiredFields = property.required || []
    const isExpanded = expandedSections.has(path.join("."))

    if (Object.keys(properties).length === 0) {
      // Free-form object
      return renderStringField(key, property, path, value ? JSON.stringify(value) : "", description, required)
    }

    return (
      <div key={path.join(".")} className="mb-SPACE_04 border border-solid border-tailCall-border-light-500 rounded-lg p-SPACE_04">
        <button
          onClick={() => toggleSection(path.join("."))}
          className="flex items-center gap-SPACE_02 text-content-small font-medium text-tailCall-dark-700 hover:text-tailCall-dark-500 mb-SPACE_03"
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          {formatLabel(key)}
          {required && <span className="text-red-500 ml-1">*</span>}
        </button>
        {description && (
          <div className="flex items-start gap-SPACE_02 mb-SPACE_03 text-content-tiny text-tailCall-dark-100">
            <Info size={14} className="mt-0.5 flex-shrink-0" />
            <span>{description}</span>
          </div>
        )}

        {isExpanded && (
          <div className="ml-SPACE_04 space-y-SPACE_03">
            {Object.entries(properties).map(([propKey, propSchema]: [string, any]) => {
              const propValue = value?.[propKey]
              return renderField(propKey, propSchema, path, propValue, requiredFields.includes(propKey))
            })}
          </div>
        )}
      </div>
    )
  }

  const formatLabel = (key: string): string => {
    return key
      .split(/(?=[A-Z])|_/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const properties = schema.properties || {}
  const requiredFields = schema.required || []

  return (
    <div className="space-y-SPACE_04">
      <div className="mb-SPACE_06">
        <h2 className="text-title-medium text-tailCall-dark-700 mb-SPACE_02">Configuration Fields</h2>
        <p className="text-content-small text-tailCall-dark-100">
          Configure your Tailcall setup. Expand sections to see more options.
        </p>
      </div>

      {Object.entries(properties)
        .sort(([keyA], [keyB]) => {
          // Sort to show important fields first
          const priority: Record<string, number> = {
            server: 1,
            upstream: 2,
            schema: 3,
            links: 4,
          }
          return (priority[keyA] || 99) - (priority[keyB] || 99)
        })
        .map(([key, property]: [string, any]) => {
          const value = config[key]
          return renderField(key, property, [], value, requiredFields.includes(key))
        })}
    </div>
  )
}

export default SchemaForm
