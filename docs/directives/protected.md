---
title: Enforcing Authentication with Protected Directive
description: The @protected directive restricts access to specific fields or types in your GraphQL schema, ensuring that only authenticated users can retrieve sensitive data.
slug: protected-directive
sidebar_label: Protected Fields
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
To utilize the `@protected` directive, you must link at least one authentication provider in the configuration using the [`@link`](/docs/directives/link.md) directive (`Htpasswd` or `Jwks`).
:::

### How It Works

- When a field is annotated with `@protected`, an authentication check is performed upon receiving the request. Depending on the authentication result, either the requested data is provided in the response, or an authentication error is returned.
- If a type is annotated with `@protected`, all fields within that type inherit the protection, requiring user authentication for any field that's queried.
