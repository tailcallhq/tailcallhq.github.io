---
title: "@protected"
description: The @protected directive ensures that a user must be authenticated to access certain data.
slug: ../protected-directive
---

The `@protected` directive is defined as follows:

```graphql title="Directive Definition" showLineNumbers
directive @protected(
  ids: [String!]
) on OBJECT | FIELD_DEFINITION
```

The `@protected` annotation designates a type or field as protected, meaning that a user must be authenticated to access that data.


:::important
To utilize the `@protected` directive, you must link at least one authentication provider in the configuration using the [`@link`](./link.md) directive (`Htpasswd` or `Jwks`).
:::

## How It Works

The directive works by adding an authentication check to the resolver execution chain. If multiple fields are protected, we merge the authentication requirements. The check is performed first, before the rest of the resolver chain is executed.

## providers

The `ids` argument is optional. By using this argument, you can specify which authentication providers are required to access the data. When present we check against all specified providers.

## Example

- The `Dog` type is protected by the `a` provider, so only users authenticated by `a` can access the `bark` field.
- The `Cat` type is protected by both the `a` and `c` providers, so only users authenticated by either `a` or `c` can access the `meow` field.
- The `Bird` type is protected by all providers, so only users authenticated by any provider can access the `tweet` field.

```graphql
schema
  @server
  @upstream
  @link(id: "a", src: ".htpasswd_a", type: Htpasswd)
  @link(id: "b", src: ".htpasswd_b", type: Htpasswd)
  @link(id: "c", src: ".htpasswd_c", type: Htpasswd) {
  query: Query
}

type Query {
  animals: [Animal!]!
    @expr(
      body: [
        {Dog: {bark: "woof"}}
        {Cat: {meow: "meow"}}
        {Bird: {tweet: "tweet"}}
      ]
    )
}

union Animal = Dog | Cat | Bird | Fish | Snake

type Dog {
  bark: String @protected(ids: ["a"])
}

type Cat {
  meow: String @protected(ids: ["a", "c"])
}

type Bird {
  tweet: String @protected
}
```

```text title=".htpasswd_a"
testuser1:$apr1$e3dp9qh2$fFIfHU9bilvVZBl8TxKzL/
testuser2:$2y$10$wJ/mZDURcAOBIrswCAKFsO0Nk7BpHmWl/XuhF7lNm3gBAFH3ofsuu
```

```text title=".htpasswd_b"
testuser2:$2y$10$wJ/mZDURcAOBIrswCAKFsO0Nk7BpHmWl/XuhF7lNm3gBAFH3ofsuu
testuser3:{SHA}Y2fEjdGT1W6nsLqtJbGUVeUp9e4=
```

```text title=".htpasswd_c"
testuser1:$apr1$e3dp9qh2$fFIfHU9bilvVZBl8TxKzL/
testuser3:{SHA}Y2fEjdGT1W6nsLqtJbGUVeUp9e4=
```
