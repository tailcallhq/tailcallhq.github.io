import React from "react"
import Image from "./Image"

type SectionTitleProps = {
  title: string
}

const SectionTitle = ({title}: SectionTitleProps): JSX.Element => {
  return (
    <div className="text-content-tiny flex items-center sm:text-title-tiny text-tailCall-light-600 space-x-SPACE_01 font-space-mono">
      <Image alt="decorative" className="h-3 sm:h-4 w-6" src="icons/basic/gt-undescore-gray.svg" />
      <span>{title}</span>
    </div>
  )
}

export default SectionTitle
