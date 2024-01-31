### Field level caching configuration

Field level caching enables caching for any field or query
which contains a resolver.

```graphql
type Query {
    posts: [Post] @http(path: "/posts")
}

type Post {
    id: Int
    title: String
    user_id: Int @cache(maxAge: 100)
    user: User @http(path: "/user/{{user_id}}") @cache(maxAge: 200)
}

type User {
    id: Int
    name: String
    email: String
}
```

For the above config, the result of `user` field will be cached because it contains an http resolver. However, the output of `user_id` will not be cached because it doesn't have a resolver for itself, it's value is fetched by the resolver at the `posts` query.

```graphql
type Query {
    posts: [Post] @http(path: "/posts")
}

type Post @cache(maxAge: 100) {
    id: Int
    title: String
    user_id: Int
    user: User @http(path: "/user/{{user_id}}")
}

type User {
    id: Int
    name: String
    email: String
}
```

When the `cache` directive is applied to a type then it is inherited by each of the field of the type. Hence, the above config is equivalent to:

```graphql
type Query {
    posts: [Post] @http(path: "/posts")
}

type Post {
    id: Int @cache(maxAge: 100)
    title: String @cache(maxAge: 100)
    user_id: Int @cache(maxAge: 100)
    user: User @http(path: "/user/{{user_id}}") @cache(maxAge: 100)
}

type User {
    id: Int
    name: String
    email: String
}
```

The cache directive is applied to each field in the type `Post` but since the directive doesn't affect the field that do not have any resolver, hence, this is equivalent to the following

```graphql
type Query {
    posts: [Post] @http(path: "/posts")
}

type Post {
    id: Int
    title: String
    user_id: Int
    user: User @http(path: "/user/{{user_id}}") @cache(maxAge: 100)
}

type User {
    id: Int
    name: String
    email: String
}
```

In another example if the directive is applied to a type as well as the fields of the type then the one at the field will take precedence

```graphql
type Query {
    posts: [Post] @http(path: "/posts")
}

type Post @cache(maxAge: 200) {
    id: Int
    title: String
    user_id: Int
    user: User @http(path: "/user/{{user_id}}") @cache(maxAge: 100)
}

type User {
    id: Int
    name: String
    email: String
}
```

Hence, in the above config, the directive `@cache(maxAge: 200)` at type `Post` will be inherited by all the fields, however, since the field `user` already has a directive, it will not inherit the settings from the type. Hence, the config is equivalent to

```graphql
type Query {
    posts: [Post] @http(path: "/posts")
}

type Post {
    id: Int
    title: String
    user_id: Int
    user: User @http(path: "/user/{{user_id}}") @cache(maxAge: 100)
}

type User {
    id: Int
    name: String
    email: String
}
```

### Field level caching implementation

The way caching is implemented is that, it uses some information related to the query on which it is applied to, to generate a hash and then uses the hash as the key to the value that needs to be cached.

```graphql
type Query {
    posts: [Post] @http(path: "/posts")
}

type Post {
    id: Int
    title: String
    user_id: Int
    user: User @http(path: "/user/{{user_id}}") @cache(maxAge: 100)
}

type User {
    id: Int
    name: String
    email: String
}
```

For the config above, field `user` will be cached and the key will be the result of hashing the following values:
* String "Post"
* String "user"
* value of the field `Post.id`

If `Post` doesn't contain a field `id` or the value isn't present in the response, then the value will not be cached.