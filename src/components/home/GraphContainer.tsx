import React from "react"
import CountUp from "react-countup"
import Lottie from "lottie-react"

type GraphContainerProps = {
  metricTitle: string
  metricData: number
  metricDesc: string
  visual: any
}

const GraphContainer = ({metricTitle, metricData, metricDesc, visual}: GraphContainerProps) => {
  return (
    <div
      style={{
        border: "1px solid #2C2C2C",
      }}
      className="h-[368px] lg:h-[400px] w-[95%] sm:w-[680px] rounded-3xl sm:rounded-[32px] flex flex-col relative"
    >
      <div className="flex flex-col px-6 py-4 lg:px-12 lg:py-8 z-10">
        <span className="text-content-small sm:text-content-medium text-tailCall-light-100">{metricTitle}</span>
        <span className="text-title-medium sm:text-title-large text-tailCall-light-100">
          <CountUp
            start={2000}
            end={+metricData}
            decimals={2}
            duration={0.75}
            enableScrollSpy
            scrollSpyDelay={100}
            scrollSpyOnce
          />
        </span>
        <span className="text-content-tiny sm:text-content-small text-tailCall-light-400">{metricDesc}</span>
      </div>

      <div className="absolute right-1 bottom-1">
        <Lottie animationData={visual} loop={true} />
      </div>
    </div>
  )
}

export default GraphContainer
