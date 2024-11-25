import React from "react"
import {BlogPostFrontMatter} from "@docusaurus/plugin-content-blog"
import {useBlogPost} from "@docusaurus/plugin-content-blog/client"

export default function BlogPostItemCategory(): JSX.Element {
  const {frontMatter} = useBlogPost()
  const {category} = frontMatter as unknown as BlogPostFrontMatter & {category: string}

  return category ? (
    <div className="bg-tailCall-yellow/40 border border-tailCall-yellow border-solid text-black text-[12px] font-medium p-1 rounded-[4px] inline-block">
      {category.toUpperCase()}
    </div>
  ) : (
    <></>
  )
}
