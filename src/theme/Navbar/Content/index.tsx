import React, {type ReactNode, useEffect, useState} from "react"
import {useThemeConfig, ErrorCauseBoundary} from "@docusaurus/theme-common"
import {splitNavbarItems, useNavbarMobileSidebar} from "@docusaurus/theme-common/internal"
import {useHistory} from "react-router-dom"
import {useLocation} from "@docusaurus/router"
import NavbarItem, {type Props as NavbarItemConfig} from "@theme/NavbarItem"

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
import {hackSafariAutoFocus, isSafariEnvBrowser, setBodyOverflow} from "@site/src/utils"

const useNavbarItems = () => {
  // TODO temporary casting until ThemeConfig type is improved (added by docusaurus)
  return useThemeConfig().navbar.items as NavbarItemConfig[]
}

const NavbarItems = ({items}: {items: NavbarItemConfig[]}): JSX.Element => {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  )
}

const NavbarContentLayout = ({left, right}: {left: ReactNode; right: ReactNode}) => {
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
  const location = useLocation()

  // Handlers to control search visibility
  const handleSearchClick = () => {
    setIsSearchModalVisible(true)
  }

  const handleSearchModalClose = () => {
    setIsSearchModalVisible(false)
  }

  // Function to handle zoom behavior based on input focus
  const handleZoomBehavior = () => {
    /* TODO: Figure out a better way to do this */
    const viewportMetaTag = document.querySelector('meta[name="viewport"]') as HTMLMetaElement
    if (viewportMetaTag) {
      // Enable user zooming when no input is in focus
      viewportMetaTag.content = "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
      // Add an event listener to detect when an input is in focus
      document.addEventListener("focusin", handleInputFocus)
      // Remove the event listener when the component unmounts or the modal closes
      return () => {
        document.removeEventListener("focusin", handleInputFocus)
      }
    }
  }

  // Function to handle input focus
  const handleInputFocus = (event: FocusEvent) => {
    const isInput = (event.target as HTMLElement).tagName.toLowerCase() === "input"

    // Disable user zooming when an input is in focus
    const viewportMetaTag = document.querySelector('meta[name="viewport"]') as HTMLMetaElement
    if (viewportMetaTag && isInput) {
      viewportMetaTag.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    }
  }

  useEffect(() => {
    // Check if the current page is within the "/docs/" path to show or hide the search icon
    location.pathname.includes("/docs/") ? setShowSearchIcon(true) : setShowSearchIcon(false)

    // Set up a listener to handle changes in the browser history (navigation)
    const unlisten = history.listen((location, action) => {
      if (action === "PUSH" || action === "POP") {
        // If navigating, hide the search modal and reset the zoom when the modal is closed
        setIsSearchModalVisible(false)
      }
    })

    // Handle modal visibility and behavior
    if (isSearchModalVisible) {
      // If the search modal is visible, prevent body scrolling and handle modal animations
      setBodyOverflow("hidden")
      handleZoomBehavior()
    } else {
      // If the search modal is not visible, allow body scrolling
      setBodyOverflow("initial")
    }

    let unsetHackSafariAutoFocus: () => void = () => {};
    if (isSafariEnvBrowser() && isSearchModalVisible) {
      unsetHackSafariAutoFocus = hackSafariAutoFocus();
    }

    // Clean up history listener when the component unmounts or when dependencies change
    return () => {
      unlisten()
      unsetHackSafariAutoFocus()
    }
  }, [isSearchModalVisible, history])

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
                  <Search autoFocus />
                </div>
                <span
                  className={`${styles.searchDocsClose} ${styles.searchDocsCommon}`}
                  onClick={handleSearchModalClose}
                >
                  Close
                </span>
              </div>
              <div className={styles.initialCase}>
                <PageSearchIcon />
                <div className={styles.searchDocsTitle}>Search Docs</div>
                <div className={`${styles.searchDocsDesc} ${styles.searchDocsCommon}`}>
                  Search anything within the docs
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

const NavbarContent = (): JSX.Element => {
  const mobileSidebar = useNavbarMobileSidebar()

  const items = useNavbarItems()
  const [leftItems, rightItems] = splitNavbarItems(items)

  const searchBarItem = items.find((item) => item.type === "search")

  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items? (added by docusaurus)
        // Render left navbar items
        <>
          <CustomSearch />
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        // TODO stop hardcoding items? (added by docusaurus)
        // Render right navbar items
        <>
          <NavbarItems items={rightItems} />
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

export default NavbarContent
