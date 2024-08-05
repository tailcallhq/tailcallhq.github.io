import React from "react"
import Heading from "@theme/Heading"

import {Theme, moreFeatures} from "@site/src/constants"
import LinkButton from "../shared/LinkButton"
import {analyticsHandler} from "@site/src/utils"
import {pageLinks} from "@site/src/constants/routes"

type MoreFeaturesProps = {
  feature: MoreFeatures
}

const FeatureBox = ({feature}: MoreFeaturesProps) => {
  return (
    <div
      className=" text-tailCall-light-300 border-2 border-solid  
     border-tailCall-dark-300 flex items-center gap-x-SPACE_04 py-SPACE_03 px-SPACE_04 rounded-lg 
     shadow-[0px_3px_12px_0px_#000] lg:rounded-2xl lg:p-SPACE_06  "
    >
      <feature.logo className="w-SPACE_05 h-SPACE_05   lg:w-SPACE_06 lg:h-SPACE_06    " />
      <span className="mt-0">{feature.title}</span>
    </div>
  )
}

const MoreFeatures = (): JSX.Element => {
  return (
    <section className="w-full mb-SPACE_08 sm:mb-SPACE_20">
      <div className="max-w-7xl mx-SPACE_04 sm:mx-SPACE_10 lg:mx-auto   ">
        <div className="gap-SPACE_04  mt-SPACE_06 mb-SPACE_12 flex flex-wrap lg:justify-center lg:gap-x-SPACE_06 lg:gap-y-SPACE_08 lg:mt-SPACE_10">
          {moreFeatures.map((feature: MoreFeatures) => (
            <FeatureBox feature={feature} key={feature.id} />
          ))}
        </div>
      </div>

      <div className="hidden lg:flex justify-center">
        <LinkButton
          title="View More"
          onClick={() => analyticsHandler("Home Page", "Click", "View More")}
          href={pageLinks.enterprise}
          theme={Theme.Gray}
          width="large"
        />
      </div>
      <div className="lg:hidden flex justify-center">
        <LinkButton
          title="View More"
          onClick={() => analyticsHandler("Home Page", "Click", "View More")}
          href={pageLinks.enterprise}
          theme={Theme.Gray}
          width="medium"
        />
      </div>
    </section>
  )
}

export default MoreFeatures
