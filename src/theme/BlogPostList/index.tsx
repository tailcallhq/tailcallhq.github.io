import React from "react"
import Link from "@docusaurus/Link"
import type { Props } from "@theme/BlogListPage"
import { BlogAuthor } from "../BlogAuthor"
import clsx from "clsx"

const RegularPost = ({ item }: { item: Props["items"][0] }) => (
  <Link
    to={item.content.metadata.permalink}
    className="flex flex-col overflow-hidden !text-black !no-underline"
  >
    <PostContent item={item} />
  </Link>
)

const PostContent = ({ item }: { item: Props["items"][0]; }) => (
  <div className="flex flex-col flex-1 py-12 px-6 gap-3 border border-solid border-tailCall-border-light-400 hover:border-tailCall-border-dark-100 rounded-md">
    <span className="text-content-mini text-black">
      {new Date(item.content.metadata.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </span>
    <div className="flex flex-col">
      <span className={clsx("text-title-small")}>
        {item.content.metadata.title}
      </span>
      <span className="text-content-small line-clamp-3 text-tailCall-light-600">
        {item.content.metadata.frontMatter.description}
      </span>
    </div>
    {item.content.metadata.authors[0] && <BlogAuthor author={item.content.metadata.authors[0]} containerClassName="mt-auto" />}
  </div>
)

function BlogPostList({ items }: { items: Props["items"] }): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        return (
          <RegularPost key={item.content.metadata.permalink} item={item} />
        )
      })}
    </div>
  )
}

export default BlogPostList
