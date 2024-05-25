"use client"

import Link from "next/link"
import React, {useState} from "react"
import GithubStarsButton from "./GithubStarsButton"
import DiscordButton from "./DiscordButton"

const headerConfig = {
  logo: {
    src: "/icons/companies/taicall.svg",
    alt: "tailcall",
  },
  navItems: [
    {name: "Home", href: "/", active: true},
    {name: "Docs", href: "/docs"},
    {name: "Blog", href: "/blog"},
    {name: "Developers", href: "/developers"},
  ],
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="relative flex items-center justify-between px-4 py-5 md:py-8 border-b">
      <div className="flex items-center">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={headerConfig.logo.src} alt={headerConfig.logo.alt} className="h-7 md:h-10 mr-4" />
        </Link>
      </div>
      <div className="flex items-center md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
          <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M4 7h22M4 15h22M4 23h22"
            ></path>
          </svg>
        </button>
      </div>
      <nav className="hidden md:flex md:space-x-10">
        {headerConfig.navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`rounded font-semibold text-[1.25rem] px-2 py-1 ${item.active ? "bg-tailCall-yellow" : ""}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="hidden md:flex space-x-4">
        <DiscordButton />
        <GithubStarsButton />
      </div>
      {isMobileMenuOpen && (
        <nav className="absolute top-[71px] left-0 w-full bg-white flex flex-col items-start p-4 space-y-2 md:hidden z-50 border border-b">
          {headerConfig.navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`rounded font-semibold text-[1.25rem] px-2 py-1 ${item.active ? "bg-tailCall-yellow" : ""}`}
            >
              {item.name}
            </Link>
          ))}
          <DiscordButton />
          <GithubStarsButton />
        </nav>
      )}
    </header>
  )
}

export default Header
