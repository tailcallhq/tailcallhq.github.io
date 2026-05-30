import React, {useEffect, useMemo, useState} from "react"
import {Clipboard, Download, FileCode2, FileJson2, FileText, Plus, RefreshCw, Trash2} from "lucide-react"

type Format = "json" | "yaml" | "graphql"
type Preset = "starter" | "production" | "grpc"
type LinkType = "Config" | "Protobuf" | "Script" | "Cert" | "Key" | "Operation" | "Htpasswd" | "Jwks" | "Grpc"
type TelemetryExporter = "off" | "stdout" | "prometheus" | "otlp"
type SchemaStatus = "loading" | "synced" | "fallback"

type JsonValue = string | number | boolean | null | JsonValue[] | {[key: string]: JsonValue}

type KeyValue = {
  key: string
  value: string
}

type LinkConfig = {
  id: string
  type: LinkType
  src: string
  protoPaths: string
  headers: KeyValue[]
}

type ConfigState = {
  server: {
    port: string
    hostname: string
    version: "HTTP1" | "HTTP2"
    introspection: boolean
    queryValidation: boolean
    responseValidation: boolean
    enableFederation: boolean
    batchRequests: boolean
    globalResponseTimeout: string
    workers: string
    graphQLRoute: string
    statusRoute: string
  }
  upstream: {
    connectTimeout: string
    poolIdleTimeout: string
    keepAliveInterval: string
    keepAliveTimeout: string
    httpCache: string
    http2Only: boolean
    allowedHeaders: string
    batchMaxSize: string
    batchDelay: string
    batchHeaders: string
    proxyUrl: string
  }
  telemetry: {
    exporter: TelemetryExporter
    requestHeaders: string
    stdoutPretty: boolean
    prometheusPath: string
    otlpUrl: string
  }
  links: LinkConfig[]
}

type FieldDescriptions = {
  server: Record<string, string>
  upstream: Record<string, string>
  telemetry: Record<string, string>
}

type RuntimeSchema = {
  definitions?: {
    Server?: {
      properties?: Record<string, {description?: string}>
    }
    Upstream?: {
      properties?: Record<string, {description?: string}>
    }
    Telemetry?: {
      properties?: Record<string, {description?: string}>
    }
    LinkType?: {
      oneOf?: Array<{enum?: string[]}>
    }
  }
}

const SCHEMA_URL = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

const defaultLinkTypes: LinkType[] = [
  "Config",
  "Protobuf",
  "Script",
  "Cert",
  "Key",
  "Operation",
  "Htpasswd",
  "Jwks",
  "Grpc",
]

const presets: Record<Preset, ConfigState> = {
  starter: {
    server: {
      port: "8000",
      hostname: "0.0.0.0",
      version: "HTTP1",
      introspection: true,
      queryValidation: false,
      responseValidation: false,
      enableFederation: false,
      batchRequests: false,
      globalResponseTimeout: "",
      workers: "",
      graphQLRoute: "/graphql",
      statusRoute: "/status",
    },
    upstream: {
      connectTimeout: "10",
      poolIdleTimeout: "60",
      keepAliveInterval: "",
      keepAliveTimeout: "",
      httpCache: "",
      http2Only: false,
      allowedHeaders: "authorization,x-request-id",
      batchMaxSize: "",
      batchDelay: "",
      batchHeaders: "",
      proxyUrl: "",
    },
    telemetry: {
      exporter: "off",
      requestHeaders: "",
      stdoutPretty: true,
      prometheusPath: "/metrics",
      otlpUrl: "",
    },
    links: [
      {
        id: "main",
        type: "Config",
        src: "./tailcall.graphql",
        protoPaths: "",
        headers: [],
      },
    ],
  },
  production: {
    server: {
      port: "8000",
      hostname: "0.0.0.0",
      version: "HTTP2",
      introspection: false,
      queryValidation: true,
      responseValidation: true,
      enableFederation: false,
      batchRequests: true,
      globalResponseTimeout: "30",
      workers: "",
      graphQLRoute: "/graphql",
      statusRoute: "/status",
    },
    upstream: {
      connectTimeout: "5",
      poolIdleTimeout: "60",
      keepAliveInterval: "30",
      keepAliveTimeout: "10",
      httpCache: "500",
      http2Only: false,
      allowedHeaders: "authorization,x-request-id,x-tenant-id",
      batchMaxSize: "100",
      batchDelay: "10",
      batchHeaders: "authorization,x-request-id",
      proxyUrl: "",
    },
    telemetry: {
      exporter: "prometheus",
      requestHeaders: "x-request-id,x-tenant-id",
      stdoutPretty: true,
      prometheusPath: "/metrics",
      otlpUrl: "",
    },
    links: [
      {
        id: "main",
        type: "Config",
        src: "./tailcall.graphql",
        protoPaths: "",
        headers: [],
      },
    ],
  },
  grpc: {
    server: {
      port: "8000",
      hostname: "0.0.0.0",
      version: "HTTP2",
      introspection: true,
      queryValidation: true,
      responseValidation: false,
      enableFederation: false,
      batchRequests: false,
      globalResponseTimeout: "30",
      workers: "",
      graphQLRoute: "/graphql",
      statusRoute: "/status",
    },
    upstream: {
      connectTimeout: "10",
      poolIdleTimeout: "90",
      keepAliveInterval: "30",
      keepAliveTimeout: "10",
      httpCache: "",
      http2Only: true,
      allowedHeaders: "authorization,x-request-id",
      batchMaxSize: "",
      batchDelay: "",
      batchHeaders: "",
      proxyUrl: "",
    },
    telemetry: {
      exporter: "stdout",
      requestHeaders: "x-request-id",
      stdoutPretty: true,
      prometheusPath: "/metrics",
      otlpUrl: "",
    },
    links: [
      {
        id: "proto",
        type: "Protobuf",
        src: "./proto/service.proto",
        protoPaths: "./proto",
        headers: [{key: "authorization", value: "{{env.AUTH_TOKEN}}"}],
      },
    ],
  },
}

