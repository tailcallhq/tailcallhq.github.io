import React, { useEffect, useState } from "react";
import Form from "@rjsf/mui";
import jsYaml from "js-yaml";
import axios from "axios";
import { configFileName, tailcallConfigSchema } from "@site/src/constants";
import validator from "@rjsf/validator-ajv8";
import "../../css/configForm.css";
import { downloadFile } from "@site/src/utils";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FieldTemplate from "./FieldTemplate"; // Import your custom FieldTemplate
import { TitleFieldProps, UiSchema } from "@rjsf/utils";

const formContext = {
  className: "font-space-grotesk-imp",
};

const TailcallConfigForm = () => {
  const [schema, setSchema] = useState({});
  const [formData, setFormData] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${tailcallConfigSchema}?v=${+new Date()}`).then((res) => setSchema(res.data));
  }, []);

  const handleSubmit = ({ formData }: any) => {
    console.log("Data submitted: ", formData);
    setIsFormSubmitted(true);
    setIsModalOpen(true);
  };

  const onFormDataChange = ({ formData }: any) => {
    setFormData(formData);
    setIsFormSubmitted(false);
  };

  const downloadConfigJson = () => {
    const jsonString = JSON.stringify(formData, null, 2);
    downloadFile(jsonString, "application/json", `${configFileName}.json`);
  };

  const downloadConfigYaml = () => {
    const yamlString = jsYaml.dump(formData);
    downloadFile(yamlString, "text/yaml", `${configFileName}.yml`);
  };

  const handleError = (errors: any) => {
    console.log("Form errors: ", errors);
    setIsFormSubmitted(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const DownloadButton = ({ onClick, title }: { onClick: () => void; title: string }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-5 rounded-lg ml-3 ${isFormSubmitted ? "bg-black text-white border-none" : "opacity-50 cursor-not-allowed"}`}
      disabled={!isFormSubmitted}
    >
      {title}
    </button>
  );

  function TitleFieldTemplate() {
    return null
  }
  function DescriptionFieldTemplate() {
    return null
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
        liveValidate
      // templates={{ TitleFieldTemplate, DescriptionFieldTemplate }} // Use the custom FieldTemplate
      >
        <div className="flex items-center justify-center">
          <button type="submit" className="border-none py-5 px-8 rounded-lg bg-black text-white">
            Submit
          </button>
          <DownloadButton onClick={downloadConfigJson} title="Download JSON Config" />
          <DownloadButton onClick={downloadConfigYaml} title="Download YAML Config" />
        </div>
      </Form>
      <div className="modal-box">
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box className="bg-white p-6 m-6 rounded-lg shadow-lg">
            <h2 id="modal-title" className="text-xl font-bold mb-4">
              Form Submitted <span className="bg-tailCall-yellow rounded-sm sm:rounded-xl px-SPACE_02">Successfully</span>
            </h2>
            <p id="modal-description">Your form has been submitted successfully!</p>
            <button onClick={closeModal} className="mt-4 bg-black text-white py-2 px-4 rounded-lg">
              Close
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default TailcallConfigForm;
