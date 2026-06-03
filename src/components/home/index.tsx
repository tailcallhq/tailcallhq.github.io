import React from "react"

import Banner from "./Banner"
import Graph from "./Graph"
import Benefits from "./Benefits"
import Discover from "../shared/Discover"
import Configuration from "./Configuration"
import Testimonials from "./Testimonials"
import Announcement from "../shared/Announcement"
import IntroductionVideo from "./IntroductionVideo"
import LazyHomeSection from "./LazyHomeSection"
const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <LazyHomeSection minHeight={560}>
        <Configuration />
      </LazyHomeSection>
      <LazyHomeSection minHeight={360}>
        <IntroductionVideo />
      </LazyHomeSection>
      <LazyHomeSection minHeight={520}>
        <Testimonials />
      </LazyHomeSection>
      <LazyHomeSection minHeight={520}>
        <Benefits />
      </LazyHomeSection>
      <LazyHomeSection minHeight={680}>
        <Graph />
      </LazyHomeSection>
      {/* <Playground /> */}
      <LazyHomeSection minHeight={208}>
        <Discover />
      </LazyHomeSection>
    </div>
  )
}

export default HomePage
