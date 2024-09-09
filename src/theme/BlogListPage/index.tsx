import React, {useMemo, useState} from "react"
import clsx from "clsx"

import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import {PageMetadata, HtmlClassNameProvider, ThemeClassNames} from "@docusaurus/theme-common"
import BlogLayout from "@theme/BlogLayout"
import BlogListPaginator from "@theme/BlogListPaginator"
import SearchMetadata from "@theme/SearchMetadata"
import type {Props} from "@theme/BlogListPage"
import BlogListPageStructuredData from "@theme/BlogListPage/StructuredData"
import BlogFeaturedPosts from "../BlogFeaturedPosts"
import BlogPostList from "../BlogPostList"
import {BlogCategories} from "../BlogCategories"

function BlogListPageMetadata(props: Props): JSX.Element {
  const {metadata} = props
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext()
  const {blogDescription, blogTitle, permalink} = metadata
  const isBlogOnlyMode = permalink === "/"
  const title = isBlogOnlyMode ? siteTitle : blogTitle
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  )
}

function BlogListPageContent({metadata, items, sidebar}: Props): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [visibleItems, setVisibleItems] = useState(5)

  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? items
      : items.filter((item) => item.content.metadata.frontMatter.category === activeCategory)
  }, [items, activeCategory])

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    setVisibleItems(5)
  }

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 5, filteredItems.length))
  }

  return (
    <BlogLayout sidebar={sidebar}>
      <div className="flex flex-col md:flex-row items-start w-full">
        <div className="w-full md:w-8/12 px-4">
          <BlogCategories items={items} onCategoryClick={handleCategoryClick} activeCategory={activeCategory} />
          <BlogPostList items={filteredItems.slice(0, visibleItems)} />
          {visibleItems < filteredItems.length && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                className="mt-4 h-12 cursor-pointer rounded-lg border-2 border-solid border-tailCall-border-dark-100 bg-transparent px-4 py-2 font-space-grotesk text-title-tiny font-bold text-black"
              >
                Load more blogs
              </button>
            </div>
          )}
          <BlogListPaginator metadata={metadata} />
        </div>
        <div className="w-full md:w-4/12 hidden md:block">
          <BlogFeaturedPosts items={items} />
        </div>
      </div>
    </BlogLayout>
  )
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  )
}
