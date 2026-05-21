import React from "react"

import Banner from "./Banner"
import LazyHomeSection from "./LazyHomeSection"

const Configuration = React.lazy(() => import("./Configuration"))
const IntroductionVideo = React.lazy(() => import("./IntroductionVideo"))
const Testimonials = React.lazy(() => import("./Testimonials"))
const Benefits = React.lazy(() => import("./Benefits"))
const Graph = React.lazy(() => import("./Graph"))
const Discover = React.lazy(() => import("../shared/Discover"))

const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <LazyHomeSection minHeight="40rem">
        <Configuration />
      </LazyHomeSection>
      <LazyHomeSection minHeight="28rem">
        <IntroductionVideo />
      </LazyHomeSection>
      <LazyHomeSection minHeight="32rem">
        <Testimonials />
      </LazyHomeSection>
      <LazyHomeSection minHeight="32rem">
        <Benefits />
      </LazyHomeSection>
      <LazyHomeSection minHeight="52rem">
        <Graph />
      </LazyHomeSection>
      {/* <Playground /> */}
      <LazyHomeSection minHeight="24rem">
        <Discover />
      </LazyHomeSection>
    </div>
  )
}

export default HomePage
