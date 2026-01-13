import React from "react"
import Link from "@docusaurus/Link"
import {footerItems, socials} from "@site/src/constants"
import TailcallLogo from "@site/static/icons/companies/tailcall-white.svg"
import {useCookieConsentManager} from "./CookieConsentProvider"

const Footer = (): JSX.Element => {
  const {openCookieConsentModal} = useCookieConsentManager()
  const year = new Date().getFullYear()
  return (
    <footer className="flex flex-col relative w-full relative px-4 py-8 lg:px-40 lg:pt-20 lg:pb-0 bg-tailCall-dark-700 grid-dark gap-4 lg:gap-8">
      <div className="grid grid-cols-2 gap-8 lg:flex lg:gap-32 xl:gap-64 w-full z-10">
        <TailcallLogo className="w-[120px] h-10 col-span-2" />
        {footerItems.map((category: FooterItem, idx: number) => {
          return (
            <div className="flex flex-col gap-4 lg:gap-6" key={idx}>
              <span className="text-content-small font-bold lg:text-title-small text-white leading-[20px] lg:leading-[26px]">
                {category.title}
              </span>
              {category.items.map((footerItem: FooterLink, index: number) => {
                return (
                  <Link
                    key={index}
                    href={footerItem.link}
                    className="text-content-small lg:text-content-medium text-tailCall-light-500 hover:text-tailCall-light-300 hover:no-underline leading-[20px] lg:leading-[26px]"
                  >
                    {footerItem.name}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between w-[100%] lg:w-full z-10 py-2 lg:py-6 gap-2 lg:gap-0">
        <p
          className="text-content-mini lg:text-content-tiny text-tailCall-light-700 font-space-mono font-normal cursor-pointer mb-0"
          onClick={openCookieConsentModal}
        >
          Cookie Settings
        </p>
        <p className="text-content-mini lg:text-content-tiny text-tailCall-light-700 font-space-mono font-normal mb-0">
          Copyright © {year} Tailcall, Inc.
        </p>
        <div className="space-x-SPACE_04">
          {socials.map((social) => (
            <Link href={social.href} className="cursor-pointer" key={social.id}>
              <social.image className="h-6 w-6" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
