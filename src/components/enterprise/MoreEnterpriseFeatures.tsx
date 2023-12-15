import React from "react"

import {additionalEnterpriseFeatures} from "@site/src/constants"
import CheckCircle from "@site/static/icons/basic/check-circle-broken.svg"
import Grid from "@site/static/icons/basic/more-feat-grid.svg"

const MoreEnterpriseFeatures = () => {
  return (
    <section
      className="flex items-center justify-center px-40 relative"
      style={{
        border: "1px solid #E5E5E5",
      }}
    >
      <div className="w-full h-full">
        <Grid className="absolute inset-0 h-full" />
        <h4 className="text-title-large  text-center mb-6 sm:mb-12 h-full w-full">Additional enterprise features</h4>
      </div>

      <div
        className="flex items-start justify-start gap-4 flex-wrap pl-10 py-10"
        style={{
          borderLeft: "1px solid #E5E5E5",
        }}
      >
        {additionalEnterpriseFeatures.map((feature) => (
          <div
            className="flex items-center px-4 py-3 rounded w-fit space-x-4"
            style={{
              border: "1px solid #E5E5E5",
            }}
            key={feature.id}
          >
            <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6" />
            <span className="text-title-tiny">{feature.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MoreEnterpriseFeatures
