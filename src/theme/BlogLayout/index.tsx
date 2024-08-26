import React from "react"
import clsx from "clsx"
import Layout from "@theme/Layout"
import BlogSidebar from "@theme/BlogSidebar"

import type {Props} from "@theme/BlogLayout"
import Announcement from "@site/src/components/shared/Announcement"

export default function BlogLayout(props: Props): JSX.Element {
  const {sidebar, toc, children, ...layoutProps} = props
  const hasSidebar = sidebar && sidebar.items.length > 0

  return (
    <Layout {...layoutProps}>
      <Announcement
        text={"📣 Catch us at GraphQLConf 2024 • September 10-12 • San Francisco • "}
        refLink={"https://graphql.org/conf/2024/schedule/870876ffad45b79d11e09393e7f22587/"}
        refText={" Know more → "}
      />
      <div className="container margin-vert--lg">
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
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
    </Layout>
  )
}
