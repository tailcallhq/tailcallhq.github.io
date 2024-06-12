---
title: GraphQL Configuration
description: Enhance your GraphQL API with Tailcall DSL's custom directives. These directives offer powerful compile-time guarantees, ensuring robust and optimized API composition. Tailcall automates the generation of resolver logic for improved performance.
slug: tailcall-dsl-graphql-custom-directives
sidebar_label: Configuration Reference
sidebar_position: 5
---

Tailcall DSL builds on your existing GraphQL knowledge by allowing the addition of some custom directives. These directives provide powerful compile time guarantees to ensure your API composition is tight and robust. Tailcall automatically generates highly optimized resolver logic for your types using the information in the directives.

Here is a list of all the custom directives supported by Tailcall:

<!-- SORT OPERATOR BY NAME -->

| Operator                             | Description                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| [`@addField`](#addfield-directive)   | Simplifies data structures and queries by adding, inlining, or flattening fields or nodes within the schema. |
| [`@cache`](#cache-directive)         | Enables caching for the query, field or type applied to.                                                     |
| [`@call`](#call-directive)           | Invokes a query or mutation from another query or mutation field.                                            |
| [`@expr`](#expr-directive)           | Allows embedding of a constant response within the schema.                                                   |
| [`@graphQL`](#graphql-directive)     | Resolves a field or node by a GraphQL API.                                                                   |
| [`@grpc`](#grpc-directive)           | Resolves a field or node by a gRPC API.                                                                      |
| [`@http`](#http-directive)           | Resolves a field or node by a REST API.                                                                      |
| [`@link`](#link-directive)           | Imports external resources such as config files, certs, protobufs, etc in the schema.                        |
| [`@modify`](#modify-directive)       | Enables changes to attributes of fields or nodes in the schema.                                              |
| [`@omit`](#omit-directive)           | Excludes fields or nodes from the generated schema, making them inaccessible through the GraphQL API.        |
| [`@rest`](#rest-directive)           | Allows exposing REST endpoints on top of GraphQL.                                                            |
| [`@server`](#server-directive)       | Provides server configurations for behavior tuning and tailcall optimization in specific use-cases.          |
| [`@telemetry`](#telemetry-directive) | Integrates with open-telemetry to provide observability of the running tailcall service.                     |
| [`@upstream`](#upstream-directive)   | Controls aspects of the upstream server connection, including timeouts and keep-alive settings.              |

## @addField Directive

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
  user(id: Int!): User @http(path: "/users/{{.args.id}}")
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
  posts: Post @http(path: "/users/{{.value.id}}/posts")
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
}
```

In conclusion, the `@addField` directive helps tidy up your schema and streamline data fetching by reducing query depth, promoting better performance and simplicity.

## @cache Directive

The `@cache` directive provides a protocol agnostic mechanism for caching the results of fields within a GraphQL schema. Like any other cache implementation, this feature is useful for optimizing performance by reducing the need to fetch data that doesn't change frequently.

### maxAge

```graphql
@cache(maxAge: Int)
```

This parameter is a non-zero unsigned integer specifying the duration, in milliseconds, that retains the cached value.

### Usage

Consider the following GraphQL schema example:

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int
  title: String
  userId: Int @cache(maxAge: 100)
  user: User
    @http(path: "/user/{{.value.userId}}")
    @cache(maxAge: 200)
}

type User {
  id: Int
  name: String
  email: String
}
```

In this configuration, the system caches the result of the `user` field due to its association with an HTTP resolver. But it does not cache the values of `userId` and `title` because they lack individual resolvers; the resolver for the `posts` field retrieves their values, employing the `@http(path: "/posts")` directive.

Applying the `@cache` directive at the type level affects all fields within that type. For example:

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post @cache(maxAge: 100) {
  id: Int
  title: String
  userId: Int
  user: User @http(path: "/user/{{.value.userId}}")
}

type User {
  id: Int
  name: String
  email: String
}
```

You can simplify this configuration to show that applying the `@cache` directive to a type means every field within that type inherits it:

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int @cache(maxAge: 100)
  title: String @cache(maxAge: 100)
  userId: Int @cache(maxAge: 100)
  user: User
    @http(path: "/user/{{.value.userId}}")
    @cache(maxAge: 100)
}

type User {
  id: Int
  name: String
  email: String
}
```

Since the `@cache` directive does not affect fields without resolvers, the effective configuration can be further reduced as follows:

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int
  title: String
  userId: Int
  user: User
    @http(path: "/user/{{.value.userId}}")
    @cache(maxAge: 100)
}

type User {
  id: Int
  name: String
  email: String
}
```

When applying the `@cache` directive both at the type level and on individual fields within that type, the field-level directive takes precedence:

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post @cache(maxAge: 200) {
  id: Int
  title: String
  userId: Int
  user: User
    @http(path: "/user/{{.value.userId}}")
    @cache(maxAge: 100)
}

type User {
  id: Int
  name: String
  email: String
}
```

Thus, in the configuration above, while all fields inherit the `@cache(maxAge: 200)` directive at the type level, the `user` field's explicit `@cache(maxAge: 100)` directive takes precedence.

### Cache Key

The caching mechanism generates a hash based on information related to the applied query to serve as the cache key for the corresponding value.

For instance, the system caches the `user` field in the following configuration, using the hash of the interpolated string `"/user/{{.value.userId}}"` as the cache key. For example, if `Post.userId` equals `1`, the system generates the cache key by hashing the string `"/users/1"`.

## @call Directive

The `@call` directive in GraphQL signifies a shift towards more efficient configuration management by introducing a methodology akin to function invocations in conventional programming. This directive is pivotal for developers navigating the intricacies of elaborate GraphQL schemas, where minimizing redundancy and adhering to the DRY (Don't Repeat Yourself) principle are paramount. Consider the following schema example:

```graphql showLineNumbers
schema
  @upstream(
    baseURL: "https://jsonplaceholder.typicode.com"
  ) {
  query: Query
}

type Query {
  # highlight-start
  user(id: Int!): User @http(path: "/users/{{.args.id}}")
  # highlight-end
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  # highlight-start
  user: User @http(path: "/users/{{.value.userId}}")
  # highlight-end
}

type User {
  id: Int!
  name: String!
  email: String!
}
```

In this schema, at lines `9` and `18`, a pattern of configuration duplication emerges when fetching user's data by its id, demonstrating a prime use case for the `@call` directive. Through refactoring the `Post` type to incorporate the `@call` directive, we can eliminate this redundancy.

```graphql showLineNumbers
type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  # highlight-start
  user: User
    @call(
      steps: [
        {query: "user", args: {id: "{{.value.userId}}"}}
      ]
    )
  # highlight-end
}
```

Here, the `@call` directive invokes the `user` query from the `Query` type, leveraging the data-fetching process that's already defined in the root `query`. The `query` parameter specifies the target field, while the `args` parameter delineates the arguments to be passed.

### steps

`@call` directive can compose together other resolvers, allowing to create a chain of resolvers that can be executed in sequence. This is done by using the `steps` parameter, which is an array of objects that define the operations to be executed.

### query

Specify the root **query** field to invoke, alongside the requisite arguments, using the `@call` directive for a concise and efficient query structure.

```graphql showLineNumbers
type Post {
  userId: Int!
  user: User
    @call(
      steps: [
        {query: "user", args: {id: "{{.value.userId}}"}}
      ]
    )
}
```

### mutation

Similarly, the `@call` directive can facilitate calling a mutation from another mutation field, employing the `mutation` parameter for field specification and the `args` parameter for argument delineation.

```graphql showLineNumbers
type Mutation {
  insertPost(input: PostInput, overwrite: Boolean): Post
    @http(
      body: "{{.args.input}}"
      method: "POST"
      path: "/posts"
      query: {overwrite: "{{.args.overwrite}}"}
    )

  upsertPost(input: PostInput): Post
    @call(
      steps: [
        {
          mutation: "insertPost"
          args: {input: "{{.args.input}}", overwrite: true}
        }
      ]
    )
}
```

### args

The `args` parameter in the `@call` directive facilitates passing arguments to the targeted query or mutation, represented as a key-value mapping where each key corresponds to an argument name and its associated value.

```graphql showLineNumbers
type Post {
  userId: Int!
  user: User
    @call(
      steps: [
        {query: "user", args: {id: "{{.value.userId}}"}}
      ]
    )
}
```

:::tip
The `@call` directive is predominantly advantageous in complex, large-scale configurations. For those new to GraphQL or Tailcall, it may be beneficial to explore this directive after familiarizing yourself with the foundational aspects of GraphQL.
:::

### Composition

`@call` directive provides the ability to express a sequence of steps that one might need to compose. These steps are executed such that the result of each step is passed as an argument to the next step. The `query` and `mutation` parameters are used to specify the target field, while the `args` parameter is used to pass arguments to the target field.

Let's explain this with an example:

```graphql showLineNumbers
schema @server {
  query: Query
}

type Query {
  a(input: JSON): JSON
    @expr(body: {value: "{{.args.input.a}}"})

  b(input: JSON): JSON
    @expr(body: {value: "{{.args.input.b}}"})

  c(input: JSON): JSON
    @expr(body: {value: "{{.args.input.c}}"})
}
```

Here we have defined there operations viz. `a`, `b` & `c` each of them pluck their respective keys from the given input value. Let's run this query with some test input:

```graphql
{
  a(input: {a: 100})
  b(input: {b: 200})
  c(input: {c: 300})
}
```

Here is how the response would look like:

```json
{
  "data": {
    "a": {
      "value": 100
    },
    "b": {
      "value": 200
    },
    "c": {
      "value": 300
    }
  }
}
```

As you can see the [`@expr`](#expr-directive) directive plucks the inner value and returns the result. How about we implement an `abc` operation that could leverage the existing operations and unwrap the following input value:

```json
{"a": {"b": {"c": {"d": 1000}}}}
```

Given the above input if we wish to extract the last inner number `1000` then we could define a new operation as follows

```graphql showLineNumbers
schema @server {
  query: Query
}

type Query {
  a(input: JSON): JSON
    @expr(body: {value: "{{.args.input.a}}"})

  b(input: JSON): JSON
    @expr(body: {value: "{{.args.input.b}}"})

  c(input: JSON): JSON
    @expr(body: {value: "{{.args.input.c}}"})

  # highlight-start
  abc(input: JSON): JSON
    @call(
      steps: [
        {query: "a", args: {input: "{{.args.input}}"}}
        {query: "b", args: {input: "{{.args.value}}"}}
        {query: "c", args: {input: "{{.args.value}}"}}
      ]
    )
  # highlight-end
}
```

We use the `@call` directive to compose the operations together. The `args` specify how we would like to pass the arguments to the operation and the result of that operation is passed to the next step. We can test the new `abc` operation with the following query:

```graphql
query {
  abc(input: {a: {b: {c: 1000}}})
}
```

The server returns the response that we expected:

```json
{
  "data": {
    "abc": {
      "value": 100
    }
  }
}
```

This way you can compose combine multiple operations can compose them together using the `@call` directive.

:::note
We use `JSON` scalar here because we don't care about the type safety of this option. In a real world example you might want to use proper input and output types.
:::

## @expr Directive

The `@expr` directive in GraphQL is a powerful tool for embedding data directly into your schema, offering two primary functionalities:

### Static

This feature allows for the inclusion of a constant response within the schema definition itself. It is useful for scenarios where the response is unchanging. e.g:

```graphql
schema {
  query: Query
}

type Query {
  user: User @expr(body: {name: "John", age: 12})
}

type User {
  name: String
  age: Int
}
```

The `@expr` directive also checks the provided value at compile time to ensure it matches the field's schema. If not, the console displays a descriptive error message.

### Dynamic

Beyond static data embedding, the `@expr` directive extends its utility to support dynamic data injection through Mustache template syntax. This feature enables the use of placeholders within the constant data, which are then dynamically replaced with actual values at runtime. It supports both scalar values and complex objects, including lists and nested objects, offering flexibility in tailoring responses to specific needs. e.g:

```graphql
schema {
  query: Query
}

type Query {
  user: User
    @expr(
      body: {
        name: "John"
        workEmail: "john@xyz.com"
        personalEmail: "john@xyz.com"
      }
    )
}

type User {
  name: String
  age: Int
  personalEmail: String
  workEmail: String
  emails: Emails
    @expr(
      body: {
        emails: {
          workEmail: "{{.value.workEmail}}"
          personalEmail: "{{.value.personalEmail}}"
        }
      }
    )
}

type Emails {
  workEmail: String
  personalEmail: String
}
```

In this example, the `@expr` directive dynamically generate an `Emails` object based on the provided template data. The placeholders within the template (`{{.value.workEmail}}` and `{{.value.personalEmail}}`) gets replaced with the actual values specified in the `User` type, allowing for dynamic content generation while still adhering to the schema's structure.

## @graphQL Directive

The `@graphQL` directive allows to specify GraphQL API server request to fetch data from.

```graphql showLineNumbers
type Query {
  users: [User] @graphQL(name: "userList")
}
```

The `@graphQL` directive facilitates fetching a list of users from the GraphQL API upstream. The [name](#name) argument specifies the root field's name on the upstream server. The upcoming request to the GraphQL server determines the `User` type's inner fields for the request. Depending on the operation type within which one finds the `@graphQL` directive, the GraphQL configuration determines the query's operation type.

For the next request with the config above:

```graphql showLineNumbers
query {
  users {
    id
    name
  }
}
```

Tailcall will request the next query for the upstream:

```graphql showLineNumbers
query {
  userList {
    id
    name
  }
}
```

### baseURL

This refers to the base URL of the API. If not specified, the default base URL is the one specified in the [`@upstream`](#upstream-directive) directive.

```graphql showLineNumbers
type Query {
  users: [User]
    @graphQL(
      name: "users"
      baseURL: "https://graphqlzero.almansi.me/api"
    )
}
```

### name

The root field's name on the upstream to request data from. For example:

```graphql showLineNumbers
type Query {
  users: [User] @graphQL(name: "userList")
}
```

When Tailcall receives a query for the `users` field, it will request a query for `userList` from the upstream.

### args

Named arguments for the requested field. For example:

```graphql showLineNumbers
type Query {
  user: User
    @graphQL(
      name: "user"
      args: [{key: "id", value: "{{.value.userId}}"}]
    )
}
```

Will request the next query from the upstream for the first user's name:

```graphql showLineNumbers
query {
  user(id: 1) {
    name
  }
}
```

### headers

The `headers` parameter allows customizing the headers of the GraphQL request made by the `@graphQL` directive. Specifying a key-value map of header names and their values achieves this.

For instance:

```graphql showLineNumbers
type Mutation {
  users: User
    @graphQL(
      name: "users"
      headers: [{key: "X-Server", value: "Tailcall"}]
    )
}
```

In this example, a request to `/users` will include the HTTP header `X-Server` with the value `Tailcall`.

### batch

In case the upstream GraphQL server supports request batching, we can specify the `batch` argument to batch requests to a single upstream into a single batch request. For example:

```graphql showLineNumbers
schema
  @upstream(
    batch: {
      maxSize: 1000
      delay: 10
      headers: ["X-Server", "Authorization"]
    }
  ) {
  query: Query
  mutation: Mutation
}

type Query {
  users: [User] @graphQL(name: "users", batch: true)
  posts: [Post] @graphQL(name: "posts", batch: true)
}
```

Make sure you have also specified batch settings to the `@upstream` and to the `@graphQL` directive.

## @grpc Directive

The `@grpc` directive enables the resolution of GraphQL fields via gRPC services. Below is an illustrative example of how to apply this directive within a GraphQL schema:

```graphql
schema @link(src: "./users.proto", type: Protobuf) {
  query: Query
}

type Query {
  users: [User] @grpc(method: "users.UserService.ListUsers")
}
```

This schema snippet demonstrates the directive's application, where a query for `users` triggers a gRPC request to the `UserService`'s `ListUsers` method, thereby fetching the user data.

The `.proto` file delineates the structure and methods of the gRPC service. A simplified example of such a file is as follows:

```proto
syntax = "proto3";

package users;

service UserService {
  rpc ListUsers (UserListRequest) returns (UserListReply) {}
  rpc GetUser (UserGetRequest) returns (UserGetReply) {}
}

message UserListRequest {
  // Definitions of request parameters
}

message UserListReply {
  // Structure of the reply
}

message UserGetRequest {
  // Definitions of request parameters
}

message UserGetReply {
  // Structure of the reply
}
```

:::important
It is mandatory to have a package name in a protobuf file.
:::

Linking this file within a GraphQL schema is facilitated by the `@link` directive, as shown below:

```graphql
schema @link(src: "./users.proto", type: Protobuf) {
  query: Query
}
```

Tailcall automatically resolves the protobuf file for any methods referenced in the `@grpc` directive.

### method

This parameter specifies the gRPC service and method to be invoked, formatted as `<package>.<service>.<method>`:

```graphql
type Query {
  users: [User]
    @grpc(method: "proto.users.UserService.ListUsers")
}
```

### baseURL

Defines the base URL for the gRPC API. If not specified, the URL set in the `@upstream` directive is used by default:

```graphql
type Query {
  users: [User]
    @grpc(
      baseURL: "https://grpc-server.example.com"
      method: "proto.users.UserService.ListUsers"
    )
}
```

### body

This parameter outlines the arguments for the gRPC call, allowing for both static and dynamic inputs:

```graphql
type UserInput {
  id: ID
}

type Query {
  user(id: UserInput!): User
    @grpc(
      body: "{{.args.id}}"
      method: "proto.users.UserService.GetUser"
    )
}
```

### headers

Custom headers for the gRPC request can be defined, facilitating the transmission of authentication tokens or other contextual data:

```graphql
type Query {
  users: [User]
    @grpc(
      headers: [
        {key: "X-CUSTOM-HEADER", value: "custom-value"}
      ]
      method: "proto.users.UserService.ListUsers"
    )
}
```

### batchKey

This argument is employed to optimize batch requests by grouping them based on specified response keys, enhancing performance in scenarios requiring multiple, similar requests:

```graphql
type Query {
  users(id: UserInput!): [User]
    @grpc(
      batchKey: ["id"]
      method: "proto.users.UserService.ListUsers"
      baseURL: "https://grpc-server.example.com"
    )
}
```

:::info
Read about [n + 1](./N+1.md) to learn how to use the `batchKey` setting.
:::

## @http Directive

The `@http` directive indicates a field or node relies on a REST API. For example:

```graphql showLineNumbers
type Query {
  users: [User] @http(path: "/users")
}
```

In this example, adding the `@http` directive to the `users` field of the `Query` type indicates reliance on a REST API for the `users` field. The [path](#path) argument specifies the REST API's path, which is `/users` in this scenario.Querying the `users` field prompts the GraphQL server to issue a GET request to `https://jsonplaceholder.typicode.com/users`.

### baseURL

Specifies the API's base URL. If unspecified, it defaults to the URL in the [`@upstream`](#upstream-directive) directive.

```graphql showLineNumbers
type Query {
  users: [User]
    @http(
      path: "/users"
      baseURL: "https://jsonplaceholder.typicode.com"
    )
}
```

### path

Refers to the API endpoint, for example, `https://jsonplaceholder.typicode.com/users`.

```graphql showLineNumbers
type Query {
  users: [User] @http(path: "/users")
}
```

If your API endpoint contains dynamic segments, you can substitute variables using Mustache templates. For example, to fetch a specific user, you can write the path as `/users/{{.args.id}}`.

```graphql showLineNumbers
type Query {
  user(id: ID!): User @http(path: "/users/{{.args.id}}")
}
```

### method

Specifies the HTTP method for the API call. The default method is GET if not specified.

```graphql showLineNumbers
type Mutation {
  createUser(input: UserInput!): User
    @http(method: "POST", path: "/users")
}
```

### query

Represents the API call's query parameters, either as a static object or with dynamic parameters using Mustache templates. These parameters append to the URL.

```graphql showLineNumbers
type Query {
  userPosts(id: ID!): [Post]
    @http(
      path: "/posts"
      query: [{key: "userId", value: "{{.args.id}}"}]
    )
}
```

### body

Defines the API call's body, necessary for methods like POST or PUT. Pass it as a static object or use Mustache templates for variable substitution from the GraphQL variables.

```graphql showLineNumbers
type Mutation {
  createUser(input: UserInput!): User
    @http(
      method: "POST"
      path: "/users"
      body: "{{.args.input}}"
    )
}
```

In the example above, the `createUser` mutation sends a POST request to `/users`, with the input object converted to JSON and included in the request body.

### headers

Customizes the HTTP request headers made by the `@http` directive. Specify a key-value map of header names and values.

For instance:

```graphql showLineNumbers
type Mutation {
  createUser(input: UserInput!): User
    @http(
      path: "/users"
      headers: [{key: "X-Server", value: "Tailcall"}]
    )
}
```

In this example, a request to `/users` will include a HTTP header `X-Server` with the value `Tailcall`.

You can make use of mustache templates to provide dynamic values for headers, derived from the arguments or [context] provided in the request. For example:

[context]: /docs/graphql-resolver-context-tailcall

```graphql showLineNumbers
type Mutation {
  users(name: String): User
    @http(
      path: "/users"
      headers: [
        {key: "X-Server", value: "Tailcall"}
        {key: "User-Name", value: "{{.args.name}}"}
      ]
    )
}
```

In this scenario, the `User-Name` header's value will dynamically adjust according to the `name` argument passed in the request.

### batchKey

Groups data requests into a single call, enhancing efficiency. Refer to our [n + 1 guide](./N+1.md) for more details.

```graphql showLineNumbers
type Post {
  id: Int!
  name: String!
  user: User
    @http(
      path: "/users"
      query: [{key: "id", value: "{{.value.userId}}"}]
      batchKey: ["id"]
    )
}
```

- `query: {key: "id", value: "{{.value.userId}}"}]`: Instructs TailCall CLI to generate a URL aligning the user id with `userId` from the parent `Post`, compiling a single URL for a batch of posts, such as `/users?id=1&id=2&id=3...id=10`, consolidating requests into one.

### onRequest

The `onRequest` property accepts a string value representing the remote function to be called every time an HTTP request is initiated. Typically the remote function is defined in a linked JavaScript worker file.

:::note
For defining a request middleware globally for all requests, refer to the [upstream directive documentation](/docs/directives.md#onrequest-1).
:::

```graphql showLineNumbers
type Query {
  userPosts(id: ID!): [Post]
    @http(
      path: "/posts"
      query: [{key: "userId", value: "{{.args.id}}"}]
      onRequest: "someFunctionName"
    )
}
```

## @js Directive

The `@js` directive allows you to use JavaScript functions to resolve fields in your GraphQL schema. This can be useful
for custom data transformations or complex field resolutions.

### Usage

The `@js` directive is used to specify a JavaScript function that will resolve the value of a field. The directive takes
a single argument, `name`, which is the name of the JavaScript function to be used.

### Syntax

```graphql showLineNumbers
fieldName: FieldType @js(name: "functionName")
```

### Example

Let's consider a `foo.js` file which contains a `resolve` function:

```js
function resolve(val) {
  let json = JSON.parse(val)
  return JSON.stringify(json.id)
}
```

Here is an example of how the `@js` directive is used within a GraphQL schema:

```gql showLineNumbers
schema
  @link(type: Script, src: "./scripts/foo.js")
  @server(port: 8000)
  @upstream(
    baseURL: "http://jsonplaceholder.typicode.com"
    httpCache: true
  ) {
  query: Query
}

type Query {
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int!
  idx: Int! @js(name: "resolve")
  userId: Int!
  title: String!
  body: String!
}
```

### Error Handling

When using the `@js` directive, it is important to handle errors within your JavaScript functions. For example, you can use try-catch blocks to catch and handle any errors that occur during the resolution process.

```javascript
function resolve(val) {
  try {
    let json = JSON.parse(val)
    return JSON.stringify(json.id)
  } catch (error) {
    console.error("Error resolving value:", error)
    throw new Error("Failed to resolve value")
  }
}
```

### Performance Considerations

When using the `@js` directive, keep in mind that JavaScript functions can introduce performance overhead, especially if they perform complex operations or are called frequently. To minimize performance impact, ensure that your functions are optimized and avoid unnecessary computations.

## @link Directive

The `@link` directive is used for bringing external resources into your GraphQL schema. It makes it easier to include configurations, .proto files for gRPC services, and other files into your schema. With this directive, external resources are either merged with or used effectively in the importing configuration.

### How it Works

The `@link` directive requires specifying a source `src`, the resource's type `type`, and an optional identifier `id`.

- `src`: The source of the link is defined here. It can be either a URL or a file path. When a file path is given, it's relative to the file's location that is importing the link.

- `type`: This specifies the link's type, which determines how the imported resource is integrated into the schema. For a list of supported types, see the [Supported Types](#supported-types) section.

- `id`: This is an optional field that assigns a unique identifier to the link. It's helpful for referring to the link within the schema.

### Example

The following example illustrates how to utilize the `@link` directive to incorporate a Protocol Buffers (.proto) file for a gRPC service into your GraphQL schema.

```graphql showLineNumbers
schema
  @server(port: 8000)
  @upstream(
    baseURL: "http://news.local"
    httpCache: 42
    batch: {delay: 10}
  )
  @link(
    id: "news"
    src: "./src/grpc/news.proto"
    type: Protobuf
  ) {
  query: Query
}

type Query {
  news: NewsData!
    @grpc(method: "news.NewsService.GetAllNews")
}

type News {
  id: Int
  title: String
  body: String
  postImage: String
}

type NewsData {
  news: [News]!
}
```

### Supported Types

The `@link` directive enriches your configuration by supporting the integration of external resources. Each link type is designed to serve a specific purpose, enhancing the functionality and flexibility of your schema. Below is a detailed overview of each supported link type:

### Config

The `Config` link type is essential for importing other configuration files. This feature enables a modular approach to schema management by allowing configurations from the imported file to override overlapping settings in the main schema. This functionality is useful in large projects, where maintaining a single monolithic schema file becomes impractical. By using `Config`, developers can split their schema configurations into manageable pieces, thus promoting better organization and scalability.

Example use case:

- Modularizing schema configurations for different environments (development, staging, production).
- Reusing common configurations across multiple schema files.

### Protobuf

The `Protobuf` link type integrates Protocol Buffers definitions by importing .proto files. This integration is crucial for Tailcall to communicate with gRPC services. By including `.proto` definitions, the GraphQL server can directly interact with gRPC services, allowing for efficient and type-safe communication.

For detailed integration steps and best practices, refer to the [gRPC Integration Guide](/docs/grpc.md).

### Script

The `Script` link type allows the config to link to an external JavaScript file. This file can contain custom logic that is executed in response to HTTP request-response events. This feature enables developers to implement custom behaviors, such as adding headers to responses or filtering requests based on specific criteria.

Example script for adding a custom header to all outgoing requests:

```javascript showLineNumbers
function onRequest({request}) {
  // Add a custom header for all outgoing requests
  request.headers["X-Custom-Header"] = "Processed"

  // Return the updated request
  return {request}
}
```

### Cert

The `Cert` link type is designed for importing SSL/TLS certificates, a crucial component for enabling HTTPS in your GraphQL server. This link type ensures that the server can expose connections over HTTPS.

:::tip
When using the `Cert` link type, specify the path to the certificate file. Ensure the certificate is up-to-date and issued by a trusted certificate authority (CA) to avoid security warnings or connection issues.
:::

Example use case:

- Securing communication between the GraphQL server and clients.
- Enhancing privacy and security by encrypting data in transit.

### Key

The `Key` link type imports the private key associated with your SSL/TLS certificate, enabling HTTPS for your GraphQL server. The private key is a critical security element that decrypts information encrypted by the corresponding public key in the SSL/TLS certificate.

When configuring the `Key` link type, provide the path to your private key file. Ensure the private key matches the imported certificate specified by the [Cert](#cert) link above, and is protected by appropriate file permissions to maintain security.

### Operation

The `Operation` link type connects your schema to a set of predefined, GraphQL spec-compliant queries and mutations. This functionality allows for the validation and optimization of these operations by the GraphQL server.

Each type serves a specific purpose, enabling the flexible integration of external resources into your GraphQL schema.

### Htpasswd

The `Htpasswd` link type allows the importation of an [`htpasswd`](https://httpd.apache.org/docs/2.4/programs/htpasswd.html) file. This file is utilized to set up [Basic authentication](./auth.md#basic-authentication).

### Jwks

The `Jwks` link type enables the importation of a [`JWKS`](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets) file. This file facilitates the provision of detailed access control through [JWT authentication](./auth.md#jwt-authentication).

## @modify Directive

The `@modify` directive in GraphQL provides the flexibility to alter the attributes of a field or a node within your GraphQL schema. Here's how you can use this directive:

### name

You can rename a field or a node in your GraphQL schema using the `name` argument in the `@modify` directive. This can be helpful when the field name in your underlying data source doesn't match the desired field name in your schema. For instance:

```graphql showLineNumbers
type User {
  id: Int! @modify(name: "userId")
}
```

`@modify(name: "userId")` informs GraphQL to present the field known as `id` in the underlying data source as `userId` in your schema.

### omit

You can exclude a field or a node from your GraphQL schema using the `omit` argument in the `@modify` directive. This can be useful if you want to keep certain data hidden from the client. For instance:

```graphql showLineNumbers
type User {
  id: Int! @modify(omit: true)
}
```

`@modify(omit: true)` instructs GraphQL to exclude the `id` field from the schema, making it inaccessible to the client.

:::tip
`@omit` is a standalone directive and is an alias/shorthand for `modify(omit: true)` checkout [documentation](/docs/directives.md#omit-directive)
:::

## @omit Directive

Within a GraphQL schema, the `@omit` directive excludes fields or nodes from the generated schema, making them inaccessible through the GraphQL API. This directive is useful for hiding sensitive information or simplifying your API by removing unnecessary fields.

### How it works

When applied to a field or node, the `@omit` directive instructs the Tailcall not to include that field or node in the schema. This means that clients cannot query or mutate data in those fields.

### Example

Consider a scenario where you have a `User` type with an embedded `Address` type. If you want to exclude the `Address` type from the schema to simplify the API, you can use the `@omit` directive:

```graphql showLineNumbers
type Address {
  city: String
  street: String
}

type User {
  name: String
  address: Address @omit
}
```

In this example, the `address` field will not be accessible or visible through the GraphQL API.

### Comparison with `modify`

The `@omit` directive and `@modify(omit: true)` essentially serve the same purpose in excluding fields from the schema, but they differ in syntax and flexibility. In fact, one can consider `@omit` as a shorthand or alias for the more verbose `@modify(omit: true)`.

- `@omit` offers a concise way to directly exclude a field or node without additional arguments.

- `@modify(omit: true)`, as part of the broader [`@modify`](/docs/directives.md#omit-directive) directive, provides more options, such as field renaming through the `name` argument. This makes it a more flexible choice when you need more than field exclusion.

## @protected Directive

The `@protected` annotation designates a type or field as protected, meaning that a user must be authenticated to access that data.

```graphql
type Query {
  protected: String! @protected
  protectedType: ProtectedType
}

type ProtectedType @protected {
  name: String!
  nested: String!
}
```

:::important
To utilize the `@protected` directive, you must link at least one authentication provider in the configuration using the [`@link`](#link-directive) directive (`Htpasswd` or `Jwks`).
:::

### How It Works

- When a field is annotated with `@protected`, an authentication check is performed upon receiving the request. Depending on the authentication result, either the requested data is provided in the response, or an authentication error is returned.
- If a type is annotated with `@protected`, all fields within that type inherit the protection, requiring user authentication for any field that's queried.

## @rest Directive

API orchestration is essential, yet not all can adopt GraphQL despite its benefits. The Tailcall DSL feature leverages GraphQL at compile time to generate REST endpoints, aligning with traditional API infrastructure like CDNs and Gateways.

### Usage

- **method**: Specifies the HTTP method (GET, POST, etc.).
- **path**: Sets the endpoint URL, with support for dynamic values from query arguments.
- **query**: Defines the query parameters as key-value pairs.

### Example

Define GraphQL types and queries, using the `@rest` directive to map fields to REST API endpoints.

`schema.graphql`

```graphql
schema
  @upstream(baseURL: "https://jsonplaceholder.typicode.com")
  @link(type: Operation, src: "user-operation.graphql") {
  query: Query
}

type Query {
  user(id: Int!): User
    @rest(method: "GET", path: "/users/{{.args.id}}")
}

type User {
  id: Int!
  name: String!
  email: String!
}
```

`user-operation.graphql`

```graphql
query ($id: Int!) @rest(method: GET, path: "/user/$id") {
  user(id: $id) {
    id
    name
  }
}
```

![REST Demo](/images/docs/rest-user.png)

This example demonstrates how to define a simple query to fetch user data from a REST endpoint using the `@rest` directive. By leveraging `@rest`, GraphQL can serve as a layer over RESTful services, combining REST's simplicity with GraphQL's flexibility.

## @server Directive

The `@server` directive, applied at the schema level, provides a comprehensive set of server configurations. It dictates server behavior and helps tune Tailcall for a range of use-cases.

```graphql showLineNumbers
schema @server(...[ServerSettings]...){
    query: Query
    mutation: Mutation
}
```

In this templated structure, replace `...[ServerSettings]...` with specific configurations tailored to your project's needs. Adjust and expand these settings as necessary.

The `ServerSettings` options and their details appear below.

### workers

Setting `workers` to `32` means that the GraphQL server will use 32 worker threads.

```graphql showLineNumbers
schema @server(workers: 32) {
  query: Query
  mutation: Mutation
}
```

This example sets the `workers` to `32`, meaning the GraphQL server will use 32 worker threads.

### port

Setting the `port` to `8090` means that Tailcall will be accessible at `http://localhost:8000`.

```graphql showLineNumbers
schema @server(port: 8090) {
  query: Query
  mutation: Mutation
}
```

This example sets the `port` to `8090`, making Tailcall accessible at `http://localhost:8090`.

:::tip
Always choose non-standard ports, avoiding typical ones like 80 or 8080. Make sure your chosen port is free.
:::

### headers

Allows intelligent configuration of the final response headers that's produced by Tailcall.

### cacheControl

Activating the `cacheControl` configuration directs Tailcall to send [Cache-Control] headers in its responses. The `max-age` value in the header matches the lowest of the values in the responses that Tailcall receives from its upstream. By default, this is `false`, which means Tailcall does not set any header.

[cache-control]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control

```graphql showLineNumbers
schema @server(headers: {cacheControl: true}) {
  query: Query
  mutation: Mutation
}
```

### custom

The `custom` is an array of key-value pairs. These headers get added to the response of every request made to the server. This can be useful for adding headers like `Access-Control-Allow-Origin` to allow cross-origin requests, or some headers like `X-Allowed-Roles` for use by downstream services.

```graphql showLineNumbers
schema
  @server(
    headers: {
      custom: [
        {key: "X-Allowed-Roles", value: "admin,user"}
      ]
    }
  ) {
  query: Query
  mutation: Mutation
}
```

### experimental

When the `experimental` configuration is enabled, Tailcall can include headers starting with `X-` in its responses, which are sourced from its upstream. By default, this feature is disabled (`[]`), meaning Tailcall does not forward any such headers unless explicitly configured to do so.

```graphql showLineNumbers
schema
  @server(
    headers: {experimental: ["X-Experimental-Header"]}
  ) {
  query: Query
  mutation: Mutation
}
```

### setCookies

Enabling the `setCookies` option instructs Tailcall to include `set-cookie` headers in its responses, which are obtained from the headers of upstream responses.

[set-cookie]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/set-cookie

```graphql showLineNumbers
schema @server(headers: {setCookies: true}) {
  query: Query
  mutation: Mutation
}
```

### cors

The `cors` configuration allows you to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) on Tailcall. This is useful when you want to access Tailcall in the browser. Here is a simple configuration to get started with cors:

```graphql showLineNumbers
schema
  @server(
    headers: {
      cors: {allowHeaders: ["*"], allowOrigins: ["*"]}
    }
  ) {
  query: Query
}
```

The above setting will enable CORS on the server for all headers, origins & methods. You can further configure the cors settings to make it more secure with the following fields:

- `allowCredentials`: Indicates whether the server allows credentials (e.g., cookies, authorization headers) to be sent in cross-origin requests.
- `allowHeaders`: A list of allowed headers in cross-origin requests. This can be used to specify custom headers that are allowed to be included in cross-origin requests.
- `allowMethods`: A list of allowed HTTP methods in cross-origin requests. These methods specify the actions that are permitted in cross-origin requests.
- `allowOrigins`: A list of origins that are allowed to access the server's resources in cross-origin requests. An origin can be a domain, a subdomain, or even 'null' for local file schemes.
- `allowPrivateNetwork`: Indicates whether requests from private network addresses are allowed in cross-origin requests. Private network addresses typically include IP addresses reserved for internal networks.
- `exposeHeaders`: A list of headers that the server exposes to the browser in cross-origin responses. Exposing certain headers allows client-side code to access them in the response.
- `maxAge`: The maximum time (in seconds) that the client should cache preflight OPTIONS requests to avoid sending excessive requests to the server.
- `vary`: A list of header names that indicate the values of which might cause the server's response to vary, potentially affecting caching.

```graphql showLineNumbers
schema
  @server(
    port: 8000
    hostname: "0.0.0.0"
    headers: {
      cors: {
        allowCredentials: false
        allowHeaders: ["Authorization"]
        allowMethods: [POST, GET, OPTIONS]
        allowOrigins: ["abc.xyz"]
        allowPrivateNetwork: true
        exposeHeaders: ["Content-Type"]
        maxAge: 360
        vary: ["Origin"]
      }
    }
  ) {
  query: Query
}
```

### vars

This configuration allows defining local variables for use during the server's operations. These variables are handy for storing constant configurations, secrets, or other shared information that operations might need.

```graphql showLineNumbers
schema
  @server(
    vars: {key: "apiKey", value: "YOUR_API_KEY_HERE"}
  ) {
  query: Query
  mutation: Mutation
}

type Query {
  externalData: Data
    @http(
      path: "/external-api/data"
      headers: [
        {
          key: "Authorization"
          value: "Bearer {{.vars.apiKey}}"
        }
      ]
    )
}
```

In the provided example, setting a variable named `apiKey` with a placeholder value of "YOUR_API_KEY_HERE" implies that whenever Tailcall fetches data from the `externalData` endpoint, it includes the `apiKey` in the Authorization header of the HTTP request.

:::tip
Local variables, like `apiKey`, are instrumental in securing access to external services or providing a unified place for configurations. Ensure that sensitive information stored this way is well protected and not exposed unintentionally, if your GraphQL configuration is publicly accessible.
:::

### introspection

This setting controls the server's allowance of introspection queries. Introspection, a core feature of GraphQL, allows clients to directly fetch schema information. This capability proves crucial for tools and client applications in comprehending the available types, fields, and operations. By default, the server enables this setting (`true`).

```graphql showLineNumbers
schema @server(introspection: false) {
  query: Query
  mutation: Mutation
}
```

:::tip
Although introspection is beneficial during development and debugging stages, consider disabling it in production environments. Turning off introspection in live deployments can enhance security by preventing potential attackers from discerning the schema and any associated business logic or data structures.
:::

### queryValidation

The `queryValidation` configuration determines if the server checks incoming GraphQL queries against the defined schema. Each query check ensures it matches the schema, preventing errors from incorrect or malformed queries. In some situations, you might want to disable it, notably to **enhance server performance** at the cost of these checks. This defaults to `false` if not specified.

```graphql showLineNumbers
schema @server(queryValidation: true) {
  query: Query
  mutation: Mutation
}
```

The example above sets `queryValidation` to `true`, enabling the validation phase for incoming queries.

:::tip
Enable this in the development environment to ensure the queries sent are correct and validated. In the production environment, consider disabling it for improved performance.
:::

### responseValidation

Tailcall can automatically infer the schema of the HTTP endpoints for you. This information can check responses received from the upstream services. Enabling this setting allows you to do that. If not specified, the default setting for `responseValidation` is `false`.

```graphql showLineNumbers
schema @server(responseValidation: true) {
  query: Query
  mutation: Mutation
}
```

:::tip
Disabling this setting will offer major performance improvements, but at the potential expense of data integrity.
:::

### globalResponseTimeout

The `globalResponseTimeout` configuration sets the max duration a query can run before the server terminates it. Essentially, it acts as a safeguard against long-running queries that could strain resources or pose security concerns.

If not explicitly defined, there might be a system-specific or default value that applies.

```graphql showLineNumbers
schema @server(globalResponseTimeout: 5000) {
  query: Query
  mutation: Mutation
}
```

In this given example, setting the `globalResponseTimeout` to `5000` milliseconds, or 5 seconds, means any query execution taking longer than this duration will be automatically terminated by

:::tip
Setting an appropriate response timeout in production environments is crucial. This optimizes resource use and serves as a security measure against potential denial-of-service attacks, where adversaries might run complex queries to exhaust server resources.
:::

### version

The server uses the HTTP version. If not specified, the default value is `HTTP1`. The available options are `HTTP1` and `HTTP2`.

```graphql showLineNumbers
schema @server(version: HTTP2) {
  query: Query
  mutation: Mutation
}
```

### cert

The path to certificate(s) for running the server over HTTP2 (HTTPS). If not specified, the default value is `null`.

```graphql showLineNumbers
schema @server(cert: "./cert.pem") {
  query: Query
  mutation: Mutation
}
```

<!-- prefer to use standard extension libraries -->

:::tip
The certificate can be of any extension, but it's highly recommended to use standards (`pem`, `crt`, `key`).
:::

### key

The path to the key for running the server over HTTP2 (HTTPS). If not specified, the default value is `null`.

```graphql showLineNumbers
schema @server(key: "./key.pem") {
  query: Query
  mutation: Mutation
}
```

:::tip
The key can be of any extension, but it's highly recommended to use standards (`pem`, `crt`, `key`).
:::

### showcase

The `@server` directive's `showcase` option allows for hands-on experimentation with server configurations in a controlled environment. This feature simplifies the process of exploring and testing different settings.

```graphql showLineNumbers
schema @server(showcase: true) {
  query: Query
}
```

### batchRequests

Batching in GraphQL combines requests into one, reducing server round trips.

```graphql showLineNumbers
schema @server(
  port: 8000
  batchRequests: true
)
```

### Trade-offs

Batching can improve performance but may introduce latency if one request in the batch takes longer. It also makes network traffic debugging harder.

## @telemetry Directive

The `@telemetry` directive facilitates seamless integration with [OpenTelemetry](https://open-telemetry.io), enhancing the observability of your GraphQL services powered by Tailcall. By leveraging this directive, developers gain access to valuable insights into the performance and behavior of their applications.

### Traces

Here are the traces that are captured by the `@telemetry` directive:

|                        Trace Name | Description                                                                                                                                                                                     |
| --------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                           request | Captures the span for processing the HTTP request on the server side, providing foundational observability.                                                                                     |
|                           graphQL | _Only for GraphQL ingress_. Span for processing GraphQL call                                                                                                                                    |
| `REST <http_method> <http_route>` | _Only for REST ingress_. Span for processing REST API call                                                                                                                                      |
|                    `<field_name>` | Denotes spans for fields with defined resolvers, offering insights into field names and execution times for resolver logic.                                                                     |
|                     `<expr_name>` | Nested within the `<field_name>` spans, these granulated spans detail the execution of expressions in resolving a field, highlighting the hierarchical execution pattern of nested expressions. |
|                  upstream_request | Request that were made from tailcall service to upstream                                                                                                                                        |

### Metrics

The `@telemetry` directive also captures the following metrics:

|                    Metric | Description                                                                                                                                     |
| ------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------- |
|            cache.hit_rate | Reflects the cache hit rate for the cache powered by the [`@cache`](#cache-directive) directive                                                 |
| http.server.request.count | Counts the number of incoming requests made to specific route. Optionally enriched with selected headers by [`requestHeaders`](#requestheaders) |
| http.client.request.count | Counts the number of outgoing requests to specific upstream                                                                                     |

### export

The `export` field defines how the open-telemetry data should be exported and in which format. The following are the supported formats:

### otlp

Utilizes the OTLP format to export telemetry data to backend systems, supported by most modern tracing and analytics platforms. Here is an example using [honeycomb.io]:

[honecomb.io]: https://www.honeycomb.io/

```graphql
schema
  @telemetry(
    export: {
      otlp: {
        url: "https://api.honeycomb.io:443"
        headers: [
          {
            key: "x-honeycomb-team"
            value: "{{.env.HONEYCOMB_API_KEY}}"
          }
          {key: "x-honeycomb-dataset", value: "tailcall"}
        ]
      }
    }
  ) {
  query: Query
}
```

You can configure the OTLP exporter with the following options:

|   Field | Description                                                 |
| ------: | ----------------------------------------------------------- |
|     url | Defines the URL for the OTLP Collector.                     |
| headers | Sets additional headers for requests to the OTLP Collector. |

### prometheus

Facilitates metrics export in a Prometheus compatible format, providing a dedicated endpoint for metrics.

```graphql
schema
  @telemetry(export: {prometheus: {path: "/metrics"}}) {
  query: Query
}
```

You can configure the Prometheus exporter with the following options:

|  Field | Description                                                                        |
| -----: | ---------------------------------------------------------------------------------- |
|   path | Designates the endpoint path for Prometheus metrics, defaulting to `/metrics`.     |
| format | Controls the format viz. **text** or **protobuf**, for sending data to Prometheus. |

### stdout

Outputs all telemetry data to stdout, ideal for testing or local development environments.

```graphql
schema @telemetry(export: {stdout: {pretty: true}}) {
  query: Query
}
```

You can configure the stdout exporter with the following options:

|  Field | Description                                                          |
| -----: | -------------------------------------------------------------------- |
| pretty | Enables formatted output of telemetry data for enhanced readability. |

### requestHeaders

Specifies list of headers of ingress request the value of which will be sent to the telemetry as attributes.

```graphql
schema @telemetry(requestHeaders: ["X-User-Id"]) {
  query: Query
}
```

### apollo

Facilitates seamless integration with [Apollo Studio](https://studio.apollographql.com/), enhancing the observability of GraphQL services. By leveraging this field, developers gain access to valuable insights into the performance and behavior of their GraphQL APIs.

```graphql
schema
  @telemetry(
    export: {
      otlp: {
        api_key: "{{.env.APOLLO_API_KEY}}"
        graph_ref: "graph-id@current"
        platform: "website.com"
        version: "1.0.0"
      }
    }
  ) {
  query: Query
}
```

You can configure the apollo exporter with the following options:

|     Field | Description                                                                                                                                                   |
| --------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   api_key | The API Key generated from Apollo Studio.                                                                                                                     |
| graph_ref | The Graph Ref, which is the `graph_id` and the `variant` concatenated using `@`(i.e. \<graph_id\>@\<variant\>)                                                |
|  platform | An arbitrary value which can contain the name of your website or some other value to identify your deployment uniqely, in case you have multiple deployments. |
|   version | Version of Apollo which is being used.                                                                                                                        |

By integrating the `@telemetry` directive into your GraphQL schema, you empower your development teams with critical insights into application performance, enabling proactive optimization and maintenance.

## @upstream Directive

The `upstream` directive enables control over specific aspects of the upstream server connection, including settings such as connection timeouts, keep-alive intervals, and more. The system applies default values if you do not specify them.

```graphql showLineNumbers
schema @upstream(...[UpstreamSetting]...){
    query: Query
    mutation: Mutation
}
```

The document below details the options for `UpstreamSetting`.

### poolIdleTimeout

The connection pool waits for this duration in seconds before closing idle connections.

```graphql showLineNumbers
schema
  @upstream(
    poolIdleTimeout: 60
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

### poolMaxIdlePerHost

The max number of idle connections each host will maintain.

```graphql showLineNumbers
schema
  @upstream(
    poolMaxIdlePerHost: 60
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

### keepAliveInterval

The time in seconds between each keep-alive message sent to maintain the connection.

```graphql showLineNumbers
schema
  @upstream(
    keepAliveInterval: 60
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

### keepAliveTimeout

The time in seconds that the connection will wait for a keep-alive message before closing.

```graphql showLineNumbers
schema
  @upstream(
    keepAliveTimeout: 60
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

### keepAliveWhileIdle

A boolean value that determines whether to send keep-alive messages while the connection is idle.

```graphql showLineNumbers
schema
  @upstream(
    keepAliveWhileIdle: false
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

### proxy

The `proxy` setting defines an intermediary server that routes upstream requests before they reach their intended endpoint. By specifying a proxy URL, you introduce a layer, enabling custom routing and security policies.

```graphql showLineNumbers
schema
  @upstream(
    proxy: {url: "http://localhost:3000"}
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

In the provided example, we've set the proxy's `url` to "http://localhost:3000". This configuration ensures that all requests aimed at the designated `baseURL` first go through this proxy. To illustrate, if the `baseURL` is "http://jsonplaceholder.typicode.com", any request targeting it initially goes to "http://localhost:3000" before the proxy redirects it to its final destination.

### connectTimeout

The time in seconds that the connection will wait for a response before timing out.

```graphql showLineNumbers
schema
  @upstream(
    connectTimeout: 60
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

### timeout

The max time in seconds that the connection will wait for a response.

```graphql showLineNumbers
schema
  @upstream(
    timeout: 60
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

### tcpKeepAlive

The time in seconds between each TCP keep-alive message sent to maintain the connection.

```graphql showLineNumbers
schema
  @upstream(
    tcpKeepAlive: 60
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

### userAgent

The User-Agent header value for HTTP requests.

```graphql showLineNumbers
schema
  @upstream(
    userAgent: "Tailcall/1.0"
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

### allowedHeaders

The `allowedHeaders` configuration defines a set of whitelisted HTTP headers that can be forwarded to upstream services during requests.
Without specifying `allowedHeaders`, the system will not forward any incoming headers to upstream services, offering an extra security layer but potentially limiting necessary data flow. Tailcall compares the provided whitelisted headers in a case-insensitive format.

```graphql showLineNumbers
schema
  @upstream(
    allowedHeaders: ["Authorization", "X-Api-Key"]
  ) {
  query: Query
  mutation: Mutation
}
```

In the example above, the configuration for `allowedHeaders` permits `Authorization` and `X-Api-Key` headers. Thus, requests with these headers will forward them to upstream services; the system ignores all others. This configuration ensures communication of the expected headers to dependent services, emphasizing security and consistency.

### baseURL

This refers to the default base URL for your APIs. If it's not explicitly mentioned in the `@upstream` directive, then each [`@http`](#http-directive) directive must specify its own `baseURL`. If neither `@upstream` nor [`@http`](#http-directive) provides a `baseURL`, it results in a compilation error.

```graphql showLineNumbers
schema
  @upstream(
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

In this representation, `http://jsonplaceholder.typicode.com` serves as the `baseURL`. Thus, all API calls made by `@http` prepend this URL to their respective paths.

:::tip
Ensure that your base URL remains free from specific path segments.

- **GOOD:** `@upstream(baseURL: http://jsonplaceholder.typicode.com)`
- **BAD:** `@upstream(baseURL: http://jsonplaceholder.typicode.com/api)`

:::

### httpCache

When httpCache passed with value greater than 0 it directs Tailcall to use HTTP caching mechanisms, following the [HTTP Caching RFC](https://tools.ietf.org/html/rfc7234) to enhance performance by minimizing unnecessary data fetches. If left unspecified, this feature defaults to `0` disabling the caching mechanism.

```graphql showLineNumbers
schema @upstream(httpCache: 42) {
  query: Query
  mutation: Mutation
}
```

### Tips

- Use batching when other optimization techniques fail to resolve performance issues.
- Apply batching and thoroughly assess its impact.
- Understand that batching may make debugging more challenging.

### batch

An object that specifies the batch settings, including `maxSize` (the max size of the batch), `delay` (the delay in milliseconds between each batch), and `headers` (an array of HTTP headers that the batch will include).

```graphql showLineNumbers
schema
  @upstream(
    batch: {
      maxSize: 1000
      delay: 10
      headers: ["X-Server", "Authorization"]
    }
  ) {
  query: Query
  mutation: Mutation
}
```

### dedupe

A boolean flag, if set to `true`, will ensure no HTTP, GRPC, or any other IO call is made more than once within the context of a single GraphQL request. If not specified, this feature defaults to `false`.

```graphql showLineNumbers
schema @upstream(dedupe: true) {
  query: Query
  mutation: Mutation
}
```

### onRequest

Similar to the [@http](#http-directive) property, this accepts a string value representing a middleware function defined in a JavaScript file. It intercepts all outgoing HTTP requests from the server. This interceptor, written in JavaScript, can be used to modify outgoing requests and also generate artificial responses to customize the behavior of the GraphQL server.

```graphql showLineNumbers
schema @upstream(onRequest: 'someFunctionName')
@link(type: Script, src: "path_to/worker.js") {
  query: Query
  mutation: Mutation
}
```
