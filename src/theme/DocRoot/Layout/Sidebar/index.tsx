import React from "react"
import Sidebar from "@theme-original/DocRoot/Layout/Sidebar"
import SearchBar from "@site/src/components/shared/Search/Search"

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
