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
| [`@modify`](./directives/modify.md)             | Enables changes to attributes of fields or nodes in the schema.                                              |
| [`@omit`](./directives/omit.md)                 | Excludes fields or nodes from the generated schema, making them inaccessible through the GraphQL API.        |
| [`@protected`](./directives/protected.md)       | Adds authentication and authorization controls to fields or nodes in the schema.                             |
| [`@rest`](./directives/rest.md)                 | Allows exposing REST endpoints on top of GraphQL.                                                            |

### Resolvable Directives

Resolvable directives are used to fetch actual data from external sources. These include the following directives: `@call`, `@expr`, `@graphQL`, `@grpc`, and `@http`.

### Combining Resolvable Directives on Fields

When multiple resolvable directives (such as `@call`, `@expr`, `@graphQL`, `@grpc`, or `@http`) are applied to a field, the **order in which they are defined in the schema is important**. Each directive contributes a part of the final result, and the outputs are combined by performing a deep merge of all partial results.

#### Example: Combining Resolvable Directives

```graphql
type Query {
  data: Data
    # This request resolves the `{ "foo": "..." }` part of the response
    @http(url: "http://api.com/foo")
    # This request resolves the `{ "bar": "..." }` part of the response
    # After executing both requests, the results are merged into a single `Data` object
    @http(url: "http://api.com/bar")

  dataList: [Data]
    # This request resolves 3 entries of data: `[.., .., ..]`
    @http(url: "http://api.com/list/foo")
    # This request resolves 2 entries of data: `[.., ..]`
    # After executing both requests, the results are merged into a single list
    # containing 5 entries
    @http(url: "http://api.com/list/bar")
}

type Data {
  foo: String
  bar: String
}
```

### Key Points

1. **Order Matters**: The schema's order of directives determines how partial results are combined.
2. **Deep Merge**: Partial outputs from each directive are deep-merged to produce the final result.
3. **Versatility**: Resolvable directives can fetch data from various sources, making them powerful tools for flexible schema design.
