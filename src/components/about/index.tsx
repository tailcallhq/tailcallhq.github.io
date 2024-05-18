import React from "react"
import Hero from "./Hero"
import WhoWeAre from "./WhoWeAre"
import Founders from "./Founders"
// import Investors from "./Investors"
import SocialBuzz from "./SocialBuzz"
import Discover from "../shared/Discover"

const AboutPage = (): JSX.Element => {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Founders />
      <div className="grid-bg-section">
        {/* <Investors /> */}
        <SocialBuzz />
      </div>
      <Discover />
    </>
  )
}

export default AboutPage
