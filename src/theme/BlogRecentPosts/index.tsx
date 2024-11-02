import React, {useEffect} from "react"
import {useLocation} from "@docusaurus/router"
import type {Props} from "@theme/BlogLayout"
import {isBlogPost} from "@site/src/utils"
import {usePluginData} from "@docusaurus/useGlobalData"
import BlogListItem from "@site/src/components/blog/BlogListItem"

export default function BlogRecentPosts({sidebar}: {sidebar: Props["sidebar"]}): JSX.Element {
  const [isBlogPostPage, setIsBlogPostPage] = React.useState(false)
  const location = useLocation()

  const {recentBlogPostsMetadata} = usePluginData("docusaurus-plugin-content-blog") as any

  useEffect(() => {
    setIsBlogPostPage(isBlogPost())
  }, [location.pathname])

  return isBlogPostPage ? (
    <div className="container">
      <div className="row justify-center">
        <div className="col col--7">
          <hr className="h-[1px] !bg-tailCall-light-300" />
          <h1 className=" text-title-medium">Recent Blog Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3 mb-10 md:mb-20">
            {recentBlogPostsMetadata?.map((item: RecentBlogPostItem) => {
              const {permalink, date, title, description, authors} = item

              return (
                <BlogListItem
                  key={permalink}
                  date={date}
                  title={title}
                  description={description}
                  authors={authors}
                  permalink={permalink}
                />
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
