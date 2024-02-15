---
title: "@const"
---

The `@const` operators allows us to embed a constant response for the schema. For eg:

```graphql
schema {
  query: Query
}

type Query {
  user: User @const(data: {name: "John", age: 12})
}

type User {
  name: String
  age: Int
}
```

The const operator also checks the provided value at compile time to ensure it matches the field's schema. If not, the console displays a descriptive error message.
