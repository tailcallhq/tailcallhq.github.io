---
title: Batch APIs
sidebar_position: 6
description: Discover how to Tailcall leverages batch APIs to optimize performance and reduce upstream requests in GraphQL applications.
---

![Batched API](../../static/images/docs/n+1-batch.png)

An effective technique to mitigate the N+1 problem is deduplicating similar requests, significantly reducing the number of server calls. We achieved it previously using the [dedupe](../directives/upstream.md#dedupe) setting. With Tailcall we can go one step further by giving hints about "batch APIs".

**Batch APIs:** Are special APIs that allow us to query multiple things at once. In our case we can pass multiple user Ids as query params, to the `/users` API to resolve many users at once:

:::tip
Try to hit [/users?id=1&id=2](https://jsonplaceholder.typicode.com/users?id=1&id=2)
:::

TailCall provides the capability to leverage _Batch APIs_. To utilize this feature, edit the `@http` directive on `Post.user` field in your GraphQL schema as follows:

```graphql {9-10}
type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  user: User
    @http(
      path: "/users"
      query: [{key: "id", value: "{{.value.userId}}"}]
      batchKey: ["id"]
    )
}
```

The described changes introduce two significant tweaks to the `@http` directive:

1. **Addition of a query parameter:**

   ```graphql {6}
   type Post {
     # ...
     user: User
       @http(
         path: "/users"
         query: [{key: "id", value: "{{.value.userId}}"}]
         batchKey: ["id"]
       )
   }
   ```

   This configuration generates a URL with the `userId` from the `Post` in the query params. For a batch of users, the CLI compiles a single URL, such as `/users?id=1&id=2&id=3...id=10`, consolidating the 10 requests into one.

1. **Addition of a batchKey:**
   ```graphql {7}
   type Post {
     # ...
     user: User
       @http(
         path: "/users"
         query: [{key: "id", value: "{{.value.userId}}"}]
         batchKey: ["id"]
       )
   }
   ```
   This parameter instructs the system to use the user's `id`, in the `User` type, as the unique identifier. This helps in differentiating between users received from the batch API.

Let's see what the server logs when you now start Tailcall with the updated configuration:

```graphql {21-22}
schema
  @server(port: 8000)
  @upstream(
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
}

type Query {
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  user: User
    @http(
      path: "/users"
      query: [{key: "id", value: "{{.value.userId}}"}]
      batchKey: ["id"]
    )
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
}
```

Let's start the server as usual and focus on the detected N + 1 issues:

```text {3,7}
❯ tailcall start ./examples/jsonplaceholder.graphql
  INFO File read: ./examples/jsonplaceholder.graphql ... ok
  INFO N + 1 detected: 0
  INFO 🚀 Tailcall launched at [0.0.0.0:8000] over HTTP/1.1
  INFO 🌍 Playground: https://tailcall.run/playground/?u=http://127.0.0.1:8000/graphql
  INFO GET http://jsonplaceholder.typicode.com/posts HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users?id=1&id=10&id=2&id=3&id=4&id=5&id=6&id=7&id=8&id=9 HTTP/1.1
```

As you can see there are ZERO N + 1 detected this time! It basically means that irrespective of how large the list of posts is there is a finite number of requests that will be issued in this case that's always going to be TWO. And this is how Tailcall users tackle the N + 1 problem in GraphQL.
