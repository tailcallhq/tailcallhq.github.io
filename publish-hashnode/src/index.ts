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
        const {seo_title, seo_description, article_title, article_subtitle, slug, canonical_url} = frontMatter

        const processedMd = addBaseUrlToImages(content)
        const doesPostExist = await findPostByTitle(article_title)

        if (doesPostExist) {
          console.log(`Post ${article_title} exists, updating`)
          return await updatePost({
            id: doesPostExist.id,
            title: article_title,
            subtitle: article_subtitle,
            slug: slug,
            originalArticleURL: canonical_url ? canonical_url : null,
            metaTags: {
              description: seo_description,
              image: null,
              title: seo_title,
            },
            contentMarkdown: processedMd,
          })
        }

        console.log(`Post not found, creating new post`)

        await createDraft({
          title: article_title,
          subtitle: article_subtitle,
          slug: slug,
          originalArticleURL: canonical_url ? canonical_url : null,
          metaTags: {
            description: seo_description,
            image: null,
            title: seo_title,
          },
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
