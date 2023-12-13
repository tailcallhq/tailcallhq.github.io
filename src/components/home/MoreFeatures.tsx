import React from "react"

import {moreFeatures} from "@site/src/constants"
import Button from "../shared/Button"

const FeatureBox = ({feature}) => {
  return (
    <div
      style={{
        borderBottom: "1px solid #E4E4E4",
      }}
      className="flex flex-col sm:flex-row items-start justify-start sm:items-center text-start my-2 space-y-2 pb-2 sm:space-x-4 text-content-tiny font-bold sm:text-title-medium text-tailCall-dark-500  sm:h-32 w-full border border-tailCall-dark-300"
    >
      <feature.logo className="w-6 h-6 sm:w-8 sm:h-8" />
      <span>{feature.title}</span>
    </div>
  )
}

const MoreFeatures = () => {
  return (
    <section className="w-full mb-8 sm:mb-20">
      <div className="max-w-7xl mx-4 sm:mx-auto text-center">
        <h5 className="text-title-semi-large sm:text-display-small text-tailCall-dark-500">There’s so much more.</h5>
        <div className="grid grid-cols-2 my-4 sm:my-16 gap-x-6 sm:gap-x-10">
          {moreFeatures.map((feature) => (
            <FeatureBox feature={feature} key={feature.id} />
          ))}
        </div>
        <Button title="View More" href="/" theme="light" width="500px" />
      </div>
    </section>
  )
}

export default MoreFeatures
