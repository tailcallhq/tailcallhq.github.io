import React from "react"
import Playground from "./Playground"
import TailcallConfigForm from "./TailcallConfigForm"

const PlaygroundPage = (): JSX.Element => {
  return (
    <>
      <Playground />
      <TailcallConfigForm />
    </>
  )
}

export default PlaygroundPage
