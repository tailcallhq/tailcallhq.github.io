import React, {useContext, useState} from "react"
import {GithubStarsContext} from "./GithubStarsProvider"
import {githubRepoURL} from "@site/src/constants"
import GithubIcon from "@site/static/icons/companies/github.svg"

// Define props types for the GithubStarsButton component
type GithubStarsButtonProps = {
  className: string
}

// Export the GithubStarsButton component
export default function GithubStarsButton({className}: GithubStarsButtonProps): JSX.Element {
  // Get stars count from context
  const starsCount: number | null = useContext(GithubStarsContext)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <a
      href={githubRepoURL}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      target="_blank"
      className={`${className} header-button header-button-github ${isHovered ? "button-grid-bg-github" : ""}`}
    >
      <GithubIcon />
      <span>
        Star <span className="min-w-[3ch] inline-block">{starsCount}</span>
      </span>
    </a>
  )
}
