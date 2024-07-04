const publisher = require("publisher")
const path = require("path")
require("dotenv").config()

function main() {
  let posts_directory = path.join(__dirname, "posts")
  publisher.init(posts_directory)
}

main()
