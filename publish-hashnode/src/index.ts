import path from "path"
import {createDraft, findPostByTitle, updatePost} from "./utils/hashnode"
import {addBaseUrlToImages, extractFrontMatterAndContent} from "./utils/markdown"
import {HASHNODE_PUBLICATION_ID} from "./utils/constants"
import {findDevToPostByTitle, updateDevToPost, createDevToPost} from "./utils/devto"

interface FrontMatter {
  title: string
  subtitle?: string
  seo_title?: string
  description?: string
  image?: string
  canonical_url?: string
  slug: string
  authors: {
    name: string
    image_url: string
  }[]
  cover_image?: string
  author: string
  coAuthors: string[]
}

class Initialize {
  get processedMd(): string {
    return this._processedMd
  }
  get frontMatter(): FrontMatter {
    return this._frontMatter
  }

  private readonly _frontMatter: FrontMatter
  private readonly _processedMd: string

  constructor(filePath: string) {
    const {frontMatter, content} = extractFrontMatterAndContent(filePath)
    const processedMd = addBaseUrlToImages(content)
    this._frontMatter = frontMatter
    this._processedMd = processedMd
  }
}

const main = async () => {
  const changedFiles = process.argv[2].split(" ")
  for (const file of changedFiles) {
    let init = undefined

    if (file.startsWith("blog/")) {
      try {
        const filePath = path.join(__dirname, "../../", file)
        init = new Initialize(filePath)
      } catch (err) {
        console.log(err)
        return
      }

      // HashNode
      try {
        let frontMatter = init.frontMatter
        let processedMd = init.processedMd

        console.log(frontMatter)
        console.log(processedMd)

        const {seo_title, description, title, subtitle, slug, canonical_url, cover_image, coAuthors, author} =
          frontMatter

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
      } catch (error) {
        console.log(error)
      }

      try {
        let frontMatter = init.frontMatter
        let processedMd = init.processedMd

        const {seo_title, description, title, subtitle, slug, canonical_url, cover_image, coAuthors, author} =
          frontMatter
        console.log(frontMatter)
        console.log(processedMd)
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
            main_image: cover_image,
            description: description,

            subtitle: subtitle,
            slug: slug,
            canonical_url: canonical_url ? canonical_url : null,
            ...(seo_title && {
              metaTags: {
                image: null,
                title: seo_title,
              },
            }),
            coAuthors: coAuthors,
            draftOwner: author,
            body_markdown: processedMd,
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
