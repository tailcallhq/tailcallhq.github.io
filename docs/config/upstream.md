---
title: "upstream"
description: The upstream configuration enables control over specific aspects of the upstream server connection.
slug: ../upstream-configuration
---

The `upstream` configuration is defined as follows:

```yaml title="Runtime Configuration" showLineNumbers
upstream:
  poolIdleTimeout: 60
  poolMaxIdlePerHost: 60
  keepAliveInterval: 60
  keepAliveTimeout: 60
  keepAliveWhileIdle: false
  proxy:
    url: "http://localhost:3000"
  connectTimeout: 60
  timeout: 60
  tcpKeepAlive: 60
  userAgent: "Tailcall/1.0"
  allowedHeaders:
    - "Authorization"
    - "X-Api-Key"
  httpCache: 42
  batch:
    maxSize: 1000
    delay: 10
    headers:
      - "X-Server"
      - "Authorization"
  onRequest: "someFunctionName"
```

The `upstream` configuration enables control over specific aspects of the upstream server connection, including settings such as connection timeouts, keep-alive intervals, and more. The system applies default values if you do not specify them.

## poolIdleTimeout

The connection pool waits for this duration in seconds before closing idle connections.

```yaml showLineNumbers
upstream:
  poolIdleTimeout: 60
```

## poolMaxIdlePerHost

The max number of idle connections each host will maintain.

```yaml showLineNumbers
upstream:
  poolMaxIdlePerHost: 60
```

## keepAliveInterval

The time in seconds between each keep-alive message sent to maintain the connection.

```yaml showLineNumbers
upstream:
  keepAliveInterval: 60
```

## keepAliveTimeout

The time in seconds that the connection will wait for a keep-alive message before closing.

```yaml showLineNumbers
upstream:
  keepAliveTimeout: 60
```

## keepAliveWhileIdle

A boolean value that determines whether to send keep-alive messages while the connection is idle.

```yaml showLineNumbers
upstream:
  keepAliveWhileIdle: false
```

## proxy

The `proxy` setting defines an intermediary server that routes upstream requests before they reach their intended endpoint. By specifying a proxy URL, you introduce a layer, enabling custom routing and security policies.

```yaml showLineNumbers
upstream:
  proxy:
    url: "http://localhost:3000"
```

In the provided example, we've set the proxy's `url` to "http://localhost:3000". This configuration ensures that all requests aimed at the designated `url` first go through this proxy. To illustrate, if the `url` is "http://jsonplaceholder.typicode.com", any request targeting it initially goes to "http://localhost:3000" before the proxy redirects it to its final destination.

## connectTimeout

The time in seconds that the connection will wait for a response before timing out.

```yaml showLineNumbers
upstream:
  connectTimeout: 60
```

## timeout

The max time in seconds that the connection will wait for a response.

```yaml showLineNumbers
upstream:
  timeout: 60
```

## tcpKeepAlive

The time in seconds between each TCP keep-alive message sent to maintain the connection.

```yaml showLineNumbers
upstream:
  tcpKeepAlive: 60
```

## userAgent

The User-Agent header value for HTTP requests.

```yaml showLineNumbers
upstream:
  userAgent: "Tailcall/1.0"
```

## allowedHeaders

The `allowedHeaders` configuration defines a set of whitelisted HTTP headers that can be forwarded to upstream services during requests.
Without specifying `allowedHeaders`, the system will not forward any incoming headers to upstream services, offering an extra security layer but potentially limiting necessary data flow. Tailcall compares the provided whitelisted headers in a case-insensitive format.

```yaml showLineNumbers
upstream:
  allowedHeaders:
    - "Authorization"
    - "X-Api-Key"
```

In the example above, the configuration for `allowedHeaders` permits `Authorization` and `X-Api-Key` headers. Thus, requests with these headers will forward them to upstream services; the system ignores all others. This configuration ensures communication of the expected headers to dependent services, emphasizing security and consistency.

## httpCache

When httpCache passed with value greater than 0 it directs Tailcall to use HTTP caching mechanisms, following the [HTTP Caching RFC](https://tools.ietf.org/html/rfc7234) to enhance performance by minimizing unnecessary data fetches. If left unspecified, this feature defaults to `0` disabling the caching mechanism.

```yaml showLineNumbers
upstream:
  httpCache: 42
```

## Tips

- Use batching when other optimization techniques fail to resolve performance issues.
- Apply batching and thoroughly assess its impact.
- Understand that batching may make debugging more challenging.

## batch

An object that specifies the batch settings, including `maxSize` (the max size of the batch), `delay` (the delay in milliseconds between each batch), and `headers` (an array of HTTP headers that the batch will include).

```yaml showLineNumbers
upstream:
  batch:
    maxSize: 1000
    delay: 10
    headers:
      - "X-Server"
      - "Authorization"
```

## onRequest

Similar to the [@http](../directives/http.md) property, this accepts a string value representing a middleware function defined in a JavaScript file. It intercepts all outgoing HTTP requests from the server. This interceptor, written in JavaScript, can be used to modify outgoing requests and also generate artificial responses to customize the behavior of the GraphQL server.

```yaml showLineNumbers
upstream:
  onRequest: "someFunctionName"
  script:
    type: Script
    src: "path_to/worker.js"
```
