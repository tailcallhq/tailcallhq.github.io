import React from "react"
import type {Props} from "@theme/BlogLayout"
import Link from "@docusaurus/Link"

export default function BlogRecentPosts({sidebar}: {sidebar: Props["sidebar"]}): JSX.Element {
  return (
    <div className="mx-8 md:mx-[367px]">
      <h1 className=" text-title-medium">Recent Blog Posts</h1>
      <div className=" flex flex-wrap gap-4">
        {sidebar?.items.map((item) => {
          return (
            <Link to={item.permalink} className="w-full md:w-[45%] my-4 !no-underline">
              <img
                src={`/images/${item.permalink}.png`}
                className="w-full rounded-xl aspect-[1.88] object-cover"
                alt=""
              />
              <h1 className=" text-title-medium text-black">{item.title}</h1>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
