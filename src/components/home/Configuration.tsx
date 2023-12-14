import React from "react"
import CodeBlock from "@theme/CodeBlock"

const Configuration = () => {
  return (
    <section className="flex lg:mx-24 lg:my-12 space-x-10">
      <div className="max-w-2xl">
        <h2 className="text-display-small mb-4">
          Get <span className="rounded-lg px-2 bg-tailCall-yellow">Started</span>
        </h2>
        <p className="text-content-medium mb-11">
          Setup the Tailcall instantly via npm and unlock the power of high-performance API orchestration.
        </p>
        <span className="text-title-medium">More</span>
        <p className="text-content-medium mt-4">
          To dive deeper into TailCall checkout our docs for detailed tutorials. Ideal for devs at any level, it's
          packed with advanced tips, powerful operators and best practices.
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
