import React, {useEffect, useState} from "react"
import { liteClient} from "algoliasearch/lite"
import PageSearchIcon from "@site/static/icons/basic/page-search.svg"
import EnterKeyIcon from "@site/static/icons/basic/enter-key.svg"
import UpDownKeyIcon from "@site/static/icons/basic/up-down-key.svg"
import EscapeKeyIcon from "@site/static/icons/basic/escape-key.svg"
import useIsBrowser from "@docusaurus/useIsBrowser"
import Platform from "react-platform-js"
import styles from "@site/src/theme/Navbar/Content/styles.module.css"
import {useDebounce} from "use-debounce"
import SearchIcon from "@site/static/icons/basic/search.svg"
import {setBodyOverflow} from "@site/src/utils"
import { DocSearchProps } from "@docsearch/react/dist/esm/index"
import {performSearch} from "./utils"
import SearchInput from "./SearchBar"
import Results from "./Results"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import BrowserOnly from "@docusaurus/BrowserOnly"
type DocSearchHit = Parameters<NonNullable<DocSearchProps['transformItems']>>[0][number]

const SearchRoot = ({isMobile = false}: {isMobile?: boolean}) => {
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 300)
  const [hits, setHits] = useState<DocSearchHit[]>([])
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const {siteConfig} = useDocusaurusContext()
  const isBrowser = useIsBrowser()
  const placeholder = isBrowser ? (Platform.OS.startsWith("Mac") ? "Search ⌘+K" : "Search Ctrl+K") : "Search"
  const algoliaConfig = siteConfig?.customFields?.algoliaConfig as {
    appId: string
    apiKey: string
    indexName: string
  }
  const searchClient = liteClient(algoliaConfig.appId, algoliaConfig.apiKey)

  const SearchMobile = () => {
    return (
      <>
        <SearchIcon onClick={handleSearchClick} className="lg:hidden mr-SPACE_03 h-6 w-6" />
        {isSearchModalVisible && (
          <div>
            <div onClick={handleSearchModalClose} className={styles.overlay}></div>
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <div className={styles.search}>
                  <div className={styles.searchInput}>
                    <SearchInput value={query} onChange={setQuery} placeholder={placeholder} />
                  </div>
                  <span
                    className={`${styles.searchDocsClose} ${styles.searchDocsCommon}`}
                    onClick={handleSearchModalClose}
                  >
                    Close
                  </span>
                </div>
                {hits.length > 0 && query.length > 0 ? (
                  <div className="overflow-y-auto max-h-full mt-6">
                    <Results hits={hits} selectedIndex={0} onClick={handleSearchModalClose} />
                  </div>
                ) : (
                  <div className={styles.initialCase}>
                    <PageSearchIcon />
                    <div className={styles.searchDocsTitle}>Search Docs</div>
                    <div className={`${styles.searchDocsDesc} ${styles.searchDocsCommon}`}>
                      Search anything within the docs
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  const SearchDesktop = () => {
    return (
      <>
        <div className={styles.inputContainer}>
          <span aria-label="expand searchbar" role="button" className="search-icon" tabIndex={0}></span>
          <input readOnly placeholder={placeholder} onClick={handleSearchClick} className={styles.input} />
        </div>
        {isSearchModalVisible ? (
          <>
            <div onClick={handleSearchModalClose} className={styles.overlayDesktop}></div>
            <div className={styles.modalDesktop}>
              <div className={styles.modalContentDesktop}>
                <SearchInput value={query} onChange={setQuery} placeholder={placeholder} />
                {hits.length > 0 ? (
                  <div className="overflow-y-auto max-h-[296px]">
                    <Results hits={hits} selectedIndex={selectedIndex} onClick={handleSearchModalClose} />
                  </div>
                ) : (
                  <div className={styles.initialCaseDesktop}>
                    <PageSearchIcon />
                    <div className={styles.searchDocsTitle}>Search Docs</div>
                    <div className={styles.searchDocsDesc}>Search anything within the docs</div>
                  </div>
                )}
              </div>
              <div className={styles.footerDesktop}>
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

  const handleSearchClick = () => {
    setIsSearchModalVisible(true)
  }

  const handleSearchModalClose = () => {
    setSelectedIndex(-1)
    setIsSearchModalVisible(false)
    setQuery("")
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        handleSearchModalClose()
        break
      case "k":
        if ((event.metaKey && Platform.UA.includes("Mac")) || (event.ctrlKey && Platform.UA.includes("Win"))) {
          handleSearchClick()
        }
        break
      case "ArrowUp":
        event.preventDefault()
        setSelectedIndex((prevIndex) => (prevIndex <= 0 ? hits.length - 1 : prevIndex - 1))
        break
      case "ArrowDown":
        event.preventDefault()
        setSelectedIndex((prevIndex) => (prevIndex === hits.length - 1 ? 0 : prevIndex + 1))
        break
      default:
        break
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)

    if (isSearchModalVisible) {
      setBodyOverflow("hidden")
    } else {
      setBodyOverflow("initial")
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      setSelectedIndex(-1)
    }
  }, [isSearchModalVisible])

  useEffect(() => {
    performSearch({
      searchClient,
      setHits,
      query: debouncedQuery,
      indexName: algoliaConfig.indexName,
    })
  }, [debouncedQuery])

  return <>{isMobile ? <SearchMobile /> : <SearchDesktop />}</>
}

const SearchBar = ({isMobile = false}: {isMobile?: boolean}) => {
  return <BrowserOnly>{() => <SearchRoot isMobile={isMobile} />}</BrowserOnly>
}

export default SearchBar
