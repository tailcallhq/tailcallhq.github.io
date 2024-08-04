import React from "react"

import Banner from "./Banner"
import Graph from "./Graph"
import Benefits from "./Benefits"
import Discover from "../shared/Discover"
import Configuration from "./Configuration"
import Playground from "./Playground"
import Testimonials from "./Testimonials"
import config, {TestimonialDisplay} from "@site/src/constants/config"
const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <Configuration />
      {config.testimonials !== TestimonialDisplay.Hide && <Testimonials />}
      <Benefits />
      <Graph />
      {/* <Playground /> */}
      <Discover />
    </div>
  )
}

export default HomePage
