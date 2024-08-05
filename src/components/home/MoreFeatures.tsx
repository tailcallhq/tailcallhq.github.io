import React from "react"
import Heading from "@theme/Heading"

import {Theme, moreFeatures} from "@site/src/constants"
import LinkButton from "../shared/LinkButton"
import {analyticsHandler} from "@site/src/utils"
import {pageLinks} from "@site/src/constants/routes"

//#232426 -icon color
//#CECECF link border color
//text-tailCall-light-300 , border-tailCall-border-light-200 mt-6
//shadow-[0px_3px_12px_0px_#000]

type MoreFeaturesProps = {
  feature: MoreFeatures
}

const FeatureBox = ({feature}: MoreFeaturesProps) => {
  return (
    <div
      className=" text-tailCall-light-300 border-2  border-solid  
     border-tailCall-dark-300 flex items-center gap-x-SPACE_04  py-SPACE_03 px-SPACE_04 rounded-lg shadow-[0px_3px_10px_0px_#000]   lg:rounded-SPACE_4 lg:text-title-tiny  lg:p-[17px]  "
    >
      <feature.logo className="   w-SPACE_05 h-SPACE_05   lg:w-6 lg:h-6    " />

      <span className="mt-0">{feature.title}</span>
    </div>
  )
}

const MoreFeatures = (): JSX.Element => {
  return (
    <section className="w-full  mb-SPACE_08 sm:mb-SPACE_20   ">
      <div className="max-w-7xl mx-SPACE_04 sm:mx-SPACE_10 lg:mx-auto   ">
        <div className="  gap-SPACE_04  mt-SPACE_06 mb-SPACE_12  flex flex-wrap lg:justify-center  lg:gap-x-6 lg:gap-y-6     ">
          {moreFeatures.map((feature: MoreFeatures) => (
            <FeatureBox feature={feature} key={feature.id} />
          ))}
        </div>
      </div>

      <div className="hidden lg:flex flex justify-center     ">
        <LinkButton
          title="View More"
          onClick={() => analyticsHandler("Home Page", "Click", "View More")}
          href={pageLinks.enterprise}
          theme={Theme.Gray}
          width="large"
        />
      </div>
      <div className=" lg:hidden  flex justify-center ">
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
