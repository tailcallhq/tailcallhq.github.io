import React from "react"
import {Tooltip, IconButton} from "@mui/material"
import {InfoOutlined} from "@mui/icons-material"

const FieldTemplate = (props: any) => {
  const {id, label, required, description, children} = props
  console.log(props)
  return (
    <div className="field-template">
      {label && (
        <div className="field-label">
          <label htmlFor={id} className="field-label-text">
            {label}
            {required && "*"}
            {description?.props?.description && (
              <Tooltip title={description?.props?.description} arrow>
                <IconButton size="small" className="info-icon">
                  <InfoOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </label>
        </div>
      )}
      <div className="field-body">{children}</div>
    </div>
  )
}

export default FieldTemplate
