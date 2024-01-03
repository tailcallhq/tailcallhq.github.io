import React from "react"
import Link from "@docusaurus/Link"
import {socials} from "@site/src/constants"
import TailcallLogo from "@site/static/icons/companies/tailcall-white.svg"

const Footer = () => {
  return (
    <footer className="bg-tailCall-dark-700 pt-10 pb-5 flex flex-col items-center justify-center gap-10 w-full relative px-4">
      <img
        src={require("@site/static/images/about/grid-dark.png").default}
        alt=""
        className="absolute inset-0 w-full h-full"
      />
      <TailcallLogo className="w-[120px] h-10" />
      <div className="text-content-tiny sm:text-title-small space-x-6 text-tailCall-light-500 z-10">
        <Link
          href="/docs"
          className="text-tailCall-light-500 hover:text-tailCall-light-300"
          style={{
            textDecorationLine: "none",
          }}
        >
          Documentation
        </Link>
        <Link
          href="/about"
          className="text-tailCall-light-500 hover:text-tailCall-light-300"
          style={{
            textDecorationLine: "none",
          }}
        >
          About
        </Link>
        <Link
          href="https://blog.tailcall.run/"
          className="text-tailCall-light-500 hover:text-tailCall-light-300"
          style={{
            textDecorationLine: "none",
          }}
        >
          Blog
        </Link>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center gap-y-4 sm:justify-between w-[100%] max-w-7xl sm:mt-10 z-10">
        <p className="text-content-tiny text-tailCall-light-700 font-space-mono font-normal">
          Copyright © 2023 Tailcall, Inc.
        </p>
        <div className="space-x-4">
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
