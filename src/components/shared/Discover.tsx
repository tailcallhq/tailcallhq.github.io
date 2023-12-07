import React from "react"

import BgTailcall from "@site/static/icons/basic/bg-tailcall.svg"
import Button from "./Button"

const Discover = () => {
  return (
    <section>
      <div className="bg-tailCall-yellow relative flex items-center justify-center h-[208px] sm:h-full">
        <div className="sm:h-full text-center mt-28 sm:mt-0">
          <BgTailcall className="sm:w-[90%] w-full" />
        </div>

        <div className="flex flex-col items-center absolute max-w-2xl space-y-4 sm:space-y-6">
          <h5 className="text-title-semi-large sm:text-display-medium text-center mb-0">
            Discover the power of enterprise solution.
          </h5>

          <div className="flex space-x-3 sm:space-x-6">
            <Button theme="dark" title="Get in touch" onClick={() => {}} />
            <Button theme="light" title="Know More" onClick={() => {}} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Discover
