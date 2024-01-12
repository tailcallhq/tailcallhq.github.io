import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import Sidebar from "@theme-original/DocRoot/Layout/Sidebar"
import Search from "docusaurus-lunr-search/src/theme/SearchBar"
import useIsBrowser from "@docusaurus/useIsBrowser"

import PageSearchIcon from "@site/static/icons/basic/page-search.svg"
import EnterKeyIcon from "@site/static/icons/basic/enter-key.svg"
import UpDownKeyIcon from "@site/static/icons/basic/up-down-key.svg"
import EscapeKeyIcon from "@site/static/icons/basic/escape-key.svg"
import styles from "./styles.module.css"

const CustomSearch = () => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState<boolean>(false)
  const history = useHistory()
  const isBrowser = useIsBrowser()
  const placeholder = isBrowser
    ? window.navigator.userAgent.startsWith("Mac")
      ? "Search ⌘+K"
      : "Search Ctrl+K"
    : "Search"

  // Function to handle opening the search modal
  function handleSearchClick() {
    setIsSearchModalVisible(true)
  }

  // Function to handle closing the search modal
  function handleSearchModalClose() {
    setIsSearchModalVisible(false)
  }

  // Function to control body scroll based on modal visibility
  function setBodyScroll() {
    document.body.style.overflow = isSearchModalVisible ? "hidden" : "auto"
  }

  // Effect to handle body scroll based on modal visibility changes
  useEffect(() => {
    setBodyScroll()
    return () => {
      document.body.style.overflow = "initial"
    }
  }, [isSearchModalVisible])

  // Effect to focus on search input when modal becomes visible
  useEffect(() => {
    if (isSearchModalVisible) {
      setTimeout(() => {
        const searchInput = document.getElementById("search_input_react")
        if (searchInput) {
          searchInput.focus()
        }
      }, 50)
    }
  }, [isSearchModalVisible])

  // Function to handle key press events
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Escape") {
      handleSearchModalClose()
    }
    if (
      (event.metaKey && event.key === "k" && navigator.userAgent.includes("Mac")) ||
      (event.ctrlKey && event.key === "k" && navigator.userAgent.includes("Win"))
    ) {
      handleSearchClick()
    }
  }

  // Effect to handle keydown events for search functionality
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  // Effect to close the search modal when route changes
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === "PUSH" || action === "POP") {
        setIsSearchModalVisible(false)
      }
    })

    return () => {
      unlisten()
    }
  }, [history])

  return (
    <>
      {/* Search input container */}
      <div className={styles.inputContainer} onClick={handleSearchClick}>
        <span aria-label="expand searchbar" role="button" className="search-icon" tabIndex={0}></span>
        <input readOnly placeholder={placeholder} className={styles.input} />
      </div>

      {/* Search modal */}
      {isSearchModalVisible ? (
        <>
          <div onClick={handleSearchModalClose} className={styles.overlay}></div>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <Search />
              <div className={styles.initialCase}>
                <PageSearchIcon />
                <div className={styles.searchDocsTitle}>Search Docs</div>
                <div className={styles.searchDocsDesc}>Search anything within the docs</div>
              </div>
            </div>
            <div className={styles.footer}>
              <div className={styles.navigationInfoItem}>
                <EnterKeyIcon />
                <span>to select</span>
              </div>
              <div className={styles.navigationInfoItem}>
                <UpDownKeyIcon />
                <span>to navigate</span>
              </div>
              <div className={styles.navigationInfoItem}>
                <EscapeKeyIcon />
                <span>to close</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

// Wrapper component combining Sidebar with CustomSearch
export default function SidebarWrapper(props) {
  return (
    <div className="sidebar-search-container flex flex-col">
      <CustomSearch />
      <Sidebar {...props} />
    </div>
  )
}
