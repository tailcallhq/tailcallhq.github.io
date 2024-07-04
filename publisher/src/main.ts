import matter from "gray-matter"
import {readFileSync, readdirSync, writeFileSync} from "fs"
import path from "path"
import {Article, ArticleBuilder} from "./domain/article"
import {buildConfig, Config} from "./domain/config"

interface Post {
  file_path: string
  matter: matter.GrayMatterFile<string>
}

export function init(posts_directory: string) {
  if (!posts_directory) {
    throw new Error("Must provide the posts directory")
  }

  let config = buildConfig(posts_directory)
  start_publishing(config)
}

async function start_publishing(config: Config) {
  if (!config.publishers.length) return
  let parsed_files: Array<Post> = getUnpublishedPosts(config)

  for (const parsed_file of parsed_files) {
    let file_header = parsed_file.matter.data
    const is_published = file_header.status == "PUBLISHED"
    if (is_published) {
      continue
    }

    let file_content = parsed_file.matter.content
    let article: Article = new ArticleBuilder(file_header.title, file_header.slug, file_content)
      .withSubtitle(file_header.subtitle)
      .withCanonicalUrl(file_header.canonicalUrl)
      .withSEO({title: file_header.seoTitle, description: file_header.seoDescription})
      .withTags(file_header.tags)
      .withCover(file_header.cover)
      .build()

    try {
      for (let publisher of config.publishers) {
        switch (file_header.status) {
          case "DRAFT":
            await publisher.publishDraft(article)
            break

          case "EDIT":
            let content_id = publisher.getContentId(file_header)
            await publisher.edit(content_id, article)
            updatePost(parsed_file, "PUBLISHED")
            break

          default:
            let post_id = await publisher.publish(article)
            parsed_file.matter.data = publisher.addContentId(file_header, post_id)
            updatePost(parsed_file, "PUBLISHED")
        }
      }
    } catch (err) {
      console.error(err)
      process.exit(0)
    }
  }
}

function getUnpublishedPosts(config: Config): Array<Post> {
  let files = readdirSync(config.posts_directory)

  let parsed_files: Array<Post> = []
  for (const file of files) {
    let file_path = path.join(config.posts_directory, file)
    const blog_content = readFileSync(file_path, "utf-8")
    let file_parsed: matter.GrayMatterFile<string> = matter(blog_content)
    if (!file_parsed.data.status || file_parsed.data.status != "PUBLISHED") {
      let parsed_file: Post = {
        file_path,
        matter: file_parsed,
      }
      parsed_files.push(parsed_file)
    }
  }
  return parsed_files
}

function updatePost(parsed_file: Post, status: string): void {
  let data = parsed_file.matter.data
  const updatedFileContent = matter.stringify(parsed_file.matter.content, {
    ...data,
    status,
  })

  writeFileSync(parsed_file.file_path, updatedFileContent, "utf-8")
}
