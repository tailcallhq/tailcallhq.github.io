import Link from "@docusaurus/Link"
import React from "react"
import {SVGProps} from "react"

type ButtonProps = {
  title?: string
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>>
  theme: "light" | "dark" | "gray"
  onClick?: () => void
  href?: string
  width?: string
}

const Button = ({title, Icon, theme, onClick, href, width}: ButtonProps) => {
  const generateThemeClasses = () => {
    switch (theme) {
      case "light":
        return "text-tailCall-dark-500 bg-transparent !border-2 !border-tailCall-dark-500"

      case "dark":
        return "text-tailCall-light-100 bg-tailCall-dark-700 border-none"

      case "gray":
        return "text-tailCall-dark-100 bg-transparent !border-2 !border-tailCall-dark-100"

      default:
        break
    }
  }

  return (
    <Link
      href={href}
      style={{
        textDecorationLine: "none",
      }}
    >
      <button
        onClick={onClick}
        className={`flex items-center justify-center space-x-3 no-underline rounded-lg sm:rounded-xl h-12 sm:h-16 text-content-small font-bold sm:text-title-small cursor-pointer px-6 py-3 sm:px-8 lg:px-10 sm:py-4 lg:py-5 ${
          generateThemeClasses() ?? ""
        }`}
        style={{
          width: width ? width : "fit-content",
        }}
      >
        {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:h-8 lg:w-8" />}
        {title && <span> {title}</span>}
      </button>
    </Link>
  )
}

export default Button
