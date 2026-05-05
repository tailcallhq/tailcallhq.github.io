import React, {useEffect, useMemo, useState} from "react"

import styles from "./config.module.css"

const SCHEMA_URL = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

type RuntimeSchema = {
  title?: string
  description?: string
  properties?: Record<string, unknown>
}

type ServerConfig = {
  port: string
  hostname: string
  introspection: boolean
  queryValidation: boolean
  batchRequests: boolean
  version: "HTTP1" | "HTTP2"
}

type UpstreamConfig = {
  connectTimeout: string
  timeout: string
  verifySSL: boolean
  http2Only: boolean
  userAgent: string
}

type TelemetryConfig = {
  requestHeaders: string
  exporter: "none" | "stdout"
  stdoutPretty: boolean
}

type LinkType = "Config" | "Protobuf" | "Script" | "Cert" | "Key" | "Operation" | "Htpasswd" | "Jwks" | "Grpc"

type LinkConfig = {
  id: string
  type: LinkType
  src: string
  protoPaths: string
}

const TARGET_SECTIONS = ["server", "upstream", "telemetry", "links"]

const LINK_TYPES: LinkType[] = ["Config", "Protobuf", "Script", "Cert", "Key", "Operation", "Htpasswd", "Jwks", "Grpc"]

function toPositiveNumber(value: string, fallback: number) {
  const parsedValue = Number(value)

  if (Number.isFinite(parsedValue) && parsedValue >= 0) {
    return parsedValue
  }

  return fallback
}

