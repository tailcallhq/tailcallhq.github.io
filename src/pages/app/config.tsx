import React, {useEffect} from "react"
import {useLocation} from "@docusaurus/router"
import Layout from "@theme/Layout"
import ReactGA from "react-ga4"
import ConfigGenerator from "../../components/configGenerator"

const ConfigGeneratorPage = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Configuration Generator"})
  }, [])

  return (
    <Layout
      title="Configuration Generator | The modern GraphQL runtime"
      description="Generate Tailcall JSON, YAML, and GraphQL configurations from the live Tailcall schema."
    >
      <ConfigGenerator />
    </Layout>
  )
}

export default ConfigGeneratorPage
