import React from "react"

import Banner from "./Banner"
import Configuration from "./Configuration"
import IntroductionVideo from "./IntroductionVideo"
import LazyHomeSection from "./LazyHomeSection"

const loadTestimonials = () => import("./Testimonials")
const loadBenefits = () => import("./Benefits")
const loadGraph = () => import("./Graph")
const loadDiscover = () => import("../shared/Discover")

const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Banner />
      <Configuration />
      <IntroductionVideo />
      <LazyHomeSection load={loadTestimonials} minHeight={640} />
      <LazyHomeSection load={loadBenefits} minHeight={760} />
      <LazyHomeSection load={loadGraph} minHeight={840} />
      {/* <Playground /> */}
      <LazyHomeSection load={loadDiscover} minHeight={240} />
    </div>
  )
}

export default HomePage
