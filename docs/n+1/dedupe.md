---
title: Deduplication
sidebar_position: 4
description: Learn how deduplication can help you optimize performance and reduce server requests using Tailcall. Discover how to eliminate duplicate requests and improve response times using practical solutions and step-by-step examples with the TailCall CLI for GraphQL applications.
---

If you run the query, at first you will observe a lot of duplicate requests are being made for getting the same author details. This happens because of the 100 posts, a lot them are authored by the same user and by default Tailcall will make a request for every user when requested. You can fix this by setting [dedupe](../directives/upstream.md#dedupe) to `true` in [upstream](../directives/upstream.md).

```graphql {4}
schema
  @upstream(
    baseURL: "http://jsonplaceholder.typicode.com"
    dedupe: true
  ) {
  query: Query
}

type Query {
  # ...
}

type Post {
  # ...
}

type User {
  # ...
}
```

When you enable `dedupe`, for each downstream request, Tailcall will automatically deduplicate all upstream requests and instead of making 100 it will only make 10 requests for unique users:

```text {6-16}
❯ tailcall start ./examples/jsonplaceholder.graphql
  INFO File read: ./examples/jsonplaceholder.graphql ... ok
  INFO N + 1 detected: 1
  INFO 🚀 Tailcall launched at [0.0.0.0:8000] over HTTP/1.1
  INFO 🌍 Playground: https://tailcall.run/playground/?u=http://127.0.0.1:8000/graphql
  INFO GET http://jsonplaceholder.typicode.com/posts HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/1 HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/2 HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/3 HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/4 HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/5 HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/6 HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/7 HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/8 HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/9 HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/10 HTTP/1.1
```

This is a massive 10x improvement over the previous implementation. However, it might not always be the case. For eg: If all the posts are created by different users you might still end up making 100 requests upstream.

:::tip
Dedupe has a slight performance overhead so if your use case doesn't have any N + 1 issues, it might be worth keeping this setting disabled.
:::
