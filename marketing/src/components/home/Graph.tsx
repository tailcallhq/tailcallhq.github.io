import React from "react"

import LinkButton from "../shared/LinkButton"
import ChooseTailcall from "./ChooseTailcall"
import GraphContainer from "./GraphContainer"

import RequestVisual from "../../assets/animations/request-visual.json"
import LatencyVisual from "../../assets/animations/latency-visual.json"
import {analyticsHandler} from "../../utils"
import {Theme, tailCallBenchmarkUrl} from "../../constants"
const githubLogo = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.956 1.3335C7.86985 1.3335 1.33301 8.05572 1.33301 16.372C1.33301 23.0197 5.52139 28.6468 11.3318 30.6384C12.0582 30.7881 12.3243 30.3148 12.3243 29.9167C12.3243 29.568 12.3004 28.373 12.3004 27.1279C8.23263 28.0244 7.38555 25.3352 7.38555 25.3352C6.73184 23.5923 5.76324 23.1444 5.76324 23.1444C4.43186 22.2231 5.86022 22.2231 5.86022 22.2231C7.33706 22.3227 8.112 23.7668 8.112 23.7668C9.41913 26.0572 11.5254 25.41 12.3728 25.0116C12.4937 24.0405 12.8814 23.3683 13.2929 22.9949C10.0486 22.6463 6.63516 21.3517 6.63516 15.5751C6.63516 13.9319 7.21584 12.5874 8.13595 11.5418C7.99078 11.1684 7.48223 9.62444 8.28142 7.55797C8.28142 7.55797 9.51611 7.15952 12.3001 9.10163C13.492 8.77245 14.7212 8.60499 15.956 8.60358C17.1907 8.60358 18.4493 8.77805 19.6116 9.10163C22.3958 7.15952 23.6305 7.55797 23.6305 7.55797C24.4297 9.62444 23.9209 11.1684 23.7757 11.5418C24.7201 12.5874 25.2768 13.9319 25.2768 15.5751C25.2768 21.3517 21.8633 22.6212 18.5948 22.9949C19.1276 23.4679 19.5873 24.3641 19.5873 25.7834C19.5873 27.8001 19.5634 29.4186 19.5634 29.9164C19.5634 30.3148 19.8298 30.7881 20.5559 30.6387C26.3663 28.6465 30.5547 23.0197 30.5547 16.372C30.5786 8.05572 24.0179 1.3335 15.956 1.3335Z"
        fill="white"
      />
    </svg>
  )
}

const Graph = (): JSX.Element => {
  return (
    <section className="bg-tailCall-dark-600 h-full w-full text-tailCall-light-100 lg:px-SPACE_16">
      <div className="sm:max-w-7xl mx-SPACE_04 sm:mx-SPACE_10 lg:mx-auto  py-SPACE_08 sm:py-SPACE_20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-title-large sm:text-display-tiny lg:text-display-medium sm:max-w-sm lg:max-w-xl">
            Platform made for performance.
          </h1>
          <div className="hidden sm:block">
            <LinkButton
              title="View on Github"
              href={tailCallBenchmarkUrl}
              theme={Theme.Gray}
              Icon={githubLogo}
              onClick={() => analyticsHandler("Home Page", "Click", "View on Github")}
            />
          </div>
        </div>

        {/* Graphs */}
        <div className="flex flex-col sm:flex-row gap-10 items-center w-full">
          <GraphContainer
            visual={RequestVisual}
            metricData={7442.01}
            start={5000}
            metricTitle="Requests/sec"
            metricDesc="(Higher is better)"
            duration={1.6}
            delay={0}
          />
          <GraphContainer
            visual={LatencyVisual}
            metricData={13.39}
            start={1000}
            metricTitle="Latency (ms)"
            metricDesc="(Lower is better)"
            duration={1.6}
            delay={0}
          />
          <div className="sm:hidden">
            <LinkButton
              title="View on Github"
              href={tailCallBenchmarkUrl}
              theme={Theme.Gray}
              // Icon={githubLogo}
              onClick={() => analyticsHandler("Home Page", "Click", "View on Github")}
            />
          </div>
        </div>

        <ChooseTailcall />
      </div>
    </section>
  )
}

export default Graph
