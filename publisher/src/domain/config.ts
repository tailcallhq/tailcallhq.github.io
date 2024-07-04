import HashnodePublisher from "../integrations/hashnode_publisher"
import Publisher from "./publisher"
import "dotenv/config"

export interface Config {
  posts_directory: string
  publishers: Array<Publisher>
}

export function buildConfig(posts_directory: string): Config {
  let config: Config = {
    posts_directory,
    publishers: [],
  }

  let hashnode_token = process.env.HASHNODE_API_TOKEN
  let hashnode_publication_id = process.env.HASHNODE_PUBLICATION_ID
  let hashnode_enabled = hashnode_token !== undefined && hashnode_publication_id !== undefined

  if (hashnode_enabled) {
    config.publishers.push(new HashnodePublisher(hashnode_token as string, hashnode_publication_id as string))
  }

  return config
}
