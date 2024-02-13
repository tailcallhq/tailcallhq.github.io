---
title: "@cache"
---

The **@cache** directive provides a protocol agnostic mechanism for caching the results of fields within a GraphQL schema. Like any other cache implementation this feature is useful for optimizing performance by reducing the need to repeatedly fetch data that doesn't change frequently.

## maxAge

```graphql
@cache(maxAge: Int)
```

This parameter is a non-zero unsigned integer that specifies the duration, in milliseconds, for which the cached value should be retained.

## Usage

Consider the following GraphQL schema example:

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int
  title: String
  userId: Int @cache(maxAge: 100)
  user: User @http(path: "/user/{{value.userId}}") @cache(maxAge: 200)
}

type User {
  id: Int
  name: String
  email: String
}
```

In this configuration, the result of the `user` field will be cached because it is associated with an HTTP resolver. However, the values of `userId` and `title` will not be cached as they do not have their own resolvers; their values are retrieved by the resolver at the `posts` field, which utilizes the `@http(path: "/posts")` directive.

Applying the `@cache` directive at the type level affects all fields within that type. For example:

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post @cache(maxAge: 100) {
  id: Int
  title: String
  userId: Int
  user: User @http(path: "/user/{{value.userId}}")
}

type User {
  id: Int
  name: String
  email: String
}
```

This configuration can be reduced as follows, demonstrating that the `@cache` directive, when applied to a type, is inherited by each field within that type:

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int @cache(maxAge: 100)
  title: String @cache(maxAge: 100)
  userId: Int @cache(maxAge: 100)
  user: User @http(path: "/user/{{value.userId}}") @cache(maxAge: 100)
}

type User {
  id: Int
  name: String
  email: String
}
```

However, since the `@cache` directive does not affect fields without resolvers, the effective configuration can be further reduced to follows:

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int
  title: String
  userId: Int
  user: User @http(path: "/user/{{value.userId}}") @cache(maxAge: 100)
}

type User {
  id: Int
  name: String
  email: String
}
```

When the `@cache` directive is applied both at the type level and on individual fields within that type, the field-level directive takes precedence:

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post @cache(maxAge: 200) {
  id: Int
  title: String
  userId: Int
  user: User @http(path: "/user/{{value.userId}}") @cache(maxAge: 100)
}

type User {
  id: Int
  name: String
  email: String
}
```

Thus, in the configuration above, while the `@cache(maxAge: 200)` directive at the type level is inherited by all fields, the `user` field's explicit `@cache(maxAge: 100)` directive takes precedence.

## Cache Key

The caching mechanism generates a hash based on information related to the applied query to serve as the cache key for the corresponding value.

For instance, the `user` field in the following configuration will be cached, with the cache key being the hash of the interpolated string `"/user/{{value.userId}}"`. For example, if `Post.userId` equals `1`, the cache key will be the hash of the string `"/users/1"`.
