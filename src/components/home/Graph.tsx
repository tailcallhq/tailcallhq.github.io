import React from "react"

import Button from "../shared/Button"
import ChooseTailcall from "./ChooseTailcall"
import GraphContainer from "./GraphContainer"
import githubLogo from "@site/static/icons/companies/github-gray.svg"

const Graph = () => {
  return (
    <section className="bg-tailCall-dark-700 h-full w-full text-tailCall-light-100">
      <div className="sm:max-w-7xl mx-4 sm:mx-auto py-8 sm:py-20">
        <div className="flex items-center justify-between">
          <h5 className="text-title-large sm:text-display-medium max-w-lg">Platform made for performance.</h5>
          <div className="hidden sm:block">
            <Button title="View on Github" onClick={() => {}} theme="gray" icon={githubLogo} />
          </div>
        </div>

        {/* Graphs */}
        <div className="flex flex-col sm:flex-row gap-10 items-center w-full">
          <GraphContainer metricData={2890.68} metricTitle="Requests/sec" metricDesc="(Higher is better)" />
          <GraphContainer metricData={34.69} metricTitle="Latency (ms)" metricDesc="(Lower is better)" />
          <div className="sm:hidden">
            <Button title="View on Github" onClick={() => {}} theme="gray" icon={githubLogo} />
          </div>
        </div>

        <ChooseTailcall />
      </div>
    </section>
  )
}

export default Graph
