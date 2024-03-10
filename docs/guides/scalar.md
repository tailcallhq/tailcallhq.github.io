---
title: Custom Scalars
---

The GraphQL specification includes default scalar types Int, Float, String, Boolean, and ID. Although these scalars cover the majority of use cases, some applications need to support other atomic data types (such as Date) or add validation to an existing type.
Tailcall provides these predefined scalars, eliminating the need for you to do so.

Supported scalars:

| Scalar        | Description                                                                                  | Specification Link                                                                  |
| ------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `Int`         | Represents non-fractional signed whole numeric values. Integers can be as large as 2^31 - 1. | [GraphQL Spec](https://spec.graphql.org/June2018/#sec-Int)                          |
| `Float`       | Represents a signed double-precision floating-point value.                                   | [GraphQL Spec](https://spec.graphql.org/June2018/#sec-Float)                        |
| `String`      | Represnrs A UTF‐8 character sequence.                                                        | [GraphQL Spec](https://graphql.org/learn/schema/#scalar-String)                     |
| `Boolean`     | Represents `true` or `false`.                                                                | [GraphQL Spec](https://graphql.org/learn/schema/#scalar-Boolean)                    |
| `ID`          | Represents a unique identifier, often used to refetch an object or as the key for a cache.   | [GraphQL Spec](https://graphql.org/learn/schema/#scalar-ID)                         |
| `Email`       | Represents a an email address                                                                | [HTML Spec](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) |
| `PhoneNumber` | Represents a phone number                                                                    | [E.164](https://en.wikipedia.org/wiki/E.164)                                        |
| `Date`        | Represents a Date                                                                            | [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339)                           |
| `Url`         | Represents a URL                                                                             | [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt)                                    |
| `JSON`        | Represents a JSON Object                                                                     | [RFC 7159](https://datatracker.ietf.org/doc/html/rfc7159)                           |

## Example Usage

Let's try using these custom scalars in our GraphQL schema.

```graphql
schema @server(port: 8000, graphiql: true, hostname: "localhost") {
  query: Query
}

type Query {
  email(value: Email!): Email! @const(data: "{{args.value}}")
}
```

### Valid Query Example

Here is an example of a valid query that passes the custom scalar validations:
![Valid Query](/images/docs/valid.png)

### Invalid Query Example

And here is an example of an invalid query that fails the custom scalar validations as expected:
![Invalid Query](/images/docs/invalid.png)

:::tip
We recommend utilizing JSON as a scalar for cases where no other scalar type fits your needs. If this workaround does not address your requirements, consider opening an issue on the Tailcall GitHub repository.
:::
