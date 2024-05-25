import React from "react"
import LinkButton from "./LinkButton"
import {analyticsHandler} from "../../utils"
import {Theme} from "../../constants"
import {pageLinks} from "../../constants/routes"
import Image from "./Image"

const Discover = (): JSX.Element => {
  return (
    <section>
      <div className="bg-tailCall-yellow relative flex items-center justify-center h-[208px] sm:h-[452px]">
        <Image
          alt="decorative"
          className="sm:w-[90%] w-full absolute -bottom-36 sm:-bottom-28 lg:-bottom-SPA16"
          src="icons/basic/bg-tailcall.svg"
        />

        <div className="flex flex-col items-center absolute max-w-3xl space-y-SPACE_04 sm:space-y-SPACE_06">
          <h1 className="text-title-semi-large sm:text-display-medium text-center mb-0">
            Has this sparked your interest?
          </h1>

          <div className="flex space-x-SPACE_03 sm:space-x-SPACE_06">
            <LinkButton
              theme={Theme.Dark}
              title="Get in touch"
              href={pageLinks.contact}
              onClick={() => analyticsHandler("Discover", "Click", "Get in touch")}
            />
            <LinkButton
              theme={Theme.Light}
              title="Know More"
              href={pageLinks.introduction}
              onClick={() => analyticsHandler("Discover", "Click", "Know More")}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Discover
