import React, {useEffect, useRef, forwardRef, useImperativeHandle} from "react"
import {getSearchInputRef} from "@site/src/utils"
import SearchBar from "docusaurus-lunr-search/src/theme/SearchBar"

const Search = forwardRef((props, ref) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    searchInputRef.current = getSearchInputRef() as HTMLInputElement
  }, [])

  const handleFocus = () => {
    const input = searchInputRef.current
    if (input) {
      if (input.disabled) {
        const observer = new MutationObserver((mutationsList, observer) => {
          for (const mutation of mutationsList) {
            if (mutation.type === "attributes" && mutation.attributeName === "disabled") {
              if (!input.disabled) {
                input.focus()
                observer.disconnect()
              }
              return
            }
          }
        })
        observer.observe(input, {attributeFilter: ["disabled"]})
      } else {
        input.focus()
      }
    }
  }

  useImperativeHandle(ref, () => ({
    focus: handleFocus,
  }))

  return <SearchBar />
})

export default Search
