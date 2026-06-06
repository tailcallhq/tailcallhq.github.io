import React, {useState, useRef, useEffect} from "react"
import {ChevronDown, Search, X} from "lucide-react"

interface Option {
  value: any
  label: string
}

interface SearchableSelectProps {
  options: Option[]
  value: any
  onChange: (value: any) => void
  placeholder?: string
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({options, value, onChange, placeholder = "Select..."}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedOption = options.find((opt) => opt.value === value)

  const handleSelect = (option: Option) => {
    onChange(option.value)
    setIsOpen(false)
    setSearchTerm("")
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(undefined)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-SPACE_04 py-SPACE_03 border border-solid border-tailCall-border-light-500 rounded-lg text-content-small outline-none focus:border-tailCall-yellow bg-white flex items-center justify-between hover:border-tailCall-border-light-600 transition-colors"
      >
        <span className={selectedOption ? "text-tailCall-dark-700" : "text-tailCall-dark-100"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="flex items-center gap-SPACE_02">
          {selectedOption && (
            <button
              onClick={handleClear}
              className="hover:text-tailCall-dark-500 text-tailCall-dark-100"
              type="button"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-SPACE_01 bg-white border border-solid border-tailCall-border-light-500 rounded-lg shadow-lg max-h-64 overflow-hidden">
          <div className="p-SPACE_02 border-b border-solid border-tailCall-border-light-300">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-SPACE_03 top-1/2 transform -translate-y-1/2 text-tailCall-dark-100"
              />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-SPACE_03 py-SPACE_02 border border-solid border-tailCall-border-light-500 rounded text-content-small outline-none focus:border-tailCall-yellow"
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-48">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-SPACE_04 py-SPACE_03 text-content-small hover:bg-tailCall-border-light-100 transition-colors ${
                    option.value === value ? "bg-tailCall-border-light-100 font-medium" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-SPACE_04 py-SPACE_06 text-center text-content-small text-tailCall-dark-100">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchableSelect
