import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import {useLocation} from "@docusaurus/router"

import AboutPage from "../components/about"
import {PageDescription, PageTitle} from "../constants"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

const About = (): JSX.Element => {
  const location = useLocation()
  const {siteConfig} = useDocusaurusContext()
  const {tagline} = siteConfig

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "About Page"})
  }, [])

  return (
    <Layout title={`${PageTitle.ABOUT} | ${tagline}`} description={PageDescription.ABOUT}>
      <AboutPage />
    </Layout>
  )
}

export default About
