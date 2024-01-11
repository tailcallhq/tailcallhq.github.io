import React, {useEffect, useState} from "react"
import {useThemeConfig, ErrorCauseBoundary} from "@docusaurus/theme-common"
import {splitNavbarItems, useNavbarMobileSidebar} from "@docusaurus/theme-common/internal"
import {useHistory} from "react-router-dom"
import NavbarItem, {NavbarItemType} from "@theme/NavbarItem" // Assuming NavbarItemProps

import Search from "docusaurus-lunr-search/src/theme/SearchBar" // Assuming Search is a valid component
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle"
import SearchBar from "@theme/SearchBar"
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle"
import NavbarLogo from "@theme/Navbar/Logo"
import NavbarSearch from "@theme/Navbar/Search"
import GithubStarsButton from "@site/src/components/shared/GithubStarsButton"
import SearchIcon from "@site/static/icons/basic/search.svg"
import PageSearchIcon from "@site/static/icons/basic/page-search.svg"
import styles from "./styles.module.css"

// Function to retrieve navbar items from the theme configuration
function useNavbarItems(): NavbarItemType[] {
  // TODO: temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as unknown as NavbarItemType[]
}

// Component to render a list of NavbarItems
function NavbarItems({items}: {items: NavbarItemType[]}) {
  return (
    <>
      {items.map((item: NavbarItemType, i: number) => (
        // Render each NavbarItem wrapped in ErrorCauseBoundary
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`
            )
          }
        >
          <NavbarItem {...(item as any)} />
        </ErrorCauseBoundary>
      ))}
    </>
  )
}

// Layout for the navbar content
const NavbarContentLayout = ({left, right}: {left: JSX.Element; right: JSX.Element}) => {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  )
}

// Custom search component
const CustomSearch = () => {
  const [showSearchIcon, setShowSearchIcon] = useState<boolean>(false)
  const [isSearchModalVisible, setIsSearchModalVisible] = useState<boolean>(false)
  const history = useHistory()

  // Handlers to control search visibility
  function handleSearchClick() {
    setIsSearchModalVisible(true)
  }

  function handleSearchModalClose() {
    setIsSearchModalVisible(false)
  }

  useEffect(() => {
    // Check pathname for showing the search icon
    window.location.pathname.includes("/docs/") ? setShowSearchIcon(true) : setShowSearchIcon(false)

    // Listen for history changes to close search modal
    const unlisten = history.listen((location, action) => {
      if (action === "PUSH" || action === "POP") {
        setIsSearchModalVisible(false)
      }
    })

    return () => {
      unlisten()
    }
  }, [history])

  useEffect(() => {
    if (isSearchModalVisible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isSearchModalVisible])

  useEffect(() => {
    if (isSearchModalVisible) {
      setTimeout(() => {
        const searchInput = document.getElementById("search_input_react")
        if (searchInput) {
          console.log(searchInput)
          searchInput.focus()
        }
      }, 50)
    }
  }, [isSearchModalVisible])

  return (
    <>
      {showSearchIcon && <SearchIcon onClick={handleSearchClick} className="lg:hidden mr-SPACE_03 h-6 w-6" />}
      {isSearchModalVisible ? (
        <>
          <div onClick={handleSearchModalClose} className={styles.overlay}></div>
          <div className={styles.modal}>
            {/* Search modal content */}
            <div className={styles.modalContent}>
              <div className={styles.search}>
                <div className={styles.searchInput}>
                  <Search />
                </div>
                <span className={styles.searchDocsClose} onClick={handleSearchModalClose}>
                  Close
                </span>
              </div>
              <div className={styles.initialCase}>
                <PageSearchIcon />
                <div className={styles.searchDocsTitle}>Search Docs</div>
                <div className={styles.searchDocsDesc}>Search anything within the docs</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

interface NavbarContentProps {
  position?: "left" | "right"
}

// Main NavbarContent component
export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar()
  const items: any = useNavbarItems()
  const [leftItems, rightItems] = splitNavbarItems<NavbarContentProps>(items)
  const searchBarItem = items.find((item) => item.type === "search")

  return (
    <NavbarContentLayout
      left={
        // Render left navbar items
        <>
          <CustomSearch />
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems as any} />
        </>
      }
      right={
        // Render right navbar items
        <>
          <NavbarItems items={rightItems as any} />
          <GithubStarsButton className="navbar__item navbar__link" />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  )
}
