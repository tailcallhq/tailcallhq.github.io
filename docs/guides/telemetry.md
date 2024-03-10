# Telemetry Feature Documentation

## Introduction

The `@telemetry` directive in Tailcall facilitates seamless integration with OpenTelemetry, enhancing the observability of your GraphQL services. This directive allows developers to gain valuable insights into the performance and behavior of their applications.

## Traces

The `@telemetry` directive captures the following traces:

### Trace Name Description

- `handle_request`: Captures the span for processing the HTTP request on the server side, providing foundational observability.
- `field::resolver`: Denotes spans for fields with defined resolvers, offering insights into field names and execution times for resolver logic.
- `expr::eval`: Nested within the `field::resolver` spans, these granulated spans detail the execution of expressions in resolving a field, highlighting the hierarchical execution pattern of nested expressions.

## Metrics

The `@telemetry` directive also captures the following metrics:

### Metric Description

- `cache::hit_rate`: Reflects the cache hit rate for the cache powered by the `@cache` directive.

## Export

The `export` field defines how the OpenTelemetry data should be exported and in which format. The following are the supported formats:

### OTLP

Utilizes the OTLP format to export telemetry data to backend systems, supported by most modern tracing and analytics platforms. Here is an example using [honeycomb.io]:

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

- `url`: Defines the URL for the OTLP Collector.
- `headers`: Sets additional headers for requests to the OTLP Collector.

## Prometheus

Facilitates metrics export in a Prometheus compatible format, providing a dedicated endpoint for metrics.

```graphql
schema @telemetry(export: {prometheus: {path: "/metrics"}}) {
  query: Query
}
```

- `path`: Designates the endpoint path for Prometheus metrics (defaulting to /metrics).
- `format`: Controls the format viz. text or protobuf, for sending data to Prometheus.

## STDOUT

Outputs all telemetry data to stdout, ideal for testing or local development environments.

```graphql
schema @telemetry(export: {stdout: {pretty: true}}) {
  query: Query
}
```

- `pretty`: Enables formatted output of telemetry data for enhanced readability.

## Apollo

Facilitates seamless integration with Apollo Studio, enhancing the observability of GraphQL services.

```graphql
schema
  @telemetry(
    export: {
      apollo: {
        api_key: "{{env.APOLLO_API_KEY}}"
        graph_ref: "graph-id@current"
        platform: "website.com"
        version: "1.0.0"
      }
    }
  ) {
  query: Query
}
```

- `api_key`: The API Key generated from Apollo Studio.
- `graph_ref`: The Graph Ref, which is the graph_id and the variant concatenated using @(i.e., <graph_id>@<variant>).
- `platform`: An arbitrary value containing the name of your website or another value to identify your deployment uniquely.
- `version`: Version of Apollo being used.

[Link to Apollo Guide](https://tailcall.run/docs/guides/apollo-studio/)
