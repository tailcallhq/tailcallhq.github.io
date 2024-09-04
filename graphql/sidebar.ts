import {SidebarsConfig} from "@docusaurus/plugin-content-docs"

const sidebars: SidebarsConfig = {
  graphql: [
    {
      type: "category",
      label: "Guides",
      items: ["graphql", "graphql-vs-rest", "graphql-react-client", "cto-guide", "problem-statement"],
    },
    {
      type: "category",
      label: "GraphQL Tutorial",
      items: [
        "what-is-graphql",
        "schema-and-types",
        "queries",
        "mutations",
        "variables",
        "fragments",
        "introspection",
        "directives",
      ],
    },
    {
      type: "doc",
      id: "faq"
    }
  ],
}

module.exports = sidebars
