import React from "react"
import type {Props} from "@theme/BlogListPage"
import BlogListItem from "@site/src/components/blog/BlogListItem"

function BlogPostList({items}: {items: Props["items"]}): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const {permalink, date, title, description, authors} = item.content.metadata

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
  )
}

export default BlogPostList
