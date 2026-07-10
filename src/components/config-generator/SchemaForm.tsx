import React, {useState} from "react"
import {JSONSchema, resolveRef} from "./schemaUtils"
import FieldRenderer from "./FieldRenderer"

interface SchemaFormProps {
  schema: JSONSchema
  value: Record<string, unknown>
  onChange: (data: Record<string, unknown>) => void
}

const SchemaForm = ({schema, value, onChange}: SchemaFormProps): JSX.Element => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["server", "upstream"]))
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // Get the root properties from the schema
  const rootSchema = resolveRef(schema, schema)
  const properties = rootSchema.properties || {}

  const filteredProperties = Object.entries(properties).filter(([key]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFieldChange = (key: string, val: unknown) => {
    const updated = {...value}
    if (val === undefined || val === null || val === "") {
      delete updated[key]
    } else {
      updated[key] = val
    }
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tailCall-light-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search configuration fields..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-tailCall-dark-500 border border-tailCall-border-dark-300 rounded-lg text-tailCall-light-100 placeholder-tailCall-light-600 focus:outline-none focus:border-tailCall-yellow text-sm"
        />
      </div>

      {/* Sections */}
      {filteredProperties.map(([key, fieldSchema]) => {
        const resolved = resolveRef(schema, fieldSchema as JSONSchema)
        const isExpanded = expandedSections.has(key)
        const isObject = resolved.type === "object" || resolved.properties
        const hasValue = value[key] !== undefined && value[key] !== null

        return (
          <div
            key={key}
            className="border border-tailCall-border-dark-300 rounded-xl overflow-hidden"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(key)}
              className="w-full flex items-center justify-between px-4 py-3 bg-tailCall-dark-500 hover:bg-tailCall-dark-400 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-tailCall-light-100 capitalize">
                  {key}
                </span>
                {hasValue && (
                  <span className="px-2 py-0.5 bg-tailCall-yellow/20 text-tailCall-yellow text-xs rounded-full">
                    configured
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {resolved.description && (
                  <span className="hidden sm:block text-xs text-tailCall-light-600 max-w-xs truncate">
                    {resolved.description}
                  </span>
                )}
                <svg
                  className={`w-4 h-4 text-tailCall-light-600 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Section Content */}
            {isExpanded && (
              <div className="p-4 bg-tailCall-dark-600 border-t border-tailCall-border-dark-300">
                {resolved.description && (
                  <p className="text-xs text-tailCall-light-600 mb-4 leading-relaxed">{resolved.description}</p>
                )}
                <FieldRenderer
                  schema={schema}
                  fieldSchema={fieldSchema as JSONSchema}
                  value={value[key]}
                  onChange={(val) => handleFieldChange(key, val)}
                  fieldName={key}
                  depth={0}
                />
              </div>
            )}
          </div>
        )
      })}

      {filteredProperties.length === 0 && (
        <div className="text-center py-12 text-tailCall-light-600">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>No fields match your search.</p>
        </div>
      )}
    </div>
  )
}

export default SchemaForm
