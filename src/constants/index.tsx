import React from "react"

export const githubRepoURL = "https://github.com/tailcallhq/tailcall"
export const tailCallBenchmarkUrl = "https://github.com/tailcallhq/graphql-benchmarks#benchmark-results"
export const tailCallBlogUrl = "https://blog.tailcall.run/"
export const codeSandboxUrl = "https://codesandbox.io/p/github/tailcallhq/tailcall-sandbox/main"
export const zapierLink = "https://hooks.zapier.com/hooks/catch/2793322/3a1gxp2/"

export const partnerImages: PartnerImage[] = [
  {
    name: "Digital Ocean",
    logo: require("@site/static/icons/companies/digital-ocean.png").default,
  },
  {
    name: "Vercel",
    logo: require("@site/static/icons/companies/vercel.png").default,
  },
  {
    name: "Fastly",
    logo: require("@site/static/icons/companies/fastly.png").default,
  },
  {
    name: "Cloud Flare",
    logo: require("@site/static/icons/companies/cloudflare.png").default,
  },
  {
    name: "AWS",
    logo: require("@site/static/icons/companies/aws.png").default,
  },
  {
    name: "Google Cloud",
    logo: require("@site/static/icons/companies/google-cloud.png").default,
  },
  {
    name: "Fly",
    logo: require("@site/static/icons/companies/fly-io.png").default,
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
    logo: require("@site/static/images/home/orchestration.png").default,
    title: "Orchestration",
    content: (
      <>
        Tailcall provides first-class primitives to perform API Orchestration across protocols such as{" "}
        <Highlight text="gRPC, REST, GraphQL," />. This allow developers to enrich existing APIs with more data, perform
        transformations or build a completely new set of aggregation APIs.
      </>
    ),
    alt: "Orchestration",
  },
  {
    logo: require("@site/static/images/home/governance.png").default,
    title: "Governance",
    content: (
      <>
        With Tailcall, your focus shifts to the 'what'—such as entities, their relationships, access control, security,
        authentication, caching, and more—rather than the 'how'. This shift is enabled by the Tailcall DSL, embodying a
        true <Highlight text="declarative approach" /> to managing APIs.
      </>
    ),
    alt: "Governance",
  },
  {
    logo: require("@site/static/images/home/efficiency.png").default,
    title: "Efficiency",
    content: (
      <>
        Tailcall can introspect all orchestration requirements <Highlight text="ahead of time" /> and automatically
        generate a highly efficient data access layer. This results in achieving much lower resource utilization and
        opens up opportunities to use in ultra-low latency workloads.
      </>
    ),
    alt: "Efficiency",
  },
  // {
  //   logo: require("@site/static/images/home/resiliency.png").default,
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
    logo: require("@site/static/images/home/extendability.png").default,
    title: "Extendability",
    content: (
      <>
        At times, the built-in primitives may not fully satisfy specific orchestration needs. In such instances,
        Tailcall offers a lightweight embedded <Highlight text="JavaScript" /> runtime. This feature enables you to
        attach custom hooks for monitoring events within Tailcall, allowing you to directly issue commands for the
        subsequent actions Tailcall should execute.
      </>
    ),
    alt: "Extendability",
  },
]

