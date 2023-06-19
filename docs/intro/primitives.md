---
sidebar_position: 2
title: Tailcall SDL
slug: /primitives
---

# Tailcall SDL - Simplified GraphQL with Primitives

Tailcall SDL supercharges your existing knowledge of GraphQL schema, enabling you to add custom directives for
automated, intelligent resolver logic generation. It enables you to easily compose REST APIs into a unified GraphQL
schema, with built-in support for a wide range of transformations.

We refer to these custom directives as `Primitives`. These Primitives allow you to outline your needs, with the system
managing everything from business logic and data transformations to performance optimizations.

## Understanding Primitives

Primitives are custom directives designed to streamline your development process. They serve as your Graphql assistant,
taking care of business logic, data transformation, and performance optimization based on your specified needs. This
approach dramatically reduces manual intervention and offers a stellar developer experience.

The real gem of Primitives is their compile-time guarantees. These promises ensure reliable operations without runtime
surprises. They help catch issues earlier in the development cycle, reducing debugging time and enhancing overall
software quality.

By significantly reducing both coding and debugging time, Primitives allows you to focus on creativity and innovation.
In the fast-paced world of development, they offer a competitive edge by boosting productivity and improving
reliability.

## The Primitives At Your Disposal

### @server

The `@server` Primitive in Tailcall SDL is utilized to define critical server configurations for your GraphQL
application. Here are the specific parameters it configures:

1. `baseURL`: This is the root URL from which your GraphQL server will be making API calls. It's essentially the "home"
   of the data your application will be interacting with.

2. `timeout`: This is the maximum time in **Seconds** the server will wait for a response before abandoning a request to
   the GraphQL server. It's an important configuration for maintaining the performance and usability of your
   application, especially when dealing with servers that may have slow response times.

3. `vars`: These are the environment variables that your GraphQL server may need for its operations. This could include
   API keys, user credentials, or any other secure information that shouldn't be hard-coded directly into your
   application.

Let's break down an example:

```graphql showLineNumbers
schema @server(
    baseURL: "https://abc.com",
    timeout: 10,
    vars: { foo: "bar" }
) {
    query: Query
    mutation: Mutation
}
```

In this example, the `@server` Primitive is added to the GraphQL `schema` definition.

1. `baseURL`: We've set "https://jsonplaceholder.typicode.com" as our `baseURL`. This means that all API calls made by
   our GraphQL server will start with this URL.

2. `timeout`: We've set the `timeout` to 10 seconds. This means that if a request takes longer than 10 seconds to
   complete, the GraphQL server will abandon the request and return an error.
3. `vars`: We've passed in a vars object with a key of `foo` and a value of `bar`. This represents an environment
   variable that could be used by the GraphQL server during its operations.
4. `query` and `mutation` are standard parts of any GraphQL schema. `query` is used to fetch data from the server (
   equivalent to a GET request in REST), and `mutation` is used to modify data on the server (equivalent to POST, PUT,
   PATCH, and DELETE requests in REST).

This `@server` Primitive informs Tailcall SDL about the server we're working with, ensuring that any requests made
through our GraphQL server are properly directed and managed.

### @http

This **@http** directive serves as an indication of a field or node that is underpinned by a REST API. It provides a
clear, declarative method for delineating your API calls, and accommodates several configurations:

#### path

This refers to the API endpoint you're going to call. For instance, if your API base URL is `https://api.example.com`,
and you're trying to fetch users, your path could be `/users`. The full API call will then
be `https://api.example.com/users`. If your API endpoint contains dynamic segments, you can use Mustache templates to
substitute variables. For example, to fetch a specific user, the path can be written as `/users/{{id}}`.

Example:

```graphql showLineNumbers
type Query {
    user(id: ID!): User @http(path: "/users/{{args.id}}")
}

```

#### method

This refers to the HTTP method of the API call. Commonly used methods include GET, POST, PUT, DELETE, etc. If not
specified, the default method is GET.

Example:

```graphql showLineNumbers 
type Mutation {
    createUser(input: CUInput!): User @http(method: "POST", path: "/users")
}
```

#### query

This represents the query parameters of your API call. You can pass it as a static object or use Mustache template for
dynamic parameters. These parameters will be added to the URL.

Example:

```graphql showLineNumbers
type Query {
    userPosts(id: ID!): [Post] @http(path: "/posts", query: "{ 'userId': '{{args.id}}' }")
}
```

#### body

The body of the API call. It's used for methods like POST or PUT that send data to the server. You can pass it as a
static object or use a Mustache template to substitute variables from the GraphQL variables.

Example:

```graphql showLineNumbers
type Mutation {
    createUser(input: CUInput!): User @http(method: "POST", path: "/users", body: "{{args.input}}")
}
```

In the example above, the `createUser` mutation sends a POST request to `/users`, with the input object converted to
JSON and included in the request body.

By using these configurations, you can wrap any REST API with a GraphQL schema, which simplifies client queries and
improves the frontend developer experience.

### @modify

The `@modify` directive in GraphQL provides the flexibility to alter the attributes of a field or a node within your
GraphQL schema. Here's how you can use this directive:

1. **Renaming a Field or Node**
   
   You can rename a field or a node in your GraphQL schema using the `name` argument in the `@modify` directive. This
   can be helpful when the field name in your underlying data source doesn't match the desired field name in your
   schema.
   
   For instance:

```graphql showLineNumbers
type User {
    id: Int! @modify(name: "userId")
}   
```

Here's how it works:

- Define a `User` type.
- Inside the `User` type, declare a field `id` of type `Int!` (`!` denotes that the field is non-nullable).
- To rename the field, use `@modify(name: "userId")`. This tells GraphQL that although the field is referred to as `id`
  in the underlying data source, it should be presented as `userId` in your schema.

