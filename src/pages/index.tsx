import React from "react"
import Layout from "@theme/Layout"

import HomePage from "../components/home"

export default function Home(): JSX.Element {
  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <Layout title="API Platform" description="API Platform engineered for scale.">
      <HomePage />
      {!isDevelopment && (
        <img
          style={{height: 0, width: 0}}
          referrerPolicy="no-referrer-when-downgrade"
          src="https://static.scarf.sh/a.png?x-pxid=45ec365f-ab8a-4848-a6a9-bd4ffecfe72e"
        />
      )}
    </Layout>
  )
}
