---
title: Context
---

In any GraphQL framework, including Tailcall, `Context` serves as a fundamental mechanism for sharing data across different parts of your application. This adaptable object becomes available to every resolver in GraphQL.

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
  user(id: ID!) @http(url: "/users/{{args.id}}")
}
```

Here, `args.id` is a variable representing the value of the id argument provided in the GraphQL query. During query execution, this variable is replaced with the actual id value, enabling the construction of dynamic URLs within the directive.

### headers

These headers come from the request received by the Tailcall server.

```graphql showLineNumbers
type Query {
  commentsForUser: [Comment] @http(path: "/users/{{headers.userId}}/comments")
}
```

Here, `headers.userId` refers to a header called `userId` that should be present in the `context`. The server can use this `userId` to fetch comments for the specified user.

### Mustache Templates

Mustache templates provide a convenient way to dynamically inject context values into directives anywhere in the schema. They allow accessing context data by using the `{{var}}` syntax.

Mustache templates can be used to dynamically generate values based on different parts of the GraphQL context, including arguments, field values, parent context, environment variables, and headers. This flexibility enables to construct dynamic directives that adapt to different scenarios and requirements.

For example, Mustache templates can be utilized to:

- Construct URLs with dynamic path parameters based on argument values.
- Include context data in HTTP headers for authentication or other purposes.
- Generate query parameters based on field values or other context data.
- Dynamically configure directive options based on environment variables.

Here's a simple example demonstrating the usage of Mustache templates within a directive:

```graphql
type Query {
  user(id: ID!) @http(url: "/users/{{args.id}}")
}
```

Here, {{args.id}} will be replaced with the actual id argument value when making the API request.

[operator]: /docs/operators
