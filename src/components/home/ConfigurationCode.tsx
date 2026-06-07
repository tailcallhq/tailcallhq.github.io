import React from "react"
import CodeBlock from "@theme/CodeBlock"
import TabItem from "@theme/TabItem"

const ConfigurationCode = (): JSX.Element => {
  return (
    <>
      <CodeBlock language="bash">npm i -g @tailcallhq/tailcall</CodeBlock>
      <CodeTabItem code={GRAPHQL_CONFIG} language="graphql" />
    </>
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

export default ConfigurationCode
