import React from "react"

import Banner from "./Banner"
import Features from "./Features"
import Graph from "./Graph"
import Benefits from "./Benefits"
import MoreFeatures from "./MoreFeatures"
import Partners from "./Partners"
import Discover from "../shared/Discover"
import Configuration from "./Configuration"
import Playground from "./Playground"
import Testimonials from "./Testimonials"

const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <Configuration />
      {process.env.TESTIMONIALS !== "OFF" && <Testimonials />}
      <Benefits />
      <Graph />
      {/* <Playground /> */}
      <Discover />
    </div>
  )
}

export default HomePage
