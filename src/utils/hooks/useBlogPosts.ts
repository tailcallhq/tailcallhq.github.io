import {useState, useMemo} from "react"
import type {Props} from "@theme/BlogListPage"

const DEFAULT_CATEGORY = "All"

export function useBlogPosts(items: Props["items"]) {
  const [activeCategory, setActiveCategory] = useState<string>(DEFAULT_CATEGORY)
  const [visibleItems, setVisibleItems] = useState(7)

  const filteredItems = useMemo(() => {
    return activeCategory === DEFAULT_CATEGORY
      ? items
      : items.filter((item) => item.content.metadata.frontMatter.category === activeCategory)
  }, [items, activeCategory])

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    setVisibleItems(7)
  }

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 6, filteredItems.length))
  }

  return {
    activeCategory,
    visibleItems,
    filteredItems,
    handleCategoryClick,
    handleLoadMore,
  }
}
