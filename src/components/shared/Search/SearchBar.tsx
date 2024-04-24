import React from "react"

const SearchInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
}) => {
  return (
    <div className="navbar__search">
      <input
        className="navbar__search-input search-bar ds-input"
        type="search"
        placeholder={placeholder}
        autoFocus={true}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    </div>
  )
}

export default SearchInput
