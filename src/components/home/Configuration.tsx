import React from "react"
import Heading from "@theme/Heading"
import CodeBlock from "@theme/CodeBlock"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import Link from "@docusaurus/Link"

const Configuration = (): JSX.Element => {
  return (
    <section className="flex flex-col mx-SPACE_04 my-SPACE_10 sm:mx-SPACE_07 lg:flex-row justify-center lg:mx-24 lg:my-SPACE_12 lg:space-x-SPACE_10">
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
            To dive deeper into TailCall checkout our <Link href="/docs">docs</Link> for detailed tutorials. Ideal for
            devs at any level, it's packed with advanced tips, powerful operators and best practices.
          </p>
        </div>
      </div>
      <div>
        <CodeBlock language="bash">npm i -g @tailcallhq/tailcall</CodeBlock>

        <Tabs>
          {CodeTabItem({code: GRAPHQL_CONFIG, language: "graphql"})}
          {CodeTabItem({code: YML_CONFIG, language: "yaml"})}
          {CodeTabItem({code: JSON_CONFIG, language: "json"})}
        </Tabs>
      </div>
    </section>
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
  @server(port: 8000)
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
  user: User @http(path: "/users/{{.value.userId}}")
}
`

const YML_CONFIG = `server:
  port: 8000
upstream:
  baseURL: http://jsonplaceholder.typicode.com
schema:
  query: Query
types:
  Post:
    fields:
      body:
        type: String
        required: true
        cache: null
      id:
        type: Int
        required: true
        cache: null
      title:
        type: String
        required: true
        cache: null
      user:
        type: User
        http:
          path: /users/{{.value.userId}}
        cache: null
      userId:
        type: Int
        required: true
        cache: null
    cache: null
  Query:
    fields:
      posts:
        type: Post
        list: true
        http:
          path: /posts
        cache: null
      users:
        type: User
        list: true
        http:
          path: /users
        cache: null
    cache: null
  User:
    fields:
      email:
        type: String
        required: true
        cache: null
      id:
        type: Int
        required: true
        cache: null
      name:
        type: String
        required: true
        cache: null
      username:
        type: String
        required: true
        cache: null
    cache: null
`

const JSON_CONFIG = `{
  "server": {
    "port": 8000
  },
  "upstream": {
    "baseURL": "http://jsonplaceholder.typicode.com"
  },
  "schema": {
    "query": "Query"
  },
  "types": {
    "Post": {
      "fields": {
        "body": {
          "type": "String",
          "required": true,
          "cache": null
        },
        "id": {
          "type": "Int",
          "required": true,
          "cache": null
        },
        "title": {
          "type": "String",
          "required": true,
          "cache": null
        },
        "user": {
          "type": "User",
          "http": {
            "path": "/users/{{.value.userId}}"
          },
          "cache": null
        },
        "userId": {
          "type": "Int",
          "required": true,
          "cache": null
        }
      },
      "cache": null
    },
    "Query": {
      "fields": {
        "posts": {
          "type": "Post",
          "list": true,
          "http": {
            "path": "/posts"
          },
          "cache": null
        },
        "users": {
          "type": "User",
          "list": true,
          "http": {
            "path": "/users"
          },
          "cache": null
        }
      },
      "cache": null
    },
    "User": {
      "fields": {
        "email": {
          "type": "String",
          "required": true,
          "cache": null
        },
        "id": {
          "type": "Int",
          "required": true,
          "cache": null
        },
        "name": {
          "type": "String",
          "required": true,
          "cache": null
        },
        "username": {
          "type": "String",
          "required": true,
          "cache": null
        }
      },
      "cache": null
    }
  }
}
`
