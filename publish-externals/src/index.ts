import path from "path"
import * as hashnode from "./utils/hashnode"
import {extractFrontMatterAndContent} from "./utils/markdown"
import * as devTo from "./utils/devto"

const ExternalPublications = [
  {name: "Hashnode", handler: hashnode.handler},
  {name: "Dev.to", handler: devTo.handler},
]

const main = async () => {
  const changedFiles = process.argv[2].split(" ")
  const errors = []
  for (const file of changedFiles) {
    if (file.startsWith("blog/")) {
      const filePath = path.join(__dirname, "../../", file)
      const {frontMatter, content} = extractFrontMatterAndContent(filePath)
      for (let publication of ExternalPublications) {
        console.log(`[${publication.name}] ${frontMatter.slug} ... publishing ⏳`)
        try {
          await publication.handler(frontMatter, content)
          console.log(`[${publication.name}] Success ${frontMatter.slug} ... succeeded ✅`)
        } catch (error) {
          errors.push(error)
          console.error(`[${publication.name}] Failure ${frontMatter.slug} ... failed 💀`)
        }
      }
    }
  }

  if (errors.length !== 0) {
    console.error(errors)
    throw new Error("Publishing failed because of one or more errors")
  }
}

main()
