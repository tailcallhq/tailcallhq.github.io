import React from "react"
import SectionTitle from "../shared/SectionTitle"

const Hero = () => {
  return (
    <section className="flex flex-col sm:flex-row items-end sm:items-center justify-center bg-tailCall-dark-500 w-full h-full">
      <div className="mx-4 my-6 sm:m-10 lg:m-20">
        <SectionTitle title="Our Mission" />
        <h2 className="text-title-small sm:text-title-large lg:text-display-small text-tailCall-light-100 max-w-3xl">
          Demystify the complexity of API composition, with unparalleled ease and efficiency.
        </h2>
      </div>

      <img
        src={require("@site/static/animations/about-us-visual.gif").default}
        alt="about us visual"
        className="h-52 w-60 sm:h-72 sm:w-80 lg:h-fit lg:w-fit"
      />
    </section>
  )
}

export default Hero
