---
title: "@protected"
---

Marks the type or the field and _protected_ i.e. to be able to access such data user request should contain valid authentication data. Read more about auth on fields [here](../guides/auth.md)

```graphql
type Query {
  protected: String! @protected
  protectedType: ProtectedType
}

type ProtectedType @protected {
  name: String!
  nested: String!
}
```

:::important

To be able to use `@protected` directive at least one of auth provider should be linked in config with [`@link` directive](./link.md) (`Htpasswd` or `Jwks`)

:::

## How it works

- If the field is marked as `@protected` then in case user requests such field additional validation check for authentication will be executed and based on the result the inner data will be resolved and sent as the response or authentication error will be generated
- If the type is marked as `@protected` then all of the fields of that type will be `@protected` and to access it user should be authorized
