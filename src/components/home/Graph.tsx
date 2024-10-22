import React from "react"
import Heading from "@theme/Heading"

import LinkButton from "../shared/LinkButton"
import ChooseTailcall from "./ChooseTailcall"
import GraphContainer from "./GraphContainer"
import githubLogo from "@site/static/icons/companies/github-light.svg"
import RequestVisual from "@site/static/animations/request-visual.json"
import LatencyVisual from "@site/static/animations/latency-visual.json"
import {analyticsHandler} from "@site/src/utils"
import {Theme, tailCallBenchmarkUrl} from "@site/src/constants"
import Section from "../shared/Section"

const Graph = (): JSX.Element => {
  return (
    <Section className="bg-tailCall-dark-600 h-full w-full text-tailCall-light-100 lg:pt-48 lg:pb-36">
      <div className="flex items-center justify-between lg:mb-12">
        <Heading
          as="h5"
          className="text-title-large sm:text-display-tiny lg:text-display-medium sm:max-w-sm lg:max-w-xl"
        >
          Platform made for performance.
        </Heading>
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
            Icon={githubLogo}
            onClick={() => analyticsHandler("Home Page", "Click", "View on Github")}
          />
        </div>
      </div>

      <ChooseTailcall />
    </Section>
  )
}

export default Graph
