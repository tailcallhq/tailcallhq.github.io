---
title: "@call"
description: "Using the call directive to enhance GraphQL schemas improving code reusability."
---

The `@call` directive in GraphQL signifies a shift towards more efficient configuration management by introducing a methodology akin to function invocations in conventional programming. This directive is pivotal for developers navigating the intricacies of elaborate GraphQL schemas, where minimizing redundancy and adhering to the DRY (Don't Repeat Yourself) principle are paramount. Consider the following schema example:

```graphql showLineNumbers
schema
  @upstream(
    baseURL: "https://jsonplaceholder.typicode.com"
  ) {
  query: Query
}

type Query {
  # highlight-start
  user(id: Int!): User @http(path: "/users/{{.args.id}}")
  # highlight-end
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  # highlight-start
  user: User @http(path: "/users/{{.value.userId}}")
  # highlight-end
}

type User {
  id: Int!
  name: String!
  email: String!
}
```

In this schema, at lines `9` and `18`, a pattern of configuration duplication emerges when fetching user's data by its id, demonstrating a prime use case for the `@call` directive. Through refactoring the `Post` type to incorporate the `@call` directive, we can eliminate this redundancy.

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
        {query: "user", args: {id: "{{.value.userId}}"}}
      ]
    )
  # highlight-end
}
```

Here, the `@call` directive invokes the `user` query from the `Query` type, leveraging the data-fetching process that's already defined in the root `query`. The `query` parameter specifies the target field, while the `args` parameter delineates the arguments to be passed.

## steps

`@call` directive can compose together other resolvers, allowing to create a chain of resolvers that can be executed in sequence. This is done by using the `steps` parameter, which is an array of objects that define the operations to be executed.

### query

Specify the root **query** field to invoke, alongside the requisite arguments, using the `@call` directive for a concise and efficient query structure.

```graphql showLineNumbers
type Post {
  userId: Int!
  user: User
    @call(
      steps: [
        {query: "user", args: {id: "{{.value.userId}}"}}
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
      body: "{{.args.input}}"
      method: "POST"
      path: "/posts"
      query: {overwrite: "{{.args.overwrite}}"}
    )

  upsertPost(input: PostInput): Post
    @call(
      steps: [
        {
          mutation: "insertPost"
          args: {input: "{{.args.input}}", overwrite: true}
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
  user: User
    @call(
      steps: [
        {query: "user", args: {id: "{{.value.userId}}"}}
      ]
    )
}
```

:::tip
The `@call` directive is predominantly advantageous in complex, large-scale configurations. For those new to GraphQL or Tailcall, it may be beneficial to explore this directive after familiarizing yourself with the foundational aspects of GraphQL.
:::

### Composition

`@call` directive provides the ability to express a sequence of steps that one might need to compose. These steps are executed such that the result of each step is passed as an argument to the next step. The `query` and `mutation` parameters are used to specify the target field, while the `args` parameter is used to pass arguments to the target field.

Let's explain this with an example:

```graphql showLineNumbers
schema @server {
  query: Query
}

type Query {
  a(input: JSON): JSON
    @expr(body: {value: "{{.args.input.a}}"})

  b(input: JSON): JSON
    @expr(body: {value: "{{.args.input.b}}"})

  c(input: JSON): JSON
    @expr(body: {value: "{{.args.input.c}}"})
}
```

Here we have defined there operations viz. `a`, `b` & `c` each of them pluck their respective keys from the given input value. Let's run this query with some test input:

```graphql
{
  a(input: {a: 100})
  b(input: {b: 200})
  c(input: {c: 300})
}
```

Here is how the response would look like:

```json
{
  "data": {
    "a": {
      "value": 100
    },
    "b": {
      "value": 200
    },
    "c": {
      "value": 300
    }
  }
}
```

As you can see the [`@expr`](../directives/expr.md) directive plucks the inner value and returns the result. How about we implement an `abc` operation that could leverage the existing operations and unwrap the following input value:

```json
{"a": {"b": {"c": {"d": 1000}}}}
```

Given the above input if we wish to extract the last inner number `1000` then we could define a new operation as follows

```graphql showLineNumbers
schema @server {
  query: Query
}

type Query {
  a(input: JSON): JSON
    @expr(body: {value: "{{.args.input.a}}"})

  b(input: JSON): JSON
    @expr(body: {value: "{{.args.input.b}}"})

  c(input: JSON): JSON
    @expr(body: {value: "{{.args.input.c}}"})

  # highlight-start
  abc(input: JSON): JSON
    @call(
      steps: [
        {query: "a", args: {input: "{{.args.input}}"}}
        {query: "b", args: {input: "{{.args.value}}"}}
        {query: "c", args: {input: "{{.args.value}}"}}
      ]
    )
  # highlight-end
}
```

We use the `@call` directive to compose the operations together. The `args` specify how we would like to pass the arguments to the operation and the result of that operation is passed to the next step. We can test the new `abc` operation with the following query:

```graphql
query {
  abc(input: {a: {b: {c: 1000}}})
}
```

The server returns the response that we expected:

```json
{
  "data": {
    "abc": {
      "value": 100
    }
  }
}
```

This way you can compose combine multiple operations can compose them together using the `@call` directive.

:::note
We use `JSON` scalar here because we don't care about the type safety of this option. In a real world example you might want to use proper input and output types.
:::
