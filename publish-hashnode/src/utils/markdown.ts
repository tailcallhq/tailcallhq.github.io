import fs from "fs"
import graymatter from "gray-matter"
import {BASE_URL_ASSETS, authorsMap} from "./constants"

const addBaseUrlToImages = (markdown: string): string => {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  return markdown.replace(imageRegex, (match, alt, src) => {
    if (!src.startsWith("http") && !src.startsWith("https")) {
      src = `${BASE_URL_ASSETS}${src.replace(/^\.\.\//, "")}`
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

  const frontMatter = {
    ...data,
    cover_image: data.image ? BASE_URL_ASSETS + "static/" + data.image : undefined,
    coAuthors: getCoAuthors(data.authors || []),
  }

  return {frontMatter, content}
}

const getCoAuthors = (authors: FrontMatter["authors"]): string[] => {
  if (authors.length === 0) {
    return []
  }
  if (authors.length <= 1 && authors[0]?.name.toLowerCase().includes("tushar")) {
    return []
  }

  return authors
    .filter((author) => !author.name.toLowerCase().includes("tushar"))
    .map((author) => {
      const authorKey = Object.keys(authorsMap).find((key) => author.name.toLowerCase().includes(key.toLowerCase()))
      return authorKey ? authorsMap[authorKey as keyof typeof authorsMap] : ""
    })
    .filter(Boolean)
}

export {addBaseUrlToImages, extractFrontMatterAndContent}
