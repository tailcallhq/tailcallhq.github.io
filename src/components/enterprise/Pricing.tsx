import React from "react"

import CheckCircle from "@site/static/icons/basic/check-circle.svg"
import {pricingPlans} from "@site/src/constants"
import Button from "../shared/Button"
import {analyticsHandler} from "@site/src/utils"

const Pricing = () => {
  return (
    <section className="my-14 sm:my-24 sm:mx-4 lg:mx-0">
      <h4 className="text-title-large sm:text-display-tiny lg:text-display-small mx-2 text-center mb-6 sm:mb-10">
        <span className="rounded sm:rounded-lg bg-tailCall-yellow px-1">Plans</span> that fit your scale.
      </h4>

      <div className="flex flex-col mx-4 sm:mx-0 lg:flex-row items-center justify-center gap-6 md:px-16">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            style={{
              border: plan.mostPopular ? "1px solid black" : "1px solid var(--ifm-color-gray-600)",
            }}
            className="rounded-2xl flex flex-col items-center justify-between gap-y-7 sm:gap-y-0 py-4 sm:py-6 relative w-full h-auto sm:w-[384px] md:h-[520px] lg:h-[584px]"
          >
            {plan.mostPopular && (
              <p className="absolute -top-3.5 left-[50%] transform -translate-x-[50%] bg-tailCall-dark-600 text-tailCall-light-100 p-1 rounded text-content-tiny font-bold">
                Most popular
              </p>
            )}

            <div className="flex flex-col">
              <span className="text-content-small lg:text-content-medium text-center">{plan.name}</span>
              <span className="text-title-large  lg:text-display-tiny text-center">{plan.price}</span>
              <span className="text-content-small text-center">{plan.for}</span>
              <span className="text-content-small text-center">{plan.billing ? plan.billing : <br />}</span>
              <span className="text-content-small text-center">
                {plan.volumeDiscounts ? plan.volumeDiscounts : <br />}
              </span>
            </div>

            <div className="flex-[0.8] flex flex-col items-center justify-between">
              <div className="flex flex-col items-start justify-start gap-4 px-8">
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-3 m-0 p-0">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-content-small sm:text-content-tiny lg:text-content-small">
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block text-center mx-4">
                <Button
                  title={plan.buttonText}
                  onClick={() => analyticsHandler("Pricing", "Click", `${plan.buttonText}`)}
                  href={plan.href}
                  theme={plan.mostPopular ? "dark" : "light"}
                  width="320px"
                />
              </div>

              <div className="sm:hidden mt-10 text-center mx-4">
                <Button
                  title={plan.buttonText}
                  onClick={() => analyticsHandler("Pricing", "Click", `${plan.buttonText}`)}
                  href={plan.href}
                  theme={plan.mostPopular ? "dark" : "light"}
                  width="300px"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pricing
