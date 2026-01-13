import React, {useEffect, useMemo, useState} from "react"
import {blogTagsMapping} from "@site/src/constants"
import clsx from "clsx"
import {X, Search} from "lucide-react"
import Link from "@docusaurus/Link"
import styles from "./styles.module.css"

interface TagSelectionModalProps {
  open: boolean
  onClose?: () => void
}

const TagSelectionModal: React.FC<TagSelectionModalProps> = ({open, onClose}) => {
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return

    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }, [open])

  const getSearchResults = () => {
    const results: Record<string, BlogTag[]> = {}
    const lowerCaseQuery = query.toLowerCase()

    for (const [category, tags] of Object.entries(blogTagsMapping)) {
      const matches = tags.filter((tag) => tag.label.toLowerCase().startsWith(lowerCaseQuery))
      if (matches.length) {
        results[category] = matches
      }
    }

    return results
  }

  const handleModalClose = () => {
    setQuery("")

    if (onClose) {
      onClose()
    }
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const searchResults = useMemo(() => {
    return getSearchResults()
  }, [query])

  return (
    <>
      {open ? (
        <>
          {/* Overlay */}
          <div
            className={clsx("block lg:hidden fixed inset-0 bg-black bg-opacity-50", styles.modalOverlay)}
            onClick={handleModalClose}
          ></div>

          {/* Modal Container */}
          <div
            className={clsx(
              "absolute w-full lg:w-4/12 h-full overflow-scroll right-0 bg-white rounded-xl lg:rounded-none lg:border lg:border-solid lg:border-tailCall-border-light-500 px-4 py-8 lg:px-10 lg:py-8 flex flex-col gap-8",
              styles.modalContainer,
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-title-medium lg:text-title-large text-black">Explore All Tags</span>
              <X width={24} height={24} className="cursor-pointer" onClick={handleModalClose} />
            </div>
            <div className="flex flex-col gap-5 pb-36">
              <div className="flex items-center gap-3 border border-solid border-tailCall-border-light-500 rounded-lg py-3 px-6">
                <Search width={20} height={20} className="text-tailCall-light-500" />
                <input
                  name="tag"
                  type="text"
                  value={query}
                  onChange={handleQueryChange}
                  placeholder="Search Tags"
                  className="text-black placeholder:text-tailCall-light-500 border-none outline-none text-content-small"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 lg:gap-y-10">
                {Object.keys(searchResults).map((category: string) => {
                  return (
                    <div className="flex flex-col gap-3 lg:gap-4" key={category}>
                      <span className="text-title-tiny lg:text-title-small text-black">{category}</span>
                      {searchResults?.[category]?.map((tag: BlogTag) => (
                        <Link
                          key={tag.label}
                          to={tag.permalink}
                          onClick={handleModalClose}
                          className="text-content-small text-black px-3 py-1 border border-solid border-tailCall-border-light-500 rounded-3xl w-fit cursor-pointer hover:no-underline"
                        >
                          {tag.label}
                        </Link>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default TagSelectionModal
