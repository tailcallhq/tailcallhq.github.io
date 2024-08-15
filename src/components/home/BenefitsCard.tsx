import React from "react"
import {benefits} from "@site/src/constants"
import {ArrowRight} from "lucide-react"
import Link from "@docusaurus/Link"

const BenefitsCard = (): JSX.Element => {
  return (
    <div className="mt-16 md:mb-0 mb-10">
      <div className="grid md:grid-cols-2 gap-10 w-full">
        {benefits.map((item, index) => (
          <Link
            className={`group border-2 border-solid border-tailCall-border-dark-300 rounded-3xl p-6 flex flex-col md:flex-row items-start hover:border-[#FDEA2E] cursor-pointer hover:no-underline benefits-drop-shadow ${index === benefits.length - 1 && benefits.length % 2 !== 0 ? "md:col-span-2 md:max-w-[50%] md:mx-auto" : ""}`}
            key={item.id}
            href={item.redirection_url}
          >
            <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              <img src={item.image} alt="Image Describing Why Tailcall" className="w-16 h-16 object-contain" />
            </div>
            <div className="flex flex-col">
              <p className="text-title-small md:text-title-large text-white mb-2 flex items-center">
                {item.title}
                <ArrowRight className="ml-2 text-gray-400 group-hover:text-white" />
              </p>
              <p className="text-content-tiny md:text-content-small text-tailCall-light-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BenefitsCard
