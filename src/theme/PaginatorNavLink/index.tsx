import React from "react"
import Link from "@docusaurus/Link"
import type {Props} from "@theme/PaginatorNavLink"
import {ArrowRight} from "lucide-react"
import {ArrowLeft} from "lucide-react"

function NavigatorIcon({isNext}: {isNext: boolean}): JSX.Element {
  return (
    <div className="w-10 h-10 p-2 bg-tailCall-yellow flex justify-center items-center rounded-full">
      {isNext ? <ArrowRight size={24} color="black" /> : <ArrowLeft size={24} color="black" />}
    </div>
  )
}

export default function PaginatorNavLink(props: Props): JSX.Element {
  const {permalink, title, subLabel, isNext} = props
  return (
    <Link className="!no-underline flex gap-3 items-center" to={permalink}>
      {!isNext && <NavigatorIcon isNext={isNext!} />}
      <div className="hidden md:block">
        {subLabel && <div className="text-tailCall-dark-100 text-[12px] font-medium">{subLabel}</div>}
        <div className="pagination-nav__label text-black text-content-small font-medium">{title}</div>
      </div>
      {isNext && <NavigatorIcon isNext={isNext} />}
    </Link>
  )
}
