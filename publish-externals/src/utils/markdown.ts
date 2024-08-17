import fs from "fs"
import graymatter from "gray-matter"
import {BASE_URL_ASSETS, authorsMap} from "./constants"

const addBaseUrlToImages = (markdown: string): string => {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  return markdown.replace(imageRegex, (match, alt, src) => {
    if (!src.startsWith("http") && !src.startsWith("https")) {
      // Remove leading '../' if present
      src = src.replace(/^\.\.\//, "")
      // Add 'static/' if not already present
      if (!src.startsWith("static/")) {
        src = `static/${src}`
      }
      src = `${BASE_URL_ASSETS}${src}`
    }
    return `![${alt}](${src})`
  })
}

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
}

const extractFrontMatterAndContent = (filePath: string) => {
  const md = fs.readFileSync(filePath, "utf-8")
  const {data, content} = graymatter(md) as unknown as {data: FrontMatter; content: string}

  const {author, coAuthors} = getCoAuthors(data.authors || [])

  const frontMatter = {
    ...data,
    cover_image: data.image ? BASE_URL_ASSETS + "static/" + data.image : undefined,
    author,
    coAuthors,
  }

  return {frontMatter, content}
}

const getCoAuthors = (authors: FrontMatter["authors"]): {author: string; coAuthors: string[]} => {
  const defaultAuthor = authorsMap["tushar"]

  if (authors.length === 0) {
    return {author: defaultAuthor, coAuthors: []}
  }

  const authorsList = authors.map((author) => {
    const authorKey = Object.keys(authorsMap).find((key) => author.name.toLowerCase().includes(key.toLowerCase()))
    return authorKey ? authorsMap[authorKey as keyof typeof authorsMap] : defaultAuthor
  })

  const mainAuthor = authorsList[0]
  const coAuthors = authorsList.slice(1).filter((a) => a !== mainAuthor)

  return {author: mainAuthor, coAuthors}
}

export {addBaseUrlToImages, extractFrontMatterAndContent}
