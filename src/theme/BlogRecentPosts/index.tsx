import React, {useEffect} from "react"
import Link from "@docusaurus/Link"
import {useLocation} from "@docusaurus/router"
import type {Props} from "@theme/BlogLayout"

export default function BlogRecentPosts({sidebar}: {sidebar: Props["sidebar"]}): JSX.Element {
  const [isBlogPostPage, setIsBlogPostPage] = React.useState(false)
  const location = useLocation()

  useEffect(() => {
    const url = new URL(location.pathname, window.location.origin)
    const pathSegments = url.pathname.split("/").filter(Boolean)

    // Check if it's a blog post: starts with 'blog', has more segments, and isn't a pagination page
    const isBlogPost = pathSegments[0] === "blog" && pathSegments.length > 1 && pathSegments[1] !== "page"

    setIsBlogPostPage(isBlogPost)
  }, [location.pathname])

  return isBlogPostPage ? (
    <div className="container">
      <div className="row justify-center">
        <div className="col col--7">
          <hr className="h-[1px] !bg-tailCall-light-300" />
          <h1 className=" text-title-medium">Recent Blog Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sidebar?.items.map((item) => {
              return (
                <Link to={item.permalink} className="w-full my-4 !no-underline">
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
      </div>
    </div>
  ) : (
    <></>
  )
}
