---
title: Getting Started with Tailcall Directives
description: Enhance your GraphQL API with Tailcall custom directives. These directives offer powerful compile-time guarantees, ensuring robust and optimized API composition. Tailcall automates the generation of resolver logic for improved performance.
slug: tailcall-dsl-graphql-custom-directives
sidebar_label: Getting Started
sidebar_position: 5
---

Tailcall DSL builds on your existing GraphQL knowledge by allowing the addition of some custom directives. These directives provide powerful compile time guarantees to ensure your API composition is tight and robust. Behind the scenes, Tailcall automatically generates highly optimized resolver logic for your types using the information in the directives.

Here is a list of all the custom directives supported by Tailcall:

<!-- SORT OPERATOR BY NAME -->

| Operator                                        | Description                                                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`@addField`](./directives/addField.md)         | Simplifies data structures and queries by adding, inlining, or flattening fields or nodes within the schema. |
| [`@cache`](./directives/cache.md)               | Enables caching for the query, field or type applied to.                                                     |
| [`@call`](./directives/call.md)                 | Invokes a query or mutation from another query or mutation field.                                            |
| [`@discriminate`](./directives/discriminate.md) | Allows to customize the discriminator while working with union types.                                        |
| [`@expr`](./directives/expr.md)                 | Allows embedding of a constant response within the schema.                                                   |
| [`@graphQL`](./directives/graphQL.md)           | Resolves a field or node by a GraphQL API.                                                                   |
| [`@grpc`](./directives/grpc.md)                 | Resolves a field or node by a gRPC API.                                                                      |
| [`@http`](./directives/http.md)                 | Resolves a field or node by a REST API.                                                                      |
| [`@link`](./directives/link.md)                 | Imports external resources such as config files, certs, protobufs, etc in the schema.                        |
| [`@modify`](./directives/modify.md)             | Enables changes to attributes of fields or nodes in the schema.                                              |
| [`@omit`](./directives/omit.md)                 | Excludes fields or nodes from the generated schema, making them inaccessible through the GraphQL API.        |
| [`@protected`](./directives/protected.md)       | Adds authentication and authorization controls to fields or nodes in the schema.                             |
| [`@rest`](./directives/rest.md)                 | Allows exposing REST endpoints on top of GraphQL.                                                            |
| [`@server`](./directives/server.md)             | Provides server configurations for behavior tuning and tailcall optimization in specific use-cases.          |
| [`@telemetry`](./directives/telemetry.md)       | Integrates with open-telemetry to provide observability of the running tailcall service.                     |
| [`@upstream`](./directives/upstream.md)         | Controls aspects of the upstream server connection, including timeouts and keep-alive settings.              |

## Combining directives on fields

Directives can be combined together on the same field:
- If it's a standalone directive that changes how the field works, this directive can be defined in any order with other directives
- If the directive is a resolvable directive (`@call`, `@expr`, `@graphQL`, `@grpc`, `@http`), i.e., a directive that resolves actual data, then the order of definition in the schema is important. The result data for the field will be the combined output from the ordered list of every resolvable directive's output, achieved by deep merging all the partial results.

Example of combining resolvable directives together:

```graphql
type Query {
  data: Data
    # this request resolves `{ "foo": "..." }` part
    @http(url: "http://api.com/foo")
    # this request resolves `{ "bar": "..." } part
    # after making the requests we combine it into single `Data` content
    @http(url: "http://api.com/bar")

  dataList: [Data]
    # this request resolves 3 entries of data [.., .., ..]
    @http(url: "http://api.com/list/foo")
    # this request resolves 2 entries of data [.., ..]
    # after making the requests we combine it into single list
    # with 5 entries
    @http(url: "http://api.com/list/bar")
}

type Data {
    foo: String
    bar: String
}
```