2. **Excluding a Field or Node**

You can exclude a field or a node from your GraphQL schema using the `omit` argument in the `@modify` directive. This
can be useful if you want to keep certain data hidden from the client.

For instance:

```graphql showLineNumbers
type User {
    id: Int! @modify(omit: true)
}
```

Here's how it works:

- Define a `User` type.
- Inside the `User` type, declare a field `id` of type `Int!`.
- To exclude the field, use `@modify(omit: true)`. This tells GraphQL that the `id` field should not be included in the
  schema, thus it won't be accessible to the client.

### @inline

The `@inline` directive in GraphQL offers the ability to 'inline' or flatten a field or node in your schema. You provide
the path to the field or node you wish to inline as an argument to the directive. This is particularly useful for
simplifying your schema by reducing unnecessary levels of nesting.

Consider the following GraphQL schema:

```graphql showLineNumbers
schema {
    query: Query
}

type A {
    b: B
}

type B {
    c: String
}

type Foo {
    a: A
}

type Query {
    foo: Foo @inline(path: ["a","b"])
}
```

Breaking down the above:

1. The schema is defined with `Query` as the root query type.
2. Three types `A`, `B`, and `Foo` are defined:

- `A` has a field `b` of type `B`.
- `B` has a field `c` of type `String`.
- `Foo` has a field `a` of type `A`.

3. The root query type `Query` has a field `foo` of type `Foo`.

The `@inline` directive is used on the `foo` field of the `Query` type. The `path` argument to `@inline` specifies the
sequence of fields to traverse from `Foo` to the field to be inlined, `b` in this case. Thus, `["a","b"]` denotes the
path `Foo` -> `A` -> `B`.

After applying the `@inline` directive, your schema is transformed to:

```graphql showLineNumbers
schema {
    query: Query
}

type B {
    c: String
}

type Query {
    foo: B
}
```

Here's what happened:

1. The `@inline` directive effectively removed the `A` and `Foo` types from your schema, along with their associated
   fields.
2. Instead of `foo` returning a `Foo` object which would then require traversing `a` to get to `A` and then `b` to get
   to `B`, `foo` now directly returns a `B` object.
3. The type `B` (and its field `c`) is now directly accessible under the `Query` type, reducing the levels of nesting
   required to access the data contained in `B`.

This directive helps to declutter your schema and simplifies the data fetching process for the client, as it reduces the
depth of the queries they need to make.

### @unsafe

The `@unsafe` directive serves as a flexible instrument, enabling you to carry out intricate data manipulations in
GraphQL. It offers you the ability to craft custom resolver logic based on your requirements.

Here's an example to illustrate how this works:

```graphql showLineNumbers
type Post {
    user: User @unsafe(steps: [{transform: {objPath: {userId: ["value","userId"]}}},{http: {path: "/users/{{userId}}"}}])
    userId: Int!
}
```

Let's break down this example step by step:

1. In the GraphQL schema, there's a `Post` type that has two fields: `user` and `userId`.

2. The `user` field is of the `User` type, and it's here that the `@unsafe` directive is applied. The directive contains
   a list of steps to perform.

3. The first step is a `transform` operation. It's meant to extract the `userId` from the `Post` object. The `objPath`
   operator takes a list where the first item ("value") refers to the current object (in this case, the `Post`), and the
   second item ("userId") is the specific field on the object.

4. Having retrieved the `userId`, the next step is to make an HTTP request. This is indicated by the `http` operation.
   The `path` value, "/users/{{userId}}", is a template where `userId` will be replaced by the actual `userId` value
   obtained from the previous step. This step essentially fetches the User data from the given path.

5. Finally, the `userId` field is of the `Int` type. It's not manipulated by the `@unsafe` directive, so it's returned
   as is when queried.

However, while the `@unsafe` directive provides substantial flexibility, it should be used with caution. Due to the
dynamic nature of the operations performed in the steps, the performance might be impacted adversely. Complex
transformations or multiple HTTP requests can slow down the response time significantly.

Moreover, the `@unsafe` directive bypasses the type checks that are typically done at compile-time in **Tailcall**. It
means there won't be any guarantee that the data returned from an `@unsafe` field will match the expected type, which
could potentially lead to runtime errors or data inconsistencies. Always test thoroughly and consider the trade-offs
when using the `@unsafe` directive.

## Advanced Topics

### Composing Primitives: Building Complex Transformations

This example illustrates the concept of composition in GraphQL, which allows you to combine multiple operations (known
as \"primitives\") to build more complex transformations of data.

The given schema is defining two data types - `User` and `Post`. The `User` type has fields `id` and `name`, and
the `Post` type initially has fields `user` and `userId`.

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

However, it uses a series of primitives to modify the `user` field.

1. The `@inline(path: ["name"])` primitive is used to drill down into the `User` object, specifically targeting
   the `name` field. This is equivalent to fetching the `User.name` property.

2. The `@modify(name: "userName")` primitive is used to rename the inlined `name` field to `userName`. So, instead of
   a `user` field that is a `User` object, we now have a `userName` field that is a `String`.

3. The `@http(path: "/users/{{userId}}")` primitive is used to instruct the resolver to make an HTTP request to fetch
   the user data from a specified path (i.e., `/users/{{userId}}`), where `{{userId}}` is a placeholder that would be
   replaced with the actual `userId` when making the request.

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

So, we've used composition of primitives to take a complex object (the `User` inside the `Post`), extract a specific
part of it (`name`), rename that part (`userName`), and then instruct GraphQL how to fetch the data using an HTTP
request.

This is a powerful mechanism that allows you to make your GraphQL schema more precise, easier to understand, and more
suitable for the specific needs of your application.


