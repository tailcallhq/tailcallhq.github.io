import React from "react"
import SearchBar from "@theme-original/SearchBar"
import type SearchBarType from "@theme/SearchBar"
import type {WrapperProps} from "@docusaurus/types"
import "./styles.css"

type Props = WrapperProps<typeof SearchBarType>

export default function Search(props: Props): JSX.Element {
  return (
    <>
      <SearchBar {...props} />
    </>
  )
}
