import React from "react"

import {additionalEnterpriseFeatures} from "@site/src/constants"
import CheckCircle from "@site/static/icons/basic/check-circle-broken.svg"

const MoreEnterpriseFeatures = () => {
  return (
    <section
      className="flex flex-col sm:flex-row items-center justify-center sm:px-10 lg:px-40 relative overflow-hidden"
      style={{
        border: "1px solid var(--ifm-color-gray-500)",
      }}
    >
      <div className="w-full h-full p-4 sm:py-0 sm:pr-10">
        <img
          src={require("@site/static/icons/basic/more-feat-grid.png").default}
          alt=""
          className="absolute inset-0 h-full w-full sm:w-[47vw] -z-10"
        />
        <h4 className="text-title-semi-large sm:text-title-large text-center h-full w-full mb-0">
          Additional enterprise features
        </h4>
      </div>

      <div
        className="flex items-start justify-start gap-4 flex-wrap p-4 overflow-x-auto h-full max-w-screen-md sm:pl-10 sm:py-10"
        style={{
          borderLeft: "1px solid var(--ifm-color-gray-500)",
        }}
      >
        {additionalEnterpriseFeatures.map((feature) => (
          <div
            className="flex items-center p-2 sm:px-4 sm:py-3 rounded w-fit space-x-2 sm:space-x-4"
            style={{
              border: "1px solid var(--ifm-color-gray-500)",
              minWidth: "150px",
            }}
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
