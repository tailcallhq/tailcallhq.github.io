---
title: "@trace"
---

The `@trace` directive enables integration with [opentelemetry](https://opentelemetry.io) that provides observability to your running tailcall services.

## What kind of data is available

### Traces

#### field::resolver

Span for the fields with resolvers defined that provides field name and the time of execution of the whole resolving logic for this specific field.

#### expr::eval

More granulated spans inside the `field::resolver` span that describes execution in terms of expression. Single field could be resolved with nested expressions and this span describes that hierarchy execution pattern.

### Metrics

#### Cache::hit_rate

Hit rate ratio for the cache that is used for the [`@cache`](./cache.md) directive

## Directive Parameters

### `export`

Defines how the opentelemetry data should be exported and in which format

#### `otlp`

Exporter that sends data to the telemetry backend in [OTLP](https://opentelemetry.io/docs/specs/otlp/) format. Most of the modern vendors for tracing analyze support otlp out of the box.

Example of integration with honeycomb.io:

```graphql
schema
  @trace(
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

#### `stdout`

Exporter that will output all the opentelemetry data to the stdout.

That could be useful for testing and local purposes before enabling a real exporter

```graphql
schema @trace(export: {stdout: {pretty: true}}) {
  query: Query
}
```

##### `pretty`

Enables pretty output of the opentelemetry data.
