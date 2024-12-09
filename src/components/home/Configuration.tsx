import React from "react"
import Heading from "@theme/Heading"
import CodeBlock from "@theme/CodeBlock"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import Link from "@docusaurus/Link"
import Section from "../shared/Section"

const Configuration = (): JSX.Element => {
  return (
    <Section className="flex flex-col lg:flex-row justify-center gap-10" innerClassName="xl:flex md:gap-10">
      <div className="max-w-2xl">
        <Heading as="h2" className="text-title-large sm:text-display-tiny lg:text-display-small mb-SPACE_04">
          Get <span className="rounded-lg px-SPACE_02 bg-tailCall-yellow">Started</span>
        </Heading>
        <p className="text-content-small sm:text-content-medium mb-SPACE_11">
          Setup the Tailcall instantly via npm and unlock the power of high-performance API orchestration.
        </p>
        <div>
          <h5>More</h5>
          <p className="text-content-small sm:text-content-medium mb-SPACE_11">
            To dive deeper into Tailcall checkout our <Link href="/docs">docs</Link> for detailed tutorials. Ideal for
            devs at any level, it's packed with advanced tips, powerful operators and best practices.
          </p>
        </div>
      </div>
      <div>
        <CodeBlock language="bash">npm i -g @tailcallhq/tailcall</CodeBlock>
        {CodeTabItem({code: GRAPHQL_CONFIG, language: "graphql"})}
      </div>
    </Section>
  )
}

const CodeTabItem = ({code, language}: {code: string; language: "json" | "yaml" | "graphql"}) => (
  <TabItem value={language} label={language}>
    <CodeBlock
      language={language}
      showLineNumbers={true}
      className="overflow-y-auto h-96 md:min-w-[45rem] min-w-[100%]"
    >
      {code}
    </CodeBlock>
    <CodeBlock language="bash">tailcall start ./app.{language}</CodeBlock>
  </TabItem>
)

export default Configuration

const GRAPHQL_CONFIG = `schema
  @server(port: 8000) {
  query: Query
}

type Query {
  users: [User] @http(url: "http://jsonplaceholder.typicode.com/users")
  posts: [Post] @http(url: "http://jsonplaceholder.typicode.com/posts")
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
}


type Post {
  id: Int!
  title: String!
  body: String!
  userId: Int!

  # Expand a post with user information
  user: User @http(url: "http://jsonplaceholder.typicode.com/users/{{.value.userId}}")
}
`
