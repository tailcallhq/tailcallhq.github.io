---
title: "@modify"
---

The `@modify` directive in GraphQL provides the flexibility to alter the attributes of a field or a node within your GraphQL schema. Here's how you can use this directive:

## name

You can rename a field or a node in your GraphQL schema using the `name` argument in the `@modify` directive. This can be helpful when the field name in your underlying data source doesn't match the desired field name in your schema. For instance:

```graphql showLineNumbers
type User {
  id: Int! @modify(name: "userId")
}
```

`@modify(name: "userId")` informs GraphQL to present the field known as `id` in the underlying data source as `userId` in your schema.

## omit

You can exclude a field or a node from your GraphQL schema using the `omit` argument in the `@modify` directive. This can be useful if you want to keep certain data hidden from the client. For instance:

```graphql showLineNumbers
type User {
  id: Int! @modify(omit: true)
}
```

`@modify(omit: true)` instructs GraphQL to exclude the `id` field from the schema, making it inaccessible to the client.

:::tip
`@omit` is a standalone directive and is an alias/shorthand for `modify(omit: true)` checkout [documentation](/docs/directives/omit)
:::
