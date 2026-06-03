import React from "react"
import Layout from "@theme/Layout"
import {PageDescription, PageTitle} from "../constants/titles"

const PlaygroundLauncher = () => {
  return (
    <Layout title={PageTitle.PLAYGROUND} description={PageDescription.PLAYGROUND}>
      <main>
        <a href="/playground/app/">Open Tailcall Playground</a>
      </main>
    </Layout>
  )
}

export default PlaygroundLauncher
