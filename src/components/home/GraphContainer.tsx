import React, {useEffect, useRef} from "react"
import CountUp from "react-countup"
import TrackVisibility from "react-on-screen"
import LottieContainer from "./LottieContainer"

type GraphContainerProps = {
  metricTitle: string
  metricData: number
  metricDesc: string
  visual: any
  duration?: number
  delay?: number
  start?: number
}

const GraphContainer = ({metricTitle, metricData, metricDesc, visual, delay, duration, start}: GraphContainerProps) => {
  const lottieRef = useRef()

  const interactivity: any = {
    mode: "scroll" as "scroll",
    actions: [
      {
        visibility: [0, 1],
        type: "loop" as "loop",
        frames: [0],
      },
    ],
  }

  useEffect(() => {
    setTimeout(() => {
      ;(lottieRef.current as any)?.pause()
    }, delay)
  }, [])

  return (
    <div
      style={{
        border: "1px solid var(--ifm-color-dark-900)",
      }}
      className="h-[368px] lg:h-[400px] w-[95%] sm:w-[680px] rounded-3xl sm:rounded-[32px] flex flex-col relative"
    >
      <div className="flex flex-col px-6 py-4 lg:px-12 lg:py-8 z-10">
        <span className="text-content-small sm:text-content-medium text-tailCall-light-100">{metricTitle}</span>

        <span className="text-title-medium sm:text-title-large text-tailCall-light-100">
          <TrackVisibility
            style={{
              height: "36px",
            }}
            partialVisibility
            once
            offset={100}
          >
            {({isVisible}) => {
              return (
                <>
                  {isVisible ? (
                    <CountUp start={start} end={metricData} decimals={2} duration={duration} delay={delay} />
                  ) : null}
                </>
              )
            }}
          </TrackVisibility>
        </span>

        <span className="text-content-tiny sm:text-content-small text-tailCall-light-400">{metricDesc}</span>
      </div>

      <div className="absolute right-1 bottom-1">
        <LottieContainer lottieRef={lottieRef} animationData={visual} interactivity={interactivity} loop={false} />
      </div>
    </div>
  )
}

export default GraphContainer
