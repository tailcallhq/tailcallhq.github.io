import React from "react"
import CodeBlock from "@theme/CodeBlock"
import Version from "./Version"

const InstallCommand = (): JSX.Element => {
  const command = `curl -sSL https://raw.githubusercontent.com/tailcallhq/tailcall/master/install.sh | bash -s -- `

  return (
    <div>
      <CodeBlock>
        {command}
        <Version />
      </CodeBlock>
    </div>
  )
}

export default InstallCommand
