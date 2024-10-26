import React from "react"
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
import {useBlogPosts} from "@site/src/utils/hooks/useBlogPosts"
import {FrontMatter} from "@theme/BlogPostPage"

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

function LoadMoreButton({handleLoadMore}: {handleLoadMore: () => void}): JSX.Element {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleLoadMore}
        className="mt-4 h-12 cursor-pointer rounded-lg border-2 border-solid border-tailCall-border-dark-100 bg-transparent px-4 py-2 font-space-grotesk text-title-tiny font-bold text-black"
      >
        Load more blogs
      </button>
    </div>
  )
}

function BlogListPageContent({metadata, items, sidebar}: Props): JSX.Element {
  const {activeCategory, visibleItems, filteredItems, handleCategoryClick, handleLoadMore} = useBlogPosts(items)
  const featuredItems = items.filter((post) => (post.content.frontMatter as FrontMatter & {featured: boolean}).featured)

  return (
    <BlogLayout sidebar={sidebar}>
      <div className="flex flex-col md:flex-row items-start w-full">
        <div className={clsx("w-full md:w-9/12 md:pr-5", featuredItems.length == 0 ? "md:w-full" : "border-right")}>
          <BlogCategories items={items} onCategoryClick={handleCategoryClick} activeCategory={activeCategory} />
          <BlogPostList items={filteredItems.slice(0, visibleItems)} />
          {visibleItems < filteredItems.length && <LoadMoreButton handleLoadMore={handleLoadMore} />}
          <BlogListPaginator metadata={metadata} />
        </div>
        {featuredItems.length > 0 ? (
          <div className="w-full md:w-3/12 hidden md:block md:pl-5 featured-posts-container">
            <BlogFeaturedPosts items={featuredItems} />
          </div>
        ) : null}
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
