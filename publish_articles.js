const publisher = require("publisher")
const path = require("path")
require("dotenv").config()

function main() {
  const args = process.argv.slice(2)

  if (!args.length || args.length > 2) {
    throw new Error("The arguments given are not correct")
  }

  if (args[0] == "post:") {
    let post_title = args[1].trim()

    if (!isValidPostTitle(post_title)) {
      throw new Error("Post title is not valid")
    }

    let posts_directory = path.join(__dirname, "posts")
    let hashnode_token = process.env.HASHNODE_API_TOKEN
    let hashnode_publication_id = process.env.HASHNODE_PUBLICATION_ID

    let config = {
      post_title,
      posts_directory,
      hashnode: {
        api_token: hashnode_token,
        publication_id: hashnode_publication_id,
      },
    }

    publisher.start(config)
  }
}

function isValidPostTitle(input) {
  const pattern = /^[a-z](-?[a-z])*$/
  return pattern.test(input)
}

main()