function toStringList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function ConfigPage() {
  const [schema, setSchema] = useState<RuntimeSchema | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [serverConfig, setServerConfig] = useState<ServerConfig>({
    port: "8000",
    hostname: "0.0.0.0",
    introspection: true,
    queryValidation: false,
    batchRequests: false,
    version: "HTTP1",
  })

  const [upstreamConfig, setUpstreamConfig] = useState<UpstreamConfig>({
    connectTimeout: "10",
    timeout: "30",
    verifySSL: true,
    http2Only: false,
    userAgent: "Tailcall/1.0",
  })

  const [telemetryConfig, setTelemetryConfig] = useState<TelemetryConfig>({
    requestHeaders: "x-request-id,x-trace-id",
    exporter: "none",
    stdoutPretty: true,
  })

  const [linkConfig, setLinkConfig] = useState<LinkConfig>({
    id: "main-config",
    type: "Config",
    src: "./schema.graphql",
    protoPaths: "",
  })

  useEffect(() => {
    async function loadSchema() {
      try {
        const response = await fetch(SCHEMA_URL)

        if (!response.ok) {
          throw new Error(`Schema request failed: ${response.status}`)
        }

        const data = (await response.json()) as RuntimeSchema
        setSchema(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown schema loading error")
      } finally {
        setLoading(false)
      }
    }

    loadSchema()
  }, [])

  const availableSections = useMemo(() => {
    const properties = schema?.properties ?? {}

    return TARGET_SECTIONS.filter((section) => Object.prototype.hasOwnProperty.call(properties, section))
  }, [schema])

  const generatedConfig = useMemo(() => {
    const telemetry = {
      requestHeaders: toStringList(telemetryConfig.requestHeaders),
      ...(telemetryConfig.exporter === "stdout"
        ? {
            export: {
              stdout: {
                pretty: telemetryConfig.stdoutPretty,
              },
            },
          }
        : {}),
    }

    const link = {
      ...(linkConfig.id.trim() ? {id: linkConfig.id.trim()} : {}),
      type: linkConfig.type,
      src: linkConfig.src.trim() || "./schema.graphql",
      ...(linkConfig.type === "Protobuf" && toStringList(linkConfig.protoPaths).length > 0
        ? {proto_paths: toStringList(linkConfig.protoPaths)}
        : {}),
    }

    return {
      server: {
        port: toPositiveNumber(serverConfig.port, 8000),
        hostname: serverConfig.hostname.trim() || "0.0.0.0",
        introspection: serverConfig.introspection,
        queryValidation: serverConfig.queryValidation,
        batchRequests: serverConfig.batchRequests,
        version: serverConfig.version,
      },
      upstream: {
        connectTimeout: toPositiveNumber(upstreamConfig.connectTimeout, 10),
        timeout: toPositiveNumber(upstreamConfig.timeout, 30),
        verifySSL: upstreamConfig.verifySSL,
        http2Only: upstreamConfig.http2Only,
        userAgent: upstreamConfig.userAgent.trim() || "Tailcall/1.0",
      },
      telemetry,
      links: [link],
    }
  }, [serverConfig, upstreamConfig, telemetryConfig, linkConfig])

  const generatedJson = useMemo(() => {
    return JSON.stringify(generatedConfig, null, 2)
  }, [generatedConfig])

  function downloadConfig() {
    const blob = new Blob([generatedJson], {
      type: "application/json;charset=utf-8",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = "tailcall.config.json"
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <main className={styles.page}>
      <h1>Tailcall Config Generator</h1>
      <p>Generate Tailcall configuration from the latest runtime schema.</p>

      <section className={styles.card} style={{marginTop: 32}}>
        <h2>Schema status</h2>

        {loading && <p>Loading schema...</p>}

        {error && <p style={{color: "#ff6b6b"}}>Schema could not be loaded: {error}</p>}

        {schema && (
          <>
            <p>
              Loaded schema: <strong>{schema.title ?? "Runtime Config"}</strong>
            </p>

            <p>
              Detected sections: <strong>{availableSections.join(", ")}</strong>
            </p>
          </>
        )}
      </section>

      <section className={styles.grid}>
        <div className={styles.formColumn}>
          <div className={styles.card}>
            <h2>Server</h2>
            <p>Configure the Tailcall server section. These fields map to the RuntimeConfig server schema.</p>

            <div style={{display: "grid", gap: 16, marginTop: 20}}>
              <label className={styles.label}>
                Port
                <input
                  className={styles.input}
                  type="number"
                  min="0"
                  value={serverConfig.port}
                  onChange={(event) =>
                    setServerConfig((current) => ({
                      ...current,
                      port: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={styles.label}>
                Hostname
                <input
                  className={styles.input}
                  value={serverConfig.hostname}
                  onChange={(event) =>
                    setServerConfig((current) => ({
                      ...current,
                      hostname: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={styles.label}>
                HTTP version
                <select
                  className={styles.input}
                  value={serverConfig.version}
                  onChange={(event) =>
                    setServerConfig((current) => ({
                      ...current,
                      version: event.target.value as ServerConfig["version"],
                    }))
                  }
                >
                  <option value="HTTP1">HTTP1</option>
                  <option value="HTTP2">HTTP2</option>
                </select>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={serverConfig.introspection}
                  onChange={(event) =>
                    setServerConfig((current) => ({
                      ...current,
                      introspection: event.target.checked,
                    }))
                  }
                />{" "}
                Enable introspection
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={serverConfig.queryValidation}
                  onChange={(event) =>
                    setServerConfig((current) => ({
                      ...current,
                      queryValidation: event.target.checked,
                    }))
                  }
                />{" "}
                Enable query validation
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={serverConfig.batchRequests}
                  onChange={(event) =>
                    setServerConfig((current) => ({
                      ...current,
                      batchRequests: event.target.checked,
                    }))
                  }
                />{" "}
                Enable batch requests
              </label>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Upstream</h2>
            <p>
              Configure upstream request behavior such as timeouts, SSL verification, HTTP/2 behavior, and user agent.
            </p>

            <div style={{display: "grid", gap: 16, marginTop: 20}}>
              <label className={styles.label}>
                Connect timeout seconds
                <input
                  className={styles.input}
                  type="number"
                  min="0"
                  value={upstreamConfig.connectTimeout}
                  onChange={(event) =>
                    setUpstreamConfig((current) => ({
                      ...current,
                      connectTimeout: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={styles.label}>
                Request timeout seconds
                <input
                  className={styles.input}
                  type="number"
                  min="0"
                  value={upstreamConfig.timeout}
                  onChange={(event) =>
                    setUpstreamConfig((current) => ({
                      ...current,
                      timeout: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={styles.label}>
                User agent
                <input
                  className={styles.input}
                  value={upstreamConfig.userAgent}
                  onChange={(event) =>
                    setUpstreamConfig((current) => ({
                      ...current,
                      userAgent: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={upstreamConfig.verifySSL}
                  onChange={(event) =>
                    setUpstreamConfig((current) => ({
                      ...current,
                      verifySSL: event.target.checked,
                    }))
                  }
                />{" "}
                Verify SSL certificates
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={upstreamConfig.http2Only}
                  onChange={(event) =>
                    setUpstreamConfig((current) => ({
                      ...current,
                      http2Only: event.target.checked,
                    }))
                  }
                />{" "}
                Use HTTP/2 only
              </label>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Telemetry</h2>
            <p>
              Configure OpenTelemetry request headers and a simple stdout exporter for debug-friendly observability.
            </p>

            <div style={{display: "grid", gap: 16, marginTop: 20}}>
              <label className={styles.label}>
                Request headers
                <input
                  className={styles.input}
                  value={telemetryConfig.requestHeaders}
                  onChange={(event) =>
                    setTelemetryConfig((current) => ({
                      ...current,
                      requestHeaders: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={styles.label}>
                Exporter
                <select
                  className={styles.input}
                  value={telemetryConfig.exporter}
                  onChange={(event) =>
                    setTelemetryConfig((current) => ({
                      ...current,
                      exporter: event.target.value as TelemetryConfig["exporter"],
                    }))
                  }
                >
                  <option value="none">None</option>
                  <option value="stdout">Stdout</option>
                </select>
              </label>

              {telemetryConfig.exporter === "stdout" && (
                <label>
                  <input
                    type="checkbox"
                    checked={telemetryConfig.stdoutPretty}
                    onChange={(event) =>
                      setTelemetryConfig((current) => ({
                        ...current,
                        stdoutPretty: event.target.checked,
                      }))
                    }
                  />{" "}
                  Pretty stdout output
                </label>
              )}
            </div>
          </div>

          <div className={styles.card}>
            <h2>Links</h2>
            <p>Add an external Tailcall resource link. The generated item follows the RuntimeConfig link schema.</p>

            <div style={{display: "grid", gap: 16, marginTop: 20}}>
              <label className={styles.label}>
                Link id
                <input
                  className={styles.input}
                  value={linkConfig.id}
                  onChange={(event) =>
                    setLinkConfig((current) => ({
                      ...current,
                      id: event.target.value,
                    }))
                  }
                />
              </label>

              <label className={styles.label}>
                Link type
                <select
                  className={styles.input}
                  value={linkConfig.type}
                  onChange={(event) =>
                    setLinkConfig((current) => ({
                      ...current,
                      type: event.target.value as LinkType,
                    }))
                  }
                >
                  {LINK_TYPES.map((linkType) => (
                    <option key={linkType} value={linkType}>
                      {linkType}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.label}>
                Source
                <input
                  className={styles.input}
                  value={linkConfig.src}
                  onChange={(event) =>
                    setLinkConfig((current) => ({
                      ...current,
                      src: event.target.value,
                    }))
                  }
                />
              </label>

              {linkConfig.type === "Protobuf" && (
                <label className={styles.label}>
                  Proto paths
                  <input
                    className={styles.input}
                    value={linkConfig.protoPaths}
                    onChange={(event) =>
                      setLinkConfig((current) => ({
                        ...current,
                        protoPaths: event.target.value,
                      }))
                    }
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className={`${styles.card} ${styles.previewCard}`}>
          <h2>Generated config</h2>

          <button className={styles.button} type="button" onClick={downloadConfig}>
            Download config.json
          </button>

          <pre className={styles.preview}>{generatedJson}</pre>
        </div>
      </section>
    </main>
  )
}
