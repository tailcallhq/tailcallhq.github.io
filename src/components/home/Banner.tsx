import React from "react"
import Heading from "@theme/Heading"

import LinkButton from "../shared/LinkButton"
import HeroImage from "@site/static/images/home/hero.svg"
import {analyticsHandler} from "@site/src/utils"
import {Theme, codeSandboxUrl} from "@site/src/constants"
import {pageLinks} from "@site/src/constants/routes"
import Link from "@docusaurus/Link"
import Section from "../shared/Section"

const Banner = (): JSX.Element => {
  return (
    <main className="grid justify-center">
      <Section className="flex flex-col sm:items-center sm:text-center w-full !pb-0">
        <div className="h-full 2xl:min-h-0">
          <Heading
            as="h1"
            className="text-title-large max-w-xs sm:text-display-small lg:text-display-large sm:max-w-5xl"
          >
            The modern <br />
            <span className="bg-tailCall-yellow rounded-md sm:rounded-2xl px-SPACE_02">GraphQL</span> platform
          </Heading>
          <p className="sm:max-w-2xl sm:m-auto text-content-small sm:text-content-medium lg:text-content-large font-normal max-w-md sm:mt-SPACE_04 mb-0">
            Swiftly design and ship best-practice GraphQL backends atop existing data sources and APIs.
          </p>
          <div className="hidden sm:flex justify-center mt-SPACE_06 sm:mt-SPACE_10 space-x-SPACE_04 sm:space-x-SPACE_06">
            <LinkButton
              title="Learn More"
              href={pageLinks.introduction}
              theme={Theme.Dark}
              width="small"
              onClick={() => analyticsHandler("Home Page", "Click", "Playground")}
            />
            <LinkButton
              title="Get Started"
              href={pageLinks.docs}
              theme={Theme.Light}
              width="small"
              onClick={() => analyticsHandler("Home Page", "Click", "Get Started")}
            />
          </div>

          <div className="sm:hidden flex justify-center mt-SPACE_06 sm:mt-SPACE_10 space-x-SPACE_04 sm:space-x-SPACE_06">
            <LinkButton
              title="Learn More"
              href={pageLinks.introduction}
              theme={Theme.Dark}
              onClick={() => analyticsHandler("Home Page", "Click", "Playground")}
            />
            <LinkButton
              title="Get Started"
              href={pageLinks.docs}
              theme={Theme.Light}
              onClick={() => analyticsHandler("Home Page", "Click", "Get Started")}
            />
          </div>
        </div>
      </Section>
      <HeroImage className="object-contain h-full sm:h-full w-full mt-8 max-w-7xl" />
    </main>
  )
}

export default Banner
