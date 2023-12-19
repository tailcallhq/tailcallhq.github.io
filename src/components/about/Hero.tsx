import React from "react"
import SectionTitle from "../shared/SectionTitle"
import AboutUs from "@site/static/animations/about-us-visual.gif"

const Hero = () => {
  return (
    <section className="flex flex-col sm:flex-row items-end sm:items-center justify-center bg-tailCall-dark-500 w-full h-full">
      <div className="mx-4 my-6 sm:m-10 lg:m-20">
        <SectionTitle title="Our Mission" />
        <h2 className="text-title-small sm:text-title-large lg:text-display-small text-tailCall-light-100 max-w-3xl">
          Simplify complex API interactions through a tailor-made GraphQL solution, ensuring efficient data retrieval
          and optimised query handling.
        </h2>
      </div>

      <img src={AboutUs} alt="about us visual" className="h-52 w-60 sm:h-72 sm:w-80 lg:h-fit lg:w-fit" />
    </section>
  )
}

export default Hero
