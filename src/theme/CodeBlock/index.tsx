import React, { useState } from "react"
import CodeBlock from "@theme-original/CodeBlock"
import type CodeBlockType from "@theme/CodeBlock"
import type {WrapperProps} from "@docusaurus/types"

type Props = WrapperProps<typeof CodeBlockType>

export default function CodeBlockWrapper(props: Props): JSX.Element {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(props.children?.toString() || "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-[#35353A] p-2 flex justify-end">
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
            <img src="/icons/basic/copy-icon.svg" alt="" className="w-4 h-4 cursor-pointer" />
          </button>
        </div>
      </div>
      <CodeBlock {...props} />
    </div>
  )
}
