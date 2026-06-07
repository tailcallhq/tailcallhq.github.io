import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import {useLocation} from "@docusaurus/router"
import ConfigGenerator from "../../components/config-generator"
import {PageDescription, PageTitle} from "../../constants/titles"

const ConfigPage = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Config Generator"})
  }, [])

  return (
    <Layout title={PageTitle.CONFIG} description={PageDescription.CONFIG}>
      <ConfigGenerator />
    </Layout>
  )
}

export default ConfigPage
