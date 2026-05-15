import React, {useEffect, useState} from "react"
import Layout from "@theme/Layout"
import ReactGA from "react-ga4"
import {useLocation} from "@docusaurus/router"

import HomePage from "../components/home"
import {PageDescription, PageTitle} from "../constants/titles"

const Home = (): JSX.Element => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const location = useLocation()
  const [showTrackingPixel, setShowTrackingPixel] = useState(false)

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Home Page"})

    if (!isDevelopment) {
      setShowTrackingPixel(true)
    }
  }, [isDevelopment, location.pathname])

  return (
    <Layout title={PageTitle.HOME} description={PageDescription.HOME}>
      <HomePage />
      {showTrackingPixel && (
        <img
          style={{height: 0, width: 0}}
          referrerPolicy="no-referrer-when-downgrade"
          src="https://static.scarf.sh/a.png?x-pxid=45ec365f-ab8a-4848-a6a9-bd4ffecfe72e"
          alt=""
          aria-hidden="true"
        />
      )}
    </Layout>
  )
}

export default Home
