import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import {useLocation} from "@docusaurus/router"

import EnterprisePage from "../components/enterprise"
import {PageDescription, PageTitle} from "../constants"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

const Enterprise = (): JSX.Element => {
  const location = useLocation()
  const {siteConfig} = useDocusaurusContext()
  const {tagline} = siteConfig

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Enterprise Page"})
  }, [])

  return (
    <Layout title={`${PageTitle.ENTERPRISE} | ${tagline}`} description={PageDescription.ENTERPRISE}>
      <EnterprisePage />
    </Layout>
  )
}

export default Enterprise
