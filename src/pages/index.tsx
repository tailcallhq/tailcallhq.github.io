import React, {useEffect, useState} from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import HomepageFeatures from "@site/src/components/HomepageFeatures"

import styles from "./index.module.css"
import BrowserOnly from "@docusaurus/BrowserOnly"

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext()
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.tagline}</h1>
        <p className="hero__subtitle">
          Tailcall's <b>developer platform</b> dramatically improves developer
          productivity, reduces infrastructural complexity, saves costs, and is
          designed to work for scale.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://docs.google.com/forms/d/e/1FAIpQLSdNnaVhv1lR-EN6I9HAH6eIycN_0T-1URIch9IdXo0yZm9t3Q/viewform"
          >
            Join the waitlist!
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext()

  const [dimensions, setDimensions] = useState({height: -1, width: -1})
  useEffect(() => {
    const width = Math.min(800, screen.width)
    const height = (width / 16) * 9

    setDimensions({width, height})
  })

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Simplify your edge layer with Tailcall's developer platform."
    >
      <HomepageHeader />

      <main>
        <BrowserOnly fallback={<div>Loading...</div>}>
          {() =>
            dimensions.height > -1 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "2rem",
                }}
              >
                <iframe
                  width={dimensions.width}
                  height={dimensions.height}
                  src="https://www.youtube.com/embed/VhOS5bT7-po"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            ) : null
          }
        </BrowserOnly>

        <HomepageFeatures />
      </main>
    </Layout>
  )
}
