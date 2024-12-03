import React from "react"
import clsx from "clsx"
import {useBlogPost} from "@docusaurus/plugin-content-blog/client"
import {ThemeClassNames} from "@docusaurus/theme-common"
import EditMetaRow from "@theme/EditMetaRow"
import ReadMoreLink from "@theme/BlogPostItem/Footer/ReadMoreLink"
import BlogPostItemHeaderAuthors from "../Header/Authors"

export default function BlogPostItemFooter(): JSX.Element | null {
  const {metadata, isBlogPostPage} = useBlogPost()
  const {tags, title, editUrl, hasTruncateMarker, lastUpdatedBy, lastUpdatedAt} = metadata

  // A post is truncated if it's in the "list view" and it has a truncate marker
  const truncatedPost = !isBlogPostPage && hasTruncateMarker

  const tagsExists = tags.length > 0

  const renderFooter = tagsExists || truncatedPost || editUrl

  if (!renderFooter) {
    return null
  }

  // BlogPost footer - details view
  if (isBlogPostPage) {
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy)

    return (
      <footer className="docusaurus-mt-lg">
        <h1 className="text-[12px]">Posted By</h1>
        <BlogPostItemHeaderAuthors />
        {canDisplayEditMetaRow && (
          <EditMetaRow
            className={clsx("margin-top--sm", ThemeClassNames.blog.blogFooterEditMetaRow)}
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </footer>
    )
  }
  // BlogPost footer - list view
  else {
    return (
      <footer className="row docusaurus-mt-lg">
        {truncatedPost && (
          <div
            className={clsx("col text--right", {
              "col--3": tagsExists,
            })}
          >
            <ReadMoreLink blogPostTitle={title} to={metadata.permalink} />
          </div>
        )}
      </footer>
    )
  }
}
