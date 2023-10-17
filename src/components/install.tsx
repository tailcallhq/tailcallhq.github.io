import React from "react"
import CodeBlock from "@theme/CodeBlock"
import github from "../gen/github.json" // path to your JSON file

const InstallCommand = () => {
  const version = github.release.version
  const command = `curl -sSL https://raw.githubusercontent.com/tailcallhq/tailcall/master/install.sh | bash -s -- ${version}`

  return (
    <div>
      <CodeBlock>{command}</CodeBlock>
    </div>
  )
}

export default InstallCommand
