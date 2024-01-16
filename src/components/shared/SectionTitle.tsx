import React from "react"
import GreaterThanUnderscoreIcon from "@site/static/icons/basic/gt-undescore-gray.svg"

type SectionTitleProps = {
  title: string
}

const SectionTitle = ({title}: SectionTitleProps): JSX.Element => {
  return (
    <div className="text-content-tiny sm:text-title-tiny text-tailCall-light-600 space-x-SPACE_01 font-space-mono">
      <GreaterThanUnderscoreIcon className="h-3 sm:h-4 w-6" />
      <span>{title}</span>
    </div>
  )
}

export default SectionTitle
