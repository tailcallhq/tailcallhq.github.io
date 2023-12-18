import React from "react"

import Lottie from "lottie-react"
import SolutionGraphic from "@site/static/animations/solution-graphic.json"
import SectionTitle from "../shared/SectionTitle"

const LegacyGateway = () => {
  return (
    <section className="w-full my-12">
      <div className="max-w-7xl mx-4 sm:m-10 lg:mx-auto lg:my-20">
        <SectionTitle title="The Problem" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-10 lg:space-x-20">
          <h3 className="text-title-large sm:text-display-tiny lg:text-display-small text-tailCall-dark-500 min-w-fit">
            Where legacy
            <br />
            <span className="bg-tailCall-yellow px-2 rounded-md sm:rounded-2xl">gateways fail?</span>
          </h3>

          <p className="text-content-tiny font-normal sm:text-content-small lg:text-content-medium text-tailCall-dark-500">
            A legacy gateway limits operations to the API's route, method, or headers, leaving request and response
            bodies unaffected. Even on an enterprise plan, people are forced to write their own BFF solution or an API
            Orchestration Layer.
          </p>
        </div>
      </div>

      <div className="hidden w-full sm:flex items-center justify-center rounded-[40px] px-6">
        <Lottie
          animationData={SolutionGraphic}
          loop={true}
          className="rounded-[40px] max-w-7xl"
          style={{
            borderRadius: "40px",
          }}
        />
      </div>

      <div className="sm:hidden w-full flex items-center justify-center">
        <Lottie
          animationData={SolutionGraphic}
          loop={true}
          className="rounded-[40px] max-w-7xl"
          style={{
            borderRadius: "40px",
          }}
        />
      </div>
    </section>
  )
}

export default LegacyGateway