export const moreFeatures: MoreFeatures[] = [
  {
    id: 1,
    title: "Ahead of Time Optimizations",
    logo: require("@site/static/icons/basic/rocket-icon.svg").default,
  },
  {
    id: 2,
    title: "Composable Orchestration Primitives",
    logo: require("@site/static/icons/basic/extension.svg").default,
  },
  {
    id: 3,
    title: "Macro Resiliency Capabilities",
    logo: require("@site/static/icons/basic/shield.svg").default,
  },
  {
    id: 4,
    title: "Protocol agnostic",
    logo: require("@site/static/icons/basic/check-done.svg").default,
  },
  {
    id: 5,
    title: "High Performance",
    logo: require("@site/static/icons/basic/line-chart-up.svg").default,
  },
  {
    id: 6,
    title: "Security",
    logo: require("@site/static/icons/basic/security.svg").default,
  },
  {
    id: 7,
    title: "Edge Compatible",
    logo: require("@site/static/icons/basic/puzzle.svg").default,
  },
  {
    id: 8,
    title: "Compile time Checks",
    logo: require("@site/static/icons/basic/clock.svg").default,
  },
  {
    id: 9,
    logo: require("@site/static/icons/basic/adaptive.svg").default,
    title: "Adaptive performance improvements",
  },
  // {
  //   id: 10,
  //   logo: require("@site/static/icons/basic/rate-limit.svg").default,
  //   title: "Global rate limiting",
  // },
  {
    id: 11,
    logo: require("@site/static/icons/basic/insight.svg").default,
    title: "Telemetry",
  },
  {
    id: 12,
    logo: require("@site/static/icons/basic/connect.svg").default,
    title: "Scripting Flexibility",
  },
]

export const socials: Social[] = [
  {
    id: 1,
    name: "github",
    image: require("@site/static/icons/companies/github-footer.svg").default,
    href: "https://github.com/tailcallhq/tailcall",
  },
  {
    id: 2,
    name: "discord",
    image: require("@site/static/icons/companies/discord-gray.svg").default,
    href: "https://discord.gg/kRZBPpkgwq",
  },
  {
    id: 3,
    name: "linkedin",
    image: require("@site/static/icons/companies/linkedin-gray.svg").default,
    href: "https://www.linkedin.com/company/tailcall",
  },

  {
    id: 4,
    name: "twitter",
    image: require("@site/static/icons/companies/x-gray.svg").default,
    href: "https://twitter.com/tailcallhq",
  },
]

export const chooseTailcall: ChooseTailcall[] = [
  {
    id: 1,
    title: "Top developer experience",
    description: "Design your APIs, with syntax highlighting and lint checks within your favourite IDE.",
    image: require("@site/static/images/home/dev-experience.png").default,
  },
  {
    id: 2,
    title: "Performance",
    description: "Get performance that’s higher than your hand optimized implementation",
    image: require("@site/static/images/home/performance.png").default,
  },
  {
    id: 3,
    title: "Scale Fearlessly",
    description: "Leverage built-in best practices that guarantee robustness at any scale.",
    image: require("@site/static/images/home/scale.png").default,
  },
]

export const benefits: Benefits[] = [
  {
    id: 1,
    title: "Secure",
    description:
      "Tailcaill has been validated against a comprehensive database of GraphQL vulnerabilities. Rest easy knowing your GraphQL backends are secure.",
    image: require("@site/static/images/home/secure-icon.png").default,
    redirection_url: "/docs/field-level-access-control-graphql-authentication/",
  },
  {
    id: 2,
    title: "High-Performance",
    description:
      "Tailcall performs ahead-of-time optimizations based on analysis of the schema and data dependencies. Deploy GraphQL without compromises.",
    image: require("@site/static/images/home/performance.png").default,
    redirection_url: "https://github.com/tailcallhq/graphql-benchmarks",
  },
  {
    id: 3,
    title: "Statically Verified",
    description:
      "Tailcall statically verifies that GraphQL schemas match resolvers and warns about N + 1 issues. Deploy new APIs with confidence.",
    image: require("@site/static/images/home/statically-verified-icon.png").default,
    redirection_url: "/docs/graphql-n-plus-one-problem-solved-tailcall/",
  },
  {
    id: 4,
    title: "Simple",
    description:
      "Tailcall simplifies GraphQL with a powerful configuration generator that can get thousands of APIs integrated in minutes. Configure with ease and deploy with confidence, knowing that complexities like batching, caching, error propagation and other forms of tuning are handled for you.",
    image: require("@site/static/images/home/simple-icon.png").default,
    redirection_url: "/docs/tailcall-dsl-graphql-custom-directives/",
  },
  {
    id: 5,
    title: "Customizable",
    description:
      "Write custom Javascript to customize any aspect of your GraphQL backend. Leverage this escape hatch to satisfy any requirement.",
    image: require("@site/static/images/home/customizable-icon.png").default,
    redirection_url: "/docs/graphql-javascript-customization/",
  },
  {
    id: 6,
    title: "Plug & Play",
    description:
      "Engineered to stay out of your way, shipping as a single executable with no dependencies or requirements. Get started quickly and easily.",
    image: require("@site/static/images/home/plug-play-icon.png").default,
    redirection_url: "/docs/",
  },
  {
    id: 7,
    title: "Open Source",
    description:
      "Tailcall is developed and released under the Apache 2 open source license, the gold standard for OSS. Embrace a vendor-neutral solution.",
    image: require("@site/static/images/home/open-source-icon.png").default,
    redirection_url: "https://github.com/tailcallhq/tailcall",
  },
]

