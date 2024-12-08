import React from "react"
import LinkButton from "./LinkButton"
import {pageLinks} from "@site/src/constants/routes"
import {Theme} from "@site/src/constants"

const VersionUpdateCard = () => {
  return (
    <div className="flex py-8 px-11 rounded-2xl bg-tailCall-dark-600 justify-between items-center">
      <div className="flex flex-col gap-1">
        <span className="text-title-large text-white">Update to latest version !!</span>
        <span className="text-content-small text-tailCall-light-500">Get the instructions from the docs</span>
      </div>
      <LinkButton title="Get Started" href={pageLinks.introduction} theme={Theme.Tailcall} />
    </div>
  )
}

export default VersionUpdateCard
