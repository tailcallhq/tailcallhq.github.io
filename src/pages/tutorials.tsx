import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import TutorialsPage from "../components/tutorials"
import {useLocation} from "@docusaurus/router"
import {PageDescription, PageTitle} from "../constants/titles"

const Tutorials = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Tutorials Page"})
  }, [])

  return (
    <Layout title={PageTitle.TUTORIALS} description={PageDescription.TUTORIALS}>
      <TutorialsPage />
    </Layout>
  )
}

export default Tutorials
