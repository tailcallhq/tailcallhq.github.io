import React from "react"
import Link from "@docusaurus/Link"
import type {Props} from "@theme/BlogListPage"
import {BlogAuthor} from "../BlogAuthor"
import clsx from "clsx"

const RegularPost = ({item}: {item: Props["items"][0]}) => (
  <Link to={item.content.metadata.permalink} className="flex flex-col overflow-hidden !text-black !no-underline">
    <PostContent item={item} />
  </Link>
)

const PostContent = ({item}: {item: Props["items"][0]}) => (
  <div className="flex flex-col flex-1 p-3 md:py-12 md:px-6 gap-2 md:gap-3 border border-solid border-tailCall-border-light-400 hover:border-tailCall-border-dark-100 rounded-lg md:rounded-md">
    <span className="hidden md:flex text-content-mini text-black">
      {new Date(item.content.metadata.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </span>
    <div className="flex flex-col flex-1 gap-1 md:gap-2">
      <span className={clsx("text-title-small line-clamp-2")}>{item.content.metadata.title}</span>
      <span className="flex-1 text-content-tiny md:text-content-small line-clamp-1 md:line-clamp-3 text-tailCall-light-600 blog-post-content-desc">
        {item.content.metadata.frontMatter.description}
      </span>
    </div>
    {item.content.metadata.authors[0] && (
      <BlogAuthor author={item.content.metadata.authors[0]} containerClassName="mt-auto" />
    )}
  </div>
)

function BlogPostList({items}: {items: Props["items"]}): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        return <RegularPost key={item.content.metadata.permalink} item={item} />
      })}
    </div>
  )
}

export default BlogPostList
