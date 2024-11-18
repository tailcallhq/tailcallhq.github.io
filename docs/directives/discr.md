---
title: "@discriminate"
description: The `@discriminate` directive is used to change the default way Tailcall resolves the `__typename` property of GraphQL types.
slug: ../discriminate
---

The `@discriminate` directive is used to change the default way Tailcall resolves the `__typename` property of GraphQL types. When the directive is used we configure Tailcall to use the specified `field` for the `__typename` property.


## discriminate

```graphql
@discriminate(field: String!)
```

The `field` argument is required and should be a string, and specifies the field Tailcall will use of the `__typename` property.

### How It Works

When a field is annotated with the `@discriminate` directive, Tailcall uses the specified `field` argument to resolve the type of the value. This is done by checking the presence of the specified `field` in the returned value and verifying that it is a member of the Union or Interface type.

### Usage

Lets assume that we configure Tailcall in the following way:

```graphql
type Query {
  components: [Component!]! @discriminate(field: "type")
}

union Component = Cpu | Gpu

type Cpu {
  cores: Int!
}

type Gpu {
  shaders: Int!
}
```

When we request the following query:


```gql
{
  components {
    ... on Cpu {
      cores
    }
    ... on Gpu {
      shaders
    }
    __typename
  }
}
```

Given the following data:

```json
[
  {"type": "Cpu", "cores": 8},
  {"type": "Gpu", "shaders": 512}
]
```

We resolve to:

```json
[
  {"__typename": "Cpu", "cores": 8},
  {"__typename": "Gpu", "shaders": 512}
]
```

## Discrimination Overview

Discrimination in Tailcall is a mechanism to determine the type of an object in a GraphQL schema. It's used to resolve the `__typename` field of an object, which is essential for Union and Interface types. Tailcall has the following discrimination strategies: `KeyedDiscriminator` and `TypeFieldDiscriminator`. The `KeyedDiscriminator` is used by default but can be overwritten using the `@discriminate` directive.

## KeyedDiscriminator

A `KeyedDiscriminator` expects an object with one key representing the value type. For example, `{ "Foo": {...} }` would resolve to `"Foo"`. This discriminator is used when the type of an object can be determined by its keys.

Here's a step-by-step explanation of how `KeyedDiscriminator` works:

1. The `KeyedDiscriminator` is created with a `type_name` and a set of possible `types` (e.g., `["Foo", "Bar"]`).
2. When resolving the `__typename` field, the discriminator checks if the object has exactly one key.
3. If the object has more than one key, an error is returned.
4. If the object has no keys, an error is returned.
5. If the object has exactly one key, the discriminator checks if the key is in the set of possible `types`.
6. An error is returned if the key is not in the set of possible `types`.
7. If the key is in the set of possible `types`, the discriminator returns the key as the resolved `__typename`.

## TypeFieldDiscriminator

A `TypeFieldDiscriminator` expects an object with a specific field containing the value type. For example, `{ "type": "Buzz", "bar": "test" }` would resolve to `"Buzz"`. This discriminator is used when a type field is present in the JSON response.

Here's a step-by-step explanation of how `TypeFieldDiscriminator` works:

1. The `TypeFieldDiscriminator` is created with a `type_name`, a set of possible `types` (e.g., `["Foo", "Bar"]`), and a `field` (e.g., `"type"`).
2. When resolving the `__typename` field, the discriminator checks if the object has the specified `field`.
3. If the object does not have the `field`, an error is returned.
4. If the object has the `field`, the discriminator checks if the field's value is in the set of possible `types`.
5. An error is returned if the value is not in the set of possible `types`.
6. If the value is in the set of possible `types`, the discriminator returns the value as the resolved `__typename`.
