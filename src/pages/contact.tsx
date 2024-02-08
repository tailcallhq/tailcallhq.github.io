import React, { useEffect } from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import { useLocation } from "@docusaurus/router"

import ContactPage from "../components/contact"

const Contact = (): JSX.Element => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
      title: "Contact Page"
    })
  }, [])

  return (
    <Layout
      title="API Platform"
      description="API Platform engineered for scale."
    >
      <ContactPage />
    </Layout>
  )
}

export default Contact
