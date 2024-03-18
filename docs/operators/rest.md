---
title: "@rest"
description: Exposing REST endpoints on top of GraphQL via @rest directive.
---

Every one needs orchestration for APIs but everyone can't move to GraphQL and there are valid reasons for not moving to GraphQL. This feature allows people to building the Tailcall DSL, leveraging the GraphQL capabilities at compile time and generating REST endpoint for actual use instead. REST is a well-known standard so works with traditional API Infrastructure - CDNs Gateways etc.

This guide will show you how to use the `@rest` directive to create a RESTful service over a GraphQL layer

## The @rest Directive Basics

- **method**: Specifies the HTTP method (GET, POST, etc.).

- **path**: Defines the endpoint URL, supporting dynamic values from query arguments.

## Example: Retrieving Product Information

![Diagram](/images/docs/rest-diagram.svg)

#### Diagram showcasing how it works under hood

First, define the GraphQL types and queries. Use the `@rest` directive to map GraphQL fields to REST API endpoints.

### Step 1: Define Your GraphQL Schema

`schema.graphql`

```graphql
schema
  @server(graphiql: true)
  @upstream(baseURL: "https://jsonplaceholder.typicode.com")
  @link(type: Operation, src: "user-operation.graphql") {
  query: Query
}

type Query {
  post(id: Int!): Post @http(path: "/posts/{{args.id}}")
  user(id: Int!): User @http(path: "/users/{{args.id}}")
}

type Post {
  userId: Int!
  id: Int
  title: String
  body: String
  user: User @http(path: "/users/{{value.userId}}")
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
  phone: String
  website: String
}
```

### Step 2: Create the Operation File

`user-operation.graphql`

```graphql
query ($id: Int!) @rest(method: GET, path: "/post/$id") {
  post(id: $id) {
    id
    title
    body
    user {
      id
      name
    }
  }
}
```

#### Response

![REST Demo](/images/docs/rest.png)

In summary, by utilizing the `@rest` directive, we've seamlessly integrated RESTful services with GraphQL, enhancing the traditional posts API to offer richer functionality without additional code. This approach combines the simplicity and ubiquity of REST with the modularity and flexibility of GraphQL, allowing for easy consumption from any HTTP client while leveraging GraphQL's powerful data querying capabilities.
