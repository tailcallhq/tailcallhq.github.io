import React from "react"
import Heading from "@theme/Heading"
import SectionTitle from "../shared/SectionTitle"
import Partners from "./Partners"
import {benefits} from "@site/src/constants"
import {ArrowRight} from "lucide-react"

type BenefitProp = {
  benefit: Benefit
}
const Benefit = ({benefit}: BenefitProp): JSX.Element => {
  return (
    <div className="group lg:basis-[calc(50%-24px)] border border-solid bg-tailCall-dark-400 z-20 border-tailCall-border-dark-300 hover:border-tailCall-yellow hover:shadow-[0_14px_24px_0_rgba(250,234,90,0.1)] w-full rounded-3xl p-SPACE_04 lg:p-SPACE_08 flex flex-col lg:flex-row gap-y-SPACE_04 gap-x-SPACE_08">
      {/* Image container */}
      <div>
        <img
          src={benefit.image}
          alt={`Image Describing ${benefit.title}`}
          className="max-w-[48px] lg:max-w-[72px] aspect-square"
        />
      </div>

      {/* Text content */}
      <div className="space-y-SPACE_02 lg:space-y-SPACE_04">
        <div className="flex gap-x-SPACE_02 lg:gap-x-SPACE_06 items-center">
          <p className="text-title-small sm:text-title-large mb-0">{benefit.title}</p>
          <ArrowRight className="group-hover:text-tailCall-light-100 text-tailCall-light-600" />
        </div>
        <p className="text-content-tiny sm:text-content-small text-tailCall-light-600">{benefit.description}</p>
      </div>
    </div>
  )
}
const Benefits = (): JSX.Element => {
  return (
    <section className="bg-tailCall-dark-400 w-full relative lg:px-SPACE_16 text-tailCall-light-100 py-4 sm:py-10 lg:py-16 overflow-hidden">
      {/* Background image */}
      <img src={require("@site/static/images/home/grid-dark.png").default} alt="" className="absolute h-full" />

      {/* Container for section content */}
      <div className="max-w-7xl space-y-SPACE_04 md:space-y-SPACE_10 lg:space-y-SPACE_20 mx-SPACE_04 sm:m-SPACE_10 lg:mx-auto lg:my-SPACE_20">
        <div>
          {/* Section title */}
          <SectionTitle title="Benefits" />

          {/* Main heading */}
          <Heading as="h5" className="text-title-large sm:text-display-tiny lg:text-display-medium">
            Tailcall gives you a <br /> best-practice GraphQL backend <br /> that checks all the boxes.
          </Heading>
        </div>

        {/* Flex container for benefit items */}
        <div className="flex flex-wrap justify-center gap-SPACE_06">
          {benefits.map((benefit) => (
            <Benefit benefit={benefit} />
          ))}
        </div>
      </div>

      {/* Partners component */}
      <Partners />
    </section>
  )
}

export default Benefits
