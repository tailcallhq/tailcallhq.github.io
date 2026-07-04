import React, {useEffect, useMemo, useState} from "react"
import Link from "@docusaurus/Link"
import {Check, Copy, Download, RotateCcw} from "lucide-react"
import SchemaForm from "./SchemaForm"
import {type SelectOption} from "./SearchableSelect"
import {serialize, type OutputFormat} from "./serialize"
import {validateConfig, type ValidationError} from "./validate"
import {fetchSchema, SCHEMA_URL, type JSONSchema} from "./jsonSchema"
import {fallbackSchema} from "./fallbackSchema"
import styles from "./styles.module.css"

const STORAGE_KEY = "tailcall-config-generator"

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v)

// A small starter configuration so the page is immediately useful and shows a
// valid, well-formed result on first load.
const STARTER_CONFIG: Record<string, unknown> = {
  server: {port: 8000},
  schema: {query: "Query"},
  types: {
    Query: {
      fields: {
        posts: {type: "[Post]", http: {url: "https://jsonplaceholder.typicode.com/posts"}},
      },
    },
    Post: {
      fields: {
        id: {type: "Int"},
        title: {type: "String"},
        userId: {type: "Int"},
      },
    },
  },
}

const FORMATS: Array<{id: OutputFormat; label: string}> = [
  {id: "graphql", label: "GraphQL"},
  {id: "json", label: "JSON"},
  {id: "yaml", label: "YAML"},
]

const FILE_NAMES: Record<OutputFormat, string> = {
  graphql: "config.graphql",
  json: "config.json",
  yaml: "config.yml",
}

const SCALARS = ["String", "Int", "Float", "Boolean", "ID"]

type SchemaSource = "loading" | "live" | "bundled"

const ConfigGenerator = (): JSX.Element => {
  const [schema, setSchema] = useState<JSONSchema>(fallbackSchema)
  const [source, setSource] = useState<SchemaSource>("loading")
  const [config, setConfig] = useState<Record<string, unknown>>(STARTER_CONFIG)
  const [format, setFormat] = useState<OutputFormat>("graphql")
  const [copied, setCopied] = useState(false)

  // Load the live schema on mount, falling back to the bundled snapshot.
  useEffect(() => {
    let cancelled = false
    fetchSchema(SCHEMA_URL)
      .then((live) => {
        if (cancelled) return
        setSchema(live)
        setSource("live")
      })
      .catch(() => {
        if (cancelled) return
        setSource("bundled")
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Restore a previously saved draft, if any.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (isPlainObject(parsed)) setConfig(parsed)
      }
    } catch {
      // Ignore malformed or unavailable storage.
    }
  }, [])

  // Persist the draft as it changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    } catch {
      // Ignore storage failures (private mode, quota).
    }
  }, [config])

  const typeSuggestions = useMemo<SelectOption[]>(() => {
    const names = new Set(SCALARS)
    for (const key of ["types", "unions", "enums"]) {
      const group = config[key]
      if (isPlainObject(group)) Object.keys(group).forEach((name) => names.add(name))
    }
    const options: SelectOption[] = []
    for (const name of names) {
      options.push({value: name, label: name})
      options.push({value: `[${name}]`, label: `[${name}] (list)`})
    }
    return options
  }, [config])

  const output = useMemo(() => serialize(config, format), [config, format])
  const errors = useMemo<ValidationError[]>(() => validateConfig(config, schema), [config, schema])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard may be unavailable; the output is still visible for manual copy.
    }
  }

  const onDownload = () => {
    const blob = new Blob([output], {type: "text/plain;charset=utf-8"})
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = FILE_NAMES[format]
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(url)
  }

  const onReset = () => setConfig(STARTER_CONFIG)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Configuration Generator</h1>
        <p className={styles.subtitle}>
          Build a Tailcall configuration with a form driven directly by the official schema, then copy or download it as
          GraphQL, JSON or YAML.
        </p>
        <div className={styles.headerMeta}>
          <span className={styles.badge} data-source={source} title={SCHEMA_URL}>
            {source === "live" && "Schema loaded from tailcall"}
            {source === "bundled" && "Using bundled schema (offline)"}
            {source === "loading" && "Loading schema…"}
          </span>
          <Link to="/playground/" className={styles.playgroundLink}>
            Open the GraphQL Playground →
          </Link>
        </div>
      </header>

      <div className={styles.layout}>
        <section className={styles.formPanel} aria-label="Configuration form">
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Configuration</h2>
            <button type="button" className={styles.ghostBtn} onClick={onReset}>
              <RotateCcw size={15} aria-hidden="true" />
              Reset
            </button>
          </div>
          <div className={styles.formScroll}>
            <SchemaForm
              schema={schema}
              root={schema}
              value={config}
              onChange={(v) => setConfig(isPlainObject(v) ? v : {})}
              suggestions={typeSuggestions}
            />
          </div>
        </section>

        <section className={styles.outputPanel} aria-label="Generated configuration">
          <div className={styles.panelHeader}>
            <div className={styles.tabs} role="tablist">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={format === f.id}
                  className={format === f.id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                  onClick={() => setFormat(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className={styles.outputActions}>
              <button type="button" className={styles.ghostBtn} onClick={onCopy} data-testid="copy">
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button type="button" className={styles.ghostBtn} onClick={onDownload}>
                <Download size={15} aria-hidden="true" />
                Download
              </button>
            </div>
          </div>

          <pre className={styles.output} data-testid="output">
            <code>{output}</code>
          </pre>

          <div className={errors.length > 0 ? styles.invalid : styles.valid} data-testid="validation">
            {errors.length === 0 ? (
              <span>
                <Check size={14} aria-hidden="true" /> No schema errors
              </span>
            ) : (
              <ul className={styles.errorList}>
                {errors.slice(0, 6).map((error, i) => (
                  <li key={i}>
                    <code>{error.path || "(root)"}</code> {error.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ConfigGenerator
