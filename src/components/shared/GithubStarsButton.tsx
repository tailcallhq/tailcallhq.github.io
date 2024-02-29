import React, {useContext} from "react"
import {GithubStarsContext} from "./GithubStarsProvider"
import {githubRepoURL} from "@site/src/constants"
import GithubIcon from "@site/static/icons/companies/github.svg"
import Link from "@docusaurus/Link"

// Define props types for the GithubStarsButton component
type GithubStarsButtonProps = {
  className: string
}

// Export the GithubStarsButton component
const GithubStarsButton = ({className}: GithubStarsButtonProps): JSX.Element => {
  // Get stars count from context
  const starsCount: number | null = useContext(GithubStarsContext)

  return (
    <Link to={githubRepoURL} target="_blank" className={`${className} header-button header-button-github`}>
      <div className="hidden lg:block button-grid-bg-section-dark h-full w-40 scale-90 opacity-0 hover:scale-[1] hover:opacity-100 transform transition-all ease-out duration-250 active:hidden" />
      <GithubIcon />
      <span>
        Star <span className="min-w-[3ch] inline-block">{starsCount}</span>
      </span>
    </Link>
  )
}

export default GithubStarsButton