const clonePreset = (preset: Preset): ConfigState => JSON.parse(JSON.stringify(presets[preset])) as ConfigState

const labelFromKey = (key: string): string =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (value) => value.toUpperCase())
    .replace("Graph Q L", "GraphQL")

const parseInteger = (value: string): number | undefined => {
  const trimmed = value.trim()
  if (trimmed === "") return undefined
  const parsed = Number.parseInt(trimmed, 10)
  return Number.isFinite(parsed) ? parsed : undefined
}

const parseList = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

const compactObject = (input: Record<string, JsonValue | undefined>): Record<string, JsonValue> => {
  return Object.entries(input).reduce<Record<string, JsonValue>>((result, [key, value]) => {
    if (value === undefined) return result
    if (Array.isArray(value) && value.length === 0) return result
    if (typeof value === "object" && value !== null && !Array.isArray(value) && Object.keys(value).length === 0) {
      return result
    }
    result[key] = value
    return result
  }, {})
}

const buildRuntimeConfig = (state: ConfigState): Record<string, JsonValue> => {
  const routes = compactObject({
    graphQL: state.server.graphQLRoute.trim() || undefined,
    status: state.server.statusRoute.trim() || undefined,
  })

  const batch = compactObject({
    maxSize: parseInteger(state.upstream.batchMaxSize),
    delay: parseInteger(state.upstream.batchDelay),
    headers: parseList(state.upstream.batchHeaders),
  })

  const upstream = compactObject({
    allowedHeaders: parseList(state.upstream.allowedHeaders),
    batch,
    connectTimeout: parseInteger(state.upstream.connectTimeout),
    http2Only: state.upstream.http2Only || undefined,
    httpCache: parseInteger(state.upstream.httpCache),
    keepAliveInterval: parseInteger(state.upstream.keepAliveInterval),
    keepAliveTimeout: parseInteger(state.upstream.keepAliveTimeout),
    poolIdleTimeout: parseInteger(state.upstream.poolIdleTimeout),
    proxy: state.upstream.proxyUrl.trim() ? {url: state.upstream.proxyUrl.trim()} : undefined,
  })

  let telemetryExport: JsonValue | undefined

  if (state.telemetry.exporter === "stdout") {
    telemetryExport = {stdout: {pretty: state.telemetry.stdoutPretty}}
  } else if (state.telemetry.exporter === "prometheus") {
    telemetryExport = {prometheus: {path: state.telemetry.prometheusPath.trim() || "/metrics"}}
  } else if (state.telemetry.exporter === "otlp" && state.telemetry.otlpUrl.trim()) {
    telemetryExport = {otlp: {url: state.telemetry.otlpUrl.trim()}}
  }

  const telemetry = compactObject({
    export: telemetryExport,
    requestHeaders: parseList(state.telemetry.requestHeaders),
  })

  const links = state.links
    .map((link) =>
      compactObject({
        id: link.id.trim() || undefined,
        type: link.type,
        src: link.src.trim(),
        proto_paths: parseList(link.protoPaths),
        headers: link.headers
          .filter((header) => header.key.trim() && header.value.trim())
          .map((header) => ({key: header.key.trim(), value: header.value.trim()})),
      }),
    )
    .filter((link) => typeof link.src === "string" && link.src.length > 0) as JsonValue[]

  return compactObject({
    server: compactObject({
      apolloTracing: false,
      batchRequests: state.server.batchRequests || undefined,
      enableFederation: state.server.enableFederation || undefined,
      globalResponseTimeout: parseInteger(state.server.globalResponseTimeout),
      hostname: state.server.hostname.trim() || undefined,
      introspection: state.server.introspection,
      port: parseInteger(state.server.port),
      queryValidation: state.server.queryValidation || undefined,
      responseValidation: state.server.responseValidation || undefined,
      routes,
      version: state.server.version,
      workers: parseInteger(state.server.workers),
    }),
    upstream,
    telemetry,
    links,
  })
}

