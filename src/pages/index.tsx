import React, {useEffect} from "react"
import Layout from "@theme/Layout"
import ReactGA from "react-ga4"
import {useLocation} from "@docusaurus/router"

import HomePage from "../components/home"
import {PageDescription, PageTitle} from "../constants/titles"

const Home = (): JSX.Element => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Home Page"})
  }, [])

  useEffect(() => {
    if (isDevelopment) return

    const loadPixel = () => {
      const pixel = new Image()
      pixel.referrerPolicy = "no-referrer-when-downgrade"
      pixel.src = "https://static.scarf.sh/a.png?x-pxid=45ec365f-ab8a-4848-a6a9-bd4ffecfe72e"
    }
    const timer = window.setTimeout(loadPixel, 90000)

    return () => window.clearTimeout(timer)
  }, [isDevelopment])

  return (
    <Layout title={PageTitle.HOME} description={PageDescription.HOME}>
      <HomePage />
    </Layout>
  )
}

export default Home
