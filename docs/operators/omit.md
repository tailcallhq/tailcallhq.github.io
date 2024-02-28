---
title: "@omit"
---

Within a GraphQL schema, the **@omit** operator excludes fields or nodes from the generated schema, making them inaccessible through the GraphQL API. This operator is useful for hiding sensitive information or simplifying your API by removing unnecessary fields.

## How it works

When applied to a field or node, the **@omit** operator instructs the Tailcall not to include that field or node in the schema. This means that clients cannot query or mutate data in those fields.

## Example

Consider a scenario where you have a `User` type with an embedded `Address` type. If you want to exclude the `Address` type from the schema to simplify the API, you can use the **@omit** operator:


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

## Comparison with @modify(omit: true)

While both **@omit** and `@modify(omit: true)` achieve similar outcomes by excluding fields from the schema, their usage occurs in slightly different contexts:

- **@omit** is a standalone operator that directly applies to the field or node you wish to exclude.
- `@modify(omit: true)` is part of the **@modify** operator, which offers additional functionalities such as renaming fields (`name` argument). It's more versatile but requires specifying the `omit` argument explicitly.

For instance, to exclude a field using **@modify**, you would write:

```graphql showLineNumbers
type User {
  address: Address @modify(omit: true)
}
```


## Links

- For more details on the **@modify** operator and its capabilities, including omitting fields, see the [@modify documentation](/docs/operators/modify#omit).
