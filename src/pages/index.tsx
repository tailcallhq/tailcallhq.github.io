import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import HomepageFeatures from "@site/src/components/HomepageFeatures"
import Layout from "@theme/Layout"
import clsx from "clsx"
import React, {useEffect, useState} from "react"

import styles from "./index.module.css"

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <div>GraphQL Infrastructure</div>
          <div>for</div>
          <div>Microservices</div>
        </h1>
        <p className="hero__subtitle">
          Reduce Complexity . Streamline Collaboration . Improve User Experience
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://docs.google.com/forms/d/e/1FAIpQLSdNnaVhv1lR-EN6I9HAH6eIycN_0T-1URIch9IdXo0yZm9t3Q/viewform"
          >
            Get in touch!
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/quickstart"
          >
            Try it out!
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Simplify your edge layer with Tailcall's developer platform."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
