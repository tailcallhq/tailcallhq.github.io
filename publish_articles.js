const publisher = require("publisher")
const path = require("path")

function main() {
  let posts_directory = path.join(__dirname, "blog")
  publisher.init(posts_directory)
}

main()
