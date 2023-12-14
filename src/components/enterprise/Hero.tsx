import React from "react"
import Button from "../shared/Button"
import Grid from "@site/static/images/about/grid-large.svg"

const Hero = () => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center my-10 sm:my-14 lg:my-20 relative">
      <Grid className="absolute inset-0 -z-10 h-[540px] w-full" />
      <h2 className="text-title-large sm:text-display-small lg:text-display-large text-center mb-10">
        Powering Scalable, Secure, and High-Performance API Ecosystems
      </h2>
      <Button title="Get in touch" theme="dark" onClick={() => {}} />
    </section>
  )
}

export default Hero
