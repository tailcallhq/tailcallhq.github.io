---
title: Operators
---

Tailcall DSL builds on your existing GraphQL knowledge by allowing the addition of some custom operators, termed 'Operators'. These operators provide powerful compile time guarantees to make sure your API composition is tight and robust. It also automatically generates highly optimized resolver logic for your types.

## @server

The **@server** operator is utilized to define critical server configurations for your GraphQL application. For example:

```graphql showLineNumbers
schema
  @server(baseURL: "https://jsonplaceholder.typicode.com", vars: {foo: "bar"}) {
  query: Query
  mutation: Mutation
}
```

In this example, the `@server` operator is added to the GraphQL `schema` definition.

1. `baseURL`: We've set "https://jsonplaceholder.typicode.com" as our `baseURL`. This means that all API calls made by our GraphQL server defined by [@http](#http) will start with this URL.

2. `vars`: We've passed in a vars object with a key of `foo` and a value of `bar`. This represents a local variable that could be used by the GraphQL server during its operations.

## @http

This **@http** operator serves as an indication of a field or node that is underpinned by a REST API. For Example:

```graphql showLineNumbers
type Query {
  user(id: ID!): User @http(path: "/users")
}
```

In this example, the `@http` operator is added to the `user` field of the `Query` type. This means that the `user` field is underpinned by a REST API. The [path](#path) argument is used to specify the path of the REST API. In this case, the path is `/users`. This means that the GraphQL server will make a GET request to `https://jsonplaceholder.typicode.com/users` when the `user` field is queried.

### baseURL

This refers to the base URL of the API. If not specified, the default base URL is the one specified in the [@server](#server) operator.

```graphql showLineNumbers
type Query {
  user(id: ID!): User
    @http(path: "/users", baseURL: "https://jsonplaceholder.typicode.com")
}
```

### path

This refers to the API endpoint you're going to call. For instance https://jsonplaceholder.typicode.com/users`.

```graphql showLineNumbers
type Query {
  user(id: ID!): User @http(path: "/users")
}
```

If your API endpoint contains dynamic segments, you can use Mustache templates to substitute variables. For example, to fetch a specific user, the path can be written as `/users/{{args.id}}`.

```graphql showLineNumbers
type Query {
  user(id: ID!): User @http(path: "/users/{{args.id}}")
}
```

### method

This refers to the HTTP method of the API call. Commonly used methods include GET, POST, PUT, DELETE, etc. If not specified, the default method is GET. For example:

```graphql showLineNumbers
type Mutation {
  createUser(input: UserInput!): User @http(method: "POST", path: "/users")
}
```

### query

This represents the query parameters of your API call. You can pass it as a static object or use Mustache template for dynamic parameters. These parameters will be added to the URL. For example:

```graphql showLineNumbers
type Query {
  userPosts(id: ID!): [Post]
    @http(path: "/posts", query: {userId: "{{args.id}}"})
}
```

### body

The body of the API call. It's used for methods like POST or PUT that send data to the server. You can pass it as a static object or use a Mustache template to substitute variables from the GraphQL variables. For example:

```graphql showLineNumbers
type Mutation {
  createUser(input: UserInput!): User
    @http(method: "POST", path: "/users", body: "{{args.input}}")
}
```

In the example above, the `createUser` mutation sends a POST request to `/users`, with the input object converted to JSON and included in the request body.

## @modify

The `@modify` operator in GraphQL provides the flexibility to alter the attributes of a field or a node within your GraphQL schema. Here's how you can use this operator:

### name

You can rename a field or a node in your GraphQL schema using the `name` argument in the `@modify` operator. This can be helpful when the field name in your underlying data source doesn't match the desired field name in your schema. For instance:

```graphql showLineNumbers
type User {
  id: Int! @modify(name: "userId")
}
```

`@modify(name: "userId")` tells GraphQL that although the field is referred to as `id`in the underlying data source, it should be presented as `userId` in your schema.

### omit

You can exclude a field or a node from your GraphQL schema using the `omit` argument in the `@modify` operator. This can be useful if you want to keep certain data hidden from the client. For instance:

```graphql showLineNumbers
type User {
  id: Int! @modify(omit: true)
}
```

`@modify(omit: true)` tells GraphQL that the `id` field should not be included in the schema, thus it won't be accessible to the client.

## @inline

The `@inline` operator simplifies data structures and fetch processes by 'inlining' or flattening a field or node within your schema. It works by modifying the schema and the data transformation process, essentially streamlining how nested data is accessed and presented.

For instance, consider a schema:

```graphql showLineNumbers
schema {
  query: Query
}

type Post {
  id: Int!
  user: User!
}

type User {
  id: Int!
  name: String!
  email: String!
  address: Address!
}

type Address {
  street: String!
  city: String!
  state: String!
}

type Query {
  postUserStreet(id: Int): Post! @inline(path: ["user", "address", "street"])
}
```

The `@inline` operator, in this case, is applied to the `postUserStreet` field of the `Query` type. It includes a `path` argument, indicating the chain of fields to be traversed from `Post` to the field to be inlined.

Post application, the schema becomes:

```graphql showLineNumbers
schema {
  query: Query
}

type Query {
  postUserStreet(id: Int): String
}
```

As seen, the `Post`, `User`, and `Address` types are eliminated from the schema. The `postUserStreet` now directly returns a `String` representing the address street, thereby simplifying the client-side data fetch process. `@inline` operator also take cares of nullablity of the fields. If any of the fields in the path is nullable, the resulting type will be nullable.

Additionally, `@inline` supports indexing, meaning you can specify the array index to be inlined. If a field `users` is of type `[User]`, and you want to inline the first user, you can specify the path as [`"users"`,`"0"`,`"name"`].

```graphql showLineNumbers
type Post {
  firstUser: User @inline(path: ["users", "0", "name"]) @http(path: "/users")
}
```

In conclusion, the `@inline` operator helps tidy up your schema and streamline data fetching by reducing query depth, promoting better performance and simplicity.

## Operator Composition

This example illustrates the concept of composition in GraphQL, which allows you to combine multiple operations (known as "operators") to build more complex transformations of data.

The given schema is defining two data types - `User` and `Post`. The `User` type has fields `id` and `name`, and the `Post` type initially has fields `user` and `userId`.

```graphql showLineNumbers
type User {
  id: Int
  name: String
}

type Post {
  user: User
    @inline(path: ["name"])
    @modify(name: "userName")
    @http(path: "/users/{{userId}}")
  userId: Int!
}
```

However, it uses a series of operators to modify the `user` field.

1. The `@inline(path: ["name"])` operator is used to drill down into the `User` object, specifically targeting the `name` field. This is equivalent to fetching the `User.name` property.

2. The `@modify(name: "userName")` operator is used to name the inlined `name` field to `userName`. So, instead of a `user` field that is a `User` object, we now have a `userName` field that is a `String`.

3. The `@http(path: "/users/{{userId}}")` operator is used to instruct the resolver to make an HTTP request to fetch the user data from a specified path (i.e., `/users/{{userId}}`), where `{{userId}}` is a placeholder that would be replaced with the actual `userId` when making the request.

The schema after this transformation looks like this:

```graphql showLineNumbers
type User {
  id: Int
  name: String
}

type Post {
  userName: String
  userId: Int!
}
```

So, we've used composition of operators to take a complex object (the `User` inside the `Post`), extract a specific part of it (`name`), name that part (`userName`), and then instruct GraphQL how to fetch the data using an HTTP request.

> It is important to note that the order of the operators doesn't matter. The resulting schema will always be the same.

This is a powerful mechanism that allows you to make your GraphQL schema more precise, easier to understand, and more suitable for the specific needs of your application.
