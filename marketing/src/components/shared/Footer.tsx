import React from "react"
import {socials, tailCallBlogUrl} from "../../constants"
import {pageLinks} from "../../constants/routes"
import Link from "next/link"
import Image from "./Image"

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-tailCall-dark-700 pt-SPACE_10 pb-SPACE_05 flex flex-col items-center justify-center gap-SPACE_10 w-full relative px-SPACE_04">
      <Image src={"/images/about/grid-dark.png"} alt="footer background" className="absolute inset-0 w-full h-full" />
      <Image alt="tailcall logo" className="w-[120px] h-10" src="/icons/companies/tailcall-white.svg" />
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
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center gap-y-SPACE_04 sm:justify-between w-[100%] max-w-7xl sm:mt-SPACE_10 z-10">
        <p className="text-content-tiny text-tailCall-light-700 font-mono pb-4 md:pb-0">
          Copyright © 2024 Tailcall, Inc.
        </p>
        <div className="flex space-x-SPACE_04 pb-4">
          {socials.map((social) => (
            <Link href={social.href} className="cursor-pointer" key={social.id}>
              <Image alt={social.alt} src={social.image} className="h-6 w-6" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
