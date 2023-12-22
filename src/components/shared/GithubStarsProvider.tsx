import React, {createContext, useEffect, useState} from "react"

export const GithubStarsContext = createContext(null)

const storage = {
  get(key) {
    if (typeof window !== "undefined" && window["__tc_data__"]) {
      return window["__tc_data__"][key]
    }
    return null
  },

  set(key, val) {
    if (typeof window !== "undefined") {
      window["__tc_data__"] = window["__tc_data__"] || {}
      window["__tc_data__"][key] = val
    }
  },
}

export default function GithubStarsProvider({children}) {
  const [starsCount, setStarsCount] = useState(storage.get("githubStars"))

  function fetchGithubStars() {
    return fetch("https://api.github.com/repos/tailcallhq/tailcall")
      .then((resp) => {
        return resp.json()
      })
      .then((resp) => {
        const respStarsCount = resp.stargazers_count || "250"
        setStarsCount(respStarsCount)
        storage.set("githubStars", respStarsCount)
        return respStarsCount
      })
  }

  useEffect(() => {
    fetchGithubStars()
  }, [])

  return <GithubStarsContext.Provider value={starsCount}>{children}</GithubStarsContext.Provider>
}
