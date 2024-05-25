import Link from "next/link"
import React from "react"
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
  return (
    <header className="flex items-center justify-between px-4 py-8 border-b">
      <div className="flex items-center">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={headerConfig.logo.src} alt={headerConfig.logo.alt} className="h-10 mr-4" />
        </Link>
      </div>
      <nav className="flex space-x-10">
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
      <div className="flex space-x-4">
        <DiscordButton />
        <GithubStarsButton />
      </div>
    </header>
  )
}

export default Header
