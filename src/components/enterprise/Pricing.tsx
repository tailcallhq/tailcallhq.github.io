import React from "react"
import Heading from "@theme/Heading"

import CheckCircle from "@site/static/icons/basic/check-circle.svg"
import {Theme, pricingPlans} from "@site/src/constants"
import LinkButton from "../shared/LinkButton"
import {analyticsHandler} from "@site/src/utils"

const Pricing = (): JSX.Element => {
  return (
    <section className="my-SPACE_14 sm:my-24 sm:mx-SPACE_04 lg:mx-0">
      <Heading
        as="h4"
        className="text-title-large sm:text-display-tiny lg:text-display-small mx-SPACE_02 text-center mb-SPACE_06 sm:mb-SPACE_10"
      >
        <span className="rounded sm:rounded-lg bg-tailCall-yellow px-SPACE_01">Plans</span> that fit your scale.
      </Heading>

      <div className="flex flex-col mx-SPACE_04 sm:mx-0 lg:flex-row items-center justify-center gap-SPACE_06 md:px-SPACE_16">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`${
              plan.mostPopular ? "border-tailCall-border-dark-700" : "border-tailCall-border-light-400"
            } border border-solid rounded-2xl flex flex-col items-center justify-between gap-y-SPACE_07 sm:gap-y-0 py-SPACE_04 sm:py-SPACE_06 relative w-full h-auto sm:w-[384px] md:h-[520px] lg:h-[584px]`}
          >
            {plan.mostPopular && (
              <p className="absolute -top-3.5 left-[50%] transform -translate-x-[50%] bg-tailCall-dark-600 text-tailCall-light-100 p-SPACE_01 rounded text-content-tiny font-bold">
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
              <div className="flex flex-col items-start justify-start gap-SPACE_04 px-SPACE_08">
                {plan.features.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-SPACE_03 m-0 p-0">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-content-small sm:text-content-tiny lg:text-content-small">
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block text-center mx-SPACE_04">
                <LinkButton
                  title={plan.buttonText}
                  onClick={() => analyticsHandler("Pricing", "Click", `${plan.buttonText}`)}
                  href={plan.href}
                  theme={plan.mostPopular ? Theme.Dark : Theme.Light}
                  width="medium"
                />
              </div>

              <div className="sm:hidden mt-SPACE_10 text-center mx-SPACE_04">
                <LinkButton
                  title={plan.buttonText}
                  onClick={() => analyticsHandler("Pricing", "Click", `${plan.buttonText}`)}
                  href={plan.href}
                  theme={plan.mostPopular ? Theme.Dark : Theme.Light}
                  width="medium"
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
