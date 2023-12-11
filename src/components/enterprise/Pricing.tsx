import React from "react"

import CheckCircle from "@site/static/icons/basic/check-circle.svg"
import {pricingPlans} from "@site/src/constants"
import Button from "../shared/Button"

const Pricing = () => {
  return (
    <section className="my-24">
      <h4 className="text-display-small text-center mb-10">
        <span className="rounded-lg bg-tailCall-yellow px-1">Plans</span> that fit your scale.
      </h4>

      <div className="flex items-center justify-center gap-x-6">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            style={{
              border: plan.mostPopular ? "1px solid #000" : "1px solid #E7E7E7",
              width: "384px",
              height: "584px",
            }}
            className="rounded-2xl flex flex-col justify-between py-6 relative"
          >
            {plan.mostPopular && (
              <p className="absolute -top-3.5 left-[50%] transform -translate-x-[50%] bg-tailCall-dark-600 text-tailCall-light-100 p-1 rounded text-content-tiny font-bold">
                Most popular
              </p>
            )}

            <div className="flex flex-col">
              <span className="text-content-medium text-center">{plan.name}</span>
              <span className="text-display-tiny text-center">{plan.price}</span>
              <span className="text-content-small text-center">{plan.for}</span>
              <span className="text-content-small text-center">{plan.billing}</span>
              <span className="text-content-small text-center">{plan.volumeDiscounts}</span>
            </div>

            <div className="flex flex-col items-start justify-start">
              {plan.features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-3 m-0 p-0">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-content-small">{feature.name}</span>
                </div>
              ))}
            </div>

            <Button title={plan.buttonText} onClick={() => {}} theme="light" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pricing
