import React, {useEffect, useState, useRef} from "react"
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
import {SearchBar} from "@site/src/components/shared/Search/Search"

// Wrapper component combining Sidebar with CustomSearch
const SidebarWrapper = (props: SidebarConfig) => {
  return (
    <div className="sidebar-search-container flex flex-col lg:mb-[100px]">
      <SearchBar />
      <Sidebar {...props} />
    </div>
  )
}

export default SidebarWrapper
