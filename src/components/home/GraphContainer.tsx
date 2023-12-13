import React from "react"
import CountUp from "react-countup"
import Lottie from "lottie-react"
import RequestVisual from "@site/static/animations/request-visual.json"

type GraphContainerProps = {
  metricTitle: string
  metricData: number
  metricDesc: string
}

const GraphContainer = ({metricTitle, metricData, metricDesc}: GraphContainerProps) => {
  return (
    <div
      style={{
        border: "1px solid #2C2C2C",
      }}
      className="h-[400px] w-[95%] sm:w-[680px] rounded-3xl sm:rounded-[32px] flex flex-col "
    >
      <div className="flex flex-col px-12 py-8">
        <span className="text-content-small sm:text-content-medium text-tailCall-light-100">{metricTitle}</span>
        <span className="text-title-medium sm:text-title-large text-tailCall-light-100">
          <CountUp start={2000} end={+metricData} decimals={2} duration={0.75} />
        </span>
        <span className="text-content-tiny sm:text-content-small text-tailCall-light-400">{metricDesc}</span>
      </div>

      <div className="ml-40 -mt-4">
        <Lottie animationData={RequestVisual} loop={true} className="rounded-lg" />
      </div>
    </div>
  )
}

export default GraphContainer
