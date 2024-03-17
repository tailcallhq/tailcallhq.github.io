---
title: Rest API on top of GraphQL
description: Exposing REST endpoints on top of GraphQL via @rest directive.
---

Tailcall's `@rest` directive exposes standard REST endpoints, enabling the fetching of data from REST APIs directly through GraphQL queries.

This guide will show you how to use the `@rest` directive to create a RESTful service over a GraphQL layer for retrieving product information.

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
  @upstream(baseURL: "https://fakestoreapi.com/")
  @link(type: Operation, src: "user-operation.graphql") {
  query: Query
}

type Query {
  product(id: Int!): Product
    @http(path: "/products/{{args.id}}")
}

type Product {
  id: Int
  title: String
  price: Float
  description: String
  category: String
  image: String
  rating: Rating
}

type Rating {
  rate: Float
  count: Int
}
```

### Step 2: Create the Operation File

`user-operation.graphql`

```graphql
query ($id: Int!) @rest(method: GET, path: "/product/$id") {
  product(id: $id) {
    id
    title
    price
  }
}
```

Let's try querying our newly created REST endpoint in our HTTP Client.
We'll make a `GET` request to `http://127.0.0.1:8000/api/product/1` and see if we get the expected response.

#### Response

![REST Demo](/images/docs/rest.png)
