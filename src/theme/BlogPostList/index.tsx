import React from "react"
import Link from "@docusaurus/Link"
import type {Props} from "@theme/BlogListPage"
import {BlogAuthor} from "../BlogAuthor"
import clsx from "clsx"

const FeaturedPost = ({item}: {item: Props["items"][0]}) => (
  <Link
    to={item.content.metadata.permalink}
    className="md:col-span-2 lg:col-span-3 flex flex-col overflow-hidden !text-black !no-underline"
  >
    <img
      src={item.content.metadata.frontMatter.image}
      alt={item.content.metadata.title}
      className="w-full object-contain aspect-video"
    />
    <PostContent item={item} isFeatured />
  </Link>
)

const RegularPost = ({item}: {item: Props["items"][0]}) => (
  <Link
    to={item.content.metadata.permalink}
    className="p-4 md:p-0 md:my-2 flex flex-col overflow-hidden border border-solid border-tailCall-light-400 md:border-none !text-black !no-underline rounded-xl md:rounded-none"
  >
    <img
      src={item.content.metadata.frontMatter.image}
      alt={item.content.metadata.title}
      className="w-full object-contain aspect-video hidden md:block"
    />
    <PostContent item={item} />
  </Link>
)

const PostContent = ({item, isFeatured = false}: {item: Props["items"][0]; isFeatured?: boolean}) => (
  <div className={clsx("flex flex-grow flex-col justify-between", {"md:mt-5": !isFeatured})}>
    <div>
      <span className="text-[12px] text-black">
        {new Date(item.content.metadata.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </span>
      <h2 className={clsx("mb-2 line-clamp-2 font-bold", isFeatured ? "text-3xl" : "text-xl")}>
        {item.content.metadata.title}
      </h2>
      <span className="text-sm line-clamp-2 text-tailCall-light-600">
        {item.content.metadata.frontMatter.description}
      </span>
      {item.content.metadata.authors[0] && <BlogAuthor author={item.content.metadata.authors[0]} />}
    </div>
  </div>
)

function BlogPostList({items}: {items: Props["items"]}): JSX.Element {
  const [featuredPost, ...regularPosts] = items

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
      <FeaturedPost item={featuredPost} />
      {regularPosts.map((item) => (
        <RegularPost key={item.content.metadata.permalink} item={item} />
      ))}
    </div>
  )
}

export default BlogPostList
