---
title: "@upstream"
---

The `upstream` directive enables control over specific aspects of the upstream server connection, including settings such as connection timeouts, keep-alive intervals, and more. The system applies default values if you do not specify them.

```graphql showLineNumbers
schema @upstream(...[UpstreamSetting]...){
    query: Query
    mutation: Mutation
}
```

The document below details the options for `UpstreamSetting`.

## poolIdleTimeout

The connection pool waits for this duration in seconds before closing idle connections.

```graphql showLineNumbers
schema @upstream(poolIdleTimeout: 60, baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

## poolMaxIdlePerHost

The max number of idle connections each host will maintain.

```graphql showLineNumbers
schema @upstream(poolMaxIdlePerHost: 60, baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

## keepAliveInterval

The time in seconds between each keep-alive message sent to maintain the connection.

```graphql showLineNumbers
schema @upstream(keepAliveInterval: 60, baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

## keepAliveTimeout

The time in seconds that the connection will wait for a keep-alive message before closing.

```graphql showLineNumbers
schema @upstream(keepAliveTimeout: 60, baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

## keepAliveWhileIdle

A boolean value that determines whether to send keep-alive messages while the connection is idle.

```graphql showLineNumbers
schema @upstream(keepAliveWhileIdle: false, baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

## proxy

The `proxy` setting defines an intermediary server that routes upstream requests before they reach their intended endpoint. By specifying a proxy URL, you introduce a layer, enabling custom routing and security policies.

```graphql showLineNumbers
schema @upstream(proxy: {url: "http://localhost:3000"}, baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

In the provided example, we've set the proxy's `url` to "http://localhost:3000". This configuration ensures that all requests aimed at the designated `baseURL` first go through this proxy. To illustrate, if the `baseURL` is "http://jsonplaceholder.typicode.com", any request targeting it initially goes to "http://localhost:3000" before the proxy redirects it to its final destination.

## connectTimeout

The time in seconds that the connection will wait for a response before timing out.

```graphql showLineNumbers
schema @upstream(connectTimeout: 60, baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

## timeout

The max time in seconds that the connection will wait for a response.

```graphql showLineNumbers
schema @upstream(timeout: 60, baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

## tcpKeepAlive

The time in seconds between each TCP keep-alive message sent to maintain the connection.

```graphql showLineNumbers
schema @upstream(tcpKeepAlive: 60, baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

## userAgent

The User-Agent header value for HTTP requests.

```graphql showLineNumbers
schema @upstream(userAgent: "Tailcall/1.0", baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
  mutation: Mutation
}
```

## allowedHeaders

The `allowedHeaders` configuration defines the HTTP headers that can forward to upstream services during requests.
Without specifying `allowedHeaders`, the system will not forward any incoming headers to upstream services, offering an extra security layer but potentially limiting necessary data flow.

```graphql showLineNumbers
schema @upstream(allowedHeaders: ["Authorization", "X-Api-Key"]) {
  query: Query
  mutation: Mutation
}
```

In the example above, the configuration for `allowedHeaders` permits `Authorization` and `X-Api-Key` headers. Thus, requests with these headers will forward them to upstream services; the system ignores all others. This configuration ensures communication of the expected headers to dependent services, emphasizing security and consistency.

## baseURL

This refers to the default base URL for your APIs. If it's not explicitly mentioned in the `@upstream` operator, then each [@http](#http) operator must specify its own `baseURL`. If neither `@upstream` nor [@http](#http) provides a `baseURL`, it results in a compilation error.

```graphql showLineNumbers
schema @upstream(baseURL: "http://jsonplaceholder.typicode.com") {
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

## httpCache

When activated, directs Tailcall to use HTTP caching mechanisms, following the [HTTP Caching RFC](https://tools.ietf.org/html/rfc7234) to enhance performance by minimizing unnecessary data fetches. If left unspecified, this feature defaults to `false`.

```graphql showLineNumbers
schema @upstream(httpCache: false) {
  query: Query
  mutation: Mutation
}
```

### Tips

- Use batching when other optimization techniques fail to resolve performance issues.
- Apply batching and thoroughly assess its impact.
- Understand that batching may make debugging more challenging.

## batch

An object that specifies the batch settings, including `maxSize` (the max size of the batch), `delay` (the delay in milliseconds between each batch), and `headers` (an array of HTTP headers that the batch will include).

```graphql showLineNumbers
schema @upstream(batch: {maxSize: 1000, delay: 10, headers: ["X-Server", "Authorization"]}) {
  query: Query
  mutation: Mutation
}
```
