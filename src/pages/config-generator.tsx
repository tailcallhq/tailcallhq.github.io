
import React, {useState, useEffect, useCallback, useMemo} from "react"
import Select from "react-select"
import {saveAs} from "file-saver"
import yaml from "js-yaml"
import Layout from "@theme/Layout"

const SCHEMA_URL =
  "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

const DEFAULT_CONFIG = {
  server: {
    port: 8000,
    hostname: "0.0.0.0",
    workers: 1,
    introspection: true,
    queryValidation: false,
    responseValidation: false,
    batchRequests: false,
  },
  upstream: {
    connectTimeout: 60,
    timeout: 600,
    keepAliveInterval: 5,
    keepAliveTimeout: 60,
    userAgent: "Tailcall/1.0",
    verifySSL: true,
  },
  telemetry: {},
  links: [],
}

const ConfigGeneratorPage = () => {
  const [schema, setSchema] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, any>>(DEFAULT_CONFIG)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"server"|"upstream"|"telemetry"|"links">("server")
  const [configOutput, setConfigOutput] = useState("")
  const [outputFormat, setOutputFormat] = useState<"json"|"yml">("yml")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        setLoading(true)
        const res = await fetch(SCHEMA_URL)
        if (!res.ok) throw new Error(`Failed to fetch schema: ${res.status}`)
        const schemaData = await res.json()
        setSchema(schemaData)
        setError(null)
      } catch (err: any) {
        setError(err.message || "Failed to load schema")
      } finally {
        setLoading(false)
      }
    }
    fetchSchema()
  }, [])

  useEffect(() => {
    if (Object.keys(formData).length === 0) return
    const cleaned = deepClean(formData)
    if (outputFormat === "yml") {
      setConfigOutput(yaml.dump(cleaned, {indent: 2, lineWidth: 120, noRefs: true}))
    } else {
      setConfigOutput(JSON.stringify(cleaned, null, 2))
    }
  }, [formData, outputFormat, schema])

  const handleFieldChange = useCallback((section: string, value: any) => {
    setFormData(prev => ({...prev, [section]: value}))
  }, [])

  const handleDownload = useCallback(() => {
    const ext = outputFormat === "yml" ? "yml" : "json"
    const mime = outputFormat === "yml" ? "text/yaml" : "application/json"
    const blob = new Blob([configOutput], {type: mime})
    saveAs(blob, `tailcall.${ext}`)
  }, [configOutput, outputFormat])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(configOutput)
    } catch {
      const ta = document.createElement("textarea")
      ta.value = configOutput
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [configOutput])

  const handleReset = useCallback(() => setFormData(DEFAULT_CONFIG), [])

  if (loading) {
    return (
      <Layout title="Config Generator" description="Generate Tailcall configurations visually">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tailcall-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-400">Loading Tailcall config schema...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title="Config Generator" description="Generate Tailcall configurations visually">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">⚠</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Failed to load schema</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button onClick={() => window.location.reload()}
              className="px-4 py-2 bg-tailcall-primary text-white rounded-lg hover:opacity-90 transition">
              Retry
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  const propSchema = schema?.properties?.[activeTab]
  const definitions = schema?.$defs || schema?.definitions

  return (
    <Layout title="Config Generator" description="Generate Tailcall configurations visually">
      <style>{`
        .cg-form-group { margin-bottom: 1.25rem; }
        .cg-label { display: block; font-size: 0.85rem; font-weight: 600; color: #c0c0c0; margin-bottom: 0.35rem; }
        .cg-input { width: 100%; padding: 0.6rem 0.85rem; background: #0d0d1a; border: 1px solid #2a2a3e; border-radius: 0.5rem; color: #e8e8e8; font-size: 0.875rem; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
        .cg-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .cg-input::placeholder { color: #555; }
        .cg-checkbox-label { display: flex; align-items: center; gap: 0.6rem; cursor: pointer; font-size: 0.875rem; color: #c0c0c0; }
        .cg-checkbox { width: 1.1rem; height: 1.1rem; accent-color: #6366f1; }
        .cg-desc { font-size: 0.75rem; color: #777; margin-top: 0.3rem; line-height: 1.4; }
        .cg-section-header { font-size: 1.1rem; font-weight: 700; color: #e8e8e8; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #2a2a3e; }
        .cg-add-btn { padding: 0.4rem 0.8rem; background: transparent; border: 1px dashed #444; color: #999; border-radius: 0.4rem; font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
        .cg-add-btn:hover { border-color: #6366f1; color: #6366f1; }
        .cg-remove-btn { padding: 0.25rem 0.5rem; background: transparent; border: 1px solid #444; color: #999; border-radius: 0.3rem; font-size: 0.75rem; cursor: pointer; }
        .cg-remove-btn:hover { border-color: #dc2626; color: #dc2626; }
        .cg-array-item { background: rgba(13,13,26,0.6); border: 1px solid #2a2a3e; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.5rem; }
        .cg-output::-webkit-scrollbar { width: 6px; }
        .cg-output::-webkit-scrollbar-track { background: transparent; }
        .cg-output::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tailcall Config Generator</h1>
          <p className="text-gray-400 text-lg">
            Visually generate valid Tailcall Runtime Configuration files. Edit fields, then download or copy as JSON or YAML.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-xl border border-[#2a2a3e] bg-[#0d0d1a]/50">
          <span className="text-sm text-gray-500 font-medium">Output:</span>
          <Select
            value={{value: outputFormat, label: outputFormat === "yml" ? "YAML" : "JSON"}}
            onChange={(opt) => setOutputFormat(opt?.value || "yml")}
            options={[{value: "yml", label: "YAML"}, {value: "json", label: "JSON"}]}
            className="min-w-[110px]"
            classNamePrefix="rs"
            styles={{
              control: (b) => ({...b, backgroundColor: "#0d0d1a", borderColor: "#2a2a3e", minHeight: "36px"}),
              singleValue: (b) => ({...b, color: "#e0e0e0", fontSize: "0.85rem"}),
              menu: (b) => ({...b, backgroundColor: "#12122a"}),
              option: (b, s) => ({...b, backgroundColor: s.isSelected ? "#2a2a5e" : s.isFocused ? "#1a1a3e" : "#12122a", color: "#e0e0e0", fontSize: "0.85rem"}),
              indicatorSeparator: () => ({display: "none"}),
            }}
          />
          <div className="flex-1" />
          <button onClick={handleReset} className="px-3 py-1.5 text-sm border border-[#2a2a3e] text-gray-400 rounded-lg hover:border-gray-500 hover:text-gray-200 transition">
            Reset
          </button>
          <button onClick={handleCopy} className="px-3 py-1.5 text-sm bg-[#6366f1] text-white rounded-lg hover:brightness-110 transition">
            {copied ? "Copied!" : "Copy"}
          </button>
          <button onClick={handleDownload} className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:brightness-110 transition">
            .{outputFormat}
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Form */}
          <div className="rounded-xl border border-[#2a2a3e] overflow-hidden bg-[#0d0d1a]/30">
            <div className="flex border-b border-[#2a2a3e]">
              {(["server","upstream","telemetry","links"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 text-sm font-medium capitalize transition ${
                    activeTab === tab
                      ? "border-b-2 border-[#6366f1] text-[#6366f1] bg-[#6366f1]/5"
                      : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                  }`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 max-h-[65vh] overflow-y-auto cg-output">
              {propSchema ? (
                <ManualForm
                  schema={propSchema}
                  definitions={definitions}
                  value={formData[activeTab] || {}}
                  onChange={(val: any) => handleFieldChange(activeTab, val)}
                />
              ) : (
                <p className="text-gray-500 text-sm">No configurable fields.</p>
              )}
            </div>
          </div>

          {/* Output */}
          <div className="rounded-xl border border-[#2a2a3e] overflow-hidden bg-[#0d0d1a]/30">
            <div className="px-4 py-3 border-b border-[#2a2a3e] flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">
                Generated {outputFormat === "yml" ? "YAML" : "JSON"}
              </span>
              <span className="text-xs text-gray-600">{configOutput.split("\n").length} lines</span>
            </div>
            <pre className="p-4 text-sm font-mono text-green-300/90 overflow-auto max-h-[65vh] cg-output leading-relaxed">
              <code>{configOutput}</code>
            </pre>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const ManualForm = ({schema, definitions, value, onChange}: {
  schema: any; definitions: any; value: any; onChange: (v: any) => void
}) => {
  const props = schema.properties || {}
  const required = schema.required || []
  const sorted = Object.keys(props).sort((a, b) => {
    const ar = required.includes(a), br = required.includes(b)
    if (ar && !br) return -1; if (!ar && br) return 1
    return a.localeCompare(b)
  })

  const setField = (k: string, v: any) => {
    const nv = {...value}
    if (v === undefined || v === null || v === "") { delete nv[k] } else { nv[k] = v }
    onChange(nv)
  }

  return (
    <div className="space-y-1">
      {sorted.map(name => (
        <Field key={name} name={name} schema={props[name]} definitions={definitions}
          value={value?.[name]} isRequired={required.includes(name)}
          onChange={(v: any) => setField(name, v)} />
      ))}
    </div>
  )
}

const Field = ({name, schema, definitions, value, isRequired, onChange}: {
  name: string; schema: any; definitions: any; value: any; isRequired: boolean; onChange: (v: any) => void
}) => {
  let s = schema
  if (s?.$ref) { const p = s.$ref.replace("#/$defs/","").replace("#/definitions/",""); s = definitions?.[p] || s }
  if (s?.oneOf) s = s.oneOf[0]
  if (s?.anyOf) { const nn = s.anyOf.filter((x: any) => x.type !== "null"); s = nn[0] || s.anyOf[0] }

  const type = s?.type || "string"
  const desc = s?.description || ""
  const label = s?.title || name.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim()
  const def = s?.default

  const labelEl = (
    <label className="cg-label" htmlFor={`f-${name}`}>
      {label}{isRequired && <span className="text-red-400 ml-1">*</span>}
      {def !== undefined && <span className="text-gray-600 font-normal ml-2 text-xs">(default: {String(def)})</span>}
    </label>
  )
  const descEl = desc ? <p className="cg-desc">{desc}</p> : null

  if (type === "boolean") return (
    <div className="cg-form-group">
      {labelEl}
      <label className="cg-checkbox-label">
        <input id={`f-${name}`} className="cg-checkbox" type="checkbox" checked={!!value}
          onChange={e => onChange(e.target.checked)} />
        <span className="text-sm">{(value ?? false) ? "Enabled" : "Disabled"}</span>
      </label>
      {descEl}
    </div>
  )

  if (type === "integer" || type === "number") return (
    <div className="cg-form-group">
      {labelEl}
      <input id={`f-${name}`} className="cg-input" type="number"
        value={value ?? ""} min={s?.minimum} max={s?.maximum}
        placeholder={def !== undefined ? String(def) : ""}
        onChange={e => { const v = e.target.value; onChange(v===""?undefined:type==="integer"?parseInt(v,10):parseFloat(v)) }} />
      {descEl}
    </div>
  )

  if (type === "string" && s?.enum?.length > 0) {
    const opts = s.enum.map((v: any) => ({value: v, label: String(v)}))
    return (
      <div className="cg-form-group">
        {labelEl}
        <Select id={`f-${name}`} value={opts.find((o: any) => o.value === value) || null}
          onChange={(opt: any) => onChange(opt?.value)} options={opts} isClearable
          placeholder={`Select ${label.toLowerCase()}...`} classNamePrefix="rs"
          styles={{
            control: (b) => ({...b, backgroundColor: "#0d0d1a", borderColor: "#2a2a3e", minHeight: "38px"}),
            singleValue: (b) => ({...b, color: "#e0e0e0", fontSize: "0.875rem"}),
            input: (b) => ({...b, color: "#e0e0e0"}),
            menu: (b) => ({...b, backgroundColor: "#12122a", zIndex: 50}),
            option: (b, s) => ({...b, backgroundColor: s.isSelected?"#2a2a5e":s.isFocused?"#1a1a3e":"#12122a", color: "#e0e0e0", fontSize: "0.875rem"}),
            placeholder: (b) => ({...b, color: "#555"}),
            indicatorSeparator: () => ({display: "none"}),
          }} />
        {descEl}
      </div>
    )
  }

  if (type === "string") return (
    <div className="cg-form-group">
      {labelEl}
      <input id={`f-${name}`} className="cg-input" type="text" value={value || ""}
        placeholder={def !== undefined ? String(def) : (name.toLowerCase().includes("url") ? "https://..." : "")}
        onChange={e => onChange(e.target.value || undefined)} />
      {descEl}
    </div>
  )

  if (type === "array") {
    const items: any[] = Array.isArray(value) ? value : []
    const itemSchema = s?.items || {type: "string"}
    return (
      <div className="cg-form-group">
        {labelEl}
        {items.map((item, i) => (
          <div key={i} className="cg-array-item flex items-start gap-2">
            <div className="flex-1">
              <Field name={`${name}[${i}]`} schema={itemSchema} definitions={definitions}
                value={item} isRequired={false}
                onChange={(v: any) => { const n = [...items]; n[i] = v; onChange(n) }} />
            </div>
            <button className="cg-remove-btn mt-6"
              onClick={() => { const n = items.filter((_: any, idx: number) => idx !== i); onChange(n.length > 0 ? n : undefined) }}>
              Remove
            </button>
          </div>
        ))}
        <button className="cg-add-btn" onClick={() => onChange([...items, defaultVal(itemSchema, definitions)])}>
          + Add
        </button>
        {descEl}
      </div>
    )
  }

  if (type === "object") {
    if (s?.properties) {
      <div className="cg-form-group">
        {labelEl}
        <div className="p-4 rounded-lg border border-[#2a2a3e] bg-black/20">
          <ManualForm schema={s} definitions={definitions} value={value || {}} onChange={onChange} />
        </div>
        {descEl}
      </div>
    }
    const entries: [string, any][] = value ? Object.entries(value) : []
    return (
      <div className="cg-form-group">
        {labelEl}
        {entries.map(([k, v], i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input className="cg-input flex-1 min-w-0" type="text" value={k}
              onChange={e => { const ne = [...entries]; ne[i] = [e.target.value, v]; onChange(Object.fromEntries(ne)) }}
              placeholder="Key" />
            <input className="cg-input flex-1 min-w-0" type="text" value={String(v ?? "")}
              onChange={e => { const ne = [...entries]; ne[i] = [k, e.target.value]; onChange(Object.fromEntries(ne)) }}
              placeholder="Value" />
            <button className="cg-remove-btn"
              onClick={() => { const ne = entries.filter((_: any, idx: number) => idx !== i); onChange(ne.length > 0 ? Object.fromEntries(ne) : undefined) }}>
              ✕
            </button>
          </div>
        ))}
        <button className="cg-add-btn" onClick={() =>onChange({...value, [`key${entries.length + 1}`]: ""})}>
          + Add Entry
        </button>
        {descEl}
      </div>
    )
  }

  return (
    <div className="cg-form-group">
      {labelEl}
      <input className="cg-input" type="text" value={value ? JSON.stringify(value) : ""}
        onChange={e => { try { onChange(JSON.parse(e.target.value)) } catch { onChange(e.target.value) } }} />
      {descEl}
    </div>
  )
}

function deepClean(obj: any): any {
  if (Array.isArray(obj)) { const c = obj.map(deepClean).filter((v: any) => v != null); return c.length > 0 ? c : undefined }
  if (obj !== null && typeof obj === "object") {
    const c: Record<string, any> = {}
    for (const [k, v] of Object.entries(obj)) { const cv = deepClean(v); if (cv != null) c[k] = cv }
    return Object.keys(c).length > 0 ? c : undefined
  }
  return obj
}

function defaultVal(schema: any, defs: any): any {
  if (schema?.$ref) { const p = schema.$ref.replace("#/$defs/","").replace("#/definitions/",""); schema = defs?.[p] || schema }
  if (schema?.default !== undefined) return schema.default
  if (schema?.oneOf) return defaultVal(schema.oneOf[0], defs)
  if (schema?.anyOf) { const nn = schema.anyOf.filter((s: any) => s.type !== "null"); return nn.length > 0 ? defaultVal(nn[0], defs) : null }
  switch (schema?.type) {
    case "string": return ""; case "integer": case "number": return schema.minimum ?? 0
    case "boolean": return false; case "array": return []; case "object": return {}; default: return ""
  }
}

export default ConfigGeneratorPage
