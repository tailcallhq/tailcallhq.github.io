import fs from "fs"
import graymatter from "gray-matter"

const BASE_URL = "https://raw.githubusercontent.com/tailcallhq/tailcallhq.github.io/develop/"

const addBaseUrlToImages = (markdown: string): string => {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  return markdown.replace(imageRegex, (match, alt, src) => {
    if (!src.startsWith("http") && !src.startsWith("https")) {
      src = `${BASE_URL}${src.replace(/^\.\.\//, "")}`
    }
    return `![${alt}](${src})`
  })
}

const extractFrontMatterAndContent = (filePath: string) => {
  const md = fs.readFileSync(filePath, "utf-8")
  const {data, content} = graymatter(md)
  const frontMatter = data as {
    title: string
    slug: string
    tags: string[]
  }
  const {title, slug, tags} = frontMatter
  return {title, slug, tags, content}
}

export {addBaseUrlToImages, extractFrontMatterAndContent}
