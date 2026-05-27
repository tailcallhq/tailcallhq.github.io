import React from "react"
import {benefits} from "@site/src/constants"
import {ArrowRight} from "lucide-react"
import Link from "@docusaurus/Link"
import clsx from "clsx"

const deferredPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="

const BenefitsCard = (): JSX.Element => {
  return (
    <div className="mt-16 mb-10 lg:my-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        {benefits.map((item, index) => (
          <Link
            className={clsx(
              "group border-2 border-solid border-tailCall-border-dark-300 rounded-3xl p-6 flex flex-col md:flex-row items-start hover:border-[#FDEA2E] cursor-pointer hover:no-underline benefits-drop-shadow",
              benefits.length % 2 !== 0 &&
                index === benefits.length - 1 &&
                "md:col-span-2 md:max-w-[calc(50%-20px)] md:mx-auto",
            )}
            key={item.id}
            href={item.redirection_url}
          >
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <img
                src={deferredPixel}
                data-src={item.image}
                alt="Image Describing Why Tailcall"
                className="w-16 h-16 object-contain"
                width={64}
                height={64}
                loading="lazy"
              />
            </div>
            <div className="flex-grow">
              <p className="text-title-small sm:text-title-large text-white mb-2 flex items-center justify-between">
                {item.title}
                <span className="text-gray-400 group-hover:text-white">
                  <ArrowRight size={20} />
                </span>
              </p>
              <p className="text-content-tiny sm:text-content-small text-tailCall-light-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BenefitsCard
