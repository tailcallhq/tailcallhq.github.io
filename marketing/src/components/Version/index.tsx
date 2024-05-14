import React, {useEffect, useState} from "react"

const Version = (): JSX.Element => {
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
  return (
    <>
      <span>
        <b>{version}</b>
      </span>
    </>
  )
}

export default Version
