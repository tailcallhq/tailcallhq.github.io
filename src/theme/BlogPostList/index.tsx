import React from "react"
import Link from "@docusaurus/Link"
import type {Props} from "@theme/BlogListPage"
import {BlogAuthor} from "../BlogAuthor"

function BlogPostList({items}: {items: Props["items"]}): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-2">
      {items.map((item, index) => (
        <Link
          to={item.content.metadata.permalink}
          key={item.content.metadata.permalink}
          className={`p-4 md:p-0 md:my-2 flex flex-col overflow-hidden border border-solid border-tailCall-light-400 md:border-none rounded-xl !text-black !no-underline ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
        >
          <img
            src={item.content.metadata.frontMatter.image}
            alt={item.content.metadata.title}
            className={`hidden md:block w-full object-cover ${index === 0 ? "h-96" : "h-48"}`}
          />
          <div className="md:mt-5 flex flex-grow flex-col justify-between">
            <div>
              <span className="text-[12px] text-black">
                {new Date(item.content.metadata.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <h2 className={`mb-2 line-clamp-2 font-bold ${index === 0 ? "text-3xl" : "text-xl"}`}>
                {item.content.metadata.title}
              </h2>
              <span className="text-sm line-clamp-2 text-tailCall-light-600">
                {item.content.metadata.frontMatter.description}
              </span>
              {item.content.metadata.authors[0] && <BlogAuthor author={item.content.metadata.authors[0]} />}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default BlogPostList
