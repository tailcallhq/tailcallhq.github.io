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
