import React from "react"
import BlogPostItemHeaderTitle from "@theme/BlogPostItem/Header/Title"
import BlogPostItemHeaderInfo from "@theme/BlogPostItem/Header/Info"
import BlogBackButton from "./Back"
import {useBlogPost} from "@docusaurus/plugin-content-blog/client"
import BlogPostItemCategory from "../Category"

export default function BlogPostItemHeader(): JSX.Element {
  const {isBlogPostPage} = useBlogPost()

  return (
    <header>
      {isBlogPostPage && <BlogBackButton />}
      <BlogPostItemCategory />
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
    </header>
  )
}
