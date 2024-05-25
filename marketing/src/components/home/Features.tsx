import React from "react"
import Image from "../shared/Image"
import {features} from "../../constants"

type FeatureProps = {
  feature: Feature
}

const Feature = ({feature}: FeatureProps): JSX.Element => {
  return (
    <div className="text-tailCall-dark-500 sm:max-w-6xl sm:m-SPACE_10 lg:mx-auto lg:px-SPACE_016 my-0 lg:my-SPACE_20">
      <div className="flex items-center sm:space-x-SPACE_02 sm:-ml-SPACE_05 lg:-ml-SPACE_10 mb-SPACE_06 ml-4 md:ml-0">
        <Image alt="feature icon" className="h-5 sm:h-7" src="icons/basic/gt-underscore.svg" />
        <h1 className="text-title-semi-large sm:text-display-tiny lg:text-display-small mb-0">{feature.title}</h1>
      </div>

      <div
        className="flex flex-col sm:flex-row p-SPACE_04 sm:p-SPACE_16  shadow-xl rounded-[20px] relative  sm:ml-0"
        style={{
          backgroundImage: `url("images/home/grid.jpg")`,
          boxShadow: "0px 0px 0px 3px var(--ifm-color-brand-light-100)",
        }}
      >
        <div className="bg-gradient-to-b from-tailCall-light-100 from-3% via-[#E4E5E9] via-67% to-tailCall-light-100 absolute -left-SPACE_04 sm:-left-SPACE_06 w-[2px] h-full" />
        <p className="text-content-tiny sm:text-content-small lg:text-content-medium max-w-md">
          <span>{feature.content}</span>
        </p>
        <div className="sm:mt-SPACE_20">
          <Image src={feature.logo} alt="" />
        </div>
      </div>
    </div>
  )
}

const Features = () => {
  return (
    <section className="space-y-SPACE_12 mx-SPACE_04 sm:space-y-SPACE_16 lg:space-y-24 mb-24">
      {features.map((feature, id) => (
        <Feature feature={feature} key={id} />
      ))}
    </section>
  )
}

export default Features
