---
title: "@server"
---

The `@server` directive, applied at the schema level, provides a comprehensive set of server configurations. It dictates server behavior and helps tune Tailcall for a range of use-cases.

```graphql showLineNumbers
schema @server(...[ServerSettings]...){
    query: Query
    mutation: Mutation
}
```

In this templated structure, replace `...[ServerSettings]...` with specific configurations tailored to your project's needs. Adjust and expand these settings as necessary.

The `ServerSettings` options and their details appear below.

## workers

Setting `workers` to `32` means that the Tailcall server will use 32 worker threads.

```graphql showLineNumbers
schema @server(workers: 32) {
  query: Query
  mutation: Mutation
}
```

This example sets the `workers` to `32`, meaning the Tailcall server will use 32 worker threads.

## port

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

## headers

`headers` contains key-value pairs that are included as default headers in server responses, allowing for consistent header management across all responses.

The documentation for supported headers is available in [headers](headers.md) 

```graphql showLineNumbers
schema @server(headers: { cacheControl: true }) {
  query: Query
  mutation: Mutation
}
```

## graphiql

Enabling the `graphiql` configuration activates the GraphiQL IDE at the root (/) path within Tailcall. GraphiQL is a built-in, interactive in-browser GraphQL IDE, designed to streamline query development and testing. By default, this feature is off.

```graphql showLineNumbers
schema @server(port: 8000, graphiql: true) {
  query: Query
  mutation: Mutation
}
```

:::tip
While the GraphiQL interface is a powerful tool for development, consider disabling it in production environments if you're not exposing GraphQL APIs directly to users. This ensures an added layer of security and reduces unnecessary exposure.
:::

## vars

This configuration allows defining local variables for use during the server's operations. These variables are handy for storing constant configurations, secrets, or other shared information that operations might need.

```graphql showLineNumbers
schema @server(vars: {key: "apiKey", value: "YOUR_API_KEY_HERE"}) {
  query: Query
  mutation: Mutation
}

type Query {
  externalData: Data
    @http(path: "/external-api/data", headers: [{key: "Authorization", value: "Bearer {{vars.apiKey}}"}])
}
```

In the provided example, setting a variable named `apiKey` with a placeholder value of "YOUR_API_KEY_HERE" implies that whenever Tailcall fetches data from the `externalData` endpoint, it includes the `apiKey` in the Authorization header of the HTTP request.

:::tip
Local variables, like `apiKey`, are instrumental in securing access to external services or providing a unified place for configurations. Ensure that sensitive information stored this way is well protected and not exposed unintentionally, if your Tailcall configuration is publicly accessible.
:::

## introspection

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

## queryValidation

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

## responseValidation

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

## responseHeaders

The `responseHeader` is an array of key-value pairs. These headers get added to the response of every request made to the server. This can be useful for adding headers like `Access-Control-Allow-Origin` to allow cross-origin requests, or some headers like `X-Allowed-Roles` for use by downstream services.

```graphql showLineNumbers
schema @server(responseHeaders: [{key: "X-Allowed-Roles", value: "admin,user"}]) {
  query: Query
  mutation: Mutation
}
```

## globalResponseTimeout

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

## version

The server uses the HTTP version. If not specified, the default value is `HTTP1`. The available options are `HTTP1` and `HTTP2`.

```graphql showLineNumbers
schema @server(version: HTTP2) {
  query: Query
  mutation: Mutation
}
```

## cert

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

## key

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

## batchRequests

Batching in GraphQL combines requests into one, reducing server round trips.

```graphql showLineNumbers
schema @server(
  port: 8000
  batchRequests: true
)
```

### Trade-offs

Batching can improve performance but may introduce latency if one request in the batch takes longer. It also makes network traffic debugging harder.
