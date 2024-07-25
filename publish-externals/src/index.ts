import path from "path"
import * as hashnode from "./utils/hashnode"
import {extractFrontMatterAndContent} from "./utils/markdown"
import * as devTo from "./utils/devto"
import snapshot from "../snapshot.json"
import fs from "fs"

const ExternalPublications = [
  {name: "Hashnode", handler: hashnode.handler},
  {name: "Dev.to", handler: devTo.handler},
]

const main = async () => {
  const changedFiles = process.argv[2].split(" ")
  const blogs = snapshot.blogs || []

  // publish changed files
  for (const file of changedFiles) {
    if (file.startsWith("blog/")) {
      await publish(file.replace("blog/", ""))
    }
  }

  // publish blogs/updates which were not published before
  for (const blog of blogs) {
    if (!blog.lastUpdatePublished || !blog.published) {
      await publish(blog.blogName)
    }
  }
}

const publish = async (file: string) => {
  const blogs = snapshot.blogs || []
  const errors = []
  const filePath = path.join(__dirname, "../../", `blog/${file}`)
  const {frontMatter, content} = extractFrontMatterAndContent(filePath)
  for (let publication of ExternalPublications) {
    console.log(`[${publication.name}] ${frontMatter.slug} ... publishing ⏳`)
    try {
      await publication.handler(frontMatter, content)
      // Update fields and if blog does not exist in snapshot, add it
      const inSnapshot = blogs.findIndex((blog) => blog.blogName === file)
      if (inSnapshot !== -1) {
        blogs[inSnapshot].published = true
        blogs[inSnapshot].lastUpdatePublished = true
        blogs[inSnapshot].lastUpdatePublishedAt = new Date().toUTCString()
        await writeSnapshot(blogs)
      } else {
        blogs.push({
          blogName: file,
          published: true,
          lastUpdatePublished: true,
          lastUpdatePublishedAt: new Date().toUTCString(),
        })
        await writeSnapshot(blogs)
      }
      console.log(`[${publication.name}] Success ${frontMatter.slug} ... succeeded ✅`)
    } catch (error) {
      errors.push(error)
      console.error(`[${publication.name}] Failure ${frontMatter.slug} ... failed 💀`)
    }
  }
  if (errors.length !== 0) {
    // Update fields and if blog does not exist in snapshot, add it
    const inSnapshot = blogs.findIndex((blog) => blog.blogName === file)
    console.log(inSnapshot)
    console.log(blogs)
    if (inSnapshot !== -1) {
      blogs[inSnapshot].lastUpdatePublished = false
      await writeSnapshot(blogs)
    } else {
      blogs.push({
        blogName: file,
        published: false,
        lastUpdatePublished: false,
      })
      await writeSnapshot(blogs)
    }

    console.error(errors)
    throw new Error("Publishing failed because of one or more errors")
  }
}

const writeSnapshot = async (snapshot: any) => {
  try {
    fs.writeFileSync(path.join(__dirname, "../", "snapshot.json"), JSON.stringify({snapshot}, null, 2), (err) => {
      if (err) {
        console.error(err)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

main()
