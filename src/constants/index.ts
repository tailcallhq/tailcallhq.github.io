export const partnerImages: PartnerImage[] = [
  {
    id: 1,
    name: "Digital Ocean",
    logo: require("@site/static/icons/companies/digital-ocean.svg").default,
  },
  {
    id: 2,
    name: "Vercel",
    logo: require("@site/static/icons/companies/vercel.svg").default,
  },
  {
    id: 3,
    name: "Fastly",
    logo: require("@site/static/icons/companies/fastly.svg").default,
  },
  {
    id: 4,
    name: "Cloud Flare",
    logo: require("@site/static/icons/companies/cloudflare.svg").default,
  },
  {
    id: 5,
    name: "AWS",
    logo: require("@site/static/icons/companies/aws.svg").default,
  },
  {
    id: 6,
    name: "Google Cloud",
    logo: require("@site/static/icons/companies/google-cloud.svg").default,
  },
  {
    id: 7,
    name: "Fly",
    logo: require("@site/static/icons/companies/fly-io.svg").default,
  },
]

export const features: Feature[] = [
  {
    id: 1,
    logo: require("@site/static/images/home/efficiency.svg").default,
    title: "Orchestration",
    description1:
      "Harness the power of Tailcall's advanced orchestration primitives, designed for large-scale API management. Effortlessly interface with  ",
    highlightedText: "gRPC, REST, GraphQL,",
    description2:
      " and more, ensuring seamless communication and complex data transformations for enterprise operations.",
  },
  {
    id: 2,
    logo: require("@site/static/images/home/efficiency.svg").default,
    title: "Governance",
    description1: "Implement robust governance and security across your API landscape using our ",
    highlightedText: "code-based governance",
    description2:
      " and comprehensive security framework. Enjoy precise control mechanisms that ensure compliance, standardization, operational consistency, and safeguard against evolving digital threats.",
  },
  {
    id: 3,
    logo: require("@site/static/images/home/efficiency.svg").default,
    title: "Efficiency",
    description1: "Tailcall brings breakthrough performance optimizations, integrating ",
    highlightedText: "enterprise-specific tuning ",
    description2:
      " for high-speed and low-latency. Expect unmatched response times, lower resource utilization, and adaptability to your unique operational needs and workload demands.",
  },
  {
    id: 4,
    logo: require("@site/static/images/home/resiliency.svg").default,
    title: "Resiliency",
    description1:
      "Engineered for enterprise resilience, Tailcall guarantees robust performance under any conditions. Our platform is designed for ",
    highlightedText: "high availability and fault tolerance,",
    description2: " ensuring uninterrupted service and reliability at scale.",
  },
  {
    id: 5,
    logo: require("@site/static/images/home/extendability.svg").default,
    title: "Extendability",
    description1: "Tailcall's ",
    highlightedText: "plugin-centric",
    description2:
      " extendability empowers enterprises to craft custom solutions. Design and integrate bespoke plugins that precisely fit your unique requirements, enhancing the platform's functionality to align with your specific business objectives.",
  },
]

export const moreFeatures: MoreFeatures[] = [
  {
    id: 1,
    title: "Powerful Batching Primitive",
    logo: require("@site/static/icons/basic/rocket-icon.svg").default,
  },
  {
    id: 2,
    title: "Extensions with plugins and JS support",
    logo: require("@site/static/icons/basic/extension.svg").default,
  },
  {
    id: 3,
    title: "Field based Authentication & Authorisation",
    logo: require("@site/static/icons/basic/shield.svg").default,
  },
  {
    id: 4,
    title: "Protocol agnostic",
    logo: require("@site/static/icons/basic/check-done.svg").default,
  },
  {
    id: 5,
    title: "Performance",
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
    title: "Compile time tracks",
    logo: require("@site/static/icons/basic/clock.svg").default,
  },
]

export const socials: Social[] = [
  {
    id: 1,
    name: "github",
    image: require("@site/static/icons/companies/github-gray.svg").default,
    href: "/",
  },
  {
    id: 2,
    name: "discord",
    image: require("@site/static/icons/companies/discord-gray.svg").default,
    href: "/",
  },
  {
    id: 3,
    name: "linkedin",
    image: require("@site/static/icons/companies/linkedin-gray.svg").default,
    href: "/",
  },

  {
    id: 4,
    name: "twitter",
    image: require("@site/static/icons/companies/twitter-gray.svg").default,
    href: "/",
  },
]

