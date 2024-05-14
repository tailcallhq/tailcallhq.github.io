import React from "react"


import LinkButton from "../shared/LinkButton"
import ChooseTailcall from "./ChooseTailcall"
import GraphContainer from "./GraphContainer"
// import githubLogo from "../../assets/icons/companies/github-light.svg"
import RequestVisual from "../../assets/animations/request-visual.json"
import LatencyVisual from "../../assets/animations/latency-visual.json"
import {analyticsHandler} from "../../utils"
import {Theme, tailCallBenchmarkUrl} from "../../constants"

const Graph = (): JSX.Element => {
  return (
    <section className="bg-tailCall-dark-600 h-full w-full text-tailCall-light-100 lg:px-SPACE_16">
      <div className="sm:max-w-7xl mx-SPACE_04 sm:mx-SPACE_10 lg:mx-auto  py-SPACE_08 sm:py-SPACE_20">
        <div className="flex items-center justify-between">
          <h5
            className="text-title-large sm:text-display-tiny lg:text-display-medium sm:max-w-sm lg:max-w-xl"
          >
            Platform made for performance.
          </h5>
          <div className="hidden sm:block">
            <LinkButton
              title="View on Github"
              href={tailCallBenchmarkUrl}
              theme={Theme.Gray}
              // Icon={githubLogo}
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
