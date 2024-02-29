---
title: Http Cache
description: A comprehensive guide to leverage HTTP cache for REST APIs using Tailcall
---

HTTP Caching in Tailcall is designed to enhance performance and minimize the frequency of requests to upstream services by caching HTTP responses. This guide explains the concept, benefits, and how to effectively implement HTTP caching within Tailcall.

### Understanding HTTP Caching

HTTP Caching involves saving copies of HTTP responses to serve identical future requests directly from the cache, bypassing the need for new API calls. This reduces latency, conserves bandwidth, and alleviates the load on upstream services by utilizing a cache keyed by request URLs and headers.

By default, HTTP caching is turned off in Tailcall. Enabling it requires setting the `httpCache` parameter to `true` in the `@upstream` configuration. Tailcall employs a in-memory *Least_Recently_Used* (LRU) cache mechanism to manage stored responses, adhering to upstream-provided caching directives like `Cache-Control` to optimize the caching process and minimize redundant upstream API requests.

### Enabling HTTP Caching

To activate HTTP caching, adjust the upstream configuration in Tailcall by setting `httpCache` to `true`, as shown in the following example:

```graphql
schema
  @server(port: 4000)
  @upstream(
    baseURL: "https://api.example.com"
    # highlight-start
    httpCache: true
    # highlight-end
  ) {
  query: Query
}
```

This configuration instructs Tailcall to cache responses from the designated upstream API.

### Cache-Control headers in responses

Enabling the `cacheControlHeader` setting in Tailcall ensures that [Cache-Control] headers are included in the responses returned to clients. When activated, Tailcall dynamically sets the `max-age` directive in the `Cache-Control` header to the minimum `max-age` value encountered in any of the responses from upstream services. This approach guarantees that the caching duration for the composite response is conservative, aligning with the shortest cache validity period provided by the upstream services. By default, this feature is disabled (`false`), meaning Tailcall will not modify or add `Cache-Control` headers unless explicitly instructed to do so. This setting is distinct from the general HTTP cache setting, which controls whether responses are cached internally by Tailcall; `cacheControlHeader` specifically controls the caching instructions sent to clients.

Here is how you can enable the `cacheControlHeader` setting within your Tailcall schema to apply these caching instructions:

```graphql
schema @server(cacheControlHeader: true) {
  query: Query
  mutation: Mutation
}
```

[cache-control]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control

### Best Practices for Enhancing REST API Performance with Tailcall

The combination of `httpCache` and `cacheControlHeader` provides a comprehensive caching solution. While `httpCache` focuses on internal caching to reduce the impact of high latency and frequent requests, `cacheControlHeader` manages client-side caching policies, ensuring an optimal balance between performance, data freshness, and efficient resource use.

These caching primitives are beneficial for REST APIs that are latency-sensitive, have a high rate of request repetition, or come with explicit caching headers indicating cacheable responses. Together, they tackle the common challenges of optimizing REST API performance by minimizing unnecessary network traffic and server load while ensuring response accuracy.

To further enhance the performance of any API with Tailcall, integrating the [@cache] directive offers protocol agnostic control over caching at the field level within a GraphQL schema.

[@cache]: /docs/operators/cache.md
