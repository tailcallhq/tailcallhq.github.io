import React from "react"
import Marquee from "react-fast-marquee"

import GreaterThanUnderscoreIcon from "@site/static/icons/basic/gt-undescore-gray.svg"
import {partnerImages} from "@site/src/constants"
import Image from "../shared/Image"

const Partners = (): JSX.Element => {
  return (
    <section className="mt-SPACE_08">
      <div className="text-content-small font-bold sm:text-title-tiny lg:text-title-small text-tailCall-light-500 text-center space-x-1">
        <GreaterThanUnderscoreIcon className="h-4 w-6" />
        <span>Our Cloud Partners</span>
      </div>
      <Marquee autoFill>
        <div className="hidden sm:flex space-x-SPACE_16 mt-SPACE_10 overflow-hidden">
          {partnerImages.map((partner) => (
            <div key={partner.id} className="h-20">
              <Image src={partner.logo} loading="lazy" alt={partner.name} className="max-w-[152px]" />
            </div>
          ))}
        </div>
      </Marquee>
      <div className="sm:hidden flex items-center justify-around flex-wrap mt-SPACE_06 space-y-SPACE_02">
        {partnerImages.map((partner) => (
          <div key={partner.id} className="h-20">
            <Image src={partner.logo} loading="lazy" alt={partner.name} className="max-w-[152px]" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Partners
