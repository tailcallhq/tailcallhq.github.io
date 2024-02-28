---
title: "@http"
---

The **@http** operator indicates a field or node relies on a REST API. For example:

```graphql showLineNumbers
type Query {
  users: [User] @http(path: "/users")
}
```

In this example, adding the `@http` operator to the `users` field of the `Query` type indicates reliance on a REST API for the `users` field. The [path](#path) argument specifies the REST API's path, which is `/users` in this scenario.Querying the `users` field prompts the GraphQL server to issue a GET request to `https://jsonplaceholder.typicode.com/users`.

## baseURL

Specifies the API's base URL. If unspecified, it defaults to the URL in the [@upstream](#upstream) operator.

```graphql showLineNumbers
type Query {
  users: [User] @http(path: "/users", baseURL: "https://jsonplaceholder.typicode.com")
}
```

## path

Refers to the API endpoint, for example, `https://jsonplaceholder.typicode.com/users`.

```graphql showLineNumbers
type Query {
  users: [User] @http(path: "/users")
}
```

If your API endpoint contains dynamic segments, you can substitute variables using Mustache templates. For example, to fetch a specific user, you can write the path as `/users/{{args.id}}`.

```graphql showLineNumbers
type Query {
  user(id: ID!): User @http(path: "/users/{{args.id}}")
}
```

## method

Specifies the HTTP method for the API call. The default method is GET if not specified.

```graphql showLineNumbers
type Mutation {
  createUser(input: UserInput!): User @http(method: "POST", path: "/users")
}
```

## query

Represents the API call's query parameters, either as a static object or with dynamic parameters using Mustache templates. These parameters append to the URL.

```graphql showLineNumbers
type Query {
  userPosts(id: ID!): [Post] @http(path: "/posts", query: [{key: "userId", value: "{{args.id}}"}])
}
```

## body

Defines the API call's body, necessary for methods like POST or PUT. Pass it as a static object or use Mustache templates for variable substitution from the GraphQL variables.

```graphql showLineNumbers
type Mutation {
  createUser(input: UserInput!): User @http(method: "POST", path: "/users", body: "{{args.input}}")
}
```

In the example above, the `createUser` mutation sends a POST request to `/users`, with the input object converted to JSON and included in the request body.

## headers

Customizes the HTTP request headers made by the **@http** operator. Specify a key-value map of header names and values.

For instance:

```graphql showLineNumbers
type Mutation {
  createUser(input: UserInput!): User @http(path: "/users", headers: [{key: "X-Server", value: "Tailcall"}])
}
```

In this example, a request to `/users` will include a HTTP header `X-Server` with the value `Tailcall`.

You can make use of mustache templates to provide dynamic values for headers, derived from the arguments or [context] provided in the request. For example:

[context]: /docs/guides/context

```graphql showLineNumbers
type Mutation {
  users(name: String): User
    @http(path: "/users", headers: [{key: "X-Server", value: "Tailcall"}, {key: "User-Name", value: "{{args.name}}"}])
}
```

In this scenario, the `User-Name` header's value will dynamically adjust according to the `name` argument passed in the request.

## groupBy

Groups data requests into a single call, enhancing efficiency. Refer to our [n + 1 guide] for more details.

[n + 1 guide]: /docs/guides/n+1#solving-using-batching

```graphql showLineNumbers
type Post {
  id: Int!
  name: String!
  user: User @http(path: "/users", query: [{key: "id", value: "{{value.userId}}"}], groupBy: ["id"])
}
```

- `query: {key: "id", value: "{{value.userId}}"}]`: Instructs TailCall CLI to generate a URL aligning the user id with `userId` from the parent `Post`, compiling a single URL for a batch of posts, such as `/users?id=1&id=2&id=3...id=10`, consolidating requests into one.
