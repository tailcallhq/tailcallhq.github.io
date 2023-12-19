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
  const [email, setEmail] = React.useState<string>("")
  const [message, setMessage] = React.useState<string>("")
  const [stage, setStage] = React.useState<string>("")

  const sendData = async () => {
    const response = await fetch("https://hooks.zapier.com/hooks/catch/2793322/3a1gxp2/", {
      method: "POST",
      body: JSON.stringify({
        email,
        stage,
        message,
      }),
    })

    const data = await response.json()

    if (data.status === "success") {
      setEmail("")
      setMessage("")
      setStage("")
    }
  }

  return (
    <section className="relative h-auto">
      <Grid className="absolute inset-0 -z-10 h-[540px] w-full" />

      <div className="p-6 sm:py-10 lg:py-20 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-40">
        <h2 className="text-title-large text-center sm:text-left sm:text-display-medium lg:text-display-large lg:max-w-md">
          Say <span className="bg-tailCall-yellow rounded sm:rounded-2xl px-1 sm:px-2">hello</span> to us!
        </h2>

        <div className="flex flex-col justify-between space-y-7 w-full sm:w-fit">
          <div className="flex flex-col space-y-2">
            <label id="email" className="text-content-tiny sm:text-content-small font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg h-11 w-[95%] sm:w-[480px] border border-tailCall-light-400 p-3 text-content-small outline-none focus:border-x-tailCall-light-700"
              placeholder="you@company.com"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-content-tiny sm:text-content-small font-medium mb-0">
              What stage of GraphQL are you in?
            </p>
            <div className="space-y-3 radio-group">
              {radioOptions.map((option) => (
                <div className="flex items-center space-x-2" key={option.id}>
                  <input
                    type="radio"
                    name="graphqlStage"
                    id={option.id}
                    value={option.value}
                    checked={stage === option.value}
                    onChange={() => setStage(option.value)}
                    className="radio-button"
                  />
                  <label htmlFor={option.name} className="text-content-small radio-label">
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-lg h-32 w-[95%] sm:w-[480px] border border-tailCall-light-400 p-3 text-content-small outline-none focus:border-x-tailCall-light-700"
              placeholder="Leave us a message..."
            />
          </div>

          <Button theme="dark" onClick={sendData} title="Send message" disabled={!(email && stage)} />
        </div>
      </div>
    </section>
  )
}

export default Hello
