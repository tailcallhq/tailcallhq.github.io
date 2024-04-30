import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import {useLocation} from "@docusaurus/router"

import ContactPage from "../components/contact"
import {PageDescription, PageTitle} from "../constants"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

const Contact = (): JSX.Element => {
  const location = useLocation()
  const {siteConfig} = useDocusaurusContext()
  const {tagline} = siteConfig

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Contact Page"})
  }, [])

  return (
    <Layout title={`${PageTitle.CONTACT} | ${tagline}`} description={PageDescription.CONTACT}>
      <ContactPage />
    </Layout>
  )
}

export default Contact
