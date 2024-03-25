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

In this schema, at lines `7` and `18`, a pattern of configuration duplication emerges when fetching user's data by its id, demonstrating a prime use case for the `@call` directive. Through refactoring the `Post` type to incorporate the `@call` directive, we can eliminate this redundancy.

```graphql showLineNumbers
type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  # highlight-start
  user: User
    @call(
      steps: [
        {query: "user", args: {id: "{{value.userId}}"}}
      ]
    )
  # highlight-end
}
```

Here, the `@call` directive invokes the `user` query from the `Query` type, leveraging the data-fetching process that's already defined in the root `query`. The `query` parameter specifies the target field, while the `args` parameter delineates the arguments to be passed.

## steps

`@call` operator can compose together other resolvers, allowing to create a chain of resolvers that can be executed in sequence. This is done by using the `steps` parameter, which is an array of objects that define the operations to be executed.

### query

Specify the root **query** field to invoke, alongside the requisite arguments, using the `@call` directive for a concise and efficient query structure.

```graphql showLineNumbers
type Post {
  userId: Int!
  user: User
    @call(
      steps: [
        {query: "user", args: {id: "{{value.userId}}"}}
      ]
    )
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
      steps: [
        {
          mutation: "insertPost"
          args: {input: "{{args.input}}", overwrite: true}
        }
      ]
    )
}
```

### args

The `args` parameter in the `@call` directive facilitates passing arguments to the targeted query or mutation, represented as a key-value mapping where each key corresponds to an argument name and its associated value.

```graphql showLineNumbers
type Post {
  userId: Int!
  user: User @call(steps: [{query: "user", args: {"id": "{{value.userId}}"}}])
}
```

:::tip
The `@call` directive is predominantly advantageous in complex, large-scale configurations. For those new to GraphQL or Tailcall, it may be beneficial to explore this directive after familiarizing yourself with the foundational aspects of GraphQL.
:::

### Composition

Steps are executed sequentially, and the result of each step is passed as an argument to the next step. The `query` and `mutation` parameters are used to specify the target field, while the `args` parameter is used to pass arguments to the target field.

Expanding the mutation example used above, let's consider we want to actually map the `insertPost` result being used to return the `id` of the post updated. We can achieve this by adding a new step to the `upsertPost` `@call` resolver. On this step, we use a query resolver to map the `insertPost` result, returning the `id` of the post. This allows us to have the flexibility of re-using `insertPost` resolver, while mapping the data to match specific needs.

```graphql showLineNumbers
type Query {
  # highlight-start
  take_id(id: Int!): Int @const(data: "{{args.id}}")
  # highlight-end
}

type Mutation {
  insertPost(input: PostInput, overwrite: Boolean): Post
    @http(
      body: "{{args.input}}"
      method: "POST"
      path: "/posts"
      query: {overwrite: "{{args.overwrite}}"}
    )

  # highlight-start
  upsertPost(input: PostInput): Int
    @call(
      steps: [
        {
          mutation: "insertPost"
          args: {input: "{{args.input}}", overwrite: true}
        }
        {query: "take_id"}
      ]
    )
  # highlight-end
}
```

:::note
The example above is a simple use case of how to compose resolvers using `@call`. The `@call` directive can be used in more complex scenarios, as there is no limit to the number of steps that can be added.
This can be particularly useful when you need to compose multiple resolvers to achieve a specific result, also allowing for chaining resolvers that are not necessarily related.
:::
