---
title: "@grpc"
sidebar_position: 4
---

The **@grpc** operator is an essential GraphQL custom directive designed to interface with gRPC services. It allows GraphQL queries to directly invoke gRPC services, thereby bridging two powerful technologies. This directive is particularly useful when integrating GraphQL with microservices that expose gRPC endpoints.

Here's an overview of each argument within the **@grpc** directive:

## Overview of parameters

### `service`

Specifies the gRPC service to be called. This should match the service name as defined in the `.proto` file.

### `method`

Indicates the specific gRPC method to be invoked within the specified service.

### `body`

Outlines the arguments for the gRPC call, which can be static or dynamic.

### `baseURL`

Defines the base URL for the gRPC API. If omitted, the default URL defined in the `@upstream` operator is used.

### `headers`

A key-value mapping for customizing HTTP request headers. The `Content-Type` is set automatically to `application/grpc`.

### `protoPath`

Path to the `.proto` file, containing service and method definitions for request/response encoding and decoding.

### `groupBy`

Specifies the response key path for grouping in batched requests.

## Detailed Documentation

### Using the `@grpc` Operator

The **@grpc** operator allows GraphQL fields to be resolved using gRPC services. Here's an example demonstrating its usage in a GraphQL schema:

```graphql
type Query {
  users: [User] @grpc(service: "UserService", method: "ListUsers", protoPath: "./proto/user_service.proto")
}
```

In this example, when the `users` field is queried, the GraphQL server will make a gRPC request to the `ListUsers` method of the `UserService`.

### Sample `.proto` File

The `.proto` file defines the structure of the gRPC service and its methods. Here is a simplified example:

```proto
syntax = "proto3";

service UserService {
  rpc ListUsers (UserListRequest) returns (UserListReply) {}
  rpc GetUser (UserGetRequest) returns (UserGetReply) {}
}

message UserListRequest {
  // Request parameters
}

message UserListReply {
  // Reply structure
}

message UserGetRequest {
  // Reply structure
}

message UserGetReply {
  // Reply structure
}
```

### `baseURL`

The `baseURL` field is optional. If specified, it overrides the default URL set in the `@upstream` operator.

```graphql
type Query {
  users: [User]
    @grpc(
      service: "UserService"
      method: "ListUsers"
      protoPath: "./proto/user_service.proto"
      # highlight-start
      baseURL: "https://grpc-server.example.com"
      # highlight-end
    )
}
```

### `body`

The `body` field is used to specify the arguments for the gRPC call. It can be static or dynamic. Here's an example:

```graphql
type UserInput {
  id: ID
}

type Query {
  user(id: UserInput): User
    @grpc(
      service: "UserService"
      method: "GetUser"
      protoPath: "./proto/user_service.proto"
      # highlight-start
      body: "{{args.id}}"
      # highlight-end
    )
}
```

### `headers`

Custom headers for the HTTP request can be specified using the `headers` argument. This is particularly useful for passing authentication tokens or other contextual information.

### `groupBy`

The `groupBy` argument is used to optimize batch requests by grouping them based on specified response keys. This can significantly improve performance in scenarios with multiple, similar requests.

The **@grpc** operator is a powerful tool for GraphQL developers, allowing for seamless integration with gRPC services. By understanding and utilizing its various fields, developers can create efficient, streamlined APIs that leverage the strengths of both GraphQL and gRPC.
