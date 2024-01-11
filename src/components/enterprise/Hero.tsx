import React from "react"
import LinkButton from "../shared/LinkButton"
import {analyticsHandler} from "@site/src/utils"

const Hero = () => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center py-10 sm:py-14 lg:py-20 relative grid-bg-section">
      <h2 className="text-title-large sm:text-display-small lg:text-display-large text-center mb-10 max-w-[370px] sm:max-w-7xl">
        <div>Extend the power</div>
        <div>
          of <span className="bg-tailCall-yellow rounded-md sm:rounded-2xl px-2">GraphQL</span>
        </div>
        <div>to your organization.</div>
      </h2>
      <LinkButton
        title="Get in touch"
        theme="dark"
        href="/contact"
        onClick={() => analyticsHandler("Pricing", "Click", "Get in touch")}
      />
    </section>
  )
}

export default Hero
