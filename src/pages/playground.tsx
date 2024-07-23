import React, {useState, useEffect} from "react"
import axios from "axios"
import Form, {IChangeEvent, Validator} from "@rjsf/core"
import Select from "react-select"
import * as FileSaver from "file-saver"
import * as yaml from "js-yaml"
import {print, parse} from "graphql"
import Layout from "@theme/Layout"
import {useLocation} from "@docusaurus/router"
import {PageDescription, PageTitle} from "../constants/titles"
import ReactGA from "react-ga4"
import "../css/custom.css"
import "../css/graphiql.css"

const validator: Validator = (formData, schema, errors) => {
  // Add custom validation logic here if needed
  return errors
}

const PlaygroundPage: React.FC = () => {
  const [schema, setSchema] = useState<any | null>(null)
  const [formData, setFormData] = useState({})
  const [format, setFormat] = useState("json")
  const [options, setOptions] = useState<{value: string; label: string}[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    axios
      .get("/schema.json")
      .then((response) => {
        console.log("Schema fetched:", response.data)
        if (isValidSchema(response.data)) {
          setSchema(response.data)
        } else {
          throw new Error("Invalid schema")
        }
        setOptions([
          {value: "json", label: "JSON"},
          {value: "yml", label: "YAML"},
          {value: "graphql", label: "GraphQL"},
        ])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching schema:", error)
        setError("Failed to load schema")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Playground Page"})
  }, [location.pathname])

  const isValidSchema = (schema: any): boolean => {
    return schema && schema.type === "object" && schema.properties
  }

  const handleSubmit = ({formData}: IChangeEvent<any>) => {
    setFormData(formData)
    let configData
    let filename = "config"
    switch (format) {
      case "yml":
        configData = new Blob([yaml.dump(formData)], {type: "application/x-yaml"})
        filename = "config.yml"
        break
      case "graphql":
        const graphqlString = print(parse(JSON.stringify(formData)))
        configData = new Blob([graphqlString], {type: "application/graphql"})
        filename = "config.graphql"
        break
      default:
        configData = new Blob([JSON.stringify(formData, null, 2)], {type: "application/json"})
        filename = "config.json"
    }
    FileSaver.saveAs(configData, filename)
  }

  if (loading) {
    return (
      <Layout title={PageTitle.PLAYGROUND} description={PageDescription.PLAYGROUND}>
        <div className="container mx-auto p-4 text-center">
          <div className="loader"></div>
          <p>Loading schema...</p>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout title={PageTitle.PLAYGROUND} description={PageDescription.PLAYGROUND}>
        <div className="container mx-auto p-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={PageTitle.PLAYGROUND} description={PageDescription.PLAYGROUND}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Tailcall Configuration Playground</h1>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Select Format:</label>
          <Select
            options={options}
            defaultValue={options.find((option) => option.value === format)}
            onChange={(selectedOption) => setFormat(selectedOption?.value || "json")}
            className="w-full"
          />
        </div>
        <Form
          schema={schema}
          formData={formData}
          onSubmit={handleSubmit}
          validator={validator}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
              Generate Configuration
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  )
}

export default PlaygroundPage
