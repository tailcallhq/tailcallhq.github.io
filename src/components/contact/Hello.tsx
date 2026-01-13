import React, {useCallback, useState} from "react"
import Heading from "@theme/Heading"
import toast, {Toaster} from "react-hot-toast"
import Grid from "@site/static/images/about/grid-large.svg"
import {analyticsHandler, validateEmail} from "@site/src/utils"
import {zapierLink} from "@site/src/constants"
import {LoaderCircle} from "lucide-react"

const Hello = (): JSX.Element => {
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [stage, setStage] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isStageValid, setIsStageValid] = useState<boolean>(true)
  const [showLoader, setShowLoader] = useState(true)

  const sendData = useCallback(async () => {
    if (!email || !stage) {
      setIsStageValid(Boolean(stage))
      setIsValid(validateEmail(email))
      return
    }
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
      setIsStageValid(true)
    }
  }, [email, message, stage])

  return (
    <section className="relative h-auto">
      <Toaster />
      <Grid className="absolute inset-0 -z-10 h-[540px] w-full" />

      <div className="p-SPACE_06 sm:py-SPACE_10 lg:py-SPACE_20 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-40">
        <Heading
          as="h2"
          className="text-title-large text-center sm:text-left sm:text-display-medium lg:text-display-large lg:max-w-md"
        >
          Say <span className="bg-tailCall-yellow rounded sm:rounded-2xl px-SPACE_01 sm:px-SPACE_02">hello</span> to us!
        </Heading>

        <div className="flex flex-col justify-between space-y-SPACE_07 w-full md:w-fit">
          {showLoader && (
            <div className="w-full md:w-[640px] h-[80vh] flex justify-center items-center">
              <LoaderCircle className="animate-spin" size={40} />
            </div>
          )}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfn6qZlC7ST_LyKmGYPrZEBckQyQm2WNhME9CPJktvR--1mow/viewform?embedded=true"
            className="w-full md:w-[640px]"
            height="1000"
            onLoad={() => {
              setShowLoader(false)
            }}
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default Hello
