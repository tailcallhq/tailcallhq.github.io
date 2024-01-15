import Link from "@docusaurus/Link"
import {Theme} from "@site/src/constants"
import React from "react"
import {SVGProps} from "react"
import {useHistory} from "react-router-dom"

type LinkButtonProps = {
  title?: string
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>> // Define the type of Icon prop
  theme: Theme
  onClick?: () => void
  href?: string
  width?: string
  disabled?: boolean
}

const LinkButton = ({title, Icon, theme, onClick, href, width, disabled}: LinkButtonProps) => {
  const history = useHistory()
  // Generate classes based on the provided theme
  const generateThemeClasses = () => {
    const themes = {
      [Theme.Light]: {
        classes: "text-tailCall-dark-500 bg-transparent hover:text-tailCall-dark-500",
        styles: "1px solid var(--ifm-color-brand-dark-100)",
        gridClasses: "",
      },
      [Theme.Dark]: {
        classes: "text-tailCall-light-100 bg-white border-none hover:text-tailCall-light-100",
        styles: "2px solid var(--ifm-color-brand-dark-100)",
        gridClasses: "",
      },
      [Theme.Gray]: {
        classes: "text-tailCall-light-100 bg-transparent hover:text-tailCall-light-100",
        styles: "2px solid var(--ifm-color-white)",
        gridClasses: "hidden",
      },
    }

    return themes[theme] || {classes: "", styles: "", gridClasses: ""}
  }

  // const handleClick = () => {
  //   onClick && onClick()
  //   href && history.push(href, "_blank")
  // }

  return (
    <Link
      to={href || "#"}
      onClick={onClick}
      className={`group relative disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center gap-x-SPACE_03 hover:no-underline rounded-lg sm:rounded-xl h-12 sm:h-16 text-content-small font-bold sm:text-title-small cursor-pointer px-SPACE_06 py-SPACE_03 sm:px-SPACE_08 lg:px-SPACE_10 sm:py-SPACE_04 lg:py-SPACE_05 
      ${generateThemeClasses().classes ?? ""} ${disabled ? "cursor-not-allowed opacity-20" : ""} 
      `}
      style={{
        width: width ? width : "fit-content",
        border: generateThemeClasses().styles,
      }}
    >
      {/* Conditionally render background elements based on theme and disabled state */}
      {theme === "dark" && (
        <>
          <div
            className={`lg:block rounded-md lg:rounded-lg absolute inset-0  w-full bg-tailCall-dark-500 group-hover:lg:scale-x-[0.98] group-hover:lg:scale-y-[0.95] transform transition-all ease-out duration-250`}
          />
          {!disabled && (
            <div className="hidden lg:block button-grid-bg-section h-full w-full scale-90 opacity-0 group-hover:scale-[0.98] group-hover:opacity-100 transform transition-all ease-out duration-250" />
          )}
        </>
      )}
      {theme === "light" && !disabled && (
        <div className="hidden lg:block button-grid-bg-section-dark h-full w-full scale-90 opacity-0 group-hover:scale-[1] group-hover:opacity-100 transform transition-all ease-out duration-250" />
      )}
      {/* Render Icon if provided */}
      {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:h-8 lg:w-8 text-white" />}
      {/* Render title if provided */}
      {title && <span className="z-20"> {title}</span>}
    </Link>
  )
}

export default LinkButton
