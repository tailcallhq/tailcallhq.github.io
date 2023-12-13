import React from "react"
import Layout from "@theme/Layout"

import AboutPage from "../components/about"

export default function About(): JSX.Element {
  return (
    <Layout title="API Platform" description="API Platform engineered for scale.">
      <AboutPage />
    </Layout>
  )
}
