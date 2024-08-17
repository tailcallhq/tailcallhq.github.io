import React from "react"
import Marquee from "react-fast-marquee"

import GreaterThanUnderscoreIcon from "@site/static/icons/basic/gt-undescore-gray.svg"
import {partnerImages} from "@site/src/constants"

const Partners = (): JSX.Element => {
  const handleClick = () => {
    window.open("/docs/deploy-graphql-github-actions/", "_blank")
  }

  return (
    <section className="md:mt-SPACE_16 mt-space_08 cursor-pointer" onClick={handleClick}>
      <div className="text-content-small font-bold sm:text-title-tiny lg:text-title-small text-tailCall-light-500 text-center space-x-1">
        <GreaterThanUnderscoreIcon className="h-4 w-6" />
        <span>Deploy Anywhere</span>
      </div>
      <Marquee autoFill>
        <div className="hidden sm:flex space-x-SPACE_16 mt-SPACE_10 overflow-hidden">
          {partnerImages.map((partner, index) => (
            <div key={index} className="h-20">
              <img src={partner.logo} alt={partner.name} className="max-w-[152px]" />
            </div>
          ))}
        </div>
      </Marquee>
      <div className="sm:hidden flex items-center justify-around flex-wrap mt-SPACE_06 space-y-SPACE_02">
        {partnerImages.map((partner, index) => (
          <div key={index} className="h-20">
            <img src={partner.logo} alt={partner.name} className="max-w-[152px]" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Partners
