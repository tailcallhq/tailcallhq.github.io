import React from "react"
import Heading from "@theme/Heading"

import SolutionGraphic from "@site/static/animations/solution-graphic.json"
import SectionTitle from "../shared/SectionTitle"
import LottieContainer from "./LottieContainer.tsxsrc/components/home/LottieContainer"

const LegacyGateway = (): JSX.Element => {
  return (
    <section className="w-full my-SPACE_12 lg:px-SPACE_16">
      <div className="max-w-7xl mx-SPACE_04 sm:m-SPACE_10 lg:mx-auto lg:my-SPACE_20">
        <SectionTitle title="The Problem" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-SPACE_10 lg:space-x-SPACE_20">
          <Heading
            as="h3"
            className="text-title-large sm:text-display-tiny lg:text-display-small text-tailCall-dark-500 min-w-fit"
          >
            Where traditional
            <br />
            <span className="bg-tailCall-yellow px-SPACE_02 rounded-md sm:rounded-2xl">gateways fail?</span>
          </Heading>

          <p className="text-content-tiny font-normal sm:text-content-small lg:text-content-medium text-tailCall-dark-500">
            A traditional API Gateway restricts operations to an API's route, method, or headers, and doesn't allow
            modifications to the request and response bodies. This limitation constrains the operations that can be
            performed on an API, ultimately compelling engineering teams to either intertwine orchestration logic with
            business logic or to develop and maintain a separate layer of abstraction such as BFF (backend for
            frontend).
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center px-0 mt-SPACE_07">
        <LottieContainer animationData={SolutionGraphic} loop className="bg-tailCall-dark-500 sm:bg-transparent" />
      </div>
    </section>
  )
}

export default LegacyGateway
