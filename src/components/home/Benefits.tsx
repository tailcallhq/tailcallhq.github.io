import React from "react"
import Heading from "@theme/Heading"
import SectionTitle from "../shared/SectionTitle"
import Partners from "./Partners"
import BenefitsCard from "./BenefitsCard"

const Benefits = (): JSX.Element => {
  return (
    <section className="w-full pt-20 p-6 md:pb-20  lg:px-SPACE_16 bg-[#1C1D1F] grid-background">
      <div className="sm:max-w-7xl mx-SPACE_04 sm:mx-SPACE_10 lg:mx-auto  py-SPACE_08 sm:py-SPACE_20">
        <div>
          <SectionTitle title="Benefits" />
          <div className=" h-fit sm:flex-row sm:items-center sm:space-x-SPACE_10 lg:space-x-SPACE_20">
            <Heading
              as="h3"
              className="text-title-large sm:text-display-tiny lg:text-display-small text-white md:w-[65%]"
            >
              Tailcall gives you a best-practice GraphQL backend that checks all the boxes.
            </Heading>
          </div>
        </div>
        <BenefitsCard />
        <Partners />
      </div>
    </section>
  )
}

export default Benefits
