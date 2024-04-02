---
title: Authentication
description: "Learn how you can provide granular access to types and fields in GraphQL schema with the help of authentication providers"
slug: /auth
sidebar_position: 1
---

## What is Authentication?

Authentication in GraphQL refers to the process of verifying the identity of a user before allowing access to specific fields in GraphQL schema. Essentially, it's about controlling who can see or interact with certain pieces of data exposed by GraphQL API. This process is crucial for following reasons:

- **Protect Sensitive Information** Some fields may contain sensitive information that should not be accessible to unauthenticated users.
- **Prevent Unauthorized Access** Ensuring that authenticated users can query certain fields helps prevent unauthorized access and potential data breaches.
- **Customized User Experiences** Authentication allows for personalized queries based on the user's identity.

The authentication could be implemented by different credential validation mechanisms, like:

- [Basic Auth](./basic-auth.md)
- [JWT](./jwt.md)

## Tailcall config

Enabling support for authentication in Tailcall could be done in two steps:

1. With the help of [`@link` directive](../directives/link.md) connect multiple authentication files as you need for different provides. To connect it use either [`Htpasswd`](../directives/link.md#htpasswd) or [`Jwks`](../directives/link.md#jwks) link type
2. Mark that some type of field requires authentication to be fetched with the help of [`@protected` directive](../directives/protected.md)

Your config could look like this now:

```graphql
schema
  @server(port: 8000, graphiql: true)
  @upstream(
    baseURL: "http://jsonplaceholder.typicode.com"
    httpCache: true
  )
  @link(id: "auth-basic", type: Htpasswd, src: "htpasswd")
  @link(id: "auth-jwt", type: Jwks, src: "jwks.json") {
  query: Query
}

type Query {
  posts: [Post] @http(path: "/posts")
  user(id: Int!): User @http(path: "/users/{{args.id}}")
}

type User @protected {
  id: Int!
  name: String!
  username: String!
  email: String!
  phone: String
  website: String
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String! @protected
  user: User @http(path: "/users/{{value.userId}}")
}
```

In that case the whole `User` type and `Post.body` are marked as protected and therefore requiring use authentication to resolve its content.

For more info about possible configuration for available providers read articles for [Basic Auth](./basic-auth.md) and [JWT](./jwt.md)

## How it works

### Multiple auth providers

In case you linked multiple authentication files all of them will be used to execute validation process. In that case, by default, Tailcall will validate all of them in parallel and succeed if at least one of them succeed.

### Authentication headers

To validate authentication for user request the specific headers are used (like `Authorization` header). In case auth is enabled for tailcall those headers will be also added to the [`allowedHeaders` list](../directives/upstream.md#allowedheaders) and therefore they will be forwarded to the upstream requests implicitly.
