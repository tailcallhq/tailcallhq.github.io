---
title: "Unlocking the Power of GraphQL Directives: A Comprehensive Guide"
description: Learn about GraphQL directives, their types, and how to use them to modify query execution.
sidebar_label: Directives
slug: graphql-directives
---

## Introduction to GraphQL Directives

GraphQL directives are a vital component of the GraphQL specification. These powerful tools may be less familiar due to their limited mandatory usage in API compliance. However, their ability to extend the functionality of a GraphQL API and server is crucial, especially in advanced tools like [Tailcall](/docs/tailcall-dsl-graphql-custom-directives) Graph Server.

This article will explore the nature of GraphQL directives, their applications, and provide examples of their usage.

## What Are GraphQL Directives?

GraphQL directives serve as annotations within a GraphQL schema, indicating that the annotated element requires special evaluation. They enable modifications in runtime execution and type validation within a GraphQL document.

Directives allow the alteration of GraphQL execution behavior by providing options beyond those available through field arguments. For example, directives can conditionally include or exclude fields.

Both built-in and custom directives can be utilized when building or consuming a GraphQL API. Built-in directives are defined by the GraphQL specification, while custom directives are created by the GraphQL service or tool being used.

### Built-in GraphQL Directives

The GraphQL specification includes several built-in directives with specific names and argument values of any input type. These directives can be applied to types, fields, fragments, and operations. Here are the built-in directives:

- **@skip**: Conditionally excludes fields from a query operation.
- **@include**: Conditionally includes fields in a query operation, opposite of @skip.
- **@deprecated**: Marks a field or enum value as deprecated and provides a reason for deprecation.

As GraphQL evolves, new directives like @defer and @stream may be introduced by the GraphQL Working Group. Additionally, GraphQL services and tools can provide custom directives.

### Custom GraphQL Directives

Custom directives enhance GraphQL's functionality, allowing the addition of bespoke behaviors to a GraphQL API. Various GraphQL server and client implementations use custom directives to extend functionality.

For instance, Tailcall uses custom directives like `@http`, `@grpc` and, `@graphql` to connect with data sources. These directives enable interfacing with REST APIs, gRPC APIs, and other GraphQL APIs. Directives like `@call` help combine data from multiple sources into a single type.

### Directive Locations in GraphQL

Directives can be applied to different locations within GraphQL. The GraphQL specification differentiates between type system directive locations and executable directive locations. The location determines how a GraphQL implementation handles them.

For example, `@include` and `@skip` can be used in queries passed to the GraphQL server, affecting query processing based on an argument. Conversely, @deprecated is only added to a schema definition.

### Type System Directives

Type system directives annotate a schema, object type, or field definition in GraphQL SDL (Schema Definition Language) when building a GraphQL server. Both built-in and custom directives can be used in type system directive locations, allowing GraphQL server implementations to take additional actions.

Type system directive locations, also known as "schema directives," include:

- SCHEMA
- SCALAR
- OBJECT
- FIELD_DEFINITION
- ARGUMENT_DEFINITION
- INTERFACE
- UNION
- ENUM & ENUM_VALUE
- INPUT_OBJECT & INPUT_FIELD_DEFINITION

For example, the @deprecated directive marks a field as deprecated:

```graphql
type User {
  id: ID!
  name: String!
    @deprecated(
      reason: "Use the firstName and lastName fields instead"
    )
  firstName: String!
  lastName: String!
  email: String!
}
```

The @deprecated directive provides a reason for deprecation, which is available to services that introspect the schema. Clients can then warn users about the deprecated field.

### Example of `@http` Directive

The `@http` directive, a custom directive in Tailcall Graph Server, fetches data for the User type from a REST API:

```graphql
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  user(id: ID!): User
    @http(
      baseURL: "https://jsonplaceholder.typicode.com"
      path: "/users/{{.args.id)}"
    )
}
```

When executing an operation that includes the user field, the Tailcall GraphQL API fetches data from the REST API and returns it to the client. The `@http` directive, applied to a type system location, annotates the user field and defines how data should be fetched.

### Execution Directives

Execution directives modify the behavior of an operation, field, or fragment during runtime execution. They can include or exclude fields or perform additional data processing before returning a response.

Executable directive locations in GraphQL include:

- QUERY
- MUTATION
- SUBSCRIPTION
- FIELD
- FRAGMENT_DEFINITION & FRAGMENT_SPREAD
- INLINE_FRAGMENT
- VARIABLE_DEFINITION

Both built-in and custom directives can be applied to executable locations. Most built-in directives are executable, such as @skip and @include, used to conditionally include or exclude fields in an operation.

### Example of @include Directive

The @include directive conditionally includes fields in a query operation:

```graphql
query me($showName: Boolean!) {
  me {
    id
    firstName @include(if: $showName)
    lastName @include(if: $showName)
    email
  }
}
```

The @include directive conditionally includes the firstName and lastName fields in the response. The if argument specifies a boolean value determining whether to include the field. The if argument is set to the variable $showName, allowing for conditional inclusion based on its value.

## Conclusion and Next Steps

GraphQL directives, though initially complex, are a powerful tool within the GraphQL ecosystem. This article explained built-in and custom directives and their application across type system and executable locations in GraphQL. Type system directives apply to GraphQL SDL, while executable directives modify GraphQL responses during runtime execution.

Understanding directives is crucial when working with GraphQL APIs, whether using tools like Tailcall GraphQL server or manually implementing.
