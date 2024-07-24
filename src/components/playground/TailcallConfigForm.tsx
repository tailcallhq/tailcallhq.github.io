import React, { useEffect, useState } from "react"
import Form from "@rjsf/mui"
import jsYaml from "js-yaml"
import axios from "axios"
import { configFileName, tailcallConfigSchema } from "@site/src/constants"
import validator from "@rjsf/validator-ajv8"
import "../../css/configForm.css"
import { downloadFile } from "@site/src/utils"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import FieldTemplate from "./FieldTemplate" // Import your custom FieldTemplate
import { DescriptionFieldProps, TitleFieldProps, UiSchema } from "@rjsf/utils"
import { Download, Close } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const formContext = {
  className: "font-space-grotesk-imp",
}

const TailcallConfigForm = () => {
  const [schema, setSchema] = useState({})
  const [formData, setFormData] = useState({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    axios.get(`${tailcallConfigSchema}?v=${+new Date()}`).then((res) => setSchema(res.data))
  }, [])

  const handleSubmit = ({ formData }: any) => {
    console.log("Data submitted: ", formData)
    setIsFormSubmitted(true)
    setIsModalOpen(true)
  }

  const onFormDataChange = ({ formData }: any) => {
    setFormData(formData)
    setIsFormSubmitted(false)
  }

  const uiSchema: UiSchema = {
    "ui:title": "Generate Tailcall Configuration"
  }

  const downloadConfigJson = () => {
    const jsonString = JSON.stringify(formData, null, 2)
    downloadFile(jsonString, "application/json", `${configFileName}.json`)
  }

  const downloadConfigYaml = () => {
    const yamlString = jsYaml.dump(formData)
    downloadFile(yamlString, "text/yaml", `${configFileName}.yml`)
  }

  const handleError = (errors: any) => {
    console.log("Form errors: ", errors)
    setIsFormSubmitted(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const DownloadButton = ({ onClick, title }: { onClick: () => void; title: string }) => (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 w-[100%] justify-center bg-white font-bold cursor-pointer py-2 px-4 rounded-lg download-button flex items-center"
      disabled={!isFormSubmitted}
    >
      <Download className="mr-2" />
      {title}
    </button>
  )

  function DescriptionFieldTemplate(props: DescriptionFieldProps) {
    console.log(props)
    return <span className="field-description">{props.description}</span>
  }

  return (
    <div className="m-8">
      <Form
        className="config-form"
        schema={schema}
        formData={formData}
        onChange={onFormDataChange}
        onSubmit={handleSubmit}
        onError={handleError}
        formContext={formContext}
        validator={validator}
        focusOnFirstError
        uiSchema={uiSchema}
        templates={{ DescriptionFieldTemplate }} // Use the custom templates
      >
        <div className="flex items-center justify-center">
          <button type="submit" className="border-none py-3 px-8 rounded-md bg-black text-white">
            Submit
          </button>
        </div>
      </Form>
      <Modal open={isModalOpen} onClose={closeModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box className="bg-white p-6 m-6 rounded-lg shadow-lg config-success-modal-body">
          <div className="flex justify-between items-center">
            <div id="modal-title" className=" text-title-medium font-bold">
              Tailcall Configuration Generated{" "}
              <span className="bg-tailCall-yellow rounded-sm sm:rounded-xl px-SPACE_02">Successfully</span> 🚀
            </div>
            <IconButton aria-label="close" onClick={closeModal} className="absolute right-2">
              <Close />
            </IconButton>
          </div>

          <div className="cursor-pointer ml-auto mr-auto mt-4 flex items-center justify-around">
            <div className="w-[48%]">
              <DownloadButton onClick={downloadConfigJson} title="JSON Config" />
            </div>
            <div className="w-[48%]">
              <DownloadButton onClick={downloadConfigYaml} title="YAML Config" />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default TailcallConfigForm