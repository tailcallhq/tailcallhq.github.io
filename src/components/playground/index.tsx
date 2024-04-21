import React from "react"
import Playground from "./Playground"
import Footer from "../shared/Footer"

const PlaygroundPage = (): JSX.Element => {
  return (
    <>
      <Playground defaultApiEndpoint={new URL("http://localhost:8000/graphql")} />
      <Footer />
    </>
  )
}

export default PlaygroundPage