const yamlScalar = (value: string | number | boolean | null): string => {
  if (typeof value === "string") {
    if (/^[A-Za-z0-9_./:@{}-]+$/.test(value) && !["true", "false", "null"].includes(value)) return value
    return JSON.stringify(value)
  }

  if (value === null) return "null"
  return String(value)
}

const toYaml = (value: JsonValue, indent = 0): string => {
  const indentation = " ".repeat(indent)

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]"
    return value
      .map((item) => {
        if (typeof item === "object" && item !== null) {
          const nested = toYaml(item, indent + 2)
          return `${indentation}-\n${nested}`
        }

        return `${indentation}- ${yamlScalar(item as string | number | boolean | null)}`
      })
      .join("\n")
  }

  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value)
    if (entries.length === 0) return "{}"

    return entries
      .map(([key, item]) => {
        if (typeof item === "object" && item !== null) {
          return `${indentation}${key}:\n${toYaml(item, indent + 2)}`
        }

        return `${indentation}${key}: ${yamlScalar(item as string | number | boolean | null)}`
      })
      .join("\n")
  }

  return `${indentation}${yamlScalar(value)}`
}

const formatGraphQLValue = (value: JsonValue, enumKeys = new Set(["version", "type"])): string => {
  if (Array.isArray(value)) return `[${value.map((item) => formatGraphQLValue(item, enumKeys)).join(", ")}]`

  if (typeof value === "object" && value !== null) {
    const fields = Object.entries(value)
      .map(([key, item]) => `${key}: ${formatGraphQLValue(item, enumKeys)}`)
      .join(", ")

    return `{${fields}}`
  }

  if (typeof value === "string") return enumKeys.has(value) ? value : JSON.stringify(value)

  return String(value)
}

const toDirectiveArgs = (value: JsonValue): string => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return ""

  return Object.entries(value)
    .map(([key, item]) => `${key}: ${formatGraphQLValue(item, new Set(["HTTP1", "HTTP2", ...defaultLinkTypes]))}`)
    .join(", ")
}

const toGraphQLConfig = (config: Record<string, JsonValue>): string => {
  const directives: string[] = []

  if (config.server) directives.push(`@server(${toDirectiveArgs(config.server)})`)
  if (config.upstream) directives.push(`@upstream(${toDirectiveArgs(config.upstream)})`)
  if (config.telemetry) directives.push(`@telemetry(${toDirectiveArgs(config.telemetry)})`)

  const links = Array.isArray(config.links) ? config.links : []
  links.forEach((link) => {
    directives.push(`@link(${toDirectiveArgs(link)})`)
  })

  return [
    `schema ${directives.join("\n  ")}`,
    "{",
    "  query: Query",
    "}",
    "",
    "type Query {",
    "  _empty: String",
    "}",
  ].join("\n")
}

const fieldDescriptionsFromSchema = (schema: RuntimeSchema): FieldDescriptions => ({
  server: Object.entries(schema.definitions?.Server?.properties ?? {}).reduce<Record<string, string>>(
    (result, [key, value]) => {
      result[key] = value.description ?? ""
      return result
    },
    {},
  ),
  upstream: Object.entries(schema.definitions?.Upstream?.properties ?? {}).reduce<Record<string, string>>(
    (result, [key, value]) => {
      result[key] = value.description ?? ""
      return result
    },
    {},
  ),
  telemetry: Object.entries(schema.definitions?.Telemetry?.properties ?? {}).reduce<Record<string, string>>(
    (result, [key, value]) => {
      result[key] = value.description ?? ""
      return result
    },
    {},
  ),
})

const resolveLinkTypes = (schema: RuntimeSchema): LinkType[] => {
  const values = schema.definitions?.LinkType?.oneOf
    ?.flatMap((option) => option.enum ?? [])
    .filter((value): value is LinkType => defaultLinkTypes.includes(value as LinkType))

  return values && values.length > 0 ? values : defaultLinkTypes
}

