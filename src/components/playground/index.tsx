import React, {useEffect, useState} from "react"
import Playground from "./Playground"
import Footer from "../shared/Footer"

const PlaygroundPage = (): JSX.Element => {
  const [editorLoaded, setEditorLoaded] = useState(false)

  useEffect(() => {
    if (document.getElementsByClassName("graphiql-container")) {
      setEditorLoaded(true)
    }
  }, [])

  return (
    <>
      <Playground defaultApiEndpoint={new URL("http://localhost:8000/graphql")} />
      {editorLoaded && <Footer />}
    </>
  )
}

export default PlaygroundPage
