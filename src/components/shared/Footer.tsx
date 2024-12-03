import React from "react"
import Link from "@docusaurus/Link"
import {footerLinks, socials} from "@site/src/constants"
import TailcallLogo from "@site/static/icons/companies/tailcall-white.svg"
import {useCookieConsentManager} from "./CookieConsentProvider"

const Footer = (): JSX.Element => {
  const {openCookieConsentModal} = useCookieConsentManager()
  const year = new Date().getFullYear()
  return (
    <footer
      className="bg-tailCall-dark-700 grid-dark pt-SPACE_16 pb-SPACE_05 flex flex-col items-center 
      justify-center gap-SPACE_10 w-full relative px-SPACE_04"
    >
      <TailcallLogo className="w-[120px] h-10 z-10" />
      <div className="text-content-tiny sm:text-title-small space-x-SPACE_06 text-tailCall-light-500 z-10">
        {footerLinks.map((footerLink: FooterLink, index: number) => {
          return (
            <Link
              key={index}
              href={footerLink.link}
              className="text-tailCall-light-500 hover:text-tailCall-light-300 hover:no-underline"
            >
              {footerLink.name}
            </Link>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-y-SPACE_04 sm:justify-between w-[100%] max-w-7xl sm:mt-SPACE_10 z-10">
        <p
          className="text-content-tiny text-tailCall-light-700 font-space-mono font-normal cursor-pointer mb-0 sm:mb-5 order-2 sm:order-1"
          onClick={openCookieConsentModal}
        >
          Cookie Settings
        </p>
        <p className="text-content-tiny text-tailCall-light-700 font-space-mono font-normal mb-0 sm:mb-5 order-3 sm:order-2">
          Copyright © {year} Tailcall, Inc.
        </p>
        <div className="space-x-SPACE_04 order-1 sm:order-3">
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
