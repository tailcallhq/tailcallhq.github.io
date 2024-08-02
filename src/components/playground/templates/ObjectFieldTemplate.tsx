import React from "react"
import { ObjectFieldTemplateProps } from "@rjsf/utils"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleAddClick = (e:any) => {
    e.stopPropagation();
    e.preventDefault();
    if (props.onAddClick) {
      props.onAddClick(props.schema)()
    }
  }

  const getObjectFieldBody = () => {
    return (
      <div className="add-container">
        <div className="title-description">
          {props.description && <div className="field-description my-2">{props.description}</div>}
          {props.properties.map((element) => (
            <div className="property-wrapper" key={element.name}>
              {element.content}
            </div>
          ))}
        </div>
        
      </div>
    )
  }

  const getRootObjectContent = () => {
    return (
      <>
        <div className="mb-4 bg-yellow-300 rounded-xl sm:rounded-xl px-2 w-fit">
          <h5 className="form-heading">{props.title}</h5>
        </div>
        {getObjectFieldBody()}
      </>
    )
  }

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      {props?.idSchema["$id"] !== "root" ? (
        <div className="collapse-field-head">
          <div className="collapse-field" onClick={toggleAccordion}>
            <h5 className="text-lg collapse-head">{props.title}</h5>
            <svg className={`w-5 h-5 transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          {isOpen && <div className="p-2">{getObjectFieldBody()}</div>}
          <div>
          {isOpen && props.schema.additionalProperties && (
            <IconButton className="add-btn" onClick={handleAddClick}>
              <Add fontSize="small" />
            </IconButton>
          )}
        </div>
        </div>
      ) : (
        getRootObjectContent()
      )}
    </div>
  )
}