const downloadFile = (filename: string, content: string): void => {
  const blob = new Blob([content], {type: "text/plain;charset=utf-8"})
  const href = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = href
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(href)
}

const inputClasses =
  "h-10 w-full rounded-md border border-solid border-tailCall-border-light-500 bg-tailCall-light-100 px-SPACE_03 text-content-tiny text-tailCall-dark-500 outline-none focus:border-tailCall-dark-200 dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-400 dark:text-tailCall-light-100"

const selectClasses = `${inputClasses} cursor-pointer`
const toolButtonClasses =
  "inline-flex h-10 items-center justify-center gap-SPACE_02 rounded-md border border-solid border-tailCall-border-light-500 bg-tailCall-light-100 px-SPACE_03 text-content-tiny font-bold text-tailCall-dark-500 transition-colors hover:bg-tailCall-light-200 dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-400 dark:text-tailCall-light-100 dark:hover:bg-tailCall-dark-300"

const sectionClasses =
  "border border-solid border-tailCall-border-light-500 bg-tailCall-light-100 p-SPACE_05 dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-500"

const ConfigGenerator = (): JSX.Element => {
  const [state, setState] = useState<ConfigState>(() => clonePreset("starter"))
  const [preset, setPreset] = useState<Preset>("starter")
  const [format, setFormat] = useState<Format>("json")
  const [schemaStatus, setSchemaStatus] = useState<SchemaStatus>("loading")
  const [fieldDescriptions, setFieldDescriptions] = useState<FieldDescriptions>({
    server: {},
    upstream: {},
    telemetry: {},
  })
  const [linkTypes, setLinkTypes] = useState<LinkType[]>(defaultLinkTypes)
  const [copied, setCopied] = useState(false)

  const config = useMemo(() => buildRuntimeConfig(state), [state])
  const output = useMemo(() => {
    if (format === "json") return `${JSON.stringify(config, null, 2)}\n`
    if (format === "yaml") return `${toYaml(config)}\n`
    return `${toGraphQLConfig(config)}\n`
  }, [config, format])

  useEffect(() => {
    let active = true

    fetch(SCHEMA_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Schema request failed")
        return response.json() as Promise<RuntimeSchema>
      })
      .then((schema) => {
        if (!active) return
        setFieldDescriptions(fieldDescriptionsFromSchema(schema))
        setLinkTypes(resolveLinkTypes(schema))
        setSchemaStatus("synced")
      })
      .catch(() => {
        if (!active) return
        setSchemaStatus("fallback")
      })

    return () => {
      active = false
    }
  }, [])

  const updateServer = <Key extends keyof ConfigState["server"]>(key: Key, value: ConfigState["server"][Key]): void => {
    setState((current) => ({...current, server: {...current.server, [key]: value}}))
  }

  const updateUpstream = <Key extends keyof ConfigState["upstream"]>(
    key: Key,
    value: ConfigState["upstream"][Key],
  ): void => {
    setState((current) => ({...current, upstream: {...current.upstream, [key]: value}}))
  }

  const updateTelemetry = <Key extends keyof ConfigState["telemetry"]>(
    key: Key,
    value: ConfigState["telemetry"][Key],
  ): void => {
    setState((current) => ({...current, telemetry: {...current.telemetry, [key]: value}}))
  }

  const updateLink = <Key extends keyof LinkConfig>(index: number, key: Key, value: LinkConfig[Key]): void => {
    setState((current) => ({
      ...current,
      links: current.links.map((link, linkIndex) => (linkIndex === index ? {...link, [key]: value} : link)),
    }))
  }

  const updateHeader = (linkIndex: number, headerIndex: number, key: keyof KeyValue, value: string): void => {
    setState((current) => ({
      ...current,
      links: current.links.map((link, currentLinkIndex) => {
        if (currentLinkIndex !== linkIndex) return link

        return {
          ...link,
          headers: link.headers.map((header, currentHeaderIndex) =>
            currentHeaderIndex === headerIndex ? {...header, [key]: value} : header,
          ),
        }
      }),
    }))
  }

  const applyPreset = (value: Preset): void => {
    setPreset(value)
    setState(clonePreset(value))
  }

  const addLink = (): void => {
    setState((current) => ({
      ...current,
      links: [...current.links, {id: "", type: "Config", src: "", protoPaths: "", headers: []}],
    }))
  }

  const removeLink = (index: number): void => {
    setState((current) => ({...current, links: current.links.filter((_, linkIndex) => linkIndex !== index)}))
  }

  const addHeader = (index: number): void => {
    setState((current) => ({
      ...current,
      links: current.links.map((link, linkIndex) =>
        linkIndex === index ? {...link, headers: [...link.headers, {key: "", value: ""}]} : link,
      ),
    }))
  }

  const removeHeader = (linkIndex: number, headerIndex: number): void => {
    setState((current) => ({
      ...current,
      links: current.links.map((link, currentLinkIndex) =>
        currentLinkIndex === linkIndex
          ? {...link, headers: link.headers.filter((_, currentHeaderIndex) => currentHeaderIndex !== headerIndex)}
          : link,
      ),
    }))
  }

  const copyOutput = async (): Promise<void> => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  const filename = `tailcall.config.${format === "graphql" ? "graphql" : format === "yaml" ? "yml" : "json"}`

  return (
    <main className="min-h-[90vh] bg-tailCall-light-100 px-SPACE_04 py-SPACE_06 text-tailCall-dark-500 dark:bg-tailCall-dark-700 dark:text-tailCall-light-100 md:px-SPACE_08">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-SPACE_05">
        <div className="flex flex-col gap-SPACE_04 border-b border-solid border-tailCall-border-light-500 pb-SPACE_05 dark:border-tailCall-border-dark-200 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-SPACE_02 text-content-mini font-bold uppercase text-tailCall-dark-100 dark:text-tailCall-light-500">
              Tailcall Config
            </p>
            <h1 className="m-0 text-title-large text-tailCall-dark-700 dark:text-tailCall-light-100">
              Configuration generator
            </h1>
            <p className="m-0 mt-SPACE_02 max-w-3xl text-content-small text-tailCall-dark-100 dark:text-tailCall-light-500">
              Build runtime settings from the current Tailcall schema and export them as JSON, YAML, or GraphQL SDL.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-SPACE_03">
            <span className="inline-flex h-10 items-center gap-SPACE_02 rounded-md border border-solid border-tailCall-border-light-500 px-SPACE_03 text-content-mini font-bold dark:border-tailCall-border-dark-200">
              <RefreshCw size={16} aria-hidden="true" />
              {schemaStatus === "synced"
                ? "Schema synced"
                : schemaStatus === "loading"
                  ? "Syncing schema"
                  : "Fallback schema"}
            </span>
            <button type="button" className={toolButtonClasses} onClick={copyOutput}>
              <Clipboard size={16} aria-hidden="true" />
              {copied ? "Copied" : "Copy"}
            </button>
            <button type="button" className={toolButtonClasses} onClick={() => downloadFile(filename, output)}>
              <Download size={16} aria-hidden="true" />
              Download
            </button>
          </div>
        </div>

        <div className="grid gap-SPACE_05 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">
          <div className="flex flex-col gap-SPACE_05">
            <section className={sectionClasses}>
              <div className="grid gap-SPACE_04 lg:grid-cols-[240px_1fr]">
                <div>
                  <h2 className="m-0 text-title-small">Preset</h2>
                  <p className="m-0 mt-SPACE_02 text-content-tiny text-tailCall-dark-100 dark:text-tailCall-light-500">
                    Start with a common runtime profile, then tune each field.
                  </p>
                </div>
                <div className="grid gap-SPACE_03 sm:grid-cols-3">
                  {(["starter", "production", "grpc"] as Preset[]).map((value) => (
                    <button
                      type="button"
                      key={value}
                      className={`h-11 rounded-md border border-solid px-SPACE_03 text-content-tiny font-bold capitalize transition-colors ${
                        preset === value
                          ? "border-tailCall-dark-700 bg-tailCall-yellow text-tailCall-dark-700"
                          : "border-tailCall-border-light-500 bg-tailCall-light-100 text-tailCall-dark-500 hover:bg-tailCall-light-200 dark:border-tailCall-border-dark-200 dark:bg-tailCall-dark-400 dark:text-tailCall-light-100 dark:hover:bg-tailCall-dark-300"
                      }`}
                      onClick={() => applyPreset(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className={sectionClasses}>
              <FormSectionTitle title="Server" description={fieldDescriptions.server.port} />
              <div className="grid gap-SPACE_04 md:grid-cols-2 xl:grid-cols-3">
                <TextField
                  label="Port"
                  value={state.server.port}
                  onChange={(value) => updateServer("port", value)}
                  type="number"
                  description={fieldDescriptions.server.port}
                />
                <TextField
                  label="Hostname"
                  value={state.server.hostname}
                  onChange={(value) => updateServer("hostname", value)}
                  description={fieldDescriptions.server.hostname}
                />
                <label className="flex flex-col gap-SPACE_02">
                  <span className="text-content-tiny font-bold">HTTP version</span>
                  <select
                    className={selectClasses}
                    value={state.server.version}
                    onChange={(event) => updateServer("version", event.target.value as "HTTP1" | "HTTP2")}
                  >
                    <option value="HTTP1">HTTP1</option>
                    <option value="HTTP2">HTTP2</option>
                  </select>
                </label>
                <TextField
                  label="GraphQL route"
                  value={state.server.graphQLRoute}
                  onChange={(value) => updateServer("graphQLRoute", value)}
                />
                <TextField
                  label="Status route"
                  value={state.server.statusRoute}
                  onChange={(value) => updateServer("statusRoute", value)}
                />
                <TextField
                  label="Response timeout"
                  value={state.server.globalResponseTimeout}
                  onChange={(value) => updateServer("globalResponseTimeout", value)}
                  type="number"
                  description={fieldDescriptions.server.globalResponseTimeout}
                />
                <TextField
                  label="Workers"
                  value={state.server.workers}
                  onChange={(value) => updateServer("workers", value)}
                  type="number"
                  description={fieldDescriptions.server.workers}
                />
              </div>
              <div className="mt-SPACE_04 grid gap-SPACE_03 md:grid-cols-2 xl:grid-cols-3">
                <ToggleField
                  label="Introspection"
                  checked={state.server.introspection}
                  onChange={(checked) => updateServer("introspection", checked)}
                  description={fieldDescriptions.server.introspection}
                />
                <ToggleField
                  label="Query validation"
                  checked={state.server.queryValidation}
                  onChange={(checked) => updateServer("queryValidation", checked)}
                  description={fieldDescriptions.server.queryValidation}
                />
                <ToggleField
                  label="Response validation"
                  checked={state.server.responseValidation}
                  onChange={(checked) => updateServer("responseValidation", checked)}
                  description={fieldDescriptions.server.responseValidation}
                />
                <ToggleField
                  label="Federation"
                  checked={state.server.enableFederation}
                  onChange={(checked) => updateServer("enableFederation", checked)}
                  description={fieldDescriptions.server.enableFederation}
                />
                <ToggleField
                  label="Batch requests"
                  checked={state.server.batchRequests}
                  onChange={(checked) => updateServer("batchRequests", checked)}
                  description={fieldDescriptions.server.batchRequests}
                />
              </div>
            </section>

            <section className={sectionClasses}>
              <FormSectionTitle title="Upstream" description={fieldDescriptions.upstream.allowedHeaders} />
              <div className="grid gap-SPACE_04 md:grid-cols-2 xl:grid-cols-3">
                <TextField
                  label="Allowed headers"
                  value={state.upstream.allowedHeaders}
                  onChange={(value) => updateUpstream("allowedHeaders", value)}
                  description="Comma-separated header names"
                />
                <TextField
                  label="Connect timeout"
                  value={state.upstream.connectTimeout}
                  onChange={(value) => updateUpstream("connectTimeout", value)}
                  type="number"
                  description={fieldDescriptions.upstream.connectTimeout}
                />
                <TextField
                  label="Pool idle timeout"
                  value={state.upstream.poolIdleTimeout}
                  onChange={(value) => updateUpstream("poolIdleTimeout", value)}
                  type="number"
                  description={fieldDescriptions.upstream.poolIdleTimeout}
                />
                <TextField
                  label="Keep-alive interval"
                  value={state.upstream.keepAliveInterval}
                  onChange={(value) => updateUpstream("keepAliveInterval", value)}
                  type="number"
                  description={fieldDescriptions.upstream.keepAliveInterval}
                />
                <TextField
                  label="Keep-alive timeout"
                  value={state.upstream.keepAliveTimeout}
                  onChange={(value) => updateUpstream("keepAliveTimeout", value)}
                  type="number"
                  description={fieldDescriptions.upstream.keepAliveTimeout}
                />
                <TextField
                  label="HTTP cache"
                  value={state.upstream.httpCache}
                  onChange={(value) => updateUpstream("httpCache", value)}
                  type="number"
                  description={fieldDescriptions.upstream.httpCache}
                />
                <TextField
                  label="Batch max size"
                  value={state.upstream.batchMaxSize}
                  onChange={(value) => updateUpstream("batchMaxSize", value)}
                  type="number"
                />
                <TextField
                  label="Batch delay"
                  value={state.upstream.batchDelay}
                  onChange={(value) => updateUpstream("batchDelay", value)}
                  type="number"
                />
                <TextField
                  label="Batch headers"
                  value={state.upstream.batchHeaders}
                  onChange={(value) => updateUpstream("batchHeaders", value)}
                  description="Comma-separated header names"
                />
                <TextField
                  label="Proxy URL"
                  value={state.upstream.proxyUrl}
                  onChange={(value) => updateUpstream("proxyUrl", value)}
                  type="url"
                  description={fieldDescriptions.upstream.proxy}
                />
                <ToggleField
                  label="HTTP2 only"
                  checked={state.upstream.http2Only}
                  onChange={(checked) => updateUpstream("http2Only", checked)}
                  description={fieldDescriptions.upstream.http2Only}
                />
              </div>
            </section>

            <section className={sectionClasses}>
              <FormSectionTitle title="Telemetry" description={fieldDescriptions.telemetry.export} />
              <div className="grid gap-SPACE_04 md:grid-cols-2 xl:grid-cols-3">
                <label className="flex flex-col gap-SPACE_02">
                  <span className="text-content-tiny font-bold">Exporter</span>
                  <select
                    className={selectClasses}
                    value={state.telemetry.exporter}
                    onChange={(event) => updateTelemetry("exporter", event.target.value as TelemetryExporter)}
                  >
                    <option value="off">Off</option>
                    <option value="stdout">Stdout</option>
                    <option value="prometheus">Prometheus</option>
                    <option value="otlp">OTLP</option>
                  </select>
                </label>
                <TextField
                  label="Request headers"
                  value={state.telemetry.requestHeaders}
                  onChange={(value) => updateTelemetry("requestHeaders", value)}
                  description="Comma-separated header names"
                />
                {state.telemetry.exporter === "stdout" && (
                  <ToggleField
                    label="Pretty stdout"
                    checked={state.telemetry.stdoutPretty}
                    onChange={(checked) => updateTelemetry("stdoutPretty", checked)}
                  />
                )}
                {state.telemetry.exporter === "prometheus" && (
                  <TextField
                    label="Prometheus path"
                    value={state.telemetry.prometheusPath}
                    onChange={(value) => updateTelemetry("prometheusPath", value)}
                  />
                )}
                {state.telemetry.exporter === "otlp" && (
                  <TextField
                    label="OTLP URL"
                    value={state.telemetry.otlpUrl}
                    onChange={(value) => updateTelemetry("otlpUrl", value)}
                    type="url"
                  />
                )}
              </div>
            </section>

            <section className={sectionClasses}>
              <div className="mb-SPACE_04 flex items-center justify-between gap-SPACE_04">
                <FormSectionTitle
                  title="Links"
                  description="Import Tailcall config, protobuf, scripts, certificates, and trusted operations."
                />
                <button type="button" className={toolButtonClasses} onClick={addLink}>
                  <Plus size={16} aria-hidden="true" />
                  Link
                </button>
              </div>

              <div className="flex flex-col gap-SPACE_04">
                {state.links.map((link, index) => (
                  <div
                    key={`${link.type}-${index}`}
                    className="border border-solid border-tailCall-border-light-500 p-SPACE_04 dark:border-tailCall-border-dark-200"
                  >
                    <div className="grid gap-SPACE_04 md:grid-cols-[1fr_160px_1fr_auto]">
                      <TextField label="ID" value={link.id} onChange={(value) => updateLink(index, "id", value)} />
                      <label className="flex flex-col gap-SPACE_02">
                        <span className="text-content-tiny font-bold">Type</span>
                        <select
                          className={selectClasses}
                          value={link.type}
                          onChange={(event) => updateLink(index, "type", event.target.value as LinkType)}
                        >
                          {linkTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </label>
                      <TextField
                        label="Source"
                        value={link.src}
                        onChange={(value) => updateLink(index, "src", value)}
                      />
                      <button
                        type="button"
                        className={`${toolButtonClasses} mt-SPACE_07 w-10 px-0`}
                        onClick={() => removeLink(index)}
                        aria-label="Remove link"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>

                    {(link.type === "Protobuf" || link.type === "Grpc") && (
                      <div className="mt-SPACE_04">
                        <TextField
                          label="Proto paths"
                          value={link.protoPaths}
                          onChange={(value) => updateLink(index, "protoPaths", value)}
                          description="Comma-separated paths"
                        />
                      </div>
                    )}

                    <div className="mt-SPACE_04 flex items-center justify-between gap-SPACE_03">
                      <h3 className="m-0 text-content-tiny font-bold">Headers</h3>
                      <button type="button" className={toolButtonClasses} onClick={() => addHeader(index)}>
                        <Plus size={16} aria-hidden="true" />
                        Header
                      </button>
                    </div>

                    {link.headers.length > 0 && (
                      <div className="mt-SPACE_03 grid gap-SPACE_03">
                        {link.headers.map((header, headerIndex) => (
                          <div
                            key={`${headerIndex}-${header.key}`}
                            className="grid gap-SPACE_03 md:grid-cols-[1fr_1fr_auto]"
                          >
                            <TextField
                              label="Header"
                              value={header.key}
                              onChange={(value) => updateHeader(index, headerIndex, "key", value)}
                            />
                            <TextField
                              label="Value"
                              value={header.value}
                              onChange={(value) => updateHeader(index, headerIndex, "value", value)}
                            />
                            <button
                              type="button"
                              className={`${toolButtonClasses} mt-SPACE_07 w-10 px-0`}
                              onClick={() => removeHeader(index, headerIndex)}
                              aria-label="Remove header"
                            >
                              <Trash2 size={16} aria-hidden="true" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="xl:sticky xl:top-[calc(var(--ifm-navbar-height)+24px)] xl:self-start">
            <section className={sectionClasses}>
              <div className="mb-SPACE_04 flex flex-wrap items-center justify-between gap-SPACE_03">
                <div>
                  <h2 className="m-0 text-title-small">Output</h2>
                  <p className="m-0 mt-SPACE_01 text-content-mini text-tailCall-dark-100 dark:text-tailCall-light-500">
                    {filename}
                  </p>
                </div>

                <div className="grid grid-cols-3 overflow-hidden rounded-md border border-solid border-tailCall-border-light-500 dark:border-tailCall-border-dark-200">
                  {[
                    ["json", FileJson2],
                    ["yaml", FileText],
                    ["graphql", FileCode2],
                  ].map(([value, Icon]) => {
                    const typedValue = value as Format
                    const TypedIcon = Icon as typeof FileJson2

                    return (
                      <button
                        type="button"
                        key={typedValue}
                        className={`inline-flex h-10 items-center justify-center gap-SPACE_02 px-SPACE_03 text-content-mini font-bold uppercase ${
                          format === typedValue
                            ? "bg-tailCall-yellow text-tailCall-dark-700"
                            : "bg-tailCall-light-100 text-tailCall-dark-500 hover:bg-tailCall-light-200 dark:bg-tailCall-dark-400 dark:text-tailCall-light-100 dark:hover:bg-tailCall-dark-300"
                        }`}
                        onClick={() => setFormat(typedValue)}
                      >
                        <TypedIcon size={15} aria-hidden="true" />
                        {typedValue}
                      </button>
                    )
                  })}
                </div>
              </div>

              <pre className="m-0 min-h-[560px] overflow-auto rounded-md border border-solid border-tailCall-border-light-500 bg-tailCall-dark-700 p-SPACE_04 text-content-mini leading-6 text-tailCall-light-100 dark:border-tailCall-border-dark-200">
                <code>{output}</code>
              </pre>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}

type TextFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  description?: string
  type?: "text" | "number" | "url"
}

const TextField = ({label, value, onChange, description, type = "text"}: TextFieldProps): JSX.Element => (
  <label className="flex flex-col gap-SPACE_02">
    <span className="text-content-tiny font-bold">{label}</span>
    <input className={inputClasses} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    {description && (
      <span className="line-clamp-2 text-content-mini text-tailCall-dark-100 dark:text-tailCall-light-500">
        {description}
      </span>
    )}
  </label>
)

type ToggleFieldProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  description?: string
}

const ToggleField = ({label, checked, onChange, description}: ToggleFieldProps): JSX.Element => (
  <label className="flex min-h-[88px] cursor-pointer flex-col justify-between gap-SPACE_02 border border-solid border-tailCall-border-light-500 p-SPACE_03 dark:border-tailCall-border-dark-200">
    <span className="flex items-center justify-between gap-SPACE_03">
      <span className="text-content-tiny font-bold">{label}</span>
      <input
        className="h-5 w-5"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </span>
    {description && (
      <span className="line-clamp-2 text-content-mini text-tailCall-dark-100 dark:text-tailCall-light-500">
        {description}
      </span>
    )}
  </label>
)

type FormSectionTitleProps = {
  title: string
  description?: string
}

const FormSectionTitle = ({title, description}: FormSectionTitleProps): JSX.Element => (
  <div className="mb-SPACE_04">
    <h2 className="m-0 text-title-small">{title}</h2>
    {description && (
      <p className="m-0 mt-SPACE_01 text-content-tiny text-tailCall-dark-100 dark:text-tailCall-light-500">
        {description}
      </p>
    )}
  </div>
)

export default ConfigGenerator
