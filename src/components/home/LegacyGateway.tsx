import React from "react"

import Lottie from "lottie-react"
import SolutionGraphic from "@site/static/animations/solution-graphic.json"
import SectionTitle from "../shared/SectionTitle"

const LegacyGateway = () => {
  return (
    <section className="w-full my-SPACE_12 lg:px-SPACE_16">
      <div className="max-w-7xl mx-SPACE_04 sm:m-SPACE_10 lg:mx-auto lg:my-SPACE_20">
        <SectionTitle title="The Problem" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-SPACE_10 lg:space-x-SPACE_20">
          <h3 className="text-title-large sm:text-display-tiny lg:text-display-small text-tailCall-dark-500 min-w-fit">
            Where legacy
            <br />
            <span className="bg-tailCall-yellow px-SPACE_02 rounded-md sm:rounded-2xl">gateways fail?</span>
          </h3>

          <p className="text-content-tiny font-normal sm:text-content-small lg:text-content-medium text-tailCall-dark-500">
            A legacy gateway limits operations to the API's route, method, or headers, leaving request and response
            bodies unaffected. Even on an enterprise plan, people are forced to write their own BFF solution or an API
            Orchestration Layer.
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center px-0 mt-SPACE_07">
        <Lottie
          animationData={SolutionGraphic}
          loop
          className="scale-[1.12] sm:scale-100 bg-tailCall-dark-500 sm:bg-transparent"
        />
      </div>
    </section>
  )
}

export default LegacyGateway
