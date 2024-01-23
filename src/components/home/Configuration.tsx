import React from "react"
import Heading from "@theme/Heading"
import CodeBlock from "@theme/CodeBlock"

const Configuration = (): JSX.Element => {
  return (
    <section className="flex flex-col mx-SPACE_04 my-SPACE_10 sm:mx-SPACE_07 lg:flex-row justify-center lg:mx-24 lg:my-SPACE_12 lg:space-x-SPACE_10">
      <div className="max-w-2xl">
        <Heading
          as="h2"
          className="text-title-large sm:text-display-tiny lg:text-display-small mb-SPACE_04"
        >
          Get{" "}
          <span className="rounded-lg px-SPACE_02 bg-tailCall-yellow">
            Started
          </span>
        </Heading>
        <p className="text-content-small sm:text-content-medium mb-SPACE_11">
          Setup the Tailcall instantly via npm and unlock the power of
          high-performance API orchestration.
        </p>
        <span className="text-title-small sm:text-title-medium">More</span>
        <p className="text-content-small sm:text-content-medium mt-SPACE_04">
          To dive deeper into TailCall checkout our docs for detailed tutorials.
          Ideal for devs at any level, it's packed with advanced tips, powerful
          operators and best practices.
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
