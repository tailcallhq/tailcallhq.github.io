---
title: GraphQL Resolver Context
description: "Explore Tailcall's dynamic Context mechanism for schema field resolution, enabling access to arguments, values, and environment variables for efficient GraphQL queries. Enhance your query handling with Tailcall's advanced Context features for optimized schema field resolution."
slug: tailcall-dynamic-context-mechanism
sidebar_label: Dynamic Context Mechanism
---

Within Tailcall, `Context` is a pivotal component that allows for dynamic retrieval of values during the resolution of fields for a given type within the schema.

## Schema Definition

```typescript
type Context = {
  args: Map<string, JSON>
  value: JSON
  env: Map<string, string>
  vars: Map<string, string>
  headers: Map<string, string>
}
```

`Context` operates by storing values as key-value pairs, which can be accessed through mustache template syntax.

### args

This property facilitates access to query arguments. Consider the example:

```graphql showLineNumbers
type Query {
  user(id: ID!): User @http(path: "/users/{{.args.id}}")
}
```

Here, `args.id` is utilized to retrieve the `id` argument provided to the `user` query.

### value

This enables access to the fields of the specified type.

```graphql showlineNumbers
type Post {
  id: ID!
  title: String!
  body: String!
  comments: [Comment]
    @http(path: "/posts/{{.value.id}}/comments")
}
```

In this case, `value.id` accesses the `id` field of the `Post` type.

### env

Environment variables, set at server startup, allow directives to dynamically adapt behavior based on external configurations without altering the server configuration itself.

Example:

```graphql showLineNumbers
type Query {
  users: [User]!
    @http(baseUrl: "{{.env.API_ENDPOINT}}", path: "/users")
}
```

`env.API_ENDPOINT` references an environment variable named `API_ENDPOINT`, which specifies the base URL for HTTP requests.

### vars

`vars` offers a mechanism for defining reusable variables within the configuration. Unlike `env`, these are embedded and can be universally applied across configurations.

```graphql showLineNumbers
schema
  @server(
    vars: {key: "apiKey", value: "{{.env.AUTH_TOKEN}}"}
  ) {
  query: Query
}

type Query {
  user(id: ID!): [User]
    @http(
      url: "/users"
      headers: [
        {
          key: "Authorization"
          value: "Bearer {{.vars.apiKey}}"
        }
      ]
    )
}
```

Here, the variable `apiKey` is set using an environment variable and subsequently utilized in the `Authorization` header for HTTP requests.

### headers

Headers originate from the request made to the Tailcall server.

```graphql showLineNumbers
type Query {
  commentsForUser: [Comment]
    @http(path: "/users/{{.headers.x-user-id}}/comments")
}
```

In this example, `headers.x-user-id` extracts the value of the `x-user-id` header present in the request, dynamically constructing the request path.
