import React from "react"
import Marquee from "react-fast-marquee"

import GreaterThanUnderscoreIcon from "@site/static/icons/basic/gt-undescore-gray.svg"
import {partnerImages} from "@site/src/constants"

const Partners = () => {
  return (
    <section className="mt-8">
      <div className="text-content-small font-bold sm:text-title-small text-tailCall-light-500 text-center space-x-1">
        <GreaterThanUnderscoreIcon className="h-4 w-6" />
        <span>Our Cloud Partners</span>
      </div>
      <Marquee>
        <div className="hidden sm:flex space-x-16 mt-10 overflow-hidden">
          {partnerImages.map((partner) => (
            <div key={partner.id} className="h-20">
              <partner.Svg role="img" />
            </div>
          ))}
        </div>
      </Marquee>
      <div className="sm:hidden flex items-center justify-around flex-wrap mt-6 space-y-2">
        {partnerImages.map((partner) => (
          <div key={partner.id} className="h-20">
            <partner.Svg role="img" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Partners
