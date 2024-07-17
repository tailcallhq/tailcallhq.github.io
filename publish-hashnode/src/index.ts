import path from "path"
import {createDraft, findPostByTitle, updatePost} from "./utils/hashnode"
import {addBaseUrlToImages, extractFrontMatterAndContent} from "./utils/markdown"
import {HASHNODE_PUBLICATION_ID} from "./utils/constants"
import {findDevToPostByTitle, createDevToPost, updateDevToPost} from "./utils/devto"

const main = async () => {
  const changedFiles = process.argv[2].split(" ")
  for (const file of changedFiles) {
    if (file.startsWith("blog/")) {
      try {
        const filePath = path.join(__dirname, "../../", file)

        const {frontMatter, content} = extractFrontMatterAndContent(filePath)
        const {seo_title, description, title, subtitle, slug, canonical_url, cover_image, coAuthors, author} =
          frontMatter

        const processedMd = addBaseUrlToImages(content)

        // Hashnode part
        const doesPostExistOnHashnode = await findPostByTitle(title)

        if (doesPostExistOnHashnode) {
          console.log(`Post ${title} exists on Hashnode, updating`)
          await updatePost({
            id: doesPostExistOnHashnode.id,
            title: title,
            subtitle: subtitle,
            slug: slug,
            originalArticleURL: canonical_url ? canonical_url : null,
            coAuthors: coAuthors,
            ...(seo_title && {
              metaTags: {
                description: description,
                image: null,
                title: seo_title,
              },
            }),
            coverImageOptions: {
              coverImageURL: cover_image,
            },
            contentMarkdown: processedMd,
          })
        } else {
          console.log(`Post not found on Hashnode, creating new post`)
          await createDraft({
            title: title,
            subtitle: subtitle,
            slug: slug,
            originalArticleURL: canonical_url ? canonical_url : null,
            ...(seo_title && {
              metaTags: {
                description: description,
                image: null,
                title: seo_title,
              },
            }),
            coverImageOptions: {
              coverImageURL: cover_image,
            },
            coAuthors: coAuthors,
            draftOwner: author,
            contentMarkdown: processedMd,
            publicationId: HASHNODE_PUBLICATION_ID,
          })
        }

        // Dev.to part
        const doesPostExistOnDevTo = await findDevToPostByTitle(title)

        if (doesPostExistOnDevTo) {
          console.log(`Post ${title} exists on Dev.to, updating`)
          await updateDevToPost(doesPostExistOnDevTo.id, {
            title: title,
            body_markdown: processedMd,
            published: true,
            description: description,
            canonical_url: canonical_url,
            cover_image: cover_image,
          })
        } else {
          console.log(`Post not found on Dev.to, creating new post`)
          await createDevToPost({
            title: title,
            body_markdown: processedMd,
            published: true,
            description: description,
            canonical_url: canonical_url,
            cover_image: cover_image,
            tags: frontMatter.tags || [],
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

main().catch(console.error)
