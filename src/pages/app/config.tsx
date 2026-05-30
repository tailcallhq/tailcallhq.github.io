import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import {useLocation} from "@docusaurus/router"
import ConfigGenerator from "@site/src/components/config/ConfigGenerator"
import {PageDescription, PageTitle} from "@site/src/constants/titles"

const ConfigGeneratorPage = (): JSX.Element => {
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
