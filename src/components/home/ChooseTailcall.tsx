import React from "react"
import {chooseTailcall} from "@site/src/constants"

const ChooseTailcall = () => {
  return (
    <>
      <p className="text-title-large max-w-xs sm:text-display-medium text-center my-14 sm:my-10">
        More reasons to chose tailcall.
      </p>
      <div className="flex flex-col sm:flex-row space-y-6 items-center justify-between sm:space-x-6">
        {chooseTailcall.map((item) => (
          <div
            className="sm:max-w-md rounded-3xl p-4"
            // TODO: Tailwind border not getting applied
            style={{
              border: "1px solid #2C2C2C",
            }}
          >
            <div className="h-16 w-16 sm:w-full sm:h-full">
              <item.Image />
            </div>
            <br className="h-10 sm:hidden" />
            <p className="text-title-small sm:text-title-large mt-10 mb-2 sm:mb-0">{item.title}</p>
            <p className="text-content-tiny sm:text-content-small text-tailCall-light-600">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default ChooseTailcall
