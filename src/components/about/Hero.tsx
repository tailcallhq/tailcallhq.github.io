import React from "react"
import SectionTitle from "../shared/SectionTitle"
import AboutUs from "@site/static/images/about/about-us-visual.svg"

const Hero = () => {
  return (
    <section className="flex items-center justify-between bg-tailCall-dark-500 w-full h-full">
      <div className="m-20">
        <SectionTitle title="Our Mission" />
        <p className="text-display-small text-tailCall-light-100 max-w-3xl">
          Simplify complex API interactions through a tailor-made GraphQL solution, ensuring efficient data retrieval
          and optimised query handling.
        </p>
      </div>
      <AboutUs />
    </section>
  )
}

export default Hero
