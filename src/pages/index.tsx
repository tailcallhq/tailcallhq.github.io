import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import HomepageFeatures from "@site/src/components/HomepageFeatures"
import Layout from "@theme/Layout"
import clsx from "clsx"
import React from "react"

import styles from "./index.module.css"
import Playground from "../components/Playground"

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <div>Zero Code</div>
          <div>GraphQL Backend</div>
        </h1>
        <p className="hero__subtitle">Bootstrap Instantly . Iterate Effortlessly . Scale Fearlessly</p>
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
        <Playground />
      </main>
    </Layout>
  )
}
