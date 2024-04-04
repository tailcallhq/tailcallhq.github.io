import React, {} from "react"
import Sidebar from "@theme-original/DocRoot/Layout/Sidebar"
import SearchBar from '@theme-original/SearchBar';





// Wrapper component combining Sidebar with CustomSearch
const SidebarWrapper = (props: SidebarConfig) => {
  return (
    <div className="sidebar-search-container flex flex-col">
      <SearchBar />
      <Sidebar {...props} />
    </div>
  )
}

export default SidebarWrapper
