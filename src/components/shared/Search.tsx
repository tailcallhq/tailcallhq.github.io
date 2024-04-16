import React, {useEffect, useRef, useState} from "react"
import algoliasearch from "algoliasearch/lite"
import {InstantSearch, useSearchBox, useHits, Highlight} from "react-instantsearch-hooks-web"
import PageSearchIcon from "@site/static/icons/basic/page-search.svg"
import EnterKeyIcon from "@site/static/icons/basic/enter-key.svg"
import UpDownKeyIcon from "@site/static/icons/basic/up-down-key.svg"
import EscapeKeyIcon from "@site/static/icons/basic/escape-key.svg"
import useIsBrowser from "@docusaurus/useIsBrowser"
import Platform from "react-platform-js"
import styles from "@site/src/theme/Navbar/Content/styles.module.css"
import {useDebounce} from "use-debounce"
import {HitsItem} from "./types"
import SearchIcon from "@site/static/icons/basic/search.svg"
import {setBodyOverflow} from "@site/src/utils"
import {useHistory} from "react-router-dom"

const algoliaConfig = {
  appId: "X27WDVHRQ3",
  apiKey: "35bc100f239853cd8a7195b23ed7393b",
  indexName: "tailcall",
}

const SearchRoot = () => {
  const {query, refine} = useSearchBox()
  const {hits} = useHits()
  const history = useHistory()
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [focusedHitIndex, setFocusedHitIndex] = useState(0)
  const focusedRef = useRef<HTMLDivElement>(null)
  const isBrowser = useIsBrowser()

  const placeholder = isBrowser ? (Platform.OS.startsWith("Mac") ? "Search ⌘+K" : "Search Ctrl+K") : "Search"

  const SearchInput = () => {
    const [value, setValue] = useState(query)
    const [debouncedValue] = useDebounce(value, 300)

    useEffect(() => {
      if (debouncedValue !== query) {
        refine(debouncedValue)
      }
    }, [debouncedValue])

    return (
      <div className="navbar__search">
        <input
          className="navbar__search-input search-bar ds-input"
          type="search"
          placeholder={placeholder}
          autoFocus={true}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </div>
    )
  }

  const Results = () => {
    const groupedHits = (hits as unknown as HitsItem[]).reduce<Record<string, HitsItem[]>>((acc, hit) => {
      const lvl0 = hit.hierarchy.lvl0 as string
      if (!acc[lvl0]) {
        acc[lvl0] = []
      }
      acc[lvl0].push(hit)
      return acc
    }, {})

    let globalIndex = 0

    return Object.entries(groupedHits).map(([lvl0, groupedHits]) => (
      <div key={lvl0} className="group">
        <div className="font-bold mb-1.25 bg-[#DBDDE1] pl-4">{lvl0}</div>
        {groupedHits.map((hit) => {
          const isFocused = globalIndex === focusedHitIndex
          const ref = isFocused ? focusedRef : null
          const hitElement = (
            <div
              key={hit.objectID}
              ref={ref}
              tabIndex={0}
              className={`hit ${isFocused ? "bg-[#F1F1F1]" : ""} p-2.5 pl-4 scroll-mt-7`}
              onMouseEnter={() => setFocusedHitIndex(globalIndex)}
              onMouseLeave={() => setFocusedHitIndex(-1)}
            >
              <a href={hit.url} className="no-underline text-black">
                <div className="mb-1.25">
                  <p dangerouslySetInnerHTML={{__html: hit?._snippetResult?.content?.value}}></p>
                </div>
                {hit.hierarchy.lvl1 && <p>{hit.hierarchy.lvl1 as string}</p>}
              </a>
            </div>
          )
          globalIndex++
          return hitElement
        })}
      </div>
    ))
  }

  const SearchMobile = () => {
    return (
      <>
        <SearchIcon onClick={handleSearchClick} className="lg:hidden mr-SPACE_03 h-6 w-6" />
        {isSearchModalVisible && (
          <div>
            <div onClick={handleSearchModalClose} className={styles.overlay}></div>
            <div className={styles.modal}>
              {/* Search modal content */}
              <div className={styles.modalContent}>
                <div className={styles.search}>
                  <div className={styles.searchInput}>
                    <SearchInput />
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
                    <Results />
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
        {/* Search input container */}
        <div className={styles.inputContainer}>
          <span aria-label="expand searchbar" role="button" className="search-icon" tabIndex={0}></span>
          <input readOnly placeholder={placeholder} onClick={handleSearchClick} className={styles.input} />
        </div>
        {/* Search modal */}
        {isSearchModalVisible ? (
          <>
            <div onClick={handleSearchModalClose} className={styles.overlayDesktop}></div>
            <div className={styles.modalDesktop}>
              <div className={styles.modalContentDesktop}>
                <SearchInput />
                {hits.length > 0 ? (
                  <div className="overflow-y-auto max-h-[296px]">
                    <Results />
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
    setIsSearchModalVisible(false)
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
      case "ArrowDown":
        setFocusedHitIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % hits.length
          return newIndex
        })
        break
      case "ArrowUp":
        setFocusedHitIndex((prevIndex) => {
          const newIndex = (prevIndex - 1 + hits.length) % hits.length
          return newIndex
        })
        break
      case "Enter":
       const hitUrl = (hits as unknown as HitsItem[])[focusedHitIndex].url;
       setIsSearchModalVisible(false)
       if (hitUrl.startsWith('http')) {
         const url = new URL(hitUrl);
         const path = url.pathname + url.search + url.hash;
         history.push(path);
       } else {
         history.push(hitUrl);
       }
        break
      default:
        break
    }
  }

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("resize", handleResize)

    if (focusedHitIndex >= 0 && focusedHitIndex < hits.length) {
      focusedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      })
    }

    if (isSearchModalVisible) {
      setBodyOverflow("hidden")
    } else {
      setBodyOverflow("initial")
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [focusedHitIndex, isSearchModalVisible, hits.length])

  return <>{isMobile ? <SearchMobile /> : <SearchDesktop />}</>
}

const SearchBar = () => {
  const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey)
  return (
    <InstantSearch searchClient={searchClient} indexName={algoliaConfig.indexName}>
      <SearchRoot />
    </InstantSearch>
  )
}

export default SearchBar
