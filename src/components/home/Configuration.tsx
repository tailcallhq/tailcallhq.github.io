import React from "react"
import Heading from "@theme/Heading"
import Link from "@docusaurus/Link"
import Section from "../shared/Section"
import LazyHomeSection from "./LazyHomeSection"

const loadConfigurationCode = () => import("./ConfigurationCode")

const Configuration = (): JSX.Element => {
  return (
    <Section className="flex flex-col lg:flex-row justify-center gap-10" innerClassName="xl:flex md:gap-10">
      <div className="max-w-2xl">
        <Heading as="h2" className="text-title-large sm:text-display-tiny lg:text-display-small mb-SPACE_04">
          Get <span className="rounded-lg px-SPACE_02 bg-tailCall-yellow">Started</span>
        </Heading>
        <p className="text-content-small sm:text-content-medium mb-SPACE_11">
          Setup the Tailcall instantly via npm and unlock the power of high-performance API orchestration.
        </p>
        <div>
          <h5>More</h5>
          <p className="text-content-small sm:text-content-medium mb-SPACE_11">
            To dive deeper into Tailcall checkout our{" "}
            <Link href="/docs" className="font-bold text-tailCall-dark-500 underline underline-offset-4">
              docs
            </Link>{" "}
            for detailed tutorials. Ideal for devs at any level, it's packed with advanced tips, powerful operators and
            best practices.
          </p>
        </div>
      </div>
      <div>
        <LazyHomeSection load={loadConfigurationCode} minHeight={560} rootMargin="0px" threshold={0.65} />
      </div>
    </Section>
  )
}

export default Configuration
