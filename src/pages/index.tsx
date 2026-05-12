import React from "react"
import Head from "@docusaurus/Head"
import Link from "@docusaurus/Link"
import {PageDescription, PageTitle} from "../constants/titles"

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111827",
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  header: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "#111827",
    fontWeight: 700,
    textDecoration: "none",
  },
  logo: {
    width: 36,
    height: 36,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    fontSize: 14,
    fontWeight: 600,
  },
  navLink: {
    color: "#111827",
    textDecoration: "none",
  },
  hero: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "40px 24px 80px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 40,
    alignItems: "center",
  },
  h1: {
    maxWidth: 720,
    margin: 0,
    fontSize: "clamp(48px, 8vw, 72px)",
    lineHeight: 1.05,
    fontWeight: 800,
    letterSpacing: 0,
  },
  highlight: {
    display: "inline-block",
    background: "#ffdb59",
    borderRadius: 14,
    padding: "0 10px",
  },
  copy: {
    maxWidth: 660,
    margin: "24px 0 0",
    color: "#4b5563",
    fontSize: 20,
    lineHeight: 1.6,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 32,
  },
  primaryButton: {
    display: "inline-flex",
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    background: "#111827",
    color: "#ffffff",
    padding: "0 28px",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
  },
  secondaryButton: {
    display: "inline-flex",
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #111827",
    borderRadius: 999,
    color: "#111827",
    padding: "0 28px",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
  },
  codeWrap: {
    border: "1px solid #e5e7eb",
    borderRadius: 24,
    background: "#f9fafb",
    padding: 24,
  },
  codeInner: {
    borderRadius: 18,
    background: "#ffffff",
    padding: 20,
    boxShadow: "0 1px 4px rgba(17,24,39,0.08)",
  },
  pre: {
    margin: 0,
    overflowX: "auto",
    color: "#374151",
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    fontSize: 14,
    lineHeight: 1.65,
  },
  features: {
    borderTop: "1px solid #e5e7eb",
    background: "#f9fafb",
  },
  featureGrid: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "48px 24px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
  },
  featureTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 800,
  },
  featureCopy: {
    margin: "8px 0 0",
    color: "#4b5563",
    fontSize: 14,
    lineHeight: 1.6,
  },
}

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>{PageTitle.HOME}</title>
        <meta name="description" content={PageDescription.HOME} />
        <style>{`html,body{margin:0}*{box-sizing:border-box}`}</style>
      </Head>
      <main style={styles.main}>
        <header style={styles.header}>
          <Link to="/" style={styles.brand}>
            <img src="/icons/companies/tailcall.svg" alt="" style={styles.logo} width="36" height="36" />
            <span>Tailcall</span>
          </Link>
          <nav style={styles.nav}>
            <Link to="/docs/" style={styles.navLink}>
              Docs
            </Link>
            <Link to="/blog/" style={styles.navLink}>
              Blog
            </Link>
          </nav>
        </header>

        <section style={styles.hero}>
          <div>
            <h1 style={styles.h1}>
              The modern <span style={styles.highlight}>GraphQL</span> platform.
            </h1>
            <p style={styles.copy}>
              Leverage AI to design and ship best-practice GraphQL backends atop existing data sources and APIs.
            </p>
            <div style={styles.actions}>
              <Link to="/docs/" style={styles.primaryButton}>
                Get started
              </Link>
              <Link to="/graphql/" style={styles.secondaryButton}>
                Learn GraphQL
              </Link>
            </div>
          </div>

          <div style={styles.codeWrap}>
            <div style={styles.codeInner}>
              <pre style={styles.pre}>
                <code>{`schema @server(port: 8000) {
  query: Query
}

type Query {
  users: [User] @http(url: "/users")
}

type User {
  id: ID!
  name: String!
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        <section style={styles.features}>
          <div style={styles.featureGrid}>
            <div>
              <h2 style={styles.featureTitle}>Instant GraphQL</h2>
              <p style={styles.featureCopy}>Connect REST, gRPC, and GraphQL APIs without hand-written BFF code.</p>
            </div>
            <div>
              <h2 style={styles.featureTitle}>Built for scale</h2>
              <p style={styles.featureCopy}>
                Static checks, query planning, and runtime performance for production teams.
              </p>
            </div>
            <div>
              <h2 style={styles.featureTitle}>Open source</h2>
              <p style={styles.featureCopy}>
                Adopt incrementally, inspect everything, and deploy where your stack already runs.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
