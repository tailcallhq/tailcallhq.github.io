import React, {useState} from "react"
import CodeBlock from "@theme-original/CodeBlock"
import type CodeBlockType from "@theme/CodeBlock"
import type {WrapperProps} from "@docusaurus/types"

type Props = WrapperProps<typeof CodeBlockType>

type Primitive = string | boolean | number

interface MetastringData extends Record<string, Primitive> {
  title: string
  showLineNumbers: boolean
}

export default function CodeBlockWrapper(props: Props): JSX.Element {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(props.children?.toString() || "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const parseMetastring = <T extends Partial<Record<string, Primitive>>>(metastring: string | undefined): T => {
    if (!metastring) return {} as T
    const result = {} as T
    const regex = /(\w+)(?:="([^"]*)"|\s*)/g
    let match
    while ((match = regex.exec(metastring)) !== null) {
      const [, key, value] = match
      result[key as keyof T] = (value || "true") as T[keyof T]
    }
    return result
  }

  const metastringData = parseMetastring<MetastringData>(props.metastring)

  return (
    <div className="rounded-3xl overflow-hidden">
      <div className="bg-[#35353A] p-4 flex justify-between items-center">
        <span className="text-white text-xs font-space-mono">{metastringData.title}</span>
        <div className="relative">
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className="flex flex-row items-center bg-transparent appearance-none border-none"
          >
            {copied && (
              <span className="text-xs text-white mr-2 opacity-70 font-space-mono p-0" style={{lineHeight: "0"}}>
                Copied!
              </span>
            )}
            <img
              src="/icons/basic/copy-icon.svg"
              alt="Copy Icon"
              className="w-4 h-4 cursor-pointer hover:opacity-80 transition-opacity duration-150"
            />
          </button>
        </div>
      </div>
      <CodeBlock {...props} />
    </div>
  )
}
