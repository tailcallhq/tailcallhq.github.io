import React from "react"
import {Add} from "@mui/icons-material"
import {IconButton} from "@mui/material"
import {Accordion, AccordionSummary, AccordionDetails, Typography} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {ObjectFieldTemplateProps} from "@rjsf/utils"

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const handleAddClick = () => {
    if (props.onAddClick) {
      props.onAddClick(props.schema)()
    }
  }

  const getObjectFieldBody = () => {
    return (
      <div>
        {props.description && <div className="field-description my-SPACE_02">{props.description}</div>}
        {props.properties.map((element) => (
          <div className="property-wrapper" key={element.name}>
            {element.content}
          </div>
        ))}
        {props.schema.additionalProperties && (
          <IconButton onClick={handleAddClick}>
            <Add fontSize="small" />
          </IconButton>
        )}
      </div>
    )
  }

  const getRootObjectContent = () => {
    return (
      <>
        <div className="mb-SPACE_04 bg-tailCall-yellow rounded-xl sm:rounded-xl px-SPACE_02 w-fit">
          <Typography variant="h5">{props.title}</Typography>
        </div>
        {getObjectFieldBody()}
      </>
    )
  }

  return (
    <div>
      {props?.idSchema["$id"] !== "root" ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${props.title}-content`}
            id={`${props.title}-header`}
          >
            <Typography variant={"h5"}>{props.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{getObjectFieldBody()}</AccordionDetails>
        </Accordion>
      ) : (
        getRootObjectContent()
      )}
    </div>
  )
}
