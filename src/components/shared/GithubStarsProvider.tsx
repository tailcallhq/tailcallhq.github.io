import React, {createContext, useEffect, useState} from "react"

export const GithubStarsContext = createContext(null)

const sessionStorage = {
  get(key) {
    if (typeof window !== "undefined" && window.sessionStorage) {
      return window.sessionStorage.getItem(key)
    }
  },

  set(key, val) {
    if (typeof window !== "undefined" && window.sessionStorage) {
      return window.sessionStorage.setItem(key, val)
    }
  },
}

export default function GithubStarsProvider({children}) {
  const [starsCount, setStarsCount] = useState(sessionStorage.get("githubStars") || "")

  function fetchGithubStars() {
    return fetch("https://api.github.com/repos/tailcallhq/tailcall")
      .then((resp) => {
        return resp.json()
      })
      .then((resp) => {
        const respStarsCount = resp.stargazers_count || "250"
        setStarsCount(respStarsCount)
        sessionStorage.set("githubStars", respStarsCount)
        return respStarsCount
      })
  }

  useEffect(() => {
    if (sessionStorage.get("githubStars")) {
      return
    }
    fetchGithubStars()
  }, [])

  return <GithubStarsContext.Provider value={starsCount}>{children}</GithubStarsContext.Provider>
}
