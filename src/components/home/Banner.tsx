import React from "react"
import Heading from "@theme/Heading"

import LinkButton from "../shared/LinkButton"
import HeroImage from "@site/static/images/home/hero.svg"
import {analyticsHandler} from "@site/src/utils"
import {Theme, codeSandboxUrl} from "@site/src/constants"
import {pageLinks} from "@site/src/constants/routes"
import Link from "@docusaurus/Link"

const Banner = (): JSX.Element => {
  return (
    <main>
      <div className="flex flex-col sm:items-center sm:text-center w-full mt-SPACE_06 px-SPACE_04 sm:mt-SPACE_20">
        <div className="h-full 2xl:min-h-0">
          <Heading
            as="h2"
            className="text-title-large max-w-xs sm:text-display-small lg:text-display-large sm:max-w-5xl"
          >
            The modern <br />
            <span className="bg-tailCall-yellow rounded-md sm:rounded-2xl px-SPACE_02">GraphQL</span> runtime
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

        <HeroImage className="object-contain h-full sm:h-full w-full mt-SPACE_10 max-w-7xl" />
      </div>
    </main>
  )
}

export default Banner
