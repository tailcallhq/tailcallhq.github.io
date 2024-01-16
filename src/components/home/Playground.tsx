import React from "react"
import Heading from "@theme/Heading"

const Playground = (): JSX.Element => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center my-SPACE_16">
      <Heading as="h3" className="text-display-medium text-start">
        Playground
      </Heading>
      <iframe
        title="Tailcall GraphQL Playground"
        style={{
          width: "90%",
          height: 700,
          outline: "1px solid #252525",
          border: 0,
          borderRadius: 8,
          marginBottom: 0,
          zIndex: 100,
          scale: 0.95,
        }}
        className="max-w-7xl"
        src="https://codesandbox.io/p/github/tailcallhq/tailcall-sandbox/main?file=%2Fexercises%2Fexercise_1.graphql"
      ></iframe>
    </div>
  )
}

export default Playground
