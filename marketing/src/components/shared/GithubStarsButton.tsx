"use client"
import React, {useEffect, useState} from "react"
import Link from "next/link"
import {githubRepoURL} from "../../constants"

const GithubStarsButton = (): JSX.Element => {
  const [starsCount, setStarsCount] = useState<number>(() => {
    const savedStars = window.localStorage.getItem("githubStars")
    return savedStars ? parseInt(savedStars) : 0
  })

  const fetchGithubStars = async () => {
    try {
      const response = await fetch("https://api.github.com/repos/tailcallhq/tailcall")
      const data = await response.json()
      if (response.ok) {
        const respStarsCount: number = data.stargazers_count
        setStarsCount(respStarsCount)
        window.localStorage.setItem("githubStars", respStarsCount.toString())
        return respStarsCount
      }
    } catch {
      console.error("Failed to fetch Github stars count")
    }
  }
  useEffect(() => {
    fetchGithubStars()
  }, [])

  return (
    <Link
      href={githubRepoURL}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative navbar__item navbar__link header-button header-button-github`}
    >
      <div className="hidden lg:block button-grid-bg-section-dark h-full w-40 scale-90 opacity-0 hover:scale-[1] hover:opacity-100 transform transition-all ease-out duration-250 active:hidden" />
      <img src="/icons/companies/github.svg" alt="GitHub" className="h-6 w-6 mr-2" />
      <span className="font-semibold text-[1.25rem]">
        Star <span className="min-w-[3ch] inline-block">{starsCount}</span>
      </span>
    </Link>
  )
}

export default GithubStarsButton
