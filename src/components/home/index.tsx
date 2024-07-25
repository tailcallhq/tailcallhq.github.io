import React from "react"

import Banner from "./Banner"
import Features from "./Features"
import Graph from "./Graph"
import LegacyGateway from "./Benefits"
import MoreFeatures from "./MoreFeatures"
import Partners from "./Partners"
import Discover from "../shared/Discover"
import Configuration from "./Configuration"
import Playground from "./Playground"

const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <Configuration />
      <LegacyGateway />
      <Partners />
      <Graph />
      {/* <Playground /> */}
      <Discover />
    </div>
  )
}

export default HomePage
