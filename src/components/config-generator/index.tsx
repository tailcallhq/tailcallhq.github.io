import React, {useEffect, useMemo, useState} from "react"
import {Download, Plus} from "lucide-react"

type Header = {
  key: string
  value: string
}

type Endpoint = {
  field: string
  typeName: string
  url: string
  method: "GET" | "POST"
}

type SchemaStatus = "idle" | "loading" | "loaded" | "failed"

const SCHEMA_URL = "https://raw.githubusercontent.com/tailcallhq/tailcall/main/generated/.tailcallrc.schema.json"

const initialHeaders: Header[] = [{key: "x-powered-by", value: "tailcall"}]

const initialEndpoints: Endpoint[] = [
  {
    field: "posts",
    typeName: "Post",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
  },
]

const safeName = (value: string, fallback: string) =>
  value
    .trim()
    .replace(/[^_0-9A-Za-z]/g, "")
    .replace(/^[0-9]+/, "") || fallback

const quote = (value: string) => value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')

const downloadText = (filename: string, content: string, type: string) => {
  const blob = new Blob([content], {type})
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

const ConfigGenerator = () => {
  const [schemaStatus, setSchemaStatus] = useState<SchemaStatus>("idle")
  const [schemaSections, setSchemaSections] = useState<string[]>([])
  const [port, setPort] = useState(8000)
  const [hostname, setHostname] = useState("0.0.0.0")
  const [graphQLPath, setGraphQLPath] = useState("/graphql")
  const [statusPath, setStatusPath] = useState("/status")
  const [httpVersion, setHttpVersion] = useState("HTTP1")
  const [enableFederation, setEnableFederation] = useState(false)
  const [queryValidation, setQueryValidation] = useState(false)
  const [batchRequests, setBatchRequests] = useState(false)
  const [headers, setHeaders] = useState<Header[]>(initialHeaders)
  const [endpoints, setEndpoints] = useState<Endpoint[]>(initialEndpoints)

  useEffect(() => {
    let isCurrent = true
    setSchemaStatus("loading")

    fetch(SCHEMA_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Schema request failed")
        }
        return response.json()
      })
      .then((schema) => {
        if (!isCurrent) return
        setSchemaSections(Object.keys(schema?.properties ?? {}))
        setSchemaStatus("loaded")
      })
      .catch(() => {
        if (!isCurrent) return
        setSchemaStatus("failed")
      })

    return () => {
      isCurrent = false
    }
  }, [])

  const server = useMemo(
    () => ({
      port,
      hostname,
      version: httpVersion,
      enableFederation,
      queryValidation,
      batchRequests,
      routes: {
        graphQL: graphQLPath,
        status: statusPath,
      },
      headers: {
        custom: headers.filter((header) => header.key.trim() && header.value.trim()),
      },
    }),
    [batchRequests, enableFederation, graphQLPath, headers, hostname, httpVersion, port, queryValidation, statusPath],
  )

  const runtimeConfig = useMemo(
    () => ({
      server,
      upstream: {
        batch: {
          delay: batchRequests ? 10 : 0,
          headers: headers.map((header) => header.key).filter(Boolean),
        },
      },
    }),
    [batchRequests, headers, server],
  )

  const jsonConfig = useMemo(() => JSON.stringify(runtimeConfig, null, 2), [runtimeConfig])

  const graphQLConfig = useMemo(() => {
    const headerSDL = headers
      .filter((header) => header.key.trim() && header.value.trim())
      .map((header) => `{key: "${quote(header.key)}", value: "${quote(header.value)}"}`)
      .join(", ")

    const serverArgs = [
      `port: ${port}`,
      `hostname: "${quote(hostname)}"`,
      `version: ${httpVersion}`,
      `enableFederation: ${enableFederation}`,
      `queryValidation: ${queryValidation}`,
      `batchRequests: ${batchRequests}`,
      `routes: {graphQL: "${quote(graphQLPath)}", status: "${quote(statusPath)}"}`,
      headerSDL ? `headers: {custom: [${headerSDL}]}` : "",
    ].filter(Boolean)

    const queryFields = endpoints
      .map((endpoint) => {
        const field = safeName(endpoint.field, "items")
        const typeName = safeName(endpoint.typeName, "Item")
        return `  ${field}: [${typeName}] @http(method: ${endpoint.method}, url: "${quote(endpoint.url)}")`
      })
      .join("\n")

    const types = endpoints
      .map((endpoint) => {
        const typeName = safeName(endpoint.typeName, "Item")
        return `type ${typeName} {\n  id: Int\n}`
      })
      .join("\n\n")

    return `schema @server(${serverArgs.join(", ")}) @upstream {\n  query: Query\n}\n\ntype Query {\n${queryFields}\n}\n\n${types}\n`
  }, [batchRequests, enableFederation, endpoints, graphQLPath, headers, hostname, httpVersion, port, queryValidation, statusPath])

  const updateHeader = (index: number, next: Header) => {
    setHeaders((current) => current.map((header, headerIndex) => (headerIndex === index ? next : header)))
  }

  const updateEndpoint = (index: number, next: Endpoint) => {
    setEndpoints((current) => current.map((endpoint, endpointIndex) => (endpointIndex === index ? next : endpoint)))
  }

  return (
    <main className="min-h-screen bg-tailCall-light-200 px-SPACE_04 py-SPACE_08 text-tailCall-dark-500">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-SPACE_06">
        <section className="flex flex-col gap-SPACE_04 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="mb-SPACE_03 font-space-grotesk text-4xl font-bold md:text-5xl">Tailcall Config Generator</h1>
            <p className="m-0 text-content-large text-tailCall-dark-100">
              Build a Tailcall runtime config and GraphQL schema from guided controls.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-SPACE_03 text-content-small">
            <span className="rounded border border-solid border-tailCall-border-light-500 px-SPACE_03 py-SPACE_02">
              Schema: {schemaStatus}
            </span>
            <span className="rounded border border-solid border-tailCall-border-light-500 px-SPACE_03 py-SPACE_02">
              Sections: {schemaSections.length}
            </span>
          </div>
        </section>

        <section className="grid gap-SPACE_05 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
          <div className="flex flex-col gap-SPACE_04">
            <div className="rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_05">
              <h2 className="mb-SPACE_04 font-space-grotesk text-2xl font-bold">Server</h2>
              <div className="grid gap-SPACE_03 sm:grid-cols-2">
                <label className="flex flex-col gap-SPACE_02 text-content-small font-semibold">
                  Hostname
                  <input className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" value={hostname} onChange={(event) => setHostname(event.target.value)} />
                </label>
                <label className="flex flex-col gap-SPACE_02 text-content-small font-semibold">
                  Port
                  <input className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" type="number" min={1} max={65535} value={port} onChange={(event) => setPort(Number(event.target.value))} />
                </label>
                <label className="flex flex-col gap-SPACE_02 text-content-small font-semibold">
                  GraphQL route
                  <input className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" value={graphQLPath} onChange={(event) => setGraphQLPath(event.target.value)} />
                </label>
                <label className="flex flex-col gap-SPACE_02 text-content-small font-semibold">
                  Status route
                  <input className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" value={statusPath} onChange={(event) => setStatusPath(event.target.value)} />
                </label>
                <label className="flex flex-col gap-SPACE_02 text-content-small font-semibold">
                  HTTP version
                  <select className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" value={httpVersion} onChange={(event) => setHttpVersion(event.target.value)}>
                    <option value="HTTP1">HTTP1</option>
                    <option value="HTTP2">HTTP2</option>
                  </select>
                </label>
              </div>
              <div className="mt-SPACE_04 grid gap-SPACE_03 sm:grid-cols-3">
                <label className="flex items-center gap-SPACE_02 text-content-small font-semibold">
                  <input type="checkbox" checked={enableFederation} onChange={(event) => setEnableFederation(event.target.checked)} />
                  Federation
                </label>
                <label className="flex items-center gap-SPACE_02 text-content-small font-semibold">
                  <input type="checkbox" checked={queryValidation} onChange={(event) => setQueryValidation(event.target.checked)} />
                  Query validation
                </label>
                <label className="flex items-center gap-SPACE_02 text-content-small font-semibold">
                  <input type="checkbox" checked={batchRequests} onChange={(event) => setBatchRequests(event.target.checked)} />
                  Batch requests
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_05">
              <div className="mb-SPACE_04 flex items-center justify-between gap-SPACE_03">
                <h2 className="m-0 font-space-grotesk text-2xl font-bold">Headers</h2>
                <button className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_02" type="button" title="Add header" onClick={() => setHeaders((current) => [...current, {key: "", value: ""}])}>
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-SPACE_03">
                {headers.map((header, index) => (
                  <div className="grid gap-SPACE_02 sm:grid-cols-2" key={index}>
                    <input aria-label="Header key" className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" placeholder="key" value={header.key} onChange={(event) => updateHeader(index, {...header, key: event.target.value})} />
                    <input aria-label="Header value" className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" placeholder="value" value={header.value} onChange={(event) => updateHeader(index, {...header, value: event.target.value})} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-solid border-tailCall-border-light-500 bg-white p-SPACE_05">
              <h2 className="mb-SPACE_04 font-space-grotesk text-2xl font-bold">Endpoints</h2>
              <div className="flex flex-col gap-SPACE_04">
                {endpoints.map((endpoint, index) => (
                  <div className="grid gap-SPACE_03" key={index}>
                    <input className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" placeholder="Query field" value={endpoint.field} onChange={(event) => updateEndpoint(index, {...endpoint, field: event.target.value})} />
                    <input className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" placeholder="Type name" value={endpoint.typeName} onChange={(event) => updateEndpoint(index, {...endpoint, typeName: event.target.value})} />
                    <input className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" placeholder="Upstream URL" value={endpoint.url} onChange={(event) => updateEndpoint(index, {...endpoint, url: event.target.value})} />
                    <select className="rounded border border-solid border-tailCall-border-light-500 p-SPACE_03" value={endpoint.method} onChange={(event) => updateEndpoint(index, {...endpoint, method: event.target.value as Endpoint["method"]})}>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-SPACE_04">
            <section className="rounded-lg border border-solid border-tailCall-border-light-500 bg-tailCall-dark-500 p-SPACE_05 text-white">
              <div className="mb-SPACE_04 flex flex-wrap items-center justify-between gap-SPACE_03">
                <h2 className="m-0 font-space-grotesk text-2xl font-bold">Runtime JSON</h2>
                <button className="flex items-center gap-SPACE_02 rounded bg-white px-SPACE_03 py-SPACE_02 text-tailCall-dark-500" type="button" onClick={() => downloadText("tailcall.runtime.json", jsonConfig, "application/json")}>
                  <Download size={18} />
                  Download
                </button>
              </div>
              <pre className="m-0 max-h-[420px] overflow-auto whitespace-pre-wrap rounded bg-black p-SPACE_04 text-content-small">{jsonConfig}</pre>
            </section>

            <section className="rounded-lg border border-solid border-tailCall-border-light-500 bg-tailCall-dark-500 p-SPACE_05 text-white">
              <div className="mb-SPACE_04 flex flex-wrap items-center justify-between gap-SPACE_03">
                <h2 className="m-0 font-space-grotesk text-2xl font-bold">GraphQL SDL</h2>
                <button className="flex items-center gap-SPACE_02 rounded bg-white px-SPACE_03 py-SPACE_02 text-tailCall-dark-500" type="button" onClick={() => downloadText("tailcall.config.graphql", graphQLConfig, "text/plain")}>
                  <Download size={18} />
                  Download
                </button>
              </div>
              <pre className="m-0 max-h-[420px] overflow-auto whitespace-pre-wrap rounded bg-black p-SPACE_04 text-content-small">{graphQLConfig}</pre>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ConfigGenerator
