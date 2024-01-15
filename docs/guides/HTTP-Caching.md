
### HTTP Caching in Tailcall

HTTP caching allows you to cache HTTP responses in Tailcall to improve performance and reduce calls to upstream services.

### What is HTTP Caching?
HTTP caching refers to storing HTTP responses in a cache so identical requests can be served from the cache instead of making a new API call.

It is a mechanism to reduce latency, network traffic and load on upstream APIs. The cache stores responses keyed by the request URL and headers.

### Overview
->HTTP caching is disabled by default.
->To enable, set httpCache to true under upstream.
->Tailcall uses an LRU cache by default to store responses.
->The cache respects caching headers like Cache-Control from upstream.
->Caching reduces calls to upstream APIs for repeated requests.

# Enabling HTTP Caching
To enable HTTP caching in Tailcall, you need to set httpCache to true under the upstream config:

```upstream:
  baseURL: "https://api.example.com"
  httpCache: true
```
This will tell Tailcall to cache responses from the upstream API.

### Cache Configuration
Tailcall uses a Least Recently Used (LRU) cache by default. You can configure the cache size and max age in the Tailcall config file:

To enable HTTP caching globally:

```upstream: 
  baseURL: https://api.example.com
  httpCache: true
```
You can also configure the cache size and max age:
```httpCache:
  maxSize: 1000 
  maxAge: 3600
```
maxSize is the maximum number of responses to cache. Default is 1000.
maxAge is the maximum age in seconds to cache responses. Default is 3600 (1 hour).

### Caching Headers
Tailcall respects caching headers like Cache-Control sent by the upstream API. This allows the upstream API to control what is cached and for how long.

For example, if the upstream response contains:

```Cache-Control: max-age=300
```
Tailcall will only cache that response for 300 seconds.

This allows the upstream API to control caching behavior.

### When To Use

# HTTP caching is useful for:

->APIs with high latency
->Repeated API calls for unchanged data
->APIs with caching headers indicating cacheable data
->It avoids unnecessary calls to upstream APIs in these cases.

### Summary
->Enable with httpCache: true under upstream
->Configure cache size and max age
->Respects upstream caching headers
->Caches identical requests during cache lifetime
->Improves performance by reducing API calls
