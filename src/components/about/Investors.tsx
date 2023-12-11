import React from "react"
import PeakXV from "@site/static/images/about/peakxv.jpg"
import Tenacity from "@site/static/images/about/tenacity.jpg"
import Grid from "@site/static/images/about/grid-large.svg"
import {investors} from "@site/src/constants"

const Investors = () => {
  return (
    <section className="h-full w-full relative">
      <Grid className="absolute inset-0 -z-10" />
      <p className="text-display-tiny text-center mt-9">
        We are backed by <span className="bg-tailCall-yellow rounded-lg px-2">incredible investors.</span>
      </p>

      <div className="flex items-center justify-center space-x-10 mt-9">
        <div
          className="rounded-2xl p-10 shadow-lg w-80 h-40 bg-tailCall-light-100"
          style={{
            border: "1px solid #CECECF",
          }}
        >
          <img src={PeakXV} alt="" className="h-full w-full object-contain" />
        </div>
        <div
          className="rounded-2xl shadow-lg p-10 w-80 h-40 bg-tailCall-light-100"
          style={{
            border: "1px solid #CECECF",
          }}
        >
          <img src={Tenacity} alt="" />
        </div>
      </div>

      <div className="mt-24">
        <p className="text-display-tiny text-center">Angel Investors</p>
        <div className="flex items-center space-x-12 justify-center mt-9">
          {investors.map((investor) => (
            <div key={investor.id} className="flex flex-col items-center">
              <img src={investor.image} alt={investor.name} className="rounded-2xl h-32 w-32" />
              <span className="text-title-tiny mt-2">{investor.name}</span>
              <span className="text-content-small text-tailCall-dark-500">{investor.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Investors
