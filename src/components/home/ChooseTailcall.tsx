import React from "react"
import {chooseTailcall} from "@site/src/constants"
import MoreFeatures from "./MoreFeatures"
import Heading from "@theme/Heading"

//text-title-large max-w-lg mx-auto
//lg:text-display-medium

const ChooseTailcall = (): JSX.Element => {
  return (
    <>
      <p className=" text-title-large text-center mt-SPACE_14 mb-SPACE_08 lg:text-display-medium lg:mt-[172px] lg:mb-SPACE_16">
        More reasons to <span className="block lg:inline"> choose tailcall</span>
      </p>

      <div className="flex flex-col lg:flex-row space-y-SPACE_06 items-center justify-between lg:space-x-SPACE_06 lg:space-y-0">
        {chooseTailcall.map((item) => (
          <div
            className="border border-solid border-tailCall-border-dark-300 w-full lg:min-h-[358px] lg:max-w-md rounded-3xl p-SPACE_04 flex flex-col items-start justify-between"
            key={item.id}
          >
            <div className="h-16 w-16 sm:w-full sm:h-full">
              <img src={item.image} alt="Image Describing Why Tailcall" className="max-w-[72px] sm:max-w-[110px]" />
            </div>

            <div>
              <p className="text-title-small sm:text-title-large mt-SPACE_10 mb-SPACE_02 sm:mb-0">{item.title}</p>
              <p className="text-content-tiny sm:text-content-small text-tailCall-light-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <MoreFeatures />
    </>
  )
}

export default ChooseTailcall
