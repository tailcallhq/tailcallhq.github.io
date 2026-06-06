import React, {useEffect, useState} from "react"
import {Download, FileJson, FileText, Code2} from "lucide-react"
import toast, {Toaster} from "react-hot-toast"
import SchemaForm from "./SchemaForm"

const SCHEMA_URL = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

export type OutputFormat = "json" | "yaml" | "graphql"

const ConfigGeneratorUI = () => {
  const [schema, setSchema] = useState<any>(null)
  const [config, setConfig] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("json")

  useEffect(() => {
    loadSchema()
  }, [])

  const loadSchema = async () => {
    try {
      setLoading(true)
      const response = await fetch(SCHEMA_URL)
      if (!response.ok) {
        throw new Error("Failed to load schema")
      }
      const schemaData = await response.json()
      setSchema(schemaData)

      // Initialize config with default values based on schema
      const initialConfig: any = {}
      if (schemaData.properties) {
        Object.keys(schemaData.properties).forEach((key) => {
          const prop = schemaData.properties[key]
          if (prop.default !== undefined) {
            initialConfig[key] = prop.default
          }
        })
      }
      setConfig(initialConfig)
    } catch (error) {
      toast.error("Failed to load schema. Please try again.")
      console.error("Schema loading error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfigChange = (newConfig: any) => {
    setConfig(newConfig)
  }

  const convertToYAML = (obj: any, indent = 0): string => {
    const spaces = "  ".repeat(indent)
    let yaml = ""

    if (obj === null || obj === undefined) {
      return "null"
    }

    if (typeof obj !== "object") {
      if (typeof obj === "string") {
        // Check if string needs quotes
        if (obj.includes(":") || obj.includes("#") || obj.includes("\n")) {
          return `"${obj.replace(/"/g, '\\"')}"`
        }
        return obj
      }
      return String(obj)
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]"
      obj.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          yaml += `${spaces}- ${convertToYAML(item, indent + 1).trimStart()}\n`
        } else {
          yaml += `${spaces}- ${convertToYAML(item, 0)}\n`
        }
      })
      return yaml
    }

    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined) return

      if (Array.isArray(value)) {
        if (value.length === 0) {
          yaml += `${spaces}${key}: []\n`
        } else {
          yaml += `${spaces}${key}:\n${convertToYAML(value, indent + 1)}`
        }
      } else if (typeof value === "object" && value !== null) {
        yaml += `${spaces}${key}:\n${convertToYAML(value, indent + 1)}`
      } else {
        yaml += `${spaces}${key}: ${convertToYAML(value, 0)}\n`
      }
    })

    return yaml
  }

  const convertToGraphQL = (obj: any): string => {
    // Basic GraphQL SDL conversion - this is a simplified version
    // In a real implementation, this would need more sophisticated conversion
    let graphql = ""

    if (obj.schema) {
      graphql += `schema {\n`
      if (obj.schema.query) {
        graphql += `  query: ${obj.schema.query}\n`
      }
      if (obj.schema.mutation) {
        graphql += `  mutation: ${obj.schema.mutation}\n`
      }
      graphql += `}\n\n`
    }

    // This is a placeholder - actual GraphQL conversion would be more complex
    graphql += `# Configuration:\n# ${JSON.stringify(obj, null, 2).split("\n").join("\n# ")}\n`

    return graphql
  }

  const downloadConfig = () => {
    try {
      let content = ""
      let filename = ""
      let mimeType = ""

      // Remove undefined and empty values
      const cleanConfig = JSON.parse(JSON.stringify(config))

      switch (outputFormat) {
        case "json":
          content = JSON.stringify(cleanConfig, null, 2)
          filename = "tailcall-config.json"
          mimeType = "application/json"
          break
        case "yaml":
          content = convertToYAML(cleanConfig)
          filename = "tailcall-config.yml"
          mimeType = "text/yaml"
          break
        case "graphql":
          content = convertToGraphQL(cleanConfig)
          filename = "tailcall-config.graphql"
          mimeType = "text/plain"
          break
      }

      const blob = new Blob([content], {type: mimeType})
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success(`Configuration downloaded as ${filename}`)
    } catch (error) {
      toast.error("Failed to download configuration")
      console.error("Download error:", error)
    }
  }

  const formatButtons = [
    {format: "json" as OutputFormat, icon: FileJson, label: "JSON"},
    {format: "yaml" as OutputFormat, icon: FileText, label: "YAML"},
    {format: "graphql" as OutputFormat, icon: Code2, label: "GraphQL"},
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-tailCall-yellow"></div>
          <p className="mt-SPACE_04 text-content-medium text-tailCall-dark-100">Loading schema...</p>
        </div>
      </div>
    )
  }

  if (!schema) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-content-medium text-red-600">Failed to load schema</p>
          <button
            onClick={loadSchema}
            className="mt-SPACE_04 px-SPACE_06 py-SPACE_03 bg-tailCall-yellow text-tailCall-dark-700 rounded-lg font-semibold hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-SPACE_04 py-SPACE_08">
        {/* Header */}
        <div className="mb-SPACE_08">
          <h1 className="text-title-large font-space-grotesk text-tailCall-dark-700 mb-SPACE_03">
            Tailcall Config Generator
          </h1>
          <p className="text-content-medium text-tailCall-dark-100">
            Generate and customize your Tailcall configuration with ease
          </p>
        </div>

        {/* Format Selection and Download */}
        <div className="mb-SPACE_06 flex flex-col sm:flex-row gap-SPACE_04 items-start sm:items-center justify-between">
          <div className="flex gap-SPACE_02">
            {formatButtons.map(({format, icon: Icon, label}) => (
              <button
                key={format}
                onClick={() => setOutputFormat(format)}
                className={`flex items-center gap-SPACE_02 px-SPACE_04 py-SPACE_02 rounded-lg border border-solid transition-colors ${
                  outputFormat === format
                    ? "bg-tailCall-yellow border-tailCall-yellow text-tailCall-dark-700"
                    : "bg-white border-tailCall-border-light-500 text-tailCall-dark-100 hover:border-tailCall-border-light-600"
                }`}
              >
                <Icon size={16} />
                <span className="text-content-small font-medium">{label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={downloadConfig}
            className="flex items-center gap-SPACE_02 px-SPACE_06 py-SPACE_03 bg-tailCall-yellow text-tailCall-dark-700 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Download size={20} />
            <span>Download Config</span>
          </button>
        </div>

        {/* Schema Form */}
        <div className="bg-tailCall-border-light-100 rounded-lg p-SPACE_06">
          <SchemaForm schema={schema} config={config} onChange={handleConfigChange} />
        </div>
      </div>
    </div>
  )
}

export default ConfigGeneratorUI
