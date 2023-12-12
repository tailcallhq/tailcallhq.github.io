import React from "react"
import SectionTitle from "../shared/SectionTitle"

const WhoWeAre = () => {
  return (
    <section className="mt-8 sm:mt-20 flex flex-col sm:flex-row items-start sm:space-x-20 px-8 sm:px-40">
      <div className="min-w-fit">
        <SectionTitle title="About Us" />
        <p className="text-title-semi-large sm:text-display-small bg-tailCall-yellow rounded-lg mt-2">Who we are?</p>
      </div>
      <p className="text-content-tiny sm:text-content-medium">
        We are change agents in the world of API development, focusing our expertise on enhancing GraphQL technologies.
        Our team is composed of seasoned engineers, innovators, and strategists committed to reshaping the API
        landscape. We believe in breaking barriers, pushing boundaries, and creating solutions that empower developers
        to build APIs that are not just functional but revolutionary.
      </p>
    </section>
  )
}

export default WhoWeAre
