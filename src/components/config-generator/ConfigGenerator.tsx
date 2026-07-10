import React, {useEffect, useState, useCallback} from "react"
import SchemaForm from "./SchemaForm"
import ConfigPreview from "./ConfigPreview"
import {fetchSchema, JSONSchema} from "./schemaUtils"
import {generateConfig, ConfigFormat} from "./configUtils"

const SCHEMA_URL =
  "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

type Tab = "form" | "preview"

const ConfigGenerator = (): JSX.Element => {
  const [schema, setSchema] = useState<JSONSchema | null>(null)
  const [schemaError, setSchemaError] = useState<string | null>(null)
  const [schemaLoading, setSchemaLoading] = useState(true)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [activeTab, setActiveTab] = useState<Tab>("form")
  const [outputFormat, setOutputFormat] = useState<ConfigFormat>("json")
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    setSchemaLoading(true)
    fetchSchema(SCHEMA_URL)
      .then((s) => {
        setSchema(s)
        setSchemaLoading(false)
      })
      .catch((err) => {
        setSchemaError(String(err))
        setSchemaLoading(false)
      })
  }, [])

  const handleFormChange = useCallback((data: Record<string, unknown>) => {
    setFormData(data)
  }, [])

  const generatedConfig = schema ? generateConfig(formData, outputFormat, schema) : ""

  const handleDownload = () => {
    const ext = outputFormat === "yaml" ? "yml" : outputFormat === "graphql" ? "graphql" : "json"
    const mimeType =
      outputFormat === "json"
        ? "application/json"
        : outputFormat === "yaml"
          ? "text/yaml"
          : "text/plain"
    const blob = new Blob([generatedConfig], {type: mimeType})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tailcall-config.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedConfig)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch {
      // fallback
      const textArea = document.createElement("textarea")
      textArea.value = generatedConfig
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Configuration Generator
        </h1>
        <p className="text-tailCall-light-600 text-base sm:text-lg">
          Build your Tailcall configuration visually and export it in your preferred format.
        </p>
      </div>

      {/* Format Selector */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-tailCall-light-600 text-sm font-medium">Output Format:</span>
        {(["json", "yaml", "graphql"] as ConfigFormat[]).map((fmt) => (
          <button
            key={fmt}
            onClick={() => setOutputFormat(fmt)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              outputFormat === fmt
                ? "bg-tailCall-yellow text-tailCall-dark-600 border-tailCall-yellow"
                : "bg-transparent text-tailCall-light-600 border-tailCall-border-dark-300 hover:border-tailCall-yellow hover:text-tailCall-yellow"
            }`}
          >
            {fmt.toUpperCase()}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium border border-tailCall-border-dark-300 text-tailCall-light-600 hover:border-tailCall-yellow hover:text-tailCall-yellow transition-all"
          >
            {copySuccess ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium bg-tailCall-yellow text-tailCall-dark-600 hover:opacity-90 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-tailCall-border-dark-300 mb-6">
        <button
          onClick={() => setActiveTab("form")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === "form"
              ? "border-tailCall-yellow text-tailCall-yellow"
              : "border-transparent text-tailCall-light-600 hover:text-tailCall-light-300"
          }`}
        >
          Form Builder
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${
            activeTab === "preview"
              ? "border-tailCall-yellow text-tailCall-yellow"
              : "border-transparent text-tailCall-light-600 hover:text-tailCall-light-300"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Panel */}
        <div
          className={`flex-1 ${activeTab === "preview" ? "hidden lg:block" : ""}`}
        >
          {schemaLoading && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 border-4 border-tailCall-yellow border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-tailCall-light-600">Loading schema...</p>
            </div>
          )}
          {schemaError && (
            <div className="rounded-xl border border-red-500 bg-red-500/10 p-6 text-red-400">
              <p className="font-medium mb-1">Failed to load schema</p>
              <p className="text-sm">{schemaError}</p>
            </div>
          )}
          {schema && !schemaLoading && (
            <SchemaForm schema={schema} value={formData} onChange={handleFormChange} />
          )}
        </div>

        {/* Preview Panel */}
        <div
          className={`lg:w-96 xl:w-[480px] ${activeTab === "form" ? "hidden lg:block" : ""}`}
        >
          <ConfigPreview config={generatedConfig} format={outputFormat} />
        </div>
      </div>
    </div>
  )
}

export default ConfigGenerator
