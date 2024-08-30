import React from "react"
import clsx from "clsx"
import Layout from "@theme/Layout"
import type {Props} from "@theme/BlogLayout"
import BlogRecentPosts from "../BlogRecentPosts"
import {useLocation} from "@docusaurus/router"

export default function BlogLayout(props: Props): JSX.Element {
  const {sidebar, toc, children, ...layoutProps} = props
  const hasSidebar = sidebar && sidebar.items.length > 0
  const location = useLocation()
  console.log(location, "location")
  const isBlogRoot = location.pathname === "/blog" || location.pathname === "/blog/"

  return (
    <Layout {...layoutProps}>
      {!isBlogRoot && <div className="container margin-vert--lg">
        <div className="row justify-center">
          <main
            className={clsx("col", {
              "col--7": hasSidebar,
              "col--9 col--offset-1": !hasSidebar,
            })}
          >
            {children}
          </main>
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
      }
      <BlogRecentPosts sidebar={sidebar} />
    </Layout>
  )
}
