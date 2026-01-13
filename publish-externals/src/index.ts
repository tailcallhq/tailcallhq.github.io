import path from "path"
import * as hashnode from "./utils/hashnode"
import {extractFrontMatterAndContent} from "./utils/markdown"
import * as devTo from "./utils/devto"
import snapshot from "../snapshot.json"
import fs from "fs"
import {createHash} from "crypto"

interface Blog {
  file: string
  platforms: {
    [platform: string]: {
      published: boolean
      lastUpdatePublished: boolean
      lastSuccessfulPublishedAt?: string
    }
  }
  hash?: string
}

interface ExternalPublication {
  name: string
  handler: (frontMatter: FrontMatter, content: string) => Promise<void>
}

interface FrontMatter {
  slug: string
}

const ExternalPublications: ExternalPublication[] = [
  {name: "Hashnode", handler: hashnode.handler},
  {name: "Dev.to", handler: devTo.handler},
]

const main = async () => {
  const args = process.argv.slice(2)
  const hasPublishFlag = args.includes("--publish")
  const currentFiles = fs.readdirSync(path.join(__dirname, "../../blog/"))
  const blogs: {[key: string]: Blog} = snapshot.blogs || {}
  let toPublish = 0

  try {
    for (let publication of ExternalPublications) {
      for (let file of currentFiles) {
        file = `blog/${file}`
        const {frontMatter} = extractFrontMatterAndContent(path.join(__dirname, "../../", file))
        const slug = frontMatter.slug
        if (!blogs[slug] || !blogs[slug].platforms[publication.name]) {
          console.log("Publishing new blog", slug)
          toPublish++
          hasPublishFlag && (await publish(file, blogs, publication))
        }
      }

      for (const slug in blogs) {
        const file = blogs[slug].file
        const {content} = extractFrontMatterAndContent(path.join(__dirname, "../../", file))
        const contentHash = createHash("sha256").update(content).digest("hex")

        if (!blogs[slug].hash) {
          console.log("Publishing new blog from snapshot", slug)
          toPublish++
          hasPublishFlag && (await publish(file, blogs, publication))
        } else if (blogs[slug].hash !== contentHash) {
          console.log("Publishing updated blog", slug)
          toPublish++
          hasPublishFlag && (await publish(file, blogs, publication))
        }
      }
    }
  } finally {
    if (toPublish === 0) {
      console.log("No changes detected. Exiting.")
    } else {
      hasPublishFlag && (await writeSnapshot(blogs))
    }
  }
}

const publish = async (file: string, blogs: {[key: string]: Blog}, publication: ExternalPublication) => {
  const filePath = path.join(__dirname, "../../", file)
  const {frontMatter, content} = extractFrontMatterAndContent(filePath)
  const platform = publication.name
  const contentHash = createHash("sha256").update(content).digest("hex")
  const slug = frontMatter.slug

  console.log(`[${platform}] ${frontMatter.slug} ... publishing ⏳`)
  try {
    await publication.handler(frontMatter, content)

    blogs[slug] = blogs[slug] || {
      file,
      platforms: {},
    }
    blogs[slug].platforms[platform] = {
      published: true,
      lastUpdatePublished: true,
      lastSuccessfulPublishedAt: new Date().toUTCString(),
    }
    blogs[slug].hash = contentHash

    console.log(`[${platform}] Success ${frontMatter.slug} ... succeeded ✅`)
  } catch (error) {
    console.error(`[${platform}] Failure ${frontMatter.slug} ... failed 💀`)

    blogs[slug] = blogs[slug] || {
      file,
      platforms: {},
    }
    blogs[slug].platforms[platform] = {
      published: blogs[slug].platforms[platform]?.published || false,
      lastUpdatePublished: false,
    }
    console.log(blogs[slug])
  }
}

const writeSnapshot = async (blogs: {[key: string]: Blog}) => {
  console.log("Writing Snapshot")
  const snapshot = JSON.stringify({blogs}, null, 2)
  console.log(snapshot)
  try {
    fs.writeFile(path.join(__dirname, "../", "snapshot.json"), snapshot, (err) => {
      if (err) {
        console.error(err)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

main()
