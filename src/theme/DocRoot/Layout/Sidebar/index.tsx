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
import {getSearchInputRef, setBodyOverflow} from "@site/src/utils"
import useSearchFocus from "@site/src/hooks/useFocusOnVisible"

const CustomSearch = () => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState<boolean>(false)
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

  useSearchFocus({
    isSearchModalVisible,
    setIsSearchModalVisible,
    handleSearchClick,
    handleSearchModalClose,
  })

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
const SidebarWrapper = (props: SidebarConfig) => {
  return (
    <div className="sidebar-search-container flex flex-col">
      <CustomSearch />
      <Sidebar {...props} />
    </div>
  )
}

export default SidebarWrapper
