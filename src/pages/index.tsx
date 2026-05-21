import React, {useEffect, useState} from "react"
import Layout from "@theme/Layout"
import {useLocation} from "@docusaurus/router"

import HomePage from "../components/home"
import {PageDescription, PageTitle} from "../constants/titles"

const Home = (): JSX.Element => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const location = useLocation()
  const [shouldLoadScarfPixel, setShouldLoadScarfPixel] = useState(false)

  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {page_path: location.pathname, page_title: "Home Page"})
    }
  }, [location.pathname])

  useEffect(() => {
    const loadPixel = () => setShouldLoadScarfPixel(true)
    const options = {once: true, passive: true}

    window.addEventListener("pointerdown", loadPixel, options)
    window.addEventListener("keydown", loadPixel, options)
    window.addEventListener("touchstart", loadPixel, options)

    return () => {
      window.removeEventListener("pointerdown", loadPixel)
      window.removeEventListener("keydown", loadPixel)
      window.removeEventListener("touchstart", loadPixel)
    }
  }, [])

  return (
    <Layout title={PageTitle.HOME} description={PageDescription.HOME}>
      <HomePage />
      {!isDevelopment && shouldLoadScarfPixel && (
        <img
          style={{height: 0, width: 0}}
          referrerPolicy="no-referrer-when-downgrade"
          src="https://static.scarf.sh/a.png?x-pxid=45ec365f-ab8a-4848-a6a9-bd4ffecfe72e"
          alt="pixel"
        />
      )}
    </Layout>
  )
}

export default Home
