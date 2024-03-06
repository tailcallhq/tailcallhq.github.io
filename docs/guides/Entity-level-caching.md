# Entity-Level Caching with Tailcall
Tailcall allows caching responses at the entity level to improve performance and reduce load on upstream services. 
Here's how to implement entity caching with Tailcall:

## Enable Caching on Type
To cache a type, use the @cache directive on the type definition. This will cache all fields for the type:

```type User @cache(maxAge: 900) {
  id: Int
  name: String 
}
```

The maxAge specifies the maximum age of the cache in seconds.

## Enable Caching on Individual Fields
You can also enable caching on individual fields instead of the whole type:

```type User {
  id: Int
  name: String @cache(maxAge: 300) 
}
```

This caches just the name field for 300 seconds.

## Caching with Arguments
For fields with arguments, each unique combination of arguments will get its own cache entry:

```type Query {
  user(id: Int): User @cache(maxAge: 300)
}
```

This caches the user field separately for each id value.

## Cache Invalidation
The cache is automatically invalidated when the maxAge expires. You can also invalidate the cache manually by calling purge() on the cache instance:

```import { cache } from "@tailcall/graphql";

async function invalidateCache() {
  await cache.purge({
    type: "User", 
    id: { id: 10 }
  });
}
```

This purges the cache for the User with id 10.

## Caching Lists
Caching also works on lists of objects. The entire list is cached as one entry:

```type Query {
  users: [User] @cache(maxAge: 300)
}
```

## Summary
Use @cache on types or fields to enable caching
Set a maxAge for automatic expiration
Cache keys are based on field arguments
Purge cache manually as needed
Caching works on object lists
