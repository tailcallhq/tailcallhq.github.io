## cacheControl

Activating the `cacheControl` configuration directs Tailcall to send [Cache-Control] headers in its responses. The `max-age` value in the header matches the smallest of the values in the responses Tailcall receives from upstream services. By default, this is `false`, which means Tailcall does not set any header.

[cache-control]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control

```graphql showLineNumbers
schema @server(headers: { cacheControl: true }) {
  query: Query
  mutation: Mutation
}
```