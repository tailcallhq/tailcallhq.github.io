"use client"
import React, {useContext, useEffect, useState} from "react"
import {GithubStarsContext} from "./GithubStarsProvider"
import {githubRepoURL} from "../../constants"
import Link from "next/link"

// Define props types for the GithubStarsButton component
type GithubStarsButtonProps = {
  className: string
}

// Export the GithubStarsButton component
const GithubStarsButton = ({className}: GithubStarsButtonProps): JSX.Element => {
  const [starsCount, setStarsCount] = useState(0)

  const fetchGithubStars = async () => {
    try {
      const response = await fetch("https://api.github.com/repos/tailcallhq/tailcall")
      const data = await response.json()
      const respStarsCount: number = data.stargazers_count
      setStarsCount(respStarsCount)
      return respStarsCount
    } catch {
      console.error("Failed to fetch Github stars count")
    }
  }

  // Fetch stars count on component mount
  useEffect(() => {
    fetchGithubStars()
  }, [])

  return (
    <Link href={githubRepoURL} target="_blank" className={`${className} header-button header-button-github`}>
      <div className="hidden lg:block button-grid-bg-section-dark h-full w-40 scale-90 opacity-0 hover:scale-[1] hover:opacity-100 transform transition-all ease-out duration-250 active:hidden" />
      <img src="/icons/companies/github.svg" alt="GitHub" className="h-6 w-6" />
      <span>
        Star <span className="min-w-[3ch] inline-block">{starsCount}</span>
      </span>
    </Link>
  )
}

export default GithubStarsButton
