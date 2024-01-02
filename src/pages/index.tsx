import React, {useEffect} from "react"
import Layout from "@theme/Layout"
import ReactGA from "react-ga4"

import HomePage from "../components/home"

ReactGA.initialize("G-JEP3QDWT0G")

export default function Home(): JSX.Element {
  const isDevelopment = process.env.NODE_ENV === "development"

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: window.location.pathname, title: "Home Page"})
  }, [])

  return (
    <Layout title="API Platform" description="API Platform engineered for scale.">
      <HomePage />
      {!isDevelopment && (
        <img
          style={{height: 0, width: 0}}
          referrerPolicy="no-referrer-when-downgrade"
          src="https://static.scarf.sh/a.png?x-pxid=45ec365f-ab8a-4848-a6a9-bd4ffecfe72e"
        />
      )}
    </Layout>
  )
}
