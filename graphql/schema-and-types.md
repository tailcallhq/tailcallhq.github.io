---
title: "Understanding GraphQL Schemas and Types"
sidebar_label: Schema and Types
description: "This article will transform your understanding of GraphQL. Dive deep into GraphQL schemas, learning how to define, implement, and optimize them."
slug: schemas-and-types
image: /images/graphql/graphql-schema-structure.png
---

<head>
  <meta property="og:type" content="article"/>
  <title>Understanding GraphQL Schemas and Types</title>
</head>

We learned "What is GraphQL?" in the previous [article](/graphql/what-is-graphql.md).

Tailcall is The modern way to build GraphQL APIs. All you need to do is install Tailcall and use the [gen command](/docs/tailcall-graphql-cli#gen) to automatically generate the GraphQL API.

There are many processes happening behind the scenes that scaffold those APIs for you, such as defining the GraphQL schema, and creating resolvers for queries and mutations. This article will cover the basics of GraphQL schemas and types.

## What is GraphQL Schema?

In GraphQL, schemas act as a bridge between the client and the owner of the data, i.e., the Data Source. A schema defines a contract between the client and the server, providing a clear understanding of the data that can be queried. Upon receiving a query, the server validates the query against the GraphQL schema, then executes it and sends back the response in the requested shape.

In simple terms, a schema is a comprehensive description of the data that clients can query. It outlines the types of objects, the relationships between them, and the operations available for querying and mutating data. It is defined using the GraphQL Schema Definition Language (SDL), a human-readable syntax that describes the capabilities of the API.

## The Importance of Schemas in GraphQL

Schemas in GraphQL are vital because they:

- Specify the available data types.
- Define relationships between different data entities.
- Enforce data validation rules.
- Provide a clear contract between the server and the client.

## GraphQL Type System

As discussed above, GraphQL defines various types that we can utilize to build our schema. Here are the different available types.

1. [Scalar Type](#scalar-types)
2. [Object Type](#object-types)
3. [Input Types](#input-types)
4. [Enum Type](#enum-types)
5. [Interface and Union Types](#interface-and-union-types)
6. [Lists and Non-Null](#lists-and-non-null-types)

## Defining Types in GraphQL

### Scalar Types

Scalar types are primitive data types that resolve to a single value. Common scalar types in GraphQL include `Int`, `Float`, `String`, `Boolean`, and `ID`.

```graphql
type Post {
  id: ID!
  title: String!
  content: String!
}
```

### Object Types

Object types represent a collection of fields, each with a specific type. For example, a `User` object type might have fields like `id`, `name`, and `email` and their corresponding types.

```graphql
type User {
  id: ID!
  name: String!
  email: String!
}
```

### Input Types

Input types are used for complex mutations, allowing clients to pass structured objects as arguments.

```graphql
input PostInput {
  title: String!
  content: String!
  authorId: ID!
}
```

### Enum Types

Enumeration types restrict a field to a set of predefined values, enhancing type safety and validation.

```graphql
enum Role {
  ADMIN
  EDITOR
  USER
}
```

### Interface and Union Types

Interfaces and unions enable polymorphic queries by allowing fields to return different types under a common interface or union.

```graphql
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
}

type Post implements Node {
  id: ID!
  title: String!
}
```

### Lists and Non-Null Types

In defining your schema, you will utilize object, scalar, input, and enum types. GraphQL also offers modifiers that enable quick validations within type definitions and arguments of queries and mutations. The available modifiers include:

- **Exclamation Mark (`!`) for Non-Null**
- **Square Brackets (`[]`) for List**

## Relationships Between Types

GraphQL schema can represent relationships between types using references. For instance, a `User` can have multiple `posts`, and each `Post` can reference its `author`.

```graphql
type User {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}
```

## Schema, Query and Mutation Types

### Schema Type

Schema type is a special Object type which is the entry point for all GraphQL operations. It defines the queries, mutations, and subscriptions available in the schema.

```graphql
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
```

### Query Type

The query type defines the entry point for read operations in a GraphQL schema. It specifies what data clients can fetch.

```graphql
type Query {
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
  post(id: ID!): Post
}
```

### Mutation Type

The mutation type defines the entry point for write operations, allowing clients to modify data.

```graphql
type Mutation {
  createUser(name: String!, email: String!): User!
  createPost(input: PostInput!): Post!
}
```

## Subscriptions in GraphQL

Subscriptions allow clients to receive real-time updates when data changes. They are defined similarly to queries and mutations.

```graphql
type Subscription {
  postAdded: Post!
}
```

## Best Practices for Designing GraphQL Schemas

1. **Use Descriptive Naming Conventions**: Ensure that type and field names are intuitive and descriptive.
2. **Leverage Scalar and Enum Types**: Use scalar and enum types to enforce data validation.
3. **Design for Performance**: Minimize nested queries and optimize resolver functions.
4. **Modularize Schemas**: Break down large schemas into smaller, reusable modules.
5. **Documentation**: Annotate schemas with comments for better maintainability and clarity.

## Example Diagram: GraphQL Schema Structure

![GraphQL Schema Structure](../static/images/graphql/graphql-schema-structure.png)

## Conclusion

A robust and well-defined GraphQL schema is essential for building scalable and efficient APIs. By understanding the core concepts and best practices for defining schemas and types, developers can create powerful and flexible GraphQL servers that meet the needs of their clients.
