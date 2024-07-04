import matter from "gray-matter"
import {readFileSync} from "fs"
import path from "path"
import {Article, ArticleBuilder} from "./domain/article"
import Publisher from "./domain/publisher"
import HashnodePublisher from "./integrations/hashnode_publisher"
import 'dotenv/config'

interface HashNodeConfig {
  api_token?: string
  publication_id?: string
}

interface Config {
  post_title: string
  posts_directory: string
  hashnode: HashNodeConfig | null
}

export function init(posts_directory: string) {
  const args = process.argv.slice(2)

  if (!args.length || args.length > 2) {
    throw new Error("The arguments given are not correct")
  }

  if (args[0] == "post:") {
    let post_title = args[1].trim()

    if (!isValidPostTitle(post_title)) {
      throw new Error("Post title is not valid")
    }

    let hashnode_token = process.env.HASHNODE_API_TOKEN
    let hashnode_publication_id = process.env.HASHNODE_PUBLICATION_ID

    let hashnode_enabled = hashnode_token !== undefined && hashnode_publication_id !== undefined

    let config: Config = {
      post_title,
      posts_directory,
      hashnode: null,
    }

    if (hashnode_enabled) {
      let hashnode_config: HashNodeConfig = {
        api_token: hashnode_token,
        publication_id: hashnode_publication_id,
      }
      config["hashnode"] = hashnode_config
    }

    start_publishing(config)
  }
}

function start_publishing(config: Config) {
  if (!config.post_title) {
    throw new Error("Must provide the title of the blog")
  }

  if (!config.posts_directory) {
    throw new Error("Must provide the posts directory")
  }

  const blog_content = readFileSync(path.join(config.posts_directory, `${config.post_title}.md`), "utf-8")
  if (!blog_content) {
    throw new Error("Couldn't find the content in the provided path")
  }

  const {data, content} = matter(blog_content)
  let article: Article = new ArticleBuilder(data.title, data.slug, content)
    .withSubtitle(data.subtitle)
    .withCanonicalUrl(data.canonicalUrl)
    .withSEO({title: data.seoTitle, description: data.seoDescription})
    .withTags(data.tags)
    .withCover(data.cover)
    .build()

  const publishers: Publisher[] = []
  if (config.hashnode) {
    let {api_token, publication_id} = config.hashnode

    if (!api_token) {
      throw new Error("The api_token for hashnode must be present")
    }

    if (!publication_id) {
      throw new Error("The publication_id for hashnode must be present")
    }

    publishers.push(new HashnodePublisher(api_token, publication_id))
  }

  for (let publisher of publishers) {
    publisher.publish(article)
  }
}

function isValidPostTitle(input: string) {
  const pattern = /^[a-z](-?[a-z])*$/
  return pattern.test(input)
}
