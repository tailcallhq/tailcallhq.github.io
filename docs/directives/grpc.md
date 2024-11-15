---
title: "@grpc"
description: The @grpc directive enables the resolution of GraphQL fields via gRPC services.
slug: ../grpc-directive
---

The `@grpc` directive enables the resolution of GraphQL fields via gRPC services. Below is an illustrative example of how to apply this directive within a GraphQL schema:

```graphql
schema @link(src: "./users.proto", type: Protobuf) {
  query: Query
}

type Query {
  users: [User] @grpc(method: "users.UserService.ListUsers")
}
```

This schema snippet demonstrates the directive's application, where a query for `users` triggers a gRPC request to the `UserService`'s `ListUsers` method, thereby fetching the user data.

The `.proto` file delineates the structure and methods of the gRPC service. A simplified example of such a file is as follows:

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

## method

This parameter specifies the gRPC service and method to be invoked, formatted as `<package>.<service>.<method>`:

```graphql
type Query {
  users: [User]
    @grpc(method: "proto.users.UserService.ListUsers")
}
```

## url

Defines the base URL for the gRPC API.

```graphql
type Query {
  users: [User]
    @grpc(
      url: "https://grpc-server.example.com"
      method: "proto.users.UserService.ListUsers"
    )
}
```

## body

This parameter outlines the arguments for the gRPC call, allowing for both static and dynamic inputs:

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

## headers

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

## batchKey

This argument is employed to optimize batch requests by grouping them based on specified response keys, enhancing performance in scenarios requiring multiple, similar requests:

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
Read about [n + 1](../N+1.md) to learn how to use the `batchKey` setting.
:::

## onResponseBody

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

## select

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

## dedupe

A boolean flag, if set to `true`, will enable deduplication of IO operations to enhance performance. This flag prevents duplicate IO requests from being executed concurrently, reducing resource load. If not specified, this feature defaults to `false`.

```graphql showLineNumbers
@grpc(
  method: "news.UsersService.GetUserDetails"
  dedupe: true
)
```
