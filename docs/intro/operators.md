---
title: Operators
sidebar_position: 4
---

Tailcall DSL builds on your existing GraphQL knowledge by allowing the addition of some custom operators. These operators provide powerful compile time guarantees to make sure your API composition is tight and robust. The operator information is used to automatically generates highly optimized resolver logic for your types.

## @server

The `@server` directive, when applied at the schema level, offers a comprehensive set of server configurations. It dictates how the server behaves and helps tune tailcall for various use-cases.

```graphql showLineNumbers
schema @server(...[ServerSettings]...){
    query: Query
    mutation: Mutation
}
```

In this templated structure, replace `...[ServerSettings]...` with specific configurations tailored to your project's needs. Adjust and expand these settings as necessary.

The various `ServerSettings` options and their details are explained below.

### port

This refers to the `port` on which the Tailcall will be running. If not specified, the default port is `8000`.

```graphql showLineNumbers
schema @server(port: 8090) {
  query: Query
  mutation: Mutation
}
```

In this example, the `port` is set to `8090`. This means that the Tailcall will be accessible at `http://localhost:8090`.

:::tip
Always lean towards non-standard ports, steering clear of typical ones like 80 or 8080. Ensure your chosen port is unoccupied.
:::

### baseURL

This refers to the default base URL for your APIs. If it's not explicitly mentioned in the `@server` operator, then each [@http](#http) operator must specify its own `baseURL`. If neither `@server` nor [@http](#http) provides a `baseURL`, it results in a compilation error.

```graphql showLineNumbers
schema @server(baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

In this representation, the `baseURL` is set as `http://jsonplaceholder.typicode.com`. Thus, all API calls made by `@http` will prepend this URL to their respective paths.

:::tip
Ensure that your base URL remains free from specific path segments.

- **GOOD:** `@server(baseURL: http://jsonplaceholder.typicode.com)`
- **BAD:** `@server(baseURL: http://jsonplaceholder.typicode.com/api)`

:::

### enableHttpCache

