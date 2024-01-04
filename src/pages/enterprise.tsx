import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"

import EnterprisePage from "../components/enterprise"

const Enterprise = () => {
  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: window.location.pathname, title: "Enterprise Page"})
  }, [])

  return (
    <Layout title="API Platform" description="API Platform engineered for scale.">
      <EnterprisePage />
    </Layout>
  )
}

export default Enterprise
