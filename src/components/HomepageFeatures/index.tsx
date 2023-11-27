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
        Harness the power of Tailcall's advanced orchestration<span className="highlight">primitives</span>, designed
        for large-scale API management. Our platform supports complex compositions and data transformations, ensuring
        seamless integration and reliability for enterprise operations.
      </>
    ),
  },
  {
    title: "Governance",
    description: (
      <>
        Implement robust governance across your API landscape using our{" "}
        <span className="highlight">code-based governance</span> approach. Ensure compliance, standardization, and
        operational consistency, vital for large-scale organizational needs.
      </>
    ),
  },
  {
    title: "Performance",
    description: (
      <>
        Tailcall brings breakthrough performance optimizations, critical for enterprises demanding{" "}
        <span className="highlight">high-speed</span> and <span className="highlight">low-latency</span>. Expect
        unmatched response times and significantly lower resource utilization.
      </>
    ),
  },
  {
    title: "Security",
    description: (
      <>
        Tailcall's comprehensive security framework is built to safeguard enterprise-grade API ecosystems. Enjoy peace
        of mind with very <span className="highlight">precise control</span> mechanisms that secure your data and
        operations against evolving digital threats.
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
    title: "Runtime Tuning",
    description: (
      <>
        Experience unparalleled adaptability with Tailcall's{" "}
        <span className="highlight">enterprise-specific tuning</span>. Our platform intelligently adjusts to your unique
        enterprise environment, optimizing API performance to align perfectly with your specific operational needs and
        workload demands.
      </>
    ),
  },
  {
    title: "Efficiency",
    description: (
      <>
        Tailcall elevates IO efficiency through advanced <span className="highlight">caching and batching</span>{" "}
        capabilities, enabling enterprises to streamline data processing. This feature reduces latency and enhances
        throughput, making large-scale data handling more efficient and responsive.
      </>
    ),
  },
  {
    title: "Protocol Agnostic",
    description: (
      <>
        Embrace unparalleled connectivity with Tailcall's protocol-agnostic architecture. Effortlessly interface with{" "}
        <span className="highlight">gRPC</span>, <span className="highlight">REST</span>,{" "}
        <span className="highlight">GraphQL</span>, and more, ensuring seamless communication across a diverse range of
        API protocols. This flexibility is key for enterprises looking to integrate a broad spectrum of services and
        data sources.
      </>
    ),
  },
  {
    title: "Extendable",
    description: (
      <>
        Tailcall's <span className="highlight">plugin-centric</span> extendability empowers enterprises to craft custom
        solutions. Design and integrate bespoke plugins that precisely fit your unique requirements, enhancing the
        platform's functionality to align with your specific business objectives.
      </>
    ),
  },
  {
    title: "Cloud Native",
    description: (
      <>
        Optimized for cloud environments, Tailcall leverages the scalability and flexibility of{" "}
        <span className="highlight">cloud infrastructure</span>, making it an ideal choice for enterprises seeking
        efficient deployment and management of their API operations in the cloud.
      </>
    ),
  },
]

function Feature({idx, title, description}: FeatureItem) {
  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">{/* <Svg className={styles.featureSvg} role="img" /> */}</div>
      <div className="text--left padding-horiz--md">
        <h3>
          {" "}
          {idx + 1}. {title}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  const INITIAL = 2
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.slice(0, INITIAL).map((props, idx) => (
            <Feature key={idx} {...{...props, idx}} />
          ))}
        </div>
        <div className="row row-center">
          {FeatureList.slice(INITIAL).map((props, idx) => (
            <Feature key={idx} {...{...props, idx: idx + INITIAL}} />
          ))}
        </div>
      </div>
    </section>
  )
}
