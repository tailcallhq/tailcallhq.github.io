---
title: "@cache"
description: The @cache directive provides a protocol agnostic mechanism for caching the results of fields within a GraphQL schema.
slug: ../cache-directive
---

The `@cache` directive is defined as follows:

```graphql showLineNumbers title="Directive Definition"
directive @cache(
  """
  Duration in milliseconds for which the value should be cached
  """
  maxAge: Int!
) repeatable on FIELD_DEFINITION | OBJECT
```

The `@cache` directive provides a protocol agnostic mechanism for caching the results of fields within a GraphQL schema. Like any other cache implementation, this feature is useful for optimizing performance by reducing the need to fetch data that doesn't change frequently.

## maxAge

```graphql
@cache(maxAge: Int)
```

This parameter is a non-zero unsigned integer specifying the duration, in milliseconds, that retains the cached value.

## Usage

Consider the following GraphQL schema example:

```graphql
type Query {
  posts: [Post]
    @http(url: "https://jsonplaceholder.typicode.com/posts")
}

type Post {
  id: Int
  title: String
  userId: Int @cache(maxAge: 100)
  user: User
    @http(
      url: "https://jsonplaceholder.typicode.com/user/{{.value.userId}}"
    )
    @cache(maxAge: 200)
}

type User {
  id: Int
  name: String
  email: String
}
```

In this configuration, the system caches the result of the `user` field due to its association with an HTTP resolver. But it does not cache the values of `userId` and `title` because they lack individual resolvers; the resolver for the `posts` field retrieves their values, employing the `@http(url: "https://jsonplaceholder.typicode.com/posts")` directive.

Applying the `@cache` directive at the type level affects all fields within that type. For example:

```graphql
type Query {
  posts: [Post]
    @http(url: "https://jsonplaceholder.typicode.com/posts")
}

type Post @cache(maxAge: 100) {
  id: Int
  title: String
  userId: Int
  user: User
    @http(
      url: "https://jsonplaceholder.typicode.com/user/{{.value.userId}}"
    )
}

type User {
  id: Int
  name: String
  email: String
}
```

You can simplify this configuration to show that applying the `@cache` directive to a type means every field within that type inherits it:

```graphql
type Query {
  posts: [Post]
    @http(url: "https://jsonplaceholder.typicode.com/posts")
}

type Post {
  id: Int @cache(maxAge: 100)
  title: String @cache(maxAge: 100)
  userId: Int @cache(maxAge: 100)
  user: User
    @http(
      url: "https://jsonplaceholder.typicode.com/user/{{.value.userId}}"
    )
    @cache(maxAge: 100)
}

type User {
  id: Int
  name: String
  email: String
}
```

Since the `@cache` directive does not affect fields without resolvers, the effective configuration can be further reduced as follows:

```graphql
type Query {
  posts: [Post]
    @http(url: "https://jsonplaceholder.typicode.com/posts")
}

type Post {
  id: Int
  title: String
  userId: Int
  user: User
    @http(
      url: "https://jsonplaceholder.typicode.com/user/{{.value.userId}}"
    )
    @cache(maxAge: 100)
}

type User {
  id: Int
  name: String
  email: String
}
```

When applying the `@cache` directive both at the type level and on individual fields within that type, the field-level directive takes precedence:

```graphql
type Query {
  posts: [Post]
    @http(url: "https://jsonplaceholder.typicode.com/posts")
}

type Post @cache(maxAge: 200) {
  id: Int
  title: String
  userId: Int
  user: User
    @http(
      url: "https://jsonplaceholder.typicode.com/user/{{.value.userId}}"
    )
    @cache(maxAge: 100)
}

type User {
  id: Int
  name: String
  email: String
}
```

Thus, in the configuration above, while all fields inherit the `@cache(maxAge: 200)` directive at the type level, the `user` field's explicit `@cache(maxAge: 100)` directive takes precedence.

## Cache Key

The caching mechanism generates a hash based on information related to the applied query to serve as the cache key for the corresponding value.

For instance, the system caches the `user` field in the following configuration, using the hash of the interpolated string `"/user/{{.value.userId}}"` as the cache key. For example, if `Post.userId` equals `1`, the system generates the cache key by hashing the string `"/users/1"`.
