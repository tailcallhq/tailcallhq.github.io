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
          <div>GraphQL Proxy</div>
          <div>for</div>
          <div>Edge, Gateway & Services</div>
        </h1>
        <p className="hero__subtitle">Reduce Complexity . Streamline Collaboration . Improve User Experience</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro/quickstart">
            Get Started!
          </Link>
          <Link className="button button--secondary button--lg" to="https://discord.gg/7fseDEXUNU">
            Join Discord!
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
      title="GraphQL Infrastructure for Microservices"
      description="Simplify your edge layer with Tailcall's developer platform."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
