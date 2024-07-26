import {testimonials} from "@site/src/constants"
import Heading from "@theme/Heading"
import React from "react"

type TestimonialCardProps = {
  testimonial: Testimonial
}

const TestimonialCard = ({testimonial}: TestimonialCardProps): JSX.Element => {
  // Check if the current card is the middle card
  let isMiddleCard = testimonial.id === 2

  // Define the title with conditional styling
  const title = (
    <Heading as="h6" className={isMiddleCard ? "text-title-medium md:text-title-large" : "text-title-medium"}>
      {testimonial.title}
    </Heading>
  )

  // Define the vertical margin with conditional ordering
  const marginVertical = isMiddleCard ? "order-first lg:order-none lg:mb-SPACE_08" : "lg:mt-SPACE_08"

  return (
    <div
      className={`p-0.5 max-w-md lg:max-w-lg bg-gradient-to-b from-[#555656] rounded-2xl to-tailCall-dark-500 h-full z-20 ${marginVertical}`}
    >
      <div className="flex flex-col items-center bg-gradient-to-b from-tailCall-dark-300 to-tailCall-dark-500 rounded-2xl py-SPACE_12 text-center text-tailCall-light-200">
        {title}
        <p className="text-tailCall-light-300 mt-SPACE_10 text-content-small md:text-content-medium max-w-sm md:max-w-md">
          {`"${testimonial.review}"`}
        </p>
        <div className="flex flex-col mt-SPACE_06 lg:mt-SPACE_10 text-title-small lg:text-title-medium">
          {testimonial.customerName}
          <span className="text-content-tiny lg:text-content-medium">{testimonial.designation}</span>
        </div>
      </div>
    </div>
  )
}

const Testimonials = (): JSX.Element => {
  return (
    <section
      style={{backgroundImage: `url(${require("@site/static/images/home/bg-map.png").default})`}}
      className="bg-tailCall-dark-500  bg-no-repeat bg-top w-full  flex flex-col justify-center gap-y-24 lg:px-SPACE_16 text-tailCall-light-100 py-4 sm:py-12 lg:py-24"
    >
      <div className="pt-24">
        <Heading as="h5" className="text-title-large sm:text-display-tiny lg:text-display-medium text-center ">
          Our customers{" "}
          <span className="bg-tailCall-yellow rounded-md sm:rounded-2xl px-SPACE_02 text-tailCall-dark-500">
            love us!
          </span>
        </Heading>
      </div>
      <div className="mx-SPACE_04 flex flex-col lg:flex-row items-center lg:justify-center lg:items-stretch gap-SPACE_06">
        {testimonials.map((testimonial) => (
          <TestimonialCard testimonial={testimonial} key={testimonial.id} />
        ))}
      </div>
    </section>
  )
}

export default Testimonials
