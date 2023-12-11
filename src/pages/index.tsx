import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import HomepageFeatures from "@site/src/components/HomepageFeatures"
import Layout from "@theme/Layout"
import clsx from "clsx"
import React, {useEffect, useState} from "react"

import styles from "./index.module.css"
import CodeBlock from "@theme/CodeBlock"

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
          <div>API platform</div>
          <div>engineered for scale</div>
        </h1>
        <p className="hero__subtitle">
          A cloud native solution to streamline API management across <b>edge</b>, <b>middle</b>, and <b>service</b>{" "}
          layers.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="https://codesandbox.io/p/github/tailcallhq/tailcall-sandbox/main?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522vertical%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522clozmri5j00za3b6k438j753x%2522%252C%2522sizes%2522%253A%255B32.48820754716981%252C67.51179245283019%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clozmri5j00z73b6khzl1dinh%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clozmri5j00z83b6kjp9rj494%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clozmri5j00z93b6kzni32yac%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B70%252C30%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clozmri5j00z73b6khzl1dinh%2522%253A%257B%2522id%2522%253A%2522clozmri5j00z73b6khzl1dinh%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clozqor0400033b6lizm9sm0y%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fexercises%252Fexercise_1.graphql%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clozqor0400033b6lizm9sm0y%2522%257D%252C%2522clozmri5j00z83b6kjp9rj494%2522%253A%257B%2522id%2522%253A%2522clozmri5j00z83b6kjp9rj494%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clozm9zun00063b6lvv03tgj1%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522run%2520tailcall%2522%252C%2522port%2522%253A4000%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clozm9zun00063b6lvv03tgj1%2522%257D%252C%2522clozmri5j00z93b6kzni32yac%2522%253A%257B%2522id%2522%253A%2522clozmri5j00z93b6kzni32yac%2522%252C%2522activeTabId%2522%253A%2522clpalx8kq00ge3b6jkt30xkgh%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clozm9zun00043b6ltx1a2v38%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522run%2520tailcall%2522%257D%252C%257B%2522id%2522%253A%2522clpalx8kq00ge3b6jkt30xkgh%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clpalxefv0002edhvfku47z9k%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Afalse%252C%2522sidebarPanelSize%2522%253A1%257D"
          >
            Try it out
          </Link>
          <Link className="button button--secondary button--lg" to="#get-started">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

function Configuration(): JSX.Element {
  return (
    <CodeBlock language="graphql">
      {`# app.graphql

schema
  @server(port: 8000, graphiql: true)
  @upstream(baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
}

type Query {
  users: [User] @http(path: "/users")
  posts: [Post] @http(path: "/posts")
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
}


type Post {
  id: Int!
  title: String!
  body: String!
  userId: Int!
  # Expand a post with user information
  user: User @http(path: "/users/{{value.userId}}")
}
`}
    </CodeBlock>
  )
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext()
  return (
    <Layout title="API Platform" description="API Platform engineered for scale.">
      <HomepageHeader />
      <main>
        <div>
          <div className="container" id="get-started">
            <div className="row">
              <div className="col col--4">
                <h3>Get Started</h3>
                <div>
                  <p>
                    Setup the Tailcall instantly via npm and unlock the power of high-performance API orchestration.
                  </p>
                  <b>More</b>
                  <p>
                    Dive deeper into TailCall. Visit our <Link to="/docs/getting_started/">Documentation</Link>
                    &nbsp;for detailed tutorials. Ideal for devs at any level, it’s packed with advanced tips and best
                    practices.
                  </p>
                </div>
              </div>
              <div className="col col--8">
                <CodeBlock language="bash">npm i -g @tailcallhq/tailcall</CodeBlock>
                <Configuration />
                <CodeBlock language="bash">tailcall start ./app.graphql</CodeBlock>
              </div>
            </div>
          </div>
        </div>

        <HomepageFeatures />
      </main>
      <img
        style={{height: 0, width: 0}}
        referrerPolicy="no-referrer-when-downgrade"
        src="https://static.scarf.sh/a.png?x-pxid=45ec365f-ab8a-4848-a6a9-bd4ffecfe72e"
      />
    </Layout>
  )
}
