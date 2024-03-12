---
title: "@call"
description: "Using the call directive to enhance GraphQL schemas improving code reusability."
---

The `@call` directive in GraphQL signifies a paradigm shift towards more efficient code structuring by introducing a methodology akin to function invocations in conventional programming. This directive is pivotal for developers navigating the intricacies of elaborate GraphQL schemas, where minimizing redundancy and adhering to the DRY (Don't Repeat Yourself) principle are paramount. Consider the following schema example:

```graphql showLineNumbers
schema
  @upstream(
    baseURL: "https://jsonplaceholder.typicode.com"
  ) {
  query: Query
}

type Query {
  # highlight-start
  user(id: Int!): User @http(path: "/users/{{args.id}}")
  # highlight-end
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  # highlight-start
  user: User @http(path: "/users/{{value.userId}}")
  # highlight-end
}

type User {
  id: Int!
  name: String!
  email: String!
}
```

In this schema, at lines `7` and `18`, a pattern of configuration duplication emerges when fetching user's data by it's id, demonstrating a prime use case for the `@call` directive. Through refactoring the `Post` type to incorporate the `@call` directive, we can eliminate this redundancy.

```graphql showLineNumbers
type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  # highlight-start
  user: User
    @call(query: "user", args: {id: "{{value.userId}}"})
  # highlight-end
}
```

Here, the `@call` directive invokes the `user` query from the `Query` type, leveraging the data-fetching process that's already defined in the root `query`. The `query` parameter specifies the target field, while the `args` parameter delineates the arguments to be passed.

### query

Specify the root **query** field to invoke, alongside the requisite arguments, using the `@call` directive for a concise and efficient query structure.

```graphql showLineNumbers
type Post {
  userId: Int!
  user: User
    @call(query: "user", args: {id: "{{value.userId}}"})
}
```

### mutation

Similarly, the `@call` directive can facilitate calling a mutation from another mutation field, employing the `mutation` parameter for field specification and the `args` parameter for argument delineation.

```graphql showLineNumbers
type Mutation {
  insertPost(input: PostInput, overwrite: Boolean): Post
    @http(
      body: "{{args.input}}"
      method: "POST"
      path: "/posts"
      query: {overwrite: "{{args.overwrite}}"}
    )

  upsertPost(input: PostInput): Post
    @call(
      mutation: "insertPost"
      args: {input: "{{args.input}}", overwrite: true}
    )
}
```

## args

The `args` parameter in the `@call` directive facilitates passing arguments to the targeted query or mutation, represented as a key-value mapping where each key corresponds to an argument name and its associated value.

```graphql showLineNumbers
type Post {
  userId: Int!
  user: User @call(query: "user", args: {"id": "{{value.userId}}"})
}
```

:::tip
The `@call` directive is predominantly advantageous in complex, large-scale configurations. For those new to GraphQL or Tailcall, it may be beneficial to explore this directive after familiarizing yourself with the foundational aspects of GraphQL.
:::
