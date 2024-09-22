import LvlIcon from "@site/static/icons/basic/lvl.svg"
import ContentIcon from "@site/static/icons/basic/content.svg"
import AnchorIcon from "@site/static/icons/basic/anchor.svg"
import React from "react"

const ItemIcon = (props: {type: string}) => {
  switch (props.type) {
    case "lvl1":
      return <LvlIcon />
    case "content":
      return <ContentIcon />
    default:
      return <AnchorIcon />
  }
}

export default ItemIcon
