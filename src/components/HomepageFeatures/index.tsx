import React from "react"
import clsx from "clsx"
import styles from "./styles.module.css"

type FeatureItem = {
  title: string
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: "Orchestration",
    description: (
      <>
        Harness the power of Tailcall's advanced orchestration primitives, designed for large-scale API management.
        Effortlessly interface with <span className="highlight">gRPC</span>,<span className="highlight">REST</span>,{" "}
        <span className="highlight">GraphQL</span>, and more, ensuring seamless communication and complex data
        transformations for enterprise operations.
      </>
    ),
  },
  {
    title: "Governance",
    description: (
      <>
        Implement robust governance and security across your API landscape using our{" "}
        <span className="highlight">code-based governance</span> and comprehensive security framework. Enjoy precise
        control mechanisms that ensure compliance, standardization, operational consistency, and safeguard against
        evolving digital threats.
      </>
    ),
  },
  {
    title: "Efficiency",
    description: (
      <>
        Tailcall brings breakthrough performance optimizations, integrating{" "}
        <span className="highlight">enterprise-specific tuning</span> for high-speed and low-latency. Expect unmatched
        response times, lower resource utilization, and adaptability to your unique operational needs and workload
        demands.
      </>
    ),
  },
  {
    title: "Resiliency",
    description: (
      <>
        Engineered for enterprise resilience, Tailcall guarantees robust performance under any conditions. Our platform
        is designed for <span className="highlight">high availability</span> and{" "}
        <span className="highlight">fault tolerance</span>, ensuring uninterrupted service and reliability at scale.
      </>
    ),
  },
  {
    title: "Extendability",
    description: (
      <>
        Tailcall's <span className="highlight">plugin-centric</span> extendability empowers enterprises to craft custom
        solutions. Design and integrate bespoke plugins that precisely fit your unique requirements, enhancing the
        platform's functionality to align with your specific business objectives.
      </>
    ),
  },
]

function Feature({idx, data: {title, description}}: {data: FeatureItem; idx: number}) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">{/* <Svg className={styles.featureSvg} role="img" /> */}</div>
      <div className="text--left padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  const INITIAL = 3
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.slice(0, INITIAL).map((props, idx) => (
            <Feature key={idx} data={props} idx={idx} />
          ))}
        </div>
        <div className="row row-center">
          {FeatureList.slice(INITIAL).map((props, idx) => (
            <Feature key={idx} data={props} idx={idx + INITIAL} />
          ))}
        </div>
      </div>
    </section>
  )
}
