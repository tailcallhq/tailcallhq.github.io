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

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${props.title}-content`}
          id={`${props.title}-header`}
        >
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {props.description && <Typography>{props.description}</Typography>}
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
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

