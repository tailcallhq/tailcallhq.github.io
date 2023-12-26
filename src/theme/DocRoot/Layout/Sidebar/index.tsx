import React from "react"
import Sidebar from "@theme-original/DocRoot/Layout/Sidebar"
import Search from "docusaurus-lunr-search/src/theme/SearchBar"

export default function SidebarWrapper(props) {
  return (
    <div className="sidebar-search-container flex flex-col">
      <Search />
      <Sidebar {...props} />
    </div>
  )
}
