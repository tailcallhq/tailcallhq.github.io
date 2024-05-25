import React from "react"
import CopyButton from "./CopyButton"
import {Highlight, PrismTheme, themes} from "prism-react-renderer"
import {twMerge} from "tailwind-merge"

const baseTheme = themes.github
const prismTheme = {
  ...baseTheme,
  styles: [
    ...baseTheme.styles,
    {
      types: ["title"],
      style: {
        color: "#0550AE",
        fontWeight: "bold",
      },
    },
    {
      types: ["parameter"],
      style: {
        color: "#953800",
      },
    },
    {
      types: ["boolean", "rule", "color", "number", "constant", "property"],
      style: {
        color: "#b76b01",
      },
    },
    {
      types: ["atrule", "tag"],
      style: {
        color: "#b76b01",
      },
    },
    {
      types: ["script"],
      style: {
        color: "#24292E",
      },
    },
    {
      types: ["operator", "unit", "rule"],
      style: {
        color: "#D73A49",
      },
    },
    {
      types: ["font-matter", "string", "attr-value"],
      style: {
        color: "#50a14f",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "#b76b01",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#b76b01",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#a626a4",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#4078f2",
      },
    },
    {
      types: ["selector"],
      style: {
        color: "#6F42C1",
      },
    },
    {
      types: ["variable"],
      style: {
        color: "#E36209",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "#a0a1a7",
      },
    },
  ],
} satisfies PrismTheme

const CodeBlock = ({
  language,
  children,
  className,
  showLineNumbers = true,
}: {
  language: string
  children: string
  className?: string
  showLineNumbers?: boolean
}) => (
  <Highlight theme={prismTheme} code={children} language={language}>
    {({tokens, getLineProps, getTokenProps}) => (
      <pre
        className={twMerge("relative font-mono bg-gray-50 p-4 rounded-lg my-4", className)}
        style={{boxShadow: "0 1px 2px 0 #0000001a"}}
      >
        <CopyButton code={children} className={"absolute top-5 right-5"} />
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({line})}>
            {showLineNumbers && <span className="text-gray-400 ml-3 mr-6">{i + 1}</span>}
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({token})} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)
export default CodeBlock
