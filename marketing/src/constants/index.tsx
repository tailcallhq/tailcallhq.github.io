import React from "react"

export const githubRepoURL = "https://github.com/tailcallhq/tailcall"
export const tailCallBenchmarkUrl = "https://github.com/tailcallhq/graphql-benchmarks#benchmark-results"
export const tailCallBlogUrl = "https://blog.tailcall.run/"
export const codeSandboxUrl = "https://codesandbox.io/p/github/tailcallhq/tailcall-sandbox/main"
export const zapierLink = "https://hooks.zapier.com/hooks/catch/2793322/3a1gxp2/"

export const partnerImages: PartnerImage[] = [
  {
    id: 1,
    name: "Digital Ocean",
    logo: "/icons/companies/digital-ocean.png",
  },
  {
    id: 2,
    name: "Vercel",
    logo: "/icons/companies/vercel.png",
  },
  {
    id: 3,
    name: "Fastly",
    logo: "/icons/companies/fastly.png",
  },
  {
    id: 4,
    name: "Cloud Flare",
    logo: "/icons/companies/cloudflare.png",
  },
  {
    id: 5,
    name: "AWS",
    logo: "/icons/companies/aws.png",
  },
  {
    id: 6,
    name: "Google Cloud",
    logo: "/icons/companies/google-cloud.png",
  },
  {
    id: 7,
    name: "Fly",
    logo: "/icons/companies/fly-io.png",
  },
]

const Highlight = ({text}: {text: string}) => (
  <>
    <span className="text-content-tiny font-bold sm:text-title-tiny lg:text-title-small bg-tailCall-yellow rounded-[4px] sm:rounded-md px-SPACE_01">
      {text}
    </span>
  </>
)

export const features: Feature[] = [
  {
    logo: "/images/home/orchestration.png",
    title: "Orchestration",
    content: (
      <>
        Tailcall provides first-class primitives to perform API Orchestration across protocols such as{" "}
        <Highlight text="gRPC, REST, GraphQL," />. This allow developers to enrich existing APIs with more data, perform
        transformations or build a completely new set of aggregation APIs.
      </>
    ),
  },
  {
    logo: "/images/home/governance.png",
    title: "Governance",
    content: (
      <>
        With Tailcall, your focus shifts to the 'what'—such as entities, their relationships, access control, security,
        authentication, caching, and more—rather than the 'how'. This shift is enabled by the Tailcall DSL, embodying a
        true <Highlight text="declarative approach" /> to managing APIs. Unlike traditional API gateways that apply
        these properties directly to APIs, Tailcall's DSL simplifies governance and clarifies semantics, providing a
        more intuitive framework for API management.
      </>
    ),
  },
  {
    logo: "/images/home/efficiency.png",
    title: "Efficiency",
    content: (
      <>
        Tailcall can introspect all orchestration requirements <Highlight text="ahead of time" /> and automatically
        generate a highly efficient data access layer. This results in achieving much lower resource utilization and
        opens up opportunities to use in ultra-low latency workloads.
      </>
    ),
  },
  // {
  //   logo: "/images/home/resiliency.png",
  //   title: "Resiliency",
  //   content: (
  //     <>
  //       Tailcall offers advanced resiliency primitives including automatic failover, rate limiting and circuit breakers,
  //       ensuring high availability and stability across any distributed systems. It maintains optimal performance and
  //       reliability under varying loads and potential threats. Engineered for enterprise resilience, Tailcall guarantees
  //       robust performance under any conditions. Our platform is designed for{" "}
  //       <Highlight text="high availability and fault tolerance," /> ensuring uninterrupted service and reliability at
  //       scale.
  //     </>
  //   ),
  // },
  {
    logo: "/images/home/extendability.png",
    title: "Extendability",
    content: (
      <>
        At times, the built-in primitives may not fully satisfy specific orchestration needs. In such instances,
        Tailcall offers a lightweight embedded <Highlight text="JavaScript" /> runtime. This feature enables you to
        attach custom hooks for monitoring events within Tailcall, allowing you to directly issue commands for the
        subsequent actions Tailcall should execute.
      </>
    ),
  },
]

export const moreFeatures: MoreFeatures[] = [
  {
    id: 1,
    title: "Ahead of Time Optimizations",
    logo: "/icons/basic/rocket-icon.svg",
  },
  {
    id: 2,
    title: "Composable Orchestration Primitives",
    logo: "/icons/basic/extension.svg",
  },
  {
    id: 3,
    title: "Macro Resiliency Capabilities",
    logo: "/icons/basic/shield.svg",
  },
  {
    id: 4,
    title: "Protocol agnostic",
    logo: "/icons/basic/check-done.svg",
  },
  {
    id: 5,
    title: "High Performance",
    logo: "/icons/basic/line-chart-up.svg",
  },
  {
    id: 6,
    title: "Security",
    logo: "/icons/basic/security.svg",
  },
  {
    id: 7,
    title: "Edge Compatible",
    logo: "/icons/basic/puzzle.svg",
  },
  {
    id: 8,
    title: "Compile time Checks",
    logo: "/icons/basic/clock.svg",
  },
  {
    id: 9,
    logo: "/icons/basic/adaptive.svg",
    title: "Adaptive performance improvements",
  },
  {
    id: 10,
    logo: "/icons/basic/rate-limit.svg",
    title: "Global rate limiting",
  },
  {
    id: 11,
    logo: "/icons/basic/insight.svg",
    title: "Telemetry",
  },
  {
    id: 12,
    logo: "/icons/basic/connect.svg",
    title: "Scripting Flexibility",
  },
]

