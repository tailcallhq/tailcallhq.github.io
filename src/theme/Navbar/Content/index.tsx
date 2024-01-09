import React, {useEffect, useState} from "react"
import {useThemeConfig, ErrorCauseBoundary} from "@docusaurus/theme-common"
import {splitNavbarItems, useNavbarMobileSidebar} from "@docusaurus/theme-common/internal"
import {useHistory} from "react-router-dom"
import NavbarItem from "@theme/NavbarItem"
import Search from "docusaurus-lunr-search/src/theme/SearchBar"
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle"
import SearchBar from "@theme/SearchBar"
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle"
import NavbarLogo from "@theme/Navbar/Logo"
import NavbarSearch from "@theme/Navbar/Search"
import styles from "./styles.module.css"
import GithubStarsButton from "@site/src/components/shared/GithubStarsButton"
import SearchIcon from "@site/static/icons/basic/search.svg"
import PageSearchIcon from "@site/static/icons/basic/page-search.svg"

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items
}
function NavbarItems({items}) {
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

const NavbarContentLayout = ({left, right}) => {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  )
}

const CustomSearch = () => {
  const [showSearchIcon, setShowSearchIcon] = useState(false)
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
  const history = useHistory()

  function handleSearchClick() {
    setIsSearchModalVisible(true)
  }

  function handleSearchModalClose() {
    setIsSearchModalVisible(false)
  }

  useEffect(() => {
    window.location.pathname.includes("/docs/") ? setShowSearchIcon(true) : setShowSearchIcon(false)

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
      {showSearchIcon && <SearchIcon onClick={handleSearchClick} className="sm:hidden mr-3 h-6 w-6" />}
      {isSearchModalVisible ? (
        <>
          <div onClick={handleSearchModalClose} className={styles.overlay}></div>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.search}>
                <div className={styles.searchInput}>
                  <Search />
                </div>
                <span className="text-content-tiny font-bold text-tailCall-dark-100" onClick={handleSearchModalClose}>
                  Close
                </span>
              </div>
              <div className={styles.initialCase}>
                <PageSearchIcon />
                <div className="mt-2 font-bold">Search Docs</div>
                <div className="text-content-tiny text-tailCall-dark-100">Search anything within the docs</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar()
  const items = useNavbarItems()
  const [leftItems, rightItems] = splitNavbarItems(items)
  const searchBarItem = items.find((item) => item.type === "search")

  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          <CustomSearch />
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
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
