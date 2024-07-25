import React from 'react'
import Heading from "@theme/Heading"
import CustomerFeedbackCard from './CustomerFeedbackCard'
import { customerFeedbacks } from '@site/src/constants'

const Customer = () => {
    return (
        <section className="customer-container !bg-tailCall-dark-600 h-full w-full text-tailCall-light-100 lg:px-SPACE_16 !bg-center !bg-contain">
            <div className="mx-SPACE_04 sm:mx-SPACE_10 lg:mx-auto pt-SPACE_20 pb-SPACE_10">
                <div className="flex flex-row items-center justify-center mb-SPACE_12">
                    <Heading
                        as="h5"
                        className="text-title-large sm:text-display-tiny lg:text-display-medium flex flex-col items-center md:flex-row"
                    >
                        <span>Our Customers {" "}</span>
                        <span className='bg-tailCall-yellow rounded-lg text-black px-SPACE_01 ml-SPACE_02'>love us!</span>
                    </Heading>
                </div>
                <div className='flex flex-col space-y-SPACE_06 md:flex-row md:space-x-SPACE_02 md:space-y-0'>
                    {
                        customerFeedbacks.map((feedback) => {
                            return (
                                <CustomerFeedbackCard key={feedback.id} classNames={feedback.id === 2 ? "md:!relative md:-top-6" : ""} citation={feedback.citation} designation={feedback.designation} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Customer