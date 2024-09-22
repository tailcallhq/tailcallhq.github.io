import React, {useEffect, useRef, useState} from "react"
import {liteClient} from "algoliasearch/lite"
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
import {DocSearchProps} from "@docsearch/react/dist/esm/index"
import {performSearch} from "./utils"
import SearchInput from "./SearchBar"
import Results from "./Results"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import BrowserOnly from "@docusaurus/BrowserOnly"
import clsx from "clsx"

type DocSearchHit = Parameters<NonNullable<DocSearchProps["transformItems"]>>[0][number]

const SearchRoot = ({isMobile = false}: {isMobile?: boolean}) => {
  const [query, setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 300)
  const [hits, setHits] = useState<DocSearchHit[]>([])
  const modalRef = useRef<HTMLDivElement>(null)

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

  const handleSearchClick = () => {
    setIsSearchModalVisible(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleSearchModalClose()
    }
  }

  const handleSearchModalClose = () => {
    setSelectedIndex(-1)
    setIsSearchModalVisible(false)
    setQuery("")
    setBodyOverflow("initial")
  }

  const handleResultsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex + 1) % hits.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => (prevIndex - 1 + hits.length) % hits.length)
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleSearchModalClose()
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isMobile) return
    if (event.key === "Escape") {
      handleSearchModalClose()
    }
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      setBodyOverflow("hidden")
      handleSearchClick()
    }
  }

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      performSearch({
        searchClient,
        setHits,
        query: debouncedQuery,
        indexName: algoliaConfig.indexName,
      })
    } else {
      setHits([])
    }
  }, [debouncedQuery])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const SearchComponent = () => {
    const SearchTrigger = isMobile ? (
      <SearchIcon onClick={handleSearchClick} className="lg:hidden mr-SPACE_03 h-6 w-6" />
    ) : (
      <div className={"p-5 pb-4"}>
        <span aria-label="expand searchbar" role="button" className="search-icon" tabIndex={0} />
        <input readOnly placeholder={placeholder} onClick={handleSearchClick} className={styles.input} />
      </div>
    )

    const SearchModal = isSearchModalVisible && (
      <div className={"bg-white/15 fixed top-0 left-0 w-full h-full z-[1] backdrop-blur-sm overflow-hidden"}>
        <div
          ref={modalRef}
          className={clsx(
            "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full md:w-[640px] border border-solid border-tailCall-dark-100 md:rounded-lg",
          )}
          onKeyDown={handleResultsKeyDown}
        >
          <div className={clsx(isMobile ? "h-screen overflow-y-auto mt-10" : "h-[340px]")}>
            {renderSearchInput()}
            {renderSearchResults()}
          </div>
          {!isMobile && <SearchFooter />}
        </div>
      </div>
    )

    return (
      <>
        {SearchTrigger}
        {SearchModal}
      </>
    )
  }

  const renderSearchInput = () => {
    if (isMobile) {
      return (
        <div className={styles.search}>
          <div className={styles.searchInput}>
            <SearchInput value={query} onChange={setQuery} placeholder={placeholder} />
          </div>
          <span className={`${styles.searchDocsClose} ${styles.searchDocsCommon}`} onClick={handleSearchModalClose}>
            Close
          </span>
        </div>
      )
    }
    return <SearchInput value={query} onChange={setQuery} placeholder={placeholder} />
  }

  const renderSearchResults = () => {
    if (hits.length > 0) {
      return (
        <div className={clsx("overflow-y-auto", isMobile ? "max-h-full mt-6" : "max-h-[296px]")}>
          <Results hits={hits} selectedIndex={selectedIndex} onClick={handleSearchModalClose} />
        </div>
      )
    }
    return (
      <div
        className={clsx("flex flex-col justify-center items-center", isMobile ? "pt-[100px]" : "h-[calc(100%-44px)]")}
      >
        <PageSearchIcon />
        <div className={styles.searchDocsTitle}>Search Docs</div>
        <div className={styles.searchDocsDesc}>Search anything within the docs</div>
      </div>
    )
  }

  const SearchFooter = () => (
    <div className={styles.footerDesktop}>
      {[
        {Icon: EnterKeyIcon, text: "to select"},
        {Icon: UpDownKeyIcon, text: "to navigate"},
        {Icon: EscapeKeyIcon, text: "to close"},
      ].map(({Icon, text}) => (
        <div key={text} className={styles.navigationInfoItem}>
          <Icon />
          <span>{text}</span>
        </div>
      ))}
    </div>
  )

  return <SearchComponent />
}

export const SearchBar = ({isMobile = false}: {isMobile?: boolean}) => {
  return <BrowserOnly>{() => <SearchRoot isMobile={isMobile} />}</BrowserOnly>
}
