import React from "react"
import {Add, Remove} from "@mui/icons-material"
import {IconButton} from "@mui/material"
import {Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {ArrayFieldTemplateProps} from "@rjsf/utils"

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const handleAddClick = () => {
    if (props.onAddClick) {
      props.onAddClick()
    }
  }

  const getArrayFieldBody = () => {
    return (
      <div>
        {props.schema.description && <div className="field-description my-SPACE_02">{props.schema.description}</div>}
        {props.items &&
          props.items.map((element) => (
            <div key={element.index} className="array-item">
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs>
                  {element.children}
                </Grid>
                <Grid item>
                  {element.hasRemove && (
                    <IconButton onClick={element.onDropIndexClick(element.index)}>
                      <Remove fontSize="small" />
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

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${props.title}-content`}
          id={`${props.title}-header`}
        >
          <Typography variant="h5">{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{getArrayFieldBody()}</AccordionDetails>
      </Accordion>
    </div>
  )
}

export default ArrayFieldTemplate
