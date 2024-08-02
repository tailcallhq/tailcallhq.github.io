import React from "react"
import {ArrayFieldTemplateProps} from "@rjsf/utils"
import {IconButton} from "@mui/material"
import {Add} from "@mui/icons-material"
import {Grid} from "@mui/material"
import {Remove} from "@mui/icons-material"
export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleAddClick = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    if (props.onAddClick) {
      props.onAddClick()
    }
  }

  const getArrayFieldBody = () => {
    return (
      <div>
        {props.schema.description && <div className="field-description my-2">{props.schema.description}</div>}
        {props.items &&
          props.items.map((element) => (
            <div key={element.index} className="array-item">
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs>
                  {element.children}
                </Grid>
                <Grid item>
                  {element.hasRemove && (
                    <IconButton className="red-remove" onClick={element.onDropIndexClick(element.index)}>
                      <Remove fontSize="medium" />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </div>
          ))}

        {props.canAdd && (
          <IconButton onClick={handleAddClick}>
            <Add fontSize="small" />
          </IconButton>
        )}
      </div>
    )
  }

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="collapse-field-head">
      <div className="collapse-field" onClick={toggleAccordion}>
        <h5 className="text-lg collapse-head">{props.title}</h5>
        <svg
          className={`w-5 h-5 transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      {isOpen && <div className="p-2">{getArrayFieldBody()}</div>}
    </div>
  )
}

export default ArrayFieldTemplate
