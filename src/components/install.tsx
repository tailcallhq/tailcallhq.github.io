import React, {useEffect, useState} from "react"
import CodeBlock from "@theme/CodeBlock"

const InstallCommand = () => {
  const [version, setVersion] = useState<string>()

  const fetchVersion = async () => {
    const res = await fetch("https://api.github.com/repos/tailcallhq/tailcall/releases/latest")
    const data = (await res.json()) as {tag_name: string}
    if (typeof data?.tag_name === "string") {
      setVersion(data.tag_name)
    }
  }

  useEffect(() => {
    fetchVersion().catch(console.error)
  }, [])

  const command = `curl -sSL https://raw.githubusercontent.com/tailcallhq/tailcall/master/install.sh | bash -s -- ${version}`

  return (
    <div>
      <CodeBlock>{command}</CodeBlock>
    </div>
  )
}

export default InstallCommand
