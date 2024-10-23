---
title: Discriminating Types and determining `__typename` in Tailcall
description: How Tailcall determines the `__typename` of Union or Interface types through different Discrimination Strategies.
slug: tailcall-type-discrimination
sidebar_label: Type Discrimination
---

<head>
<meta property="og:type" content="article"/>
  <title>Discriminating Types and determining `__typename` in Tailcall</title>
</head>

## Overview

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

## Directive

The `@discriminate` directive is used to overwrite the default discriminator and use `TypeFieldDiscriminator` with the specified `field` argument. The `field` argument is optional and specifies the field for discrimination. If no `field` argument is provided, the default field name is `"type"`.

## Examples

### Union

#### KeyedDiscriminator

**GraphQL Schema**

```graphql
type Query {
  foo: Foo @http(...)
}

union Foo = Fizz | Buzz

type Fizz {
  spam: String!
}

type Buzz {
  eggs: Int!
}
```

**GraphQL Query**

```graphql
query {
  foo: {
    __typename
    ... on Fizz {
      spam
    }
    ... on Buzz {
      eggs
    }
  }
}
```

**JSON Object**

```json
{
  "Fizz": {
    "spam": "FooBar"
  }
}
```

**JSON Response**

```json
{
  "data": {
    "foo": {
      "__typename": "Fizz",
      "spam": "FooBar"
    }
  }
}
```

#### TypeFieldDiscriminator

**GraphQL Schema**

```graphql
type Query {
  foo: Foo @http(...) @discriminate(field: "object_type")
}

union Foo = Fizz | Buzz

type Fizz {
  spam: String!
}

type Buzz {
  eggs: Int!
}
```

**GraphQL Query**

```graphql
query {
  foo: {
    __typename
    ... on Fizz {
      spam
    }
    ... on Buzz {
      eggs
    }
  }
}
```

**JSON Object**

```json
{
  "object_type": "Fizz",
  "spam": "FooBar"
}
```

**JSON Response**

```json
{
  "data": {
    "foo": {
      "__typename": "Fizz",
      "spam": "FooBar"
    }
  }
}
```

### Interface

#### KeyedDiscriminator

**GraphQL Schema**

```graphql
type Query {
  foo: Foo @http(...)
}

interface Foo {
  foo: String!
}

type Fizz implements Foo {
  foo: Sting!
  spam: String!
}

type Buzz implements Foo {
  foo: Sting!
  eggs: Int!
}
```

**GraphQL Query**

```graphql
query {
  foo: {
    __typename
    foo
    ... on Fizz {
      spam
    }
    ... on Buzz {
      eggs
    }
  }
}
```

**JSON Object**

```json
{
  "Fizz": {
    "foo": "bar",
    "spam": "FooBar"
  }
}
```

**JSON Response**

```json
{
  "data": {
    "foo": {
      "__typename": "Fizz",
      "foo": "bar",
      "spam": "FooBar"
    }
  }
}
```

#### TypeFieldDiscriminator

**GraphQL Schema**

```graphql
type Query {
  foo: Foo @http(...) @discriminate
}

interface Foo {
  foo: String!
}

type Fizz implements Foo {
  foo: Sting!
  spam: String!
}

type Buzz implements Foo {
  foo: Sting!
  eggs: Int!
}
```

**GraphQL Query**

```graphql
query {
  foo: {
    __typename
    foo
    ... on Fizz {
      spam
    }
    ... on Buzz {
      eggs
    }
  }
}
```

**JSON Object**

```json
{
  "type": "Fizz",
  "foo": "bar",
  "spam": "FooBar"
}
```

**JSON Response**

```json
{
  "data": {
    "foo": {
      "__typename": "Fizz",
      "foo": "bar",
      "spam": "FooBar"
    }
  }
}
```
