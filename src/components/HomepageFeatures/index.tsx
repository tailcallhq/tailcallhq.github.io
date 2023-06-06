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
    title: "🚀 Performance",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Leverage class leading optimizations to deliver the fastest experience
        to your users and reduce your cloud bill.
      </>
    ),
  },

  {
    title: "💪 Robustness",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        From tiny modifications to breaking changes, deploy to production
        fearlessly.
      </>
    ),
  },
  {
    title: "👷‍♀️ Maintenance",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        No need of a dedicated team to write, manage or scale GraphQL anymore.
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
