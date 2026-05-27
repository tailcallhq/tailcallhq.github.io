import React, {useEffect} from "react"
import Layout from "@theme/Layout"
import ReactGA from "react-ga4"
import ConfigBuilder from "@site/src/components/config-builder/ConfigBuilder"

const ConfigPage = (): JSX.Element => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      ReactGA.send({hitType: "pageview", page: window.location.pathname})
    }
  }, [])

  return (
    <Layout title="Tailcall Config Builder" description="Generate Tailcall configuration from the live schema.">
      <ConfigBuilder />
    </Layout>
  )
}

export default ConfigPage
