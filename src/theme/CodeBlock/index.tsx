import React from "react"
import CodeBlock from "@theme-original/CodeBlock"
import type CodeBlockType from "@theme/CodeBlock"
import type {WrapperProps} from "@docusaurus/types"
import CopyButton from "./CopyButton"

type Props = WrapperProps<typeof CodeBlockType>

export default function CodeBlockWrapper(props: Props): JSX.Element {
  console.log(props)
  return (
    <div style={{background: "rgb(44, 52, 68)"}} className=" overflow-clip rounded-2xl z-10">
      <div className="h-fit p-3 flex items-center justify-end">
        <CopyButton className="mt-3 mr-5 text-gray-300 text-opacity-60 hover:text-opacity-80" code={props.children as string} />
      </div>
      <CodeBlock {...props} />
    </div>
  )
}
