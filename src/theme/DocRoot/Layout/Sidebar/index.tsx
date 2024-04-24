import React from "react"
import Sidebar from "@theme-original/DocRoot/Layout/Sidebar"

import Search from "@site/src/components/shared/Search/Search"

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
