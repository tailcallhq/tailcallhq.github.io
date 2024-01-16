import React from "react"
import {investors} from "@site/src/constants"

const Investors = (): JSX.Element => {
  return (
    <section className="h-full w-full relative">
      <p className="pt-SPACE_04 text-title-semi-large sm:text-title-large lg:text-display-tiny text-center w-full px-SPACE_04 sm:mx-0 sm:mt-SPACE_09">
        We are backed by <span className="bg-tailCall-yellow rounded-lg px-SPACE_02">incredible investors.</span>
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-SPACE_06 sm:space-y-0 sm:space-x-SPACE_10 mt-SPACE_06 sm:mt-SPACE_09">
        <div
          className="flex items-center justify-center rounded-xl sm:rounded-2xl p-SPACE_05 sm:p-SPACE_10 shadow-lg w-52 h-28 sm:w-80 sm:h-40 bg-tailCall-light-100"
          style={{
            border: "1px solid var(--ifm-color-brand-light-500)",
          }}
        >
          <img
            src={require("@site/static/images/about/peakxv.png").default}
            srcSet={`
            ${require("@site/static/images/about/peakxv.png").default} 1x,
            ${require("@site/static/images/about/peakxv-2x.png").default} 2x
            `}
            alt="peak xv"
            className="h-full w-full object-contain"
          />
        </div>
        <div
          className="flex items-center justify-center rounded-xl sm:rounded-2xl p-SPACE_05 sm:p-SPACE_10 shadow-lg w-52 h-28 sm:w-80 sm:h-40 bg-tailCall-light-100"
          style={{
            border: "1px solid var(--ifm-color-brand-light-500)",
          }}
        >
          <img
            src={require("@site/static/images/about/tenacity.png").default}
            srcSet={`
            ${require("@site/static/images/about/tenacity.png").default} 1x,
            ${require("@site/static/images/about/tenacity-2x.png").default} 2x
            `}
            alt="tenacity"
          />
        </div>
      </div>

      <div className="mt-SPACE_16 sm:mt-SPACE_20 lg:mt-24">
        <p className="text-title-semi-large sm:text-title-large lg:text-display-tiny text-center">Angel Investors</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-SPACE_12 sm:gap-y-SPACE_06 lg:gap-y-0 items-center flex-start justify-center mt-SPACE_09">
          {investors.map((investor) => (
            <div key={investor.id} className="flex flex-col items-center w-[172px] sm:w-[228px]">
              <img
                src={investor.image}
                srcSet={`${investor.image} 1x,${investor.image2x} 2x`}
                alt={investor.name}
                className="rounded-2xl h-32 w-32"
              />
              <span className="text-title-tiny mt-SPACE_02">{investor.name}</span>
              <span className="text-content-small text-tailCall-dark-500 text-center">{investor.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Investors
