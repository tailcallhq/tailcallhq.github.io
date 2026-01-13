import React from "react"
import Heading from "@theme/Heading"

import {additionalEnterpriseFeatures} from "@site/src/constants"
import CheckCircle from "@site/static/icons/basic/check-circle-broken.svg"

const MoreEnterpriseFeatures = (): JSX.Element => {
  return (
    <section className="border border-solid border-tailCall-border-light-300 flex flex-col sm:flex-row items-center justify-center sm:px-SPACE_10 lg:px-40 relative overflow-hidden">
      <div className="w-full h-full p-SPACE_04 sm:py-0 sm:pr-SPACE_10">
        <img
          src={require("@site/static/icons/basic/more-feat-grid.png").default}
          alt="More Features"
          className="absolute inset-0 h-full w-full sm:w-[47vw] -z-10"
        />
        <Heading as="h4" className="text-title-semi-large sm:text-title-large text-center h-full w-full mb-0">
          Additional enterprise features
        </Heading>
      </div>

      <div className="border-l border-tailCall-border-light-300 flex items-start justify-start gap-SPACE_04 flex-wrap p-SPACE_04 overflow-x-auto h-full max-w-screen-md sm:pl-SPACE_10 sm:py-SPACE_10">
        {additionalEnterpriseFeatures.map((feature) => (
          <div
            className="min-w-[150px] border border-solid border-tailCall-border-light-300 flex items-center p-SPACE_02 sm:px-SPACE_04 sm:py-SPACE_03 rounded w-fit space-x-SPACE_02 sm:space-x-SPACE_04"
            key={feature.id}
          >
            <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6" />
            <span className="text-content-small font-bold sm:text-title-tiny">{feature.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MoreEnterpriseFeatures