export const chooseTailcall: ChooseTailcall[] = [
  {
    id: 1,
    title: "Top developer experience",
    description: "Design your APIs, with syntax highlighting and lint checks within your favourite IDE.",
    image: require("@site/static/icons/basic/rocket.svg").default,
  },
  {
    id: 2,
    title: "Performance",
    description: "Get performance that’s higher than your hand optimized implementation",
    image: require("@site/static/icons/basic/performance.svg").default,
  },
  {
    id: 3,
    title: "Scale Fearlessly",
    description: "Leverage built-in best practices that guarantee robustness at any scale.",
    image: require("@site/static/icons/basic/scale.svg").default,
  },
]

export const founders: Founder[] = [
  {
    id: 1,
    name: "Tushar Mathur",
    title: "Founder & CEO",
    image: require("@site/static/images/about/tushar.jpg").default,
    socialLinks: [
      {
        id: 1,
        name: "linkedin",
        image: require("@site/static/icons/companies/linkedin-gray.svg").default,
        href: "/",
      },
      {
        id: 2,
        name: "twitter",
        image: require("@site/static/icons/companies/twitter-gray.svg").default,
        href: "/",
      },
      {
        id: 3,
        name: "discord",
        image: require("@site/static/icons/companies/discord-gray.svg").default,
        href: "/",
      },
    ],
  },
  {
    id: 2,
    name: "Amit Kumar Singh",
    title: "Founding Engineer",
    image: require("@site/static/images/about/tushar.jpg").default,
    socialLinks: [
      {
        id: 1,
        name: "linkedin",
        image: require("@site/static/icons/companies/linkedin-gray.svg").default,
        href: "/",
      },
      {
        id: 2,
        name: "twitter",
        image: require("@site/static/icons/companies/twitter-gray.svg").default,
        href: "/",
      },
      {
        id: 3,
        name: "discord",
        image: require("@site/static/icons/companies/discord-gray.svg").default,
        href: "/",
      },
    ],
  },
  {
    id: 3,
    name: "Shashi Kant",
    title: "Founding Engineer",
    image: require("@site/static/images/about/tushar.jpg").default,
    socialLinks: [
      {
        id: 1,
        name: "linkedin",
        image: require("@site/static/icons/companies/linkedin-gray.svg").default,
        href: "/",
      },
      {
        id: 2,
        name: "twitter",
        image: require("@site/static/icons/companies/twitter-gray.svg").default,
        href: "/",
      },
      {
        id: 3,
        name: "discord",
        image: require("@site/static/icons/companies/discord-gray.svg").default,
        href: "/",
      },
    ],
  },
  {
    id: 4,
    name: "Kiryl Mialeshka",
    title: "Founding Engineer",
    image: require("@site/static/images/about/tushar.jpg").default,
    socialLinks: [
      {
        id: 1,
        name: "linkedin",
        image: require("@site/static/icons/companies/linkedin-gray.svg").default,
        href: "/",
      },
      {
        id: 2,
        name: "twitter",
        image: require("@site/static/icons/companies/twitter-gray.svg").default,
        href: "/",
      },
      {
        id: 3,
        name: "discord",
        image: require("@site/static/icons/companies/discord-gray.svg").default,
        href: "/",
      },
    ],
  },
  {
    id: 5,
    name: "Sujeet Sreenivasan",
    title: "Founding Engineer",
    image: require("@site/static/images/about/tushar.jpg").default,
    socialLinks: [
      {
        id: 1,
        name: "linkedin",
        image: require("@site/static/icons/companies/linkedin-gray.svg").default,
        href: "/",
      },
      {
        id: 2,
        name: "twitter",
        image: require("@site/static/icons/companies/twitter-gray.svg").default,
        href: "/",
      },
      {
        id: 3,
        name: "discord",
        image: require("@site/static/icons/companies/discord-gray.svg").default,
        href: "/",
      },
    ],
  },
]

export const investors: Investor[] = [
  {
    id: 1,
    image: require("@site/static/images/about/investor-1.jpg").default,
    name: "Bruce Wayne",
    title: "Investor",
  },
  {
    id: 2,
    image: require("@site/static/images/about/investor-1.jpg").default,
    name: "Harvey Dent",
    title: "Investor",
  },
  {
    id: 3,
    image: require("@site/static/images/about/investor-1.jpg").default,
    name: "James Gordon",
    title: "Investor",
  },
  {
    id: 4,
    image: require("@site/static/images/about/investor-1.jpg").default,
    name: "Rachel Dawes",
    title: "Investor",
  },
  {
    id: 5,
    image: require("@site/static/images/about/investor-1.jpg").default,
    name: "Bruce Wayne",
    title: "Investor",
  },
  {
    id: 6,
    image: require("@site/static/images/about/investor-1.jpg").default,
    name: "Bruce Wayne",
    title: "Investor",
  },
]
