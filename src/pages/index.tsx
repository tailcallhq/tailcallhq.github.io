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
            to="https://codesandbox.io/p/github/tailcallhq/tailcall-sandbox/main?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522vertical%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522clozmri5j00za3b6k438j753x%2522%252C%2522sizes%2522%253A%255B50%252C50%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clozmri5j00z73b6khzl1dinh%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clozmri5j00z83b6kjp9rj494%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clozmri5j00z93b6kzni32yac%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B70%252C30%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clozmri5j00z73b6khzl1dinh%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clozm9zun00023b6ljkg77tv6%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fapp%252Fexample.graphql%2522%252C%2522id%2522%253A%2522clozmkicf009c3b6k6wyhyk25%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%252C%2522id%2522%253A%2522clozmri5j00z73b6khzl1dinh%2522%252C%2522activeTabId%2522%253A%2522clozmkicf009c3b6k6wyhyk25%2522%257D%252C%2522clozmri5j00z83b6kjp9rj494%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clozm9zun00063b6lvv03tgj1%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522run%2520tailcall%2522%252C%2522port%2522%253A4000%252C%2522path%2522%253A%2522%2522%257D%255D%252C%2522id%2522%253A%2522clozmri5j00z83b6kjp9rj494%2522%252C%2522activeTabId%2522%253A%2522clozm9zun00063b6lvv03tgj1%2522%257D%252C%2522clozmri5j00z93b6kzni32yac%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clozm9zun00043b6ltx1a2v38%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522run%2520tailcall%2522%257D%255D%252C%2522id%2522%253A%2522clozmri5j00z93b6kzni32yac%2522%252C%2522activeTabId%2522%253A%2522clozm9zun00043b6ltx1a2v38%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Afalse%252C%2522sidebarPanelSize%2522%253A15%257D"
          >
            Try it out
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/getting_started">
            Get Started
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
