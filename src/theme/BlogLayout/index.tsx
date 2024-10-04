import React, {useEffect, useState} from "react"
import clsx from "clsx"
import Layout from "@theme/Layout"
import BlogRecentPosts from "../BlogRecentPosts"
import {isBlogPost} from "@site/src/utils"
import {useLocation} from "@docusaurus/router"
import type {Props} from "@theme/BlogLayout"

export default function BlogLayout(props: Props): JSX.Element {
  const {sidebar, toc, children, ...layoutProps} = props
  const [isBlogPostPage, setIsBlogPostPage] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsBlogPostPage(isBlogPost())
  }, [location.pathname])

  return (
    <Layout {...layoutProps}>
      <div className="container mx-auto my-8 flex flex-col items-center">
        <div className={clsx("w-full", isBlogPostPage ? "lg:w-7/12" : "md:w-full")}>{children}</div>
        {toc && <div className="w-full md:w-3/12">{toc}</div>}
      </div>
      <BlogRecentPosts sidebar={sidebar} />
    </Layout>
  )
}
