import React from "react"
import Heading from "@theme/Heading"

import LinkButton from "../shared/LinkButton"
import {analyticsHandler} from "@site/src/utils"
import {Theme, codeSandboxUrl} from "@site/src/constants"
import {pageLinks} from "@site/src/constants/routes"
import Link from "@docusaurus/Link"
import Section from "../shared/Section"

const Banner = (): JSX.Element => {
  return (
    <main className="w-full overflow-hidden">
      <Section className="flex flex-col sm:items-center sm:text-center w-full !pb-0">
        <div className="h-full 2xl:min-h-0">
          <Heading
            as="h1"
            className="hero-banner-title text-title-large max-w-xs sm:text-display-small lg:text-display-large sm:max-w-5xl"
          >
            The modern <br />
            <span className="bg-tailCall-yellow rounded-md sm:rounded-2xl px-SPACE_02">GraphQL</span> platform
          </Heading>
          <p className="hero-banner-sub-title sm:max-w-2xl sm:m-auto text-content-small sm:text-content-medium lg:text-content-large font-normal max-w-md sm:mt-SPACE_04 mb-0">
            Leverage AI to design and ship best-practice GraphQL backends atop existing data sources and APIs.
          </p>
          <div className="hidden sm:flex justify-center mt-SPACE_06 sm:mt-SPACE_10 space-x-SPACE_04 sm:space-x-SPACE_06">
            <LinkButton
              title="Learn GraphQL"
              href={pageLinks.introduction}
              theme={Theme.Dark}
              width="small"
              onClick={() => analyticsHandler("Home Page", "Click", "Learn GraphQL")}
            />
            <LinkButton
              title="Get Started"
              href={pageLinks.docs}
              theme={Theme.Light}
              width="small"
              onClick={() => analyticsHandler("Home Page", "Click", "Get Started")}
            />
          </div>

          <div className="sm:hidden flex justify-between md:justify-center mt-SPACE_06 sm:mt-SPACE_10 space-x-SPACE_04 sm:space-x-SPACE_06">
            <LinkButton
              title="Learn GraphQL"
              href={pageLinks.introduction}
              theme={Theme.Dark}
              onClick={() => analyticsHandler("Home Page", "Click", "Learn GraphQL")}
              width="full"
            />
            <LinkButton
              title="Get Started"
              href={pageLinks.docs}
              theme={Theme.Light}
              onClick={() => analyticsHandler("Home Page", "Click", "Get Started")}
              width="full"
            />
          </div>
        </div>
      </Section>
      <picture className="block w-full mt-8 max-w-7xl mx-auto" style={{aspectRatio: "1400 / 672"}}>
        <source media="(max-width: 767px)" srcSet="/images/home/hero-mobile.avif" type="image/avif" />
        <source srcSet="/images/home/hero.avif" type="image/avif" />
        <img
          src="/images/home/hero.svg"
          alt=""
          className="object-contain w-full h-auto"
          width={1400}
          height={672}
          fetchPriority="high"
          style={{aspectRatio: "1400 / 672"}}
        />
      </picture>
    </main>
  )
}

export default Banner
