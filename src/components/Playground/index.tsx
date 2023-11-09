import React from "react"
import styles from "./styles.module.css"

export default function Playground(): JSX.Element {
  return (
    <div className="text--center">
      <div className="text--center padding-horiz--md">
        <h3>Try it out for yourself!</h3>
        <iframe
          loading="lazy"
          className={styles.playground}
          src={`https://codesandbox.io/p/github/neo773/tailcall-sandbox/main?file=%2Fapp%2Fexample.graphql`}
        />
      </div>
    </div>
  )
}
