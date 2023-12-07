import React from "react"
import {SVGProps} from "react"

type ButtonProps = {
  title?: string
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>
  theme: "light" | "dark" | "gray"
  onClick: () => void
}

const Button = ({title, icon, theme, onClick}: ButtonProps) => {
  const generateThemeClasses = () => {
    switch (theme) {
      case "light":
        return "text-tailCall-dark-500 bg-transparent border-2 !border-tailCall-dark-500"

      case "dark":
        return "text-tailCall-light-100 bg-tailCall-dark-700 border-none"

      case "gray":
        return "text-tailCall-dark-100 bg-transparent border-2 !border-tailCall-dark-100"

      default:
        break
    }
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-lg sm:rounded-xl h-12 sm:h-16 sm:min-w-fit text-title-tiny sm:text-title-small cursor-pointer px-6 py-3 sm:px-12 sm:py-5 ${
        generateThemeClasses() ?? ""
      }`}
    >
      {icon && <icon />}
      {title && <span> {title}</span>}
    </button>
  )
}

export default Button
