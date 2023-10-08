import fs from "fs"
import path from "path"
import axios from "axios"

const generate = async () => {
  const file = "./src/gen/tailcall-version.json"
  const directoryPath = path.dirname(file)
  // Create the directory if it doesn't exist
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, {recursive: true})
  }
  console.log(`Generating ${file} ...`)
  const response = await axios.get("https://api.github.com/repos/tailcallhq/tailcall/releases/latest")
  if (response) {
    fs.writeFileSync(file, JSON.stringify(response.data), "utf8")
    console.log(`Generated ${file}`)
  } else {
    console.log("Failed to get a valid response from https://api.github.com/repos/tailcallhq/tailcall/releases/latest")
  }
}

generate()
