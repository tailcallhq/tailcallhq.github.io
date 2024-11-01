import React, {useCallback, useState} from "react"
import clsx from "clsx"
import {translate} from "@docusaurus/Translate"
import {PageMetadata, HtmlClassNameProvider, ThemeClassNames, usePluralForm} from "@docusaurus/theme-common"
import SearchMetadata from "@theme/SearchMetadata"
import type {Props} from "@theme/BlogTagsPostsPage"
import BlogPostList from "../BlogPostList"
import Layout from "@theme/Layout"
import TagSelectionModal from "@site/src/components/blog/TagSelectionModal/TagSelectionModal"

// Very simple pluralization: probably good enough for now
function useBlogPostsPlural() {
  const {selectMessage} = usePluralForm()
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          id: "theme.blog.post.plurals",
          description:
            'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One post|{count} posts",
        },
        {count},
      ),
    )
}

function useBlogTagsPostsPageTitle(tag: Props["tag"]): string {
  const blogPostsPlural = useBlogPostsPlural()
  return translate(
    {
      id: "theme.blog.tagTitle",
      description: "The title of the page for a blog tag",
      message: '{nPosts} tagged with "{tagName}"',
    },
    {nPosts: blogPostsPlural(tag.count), tagName: tag.label},
  )
}

function BlogTagsPostsPageMetadata({tag}: Props): JSX.Element {
  const title = useBlogTagsPostsPageTitle(tag)
  return (
    <>
      <PageMetadata title={title} description={tag.description} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  )
}

function BlogTagsPostsPageContent({tag, items}: Props): JSX.Element {
  const [showTagsModal, setShowTagsModal] = useState(false)

  const openTagSelectionModal = useCallback(() => {
    setShowTagsModal(true)
  }, [])

  const closeTagSelectionModal = useCallback(() => {
    setShowTagsModal(false)
  }, [])

  return (
    <Layout>
      <div className="container mx-auto mt-3 mb-10 md:my-8 px-4 md:w-8/12">
        <div className="flex flex-col md:flex-row gap-2 mb-5">
          <span className="text-title-medium text-tailCall-light-600">Results for</span>
          <span className="flex items-center justify-between flex-1">
            <span className="text-content-small px-3 py-1 text-tailCall-dark-100 rounded-full bg-tailCall-light-200">
              {tag.label}
            </span>
            <span
              className="text-content-small text-tailCall-dark-500 underline cursor-pointer"
              onClick={openTagSelectionModal}
            >
              See all Tags
            </span>
          </span>
        </div>
        <BlogPostList items={items} />
      </div>
      <TagSelectionModal open={showTagsModal} onClose={closeTagSelectionModal} />
    </Layout>
  )
}

export default function BlogTagsPostsPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogTagPostListPage)}
    >
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  )
}
