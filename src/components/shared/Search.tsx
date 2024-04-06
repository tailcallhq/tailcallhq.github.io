import React, {useEffect, useRef, useState} from "react"
import algoliasearch from "algoliasearch/lite"
import {InstantSearch, useSearchBox, useHits, Highlight} from "react-instantsearch-hooks-web"
import PageSearchIcon from "@site/static/icons/basic/page-search.svg"
import EnterKeyIcon from "@site/static/icons/basic/enter-key.svg"
import UpDownKeyIcon from "@site/static/icons/basic/up-down-key.svg"
import EscapeKeyIcon from "@site/static/icons/basic/escape-key.svg"

import useIsBrowser from "@docusaurus/useIsBrowser"
import Platform from "react-platform-js"
import styles from "@site/src/theme/DocRoot/Layout/Sidebar/styles.module.css"
import {useDebounce} from "use-debounce"
import { HitsItem } from "./types"

const algoliaConfig = {
  appId: "R2IYF7ETH7",
  apiKey: "599cec31baffa4868cae4e79f180729b",
  indexName: "docsearch",
}

const SearchRoot = () => {
  const {query, refine} = useSearchBox()
  const {hits} = useHits()
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
  const [focusedHitIndex, setFocusedHitIndex] = useState(0)
  const focusedRef = useRef<HTMLDivElement>(null)
  const isBrowser = useIsBrowser()

  const placeholder = isBrowser ? (Platform.OS.startsWith("Mac") ? "Search ⌘+K" : "Search Ctrl+K") : "Search"

  const SearchBox = () => {
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
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </div>
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
      case 'Enter':
        window.location.href = (hits as unknown as HitsItem[])[focusedHitIndex].url
        break
      default:
        break
    }
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
              className={`hit ${isFocused ? "bg-[#F1F1F1]" : ""} p-2.5 pl-4`}
              onMouseEnter={() => setFocusedHitIndex(globalIndex)}
              onMouseLeave={() => setFocusedHitIndex(-1)}
            >
              <a href={hit.url} className="no-underline text-black">
                <div className="mb-1.25">
                  <p dangerouslySetInnerHTML={{ __html: hit?._snippetResult?.content?.value }}></p>
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

  useEffect(() => {
    if (focusedHitIndex >= 0 && focusedHitIndex < hits.length) {
      focusedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      })
    }
  }, [focusedHitIndex])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [hits.length])

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
          <div onClick={handleSearchModalClose} className={styles.overlay}></div>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <SearchBox />
              {hits.length > 0 ? (
                <div className="overflow-y-auto max-h-[296px]">
                  <Results />
                </div>
              ) : (
                <div className={styles.initialCase}>
                  <PageSearchIcon />
                  <div className={styles.searchDocsTitle}>Search Docs</div>
                  <div className={styles.searchDocsDesc}>Search anything within the docs</div>
                </div>
              )}
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

const SearchBar = () => {
  const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey)
  return (
    <InstantSearch searchClient={searchClient} indexName={algoliaConfig.indexName}>
      <SearchRoot />
    </InstantSearch>
  )
}

export default SearchBar
