import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import {useLocation} from "@docusaurus/router"

import ConfigGenerator from "../../components/config-generator"

const ConfigApp = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Config Generator"})
  }, [])

  return (
    <Layout title="Config Generator" description="Generate Tailcall configurations from a web interface.">
      <ConfigGenerator />
    </Layout>
  )
}

export default ConfigApp
