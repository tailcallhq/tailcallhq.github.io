import React from "react"
import Grid from "@site/static/images/about/grid-large.svg"
import Button from "../shared/Button"

const radioOptions = [
  {id: "1", name: "Evaluating", value: "evaluating"},
  {
    id: "2",
    name: "Monolith",
    value: "monolith",
  },
  {
    id: "3",
    name: "Multiple Graphql with Bff",
    value: "bff",
  },
  {
    id: "4",
    name: "Federated",
    value: "federated",
  },
]

const Hello = () => {
  return (
    <section className="relative h-auto">
      <Grid className="absolute inset-0 -z-10 h-[540px] w-full" />

      <div className="p-6 sm:py-20 flex flex-col sm:flex-row sm:items-start justify-center sm:space-x-40">
        <h2 className="text-title-large text-center sm:text-left sm:text-display-large max-w-md">
          Say <span className="bg-tailCall-yellow rounded sm:rounded-2xl px-1 sm:px-2">hello</span> to us!
        </h2>

        <div className="flex flex-col justify-between space-y-7">
          <div className="flex flex-col space-y-2">
            <label id="email" htmlFor="" className="text-content-tiny sm:text-content-small font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="rounded-lg h-11 w-[95%] sm:w-[480px] border border-tailCall-light-400 p-3 text-content-small outline-none focus:border-x-tailCall-light-700"
              placeholder="you@company.com"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-content-tiny sm:text-content-small font-medium mb-0">
              What stage of GraphQL are you in?
            </p>
            <div className="space-y-2">
              {radioOptions.map((option) => (
                <div className="space-x-2" key={option.id}>
                  <input
                    type="radio"
                    name={option.name}
                    id={option.id}
                    value={option.value}
                    className="cursor-pointer checked:border checked:border-tailCall-yellow"
                  />
                  <label htmlFor={option.name} className="text-content-small">
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label id="company" htmlFor="" className="text-content-tiny sm:text-content-small font-medium">
              Tell us about your company
            </label>
            <textarea
              name="company"
              className="rounded-lg h-32 w-[95%] sm:w-[480px] border border-tailCall-light-400 p-3 text-content-small outline-none focus:border-x-tailCall-light-700"
              placeholder="Leave us a message..."
            />
          </div>

          <Button theme="dark" onClick={() => {}} title="Send message" />
        </div>
      </div>
    </section>
  )
}

export default Hello
