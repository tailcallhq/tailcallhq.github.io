---
title: "@rest"
description: The @rest directive maps fields to REST API endpoints, allowing GraphQL to serve as a layer over RESTful services.
slug: ../rest-directive
---

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

The `@rest` directive is defined as follows:

```graphql title="Directive Definition" showLineNumbers
directive @rest(
  """
  HTTP method for the REST endpoint
  """
  method: Method!

  """
  Path for the REST endpoint, supports dynamic values
  """
  path: String!

  """
  Query parameters as key-value pairs
  """
  query: [InputKeyValue!]
) on OPERATION_DEFINITION
```

API orchestration is essential, yet not all can adopt GraphQL despite its benefits. The Tailcall DSL feature leverages GraphQL at compile time to generate REST endpoints, aligning with traditional API infrastructure like CDNs and Gateways.

## Usage

- **method**: Specifies the HTTP method (GET, POST, etc.).
- **path**: Sets the endpoint URL, with support for dynamic values from query arguments.
- **query**: Defines the query parameters as key-value pairs.

## Example

Define GraphQL types and queries, using the `@rest` directive to map fields to REST API endpoints.

<Tabs>
  <TabItem value="config" label="main.yaml">

```yaml
links:
  - src: main.graphql
  - type: Operation
    src: user-operation.graphql
```

  </TabItem>

  <TabItem value="schema" label="main.graphql">

```graphql
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

  </TabItem>

  <TabItem value="operation" label="user-operation.graphql">

```graphql
query ($id: Int!) @rest(method: GET, path: "/user/$id") {
  user(id: $id) {
    id
    name
  }
}
```

  </TabItem>

</Tabs>

![REST Demo](/images/docs/rest-user.png)

This example demonstrates how to define a simple query to fetch user data from a REST endpoint using the `@rest` directive. By leveraging `@rest`, GraphQL can serve as a layer over RESTful services, combining REST's simplicity with GraphQL's flexibility.
