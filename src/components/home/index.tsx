import React from "react"

import Banner from "./Banner"
import Graph from "./Graph"
import Benefits from "./Benefits"
import Discover from "../shared/Discover"
import Configuration from "./Configuration"
import Testimonials from "./Testimonials"
import Announcement from "../shared/Announcement"
import IntroductionVideo from "./IntroductionVideo"
const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <Configuration />
      <IntroductionVideo />
      <Testimonials />
      <Benefits />
      <Graph />
      {/* <Playground /> */}
      <Discover />
    </div>
  )
}

export default HomePage
