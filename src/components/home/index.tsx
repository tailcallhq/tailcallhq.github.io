import React from "react"

import Banner from "./Banner"
import Features from "./Features"
import Graph from "./Graph"
import LegacyGateway from "./TheProblem"
import MoreFeatures from "./MoreFeatures"
import Discover from "../shared/Discover"
import Configuration from "./Configuration"
import Playground from "./Playground"
import Benefits from "./Benefits"

const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <Configuration />
      <Benefits />
      <LegacyGateway />
      <Features />
      <MoreFeatures />
      <Graph />
      {/* <Playground /> */}
      <Discover />
    </div>
  )
}

export default HomePage
