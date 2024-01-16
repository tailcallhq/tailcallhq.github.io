
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

### Caching Headers
Tailcall respects caching headers like Cache-Control sent by the upstream API. This allows the upstream API to control what is cached and for how long.

For example, if the upstream response contains:

```Cache-Control: max-age=300
```
Tailcall will only cache that response for 300 seconds.

This allows the upstream API to control caching behavior.

## Tailcall also supports expiry headers.
The Expiry header is used to set an expiration date/time for a cached HTTP response. It allows a server to specify when a cached response is considered stale and needs to be re-validated with the origin server.

```fn expires_header(expires: DateTime<Utc>) -> HeaderMap {
  let mut headers = HeaderMap::new();
  headers.insert("Expires", HeaderValue::from_str(&expires.to_rfc2822()).unwrap());
  headers
}
```
This allows setting an exact date-time after which the response is considered expired.

## cacheControlHeader 
The cacheControlHeader setting allows Tailcall to forward caching headers from upstream APIs to the client. This enables leveraging browser or CDN caching capabilities.

 Key benefits:

->Leverages client caching capabilities.
->Reduces requests to Tailcall server.
->Respects caching policies from upstream.

### When To Use

# HTTP caching is useful for:

->APIs with high latency
->Repeated API calls for unchanged data
->APIs with caching headers indicating cacheable data
->It avoids unnecessary calls to upstream APIs in these cases.

### Summary
->Enable with httpCache: true under upstream
->Respects upstream caching headers
->Caches identical requests during cache lifetime
->Improves performance by reducing API calls
