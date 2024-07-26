import React from "react"
import {benefits} from "@site/src/constants"
import {ArrowRight} from "lucide-react"

const BenefitsCard = (): JSX.Element => {
  return (
    <div className="grid md:grid-cols-2 mt-16 grid-cols-1 gap-10 w-[100%]">
      {benefits.map((item) => (
        <div
          className="group border border-solid border-tailCall-border-dark-300  rounded-3xl md:px-10 px-4 py-2 pt-4 md:flex benefits-drop-shadow hover:border-[#FDEA2E]"
          key={item.id}
        >
          <div className="mr-4 md:mt-4">
            <img
              src={item.image}
              alt="Image Describing Why Tailcall"
              className="max-w-[72px] lg:w-[64px] sm:max-w-[110px]"
            />
          </div>
          <div className="mt-4">
            <p className="text-title-small text-white sm:text-title-large  mb-SPACE_02 sm:mb-0 flex flex-start">
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
  )
}

export default BenefitsCard
