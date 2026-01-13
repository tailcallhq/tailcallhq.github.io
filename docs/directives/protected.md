---
title: "@protected"
description: The @protected directive ensures that a user must be authenticated to access certain data.
slug: ../protected-directive
---

The `@protected` directive ensures that a user must be authenticated to access certain data.

```graphql title="Directive Definition" showLineNumbers
directive @protected(
  """
  Optional: A list of provider IDs that are required to access this field or type.
  If omitted, authentication will be required from all providers.
  To require access from specific providers, include multiple IDs.
  """
  id: [String!]
) on OBJECT | FIELD_DEFINITION
```

The `@protected` directive designates a type or field as protected, meaning that only authenticated users can access it.

## Prerequisites

To use the `@protected` directive, you must configure at least one authentication provider using the [`links`](../config/links.md) configuration, such as `Htpasswd` or `Jwks`.

```graphql title="Authentication Provider Configuration" showLineNumbers
schema
  @server
  @upstream
  @link(id: "basic", type: Htpasswd, src: ".htpasswd_a")
  @link(id: "jwt", type: Jwks, src: "jwks.json") {
  query: Query
}
```

## How It Works

The `@protected` directive adds an authentication check to the resolver execution chain, ensuring that users meet the specified authentication criteria.

### Key Features:

1. **Field-Level and Type-Level Protection**:

- The directive can be applied to both object types and individual fields. for example
  ```graphql
  type Cat @protected {
    meow: String
    purr: String
  }
  ```
  or
  ```graphql
  type Cat {
    meow: String @protected
    purr: String @protected
  }
  ```

2. **Authentication Providers (`id` Argument)**:

- The optional `id` argument specifies the authentication providers required to access the data.
- If multiple `id` values are provided, all listed providers are required to access the data.
- If no `id` is provided, all configured providers are required.

3. **Query Planning Optimization**:

- During query execution, the authentication requirements for all fields in a query are merged and moved to the top of the execution plan.
- This eliminates redundant authentication checks for each field, significantly improving performance.

## Behavior with Multiple `id` Values

When multiple `id` values are provided in the `@protected` directive, the system validates users against **all the specified providers**. For example:

```graphql
type Cat {
  meow: String @protected(id: ["a", "c"])
}
```

In this case:

- A user authenticated via provider `a` **and** provider `c` is required to access the `meow` field.

If no `id` argument is provided:

- The system allows access to users authenticated via **all configured providers**.

## Example Usage

Consider the following schema and authentication configuration:

### Schema

```graphql showLineNumbers
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
  bark: String @protected(id: ["a"])
}

type Cat {
  meow: String @protected(id: ["a", "c"])
}

type Bird {
  tweet: String @protected
}
```

### Authentication Files

#### `.htpasswd_a`

```text
testuser1:$apr1$e3dp9qh2$fFIfHU9bilvVZBl8TxKzL/
testuser2:$2y$10$wJ/mZDURcAOBIrswCAKFsO0Nk7BpHmWl/XuhF7lNm3gBAFH3ofsuu
```

#### `.htpasswd_b`

```text
testuser2:$2y$10$wJ/mZDURcAOBIrswCAKFsO0Nk7BpHmWl/XuhF7lNm3gBAFH3ofsuu
testuser3:{SHA}Y2fEjdGT1W6nsLqtJbGUVeUp9e4=
```

#### `.htpasswd_c`

```text
testuser1:$apr1$e3dp9qh2$fFIfHU9bilvVZBl8TxKzL/
testuser3:{SHA}Y2fEjdGT1W6nsLqtJbGUVeUp9e4=
```

### Scenarios

1. **Accessing `Dog.bark` Field**:

   - Authentication via provider `a` is required.
   - **Allowed Users**: `testuser1`, `testuser2`.

2. **Accessing `Cat.meow` Field**:

   - Authentication via providers `a` **and** `c` is required.
   - **Allowed Users**: `testuser1` (from `a` and `c`).

3. **Accessing `Bird.tweet` Field**:
   - Authentication via **all configured providers** is required.
   - **Allowed Users**: None, as no user is present in all providers.

## Type-Level vs Field-Level Protection

The `@protected` directive can be applied at both the type and field levels. Here’s how they interact and the advantages of using each:

### Type-Level Protection

Applying `@protected` at the type level ensures all fields within the type are protected. This reduces redundancy, as you don’t need to annotate each field individually.

### Field-Level Protection

If specific fields within a type require different authentication rules, you can apply `@protected` at the field level. Field-level rules are merged with type-level rules.

### Combined Use of Type and Field-Level Protection

When `@protected` is applied at both the type and field levels, the rules are **merged and moved to the top of the query execution plan**. This ensures authentication checks are performed efficiently without redundant processing.

For example:

```graphql showLineNumbers
type Pet @protected(id: ["a"]) {
  name: String
  age: Int
  breed: String @protected(id: ["c"])
}
```

#### Explanation:

1. **Type-Level Rule (`id: ["a"]`)**:

   - Protects all fields (`name`, `age`, and `breed`).
   - Requires authentication via provider `a`.

2. **Field-Level Rule (`breed` with `id: ["c"]`)**:

   - Adds provider `c` for the `breed` field.

3. **Merged Authentication Rule:**

   - For fields like `name` and `age`, authentication via provider `a` suffices.
   - For the `breed` field, authentication via both `a` and `c` is required.
