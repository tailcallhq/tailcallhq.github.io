import path from "path"
import {createDraft, findPostByTitle, updatePost} from "./utils/hashnode"
import {addBaseUrlToImages, extractFrontMatterAndContent} from "./utils/markdown"
import {HASHNODE_PUBLICATION_ID} from "./utils/constants"

const main = async () => {
  const changedFiles = process.argv[2].split("\n")
  for (const file of changedFiles) {
    if (file.startsWith("blog/")) {
      try {
        const filePath = path.join(__dirname, "../../", file)

        const {frontMatter, content} = extractFrontMatterAndContent(filePath)
        const {seo_title, seo_description, title, subtitle, slug, canonical_url, cover_image, coAuthors} = frontMatter

        const processedMd = addBaseUrlToImages(content)
        const doesPostExist = await findPostByTitle(title)

        if (doesPostExist) {
          console.log(`Post ${title} exists, updating`)
          return await updatePost({
            id: doesPostExist.id,
            title: title,
            subtitle: subtitle,
            slug: slug,
            originalArticleURL: canonical_url ? canonical_url : null,
            coAuthors: coAuthors,
            metaTags: {
              description: seo_description,
              image: null,
              title: seo_title,
            },
            coverImageOptions: {
              coverImageURL: cover_image,
            },
            contentMarkdown: processedMd,
          })
        }

        console.log(`Post not found, creating new post`)

        await createDraft({
          title: title,
          subtitle: subtitle,
          slug: slug,
          originalArticleURL: canonical_url ? canonical_url : null,
          metaTags: {
            description: seo_description,
            image: null,
            title: seo_title,
          },
          coverImageOptions: {
            coverImageURL: cover_image,
          },
          coAuthors: coAuthors,
          contentMarkdown: processedMd,
          publicationId: HASHNODE_PUBLICATION_ID,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

main().catch(console.error)
