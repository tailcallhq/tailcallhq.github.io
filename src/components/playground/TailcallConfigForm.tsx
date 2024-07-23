import React, {useEffect, useState} from "react"
import Form from "@rjsf/mui"
import jsYaml from "js-yaml"
import axios from "axios"
import {configFileName, tailcallConfigSchema} from "@site/src/constants"
import validator from "@rjsf/validator-ajv8"
import "../../css/configForm.css"
import {downloadFile} from "@site/src/utils"

const formContext = {
  className: "font-space-grotesk-imp",
}

const TailcallConfigForm = () => {
  const [schema, setSchema] = useState({})

  useEffect(() => {
    axios.get(`${tailcallConfigSchema}?v=${+new Date()}`).then((res) => setSchema(res.data))
  }, [])

  const handleSubmit = ({formData}: any) => {
    console.log("Data submitted: ", formData)
    // downloadConfigJson(formData)
    // downloadConfigYaml(formData)
  }

  const downloadConfigJson = (formData: any) => {
    const jsonString = JSON.stringify(formData, null, 2)
    downloadFile(jsonString, "application/json", `${configFileName}.json`)
  }

  const downloadConfigYaml = (formData: any) => {
    const yamlString = jsYaml.dump(formData)
    downloadFile(yamlString, "text/yaml", `${configFileName}.yml`)
  }

  return (
    <div className="m-8 ">
      <Form
        className="config-form"
        schema={schema}
        formContext={formContext}
        validator={validator}
        onSubmit={handleSubmit}
        focusOnFirstError
        liveValidate
      />
    </div>
  )
}

export default TailcallConfigForm
