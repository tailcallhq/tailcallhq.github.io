import React from "react"
import Heading from "@theme/Heading"
import CodeBlock from "@theme/CodeBlock"
import Link from "@docusaurus/Link"

const Configuration = (): JSX.Element => {
  return (
    <section className="flex flex-col mx-SPACE_04 my-SPACE_10 sm:mx-SPACE_07 lg:flex-row justify-center lg:mx-24 lg:my-SPACE_12 lg:space-x-SPACE_10">
      <div className="max-w-2xl">
        <Heading as="h2" className="text-title-large sm:text-display-tiny lg:text-display-small mb-SPACE_04">
          Get <span className="rounded-lg px-SPACE_02 bg-tailCall-yellow">Started</span>
        </Heading>
        <p className="text-content-small sm:text-content-medium mb-SPACE_11">
          Setup the Tailcall via npm to build high-performance <b>GraphQL</b> APIs on top of existing REST endpoints. To
          dive deeper into TailCall checkout our <Link href="/docs">docs</Link> for detailed tutorials and guides.
        </p>
      </div>
      <div>
        <CodeBlock language="bash">npm i -g @tailcallhq/tailcall</CodeBlock>
        <CodeBlock language="graphql">
          {`# app.graphql

schema
  @server(port: 8000, graphiql: true)
  @upstream(baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
}

type Query {
  users: [User] @http(path: "/users")
  posts: [Post] @http(path: "/posts")
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
  user: User @http(path: "/users/{{value.userId}}")
}
        `}
        </CodeBlock>
        <CodeBlock language="bash">tailcall start ./app.graphql</CodeBlock>
      </div>
    </section>
  )
}

export default Configuration
