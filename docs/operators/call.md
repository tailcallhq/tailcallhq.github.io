---
title: "@call"
---

The **@call** operator is used to call another field that has a resolver ([`@http`], [`@graphQL`], [`@grpc`], and [`@const`])

```graphql showLineNumbers
schema {
  query: Query
}

type Query {
  posts: [Post] @http(path: "/posts")
  user(id: Int!): User @http(path: "/users/{{args.id}}")
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  user: User @call(query: "user", args: {"id": "{{value.userId}}"})
}
```

## Available resolvers

These are the resolvers that can be re-used with the **@call** operator:

- [`@http`]
- [`@graphQL`]
- [`@grpc`]
- [`@const`]

## Resolvable references

These are the "pointers" to the field that has the actual code. You need to use the `query` or `mutation` argument to specify the field to be called. It is required.

### query

The name of the field that has the [resolver] to be called.

```graphql showLineNumbers
type Post {
  userId: Int!
  user: User @call(query: "user", args: {"id": "{{value.userId}}"})
}
```

### mutation

The name of the mutation that has the [resolver] to be called.

```graphql showLineNumbers
type Mutation {
  insertPost(input: PostInput): Post @http(body: "{{args.input}}", method: "POST", path: "/posts")
  insertPlainPost: Post
    @call(mutation: "insertPost", args: {input: {body: "post-body", title: "post-title", userId: 1}})
}
```

## args

The arguments to be passed to the [resolver]. It's a key-value pair where the key is the name of the argument and the value is the value to be passed. It is optional.

```graphql showLineNumbers
type Post {
  userId: Int!
  user: User @call(query: "user", args: {"id": "{{value.userId}}"})
}
```

[`@http`]: https://tailcall.run/docs/operators/http/
[`@graphQL`]: https://tailcall.run/docs/operators/graphql/
[`@grpc`]: https://tailcall.run/docs/operators/grpc/
[`@const`]: https://tailcall.run/docs/operators/const/
[resolver]: #available-resolvers
