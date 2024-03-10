---
title: Custom Scalars
---

The GraphQL specification includes default scalar types Int, Float, String, Boolean, and ID. Although these scalars cover the majority of use cases, some applications need to support other atomic data types (such as Date) or add validation to an existing type.
Tailcall supports a set of predefined custom scalars to enhance the functionality and validation of your GraphQL APIs

Currently supported scalars:

- `Email`
- `PhoneNumber`
- `Date`
- `Url`

:::tip
If a scalar you need is not supported, please create an issue on the Tailcall GitHub repository. 
:::


## Example Usage
Let's try using these custom scalars in our GraphQL schema.

```graphql 
scalar Email
scalar PhoneNumber
scalar Date
scalar Url

schema @server(port: 8000, graphiql: true, hostname: "localhost") {
  query: Query
}

type Query {
  email(value: Email!): Email! @const(data: "{{args.value}}")
  phone(value: PhoneNumber!): PhoneNumber! @const(data: "{{args.value}}")
  date(value: Date!): Date! @const(data: "{{args.value}}")
  url(value: Url!): Url! @const(data: "{{args.value}}")
}
```

### Valid Query Example
Here is an example of a valid query that passes the custom scalar validations:
![Valid Query](/static/images/docs/valid.png)

### Invalid Query Example
And here is an example of an invalid query that fails the custom scalar validations as expected:
![Invalid Query](/static/images/docs/invalid.png)
