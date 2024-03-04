---
title: Context
---

In any GraphQL framework, including Tailcall, `Context` serves as a fundamental mechanism for sharing data across different parts of your application. This adaptable object becomes available to every resolver in GraphQL.

Mustache templates can be used to dynamically generate values based on different parts of the GraphQL context, including arguments, field values, parent context, environment variables, and headers. This flexibility enables to construct dynamic directives that adapt to different scenarios and requirements.

They're useful for:

- Creating web addresses that change based on information provided in arguments.
- Adding context information to web page headers for security or other purposes.
- Generating search terms based on data in fields or other information.
- Setting up rules that change depending on the surrounding context.

## Context in Tailcall

In Tailcall, as in all GraphQL implementations, every [Operator](operators/index.md) can access Context. Operators use Context to store and retrieve data necessary for shared operations.

You can describe the Context with the following Typescript interface:

```typescript
interface Context {
  args: Map<string, Json>
  value: Json
  parent: Context
  env: Map<string, string>
  headers: Map<string, string>
}
```

### args

These arguments pass to the current query, allowing access to the query's arguments. For example,

```graphql showLineNumbers
type Query {
  user(id: ID!): User @http(path: "/users/{{args.id}}")
}
```

In this example, you use `args.id` to access the `id` argument passed to the `user` query.

### value

This field represents the value of the current node. For instance,

```graphql showLineNumbers
type Post {
  id: ID!
  title: String!
  body: String!
  comments: [Comment] @http(path: "/posts/{{value.id}}/comments")
}
```

Here, `value.id` provides access to the `id` field of the `Post` type.

### parent

This field indicates the context of the parent node.

```graphql showLineNumbers
type Query {
  posts: [Post] @http(path: "/posts")
}
type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  user: User
    @http(path: "/users", query: [{key: "id", value: "{{value.userId}}"}], matchPath: ["id"], matchKey: "userId")
}
```

In this scenario, `value.userId` helps retrieve the `userId` information from the "parent" context of the `Post` type, effectively extracting a list of `userId` fields from the `Post` types. Consider `value` as a container holding the results of a post query, with `userId` as the specific key you want to extract.

### env

Environment variables represent global configurations for the server. They are set once when the server starts. These variables can be utilized within directives to dynamically configure behavior based on server settings. This allows for flexible and adaptable API configurations that can be managed without hardcoding values into the schema.

For example:

```graphql showLineNumbers
type Query {
  users: [User]! @http(baseUrl: "{{env.API_ENDPOINT}}", path: "/users")
}
```

Here, env.API_ENDPOINT refers to an environment variable named API_ENDPOINT, which is defined in your server settings. The value of API_ENDPOINT is used as the base URL for making HTTP requests

### variables

Variables enable a simple way to add dynamic values into GraphQL directives, providing flexibility and adaptability within the schema. Integration of variables into directives enables the creation of more flexible and reusable schema configurations.

```graphql showLineNumbers
type Query {
  user(id: ID!) @http(url: "/users/{{var.userId}}")
}
```

Here, a variable named `$userId` is defined using var syntax. This variable is then used within the user field directive to dynamically construct the URL for the HTTP request.

### headers

These headers come from the request received by the Tailcall server.

```graphql showLineNumbers
type Query {
  commentsForUser: [Comment] @http(path: "/users/{{headers.userId}}/comments")
}
```

Here, `headers.userId` refers to a header called `userId` that should be present in the `context`. The server can use this `userId` to fetch comments for the specified user.

[operator]: /docs/operators
