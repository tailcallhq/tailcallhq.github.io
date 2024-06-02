---
title: "REST on top of GraphQL"
description: Exposing REST endpoints on top of GraphQL via @rest directive.
---

In order to handle complicated business problems, modern systems frequently need to work with hundreds or even thousands of APIs. Because of its powerful API composition capabilities, GraphQL has been adopted by numerous organisations. But switching to GraphQL can be difficult. It involves a lot of team training as well as major adjustments to frontend and backend architectures.

That's why Tailcall has developed a directive called `@rest` to streamline this transition and take advantage of GraphQL's power without requiring a complete overhaul. With the help of this directive, Tailcall GraphQL queries and mutations may be made available as REST endpoints.

## How it works

![Diagram](/images/docs/rest-diagram.svg)

<h4 align="center">Diagram showcasing how it works under hood</h4>

This guide show you how to expose REST endpoints for your GraphQL operations by using the @rest directive like follows:

There are three main steps to this process:

1. Define your Tailcall GraphQL configuration file.
2. Define an operation using `@rest` directive in a separate file.
3. Link the operation to the main config file.

## Example

### Step 1: Define your Tailcall GraphQL configuration

```graphql
schema
  @upstream(
    baseURL: "https://jsonplaceholder.typicode.com"
  ) {
  query: Query
}

type Query {
  post(id: Int!): Post @http(path: "/posts/{{.args.id}}")
}

type Post {
  userId: Int!
  id: Int
  title: String
  body: String
  user: User @http(path: "/users/{{.value.userId}}")
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

for more information on how to define your Tailcall GraphQL configuration file, please refer to the [Tailcall GraphQL Configuration](/docs/guides/getting-started-with-graphql-using-tailcall/#configuration).

### Step 2: Define an operation using `@rest` directive

We will define an operation and use the `@rest` directive to define a REST endpoint for the operation. We will create a new file and add the following content to it. Save the file with the
filename: `user-operation.graphql`. You can name the file anything you want, but make sure to link it to the main config file in the next step.

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

to know more about the `@rest` directive, please refer to the [Tailcall GraphQL Directives](../directives/rest.md).

### Step 3: Link the operation to the main config file

checkout the `@link` directive in the config snippet below to link the operation file. This step is crucial to make the REST endpoint available.

```graphql
schema
  @upstream(baseURL: "https://jsonplaceholder.typicode.com")
  #highlight-start
  @link(type: Operation, src: "user-operation.graphql") {
  #highlight-end
  query: Query
}
```

To know more about the `@link` directive, please refer to the [Tailcall GraphQL Directives](../directives/link.md).

#### Response

![REST Demo](/images/docs/rest.png)

In summary, by utilizing the `@rest` directive, we've seamlessly exposed RESTful services over Tailcall's GraphQL, enhancing the traditional posts API to offer richer functionality without additional code. This approach combines the simplicity and ubiquity of REST with the modularity and flexibility of GraphQL, allowing for easy consumption from any HTTP client while leveraging GraphQL's powerful data querying capabilities.
