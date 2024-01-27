---
title: "@file"
---

This **@file** operator serves as an indication of a field or node that is underpinned by a local file. For Example:

```graphql showLineNumbers
type Query {
  users: [User] @file(src: "users.json")
}
```

In this example, the `@file` operator is added to the `users` field of the `Query` type. This means that the `users` field is underpinned by a local file. The [src](#src) argument is used to specify the path of the file. In this case, the path is `users.json`. This means that the GraphQL server will read and parse the file at `<working directory>/users.json` on startup, cache it indefinitely, and serve it back when `users` is queried.

## src

This refers to the path of the file that the GraphQL server should read. For instance `users.yml`. The base path is always the current working directory, i.e. the directory where you run `tailcall`.

```graphql showLineNumbers
type Query {
  users: [User] @file(src: "users.yml")
}
```

The file format is determined based on the file extension. The following file formats are supported:
 - JSON (`*.json`)
 - YAML (`*.yml`, `*.yaml`)
