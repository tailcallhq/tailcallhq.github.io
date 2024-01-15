import React, {useState} from "react"

import Grid from "@site/static/images/about/grid-large.svg"
import LinkButton from "../shared/LinkButton"
import {analyticsHandler} from "@site/src/utils"
import {Theme, radioOptions} from "@site/src/constants"

const Hello = () => {
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [stage, setStage] = useState<string>("")

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
      analyticsHandler("Contact Page", "Click", "Send message")
      setEmail("")
      setMessage("")
      setStage("")
    }
  }

  return (
    <section className="relative h-auto">
      <Grid className="absolute inset-0 -z-10 h-[540px] w-full" />

      <div className="p-SPACE_06 sm:py-SPACE_10 lg:py-SPACE_20 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-40 lg:h-[85vh]">
        <h2 className="text-title-large text-center sm:text-left sm:text-display-medium lg:text-display-large lg:max-w-md">
          Say <span className="bg-tailCall-yellow rounded sm:rounded-2xl px-SPACE_01 sm:px-SPACE_02">hello</span> to us!
        </h2>

        <div className="flex flex-col justify-between space-y-SPACE_07 w-full sm:w-fit">
          <div className="flex flex-col space-y-SPACE_02">
            <label id="email" className="text-content-tiny sm:text-content-small font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: "1px solid var(--ifm-color-brand-light-500)",
              }}
              className="rounded-lg font-space-grotesk h-11 w-[95%] sm:w-[480px] p-SPACE_03 text-content-small outline-none focus:border-x-tailCall-light-700"
              placeholder="you@company.com"
            />
          </div>

          <div className="flex flex-col space-y-SPACE_02">
            <p className="text-content-tiny sm:text-content-small font-medium mb-0">
              What stage of GraphQL are you in?
            </p>
            <div className="space-y-SPACE_03 radio-group">
              {radioOptions.map((option) => (
                <div className="flex items-center space-x-SPACE_02" key={option.id}>
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

          <div className="flex flex-col space-y-SPACE_02">
            <label id="company" htmlFor="" className="text-content-tiny sm:text-content-small font-medium">
              Tell us about your company
            </label>
            <textarea
              name="company"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-lg font-space-grotesk h-32 w-[95%] sm:w-[480px] border border-tailCall-light-400 p-SPACE_03 text-content-small outline-none focus:border-x-tailCall-light-700"
              placeholder="Leave us a message..."
            />
          </div>

          <LinkButton theme={Theme.Dark} onClick={sendData} title="Send message" disabled={!(email && stage)} />
        </div>
      </div>
    </section>
  )
}

export default Hello
