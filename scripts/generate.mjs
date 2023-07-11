import axios from "axios"
import fs from "fs/promises"

const generate = async () => {
  const file = "./src/gen/tailcall-version.json"

  console.log(`Generating ${file} ...`)
  const response = await axios.get(
    "https://api.github.com/repos/tailcallhq/tailcall/releases/latest"
  )

  fs.writeFile(file, JSON.stringify(response.data))

  console.log(`Generated ${file}`)
}

generate()
