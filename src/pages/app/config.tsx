import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import ConfigGenerator from "../../components/config-generator"
import {useLocation} from "@docusaurus/router"
import {PageDescription, PageTitle} from "../../constants/titles"

const ConfigGeneratorPage = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Config Generator Page"})
  }, [])

  return (
    <Layout title={PageTitle.CONFIG_GENERATOR} description={PageDescription.CONFIG_GENERATOR}>
      <ConfigGenerator />
    </Layout>
  )
}

export default ConfigGeneratorPage
