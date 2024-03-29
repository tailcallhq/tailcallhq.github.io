---
title: "@protected"
description: "The `@protected` annotation in GraphQL secures your data by requiring user authentication for access. Learn how to use `@protected` to safeguard fields and types, ensuring that authenticated users can retrieve sensitive information. Our guide also covers the necessary configuration steps, including linking an authentication provider using the `@link` directive. Perfect for developers implementing secure access controls in their GraphQL applications."
---

The `@protected` annotation designates a type or field as protected, meaning that a user must be authenticated to access that data.

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
To utilize the `@protected` directive, you must link at least one authentication provider in the configuration using the [`@link`](./link.md) directive (`Htpasswd` or `Jwks`).
:::

## How It Works

- When a field is annotated with `@protected`, an authentication check is performed upon receiving the request. Depending on the authentication result, either the requested data is provided in the response, or an authentication error is returned.
- If a type is annotated with `@protected`, all fields within that type inherit the protection, requiring user authentication for any field that's queried.
