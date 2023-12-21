import React from "react"
import {investors} from "@site/src/constants"

const Investors = () => {
  return (
    <section className="h-full w-full relative">
      <p className="text-title-semi-large sm:text-title-large lg:text-display-tiny text-center w-full px-4 sm:mx-0 sm:mt-9">
        We are backed by <span className="bg-tailCall-yellow rounded-lg px-2">incredible investors.</span>
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-10 mt-6 sm:mt-9">
        <div
          className="flex items-center justify-center rounded-xl sm:rounded-2xl p-5 sm:p-10 shadow-lg w-52 h-28 sm:w-80 sm:h-40 bg-tailCall-light-100"
          style={{
            border: "1px solid #CECECF",
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
          className="flex items-center justify-center rounded-xl sm:rounded-2xl p-5 sm:p-10 shadow-lg w-52 h-28 sm:w-80 sm:h-40 bg-tailCall-light-100"
          style={{
            border: "1px solid #CECECF",
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

      <div className="mt-16 sm:mt-20 lg:mt-24">
        <p className="text-title-semi-large sm:text-title-large lg:text-display-tiny text-center">Angel Investors</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-4 sm:gap-y-6 lg:gap-y-0 items-center flex-start justify-center mt-9">
          {investors.map((investor) => (
            <div key={investor.id} className="flex flex-col items-center w-[172px] sm:w-[228px]">
              <img
                src={investor.image}
                srcSet={`${investor.image} 1x, ${investor.image2x} 2x`}
                alt={investor.name}
                className="rounded-2xl h-32 w-32"
              />
              <span className="text-title-tiny mt-2">{investor.name}</span>
              <span className="text-content-small text-tailCall-dark-500 text-center">{investor.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Investors
