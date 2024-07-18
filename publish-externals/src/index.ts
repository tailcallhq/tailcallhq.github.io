import path from "path"
import { hashnodePostHandler, } from "./utils/hashnode"
import {  extractFrontMatterAndContent } from "./utils/markdown"
import { devtoPostHandler } from "./utils/devto"

const main = async () => {
  const changedFiles = process.argv[2].split(" ")
  for (const file of changedFiles) {
    if (file.startsWith("blog/")) {
      try {
        const filePath = path.join(__dirname, "../../", file)

        const { frontMatter, content } = extractFrontMatterAndContent(filePath)
        //call both and execute simultaneously
        await Promise.all(
          [hashnodePostHandler(frontMatter, content), 
          devtoPostHandler(frontMatter, content)]
        )

      } catch (error) {
        console.log(error)
      }
    }
  }
}

main().catch(console.error)
