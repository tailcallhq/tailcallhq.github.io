import React from "react"

import {features} from "@site/src/constants"
import GreaterThanUnderscoreIcon from "@site/static/icons/basic/gt-underscore.svg"

type FeatureProps = {
  feature: {
    id: number
    logo: string
    title: string
    description1: string
    highlightedText: string
    description2: string
  }
}

const Feature = ({feature}: FeatureProps) => {
  return (
    <div key={feature.id} className="text-tailCall-dark-500 sm:max-w-6xl sm:m-10 lg:mx-auto lg:px-16 my-0 lg:my-20">
      <div className="flex items-center sm:space-x-2 sm:-ml-5 lg:-ml-10 mb-6">
        <GreaterThanUnderscoreIcon className="h-5 sm:h-7" />
        <h5 className="text-title-semi-large sm:text-display-tiny lg:text-display-small mb-0">{feature.title}</h5>
      </div>

      <div
        className="flex flex-col sm:flex-row p-4 sm:p-10  shadow-xl rounded-[20px] relative  sm:ml-0"
        style={{
          backgroundImage: `url(${require("@site/static/images/home/grid.jpg").default})`,
          boxShadow: "0px 0px 0px 3px #F3F4F7",
        }}
      >
        <div className="bg-gradient-to-b from-tailCall-light-100 from-3% via-[#E4E5E9] via-67% to-tailCall-light-100 absolute -left-4 sm:-left-6 w-[2px] h-full" />
        <p className="text-content-tiny sm:text-content-small lg:text-content-medium max-w-md">
          <span>{feature.description1}</span>
          <span className="text-content-tiny font-bold sm:text-title-tiny lg:text-title-small bg-tailCall-yellow rounded-[4px] sm:rounded-md px-1">
            {feature.highlightedText}
          </span>
          <span>{feature.description2}</span>
        </p>
        <div className="sm:mt-20">
          <img src={feature.logo} alt="" />
        </div>
      </div>
    </div>
  )
}

const Features = () => {
  return (
    <section className="space-y-12 mx-4 sm:space-y-16 lg:space-y-24 mb-24">
      {features.map((feature) => (
        <Feature feature={feature} key={feature.id} />
      ))}
    </section>
  )
}

export default Features
