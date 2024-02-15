---
title: "@cache"
---

The **@cache** operator enables caching for the query, field, or type applied to. For eg:

```graphql
schema {
  query: Query
}

type Query {
  posts: [Post] @cache(maxAge: 3000)
  user(id: Int): User
}

type Post {
  title: String
  body: String
  user: User
}

type User @cache(maxAge: 4000) {
  id: Int
  name: String @cache(maxAge: 8000)
  age: Int
}
```

## maxAge

The parameter `maxAge` accepts a non-zero unsigned integer value, indicating the duration, in milliseconds, the system caches the value.

In the above example, the system caches the entire result of the `posts` query for 3000ms. Applying the **@cache** operator to a type acts as if applying it to each field individually. If one needs to cache a field within a type differently, applying this operator to that field separately will override the type-level settings, as shown above for the `name` field in the `User` type.

# How does the caching work?

Setting **@cache** for a query or a field causes the resolver to run once, storing the result in memory for `maxAge milliseconds before it expires. Once the cache expires, the resolver runs again to fetch and cache the latest value.
