import React from "react"
import Heading from "@theme/Heading"

import {Theme, moreFeatures} from "@site/src/constants"
import LinkButton from "../shared/LinkButton"
import {analyticsHandler} from "@site/src/utils"
import {pageLinks} from "@site/src/constants/routes"

//#232426 -icon color
//#CECECF link border color
//text-tailCall-light-300 , border-tailCall-border-light-200 mt-6

type MoreFeaturesProps = {
  feature: MoreFeatures
}

const FeatureBox = ({feature}: MoreFeaturesProps) => {
  return (
    <div className=" border-solid  border-tailCall-border-dark-300 flex gap-x-4 mb-4  py-3 px-4  rounded-lg     ">
      <feature.logo className="  w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8    " />

      <span className="mt-0">{feature.title}</span>
    </div>
  )
}

const MoreFeatures = (): JSX.Element => {
  return (
    <section className="w-full  mb-SPACE_08 sm:mb-SPACE_20   ">
      <div className="max-w-7xl mx-SPACE_04 sm:mx-SPACE_10 lg:mx-auto  ">
        <div className=" p-x-16 p-y-12 pt-2  flex flex-wrap gap-x-4  mt-6  ">
          {moreFeatures.map((feature: MoreFeatures) => (
            <FeatureBox feature={feature} key={feature.id} />
          ))}
        </div>
        {/* <div className="sm:hidden">
          <LinkButton
            title="View More"
            onClick={() => analyticsHandler("Home Page", "Click", "View More")}
            //  href={pageLinks.enterprise}
            theme={Theme.Light}
            width="medium"
          />
        </div> */}
        <div className=" lg-hidden mt-[48px] flex justify-center  border-solid border-tailCall-border-light-300 rounded-lg  mx-8 ">
          <LinkButton
            title="View More"
            onClick={() => analyticsHandler("Home Page", "Click", "View More")}
            //  href={pageLinks.enterprise}
            theme={Theme.Dark}
            width="medium"
          />
        </div>
      </div>
    </section>
  )
}

export default MoreFeatures
