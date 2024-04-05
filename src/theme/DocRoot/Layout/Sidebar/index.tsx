import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import Sidebar from "@theme-original/DocRoot/Layout/Sidebar"

import useIsBrowser from "@docusaurus/useIsBrowser"
import Platform from "react-platform-js"
import Search from '@site/src/components/shared/Search';
import PageSearchIcon from "@site/static/icons/basic/page-search.svg"
import EnterKeyIcon from "@site/static/icons/basic/enter-key.svg"
import UpDownKeyIcon from "@site/static/icons/basic/up-down-key.svg"
import EscapeKeyIcon from "@site/static/icons/basic/escape-key.svg"
import styles from "./styles.module.css"
import {getSearchInputRef, setBodyOverflow} from "@site/src/utils"


// Wrapper component combining Sidebar with CustomSearch
const SidebarWrapper = (props: SidebarConfig) => {
  return (
    <div className="sidebar-search-container flex flex-col">
      <Search />
      <Sidebar {...props} />
    </div>
  )
}

export default SidebarWrapper
