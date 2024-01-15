import React from "react"

import BgTailcall from "@site/static/icons/basic/bg-tailcall.svg"
import LinkButton from "./LinkButton"
import {analyticsHandler} from "@site/src/utils"
import {Theme} from "@site/src/constants"

const Discover = () => {
  return (
    <section>
      <div className="bg-tailCall-yellow relative flex items-center justify-center h-[208px] sm:h-[452px]">
        <BgTailcall className="sm:w-[90%] w-full absolute -bottom-36 sm:-bottom-28 lg:-bottom-SPA16" />

        <div className="flex flex-col items-center absolute max-w-3xl space-y-SPACE_04 sm:space-y-SPACE_06">
          <h5 className="text-title-semi-large sm:text-display-medium text-center mb-0">
            Discover the power of enterprise solution.
          </h5>

          <div className="flex space-x-SPACE_03 sm:space-x-SPACE_06">
            <LinkButton
              theme={Theme.Dark}
              title="Get in touch"
              href="/contact"
              onClick={() => analyticsHandler("Discover", "Click", "Get in touch")}
            />
            <LinkButton
              theme={Theme.Light}
              title="Know More"
              href="/docs"
              onClick={() => analyticsHandler("Discover", "Click", "Know More")}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Discover
