---
title: N + 1 in Tailcall
sidebar_position: 3
description: Discover how to efficiently address the N+1 problem in using Tailcall with our comprehensive guide. Learn to reduce server requests and optimize performance using practical solutions and step-by-step examples with the TailCall CLI for GraphQL applications. Enhance your coding practices and ensure scalable, high-performance web applications by mastering techniques to mitigate the N+1 problem, reduce server load, and improve response times.
---

Before diving into solutions, let's observe the N+1 problem in the following Tailcall configuration:

```graphql
schema
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
  user: User @http(path: "/users/{{.value.userId}}")
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
}
```

This configuration sets up a GraphQL schema for a Tailcall server utilizing [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/) as its data source. It allows direct querying of posts and, for each post, retrieves the associated author information. Similar to our curl requests above, when we query for posts and their authors we end up issuing multiple user calls upstream:

Let's examine the CLI output for this configuration with Tailcall's `start` command:

```text {6-9}
❯ tailcall start ./examples/jsonplaceholder.graphql
  INFO File read: ./examples/jsonplaceholder.graphql ... ok
  INFO N + 1 detected: 1
  INFO 🚀 Tailcall launched at [0.0.0.0:8000] over HTTP/1.1
  INFO 🌍 Playground: https://tailcall.run/playground/?u=http://127.0.0.1:8000/graphql
  INFO GET http://jsonplaceholder.typicode.com/posts HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/8 HTTP/1.1
  ...
  INFO GET http://jsonplaceholder.typicode.com/users/8 HTTP/1.1
  INFO GET http://jsonplaceholder.typicode.com/users/10 HTTP/1.1
```

Tailcall logs a sequence of requests made to fetch posts and then their individual authors, highlighting the N+1 problem in real-time. Since there are 100 posts, so 100 requests are made to fetch the authors.
