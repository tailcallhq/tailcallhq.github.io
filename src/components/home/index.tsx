import React from "react"

import Banner from "./Banner"
import Features from "./Features"
import Graph from "./Graph"
import LegacyGateway from "./LegacyGateway"
import MoreFeatures from "./MoreFeatures"
import Partners from "./Partners"
import Discover from "../shared/Discover"
import Footer from "../shared/Footer"
import Configuration from "./Configuration"
import Playground from "./Playground"

const HomePage = () => {
  return (
    <div className="">
      <Banner />
      <Configuration />
      <Partners />
      <LegacyGateway />
      <Features />
      <MoreFeatures />
      <Graph />
      {/* <Playground /> */}
      <Discover />
      <Footer />
    </div>
  )
}

export default HomePage
