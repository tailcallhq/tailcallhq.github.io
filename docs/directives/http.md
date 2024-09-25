---
title: Using @http Directive
description: Learn how to leverage the @http directive in GraphQL to interact with REST APIs, including customizable request methods, dynamic paths, and query parameters for efficient data fetching.
slug: http-directive
sidebar_label: HTTP Directive
---

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
      query: [
        {
          key: "userId"
          value: "{{.args.id}}"
          skipEmpty: false
        }
      ]
    )
}
```

The `query` field and be further configured using the following fields:

1. **key** : Represents the name of the query parameter.
2. **value** : A string literal or a mustache template representing the value of query parameter.
3. **skipEmpty** : When set to `true` the query parameter is skipped if the value of the parameter is null, defaults to false.

:::important
When `batchKey` is present, Tailcall considers the first `query` parameter to be the batch query key, so remember to adjust the order of the items accordingly.
:::

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

:::important
When `batchKey` is present, Tailcall considers the first `query` parameter to be the batch query key, so remember to adjust the order of the items accordingly. Whereas, the last item from `batchKey` is used to instruct which field is the ID of an object. In case that the returned result is a nested property `batchKey` can be used as a path to extract and group the items for the returned result.
:::

```graphql showLineNumbers
type Post {
  id: Int!
  name: String!
  user: User
    @http(
      path: "/users"
      query: [{key: "user_id", value: "{{.value.userId}}"}]
      batchKey: ["users", "id"]
    )
}
```

- `query: {key: "user_id", value: "{{.value.userId}}"}]`: Instructs Tailcall CLI to generate a URL aligning the user id with `userId` from the parent `Post`, compiling a single URL for a batch of posts, such as `/users?user_id=1&user_id=2&user_id=3...user_id=10`, consolidating requests into one.

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

### onResponseBody

This hook allows you to intercept and modify the response body from upstream services before it's processed by Tailcall. Like [onRequest](/docs/directives.md#onrequest), it accepts a string value representing a middleware function defined in a JavaScript file. This function can be used to transform or validate the response data.

```graphql showLineNumbers
type Query {
  user(id: Int!): User
    @http(
      path: "/users/{{.args.id}}"
      onResponseBody: "onResponse"
    )
}
```
