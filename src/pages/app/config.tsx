import React, {useEffect, useState, useCallback} from "react"
import Layout from "@theme/Layout"
import ConfigGenerator from "@site/src/components/config-generator/ConfigGenerator"

const ConfigPage = (): JSX.Element => {
  return (
    <Layout
      title="Tailcall Configuration Generator"
      description="Generate Tailcall configurations visually with our interactive configuration builder."
    >
      <div className="min-h-screen bg-tailCall-dark-600 text-tailCall-light-100">
        <ConfigGenerator />
      </div>
    </Layout>
  )
}

export default ConfigPage
