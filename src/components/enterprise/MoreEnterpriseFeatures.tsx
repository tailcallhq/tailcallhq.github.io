import {additionalEnterpriseFeatures} from "@site/src/constants"
import React from "react"

const MoreEnterpriseFeatures = () => {
  return (
    <section>
      <h4 className="text-display-tiny text-center mb-12">Additional enterprise features</h4>

      <div className="flex items-center gap-8 justify-center flex-wrap">
        {additionalEnterpriseFeatures.map((feature) => (
          <div
            className="flex items-center px-4 py-3 rounded w-fit space-x-4"
            style={{
              border: "1px solid #E5E5E5",
            }}
          >
            <feature.logo className="h-6 w-6" />
            <span className="text-title-tiny">{feature.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MoreEnterpriseFeatures
