---
title: "@telemetry"
---

The `@telemetry` directive enables integration with [opentelemetry](https://opentelemetry.io) that provides observability to your running tailcall services.

## What kind of data is available

### Traces

#### handle_request

Span for handling the http request on server side

#### field::resolver

Span for the fields with resolvers defined that provides field name and the time of execution of the whole resolving logic for this specific field.

#### expr::eval

More granulated spans inside the `field::resolver` span that describes execution in terms of expression. Single field could be resolved with nested expressions and this span describes that hierarchy execution pattern.

### Metrics

#### cache::hit_rate

Hit rate ratio for the cache that is used for the [`@cache`](./cache.md) directive

## Directive Parameters

### `export`

Defines how the opentelemetry data should be exported and in which format

#### `otlp`

Exporter that sends data to the telemetry backend in [OTLP](https://opentelemetry.io/docs/specs/otlp/) format. Most of the modern vendors for tracing analyze support otlp out of the box.

Example of integration with honeycomb.io:

```graphql
schema
  @telemetry(
    export: {
      otlp: {
        url: "https://api.honeycomb.io:443"
        headers: [
          {key: "x-honeycomb-team", value: "{{env.HONEYCOMB_API_KEY}}"}
          {key: "x-honeycomb-dataset", value: "tailcall"}
        ]
      }
    }
  ) {
  query: Query
}
```

##### `url`

Url of the OTLP Collector.

##### `headers`

Additional headers that will be sent with requests to the OTLP Collector. This could be used to specify authorization headers or additional labels.

#### `prometheus`

Exports metrics to the [Prometheus](https://prometheus.io) compatible format and serves those metrics on specific [path](#path)

```graphql
schema @telemetry(export: {prometheus: {path: "/metrics"}}) {
  query: Query
}
```

##### `path`

Specifies the path for the prometheus metrics endpoint that will be served by tailcall server. By default, it's equal to `/metrics`

##### `format`

- `text` - encodes prometheus data in text format. It's used by default
- `protobuf` - encodes prometheus data in protobuf format

#### `stdout`

Exporter that will output all the opentelemetry data to the stdout.

That could be useful for testing and local purposes before enabling a real exporter

```graphql
schema @telemetry(export: {stdout: {pretty: true}}) {
  query: Query
}
```

##### `pretty`

Enables pretty output of the opentelemetry data.
