import React from "react"
import Layout from "@theme/Layout"

import HomePage from "../components/home"

export default function Home(): JSX.Element {
  return (
    <Layout title="API Platform" description="API Platform engineered for scale.">
      <HomePage />
    </Layout>
  )
}
