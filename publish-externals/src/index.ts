import path from "path"
import {hashnodePostHandler} from "./utils/hashnode"
import {extractFrontMatterAndContent} from "./utils/markdown"
import {devtoPostHandler} from "./utils/devto"

const main = async () => {
  const changedFiles = process.argv[2].split(" ")
  for (const file of changedFiles) {
    if (file.startsWith("blog/")) {
      try {
        const filePath = path.join(__dirname, "../../", file)

        const {frontMatter, content} = extractFrontMatterAndContent(filePath)
        //call both and execute simultaneously
        const externalPublications = [
          {name: "Hahsnode", handler: hashnodePostHandler},
          {name: "Dev.to", handler: devtoPostHandler},
        ]
        const publishToExternalPublications = async (externalPublications: any, frontMatter: any, content: any) => {
          const promises = externalPublications.map(async (publication: any) => {
            const pubname = publication.name
            console.log(`Publishing on ${pubname} ⏳`)
            try {
              await publication.handler(frontMatter, content)
              console.log(`Published to ${pubname} ✅`)
              return `Published to ${pubname}`
            } catch (error) {
              throw new Error(`Error: couldn't upload to ${pubname}`)
            }
          })

          return Promise.all(promises)
        }

        await publishToExternalPublications(externalPublications, frontMatter, content)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

main().catch(console.error)
