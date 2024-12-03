---
title: "@call"
description: The @call directive simplifies queries by composing together other resolvers, allowing to create a chain of resolvers that can be executed in sequence."
slug: ../call-directive
---

The `@call` directive simplifies GraphQL schema design by enabling resolver composition, allowing you to create chains of resolvers executed in sequence.

## `@call` Directive Definition

The `@call` directive is defined as follows:

```graphql showLineNumbers title="Directive Definition"
directive @call(
  """
  Array of steps to be executed in sequence. Each step can call a query or mutation.
  """
  steps: [CallStep!]!
) on FIELD_DEFINITION

"""
Input type defining a single step in the call sequence
"""
input CallStep {
  """
  Name of the query field to call
  """
  query: String

  """
  Name of the mutation field to call
  """
  mutation: String

  """
  Arguments to pass to the called field
  """
  args: JSON
}
```

## Example: Eliminating Redundancy

The `@call` directive in GraphQL signifies a shift towards more efficient configuration management by introducing a methodology akin to function invocations in conventional programming. This directive is pivotal for developers navigating the intricacies of elaborate GraphQL schemas, where minimizing redundancy and adhering to the DRY (Don't Repeat Yourself) principle are paramount. Consider the following schema example:

```graphql showLineNumbers
schema {
  query: Query
}

type Query {
  # highlight-start
  user(id: Int!): User
    @http(
      url: "https://jsonplaceholder.typicode.com/users/{{.args.id}}"
    )
  # highlight-end
  posts: [Post]
    @http(url: "https://jsonplaceholder.typicode.com/posts")
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  # highlight-start
  user: User
    @http(
      url: "https://jsonplaceholder.typicode.com/users/{{.value.userId}}"
    )
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

## Composing Resolvers with `steps`

The `steps` argument in the `@call` directive is used to define a chain of resolvers, executed sequentially.

### Example: Invoking a Query

To invoke a query, specify the `query` field to call, along with any required arguments:

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

### Example: Invoking a Mutation

Similarly, you can invoke a mutation by specifying the `mutation` parameter:

```graphql showLineNumbers
type Mutation {
  insertPost(input: PostInput, overwrite: Boolean): Post
    @http(
      body: "{{.args.input}}"
      method: "POST"
      url: "https://jsonplaceholder.typicode.com/posts"
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

### Passing Arguments

Arguments can be passed using the `args` parameter, where each key represents an argument name:

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
The `@call` directive is most useful in larger schemas with complex configurations. If you're just starting with GraphQL, consider mastering the basics before diving into advanced directives like `@call`.
:::

## Advanced Composition Example

The `@call` directive can be used to combine multiple resolvers in a sequence, passing the output of each step to the next. This allows for flexible composition of existing operations.

### Example: Composing Multiple Operations

Consider a scenario where we have three operations (`a`, `b`, `c`), each extracting a specific part of the input:

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

We can create a new `abc` operation that calls `a`, `b`, and `c` in sequence to extract deeply nested data:

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

### Running the Composed Query

```graphql
query {
  abc(input: {a: {b: {c: 1000}}})
}
```

Response:

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
Using `JSON` scalar here is for simplicity. In production, proper input and output types should be used for type safety.
:::

## Combining Multiple Directives

The `@call` directive can be used in combination with other [resolvable directives](../directives.md#resolvable-directives), with results merged deeply. This allows for powerful and flexible resolver configurations.

For more details, see [Directives Documentation](../directives.md).
