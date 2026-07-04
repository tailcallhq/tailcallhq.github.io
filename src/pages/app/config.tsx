import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import BrowserOnly from "@docusaurus/BrowserOnly"
import {useLocation} from "@docusaurus/router"
import ConfigGenerator from "@site/src/components/ConfigGenerator"
import {PageDescription, PageTitle} from "../../constants/titles"

const ConfigGeneratorPage = (): JSX.Element => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Config Generator Page"})
  }, [])

  return (
    <Layout title={PageTitle.CONFIG} description={PageDescription.CONFIG}>
      <BrowserOnly fallback={<div />}>{() => <ConfigGenerator />}</BrowserOnly>
    </Layout>
  )
}

export default ConfigGeneratorPage
