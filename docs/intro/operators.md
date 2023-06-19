---
sidebar_position: 2
title: Operators
slug: /operators
---
Tailcall DSL builds on your existing GraphQL knowledge by allowing the addition of some custom operators, termed 'Operators'. These operators provide powerful compile time guarantees to make sure your API composition is tight and robust. It also automatically generates highly optimized resolver logic for your types.
### @server

The **@server** operator is utilized to define critical server configurations for your GraphQL application. For example:

```graphql showLineNumbers
schema @server(
    baseURL: "https://jsonplaceholder.typicode.com",
    vars: { foo: "bar" }
) {
    query: Query
    mutation: Mutation
}
```

In this example, the `@server` operator is added to the GraphQL `schema` definition.

1. `baseURL`: We've set "https://jsonplaceholder.typicode.com" as our `baseURL`. This means that all API calls made by our GraphQL server defined by [@http](#http) will start with this URL.

2. `vars`: We've passed in a vars object with a key of `foo` and a value of `bar`. This represents a local variable that could be used by the GraphQL server during its operations.


### @http

This **@http** operator serves as an indication of a field or node that is underpinned by a REST API. For Example:
```graphql showLineNumbers
type Query {
    user(id: ID!): User @http(path: "/users")
}
```
In this example, the `@http` operator is added to the `user` field of the `Query` type. This means that the `user` field is underpinned by a REST API. The [path](#path) argument is used to specify the path of the REST API. In this case, the path is `/users`. This means that the GraphQL server will make a GET request to `https://jsonplaceholder.typicode.com/users` when the `user` field is queried.
#### baseURL
This refers to the base URL of the API. If not specified, the default base URL is the one specified in the [@server](#server) operator.
```graphql showLineNumbers
type Query {
    user(id: ID!): User @http(path: "/users", baseURL: "https://jsonplaceholder.typicode.com")
}
```
#### path

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

#### method

This refers to the HTTP method of the API call. Commonly used methods include GET, POST, PUT, DELETE, etc. If not specified, the default method is GET. For example:

```graphql showLineNumbers 
type Mutation {
    createUser(input: UserInput!): User @http(method: "POST", path: "/users")
}
```

#### query

This represents the query parameters of your API call. You can pass it as a static object or use Mustache template for dynamic parameters. These parameters will be added to the URL. For example:

```graphql showLineNumbers
type Query {
    userPosts(id: ID!): [Post] @http(path: "/posts", query: {userId : "{{args.id}}" })
}
```

#### body

The body of the API call. It's used for methods like POST or PUT that send data to the server. You can pass it as a static object or use a Mustache template to substitute variables from the GraphQL variables. For example:

```graphql showLineNumbers
type Mutation {
    createUser(input: UserInput!): User @http(method: "POST", path: "/users", body: "{{args.input}}")
}
```

In the example above, the `createUser` mutation sends a POST request to `/users`, with the input object converted to JSON and included in the request body.

### @modify

The `@modify` operator in GraphQL provides the flexibility to alter the attributes of a field or a node within your GraphQL schema. Here's how you can use this operator:

1. **Renaming a Field or Node**
  You can rename a field or a node in your GraphQL schema using the `name` argument in the `@modify` operator. This can be helpful when the field name in your underlying data source doesn't match the desired field name in your schema. For instance:

  ```graphql showLineNumbers
  type User {
      id: Int! @modify(rename: "userId")
  }   
  ```
 `@modify(rename: "userId")` tells GraphQL that although the field is referred to as `id`in the underlying data source, it should be presented as `userId` in your schema.

2. **Excluding a Field or Node**

  You can exclude a field or a node from your GraphQL schema using the `omit` argument in the `@modify` operator. This can be useful if you want to keep certain data hidden from the client. For instance:

  ```graphql showLineNumbers
  type User {
      id: Int! @modify(omit: true)
  }
  ```
   `@modify(omit: true)` tells GraphQL that the `id` field should not be included in the schema, thus it won't be accessible to the client.

### @inline

The `@inline` operator offers the ability to 'inline' or flatten a field or node in your schema. You provide the path to the field or node you wish to inline as an argument to the operator. This is particularly useful for simplifying your schema by reducing unnecessary levels of nesting. This operator is also changing your actual schema along with doing the data transformation.

Consider the following GraphQL schema:

```graphql showLineNumbers
schema {
    query: Query
}

type Post {
    id: Int!
    user: User
}

type User {
    id: Int!
    name: String!
    email: String!
    address: Address
}

type Address {
    street: String!
    city: String!
    state: String!
}

type Query {
    postUserStreet(id: Int): Post @inline(path: ["user","address", "street"])
}
```

Breaking down the above:

1. The schema is defined with `Query` as the root query type.
2. Three types `Post`, `User`, and `Address` are defined:

- `Post` has a field `user` of type `User`.
- `User` has a field `address` of type `Address`.
- `Address` has three fields `street`, `city`, and `state`.

3. The root query type `Query` has a field `postUserAddress` of type `Post`.

The `@inline` operator is used on the `postUserAddress` field of the `Query` type. The `path` argument to `@inline` specifies the sequence of fields to traverse from `Post` to the field to be inlined, `address` in this case. Thus, `["user","address","street"]` denotes the path `Post` -> `User` -> `Address`.

After applying the `@inline` operator, your schema is transformed to:

```graphql showLineNumbers
schema {
    query: Query
}

type Query {
   postUserAddress(id: Int): String
}
```

Here's what happened:

1. The `@inline` operator effectively removed the `Post`, `User` and `Address` types from your schema, along with their associated fields.
2. Instead of `postUserAddress` returning a `Post` object which would then require traversing `post` to get to `User` and then `user` to get to `Address`, and then `address` to get to `street`, `postUserAddress` now directly returns a `string` which represents address street.

This operator helps to declutter your schema and simplifies the data fetching process for the client, as it reduces the depth of the queries they need to make.


## Advanced Topics

### Composing Operators

This example illustrates the concept of composition in GraphQL, which allows you to combine multiple operations (known as "operators") to build more complex transformations of data.

The given schema is defining two data types - `User` and `Post`. The `User` type has fields `id` and `name`, and the `Post` type initially has fields `user` and `userId`.

```graphql showLineNumbers
type User {
    id: Int
    name: String
}
type Post {
    user: User @inline(path: ["name"]) @modify(name: "userName") @http(path: "/users/{{userId}}")
    userId: Int!
}
```

However, it uses a series of operators to modify the `user` field.

1. The `@inline(path: ["name"])` operator is used to drill down into the `User` object, specifically targeting the `name` field. This is equivalent to fetching the `User.name` property.

2. The `@modify(name: "userName")` operator is used to rename the inlined `name` field to `userName`. So, instead of a `user` field that is a `User` object, we now have a `userName` field that is a `String`.

3. The `@http(path: "/users/{{userId}}")` operator is used to instruct the resolver to make an HTTP request to fetch the user data from a specified path (i.e., `/users/{{userId}}`), where `{{userId}}` is a placeholder that would be replaced with the actual `userId` when making the request.

The schema after this transformation looks like this:

```graphql
type User {
    id: Int
    name: String
}
type Post {
    userName: String
    userId: Int!
}
```

So, we've used composition of operators to take a complex object (the `User` inside the `Post`), extract a specific part of it (`name`), rename that part (`userName`), and then instruct GraphQL how to fetch the data using an HTTP request.

This is a powerful mechanism that allows you to make your GraphQL schema more precise, easier to understand, and more suitable for the specific needs of your application.


