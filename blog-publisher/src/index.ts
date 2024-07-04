import path from "path"
import {createDraft, findPostByTitle, updatePost} from "./utils/hashnode"
import {addBaseUrlToImages, extractFrontMatterAndContent} from "./utils/markdown"
import { HASHNODE_PUBLICATION_ID } from "./utils/constants"

const main = async () => {
  const changedFiles = process.argv[2].split("\n")
  for (const file of changedFiles) {
    if (file.startsWith("blog/")) {
      try {
        const filePath = path.join(__dirname, "../../", file)

        const { title, slug, tags, content } = extractFrontMatterAndContent(filePath)
        const tagsArray = tags.map((tag) => ({name: tag}))
  
        const processedMd = addBaseUrlToImages(content)
        const doesPostExist = await findPostByTitle(title)
  
        if (doesPostExist) {
          console.log(`Post ${title} exists, updating`);
          return await updatePost({
            id: doesPostExist.id,
            title,
            contentMarkdown: processedMd,
            slug,
          })
        }

        console.log(`Post not found, creating new post`);
        
        console.log({title, contentMarkdown: processedMd, slug, tags, publicationId: HASHNODE_PUBLICATION_ID})

        await createDraft({
          title,
          contentMarkdown: processedMd,
          slug,
          publicationId: HASHNODE_PUBLICATION_ID,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

main().catch(console.error)
