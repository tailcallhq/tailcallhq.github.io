---
title: "@grpc"
---

The **@grpc** operator, a crucial GraphQL custom directive, interfaces with gRPC services. It directly invokes gRPC services through GraphQL queries, bridging two powerful technologies. This directive proves useful in integrating GraphQL with microservices exposing gRPC endpoints.

### Using the `@grpc` Operator

The **@grpc** operator resolves GraphQL fields using gRPC services. For example, querying the `users` field triggers a gRPC request to the `ListUsers` method of the `UserService`.

```graphql showLineNumbers
schema @link(id: "proto", src: "./users.proto", type: Protobuf) {
  query: Query
}

type Query {
  users: [User] @grpc(method: "proto.users.UserService.ListUsers")
}
```

In this example, querying the `users` field prompts the GraphQL server to make a gRPC request to the `ListUsers` method of the `users.UserService`.

### Sample proto File

The `.proto` file outlines the gRPC service structure and its methods. For instance:

```proto showLineNumbers
syntax = "proto3";

package users;

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

To connect that file to Tailcall use `@link` operator:

```graphql showLineNumbers
schema @link(id: "proto", src: "./users.proto", type: Protobuf) {
  query: Query
}
```

Later use provided `id` as the first part of `method` option for `@grpc` operator to connect the definition to this specific proto file.

### method

Specifies the gRPC method for invocation within the service. It must match the method name in the `.proto` file including package path.

```graphql showLineNumbers
type Query {
  users: [User]
    @grpc(
      # highlight-start
      method: "proto.users.UserService.ListUsers"
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
      method: "proto.users.UserService.ListUsers"
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
      method: "proto.users.UserService.GetUser"
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
      method: "proto.users.UserService.ListUsers"
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
      method: "proto.users.UserService.ListUsers"
      baseURL: "https://grpc-server.example.com"
      # highlight-start
      groupBy: ["id"]
      # highlight-end
    )
}
```

The **@grpc** operator is a powerful tool for GraphQL developers, enabling seamless integration with gRPC services. By understanding and utilizing its specific fields, developers can create efficient, streamlined APIs that leverage the strengths of both GraphQL and gRPC.
