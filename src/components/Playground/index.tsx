import React from "react"
import styles from "./styles.module.css"

export default function Playground(): JSX.Element {
  return (
    <div className="text--center">
      <div className="text--center padding-horiz--md">
        <h3>Try it out for yourself!</h3>
        <iframe
          className={styles.playground}
          src={`https://codesandbox.io/p/sandbox/github/neo773/tailcall-sandbox/tree/main?file=%2Fapp%2Fexample.graphql`}
        />
      </div>
    </div>
  )
}
