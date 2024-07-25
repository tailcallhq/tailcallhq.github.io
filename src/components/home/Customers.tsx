import React from 'react'
import Heading from "@theme/Heading"
import CustomerFeedbackCard from './CustomerFeedbackCard'

const Customer = () => {
    return (
        <section className="bg-tailCall-dark-600 h-full w-full text-tailCall-light-100 lg:px-SPACE_16">
            <div className="mx-SPACE_04 sm:mx-SPACE_10 lg:mx-auto py-SPACE_08 sm:py-SPACE_20">
                <div className="flex items-center justify-center mb-SPACE_04">
                    <Heading
                        as="h5"
                        className="text-title-large sm:text-display-tiny lg:text-display-medium"
                    >
                        Our Customers {" "}
                        <span className='bg-tailCall-yellow rounded-lg text-black px-SPACE_01'>love us!</span>
                    </Heading>
                </div>
                <div className='flex space-x-SPACE_02'>
                    <CustomerFeedbackCard />
                    <CustomerFeedbackCard />
                    <CustomerFeedbackCard />
                </div>
            </div>
        </section>
    )
}

export default Customer