"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footerItems = exports.gtagScriptContent = exports.reb2bScriptContent = exports.CookiePreferenceCategory = exports.blogTagsMapping = exports.testimonials = exports.Theme = exports.radioOptions = exports.pricingPlans = exports.additionalEnterpriseFeatures = exports.enterpriseFeatures = exports.benefits = exports.tailcallFeatures = exports.chooseTailcall = exports.socials = exports.moreFeatures = exports.features = exports.partnerImages = exports.companies = exports.algoliaConstants = exports.cookieConstants = exports.playgroundAdsConversionId = exports.zapierLink = exports.codeSandboxUrl = exports.tailCallBlogUrl = exports.tailCallBenchmarkUrl = exports.githubRepoURL = void 0;
var react_1 = require("react");
var routes_1 = require("./routes");
exports.githubRepoURL = "https://github.com/tailcallhq/tailcall";
exports.tailCallBenchmarkUrl = "https://github.com/tailcallhq/graphql-benchmarks#benchmark-results";
exports.tailCallBlogUrl = "https://blog.tailcall.run/";
exports.codeSandboxUrl = "https://codesandbox.io/p/github/tailcallhq/tailcall-sandbox/main";
exports.zapierLink = "https://hooks.zapier.com/hooks/catch/2793322/3a1gxp2/";
exports.playgroundAdsConversionId = "AW-16578154380/3FH_CJrawsgZEIyfiuE9";
var cookieConstants;
(function (cookieConstants) {
    cookieConstants["USER_CONSENT"] = "userConsent";
})(cookieConstants || (exports.cookieConstants = cookieConstants = {}));
exports.algoliaConstants = {
    categoryFacet: "category",
    searchModalPlaceholder: "What do you want to know about graphql ?",
};
exports.companies = [
    { name: "Dream11", logo: require("@site/static/icons/companies/dream11.png").default },
    { name: "AfterShip", logo: require("@site/static/icons/companies/aftership.png").default },
    { name: "Optum", logo: require("@site/static/icons/companies/optum.png").default },
    { name: "Sinch", logo: require("@site/static/icons/companies/sinch.png").default },
];
exports.partnerImages = [
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
];
var Highlight = function (_a) {
    var text = _a.text;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { className: "text-content-tiny font-bold sm:text-title-tiny lg:text-title-small bg-tailCall-yellow rounded-[4px] sm:rounded-md px-SPACE_01" }, text)));
};
exports.features = [
    {
        logo: require("@site/static/images/home/orchestration.png").default,
        title: "Orchestration",
        content: (react_1.default.createElement(react_1.default.Fragment, null,
            "Tailcall provides first-class primitives to perform API Orchestration across protocols such as",
            " ",
            react_1.default.createElement(Highlight, { text: "gRPC, REST, GraphQL," }),
            ". This allow developers to enrich existing APIs with more data, perform transformations or build a completely new set of aggregation APIs.")),
        alt: "Orchestration",
    },
    {
        logo: require("@site/static/images/home/governance.png").default,
        title: "Governance",
        content: (react_1.default.createElement(react_1.default.Fragment, null,
            "With Tailcall, your focus shifts to the 'what'\u2014such as entities, their relationships, access control, security, authentication, caching, and more\u2014rather than the 'how'. This shift is enabled by the Tailcall DSL, embodying a true ",
            react_1.default.createElement(Highlight, { text: "declarative approach" }),
            " to managing APIs.")),
        alt: "Governance",
    },
    {
        logo: require("@site/static/images/home/efficiency.png").default,
        title: "Efficiency",
        content: (react_1.default.createElement(react_1.default.Fragment, null,
            "Tailcall can introspect all orchestration requirements ",
            react_1.default.createElement(Highlight, { text: "ahead of time" }),
            " and automatically generate a highly efficient data access layer. This results in achieving much lower resource utilization and opens up opportunities to use in ultra-low latency workloads.")),
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
        content: (react_1.default.createElement(react_1.default.Fragment, null,
            "At times, the built-in primitives may not fully satisfy specific orchestration needs. In such instances, Tailcall offers a lightweight embedded ",
            react_1.default.createElement(Highlight, { text: "JavaScript" }),
            " runtime. This feature enables you to attach custom hooks for monitoring events within Tailcall, allowing you to directly issue commands for the subsequent actions Tailcall should execute.")),
        alt: "Extendability",
    },
];
exports.moreFeatures = [
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
];
exports.socials = [
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
];
exports.chooseTailcall = [
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
];
exports.tailcallFeatures = [
    {
        id: 1,
        title: "Powerful Batching Primitive",
        image: require("@site/static/images/choose-tailcall/rocket.png").default,
        redirection_url: "/docs/graphql-n-plus-one-problem-solved-tailcall/#using-batch-apis",
    },
    {
        id: 2,
        title: "Extensions with plugins and JS support",
        image: require("@site/static/images/choose-tailcall/grid.png").default,
        redirection_url: "/docs/graphql-javascript-customization/",
    },
    {
        id: 3,
        title: "Field based Authentication & Authorisation",
        image: require("@site/static/images/choose-tailcall/shield-tick.png").default,
        redirection_url: "/docs/field-level-access-control-graphql-authentication/",
    },
    {
        id: 4,
        title: "Protocol agnostic",
        image: require("@site/static/images/choose-tailcall/check-done.png").default,
        redirection_url: "/docs/graphql-grpc-tailcall/",
    },
    {
        id: 5,
        title: "Performance",
        image: require("@site/static/images/choose-tailcall/line-chart-up.png").default,
        redirection_url: "https://github.com/tailcallhq/graphql-benchmarks",
    },
    {
        id: 6,
        title: "Security",
        image: require("@site/static/images/choose-tailcall/lock.png").default,
        redirection_url: "/docs/field-level-access-control-graphql-authentication/",
    },
    {
        id: 7,
        title: "Edge Compatible",
        image: require("@site/static/images/choose-tailcall/puzzle-piece.png").default,
        redirection_url: "/docs/deploy-graphql-github-actions/",
    },
    {
        id: 8,
        title: "Compile time checks",
        image: require("@site/static/images/choose-tailcall/clock-stopwatch.png").default,
        redirection_url: "/docs/tailcall-graphql-cli/#check",
    },
];
exports.benefits = [
    {
        id: 1,
        title: "Secure",
        description: "Tailcall has been validated against a comprehensive database of GraphQL vulnerabilities. Rest easy knowing your GraphQL backends are secure.",
        image: require("@site/static/images/home/secure-icon.png").default,
        redirection_url: "/docs/field-level-access-control-graphql-authentication/",
    },
    {
        id: 2,
        title: "High-Performance",
        description: "Tailcall performs ahead-of-time optimizations based on analysis of the schema and data dependencies. Deploy GraphQL without compromises.",
        image: require("@site/static/images/home/performance.png").default,
        redirection_url: "https://github.com/tailcallhq/graphql-benchmarks",
    },
    {
        id: 3,
        title: "Statically Verified",
        description: "Tailcall statically verifies that GraphQL schemas match resolvers and warns about N + 1 issues. Deploy new APIs with confidence.",
        image: require("@site/static/images/home/statically-verified-icon.png").default,
        redirection_url: "/docs/graphql-n-plus-one-problem-solved-tailcall/",
    },
    {
        id: 4,
        title: "Simple",
        description: "Tailcall configuration generator can integrate thousands of APIs in a matter of minutes. Configure with ease and deploy with confidence.",
        image: require("@site/static/images/home/simple-icon.png").default,
        redirection_url: "/docs/tailcall-dsl-graphql-custom-directives/",
    },
    {
        id: 5,
        title: "Customizable",
        description: "Write custom Javascript to customize any aspect of your GraphQL backend. Leverage this escape hatch to satisfy any requirement.",
        image: require("@site/static/images/home/customizable-icon.png").default,
        redirection_url: "/docs/graphql-javascript-customization/",
    },
    {
        id: 6,
        title: "Plug & Play",
        description: "Engineered to stay out of your way, shipping as a single executable with no dependencies or requirements. Get started quickly and easily.",
        image: require("@site/static/images/home/plug-play-icon.png").default,
        redirection_url: "/docs/",
    },
    {
        id: 7,
        title: "Open Source",
        description: "Tailcall is developed and released under the Apache 2 open source license, the gold standard for OSS. Embrace a vendor-neutral solution.",
        image: require("@site/static/images/home/open-source-icon.png").default,
        redirection_url: "https://github.com/tailcallhq/tailcall",
    },
];
exports.enterpriseFeatures = [
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
];
exports.additionalEnterpriseFeatures = [
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
];
exports.pricingPlans = [
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
];
exports.radioOptions = [
    { id: "1", name: "Evaluating", value: "evaluating" },
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
];
// Define an enum for theme options
var Theme;
(function (Theme) {
    Theme["Light"] = "light";
    Theme["Dark"] = "dark";
    Theme["Gray"] = "gray";
    Theme["Tailcall"] = "tailcall";
})(Theme || (exports.Theme = Theme = {}));
exports.testimonials = [
    {
        id: 1,
        citation: "With a fully open-source GraphQL solution at your disposal, you gain complete control to tailor it precisely to your requirements. This approach provides unparalleled transparency and flexibility, allowing you to work independently of backend teams. You can iterate, develop, and deploy your frontend applications more efficiently than ever before.",
        designation: "Sr. Frontend Engineer",
        name: "John Doe",
        department: "Front-end",
    },
    {
        id: 2,
        citation: "By eliminating the need to manage GraphQL for frontend teams, you can focus on your core responsibilities\u2014optimizing microservices and streamlining backend operations. The clear separation of concerns enhances collaboration, while Tailcall's static verification ensures you can expose APIs with confidence and reliability.",
        designation: "Sr. Backend Engineer - Big Co. Inc.",
        name: "John Doe",
        department: "Backend",
    },
    {
        id: 3,
        citation: "Adopting a proven, open-source GraphQL solution transforms your operational workflows. It offers robust reliability, simplifies management, and scales seamlessly to meet growing demands. With enhanced security and faster iteration cycles, you can dedicate more time to strategic challenges and high-impact projects.",
        designation: "Sr. Frontend Engineer - Big Co. Inc.",
        name: "John Doe",
        department: "Ops",
    },
];
exports.blogTagsMapping = {
    "Technologies and Frameworks": [
        { label: "Angular", permalink: "/blog/tags/angular" },
        { label: "Apollo client", permalink: "/blog/tags/apollo-client" },
        { label: "JavaScript", permalink: "/blog/tags/java-script" },
        { label: "Node.js", permalink: "/blog/tags/node-js" },
        { label: "URQL", permalink: "/blog/tags/urql" },
        { label: "Villus", permalink: "/blog/tags/villus" },
        { label: "Vue", permalink: "/blog/tags/vue" },
    ],
    "Debugging and Tooling": [
        { label: "debugging", permalink: "/blog/tags/debugging" },
        { label: "IDE", permalink: "/blog/tags/ide" },
        { label: "Tooling", permalink: "/blog/tags/tooling" },
    ],
    "API Concepts and Tools": [
        { label: "API", permalink: "/blog/tags/api" },
        { label: "Fetch API", permalink: "/blog/tags/fetch-api" },
        { label: "GraphiQL", permalink: "/blog/tags/graphi-ql" },
        { label: "GraphQL", permalink: "/blog/tags/graph-ql" },
        { label: "OpenAPI", permalink: "/blog/tags/open-api" },
        { label: "Microservice", permalink: "/blog/tags/microservice" },
        { label: "Microservices", permalink: "/blog/tags/microservices" },
        { label: "Backend-for-Frontend", permalink: "/blog/tags/backend-for-frontend" },
    ],
    "Schema and Introspection": [
        { label: "Introspection", permalink: "/blog/tags/introspection" },
        { label: "Schema", permalink: "/blog/tags/schema" },
    ],
    "General Terms": [
        { label: "Performance", permalink: "/blog/tags/performance" },
        { label: "Scalability", permalink: "/blog/tags/scalability" },
        { label: "Security", permalink: "/blog/tags/security" },
        { label: "Strategy", permalink: "/blog/tags/strategy" },
        { label: "Migration", permalink: "/blog/tags/migration" },
        { label: "Design", permalink: "/blog/tags/design" },
        { label: "Flexibility", permalink: "/blog/tags/flexibility" },
    ],
    "Development Practices": [{ label: "Best Practices", permalink: "/blog/tags/best-practices" }],
};
var CookiePreferenceCategory;
(function (CookiePreferenceCategory) {
    CookiePreferenceCategory["NECESSARY"] = "Necessary";
    CookiePreferenceCategory["ANALYTICS"] = "Analytics";
    CookiePreferenceCategory["PREFERENCE"] = "Preference";
    CookiePreferenceCategory["MARKETING"] = "Marketing";
})(CookiePreferenceCategory || (exports.CookiePreferenceCategory = CookiePreferenceCategory = {}));
exports.reb2bScriptContent = "\n!function () {var reb2b = window.reb2b = window.reb2b || [];\n    if (reb2b.invoked) return;reb2b.invoked = true;reb2b.methods = [\"identify\", \"collect\"];\n    reb2b.factory = function (method) {return function () {var args = Array.prototype.slice.call(arguments);\n    args.unshift(method);reb2b.push(args);return reb2b;};};\n    for (var i = 0; i < reb2b.methods.length; i++) {var key = reb2b.methods[i];reb2b[key] = reb2b.factory(key);}\n    reb2b.load = function (key) {var script = document.createElement(\"script\");script.type = \"text/javascript\";script.async = true;\n    script.src = \"https://s3-us-west-2.amazonaws.com/b2bjsstore/b/\" + key + \"/reb2b.js.gz\";\n    var first = document.getElementsByTagName(\"script\")[0];\n    first.parentNode.insertBefore(script, first);};\n    reb2b.SNIPPET_VERSION = \"1.0.1\";reb2b.load(\"0OV0VHL3P56Z\");}();\n";
exports.gtagScriptContent = "\nfunction gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag(\"js\",new Date),gtag(\"config\",\"G-JEP3QDWT0G\",{})\n";
exports.footerItems = [
    {
        title: "Developers",
        items: [
            {
                name: "Docs",
                link: routes_1.pageLinks.docs,
            },
            {
                name: "Releases",
                link: routes_1.pageLinks.releases,
            },
            {
                name: "Learn",
                link: routes_1.pageLinks.introduction,
            },
        ],
    },
    {
        title: "Company",
        items: [
            {
                name: "Blogs",
                link: routes_1.pageLinks.blog,
            },
            {
                name: "Privacy Policy",
                link: routes_1.pageLinks.privacyPolicy,
            },
        ],
    },
];
