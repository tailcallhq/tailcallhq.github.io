import React from "react"
import LinkButton from "../shared/LinkButton"
import {pageLinks} from "@site/src/constants/routes"
import {Theme} from "@site/src/constants"
import {analyticsHandler} from "@site/src/utils"
import BgTailcall from "@site/static/icons/basic/bg-dark-tailcall.svg"

interface CallToActionProps {
  title: string
  subtitle: string
  buttonText: string
}

const CallToAction: React.FC<CallToActionProps> = ({title, subtitle, buttonText}) => {
  return (
    <section className="flex flex-col justify-center px-4 py-4 max-w-3xl mx-auto">
      <div className="relative flex flex-col max-md:space-y-6 md:flex-row md:items-center p-8 bg-neutral-900 rounded-2xl overflow-hidden max-md:p-6">
        <BgTailcall className="absolute inset-0 w-full h-full object-cover opacity-5 z-0 max-w-none max-h-none" />
        <div className="relative z-10 flex flex-col flex-1 space-y-2.5 text-center max-md:text-left md:text-left">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
          <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">{subtitle}</p>
        </div>
        <div className="relative z-10 mt-6 max-md:w-full max-md:flex max-md:justify-center md:mt-0 md:ml-6 md:flex-shrink-0">
          <LinkButton
            title={buttonText}
            href={pageLinks.docs}
            theme={Theme.Tailcall}
            width="auto"
            onClick={() => analyticsHandler("Blog", "Click", "Get Started")}
          />
        </div>
      </div>
    </section>
  )
}

export default CallToAction
