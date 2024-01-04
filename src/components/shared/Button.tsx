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
  disabled?: boolean
}

const Button = ({title, Icon, theme, onClick, href, width, disabled}: ButtonProps) => {
  const generateThemeClasses = () => {
    switch (theme) {
      case "light":
        return {
          classes: "text-tailCall-dark-500 bg-transparent",
          styles: "1px solid var(--ifm-color-dark-800)",
          gridClasses: "",
        }

      case "dark":
        return {
          classes: "text-tailCall-light-100 bg-white border-none",
          styles: "2px solid var(--ifm-color-dark-800)",
          gridClasses: "",
        }

      case "gray":
        return {
          classes: "text-tailCall-dark-100 bg-transparent text-tailCall-light-100",
          styles: "2px solid var(--ifm-color-white)",
          gridClasses: "hidden",
        }

      default:
        return {
          classes: "",
          styles: "",
          gridClasses: "",
        }
    }
  }

  return (
    <Link
      to={href || "#"}
      style={{
        textDecorationLine: "none",
      }}
    >
      <button
        disabled={disabled}
        onClick={onClick}
        className={`group relative disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center gap-x-3 no-underline rounded-lg sm:rounded-xl h-12 sm:h-16 text-content-small font-bold sm:text-title-small cursor-pointer px-6 py-3 sm:px-8 lg:px-10 sm:py-4 lg:py-5 
        ${generateThemeClasses().classes ?? ""}
        `}
        style={{
          width: width ? width : "fit-content",
          border: generateThemeClasses().styles,
        }}
      >
        {theme === "dark" && (
          <>
            <div
              className={`lg:block rounded-md lg:rounded-lg absolute inset-0 w-full bg-tailCall-dark-500 group-hover:lg:scale-x-[0.98] group-hover:lg:scale-y-[0.95] transform transition-all ease-out duration-250`}
            />
            {!disabled && (
              <div className="hidden lg:block button-grid-bg-section h-full w-full scale-90 opacity-0 group-hover:scale-[0.98] group-hover:opacity-100 transform transition-all ease-out duration-250" />
            )}
          </>
        )}

        {theme === "light" && !disabled && (
          <div className="hidden lg:block button-grid-bg-section-dark h-full w-full scale-90 opacity-0 group-hover:scale-[1] group-hover:opacity-100 transform transition-all ease-out duration-250" />
        )}
        {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:h-8 lg:w-8 text-white" />}
        {title && <span className="z-20"> {title}</span>}
      </button>
    </Link>
  )
}

export default Button
