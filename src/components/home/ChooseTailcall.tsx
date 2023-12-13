import React from "react"
import {chooseTailcall} from "@site/src/constants"

const ChooseTailcall = () => {
  return (
    <>
      <p className="text-title-large max-w-lg sm:text-display-tiny lg:text-display-medium text-center sm:text-start my-14 sm:my-10">
        More reasons to chose tailcall.
      </p>
      <div className="flex flex-col lg:flex-row space-y-6 items-center justify-between lg:space-x-6 lg:space-y-0">
        {chooseTailcall.map((item) => (
          <div
            className="w-full lg:max-w-md rounded-3xl p-4"
            key={item.id}
            // TODO: Tailwind border not getting applied
            style={{
              border: "1px solid #2C2C2C",
            }}
          >
            <div className="h-16 w-16 sm:w-full sm:h-full">
              <item.image />
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
