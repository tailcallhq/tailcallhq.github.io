import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import {useLocation} from "@docusaurus/router"

import AboutPage from "../components/about"

export default function About(): JSX.Element {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "About Page"})
  }, [])

  return (
    <Layout title="API Platform" description="API Platform engineered for scale.">
      <AboutPage />
    </Layout>
  )
}
