---
title: "@addField"
description: The @addField directive simplifies queries by adding a field that _inline_ or flattens a nested field or node within your schema.
slug: ../addField-directive
---

The `@addField` directive is defined as follows:

```graphql title="Directive Definition" showLineNumbers
directive @addField(
  """
  Name of the new field to be added
  """
  name: String!

  """
  Path of the data where the field should point to
  """
  path: [String!]
) repeatable on OBJECT
```

The `@addField` directive simplifies data structures and queries by adding a field that _inline_ or flattens a nested field or node within your schema. It modifies the schema and the data transformation process, making nested data more accessible and straightforward to present.

For instance, consider a schema:

```graphql showLineNumbers
schema {
  query: Query
}

type User
  @addField(name: "street", path: ["address", "street"]) {
  id: Int!
  name: String!
  username: String!
  email: String!
  phone: String
  website: String
  address: Address @modify(omit: true)
}

type Address {
  street: String!
  city: String!
  state: String!
}

type Query {
  user(id: Int!): User
    @http(
      url: "https://jsonplaceholder.typicode.com/users/{{.args.id}}"
    )
}
```

Suppose we focus on the `street` field in `Address`.

In this case, applying the `@addField` directive to the `User` type creates a `street` field within the `User` type. It uses a `path` argument to specify the sequence of fields from a declared field (`address`), leading to the `Address` field to add. We also can apply `@modify(omit: true)` to remove the `address` field from the schema, as the `street` field from `Address` is now directly accessible on the `User` type.

Post application, the schema becomes:

```graphql showLineNumbers
schema {
  query: Query
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
  phone: String
  website: String
  street: String
}

type Query {
  user(id: Int): Post!
}
```

In the above example, since we added a `@modify(omit: true)` on the `address` field, the schema no longer includes the `Address` type.

The `@addField` directive also take cares of nullablity of the fields. If any of the fields in the path is nullable, the resulting type will be nullable.

`@addField` also supports indexing, allowing for the specification of an array index for inline inclusion. For instance, if a field `posts` is of type `[Post]`, and the goal is to access the title of the first post, specify the path as [`"posts"`,`"0"`,`"title"`].

```graphql showLineNumbers
type User
  @addField(
    name: "firstPostTitle"
    path: ["posts", "0", "title"]
  ) {
  id: Int!
  name: String!
  username: String!
  email: String!
  phone: String
  website: String
  posts: Post
    @http(
      url: "https://jsonplaceholder.typicode.com/users/{{.value.id}}/posts"
    )
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
}
```

In conclusion, the `@addField` directive helps tidy up your schema and streamline data fetching by reducing query depth, promoting better performance and simplicity.
