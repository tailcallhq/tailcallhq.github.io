import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import HomepageFeatures from "@site/src/components/HomepageFeatures"
import Layout from "@theme/Layout"
import clsx from "clsx"
import React, {useEffect, useState} from "react"

import styles from "./index.module.css"

function HomepageHeader() {
  const fetchStars = async () => {
    const res = await fetch("https://api.github.com/repos/tailcallhq/tailcall")
    const data = (await res.json()) as {stargazers_count: number}
    if (typeof data?.stargazers_count === "number") {
      document.querySelector("#gh-button").innerHTML = new Intl.NumberFormat().format(data.stargazers_count)
    }
  }

  useEffect(() => {
    fetchStars().catch(console.error)
  }, [])
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <div>Zero Code</div>
          <div>GraphQL Backend</div>
        </h1>
        <p className="hero__subtitle">Bootstrap Instantly . Iterate Effortlessly . Scale Fearlessly</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="https://codesandbox.io/p/github/neo773/tailcall-sandbox/main?file=%2Fapp%2Fexample.graphql"
          >
            Try it out
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/getting_started">
            Learn More
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