export const socials: Social[] = [
  {
    id: 1,
    name: "github",
    image: "/icons/companies/github-footer.svg",
    href: "https://github.com/tailcallhq/tailcall",
  },
  {
    id: 2,
    name: "discord",
    image: "/icons/companies/discord-gray.svg",
    href: "https://discord.gg/kRZBPpkgwq",
  },
  {
    id: 3,
    name: "linkedin",
    image: "/icons/companies/linkedin-gray.svg",
    href: "https://www.linkedin.com/company/tailcall",
  },

  {
    id: 4,
    name: "twitter",
    image: "/icons/companies/x-gray.svg",
    href: "https://twitter.com/tailcallhq",
  },
]

export const chooseTailcall: ChooseTailcall[] = [
  {
    id: 1,
    title: "Top developer experience",
    description: "Design your APIs, with syntax highlighting and lint checks within your favourite IDE.",
    image: "/images/home/dev-experience.png",
  },
  {
    id: 2,
    title: "Performance",
    description: "Get performance that’s higher than your hand optimized implementation",
    image: "/images/home/performance.png",
  },
  {
    id: 3,
    title: "Scale Fearlessly",
    description: "Leverage built-in best practices that guarantee robustness at any scale.",
    image: "/images/home/scale.png",
  },
]

export const enterpriseFeatures: EnterpriseFeature[] = [
  {
    id: 1,
    logo: "/icons/basic/adaptive.svg",
    title: "Adaptive performance improvements",
    description: "Adaptive optimisation by analysing the hot queries in your Production environment",
  },
  {
    id: 2,
    logo: "/icons/basic/rate-limit.svg",
    title: "Global rate limiting",
    description: "Ability to set global rate limits on access of each field of your data graph.",
  },
  {
    id: 3,
    logo: "/icons/basic/reflect.svg",
    title: "Managed Solution",
    description: "The change in any Tailcall config gets seamlessly reflected on your GraphQL. ",
  },
  {
    id: 4,
    logo: "/icons/basic/insight.svg",
    title: "Telemetry",
    description: "Low level insights of execute vs IO time for each query.",
  },
  {
    id: 5,
    logo: "/icons/basic/connect.svg",
    title: "Scripting Flexibility",
    description: "Ability to write custom resolvers in Javascript.",
  },
]

export const additionalEnterpriseFeatures: AdditionalEnterpriseFeatures[] = [
  {
    id: 1,
    logo: "/icons/basic/adaptive.svg",
    title: "Circuit breaking",
  },
  {
    id: 2,
    logo: "/icons/basic/adaptive.svg",
    title: "Custom SLA",
  },
  {
    id: 3,
    logo: "/icons/basic/adaptive.svg",
    title: "Schema redundancy detection",
  },
  {
    id: 4,
    logo: "/icons/basic/adaptive.svg",
    title: "Query cost analysis",
  },
  {
    id: 5,
    logo: "/icons/basic/adaptive.svg",
    title: "Breaking change detection",
  },
  {
    id: 6,
    logo: "/icons/basic/adaptive.svg",
    title: "Expert 24x7 technical support",
  },
]

export const pricingPlans: PricingPlans[] = [
  {
    id: 1,
    name: "Basic plan",
    price: "Free",
    for: "For individuals & small companies",
    features: [
      {
        id: 1,
        name: "Access to all open source features",
      },

      {
        id: 2,
        name: "Basic reporting and analytics",
      },
    ],

    buttonText: "Get Started",
    mostPopular: false,
    href: "/docs/getting_started/",
  },
  {
    id: 2,
    name: "Advanced plan",
    price: "$600/year",
    for: "per core",
    billing: "Billed Annually",
    volumeDiscounts: "(Volume discounts available)",
    features: [
      {
        id: 1,
        name: "Access to all open source features",
      },
      {
        id: 2,
        name: "Access to all enterprise features",
      },
      {
        id: 3,
        name: "GraphQL onboarding copilot",
      },
      {
        id: 4,
        name: "Full managed edge deployment",
      },
    ],
    buttonText: "Contact Sales",
    mostPopular: true,
    href: "/contact",
  },
  {
    id: 3,
    name: "Enterprise plan",
    price: "$1000/year",
    for: "per core",
    billing: "Billed Annually",
    volumeDiscounts: "(Volume discounts available)",
    features: [
      {
        id: 1,
        name: "Access to all advanced plan features",
      },
      {
        id: 2,
        name: "Custom SLA",
      },
      {
        id: 3,
        name: "Priority 24x7 Support",
      },
      {
        id: 4,
        name: "Advanced Security & Compliance",
      },
      {
        id: 5,
        name: "On premise deployment",
      },
      {
        id: 6,
        name: "Custom Plugin Development",
      },
    ],
    buttonText: "Contact Sales",
    mostPopular: false,
    href: "/contact",
  },
]

export const radioOptions: RadioOptions[] = [
  {id: "1", name: "Evaluating", value: "evaluating"},
  {
    id: "2",
    name: "Monolith",
    value: "monolith",
  },
  {
    id: "3",
    name: "Multiple Graphql with Bff",
    value: "bff",
  },
  {
    id: "4",
    name: "Federated",
    value: "federated",
  },
]

// Define an enum for theme options
export enum Theme {
  Light = "light",
  Dark = "dark",
  Gray = "gray",
}
