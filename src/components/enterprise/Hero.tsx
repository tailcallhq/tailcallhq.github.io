import React from "react"
import Button from "../shared/Button"
import Grid from "@site/static/images/about/grid-large.png"

const Hero = () => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center py-10 sm:py-14 lg:py-20 relative">
      <img src={Grid} alt="" className="absolute inset-0 -z-10 h-[400px] sm:h-[540px] w-full" />

      <h2 className="text-title-large sm:text-display-small lg:text-display-large text-center mb-10 max-w-[370px] sm:max-w-7xl">
        Powering Scalable, Secure, and High-Performance API Ecosystems
      </h2>
      <Button title="Get in touch" theme="dark" href="/contact" />
    </section>
  )
}

export default Hero
