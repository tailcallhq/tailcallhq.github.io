### Using gRPC with Tailcall

Tailcall makes it easy to build GraphQL APIs that connect to gRPC services. With just a few lines of schema directives, you can call gRPC methods directly from your GraphQL resolvers.

## Adding the gRPC Directive
To call a gRPC method, use the @grpc directive on a GraphQL field:

```graphql
type Query {
  getUser(id: ID!): User @grpc(service: "UserService", method: "GetUser")
}
```
This will call the GetUser method on the UserService gRPC service.

You can specify the proto file path and gRPC server URL in your Tailcall config.

## Mapping Parameters
Tailcall will automatically map GraphQL arguments to gRPC request parameters.

You can also manually map fields:

```graphql
type Query {
  getUser(id: ID!): User @grpc(
    service: "UserService" 
    method: "GetUser"
    args: [{graphql: "id", grpc: "userId"}]
  )
}
```

## Handling Responses
The gRPC response is mapped to GraphQL based on field names.

Use @map directives to customize:

```type User @map(grpc: "GetUserResponse") {
  id: ID! @map(grpc: "id")
  name: String @map(grpc: "name")
}
```

## Streaming
Enable bidirectional streaming with the @stream directive:

```type Query {
  getMessages: [Message!] @grpc(
    service: "MessagingService"
    method: "GetMessages"
  ) @stream(grpc: "getMessages")  
}
```

### Building a GraphQL API on gRPC with Tailcall

Tailcall provides the simplest way to build a GraphQL API on top of your existing gRPC services. The declarative GraphQL schema acts as the contract, while Tailcall handles all the complex middleware and mapping logic required to connect to gRPC.

## Why gRPC?
gRPC has many benefits as a foundation for your API:

High performance - gRPC is built on HTTP/2 and Protobufs for maximum speed and efficiency.

Type safety - Protobuf message formats provide end-to-end type safety.

Multi-language support - gRPC tooling is available for most major languages.

Existing ecosystem - Many companies already have gRPC services they want to expand.

## Quick Start with Tailcall
With Tailcall, going from gRPC to GraphQL takes just minutes:

Define your GraphQL schema in .graphql with the fields you want to expose.

Add a @grpc directive to connect a field to a gRPC method:

```type Query {
  getUser(id: ID!): User @grpc(service: "UserService", method: "GetUser")
}
```
This will call the GetUser method on the UserService gRPC service when the getUser field is queried.
Start Tailcall pointed at your schema and gRPC server.

That's it! Tailcall handles the complex work of resolving GraphQL queries to gRPC requests for you.

### Handling gRPC Responses
The gRPC response is automatically mapped to the GraphQL schema based on field names. For example, if the GetUser method returns:

```message GetUserResponse {
  string id = 1;
  string name = 2;
}
```
Tailcall will map id and name to the User GraphQL type.

You can also customize the mapping using @map directives on the GraphQL type.

## Mapping GraphQL Operations to gRPC
Tailcall transparently maps between GraphQL and gRPC:

Field arguments become gRPC request parameters.
Query responses are mapped to schema types.
Bidirectional streaming APIs are supported.
You control the mapping using directives like @grpc, @stream, and @map.

## Iterating on the Schema
The GraphQL schema serves as the source of truth for the API. Evolve it without needing to change backend services.

Add new fields, modify types, optimize queries - all reflected immediately via Tailcall.

This makes Tailcall perfect for unlocking and improving existing gRPC APIs.

## Why Tailcall Makes gRPC Easy
Tailcall handles the hard parts so you can focus on your schema:

No resolver code to write
Automatic request/response mapping
gRPC streaming and error handling
Schema-first development
Building on gRPC has never been simpler. Give Tailcall a try today!
