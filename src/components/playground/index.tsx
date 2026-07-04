import React from "react"
import Link from "@docusaurus/Link"
import Playground from "./Playground"
import Announcement from "@site/src/components/shared/Announcement"

const PlaygroundPage = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-3 text-content-small">
        <span>Prefer to build a configuration with a form?</span>
        <Link
          to="/app/config/"
          className="inline-flex items-center gap-1 font-bold text-tailCall-dark-400 bg-tailCall-yellow rounded-lg px-3 py-1 hover:no-underline hover:text-tailCall-dark-400"
        >
          Open the Config Generator →
        </Link>
      </div>
      <Playground />
    </>
  )
}

export default PlaygroundPage
