'use client';
import React, {useCallback, useEffect, useState} from "react"
import toast, {Toaster} from "react-hot-toast"
import LinkButton from "../shared/LinkButton"
import ReactGA from "react-ga4"
import { zapierLink, radioOptions, Theme } from "@/constants"
import { validateEmail, analyticsHandler } from "@/utils"

const Hello = (): JSX.Element => {
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [stage, setStage] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(true)

  const sendData = useCallback(async () => {
    if (!validateEmail(email)) {
      setIsValid(false)
      return
    }
    const response = await fetch(zapierLink, {
      method: "POST",
      body: JSON.stringify({
        email,
        stage,
        message,
      }),
    })

    const data = await response.json()

    if (data.status === "success") {
      toast.success("Thank you for contacting us.", {
        duration: 3000,
      })
      analyticsHandler("Contact Page", "Click", "Send message")
      setEmail("")
      setMessage("")
      setStage("")
      setIsValid(true)
    }
  }, [email, message, stage])

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Contact Page"})
  }, [])

  return (
    <section className="relative h-auto">
      <Toaster />
      <img className="absolute inset-0 -z-10 h-[540px] w-full" src="/images/about/grid-large.svg" />

      <div className="p-SPACE_06 sm:py-SPACE_10 lg:py-SPACE_20 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-40">
        <h1
          className="text-title-large text-center sm:text-left sm:text-display-medium lg:text-display-large lg:max-w-md"
        >
          Say <span className="bg-tailCall-yellow rounded sm:rounded-2xl px-SPACE_01 sm:px-SPACE_02">hello</span> to us!
        </h1>

        <div className="flex flex-col justify-between space-y-SPACE_07 w-full sm:w-fit">
          <div className="flex flex-col space-y-SPACE_02">
            <label id="email" className="text-content-tiny sm:text-content-small font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (!isValid) setIsValid(true)
              }}
              className={`border border-solid border-tailCall-border-light-500 rounded-lg font-space-grotesk h-11 w-[95%] sm:w-[480px] 
              p-SPACE_03 text-content-small outline-none focus:border-x-tailCall-light-700  ${
                isValid ? "is-valid" : "is-invalid"
              }`}
              placeholder="you@company.com"
            />
            {!isValid && <div className="text-red-400">Please enter a valid email.</div>}
          </div>

          <div className="flex flex-col space-y-SPACE_02">
            <p className="text-content-tiny sm:text-content-small font-medium mb-0">
              What stage of GraphQL are you in?
            </p>
            <div className="space-y-SPACE_03 radio-group">
              {radioOptions.map((option) => (
                <div className="flex items-center space-x-SPACE_02 " key={option.id}>
                  <input
                    type="radio"
                    name={option.name}
                    id={option.id}
                    value={option.value}
                    checked={stage === option.value}
                    onChange={() => setStage(option.value)}
                    className="radio-button"
                  />
                  <label htmlFor={option.id} className="text-content-small radio-label cursor-pointer">
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

          <LinkButton theme={Theme.Dark} onClick={sendData} title="Send message" disabled={!(email && stage)} href="javascript:void(0)" />
        </div>
      </div>
    </section>
  )
}

export default Hello
