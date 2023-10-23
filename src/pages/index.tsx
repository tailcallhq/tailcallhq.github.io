import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import HomepageFeatures from "@site/src/components/HomepageFeatures"
import Layout from "@theme/Layout"
import clsx from "clsx"
import React, {useEffect, useState} from "react"

import styles from "./index.module.css"

function HomepageHeader() {
  const [stars, setStars] = useState<string>()

  const fetchStars = async () => {
    const res = await fetch("https://api.github.com/repos/tailcallhq/tailcall")
    const data = (await res.json()) as {stargazers_count: number}
    if (typeof data?.stargazers_count === "number") {
      setStars(new Intl.NumberFormat().format(data.stargazers_count))
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
          <Link className="button button--primary button--lg" to="/docs/intro/quickstart">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg star-button"
            to="https://github.com/tailcallhq/tailcall/"
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="3"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>&nbsp;Star</span>
            <span
              style={{transition: "max-width 1s", opacity: "1s"}}
              className="w-full overflow-hidden whitespace-nowrap max-w-[100px] opacity-100"
            >
              &nbsp; {stars}
            </span>
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
