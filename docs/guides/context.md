---
title: Context
---

In any GraphQL framework, including Tailcall, `Context` is a fundamental mechanism used for data sharing amongst various parts of your application. It is an adaptable object that is made available to every resolver in GraphQL.

## Context in Tailcall

In Tailcall, as in all GraphQL implementations, Context is a variable that is accessible to every [Operator](operators/index.md). It is used to store and access data that needs to be shared between operators.

The Context can be described using the following Typescript interface:

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

These are the arguments passed to the current query. They can be used to access the arguments of the query. For example,

```graphql showLineNumbers
type Query {
  user(id: ID!): User @http(path: "/users/{{args.id}}")
}
```

In this example, `args.id` is used to access the `id` argument passed to the `user` query.

### value

This represents the value of the current node. For instance,

```graphql showLineNumbers
type Post {
  id: ID!
  title: String!
  body: String!
  comments: [Comment] @http(path: "/posts/{{value.id}}/comments")
}
```

In the example above, `value.id` is used to access the `id` field of the `Post` type.

### parent

This denotes the context of the parent node.

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

In this case, `value.userId` is a way to get the `userId` information from the "parent" context of the `Post` type. Essentially, it's extracting a list or "array" of `userId` fields from multiple `Post` types. Think of `value` as a container that holds the results of a post query, with `userId` being the specific key you want to fetch from that container.

### Environment Variables

Environment variables allow you to configure different aspects of your Tailcall server without needing to hardcode values. Some common uses:

Setting the base URL for API requests:
```type Query {
  users: [User]! @http(baseUrl: "{{env.API_ENDPOINT}}", path: "/users") 
}
```

Toggling features on/off:
```type Query {
  recommendations @include(if: "{{env.SHOW_RECOMMENDATIONS}}") {
    products(first: 10)
  }
}
```

Setting API keys:
```type Query {
  weather(zip: String!): Weather
    @http(headers: {apiKey: "{{env.WEATHER_API_KEY}}"}) 
}
```
Environment variables are set when starting the Tailcall server and can be accessed in GraphQL using {{env.VAR_NAME}}.

### Variables
Variables allow passing dynamic values into queries. They can be used to make queries more reusable and configurable.

For example:

```query GetUser($id: ID!) {
  user(id: $id) {
    name
  }
}
```

When executing the query, the $id variable value is provided:
```
{
  "id": "1234"
}
```
Variables have the following properties:

->Declared with $name syntax
->Type needs to be provided
->Passed as separate parameter to query
->Can be used in place of literal values
->Help avoid duplication in queries
->Enable dynamic query construction.

### headers

These are the headers of the request that was received by the Tailcall server.

```graphql showLineNumbers
type Query {
  commentsForUser: [Comment] @http(path: "/users/{{headers.userId}}/comments")
}
```
### Mustache templates
Mustache templates allow accessing context data in directives by using the {{var}} syntax.

For example:

```type Query {
  user(id: ID!) @http(url: "/users/{{args.id}}")  
}
```
Here {{args.id}} will be replaced with the actual id argument value when making the API request.
So mustache templates provide a convenient way to dynamically inject context values into directives anywhere in the schema.

Here, `headers.userId` refers to a header called `userId` that should be present in the `context`. The server can use this `userId` to fetch comments for the specified user.

[operator]: /docs/intro/operators
