import React, {useEffect, useState} from "react"
import clsx from "clsx"
import Layout from "@theme/Layout"
import BlogRecentPosts from "../BlogRecentPosts"
import type {Props} from "@theme/BlogLayout"
import Categories from "./categories"
import LinkButton from "@site/src/components/shared/LinkButton"
import {Theme} from "@site/src/constants"
import Featured from "./featured"
import BlogItemCustom from "./customblogitem"
import BrowserOnly from "@docusaurus/BrowserOnly"

export default function BlogLayout(props: Props): JSX.Element {
  const {sidebar, toc, children, ...layoutProps} = props
  const hasSidebar = sidebar && sidebar.items.length > 0
  const [tags, setTags] = useState([])
  const [activeTag, setActiveTag] = useState("All")
  const [mainPage, setMainPage] = useState(false)
  const [loadmore, setloadmore] = useState(false)
  const [ismobile, setismobile] = useState(false)
  const [allBlogs, setAllBlogs] = useState({})
  const [featuredBlogsState, setFeaturedBlogs] = useState([])

  useEffect(() => {
    if (!children[0].props?.items) {
      //return if its not the home page
      return
    } else {
      setMainPage(true)
    }

    //initialize the setup
    tagsSetup(children[0].props.items)
  }, [children])

  // code to maintain responsiveness

  const updateMobileState = (setismobile) => {
    setismobile(window.innerWidth <= 650)
  }

  // end mobile control

  //this one is often called in parallel for each blog
  const blogProcessor = async (blog, tagOccurrences) => {
    return new Promise((resolve) => {
      //now the logic
      let tagsOfThis = blog.frontMatter.tags || []
      let isFeatured = false
      let polishedBlog = blogInfoGather(blog)

      tagsOfThis.forEach((tag) => {
        if (tag === "Featured") {
          //save as featured
          isFeatured = true
        } else {
          // good luck figuring this out :)
          tagOccurrences[tag] = {
            occurrences: tagOccurrences[tag]?.occurrences + 1 || 1,
            blogs: [polishedBlog, ...(tagOccurrences[tag]?.blogs || [])],
          }
        }
      })

      //now, add it to the 'All' tag
      tagOccurrences["All"] = {
        occurrences: tagOccurrences["All"]?.occurrences + 1 || 1,
        blogs: [polishedBlog, ...(tagOccurrences["All"]?.blogs || [])],
      }

      resolve(isFeatured ? polishedBlog : undefined)
    })
  }

  //this is the parent function
  const tagsSetup = async (allblogs) => {
    //get all the tags first
    // let tagOccurrences = {tag: {occurrences: 5, blogs: []}, }
    let tagOccurrences: any = {}

    //process each blog in parallel, it also reaturns the featured posts
    let featuredBlogs = await Promise.all(allblogs.map(({content}) => blogProcessor(content, tagOccurrences)))
    //unfortunately, it also sends undefineds
    featuredBlogs = featuredBlogs.filter((b) => b !== undefined)

    //now update the states

    setTags(["All", ...Object.keys(tagOccurrences)])
    setAllBlogs(tagOccurrences)
    setFeaturedBlogs(featuredBlogs)
  }

  //this one extracts useful data from the frontmatter jargon
  const blogInfoGather = (rawInfo) => {
    return {...rawInfo.frontMatter, date: rawInfo.metadata.date, link: rawInfo.metadata.permalink}
  }

  const MobileStateUpdater = ({ismobile, setismobile}) => (
    <BrowserOnly fallback={<div></div>}>
      {() => {
        useEffect(() => {
          if (!window) {
            return
          }

          window.addEventListener("resize", () => updateMobileState(setismobile))
          updateMobileState(setismobile)
        }, [window])
        return <div></div>
      }}
    </BrowserOnly>
  )
  //

  return (
    <Layout {...layoutProps}>
      {mainPage ? (
        <>
          <div
            className="container my-6 grid-cols grid gap-3"
            style={{gridTemplateColumns: ismobile ? "100%" : "70% 30%"}}
          >
            <div className="row grid grid-cols-1 overflow-clip justify-center p-3">
              <Categories setActiveTag={setActiveTag} tags={tags} />
              <MobileStateUpdater ismobile={ismobile} setismobile={setismobile} />
              <main className="w-[100%] grid justify-items-center p-4">
                <BlogItemCustom {...{...allBlogs[activeTag]?.blogs[0], ismobile, main: true}} />
                <hr className="w-full" />
                <div
                  className="grid my-3 justify-center gap-4 "
                  style={{gridTemplateColumns: `repeat(${ismobile ? 1 : 3}, 1fr)`}}
                >
                  {allBlogs[activeTag]?.blogs.slice(1, 7).map((blog) => <BlogItemCustom {...{...blog, ismobile}} />)}
                  {loadmore &&
                    allBlogs[activeTag]?.blogs.slice(7).map((blog) => <BlogItemCustom {...{...blog, ismobile}} />)}
                </div>
                {!loadmore && allBlogs[activeTag]?.blogs.length > 6 && (
                  <LinkButton title="Load More" theme={Theme.Light} width="small" onClick={() => setloadmore(true)} />
                )}
              </main>
              {toc && <div className="col col--2">{toc}</div>}
            </div>
            {!ismobile && <Featured items={featuredBlogsState} />}
          </div>
        </>
      ) : (
        <>
          <div className="container my-8">
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
          <BlogRecentPosts sidebar={sidebar} />
        </>
      )}
    </Layout>
  )
}
