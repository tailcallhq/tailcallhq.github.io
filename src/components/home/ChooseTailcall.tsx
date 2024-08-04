import React from "react"
import {chooseTailcall, tailcallFeatures, Theme} from "@site/src/constants"
import LinkButton from "../shared/LinkButton"

const ChooseTailcall = (): JSX.Element => {
  const handleClick = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-title-large max-w-lg mx-auto sm:text-display-tiny lg:text-display-medium text-center my-SPACE_14 sm:mb-SPACE_16 sm:my-32">
        More reasons to choose tailcall.
      </p>
      <div className="flex flex-col lg:flex-row space-y-SPACE_06 items-center justify-between lg:space-x-SPACE_06 lg:space-y-0">
        {chooseTailcall.map((item) => (
          <div
            className="border border-solid border-tailCall-border-dark-300 w-full lg:min-h-[358px] lg:max-w-md rounded-3xl p-SPACE_04 flex flex-col items-start justify-between"
            key={item.id}
          >
            <div className="h-16 w-16 sm:w-full sm:h-full">
              <img src={item.image} alt="Image Describing Why Tailcall" className="max-w-[72px] sm:max-w-[110px]" />
            </div>

            <div>
              <p className="text-title-small sm:text-title-large mt-SPACE_10 mb-SPACE_02 sm:mb-0">{item.title}</p>
              <p className="text-content-tiny sm:text-content-small text-tailCall-light-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row py-10 gap-y-SPACE_10 gap-x-SPACE_03 flex-wrap lg:items-center justify-center">
        {tailcallFeatures.map((item) => (
          <div
            className="flex p-6 border border-solid border-tailCall-border-dark-300 rounded-3xl items-center justify-center cursor-pointer"
            key={item.id}
            onClick={() => handleClick(item.redirection_url)}
          >
            <img src={item.image} alt={`${item.title} Image`} height={24} width={24} />
            <span className="text-content-tiny text-bold ml-2">{item.title}</span>
          </div>
        ))}
      </div>
      <LinkButton
        theme={Theme.Gray}
        onClick={() => handleClick("/docs/graphql-n-plus-one-problem-solved-tailcall/")}
        title="View More"
      />
    </div>
  )
}

export default ChooseTailcall
