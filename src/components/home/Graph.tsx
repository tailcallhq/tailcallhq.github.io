import React from "react"

import Button from "../shared/Button"
import ChooseTailcall from "./ChooseTailcall"
import GraphContainer from "./GraphContainer"
import githubLogo from "@site/static/icons/companies/github-light.svg"
import RequestVisual from "@site/static/animations/request-visual.json"
import LatencyVisual from "@site/static/animations/latency-visual.json"

const Graph = () => {
  return (
    <section className="bg-tailCall-dark-600 h-full w-full text-tailCall-light-100 lg:px-16">
      <div className="sm:max-w-7xl mx-4 sm:mx-10 lg:mx-auto  py-8 sm:py-20">
        <div className="flex items-center justify-between">
          <h5 className="text-title-large sm:text-display-tiny lg:text-display-medium sm:max-w-sm lg:max-w-xl">
            Platform made for performance.
          </h5>
          <div className="hidden sm:block">
            <Button
              title="View on Github"
              href="https://github.com/tailcallhq/graphql-benchmarks#benchmark-results"
              theme="gray"
              Icon={githubLogo}
            />
          </div>
        </div>

        {/* Graphs */}
        <div className="flex flex-col sm:flex-row gap-10 items-center w-full">
          <GraphContainer
            visual={RequestVisual}
            metricData={7442.01}
            metricTitle="Requests/sec"
            metricDesc="(Higher is better)"
            duration={1.6}
            delay={0}
          />
          <GraphContainer
            visual={LatencyVisual}
            metricData={13.39}
            metricTitle="Latency (ms)"
            metricDesc="(Lower is better)"
            duration={1.6}
            delay={0}
          />
          <div className="sm:hidden">
            <Button
              title="View on Github"
              href="https://github.com/tailcallhq/graphql-benchmarks#benchmark-results"
              theme="gray"
              Icon={githubLogo}
            />
          </div>
        </div>

        <ChooseTailcall />
      </div>
    </section>
  )
}

export default Graph
