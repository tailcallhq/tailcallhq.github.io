import React from "react"
import Link from "@docusaurus/Link"
import {socials, tailCallBlogUrl} from "@site/src/constants"
import TailcallLogo from "@site/static/icons/companies/tailcall-white.svg"
import {pageLinks} from "@site/src/constants/routes"

const Footer = (): JSX.Element => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#000000] grid-background-footer pt-SPACE_10 pb-SPACE_05 flex flex-col items-center justify-center gap-SPACE_10 w-full relative px-SPACE_04">
      <TailcallLogo className="w-[120px] h-10" />
      <div className="text-content-tiny sm:text-title-small space-x-SPACE_06 text-tailCall-light-500 z-10">
        <Link
          href={pageLinks.docs}
          className="text-tailCall-light-500 hover:text-tailCall-light-300 hover:no-underline"
        >
          Documentation
        </Link>
        {/*<Link*/}
        {/*  href={pageLinks.about}*/}
        {/*  className="text-tailCall-light-500 hover:text-tailCall-light-300 hover:no-underline"*/}
        {/*>*/}
        {/*  About*/}
        {/*</Link>*/}
        <Link
          href={tailCallBlogUrl}
          className="text-tailCall-light-500 hover:text-tailCall-light-300 hover:no-underline"
        >
          Blog
        </Link>
        <Link
          href={pageLinks.contributors}
          className="text-tailCall-light-500 hover:text-tailCall-light-300 hover:no-underline"
        >
          Contributors
        </Link>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center gap-y-SPACE_04 sm:justify-between w-[100%] max-w-7xl sm:mt-SPACE_10 z-10">
        <p className="text-content-tiny text-tailCall-light-700 font-space-mono font-normal">
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
