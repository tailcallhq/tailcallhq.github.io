import React, {lazy} from "react"

import Banner from "./Banner"
import LazyHomeSection from "./LazyHomeSection"

const Configuration = lazy(() => import("./Configuration"))
const IntroductionVideo = lazy(() => import("./IntroductionVideo"))
const Testimonials = lazy(() => import("./Testimonials"))
const Benefits = lazy(() => import("./Benefits"))
const Graph = lazy(() => import("./Graph"))
const Discover = lazy(() => import("../shared/Discover"))

const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <LazyHomeSection minHeight={760}>
        <Configuration />
      </LazyHomeSection>
      <LazyHomeSection minHeight={420}>
        <IntroductionVideo />
      </LazyHomeSection>
      <LazyHomeSection minHeight={860}>
        <Testimonials />
      </LazyHomeSection>
      <LazyHomeSection minHeight={760}>
        <Benefits />
      </LazyHomeSection>
      <LazyHomeSection minHeight={640}>
        <Graph />
      </LazyHomeSection>
      {/* <Playground /> */}
      <LazyHomeSection minHeight={240}>
        <Discover />
      </LazyHomeSection>
    </div>
  )
}

export default HomePage
