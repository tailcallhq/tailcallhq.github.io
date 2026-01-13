---
title: "@grpc"
description: The @grpc directive enables the resolution of GraphQL fields via gRPC services.
slug: ../grpc-directive
---

The `@grpc` directive allows GraphQL fields to be resolved by fetching data through gRPC services, facilitating powerful integrations between GraphQL and gRPC.

## `@grpc` Directive Definition

```graphql title="Directive Definition" showLineNumbers
directive @grpc(
  url: String!
  method: String!
  body: JSON
  headers: [InputKeyValue!]
  batchKey: [String!]
  onResponseBody: String
  select: JSON
  dedupe: Boolean
) on FIELD_DEFINITION
```

## Example: Resolving Users via gRPC

Here's an example demonstrating the use of the `@grpc` directive:

```graphql showLineNumbers
schema @link(src: "./users.proto", type: Protobuf) {
  query: Query
}

type Query {
  users: [User] @grpc(method: "users.UserService.ListUsers")
}
```

In this example, the `users` field fetches data from the gRPC method `UserService.ListUsers`.

### Defining gRPC Services

The gRPC methods referenced by the directive are defined in a `.proto` file, such as:

```proto
syntax = "proto3";

package users;

service UserService {
  rpc ListUsers (UserListRequest) returns (UserListReply) {}
  rpc GetUser (UserGetRequest) returns (UserGetReply) {}
}

message UserListRequest {
  // Definitions of request parameters
}

message UserListReply {
  // Structure of the reply
}

message UserGetRequest {
  // Definitions of request parameters
}

message UserGetReply {
  // Structure of the reply
}
```

:::important
It is mandatory to have a package name in a protobuf file.
:::

Linking this file within a GraphQL schema is facilitated by the `@link` directive, as shown below:

```graphql
schema @link(src: "./users.proto", type: Protobuf) {
  query: Query
}
```

Tailcall automatically resolves the protobuf file for any methods referenced in the `@grpc` directive.

## Directive Arguments

### method

Defines the gRPC service and method to call, formatted as `<package>.<service>.<method>`:

```graphql
type Query {
  users: [User]
    @grpc(method: "proto.users.UserService.ListUsers")
}
```

### url

Specifies the base URL for the gRPC service:

```graphql
type Query {
  users: [User]
    @grpc(
      url: "https://grpc-server.example.com"
      method: "proto.users.UserService.ListUsers"
    )
}
```

### body

The `body` outlines the arguments for the gRPC call, allowing for both static and dynamic inputs:

```graphql
type UserInput {
  id: ID
}

type Query {
  user(id: UserInput!): User
    @grpc(
      body: "{{.args.id}}"
      method: "proto.users.UserService.GetUser"
    )
}
```

### headers

Custom headers for the gRPC request can be defined, facilitating the transmission of authentication tokens or other contextual data:

```graphql
type Query {
  users: [User]
    @grpc(
      headers: [
        {key: "X-CUSTOM-HEADER", value: "custom-value"}
      ]
      method: "proto.users.UserService.ListUsers"
    )
}
```

### batchKey

Use `batchKey` to group similar requests for optimized batching, reducing the number of requests:

```graphql
type Query {
  users(id: UserInput!): [User]
    @grpc(
      batchKey: ["id"]
      method: "proto.users.UserService.ListUsers"
      url: "https://grpc-server.example.com"
    )
}
```

:::info
Refer to [N + 1 Problem](../N+1.md) to learn how to use the `batchKey` setting.
:::

### onResponseBody

This hook allows you to intercept and modify the response body from upstream services before it's processed by Tailcall. Like [onRequest](./http.md#onrequest), it accepts a string value representing a middleware function defined in a JavaScript file. This function can be used to transform or validate the response data.

```graphql showLineNumbers
type Query {
  news: NewsData!
    @grpc(
      method: "news.NewsService.GetAllNews"
      onResponseBody: "onResponse"
    )
}
```

### select

You can use `select` with mustache syntax to re-construct the directives
response to the desired format. This is useful when data are deeply
nested or want to keep specific fields only from the response.

- EXAMPLE 1: if we have a call that returns `{ "user": { "items": [...],
... } ... }` we can use `"{{.user.items}}"`, to extract the `items`.
- EXAMPLE 2: if we have a call that returns `{ "foo": "bar", "fizz": {
"buzz": "eggs", ... }, ... }` we can use `{ foo: "{{.foo}}", buzz:
"{{.fizz.buzz}}" }`

```graphql showLineNumbers
type Query {
  userCompany(id: Int!): Company
    @grpc(
      method: "news.UsersService.GetUserDetails"
      select: "{{.company}}"
    )
  userDetails(id: Int!): UserDetails
    @grpc(
      method: "news.UsersService.GetUserDetails"
      select: {
        id: "{{.id}}"
        city: "{{.address.city}}"
        phone: "{{.phone}}"
      }
    )
}
```

### dedupe

The `dedupe` parameter, if set to `true`, prevents duplicate IO requests from being executed concurrently:

```graphql showLineNumbers
@grpc(
  method: "news.UsersService.GetUserDetails"
  dedupe: true
)
```

## Combining Directives

The `@grpc` directive can be used in combination with other [resolvable directives](../directives.md#resolvable-directives), with results merged deeply. This allows for powerful and flexible resolver configurations.

For more details, see [Directives Documentation](../directives.md).
