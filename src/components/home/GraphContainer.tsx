import React, {useEffect, useRef} from "react"
import CountUp from "react-countup"
import TrackVisibility from "react-on-screen"
import {InteractivityProps, LottieRefCurrentProps, useLottie, useLottieInteractivity} from "lottie-react"
import LottieContainer from "./LottieContainer"

type GraphContainerProps = {
  metricTitle: string
  metricData: number
  metricDesc: string
  visual: object
  duration?: number
  delay?: number
  start?: number
}

const GraphContainer = ({
  metricTitle,
  metricData,
  metricDesc,
  visual,
  delay,
  duration,
  start,
}: GraphContainerProps): JSX.Element => {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  const interactivity = {
    mode: "scroll" as "scroll",
    actions: [
      {
        visibility: [0, 1],
        type: "loop" as "loop",
        frames: [0],
      },
    ],
  } as InteractivityProps

  useEffect(() => {
    setTimeout(() => {
      lottieRef.current?.pause()
    }, delay)
  }, [])

  return (
    <div className="border border-solid border-tailCall-border-dark-300 h-[300px] lg:h-[400px] w-[95%] sm:w-[680px] rounded-3xl sm:rounded-[32px] flex flex-col relative">
      <div className="flex flex-col px-SPACE_06 py-SPACE_04 lg:px-SPACE_12 lg:py-SPACE_08 z-10">
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

      <div className="absolute right-SPACE_01 bottom-SPACE_01">
        <LottieContainer lottieRef={lottieRef} animationData={visual} interactivity={interactivity} loop={false} />
      </div>
    </div>
  )
}

export default GraphContainer
