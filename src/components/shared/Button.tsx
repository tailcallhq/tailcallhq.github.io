import Link from "@docusaurus/Link"
import React, {useEffect} from "react"
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
  const [isHovered, setIsHovered] = React.useState(false)

  const generateThemeClasses = () => {
    switch (theme) {
      case "light":
        return {
          classes: "text-tailCall-dark-500 bg-transparent",
          styles: isHovered ? "2px solid #121315" : "1px solid #121315",
          gridClasses:
            "absolute inset-0 -z-20 w-full h-full opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-10 transform transition ease-out duration-150",
        }

      case "dark":
        return {
          classes: "text-tailCall-light-100 bg-white border-none",
          styles: "2px solid #121315",
          gridClasses:
            "absolute inset-0 z-10 w-full h-full opacity-0 scale-90 group-hover:scale-95 group-hover:opacity-100 transform transition ease-out duration-150",
        }

      case "gray":
        return {
          classes: "text-tailCall-dark-100 bg-transparent text-tailCall-light-100",
          styles: "2px solid #FFFFFF",
          gridClasses: "hidden",
        }

      default:
        break
    }
  }

  useEffect(() => {
    generateThemeClasses()
  }, [isHovered])

  return (
    <Link
      href={href}
      style={{
        textDecorationLine: "none",
      }}
    >
      <button
        disabled={disabled}
        onClick={onClick}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
              className={`lg:block rounded-md lg:rounded-lg absolute inset-0 w-full group-hover:z-0 bg-tailCall-dark-500 lg:group-hover:scale-x-[0.98] lg:group-hover:scale-y-[0.95] transform transition ease-out duration-150`}
            />
            {!disabled && (
              <div className="hidden lg:block button-grid-bg-section h-full w-full scale-90 opacity-0 group-hover:scale-[0.98] group-hover:opacity-100 transform transition ease-out duration-150" />
            )}
          </>
        )}

        {theme === "light" && !disabled && (
          <div className="hidden lg:block button-grid-bg-section-dark h-full w-full scale-90 opacity-0 group-hover:scale-[1] group-hover:opacity-100 transform transition ease-out duration-150" />
        )}
        {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:h-8 lg:w-8 text-white" />}
        {title && <span className="z-20"> {title}</span>}
      </button>
    </Link>
  )
}

export default Button
