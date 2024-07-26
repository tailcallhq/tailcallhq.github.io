import React from "react"
import Heading from "@theme/Heading"
import CustomerFeedbackCard from "./CustomerFeedbackCard"
import {customerFeedbacks} from "@site/src/constants"

const Customer = () => {
  return (
    <section className="customer-container !bg-tailCall-dark-600 h-full w-full text-tailCall-light-100 lg:px-SPACE_16 !bg-contain md:!bg-center">
      <div className="mx-SPACE_04 sm:mx-SPACE_10 lg:mx-auto py-SPACE_20 md:pt-SPACE_40 md:pb-SPACE_20">
        <div className="flex flex-row items-center justify-center">
          <Heading
            as="h5"
            className="text-title-large sm:text-display-tiny lg:text-display-medium flex flex-col items-center md:flex-row"
          >
            <span>Our Customers </span>
            <span className="bg-tailCall-yellow rounded-lg text-black px-SPACE_01 ml-SPACE_02">love us!</span>
          </Heading>
        </div>
        <div className="flex flex-col space-y-SPACE_10 lg:w-[90%] lg:ml-auto lg:mr-auto md:flex-row md:space-x-SPACE_02 md:space-y-0 mt-SPACE_18">
          {customerFeedbacks.map((feedback) => {
            return (
              <CustomerFeedbackCard
                key={feedback.id}
                isCenterCard={feedback.id === 2}
                citation={feedback.citation}
                designation={feedback.designation}
                name={feedback?.name}
                department={feedback?.department}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Customer
