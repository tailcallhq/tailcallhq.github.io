---
title: "Using GraphQL Variables for Type-Safe Queries"
sidebar_label: "Variables"
description: "Discover how to utilize GraphQL variables effectively for type-safe queries. Learn best practices and examples to enhance your application's performance and reliability."
slug: graphql-variables
---

## What Are GraphQL Variables?

GraphQL variables are similar to variables in any other programming language. They store values that you can access using their names. These variables are used to pass data from your application to your GraphQL [queries](queries.md) and [mutations](mutations.md). For instance, take a look at this example where a GraphQL query uses a variable to fetch data:

```graphql
query GetUserByName($name: String!) {
  user(name: $name) {
    name
    email
    age
  }
}
```

In this query, the `$name` variable in the query helps find a user by its name. You can easily spot GraphQL variables because they always start with a dollar sign ($). Here’s how a response might look:

```json
{
  "data": {
    "user": {
      "name": "John",
      "email": "john@example.com",
      "age": 10
    }
  }
}
```

## Defining and Using Variables in GraphQL Queries

GraphQL variables are defined separately from the query string itself. When you run the query, these variables are inserted into it, and the API responds with matching results. Here’s how you define a query and its variables in a JSON object for HTTP requests:

```json
{
  "query": "query GetUserByName($name: String!) { user(name: $name) { name email age } }",
  "variables": {
    "name": "John"
  }
}
```

Separating the query from the variables makes it easy to write reusable queries. When making requests, you send the query and variables as separate objects.

## Default Values for GraphQL Variables

You can set default values for variables, which allows queries to run even without input. Here’s how you do it:

```graphql
query GetUserByName($name: String = "Jack") {
  user(name: $name) {
    name
    email
    age
  }
}
```

In this example, if no value is provided for `$name`, the query uses "Jack" as the default.

## Using Variables in GraphQL Mutations

GraphQL mutations can create, update, or delete data on the server. Variables work the same way in mutations as they do in queries.

### Example:

```graphql
mutation UpdateUserName($id: ID!, $new_name: String!) {
  updateUserName(id: $id, name: $new_name) {
    id
    name
    email
    age
  }
}
```

### Passing Variables:

```json
{
  "id": "1",
  "new_name": "Johnny"
}
```

### Using JavaScript to Make a GraphQL Request:

```javascript
const query = `
  query GetUserByName($name: String!) {
    user(name: $name) {
      name
      email
      age
    }
  }
`

const variables = {name: "John"}

fetch("https://YOUR_GRAPHQL_SERVER_URL", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({query, variables}),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
```

Replace `YOUR_GRAPHQL_SERVER_URL` with your GraphQL Server url.

## GraphQL Variable Types and Type Safety

GraphQL variables come with types to ensure type safety. For example, `String!` indicates that the variable must be a string GraphQL type and is required. If you pass a different type, an error occurs, and the query won’t run. This type safety prevents unexpected inputs and results, ensuring your application runs smoothly.

GraphQL has several built-in types: `String`, `Int`, `Float`, `Boolean`, and `ID`. These types form the foundation for [input object types](schema-and-types.md#input-types). You can also define custom input types to model your data.

## Building Apps with GraphQL

TailCall’s CLI tool can generate GraphQL configurations from various sources, such as protobuf files and REST endpoints. This tool simplifies the process of creating GraphQL configurations, enabling you to build powerful applications with ease. To know more about the `gen` command in the TailCall CLI, check out the [documentation](/docs/tailcall-graphql-cli#gen).

## Conclusion

GraphQL variables and type safety ensure consistent data across your applications. By leveraging these features, you can build flexible, reliable, and scalable applications. TailCall’s CLI tool simplifies the process of generating GraphQL configurations, enabling you to create powerful applications with ease. To learn more about building apps with GraphQL, explore the [TailCall documentation](/docs).
