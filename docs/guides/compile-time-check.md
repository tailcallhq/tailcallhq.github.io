---
title: N + 1 Checks
sidebar_position: 5
description: Learn how to perform compile-time validations to detect N + 1 problems even before the GraphQL server starts.
---

Before we get into the actual solution, if you observe closely the above logs Tailcall identified that there was one N + 1 issue, even before the requests were made:

```text {3}
❯ tailcall start ./examples/jsonplaceholder.graphql
  INFO File read: ./examples/jsonplaceholder.graphql ... ok
  INFO N + 1 detected: 1
  INFO 🚀 Tailcall launched at [0.0.0.0:8000] over HTTP/1.1
  INFO 🌍 Playground: https://tailcall.run/playground/?u=http://127.0.0.1:8000/graphql
  INFO GET http://jsonplaceholder.typicode.com/posts HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/8 HTTP/1.1
  ...
  INFO GET http://jsonplaceholder.typicode.com/users/10 HTTP/1.1
```

To get a deeper understanding of what this N + 1 issue is, we can use the [--n-plus-one-queries](../guides/cli.md#--n-plus-one-queries) parameter with the `check` command:

```text {4,5}
❯ tailcall check ./jsonplaceholder.graphql --n-plus-one-queries
  INFO File read: ./examples/jsonplaceholder.graphql ... ok
  INFO Config ./examples/jsonplaceholder.graphql ... ok
  INFO N + 1 detected: 1
  query { posts { user } }
```

Incredible, isn't it? Tailcall has discovered that querying for posts followed by their users would result in N + 1 upstream calls. This represents a significant productivity gain, as you can now identify all such N + 1 issues upfront without resorting to complex profiling, tracing, or other runtime techniques. The `check` command also identifies the minimal query that could lead to these N + 1 problems by performing semantic analysis of your configuration. With these powerful tools handy you can go about making extremely efficient GraphQL backends as we will see next:
