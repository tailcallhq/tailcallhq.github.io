import React, { useEffect, useState } from "react"
import Form from "@rjsf/mui"
import jsYaml from "js-yaml"
import axios from "axios"
import { configFileName, tailcallConfigSchema } from "@site/src/constants"
import { Theme } from "@site/src/constants"
import validator from "@rjsf/validator-ajv8"
import "../../css/configForm.css"
import { downloadFile } from "@site/src/utils"
import LinkButton from "../shared/LinkButton"

const formContext = {
  className: "font-space-grotesk-imp",
}

const TailcallConfigForm = () => {
  const [schema, setSchema] = useState({})
  const [formData, setFormData] = useState({})

  useEffect(() => {
    axios.get(`${tailcallConfigSchema}?v=${+new Date()}`).then((res) => setSchema(res.data))
  }, [])

  const handleSubmit = () => {
    console.log("Data submitted: ", formData)
  }

  const onFormDataChange = ({ formData }: any) => {
    setFormData(formData)
  }

  const downloadConfigJson = () => {
    const jsonString = JSON.stringify(formData, null, 2)
    downloadFile(jsonString, "application/json", `${configFileName}.json`)
  }

  const downloadConfigYaml = () => {
    const yamlString = jsYaml.dump(formData)
    downloadFile(yamlString, "text/yaml", `${configFileName}.yml`)
  }

  return (
    <div className="m-8 ">
      <Form
        className="config-form"
        schema={schema}
        formData={formData}
        onChange={onFormDataChange}
        formContext={formContext}
        validator={validator}
        focusOnFirstError
        liveValidate
      >
        <div className="flex items-center justify-center">
          <button type='submit' onClick={handleSubmit} className="bg-white border-none">
            <LinkButton theme={Theme.Dark} title="Submit" />
          </button>
          {/* {isConfigValid && (
            <> */}
          <button type="button" onClick={downloadConfigJson} className="bg-white border-none">
            <LinkButton theme={Theme.Dark} title="Download JSON Config" />
          </button>
          <button type="button" onClick={downloadConfigYaml} className="bg-white border-none">
            <LinkButton theme={Theme.Dark} title="Download YAML Config" />
          </button>
          {/* </>
          )} */}
        </div>
      </Form>
    </div>
  )
}

export default TailcallConfigForm
