import React from "react"
import clsx from "clsx"
import styles from "./styles.module.css"

type FeatureItem = {
  title: string
  Svg: React.ComponentType<React.ComponentProps<"svg">>
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: "🔥 Blazingly Fast",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Leverage break through performance optimizations to deliver the fastest
        experience to your users.
      </>
    ),
  },

  {
    title: "🛡️ Battle Tested",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Trust in Tailcall's robust and reliable system, proven in the toughest
        tech environments at scale.
      </>
    ),
  },
  {
    title: "🚀 Productive",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Boost your team's productivity with seamless API integration, compile
        time validations and simplified collaboration.
      </>
    ),
  },
  {
    title: "❤️ Open Source",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        It's not just using a tool, join a global community of developers
        committed to shaping the future of API orchestration.
      </>
    ),
  },
]

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.slice(0, 3).map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className="row row-center">
          {FeatureList.slice(3).map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
