import type {Props} from "@theme/BlogListPage"
import clsx from "clsx"
import React, {useMemo} from "react"

interface BlogCategoriesProps {
  items: Props["items"]
  onCategoryClick: (category: string) => void
  activeCategory: string | null
}

export function BlogCategories({items, onCategoryClick, activeCategory}: BlogCategoriesProps): JSX.Element {
  const categories = useMemo(() => {
    const categoryCounts: Record<string, number> = {All: items.length}
    items.map((item) => {
      const category = item.content.metadata.frontMatter.category as string
      if (typeof category === "string") {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1
      }
    })
    return categoryCounts
  }, [items])

  return (
    <div className="mb-4 md:mb-5 flex items-center space-x-4 border-b border-gray-200">
      {Object.entries(categories).map(([name, count]) => (
        <div
          aria-role="button"
          aria-label={`${name} (${count})`}
          key={name}
          onClick={() => onCategoryClick(name === activeCategory ? "All" : name)}
          className={clsx(
            "text-content-small md:text-title-tiny cursor-pointer appearance-none border-none bg-transparent px-1",
            activeCategory === name
              ? "!font-medium text-black border-b-solid border-b-2 border-black"
              : "!font-normal text-tailCall-dark-200 hover:text-gray-700",
          )}
        >
          {name}
        </div>
      ))}
    </div>
  )
}
