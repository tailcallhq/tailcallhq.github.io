import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import Sidebar from "@theme-original/DocRoot/Layout/Sidebar"
import Search from "docusaurus-lunr-search/src/theme/SearchBar"
import useIsBrowser from "@docusaurus/useIsBrowser"
import Platform from "react-platform-js"

import PageSearchIcon from "@site/static/icons/basic/page-search.svg"
import EnterKeyIcon from "@site/static/icons/basic/enter-key.svg"
import UpDownKeyIcon from "@site/static/icons/basic/up-down-key.svg"
import EscapeKeyIcon from "@site/static/icons/basic/escape-key.svg"
import styles from "./styles.module.css"
import {setBodyOverflow} from "@site/src/utils"

const CustomSearch = () => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState<boolean>(false)
  const history = useHistory()
  const isBrowser = useIsBrowser()
  const placeholder = isBrowser ? (Platform.OS.startsWith("Mac") ? "Search ⌘+K" : "Search Ctrl+K") : "Search"

  // Function to handle opening the search modal
  const handleSearchClick = () => {
    setIsSearchModalVisible(true)
  }

  // Function to handle closing the search modal
  const handleSearchModalClose = () => {
    setIsSearchModalVisible(false)
  }

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

  useEffect(() => {
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

    return () => {
      setBodyOverflow("initial")
      document.removeEventListener("keydown", handleKeyPress)
      unlisten()
    }
  }, [isSearchModalVisible, history])

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
              <Search autoFocus />
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
const SidebarWrapper = (props: SidebarConfig) => {
  return (
    <div className="sidebar-search-container flex flex-col lg:mb-[100px]">
      <CustomSearch />
      <Sidebar {...props} />
    </div>
  )
}

export default SidebarWrapper
