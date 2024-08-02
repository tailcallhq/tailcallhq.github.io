import React from "react"
import {Checkbox as MuiCheckbox} from "@mui/material"
import {WidgetProps} from "@rjsf/utils"

export const Checkbox = (props: WidgetProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-1">
        <MuiCheckbox id={props.id} checked={Boolean(props.value)} onChange={handleChange} name={props.id} />
        <div className="ml-1">{props.label || ""}</div>
      </div>
      <span className="field-description">{props.schema.description}</span>
    </div>
  )
}