export const enterpriseFeatures: EnterpriseFeature[] = [
  {
    id: 1,
    logo: require("@site/static/icons/basic/adaptive.svg").default,
    title: "Adaptive performance improvements",
    description: "Adaptive optimisation by analysing the hot queries in your Production environment",
  },
  // {
  //   id: 2,
  //   logo: require("@site/static/icons/basic/rate-limit.svg").default,
  //   title: "Global rate limiting",
  //   description: "Ability to set global rate limits on access of each field of your data graph.",
  // },
  {
    id: 3,
    logo: require("@site/static/icons/basic/reflect.svg").default,
    title: "Managed Solution",
    description: "The change in any GraphQL config gets seamlessly reflected on your GraphQL. ",
  },
  {
    id: 4,
    logo: require("@site/static/icons/basic/insight.svg").default,
    title: "Telemetry",
    description: "Low level insights of execute vs IO time for each query.",
  },
  {
    id: 5,
    logo: require("@site/static/icons/basic/connect.svg").default,
    title: "Scripting Flexibility",
    description: "Ability to write custom resolvers in Javascript.",
  },
]

export const additionalEnterpriseFeatures: AdditionalEnterpriseFeatures[] = [
  {
    id: 1,
    logo: require("@site/static/icons/basic/adaptive.svg").default,
    title: "Circuit breaking",
  },
  {
    id: 2,
    logo: require("@site/static/icons/basic/adaptive.svg").default,
    title: "Custom SLA",
  },
  {
    id: 3,
    logo: require("@site/static/icons/basic/adaptive.svg").default,
    title: "Schema redundancy detection",
  },
  {
    id: 4,
    logo: require("@site/static/icons/basic/adaptive.svg").default,
    title: "Query cost analysis",
  },
  {
    id: 5,
    logo: require("@site/static/icons/basic/adaptive.svg").default,
    title: "Breaking change detection",
  },
  {
    id: 6,
    logo: require("@site/static/icons/basic/adaptive.svg").default,
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
    href: "/docs/getting-started-with-graphql",
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

export const customerFeedbacks: CustomerFeedback[] = [
  {
    id: 1,
    citation: `I stopped writing orchestration code, and now I get low-latency GraphQL APIs quickly, which let me ship low-latency apps.`,
    designation: `Sr. Frontend Engineer - Big Co. Inc.`,
    name: "John Doe",
    department: "Front-end",
  },
  {
    id: 2,
    citation: `I save so much time building APIs that are better than I could write by hand. Front-end engineers finally leave me alone!`,
    designation: `Sr. Backend Engineer - Big Co. Inc.`,
    name: "John Doe",
    department: "Backend",
  },
  {
    id: 3,
    citation: `I get the telemetry I need to monitor our GraphQL APIs  with a runtime that’s easy to scale, which doesn’t surprise me in production.`,
    designation: `Sr. Frontend Engineer - Big Co. Inc.`,
    name: "John Doe",
    department: "Ops",
  },
]
