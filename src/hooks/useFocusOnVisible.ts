import {useHistory} from "@docusaurus/router"
import {useEffect, useState} from "react"
import {getSearchInputRef, setBodyOverflow} from "../utils"
import Platform from "react-platform-js"

interface UseSearchFocusProps {
  isSearchModalVisible: boolean
  setIsSearchModalVisible: (value: boolean) => void
  handleSearchClick: () => void
  handleSearchModalClose: () => void
}

const useSearchFocus = ({
  isSearchModalVisible,
  setIsSearchModalVisible,
  handleSearchClick,
  handleSearchModalClose,
}: UseSearchFocusProps) => {
  const history = useHistory()

  // Function to control body scroll based on modal visibility
  const setBodyScroll = () => {
    if (isSearchModalVisible) {
      setBodyOverflow("hidden")
    } else {
      setBodyOverflow("initial")
    }
  }

  // Function to handle key press events
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleSearchModalClose()
    }
    if (
      (event.metaKey && event.key === "k" && Platform.UA.includes("Mac")) ||
      (event.ctrlKey && event.key === "k" && Platform.UA.includes("Win"))
    ) {
      handleSearchClick()
    }
  }

  // Function to observe placeholder changes and focus the input
  const observePlaceholderChange = (callback: () => void) => {
    const searchInput = getSearchInputRef()
    if (searchInput) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "attributes" && mutation.attributeName === "placeholder") {
            callback()
          }
        })
      })

      observer.observe(searchInput, {
        attributes: true, // observe attribute changes
        attributeFilter: ["placeholder"], // specifically for 'placeholder'
      })

      // Return the observer to potentially disconnect it later
      return observer
    }
    return null
  }

  useEffect(() => {
    let observer: MutationObserver | null = null

    // handle body scroll based on modal visibility changes
    setBodyScroll()

    // handle keydown events for search functionality
    document.addEventListener("keydown", handleKeyPress)

    // close the search modal when route changes
    const unlisten = history.listen((location, action) => {
      if (action === "PUSH" || action === "POP") {
        setIsSearchModalVisible(false)
      }
    })

    // focus on search input when modal becomes visible
    if (isSearchModalVisible) {
      observer = observePlaceholderChange(() => {
        const searchInput = getSearchInputRef()
        if (searchInput) {
          console.log("focusing")
          searchInput.focus()
        }
      })
    }

    return () => {
      setBodyOverflow("initial")
      document.removeEventListener("keydown", handleKeyPress)
      unlisten()
      if (observer) {
        observer.disconnect()
      }
    }
  }, [isSearchModalVisible, history])

  return {isSearchModalVisible, setIsSearchModalVisible}
}

export default useSearchFocus
