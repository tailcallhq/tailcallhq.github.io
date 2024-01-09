import React, {useEffect, useRef, useState} from "react"
import Sidebar from "@theme-original/DocRoot/Layout/Sidebar"
import Search from "docusaurus-lunr-search/src/theme/SearchBar"
import {useHistory} from "react-router-dom"
import useIsBrowser from "@docusaurus/useIsBrowser"
import PageSearchIcon from "@site/static/icons/basic/page-search.svg"
import EnterKeyIcon from "@site/static/icons/basic/enter-key.svg"
import UpDownKeyIcon from "@site/static/icons/basic/up-down-key.svg"
import EscapeKeyIcon from "@site/static/icons/basic/escape-key.svg"
import styles from "./styles.module.css"

const CustomSearch = () => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
  const history = useHistory()
  const searchInputRef = useRef(null)
  const isBrowser = useIsBrowser()
  const placeholder = isBrowser
    ? window.navigator.userAgent.startsWith("Mac")
      ? "Search ⌘+K"
      : "Search Ctrl+K"
    : "Search"

  function handleSearchClick() {
    setIsSearchModalVisible(true)
  }

  function handleSearchModalClose() {
    setIsSearchModalVisible(false)
  }

  function setBodyScroll() {
    document.body.style.overflow = isSearchModalVisible ? "hidden" : "auto"
  }

  useEffect(() => {
    setBodyScroll()
    return () => {
      document.body.style.overflow = "initial"
    }
  }, [isSearchModalVisible])

  function handleKeyPress(event) {
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

  useEffect(() => {
    if (isSearchModalVisible && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchModalVisible])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

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
      <div className={styles.inputContainer} onClick={handleSearchClick}>
        <span aria-label="expand searchbar" role="button" className="search-icon" tabIndex={0}></span>
        <input readOnly placeholder={placeholder} className={styles.input} ref={searchInputRef} />
      </div>
      {isSearchModalVisible ? (
        <>
          <div onClick={handleSearchModalClose} className={styles.overlay}></div>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <Search ref={searchInputRef} />
              <div className={styles.initialCase}>
                <PageSearchIcon />
                <div className="mt-2 font-bold">Search Docs</div>
                <div className="text-content-tiny text-tailCall-dark-100">Search anything within the docs</div>
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

export default function SidebarWrapper(props) {
  return (
    <div className="sidebar-search-container flex flex-col">
      <CustomSearch />
      <Sidebar {...props} />
    </div>
  )
}
