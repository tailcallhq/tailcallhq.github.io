import path from "path"
import {createDraft, findPostByTitle, updatePost} from "./utils/hashnode"
import {addBaseUrlToImages, extractFrontMatterAndContent} from "./utils/markdown"
import {HASHNODE_PUBLICATION_ID} from "./utils/constants"
import {findDevToPostByTitle, updateDevToPost, createDevToPost} from "./utils/devto"

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
        const doesPostExist = await findPostByTitle(title)

        if (doesPostExist) {
          console.log(`Post ${title} exists, updating`)
          await updatePost({
            id: doesPostExist.id,
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
          console.log(`Post not found, creating new post`)

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

        const post = await findDevToPostByTitle(title)
        if (post !== undefined) {
          console.log(`DevTo post ${title} exists, updating`)
          await updateDevToPost(post.id, {
            id: post.id,
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
          await createDevToPost({
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
      } catch (error) {
        console.log(error)
      }
    }
  }
}

main().catch(console.error)
