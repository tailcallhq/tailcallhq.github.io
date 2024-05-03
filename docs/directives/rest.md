---
title: "@rest"
---

API orchestration is essential, yet not all can adopt GraphQL despite its benefits. The Tailcall DSL feature leverages GraphQL at compile time to generate REST endpoints, aligning with traditional API infrastructure like CDNs and Gateways.

## Usage

- **method**: Specifies the HTTP method (GET, POST, etc.).
- **path**: Sets the endpoint URL, with support for dynamic values from query arguments.
- **query**: Defines the query parameters as key-value pairs.

## Example

Define GraphQL types and queries, using the `@rest` directive to map fields to REST API endpoints.

`schema.graphql`

```graphql
schema
  @upstream(baseURL: "https://jsonplaceholder.typicode.com")
  @link(type: Operation, src: "user-operation.graphql") {
  query: Query
}

type Query {
  user(id: Int!): User
    @rest(method: "GET", path: "/users/{{.args.id}}")
}

type User {
  id: Int!
  name: String!
  email: String!
}
```

`user-operation.graphql`

```graphql
query ($id: Int!) @rest(method: GET, path: "/user/$id") {
  user(id: $id) {
    id
    name
  }
}
```

![REST Demo](/images/docs/rest-user.png)

This example demonstrates how to define a simple query to fetch user data from a REST endpoint using the `@rest` directive. By leveraging `@rest`, GraphQL can serve as a layer over RESTful services, combining REST's simplicity with GraphQL's flexibility.
