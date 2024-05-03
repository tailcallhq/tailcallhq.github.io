import React, {useEffect, useState} from "react"
import Playground from "./Playground"

const PlaygroundPage = (): JSX.Element => {
  const [editorLoaded, setEditorLoaded] = useState(false)

  useEffect(() => {
    if (document.getElementsByClassName("graphiql-container")) {
      setEditorLoaded(true)
    }
  }, [])

  return (
    <>
      <Playground />
    </>
  )
}

export default PlaygroundPage
