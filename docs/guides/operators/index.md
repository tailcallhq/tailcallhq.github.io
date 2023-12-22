---
title: "Operators"
sidebar_position: 1
---

Tailcall DSL builds on your existing GraphQL knowledge by allowing the addition of some custom operators. These operators provide powerful compile time guarantees to make sure your API composition is tight and robust. The operator information is used to automatically generate highly optimized resolver logic for your types.

Here is a list of all the custom operators supported by Tailcall:

- [@server](server.md) The `@server` directive, when applied at the schema level, offers a comprehensive set of server configurations. It dictates how the server behaves and helps tune tailcall for various use-cases.
- [@upstream](upstream.md) The `upstream` directive allows you to control various aspects of the upstream server connection. This includes settings like connection timeouts, keep-alive intervals, and more. If not specified, default values are used.
- [@http](http.md) The `@http` operator indicates that a field or node is backed by a REST API.
- [@modify](modify.md) The `@modify` operator in GraphQL allows you to change field or node attributes in your schema.
- [@addField](add-field.md) The @addField operator simplifies data structures and queries by adding a field that inlines or flattens a nested field or node within your schema.
- [@const](const.md) The `@const` operators allows us to embed a constant response for the schema.
