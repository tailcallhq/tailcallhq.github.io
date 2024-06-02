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
            REST APIs are <br />
            <span className="bg-tailCall-yellow px-SPACE_02 rounded-md sm:rounded-2xl">not composable</span> <br />
          </Heading>

          <p className="text-content-tiny font-normal sm:text-content-small lg:text-content-medium text-tailCall-dark-500">
            API composition is pivotal for building rich user experiences, but REST APIs are not inherently composable,
            often leading to awkward, unmaintainable hand-written Backend for Frontends. On the other hand, GraphQL is a
            highly composable protocol, giving clients the power to express exactly what they need, and Tailcall makes
            GraphQL easy, secure, and fast.
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
