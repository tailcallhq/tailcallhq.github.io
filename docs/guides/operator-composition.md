---
title: "Operator Composition"
---

# Composition

You can combine operators to create new and powerful transformations.

This example demonstrates the concept of composition in GraphQL, allowing the combination of operations (known as "operators") to construct more complex data transformations.

The given schema is defining two data types - `User` and `Post`. The `User` type has fields `id` and `name`, and the `Post` type initially has fields `user` and `userId`.

```graphql showLineNumbers
type User {
  id: Int
  name: String
}

type Post @addField(name: "userName", path: ["user", "name"]) {
  user: User @modify(omit: true) @http(path: "/users/{{userId}}")
  userId: Int!
}
```

It uses a series of operators to modify the `user` field.

1. The `@addField(name: "userName", path: ["user", "name"])` operator extracts the `name` field from `user` and adds a field called `userName` to the `Post`

2. The `@modify(omit: true)` operator removes the `user` field from the final Schema.

3. The `@http(path: "/users/{{userId}}")` operator instructs the resolver to make an HTTP request to fetch the user data from a specified path (i.e., `/users/{{userId}}`), with `{{userId}}` serving as a placeholder that the system replaces with the actual `userId` upon making the request.

The schema after this transformation looks like this:

```graphql showLineNumbers
type User {
  id: Int
  name: String
}

type Post {
  userName: String
  userId: Int!
}
```

We've used composition of operators to take a complex object (the `User` inside the `Post`), extract a specific part of it (`name`), name that part (`userName`), and then instruct GraphQL how to fetch the data using an HTTP request.

:::info
It's important to note that the order of the operators `@modify` and `@http` doesn't matter. The resulting schema will always be the same.
:::

This is a powerful mechanism that allows you to make your GraphQL schema more precise, easier to understand, and more suitable for the specific needs of your application.
