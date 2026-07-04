import React, {useEffect, useMemo, useRef, useState} from "react"
import styles from "./styles.module.css"

export type SelectOption = {value: string; label: string; description?: string}

type Props = {
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  placeholder?: string
  allowCustom?: boolean
  ariaLabel?: string
}

// A dependency-free searchable dropdown (combobox). Used everywhere a value is
// drawn from a bounded set — enum variants, HTTP methods, link kinds, and the
// GraphQL type picker — per the issue's "use searchable dropdowns wherever
// possible" requirement.
const SearchableSelect = ({value, options, onChange, placeholder, allowCustom, ariaLabel}: Props): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q))
  }, [options, query])

  useEffect(() => {
    if (!open) return
    const onClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [open])

  useEffect(() => {
    if (open) {
      setActive(0)
      inputRef.current?.focus()
    } else {
      setQuery("")
    }
  }, [open])

  const commit = (next: string) => {
    onChange(next)
    setOpen(false)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActive((i) => Math.min(i + 1, filtered.length - 1))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (event.key === "Enter") {
      event.preventDefault()
      if (filtered[active]) commit(filtered[active].value)
      else if (allowCustom && query.trim()) commit(query.trim())
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  const selected = options.find((o) => o.value === value)
  const label = selected?.label ?? value

  return (
    <div className={styles.select} ref={containerRef}>
      <button
        type="button"
        className={styles.selectButton}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={label ? styles.selectValue : styles.selectPlaceholder}>
          {label || placeholder || "Select…"}
        </span>
        <span className={styles.selectCaret} aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <div className={styles.selectMenu}>
          <input
            ref={inputRef}
            className={styles.selectSearch}
            value={query}
            placeholder={allowCustom ? "Search or type a value…" : "Search…"}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
            aria-label="Filter options"
          />
          <ul className={styles.selectList} role="listbox">
            {filtered.map((option, i) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                className={i === active ? `${styles.selectOption} ${styles.selectOptionActive}` : styles.selectOption}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault()
                  commit(option.value)
                }}
              >
                <span className={styles.selectOptionLabel}>{option.label}</span>
                {option.description && <span className={styles.selectOptionDesc}>{option.description}</span>}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className={styles.selectEmpty}>
                {allowCustom && query.trim() ? `Use "${query.trim()}"` : "No matches"}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchableSelect
