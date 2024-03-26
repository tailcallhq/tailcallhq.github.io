---
title: "@omit"
---

Within a GraphQL schema, the `@omit` directive excludes fields or nodes from the generated schema, making them inaccessible through the GraphQL API. This directive is useful for hiding sensitive information or simplifying your API by removing unnecessary fields.

## How it works

When applied to a field or node, the `@omit` directive instructs the Tailcall not to include that field or node in the schema. This means that clients cannot query or mutate data in those fields.

## Example

Consider a scenario where you have a `User` type with an embedded `Address` type. If you want to exclude the `Address` type from the schema to simplify the API, you can use the `@omit` directive:

```graphql showLineNumbers
type Address {
  city: String
  street: String
}

type User {
  name: String
  address: Address @omit
}
```

In this example, the `address` field will not be accessible or visible through the GraphQL API.

## Comparison with `modify`

The `@omit` directive and `@modify(omit: true)` essentially serve the same purpose in excluding fields from the schema, but they differ in syntax and flexibility. In fact, one can consider `@omit` as a shorthand or alias for the more verbose `@modify(omit: true)`.

- `@omit` offers a concise way to directly exclude a field or node without additional arguments.

- `@modify(omit: true)`, as part of the broader [`@modify`](/docs/directives/modify#omit) directive, provides more options, such as field renaming through the `name` argument. This makes it a more flexible choice when you need more than field exclusion.
