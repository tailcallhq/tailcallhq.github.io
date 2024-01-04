import React from "react"

import BgTailcall from "@site/static/icons/basic/bg-tailcall.svg"
import Button from "./Button"
import {analyticsHandler} from "@site/src/utils"

const Discover = () => {
  return (
    <section>
      <div className="bg-tailCall-yellow relative flex items-center justify-center h-[208px] sm:h-[452px]">
        <BgTailcall className="sm:w-[90%] w-full absolute -bottom-36 sm:-bottom-28 lg:-bottom-16" />

        <div className="flex flex-col items-center absolute max-w-3xl space-y-4 sm:space-y-6">
          <h5 className="text-title-semi-large sm:text-display-medium text-center mb-0">
            Discover the power of enterprise solution.
          </h5>

          <div className="flex space-x-3 sm:space-x-6">
            <Button
              theme="dark"
              title="Get in touch"
              href="/contact"
              onClick={() => analyticsHandler("Discover", "Click", "Get in touch")}
            />
            <Button
              theme="light"
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
