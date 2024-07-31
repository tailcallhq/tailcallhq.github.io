import React from "react"
import {DescriptionFieldProps} from "@rjsf/utils"

export const DescriptionFieldTemplate = (props: DescriptionFieldProps) => {
  return <span className="field-description">{props.description}</span>
}
