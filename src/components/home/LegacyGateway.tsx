import React from "react"

import GreaterThanUnderscoreIcon from "@site/static/icons/basic/gt-undescore-gray.svg"
import ApiImage from "@site/static/images/home/work-with-api.jpg"
import ApiImageMobile from "@site/static/images/home/work-with-api-mobile.png"

const LegacyGateway = () => {
  return (
    <section className="w-full my-12">
      <div className="max-w-7xl mx-7 sm:mx-auto sm:my-20">
        <div className="text-content-tiny sm:text-title-tiny text-tailCall-light-500 space-x-1">
          <GreaterThanUnderscoreIcon className="h-3 sm:h-4 w-6" />
          <span>The Problem</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-20">
          <h3 className="text-title-large sm:text-display-small text-tailCall-dark-500 min-w-fit">
            Where legacy
            <br />
            <span className="bg-tailCall-yellow px-2 rounded-md sm:rounded-2xl">gateways fail?</span>
          </h3>

          <p className="text-content-tiny font-normal sm:text-content-medium text-tailCall-dark-500">
            A legacy gateway limits operations to the API's route, method, or headers, leaving request and response
            bodies unaffected. Even on an enterprise plan, people are forced to write their own BFF solution or an API
            Orchestration Layer.
          </p>
        </div>
      </div>

      <div className="hidden w-full sm:flex items-center justify-center">
        <img src={ApiImage} alt="work with api" className="object-contain rounded-[40px]" />
      </div>

      <div className="sm:hidden w-full flex items-center justify-center">
        <img src={ApiImageMobile} alt="work with api" className="object-contain rounded-xl" />
      </div>
    </section>
  )
}

export default LegacyGateway
