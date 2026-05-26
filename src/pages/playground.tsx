import React, {useEffect, useState} from "react"
import ReactGA from "react-ga4"
import Layout from "@theme/Layout"
import PlaygroundPage from "../components/playground"
import ConfigGeneratorPage from "./config-generator"
import {useLocation} from "@docusaurus/router"
import {PageDescription, PageTitle} from "../constants/titles"

const Playground = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<"graphql" | "config">("graphql")

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Playground Page"})
  }, [])

  return (
    <Layout title={PageTitle.PLAYGROUND} description={PageDescription.PLAYGROUND}>
      {/* Tab switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex gap-1 p-1 bg-[#0d0d1a] rounded-xl border border-[#2a2a3e] w-fit">
          <button
            onClick={() => setActiveTab("graphql")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "graphql"
                ? "bg-[#6366f1] text-white shadow-lg"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
          >
            GraphQL Playground
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === "config"
                ? "bg-[#6366f1] text-white shadow-lg"
                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
          >
            Config Generator
          </button>
        </div>
      </div>

      {activeTab === "graphql" ? <PlaygroundPage /> : <ConfigGeneratorPage />}
    </Layout>
  )
}

export default Playground
