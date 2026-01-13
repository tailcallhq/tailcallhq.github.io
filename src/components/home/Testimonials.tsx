import React from "react"
import Heading from "@theme/Heading"
import CustomerFeedbackCard from "./CustomerFeedbackCard"
import {companies, testimonials} from "@site/src/constants"
import Section from "../shared/Section"
import Partners from "@site/src/components/home/Partners"
import TrustedByMarquee from "@site/src/components/home/TrustedByMarquee"

export enum TestimonialDisplay {
  Hide = "Hide",
  Show = "Show",
  Anon = "Anon",
}

interface AppConfig {
  testimonials: TestimonialDisplay
}

const config: AppConfig = {
  testimonials: TestimonialDisplay.Anon, // Default value
}

const Testimonials = () => {
  if (config.testimonials === TestimonialDisplay.Hide) {
    return null
  }

  return (
    <Section className="customer-container !bg-tailCall-dark-600 h-full w-full text-tailCall-light-100 !bg-contain md:!bg-center md:!bg-top py-16 md:py-20 lg:pt-48 lg:pb-24">
      <div className="flex flex-row items-center justify-center">
        <Heading
          as="h5"
          className="text-title-large sm:text-display-tiny lg:text-display-medium flex flex-col items-center md:flex-row lg:mb-20"
        >
          <span>Developers</span>
          <span className="bg-tailCall-yellow rounded-lg text-black px-SPACE_01 ml-SPACE_02">love us!</span>
        </Heading>
      </div>
      <div className="flex flex-col space-y-SPACE_10 md:flex-row md:space-x-SPACE_02 md:space-y-0 mt-SPACE_18">
        {testimonials.map((feedback) => (
          <CustomerFeedbackCard
            key={feedback.id}
            isCenterCard={feedback.id === 2}
            citation={feedback.citation}
            designation={feedback.designation}
            name={feedback?.name}
            department={feedback?.department}
            display={config.testimonials}
          />
        ))}
      </div>
      <TrustedByMarquee title="Trusted by developers at" logos={companies} />
    </Section>
  )
}

export default Testimonials
