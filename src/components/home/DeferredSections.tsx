import React from "react"

import Benefits from "./Benefits"
import Configuration from "./Configuration"
import Discover from "../shared/Discover"
import Graph from "./Graph"
import IntroductionVideo from "./IntroductionVideo"
import Testimonials from "./Testimonials"

const DeferredSections = (): JSX.Element => {
  return (
    <>
      <Configuration />
      <IntroductionVideo />
      <Testimonials />
      <Benefits />
      <Graph />
      <Discover />
    </>
  )
}

export default DeferredSections
