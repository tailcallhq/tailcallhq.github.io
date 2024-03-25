---
title: "@graphQL"
---

The `@graphQL` directive allows to specify GraphQL API server request to fetch data from.

```graphql showLineNumbers
type Query {
  users: [User] @graphQL(name: "userList")
}
```

The `@graphQL` directive facilitates fetching a list of users from the GraphQL API upstream. The [name](#name) argument specifies the root field's name on the upstream server. The upcoming request to the Tailcall server determines the `User` type's inner fields for the request. Depending on the operation type within which one finds the `@graphQL` directive, the Tailcall config determines the query's operation type.

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

### baseURL

This refers to the base URL of the API. If not specified, the default base URL is the one specified in the [`@upstream`](./upstream.md) directive.

```graphql showLineNumbers
type Query {
  users: [User]
    @graphQL(
      name: "users"
      baseURL: "https://graphqlzero.almansi.me/api"
    )
}
```

### name

The root field's name on the upstream to request data from. For example:

```graphql showLineNumbers
type Query {
  users: [User] @graphQL(name: "userList")
}
```

When Tailcall receives a query for the `users` field, it will request a query for `userList` from the upstream.

### args

Named arguments for the requested field. For example:

```graphql showLineNumbers
type Query {
  user: User
    @graphQL(
      name: "user"
      args: [{key: "id", value: "{{value.userId}}"}]
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

### headers

The `headers` parameter allows customizing the headers of the GraphQL request made by the `@graphQL` directive. Specifying a key-value map of header names and their values achieves this.

For instance:

```graphql showLineNumbers
type Mutation {
  users: User
    @graphQL(
      name: "users"
      headers: [{key: "X-Server", value: "Tailcall"}]
    )
}
```

In this example, a request to `/users` will include the HTTP header `X-Server` with the value `Tailcall`.

### batch

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
  users: [User] @graphQL(name: "users", batch: true)
  posts: [Post] @graphQL(name: "posts", batch: true)
}
```

Make sure you have also specified batch settings to the `@upstream` and to the `@graphQL` directive.
