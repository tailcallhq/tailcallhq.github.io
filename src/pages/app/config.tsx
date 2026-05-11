import React, {useEffect} from "react"
import Layout from "@theme/Layout"
import {useLocation} from "@docusaurus/router"
import ReactGA from "react-ga4"
import ConfigBuilder from "@site/src/components/config-builder/ConfigBuilder"

const ConfigPage = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Config Builder Page"})
  }, [])

  return (
    <Layout
      title="Config Builder | The modern GraphQL runtime"
      description="Create Tailcall runtime configuration files from the live JSON schema."
    >
      <ConfigBuilder />
    </Layout>
  )
}

export default ConfigPage
