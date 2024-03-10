---
title: Telemetry
description: Use Telemetry with Tailcall
---
Telemetry refers to the collection of data related to the performance, behavior, and usage of software systems. This data can include metrics such as response times, error rates, resource usage, and more.

The `@telemetry` directive facilitates seamless integration with [OpenTelemetry](https://opentelemetry.io/), enhancing the observability of your GraphQL services powered by Tailcall.

## Integration

To begin using Telemetry, integrate the `@telemetry` directive into your GraphQL schema. This directive enables the collection and export of telemetry data.

```graphql
schema @telemetry {
  query: Query
}
```
By adding `@telemetry` to your schema, you enable telemetry collection for all operations within your GraphQL service.

## Traces:

Traces provide detailed information about the flow of operations within your GraphQL service. Tailcall captures traces, including handle_request, field::resolver, and expr::eval.

```graphql

type Query {
  user(id: ID!): User!
}

type User {
  id: ID!
  name: String!
}

schema @telemetry {
  query: Query
}
```

## Metrics:

Metrics offer quantitative insights into the performance of your GraphQL service. For example, you can monitor cache hit rates using the cache::hit_rate metric.

```graphql
schema @telemetry {
  query: Query
}

type Query {
  users: [User!]! @cache(ttl: 60)
}

type User {
  id: ID!
  name: String!
}
```

## Configure Export Options

Once you've integrated telemetry into your schema, you need to configure how telemetry data should be exported. Tailcall offers multiple export options, including OTLP, Prometheus, Stdout, and Apollo.

### OTLP Exporter

If you want to export telemetry data to a backend system using the OTLP format, configure the OTLP exporter with the desired URL and headers.

```graphql
schema @telemetry(
  export: {
    otlp: {
      url: "https://api.honeycomb.io:443"
      headers: [
        { key: "x-honeycomb-team", value: "{{env.HONEYCOMB_API_KEY}}" }
        { key: "x-honeycomb-dataset", value: "tailcall" }
      ]
    }
  }
) {
  query: Query
}
```

### Prometheus Exporter

To export metrics in Prometheus-compatible format, configure the Prometheus exporter with the desired endpoint path.

```graphql
schema @telemetry(
  export: {
    prometheus: {
      path: "/metrics"
    }
  }
) {
  query: Query
}
```

### Stdout Exporter

For testing or local development environments, you can output telemetry data to stdout. Configure the Stdout exporter with the desired formatting options.

```graphql
schema @telemetry(
  export: {
    stdout: {
      pretty: true
    }
  }
) {
  query: Query
}
```

### Apollo Exporter

To integrate telemetry with Apollo Studio for advanced monitoring and analysis, configure the Apollo exporter with the required API key and other metadata.Here more guide for [Apollo](https://tailcall.run/docs/guides/apollo-studio/)

```graphql
schema @telemetry(
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

## Deploy and Monitor

Once you've configured telemetry and integrated it into your GraphQL schema, deploy your Tailcall-powered GraphQL service. Monitor telemetry data through your chosen backend system or monitoring tool to gain insights into performance, behavior, and optimization opportunities.

## Conclusion

By following these steps, you can effectively use telemetry with Tailcall to enhance the observability of your GraphQL services. With comprehensive traces and metrics, you can monitor, analyze, and optimize your GraphQL APIs for improved performance and reliability.