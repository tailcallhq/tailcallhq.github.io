---
sidebar_position: 4
title: Context
---
In any GraphQL framework, including Tailcall, Context is a fundamental mechanism used for data sharing amongst various parts of your application. It is an adaptable object that is made available to every resolver in GraphQL. The primary function of Context is to share common data across all resolvers.

## Context in Tailcall

In Tailcall, as in all GraphQL implementations, Context is a variable that is accessible to every Operator. It is used to store and access data that needs to be shared between operators.

The Context can be described using the following Typescript interface:

```typescript showLineNumbers
  interface Context {
    args: Record<string, Json>;
    value: Json;
    parent: Context;
    env: Record<string, string>;
    headers: Record<string, string>;
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
type Post {
  id: ID!
  title: String!
  body: String!
  comments: [Comment] @http(path: "/comments?postId={{parent.id}}", batchKey: "postId", groupBy: "id")
}
```
In this example, `parent.id` is used to access the `id` field from the parent of the `Post` type. This will provide an array of `id` fields from the `[Post]` type.

### env
This represents variables defined in the server settings.

```graphql showLineNumbers
type Query {
  users: [User]! @http(baseUrl: "{{env.API_ENDPOINT}}", path: "/users")
}
```
In the above example, `env.API_ENDPOINT` refers to an environment variable called API_ENDPOINT, which should be defined in your server settings.

5. **headers** - These are the default headers set for the request.

```graphql showLineNumbers
type Query {
  commentsForUser: [Comment] @http(path: "/users/{{headers.userId}}/comments")
}
```
Here, `headers.userId` refers to a header called `userId` that should be present in the `context`. The server can use this `userId` to fetch comments for the specified user.
