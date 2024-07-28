import React from "react"
import {benefits} from "@site/src/constants"
import {ArrowRight} from "lucide-react"

const BenefitsCard = (): JSX.Element => {
  const handleClick = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="mt-16 md:mb-0 mb-10">
      <div className="md:flex md:flex-wrap justify-center gap-10 w-[100%]">
        {benefits.map((item) => (
          <div
            className="group border border-solid border-tailCall-border-dark-300 rounded-3xl md:w-[40%] lg:w-[45%] md:px-10 px-4 py-2 pt-4 lg:flex benefits-drop-shadow hover:border-[#FDEA2E] md:mb-0 mb-6 cursor-pointer"
            key={item.id}
            onClick={() => handleClick(item.redirection_url)}
          >
            <div className="mr-4 md:mt-4">
              <img
                src={item.image}
                alt="Image Describing Why Tailcall"
                className="max-w-[72px] lg:w-[64px] sm:max-w-[110px]"
              />
            </div>
            <div className="mt-4 flex flex-col">
              <p className="text-title-small text-white sm:text-title-large mb-SPACE_02 sm:mb-0 flex flex-start">
                {item.title}{" "}
                <span className="ml-4 md:text-gray-400 group-hover:text-white">
                  <ArrowRight />
                </span>
              </p>
              <p className="text-content-tiny sm:text-content-small text-tailCall-light-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BenefitsCard
