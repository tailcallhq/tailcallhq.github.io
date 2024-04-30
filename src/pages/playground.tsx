import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import PlaygroundPage from "../components/playground"
import {useLocation} from "@docusaurus/router"
import {PageDescription, PageTitle} from "../constants"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

const Playground = () => {
  const location = useLocation()
  const {siteConfig} = useDocusaurusContext()
  const {tagline} = siteConfig

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Playground Page"})
  }, [])

  return (
    <Layout title={`${PageTitle.PLAYGROUND} | ${tagline}`} description={PageDescription.PLAYGROUND}>
      <PlaygroundPage />
    </Layout>
  )
}

export default Playground