The `enableHttpCache` configuration, when activated, directs Tailcall to utilize HTTP caching mechanisms. These mechanisms, in accordance with the [HTTP Caching RFC](https://tools.ietf.org/html/rfc7234), are designed to improve performance by reducing unnecessary data fetches. If left unspecified, this feature defaults to `false`.

```graphql showLineNumbers
schema @server(enableHttpCache: true) {
  query: Query
  mutation: Mutation
}
```

### enableCacheControlHeader

The `enableCacheControlHeader` configuration, when activated, instructs Tailcall to transmit [Cache-Control] headers in its responses. The `max-age` value in the header, is the least of the values in the responses received by tailcall from the upstream services. By default, this is set to `false` meaning no header is set.

[Cache-Control]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control

```graphql showLineNumbers
schema @server(enableCacheControlHeader: true) {
  query: Query
  mutation: Mutation
}
```

### enableGraphiql

This configuration dictates the path on which the GraphiQL interface is hosted within Tailcall. [GraphiQL](https://github.com/graphql/graphiql) is a built-in, interactive in-browser GraphQL IDE that simplifies query development and testing. By designating a path, such as `/graphiql`, you grant access to this IDE at that specific URL endpoint, like `http://localhost:8000/graphiql`. If not provided, GraphiQL won't be available. It's a ready-to-use feature in Tailcall, requiring no additional setup.

```graphql showLineNumbers
schema @server(port: 8000, enableGraphiql: "/graphiql") {
  query: Query
  mutation: Mutation
}
```

:::tip
While the GraphiQL interface is a powerful tool for development, it's recommended to disable it in production environments, especially if you're not exposing GraphQL APIs directly to users. This ensures an added layer of security and reduces unnecessary exposure.
:::

### proxy

The `proxy` setting defines an intermediary server through which the upstream requests will be routed before reaching their intended endpoint. By specifying a proxy URL, you introduce an additional layer, enabling custom routing and security policies.

```graphql showLineNumbers
schema
  @server(
    proxy: {url: "http://localhost:3000"}
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
  mutation: Mutation
}
```

In the provided example, we've set the proxy's `url` to "http://localhost:3000". This configuration ensures that all requests aimed at the designated `baseURL` are first channeled through this proxy. To illustrate, if the `baseURL` is "http://jsonplaceholder.typicode.com", any request targeting it would be initially sent to "http://localhost:3000" before being redirected to its final destination.

### vars

This configuration allows you to define local variables that can be leveraged during the server's operations. These variables are particularly handy when you need to store constant configurations, secrets, or other shared information that various operations might require.

```graphql showLineNumbers
schema @server(
  vars: {key: "apiKey", value: "YOUR_API_KEY_HERE"}
){
    query: Query
    mutation: Mutation
}

type Query {
  externalData: Data @http(
    path: "/external-api/data",
    headers: [{key: "Authorization", value: "Bearer {{vars.apiKey}}"}]
  )
}
```

In the provided example, a variable named `apiKey` is set with a placeholder value of "YOUR_API_KEY_HERE". This configuration implies that whenever Tailcall fetches data from the `externalData` endpoint, it includes the `apiKey` in the Authorization header of the HTTP request.

:::tip
Local variables, like `apiKey`, can be instrumental in securing access to external services or providing a unified place for configurations. Ensure that sensitive information stored this way is well protected and not exposed unintentionally, especially if your Tailcall configuration is publicly accessible.
:::

### enableIntrospection

This setting governs whether introspection queries are permitted on the server. Introspection is an intrinsic feature of GraphQL, allowing clients to fetch information about the schema directly. This can be instrumental for tools and client applications to understand the types, fields, and operations available. By default, this setting is enabled (`true`).

```graphql showLineNumbers
schema @server(enableIntrospection: false) {
  query: Query
  mutation: Mutation
}
```

:::tip
Although introspection is beneficial during development and debugging stages, it's wise to consider disabling it in production environments. Turning off introspection in live deployments can enhance security by preventing potential attackers from easily discerning the schema and any associated business logic or data structures.
:::

### enableQueryValidation

The `enableQueryValidation` configuration specifies whether the server should validate incoming GraphQL queries against the defined schema. Validating each query ensures its conformity to the schema, preventing errors from invalid or malformed queries. However, there are situations where you might opt to disable it, notably when seeking to **enhance server performance** at the cost of such checks. This defaults to `true` if not specified.

```graphql showLineNumbers
schema @server(enableQueryValidation: false) {
  query: Query
  mutation: Mutation
}
```

In the example above, `enableQueryValidation` is set to `false`, bypassing the validation phase for incoming queries.

:::tip
This should be enabled in dev environment to make sure the queries sent are correct and validated, however in production env, you could consider disabling it for improved performance.
:::

### enableResponseValidation

Tailcall automatically can infer the schema of the http endpoints for you. This information can be used to validate responses that are received from the upstream services. Enabling this setting allows you to perform exactly that. If this is not specified, the default setting for `enableResponseValidation` is `false`.

```graphql showLineNumbers
schema @server(enableResponseValidation: true) {
  query: Query
  mutation: Mutation
}
```

:::tip
Disabling this setting will offer major performance improvements, but at the potential expense of data.
:::

### globalResponseTimeout

The `globalResponseTimeout` configuration determines the maximum duration a query is allowed to run before it's terminated by the server. Essentially, it acts as a safeguard against long-running queries that could strain resources or pose security concerns.

If not explicitly defined, there might be a system-specific or default value that applies.

```graphql showLineNumbers
schema @server(globalResponseTimeout: 5000) {
  query: Query
  mutation: Mutation
}
```

In this given example, the `globalResponseTimeout` is set to `5000` milliseconds, or 5 seconds. This means any query execution taking longer than this duration will be automatically terminated by the server.

:::tip
It's crucial to set an appropriate response timeout, especially in production environments. This not only optimizes resource utilization but also acts as a security measure against potential denial-of-service attacks where adversaries might run complex queries to exhaust server resources.
:::

### allowedHeaders

The `allowedHeaders` configuration specifies which HTTP headers are permitted to be forwarded to upstream services when making requests.
If `allowedHeaders` isn't specified, no incoming headers will be forwarded to the upstream services, which can provide an added layer of security but might restrict essential data flow.

```graphql showLineNumbers
schema @server(allowedHeaders: ["Authorization", "X-Api-Key"]) {
  query: Query
  mutation: Mutation
}
```

In the example above, the `allowedHeaders` is set to allow only `Authorization` and `X-Api-Key` headers. This means that requests containing these headers will forward them to upstream services, while all others will be ignored. It ensures that only expected headers are communicated to dependent services, emphasizing security and consistency.

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
    @http(path: "/posts", query: [{key: "userId", value: "{{args.id}}"}])
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

### headers

The `headers` parameter allows you to customize the headers of the HTTP request made by the `@http` operator. It is used by specifying a key-value map of header names and their values.

For instance:

```graphql showLineNumbers
type Mutation {
  createUser(input: UserInput!): User
    @http(path: "/users", headers: [{key: "X-Server", value: "Tailcall"}])
}
```

In this example, a request to `/users` will include an additional HTTP header `X-Server` with the value `Tailcall`.

You can make use of mustache templates to provide dynamic values for headers, derived from the arguments or [context] provided in the request. For example:

[context]: /docs/intro/context

```graphql showLineNumbers
type Mutation {
  users(name: String): User
    @http(path: "/users", headers: [{key: "X-Server", value: "Tailcall"}, {key: "User-Name", value: "{{args.name}}"}])
}
```

In this scenario, the `User-Name` header's value will dynamically adjust according to the `name` argument passed in the request.

## @batch

The `@batch` operator in Tailcall groups multiple data requests into a single call. It works together with the `@http` operator. For more details please refer out [n + 1 guide].

[n + 1 guide]: /docs/guides/n+1#solving-using-batching

```graphql showLineNumbers
type Post {
  id: Int!
  name: String!
  user: User
    @http(path: "/users", query: {key: "id", value: "{{parent.value.userId}}"}])
    @batch(key: "userId", path: ["id"])
}
```

- `query: {key: "id", value: "{{parent.value.userId}}"}]`: Here, TailCall CLI is instructed to generate a URL where the user id aligns with the `userId` from the parent `Post`. For a batch of posts, the CLI compiles a single URL, such as `/users?id=1&id=2&id=3...id=10`, consolidating multiple requests into one.

### path

This parameter instructs the system to convert the list of responses into a map internally, using the user's `id` as the unique key. In essence, it allows the system to differentiate each user value in the response list.

### key

This parameter matches the `userId` from the `Post` object to the user data in the batched request response. This correlation is crucial for associating the `Post` to its relevant `User`.

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

:::info
It is important to note that the order of the operators doesn't matter. The resulting schema will always be the same.
:::

This is a powerful mechanism that allows you to make your GraphQL schema more precise, easier to understand, and more suitable for the specific needs of your application.
