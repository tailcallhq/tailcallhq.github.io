---
title: Authentication
description: "Learn how you can provide granular access to types and fields in GraphQL schema with the help of authentication providers"
slug: /auth
sidebar_position: 1
---

This guide will walk you through entity level authentication in GraphQL and how it could be achieved with Tailcall.

## What is Authentication?

Authentication in GraphQL refers to the process of verifying the identity of a user before allowing access to specific fields in GraphQL schema. Essentially, it's about controlling who can see or interact with certain pieces of data exposed by GraphQL API. This process is crucial for following reasons:

- **Protect Sensitive Information** Some fields may contain sensitive information that should not be accessible to unauthenticated users.
- **Prevent Unauthorized Access** Ensuring that authenticated users can query certain fields helps prevent unauthorized access and potential data breaches.
- **Customized User Experiences** Authentication allows for personalized queries based on the user's identity.

The authentication could be implemented by different credential validation mechanisms, like:

- [Basic Auth](./basic-auth.md)
- [JWT](./jwt.md)

### Entity Level Authentication in GraphqQL

Entity level authentication in GraphQL refers to applying authentication logic to specific entities or types within your GraphQL schema, rather than at the API entry point or resolver level for individual queries or mutations. This approach allows you to control access to particular data types or fields based on the user's authentication status or their permissions, enabling a more granular and flexible security model.

Advantages of this approach:

- **Flexibility**: You can tailor security measures to fit the exact needs of your application, protecting sensitive data more effectively.
- **Scalability**: As your schema grows, entity level authentication allows you to extend your security policies to new entities and fields.
- **User Experience**: By fine-tuning access control, you can ensure that users have a seamless experience interacting with data they are authorized to see or modify.

## Tailcall config

Enabling support for authentication in Tailcall could be done in two steps:

1. With the help of [`@link` directive](../directives/link.md) connect multiple authentication files as you need for different provides. To connect it use either [`Htpasswd`](../directives/link.md#htpasswd) or [`Jwks`](../directives/link.md#jwks) link type
2. Mark that some type of field requires authentication to be fetched with the help of [`@protected` directive](../directives/protected.md)

Your config could look like this now:

```graphql
schema
  @server(port: 8000, graphiql: true)
  @upstream(baseURL: "http://jsonplaceholder.typicode.com")
  @link(id: "auth-basic", type: Htpasswd, src: "htpasswd")
  @link(id: "auth-jwt", type: Jwks, src: "jwks.json") {
  query: Query
  mutation: Mutation
}

type Query {
  posts: [Post] @http(path: "/posts")
  user(id: Int!): User @http(path: "/users/{{args.id}}")
}

type Mutation {
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

In that case the whole `User` type and `Post.body` are marked as protected and therefore requiring authentication to resolve its content. That means following points:

- any query for `Post.body` will require authentication
- any query for any field of `User` will require authentication
- any field that resolves to `User` type will require authentication

For more info about possible configuration for available providers read articles for [Basic Auth](./basic-auth.md) and [JWT](./jwt.md)

## Making test requests

Now let's try to access some data from the example above. Start the tailcall server with provided config and use graphQL playground that should be opened automatically in your browser.

If you execute the query that don't have any `@protected` fields like

```graphql
{
  posts {
    title
  }
}
```

Then the data for this will be resolved as usual without providing any additional info.

But if you change the query to access protected data, then if you don't provide any authentication data, i.e. for query:

```graphql
schema
  @server(port: 8000, graphiql: true)
  @upstream(baseURL: "http://jsonplaceholder.typicode.com")
  @link(id: "auth-basic", type: Htpasswd, src: "htpasswd")
  @link(id: "auth-jwt", type: Jwks, src: "jwks.json") {
  query: Query
  mutation: Mutation
}

type Query {
  posts: [Post] @http(path: "/posts")
  user(id: Int!): User @http(path: "/users/{{args.id}}")
}

type Mutation {
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

You will get an authentication failure error stating that authentication parameters were not provided.

Now update the request by providing additional Authorization header. You can do in the Playground by navigating to the tab `HTTP HEADERS` at the bottom by adding following header for Basic Auth:

```json
{
  "Authorization": "Basic dGVzdHVzZXIxOnBhc3N3b3JkMTIzs"
}
```

Now after executing the request again you'll get the response for all of the requested fields without any error.

## How it works

### @protected Type

If type is marked with `@protected` then:

- attempt to request any field of that type will require authentication
- attempt to request any field from other type that resolves to protected type will require authentication and the underlying IO operation won't be executed without it

### Mutation

For mutation entity level authentication works similar to queries. But since mutation involves requests that changes external state you should be careful where do you specify `@protected` directive because marking some nested field as protected doesn't prevent from executing the request to resolve the parent fields. I.e. following example is problematic:

```graphql
schema
  query: Query
  mutation: Mutation
}

type Query {
  user(id: Int!): User @http(path: "/users/{{args.id}}")
}

type Mutation {
  user(id: Int!): User @http(path: "/users/{{args.id}}", method: POST)
}

type User {
  id: Int!
  name: String!
  website: String @protected
}
```

Here you can still execute the mutation without any authentication and fail on attempting to resolve `website` field.

To resolve this issue, consider marking root fields as protected in case they require authentication, i.e.:

```graphql
schema
  query: Query
  mutation: Mutation
}

type Query {
  user(id: Int!): User @http(path: "/users/{{args.id}}")
}

type Mutation {
  user(id: Int!): User @http(path: "/users/{{args.id}}", method: POST) @protected
}

type User {
  id: Int!
  name: String!
  website: String @protected
}
```

### Multiple auth providers

In case you linked multiple authentication files all of them will be used to execute validation process. In that case, by default, Tailcall will validate all of them in parallel and succeed if at least one of them succeed.

### Authentication headers

To validate authentication for user request the specific headers are used (like `Authorization` header). In case auth is enabled for tailcall those headers will be also added to the [`allowedHeaders` list](../directives/upstream.md#allowedheaders) and therefore they will be forwarded to the upstream requests implicitly.
