import React from "react"
import Heading from "@theme/Heading"

import SolutionGraphic from "@site/static/animations/solution-graphic.json"
import SectionTitle from "../shared/SectionTitle"
import LottieContainer from "./LottieContainer.tsxsrc/components/home/LottieContainer"
import { benefits } from "@site/src/constants"
import Partners from "./Partners"
import { ArrowBigRight, ArrowRight } from "lucide-react"

const LegacyGateway = (): JSX.Element => {
  return (
    <section className="w-full md:pt-20 p-10 lg:px-SPACE_16 bg-[#1C1D1F] grid-background">
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
      <div className="flex w-[100%] flex-wrap items-center justify-center">
        {benefits.map((item) => (
          <div
            className="group border border-solid border-tailCall-border-dark-300 md:w-[40%]  rounded-3xl md:px-10 px-4 py-2 md:flex items-center justify-between md:m-4 mb-10 hover:border-[#FDEA2E]"
            key={item.id}
          >
            <div className="h-16 w-16 sm:w-full sm:h-full">
              <img src={item.image} alt="Image Describing Why Tailcall" className="max-w-[72px] sm:max-w-[110px]" />
            </div>
            <div>
              <p className="text-title-small text-white sm:text-title-large mt-SPACE_04 mb-SPACE_02 sm:mb-0">{item.title} <span className="h-16 w-16 md:text-gray-400 group-hover:text-white"><ArrowRight/></span></p>
              <p className="text-content-tiny sm:text-content-small text-tailCall-light-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Partners/>
    </section>
  )
}

export default LegacyGateway
