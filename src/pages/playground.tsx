import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import PlaygroundPage from "../components/playground"
import {useLocation} from "@docusaurus/router"
import {PageDescription, PageTitle} from "../constants/titles"

const Playground = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Playground Page"})
  }, [])

  return (
    <Layout title={PageTitle.PLAYGROUND} description={PageDescription.PLAYGROUND}>
      <PlaygroundPage />
    </Layout>
  )
}

export default Playground
