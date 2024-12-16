import React from "react"
import clsx from "clsx"
import {useBlogPost} from "@docusaurus/plugin-content-blog/client"
import BlogPostItemContainer from "@theme/BlogPostItem/Container"
import BlogPostItemHeader from "@theme/BlogPostItem/Header"
import BlogPostItemContent from "@theme/BlogPostItem/Content"
import BlogPostItemFooter from "@theme/BlogPostItem/Footer"
import type {Props} from "@theme/BlogPostItem"

function useContainerClassName() {
  const {isBlogPostPage} = useBlogPost()
  return !isBlogPostPage ? "margin-bottom--xl" : undefined
}

export default function BlogPostItem({children, className}: Props): JSX.Element {
  const containerClassName = useContainerClassName()
  const {frontMatter} = useBlogPost()
  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemHeader />
      {frontMatter.image && <img src={frontMatter.image} alt={`Cover Image for ${frontMatter.title}`} />}
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  )
}
