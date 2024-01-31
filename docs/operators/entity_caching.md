### Entity caching configuration

Entity caching allows a type to be cached for every query or field which returns that type.

```graphql
type Query {
    posts: [Post] @http(path: "/posts")
    postsByUserId(user_id: Int): [Post] @http(path: "/postsByUserId/{{args.user_id}}")
    postById(id: Int): Post @http(path: "/post/{{args.id}}")
}

type Post @cache(maxAge: 100) {
    id: Int
    title: String
    user_id: Int
}
```

In the above config, since the directive is applied to the type `Post` it will be cached for all the queries which returns `Post` or `[Post]`

### Entity caching implementation

The way Entity caching works is that it will check the output type of every query or field which contains a resolver, and if the output type of that field or query contains the `cache` directive, then it will check for the value in the cache. If the value isn't found, it will evaluate the resolver expression and save the output in the cache. The key for the cache is calculated using the following data:
* name of the type e.g. String "Post" in the above example
* name of the field or the query which 