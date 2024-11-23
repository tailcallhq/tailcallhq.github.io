---
title: "@discriminate"
description: The `@discriminate` directive is used to customize decoding of union types.
slug: ../discriminate
---

The `@discriminate` directive is defined as follows:

```graphql showLineNumbers title="Directive Definition"
directive @discriminate(
  """
  Name of the field that contains the type discriminator
  """
  name: String = "type"
) on FIELD_DEFINITION
```

By default a union type expects an object with a wrapper key representing the value type. For example say we have the following GraphQL schema:

```graphql showLineNumbers
type Query {
  fooBar: [FooBar]
    @http(url: "https://api.example.com/foobar")
}

union FooBar = Foo | Bar

type Foo {
  foo: String!
}

type Bar {
  bar: String!
}
```

The API is expected to respond with an object that is wrapped with a key representing the type of the value. For example for `Foo` the response should look like:

```json
[
  // API Response
  {"Foo": {"foo": "Hello"}},
  {"Bar": {"bar": "World"}}
]
```

:::note
The **key** is always case sensitive and should match the type name.
:::

This allows Tailcall to correctly decode the response and resolve with the exact variant of the union type. However its also a common practice to have a special field to specify the type. For example:

```json
[
  {"type": "Foo", "foo": "Hello"},
  {"type": "Boo", "bar": "World"}
]
```

This can be achieved by modifying the schema to leverage the `@discriminate` directive:

```graphql {4}
type Query {
  fooBar: FooBar
    @http(url: "https://api.example.com/foobar")
    @discriminate
}
```

The `@discriminate` directive is used to indicate explicitly that the union type should be resolved using a discriminator field.

The directive can be further customized by providing the discriminator field `name`:

```graphql {4}
type Query {
  fooBar: FooBar
    @http(url: "https://api.example.com/foobar")
    @discriminate(name: "ty")
}
```

In this case the API is expected to respond with an object that has a key `ty` representing the type of the value. For example for `Foo` the response should look like:

```json
{"ty": "Foo","foo": "Hello"}
{"ty": "Bar","bar": "World"}
```

:::note
The value of the discriminator field should match the type name in a case sensitive manner.
:::

Great! Congratulations on learning how to use the `@discriminate` directive to customize decoding of union types. Now you can confidently work with union types in your GraphQL schema. 🎉
