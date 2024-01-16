import React from "react"
import SectionTitle from "../shared/SectionTitle"

const WhoWeAre = (): JSX.Element => {
  return (
    <section className="mt-SPACE_08 sm:mt-SPACE_10 lg:mt-SPACE_20 flex flex-col sm:flex-row items-start justify-center sm:space-x-SPACE_10 lg:space-x-SPACE_20 px-SPACE_04 sm:px-SPACE_10 lg:px-40 2xl:max-w-[90rem] mx-auto">
      <div className="min-w-fit">
        <SectionTitle title="About Us" />
        <p className="text-title-semi-large sm:text-display-tiny lg:text-display-small bg-tailCall-yellow rounded-lg mt-SPACE_02 px-SPACE_02">
          Who we are?
        </p>
      </div>
      <p className="text-content-tiny sm:text-content-small lg:text-content-medium">
        We are change agents in the world of API development, focusing our expertise on enhancing GraphQL technologies.
        Our team is composed of seasoned engineers, innovators, and strategists committed to reshaping the API
        landscape. We believe in breaking barriers, pushing boundaries, and creating solutions that empower developers
        to build APIs that are not just functional but revolutionary.
      </p>
    </section>
  )
}

export default WhoWeAre
