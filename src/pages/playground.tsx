import React, {useEffect} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import PlaygroundPage from "../components/playground"
import {useLocation} from "@docusaurus/router"

const Playground = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Playground Page"})
  }, [])

  return (
    <Layout title="Tailcall Playground" description="Explore, test, and interact with your GraphQL APIs effortlessly">
      <PlaygroundPage />
    </Layout>
  )
}

export default Playground
