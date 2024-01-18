import React from "react"
import Heading from "@theme/Heading"

import LinkButton from "../shared/LinkButton"
import {analyticsHandler} from "@site/src/utils"
import {Theme} from "@site/src/constants"
import {pageLinks} from "@site/src/constants/routes"

const Hero = (): JSX.Element => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center py-SPACE_10 sm:py-SPACE_14 lg:py-SPACE_20 relative grid-bg-section">
      <Heading
        as="h2"
        className="text-title-large sm:text-display-small lg:text-display-large text-center mb-SPACE_10 max-w-[370px] sm:max-w-7xl"
      >
        <div>Extend the power</div>
        <div>
          of <span className="bg-tailCall-yellow rounded-md sm:rounded-2xl px-SPACE_02">GraphQL</span>
        </div>
        <div>to your organization.</div>
      </Heading>
      <LinkButton
        title="Get in touch"
        theme={Theme.Dark}
        href={pageLinks.contact}
        onClick={() => analyticsHandler("Pricing", "Click", "Get in touch")}
      />
    </section>
  )
}

export default Hero
