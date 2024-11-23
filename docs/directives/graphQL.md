---
title: "@graphQL"
description: The @graphQL directive allows to specify a GraphQL API server to fetch data from.
slug: ../graphQL-directive
---

The `@graphQL` directive is defined as follows:

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

The `@graphQL` directive allows to specify a GraphQL API server to fetch data from.

```graphql showLineNumbers
type Query {
  users: [User]
    @graphQL(
      url: "https://jsonplaceholder.typicode.com"
      name: "userList"
    )
}
```

The `@graphQL` directive facilitates fetching a list of users from the GraphQL API upstream. The [name](#name) argument specifies the root field's name on the upstream server. The upcoming request to the GraphQL server determines the `User` type's inner fields for the request. Depending on the operation type within which one finds the `@graphQL` directive, the GraphQL configuration determines the query's operation type.

For the next request with the config above:

```graphql showLineNumbers
query {
  users {
    id
    name
  }
}
```

Tailcall will request the next query for the upstream:

```graphql showLineNumbers
query {
  userList {
    id
    name
  }
}
```

## url

This refers to the URL of the API.

```graphql showLineNumbers
type Query {
  users: [User]
    @graphQL(
      name: "users"
      url: "https://graphqlzero.almansi.me/api"
    )
}
```

## name

The root field's name on the upstream to request data from. For example:

```graphql showLineNumbers
type Query {
  users: [User]
    @graphQL(
      url: "https://jsonplaceholder.typicode.com"
      name: "userList"
    )
}
```

When Tailcall receives a query for the `users` field, it will request a query for `userList` from the upstream.

## args

Named arguments for the requested field. For example:

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

Will request the next query from the upstream for the first user's name:

```graphql showLineNumbers
query {
  user(id: 1) {
    name
  }
}
```

## headers

The `headers` parameter allows customizing the headers of the GraphQL request made by the `@graphQL` directive. Specifying a key-value map of header names and their values achieves this.

For instance:

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

In this example, a request to `/users` will include the HTTP header `X-Server` with the value `Tailcall`.

## batch

In case the upstream GraphQL server supports request batching, we can specify the `batch` argument to batch requests to a single upstream into a single batch request. For example:

```graphql showLineNumbers
schema
  @upstream(
    batch: {
      maxSize: 1000
      delay: 10
      headers: ["X-Server", "Authorization"]
    }
  ) {
  query: Query
  mutation: Mutation
}

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

## dedupe

A boolean flag, if set to `true`, will enable deduplication of IO operations to enhance performance. This flag prevents duplicate IO requests from being executed concurrently, reducing resource load. If not specified, this feature defaults to `false`.

```graphql showLineNumbers
@graphQL(
  url: "https://jsonplaceholder.typicode.com",
  name: "users",
  dedupe: true
)
```

Make sure you have also specified batch settings to the `@upstream` and to the `@graphQL` directive.
