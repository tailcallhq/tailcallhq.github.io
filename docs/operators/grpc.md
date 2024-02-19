---
title: "@grpc"
---

The **@grpc** operator, a crucial GraphQL custom directive, interfaces with gRPC services. It directly invokes gRPC services through GraphQL queries, bridging two powerful technologies. This directive proves useful in integrating GraphQL with microservices exposing gRPC endpoints.

### Using the `@grpc` Operator

The **@grpc** operator resolves GraphQL fields using gRPC services. For example, querying the `users` field triggers a gRPC request to the `ListUsers` method of the `UserService`.

```graphql showLineNumbers
type Query {
  users: [User] @grpc(service: "UserService", method: "ListUsers", protoPath: "./proto/user_service.proto")
}
```

In this example, querying the `users` field prompts the GraphQL server to make a gRPC request to the `ListUsers` method of the `UserService`.

### Sample proto File

The `.proto` file outlines the gRPC service structure and its methods. For instance:

```proto showLineNumbers
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

### service

Indicates the gRPC service for calling. It must match the service name defined in the `.proto` file.

```graphql showLineNumbers
type Query {
  users: [User]
    @grpc(
      # highlight-start
      service: "UserService"
      # highlight-end
      method: "ListUsers"
      protoPath: "./proto/user_service.proto"
    )
}
```

### method

Specifies the gRPC method for invocation within the service. It must match the method name in the `.proto` file.

```graphql showLineNumbers
type Query {
  users: [User]
    @grpc(
      service: "UserService"
      # highlight-start
      method: "ListUsers"
      # highlight-end
      protoPath: "./proto/user_service.proto"
    )
}
```

### protoPath

Specifies the path to the `.proto` file, which contains definitions for service and method for encoding and decoding requests/responses. The system resolves relative paths from the directory where it runs the tailcall command.

```graphql showLineNumbers
type Query {
  users: [User]
    @grpc(
      service: "UserService"
      method: "ListUsers"
      # highlight-start
      protoPath: "./proto/user_service.proto"
      # highlight-end
    )
}
```

### baseURL

Indicates the base URL for the gRPC API. If omitted, it defaults to the URL defined in the `@upstream` operator.

```graphql showLineNumbers
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

### body

Outlines the arguments for the gRPC call. The `body` field specifies the arguments for the gRPC call, either static or dynamic.

```graphql showLineNumbers
type UserInput {
  id: ID
}

type Query {
  user(id: UserInput!): User
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

### headers

Custom headers for the gRPC request can specify using the `headers` argument. This proves useful for passing authentication tokens or other contextual information.

```graphql showLineNumbers
type Query {
  users: [User]
    @grpc(
      service: "UserService"
      method: "ListUsers"
      protoPath: "./proto/user_service.proto"
      baseURL: "https://grpc-server.example.com"
      # highlight-start
      headers: [{key: "X-CUSTOM-HEADER", value: "custom-value"}]
      # highlight-end
    )
}
```

### groupBy

The `groupBy` argument optimizes batch requests by grouping them based on specified response keys, enhancing performance in scenarios with similar requests.

By understanding and using its fields, developers can create efficient, streamlined APIs that leverage the strengths of both GraphQL and gRPC.

```graphql showLineNumbers
type Query {
  users(id: UserInput!): User
    @grpc(
      service: "UserService"
      method: "ListUsers"
      protoPath: "./proto/user_service.proto"
      baseURL: "https://grpc-server.example.com"
      # highlight-start
      groupBy: ["id"]
      # highlight-end
    )
}
```

The **@grpc** operator is a powerful tool for GraphQL developers, enabling seamless integration with gRPC services. By understanding and utilizing its specific fields, developers can create efficient, streamlined APIs that leverage the strengths of both GraphQL and gRPC.
