import React from "react"
import Link from "@docusaurus/Link"
import type {Props} from "@theme/BlogListPage"
import {FrontMatter} from "@theme/BlogPostPage"

function BlogFeaturedPosts({items}: {items: Props["items"]}): JSX.Element {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl mb-4 font-bold">Featured Posts</h2>
      {items
        .filter((post) => (post.content.frontMatter as FrontMatter & {featured: boolean}).featured)
        .map((post, index) => (
          <Link
            to={post.content.metadata.permalink}
            key={index}
            className="flex flex-col gap-4 text-black !no-underline hover:text-black"
          >
            <div className="flex items-center gap-2">
              {post.content.metadata.authors[0] && (
                <img
                  src={post.content.metadata.authors[0].imageURL}
                  alt={post.content.metadata.authors[0].name}
                  className="h-6 w-6 rounded-full"
                />
              )}
              <span className="text-sm font-medium">{post.content.metadata.authors[0]?.name}</span>
            </div>
            <div>
              <div className="text-lg font-semibold">{post.content.metadata.title}</div>
              <p className="text-sm mt-1 text-tailCall-light-600">{post.content.metadata.description}</p>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default BlogFeaturedPosts
