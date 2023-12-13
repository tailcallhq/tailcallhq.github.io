import React from "react"

import Banner from "./Banner"
import Features from "./Features"
import Graph from "./Graph"
import LegacyGateway from "./LegacyGateway"
import MoreFeatures from "./MoreFeatures"
import Partners from "./Partners"
import Discover from "../shared/Discover"
import Footer from "../shared/Footer"

const HomePage = () => {
  return (
    <div className="scrollbar-thin">
      <Banner />
      <Partners />
      <LegacyGateway />
      <Features />
      <MoreFeatures />
      <Graph />
      <Discover />
      <Footer />
    </div>
  )
}

export default HomePage
