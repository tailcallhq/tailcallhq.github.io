---
title: "@graphQL"
description: The @graphQL directive allows to specify a GraphQL API server to fetch data from.
slug: ../graphQL-directive
---

The `@graphQL` directive allows you to specify an external GraphQL API server to fetch data from, making it easier to integrate remote data sources.

## `@graphQL` Directive Definition

```graphql title="Directive Definition" showLineNumbers
directive @graphQL(
  url: String!
  name: String!
  args: [InputKeyValue!]
  headers: [InputKeyValue!]
  batch: Boolean
  dedupe: Boolean
) on FIELD_DEFINITION
```

## Example: Fetching Users from External API

The following example shows how to use the `@graphQL` directive to fetch data from an external GraphQL API server:

```graphql showLineNumbers
type Query {
  users: [User]
    @graphQL(
      url: "https://jsonplaceholder.typicode.com"
      name: "userList"
    )
}
```

In the example above, the `@graphQL` directive specifies that the `users` field should be resolved by fetching data from an external GraphQL endpoint.

### Request Flow Example

Given a query for `users`:

```graphql showLineNumbers
query {
  users {
    id
    name
  }
}
```

Tailcall will make the following query to the upstream server:

```graphql showLineNumbers
query {
  userList {
    id
    name
  }
}
```

## Directive Arguments

### url

The `url` parameter specifies the endpoint for the external GraphQL API:

```graphql showLineNumbers
type Query {
  users: [User]
    @graphQL(
      name: "users"
      url: "https://graphqlzero.almansi.me/api"
    )
}
```

### name

The `name` parameter specifies the name of the root field in the external API. For example:

```graphql showLineNumbers
type Query {
  users: [User]
    @graphQL(
      url: "https://jsonplaceholder.typicode.com"
      name: "userList"
    )
}
```

In this case, `users` maps to `userList` in the upstream query.

### args

The `args` parameter allows you to pass arguments to the upstream GraphQL query:

```graphql showLineNumbers
type Query {
  user: User
    @graphQL(
      url: "https://jsonplaceholder.typicode.com"
      name: "user"
      args: [{key: "id", value: "{{.value.userId}}"}]
    )
}
```

Example query to fetch a user's name by ID:

```graphql showLineNumbers
query {
  user(id: 1) {
    name
  }
}
```

### headers

The `headers` parameter customizes the HTTP headers sent in the GraphQL request:

```graphql showLineNumbers
type Mutation {
  users: User
    @graphQL(
      url: "https://jsonplaceholder.typicode.com"
      name: "users"
      headers: [{key: "X-Server", value: "Tailcall"}]
    )
}
```

Here, the `X-Server` header is added to requests.

### batch

If the upstream server supports batching, you can use the `batch` option to batch requests:

```graphql showLineNumbers
type Query {
  users: [User]
    @graphQL(
      url: "https://jsonplaceholder.typicode.com"
      name: "users"
      batch: true
    )
  posts: [Post]
    @graphQL(
      url: "https://jsonplaceholder.typicode.com"
      name: "posts"
      batch: true
    )
}
```

### dedupe

The `dedupe` parameter is a boolean flag that, when set to `true`, prevents duplicate requests from being sent concurrently:

```graphql showLineNumbers
type Query {
  users: [User]
    @graphQL(
      url: "https://jsonplaceholder.typicode.com"
      name: "users"
      dedupe: true
    )
}
```

## Combining Multiple Directives

The `@graphQL` directive can be used in combination with other [resolvable directives](../directives.md#resolvable-directives), with results merged deeply. This allows for powerful and flexible resolver configurations.

For more details, see [Directives Documentation](../directives.md).
