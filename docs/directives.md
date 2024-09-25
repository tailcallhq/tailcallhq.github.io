---
title: GraphQL Configuration
description: Enhance your GraphQL API with Tailcall DSL's custom directives. These directives offer powerful compile-time guarantees, ensuring robust and optimized API composition. Tailcall automates the generation of resolver logic for improved performance.
slug: tailcall-dsl-graphql-custom-directives
sidebar_label: Configuration
sidebar_position: 5
---

Tailcall DSL builds on your existing GraphQL knowledge by allowing the addition of some custom directives. These directives provide powerful compile time guarantees to ensure your API composition is tight and robust. Tailcall automatically generates highly optimized resolver logic for your types using the information in the directives.

Here is a list of all the custom directives supported by Tailcall:

<!-- SORT OPERATOR BY NAME -->

| Operator                                              | Description                                                                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`@addField`](/docs/directives/add-field-directive/)  | Simplifies data structures and queries by adding, inlining, or flattening fields or nodes within the schema. |
| [`@cache`](/docs/directives/cache-directive/)         | Enables caching for the query, field or type applied to.                                                     |
| [`@call`](/docs/directives/call-directive/)           | Invokes a query or mutation from another query or mutation field.                                            |
| [`@expr`](/docs/directives/expr-directive/)           | Allows embedding of a constant response within the schema.                                                   |
| [`@graphQL`](/docs/directives/graphql-directive/)     | Resolves a field or node by a GraphQL API.                                                                   |
| [`@grpc`](/docs/directives/grpc-directive/)           | Resolves a field or node by a gRPC API.                                                                      |
| [`@http`](/docs/directives/http-directive/)           | Resolves a field or node by a REST API.                                                                      |
| [`@link`](/docs/directives/link-directive/)           | Imports external resources such as config files, certs, protobufs, etc in the schema.                        |
| [`@modify`](/docs/directives/modify-directive/)       | Enables changes to attributes of fields or nodes in the schema.                                              |
| [`@omit`](/docs/directives/omit-directive/)           | Excludes fields or nodes from the generated schema, making them inaccessible through the GraphQL API.        |
| [`@rest`](/docs/directives/rest-directive/)           | Allows exposing REST endpoints on top of GraphQL.                                                            |
| [`@server`](/docs/directives/server-directive/)       | Provides server configurations for behavior tuning and tailcall optimization in specific use-cases.          |
| [`@telemetry`](/docs/directives/telemetry-directive/) | Integrates with open-telemetry to provide observability of the running tailcall service.                     |
| [`@upstream`](/docs/directives/upstream-directive/)   | Controls aspects of the upstream server connection, including timeouts and keep-alive settings.              |
