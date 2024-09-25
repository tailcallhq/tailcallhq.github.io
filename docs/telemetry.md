---
title: GraphQL Telemetry
description: "Learn how to configure observability support using OpenTelemetry for insights into logs, metrics, and traces. Discover practical integration examples for platforms like Honeycomb.io, New Relic, and Datadog."
slug: graphql-telemetry-guide
sidebar_label: Telemetry
---

This guide will walk you through observability support in Tailcall i.e. how to collect and analyze telemetry data with different observability backends. In this guide you'll learn:

- How to enable generation of telemetry data in Tailcall?
- How to update config to forward telemetry data to your chosen observability platforms?
- See some examples of integration with existing observability tools?

Let's get started!

## What is Observability

Observability is essential for maintaining the health and performance of your applications. It provides insights into your software's operation in real-time by analyzing telemetry data — logs, metrics, and traces. This data helps in troubleshooting, optimizing, and ensuring your application works as expected.

- **Logs** offer a record of events that have happened within your application, useful for understanding actions taken or errors that have occurred.
- **Metrics** are numerical data that measure different aspects of your system's performance, such as request rates or memory usage.
- **Traces** show the journey of requests through your system, highlighting how different parts of your application interact and perform.

Tailcall provides observability support by integrating OpenTelemetry specification into it with help of provided SDKs and data formats.

[OpenTelemetry](https://opentelemetry.io) is a toolkit for collecting telemetry data in a consistent manner across different languages and platforms. It frees you from being locked into a single observability platform, allowing you to send your data to different tools for analysis, such as New Relic or Honeycomb.

## Comparison with Apollo Studio

While [Apollo studio](./apollo-studio.md) telemetry also provides analytics tools for your schema but when choosing between it and OpenTelemetry integration consider next points:

- OpenTelemetry is more generalized observability framework that could be used for cross-service analytics while Apollo Studio can provide insights related purely to graphQL
- OpenTelemetry is vendor-agnostic and therefore you could actually use different observability platforms depending on your needs and don't rely on single tool like Apollo Studio
- OpenTelemetry integration in Tailcall can provide more analytical data that is out of scope of graphQL analytics provided by Apollo Studio

## @telemetry Directive

The `@telemetry` directive facilitates seamless integration with [OpenTelemetry](https://open-telemetry.io), enhancing the observability of your GraphQL services powered by Tailcall. By leveraging this directive, developers gain access to valuable insights into the performance and behavior of their applications.

### Traces

Here are the traces that are captured by the `@telemetry` directive:

|                        Trace Name | Description                                                                                                                                                                                     |
| --------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                           request | Captures the span for processing the HTTP request on the server side, providing foundational observability.                                                                                     |
|                           graphQL | _Only for GraphQL ingress_. Span for processing GraphQL call                                                                                                                                    |
| `REST <http_method> <http_route>` | _Only for REST ingress_. Span for processing REST API call                                                                                                                                      |
|                    `<field_name>` | Denotes spans for fields with defined resolvers, offering insights into field names and execution times for resolver logic.                                                                     |
|                     `<expr_name>` | Nested within the `<field_name>` spans, these granulated spans detail the execution of expressions in resolving a field, highlighting the hierarchical execution pattern of nested expressions. |
|                  upstream_request | Request that were made from tailcall service to upstream                                                                                                                                        |

### Metrics

The `@telemetry` directive also captures the following metrics:

|                    Metric | Description                                                                                                                                     |
| ------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------- |
|            cache.hit_rate | Reflects the cache hit rate for the cache powered by the [`@cache`](/docs/directives/cache.md) directive                                        |
| http.server.request.count | Counts the number of incoming requests made to specific route. Optionally enriched with selected headers by [`requestHeaders`](#requestheaders) |
| http.client.request.count | Counts the number of outgoing requests to specific upstream                                                                                     |

### export

The `export` field defines how the open-telemetry data should be exported and in which format. The following are the supported formats:

### otlp

Utilizes the OTLP format to export telemetry data to backend systems, supported by most modern tracing and analytics platforms. Here is an example using [honeycomb.io]:

[honecomb.io]: https://www.honeycomb.io/

```graphql
schema
  @telemetry(
    export: {
      otlp: {
        url: "https://api.honeycomb.io:443"
        headers: [
          {
            key: "x-honeycomb-team"
            value: "{{.env.HONEYCOMB_API_KEY}}"
          }
          {key: "x-honeycomb-dataset", value: "tailcall"}
        ]
      }
    }
  ) {
  query: Query
}
```

You can configure the OTLP exporter with the following options:

|   Field | Description                                                 |
| ------: | ----------------------------------------------------------- |
|     url | Defines the URL for the OTLP Collector.                     |
| headers | Sets additional headers for requests to the OTLP Collector. |

### prometheus

Facilitates metrics export in a Prometheus compatible format, providing a dedicated endpoint for metrics.

```graphql
schema
  @telemetry(export: {prometheus: {path: "/metrics"}}) {
  query: Query
}
```

You can configure the Prometheus exporter with the following options:

|  Field | Description                                                                        |
| -----: | ---------------------------------------------------------------------------------- |
|   path | Designates the endpoint path for Prometheus metrics, defaulting to `/metrics`.     |
| format | Controls the format viz. **text** or **protobuf**, for sending data to Prometheus. |

### stdout

Outputs all telemetry data to stdout, ideal for testing or local development environments.

```graphql
schema @telemetry(export: {stdout: {pretty: true}}) {
  query: Query
}
```

You can configure the stdout exporter with the following options:

|  Field | Description                                                          |
| -----: | -------------------------------------------------------------------- |
| pretty | Enables formatted output of telemetry data for enhanced readability. |

### requestHeaders

Specifies list of headers of ingress request the value of which will be sent to the telemetry as attributes.

```graphql
schema @telemetry(requestHeaders: ["X-User-Id"]) {
  query: Query
}
```

### apollo

Facilitates seamless integration with [Apollo Studio](https://studio.apollographql.com/), enhancing the observability of GraphQL services. By leveraging this field, developers gain access to valuable insights into the performance and behavior of their GraphQL APIs.

```graphql
schema
  @telemetry(
    export: {
      otlp: {
        api_key: "{{.env.APOLLO_API_KEY}}"
        graph_ref: "graph-id@current"
        platform: "website.com"
        version: "1.0.0"
      }
    }
  ) {
  query: Query
}
```

You can configure the apollo exporter with the following options:

|     Field | Description                                                                                                                                                   |
| --------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   api_key | The API Key generated from Apollo Studio.                                                                                                                     |
| graph_ref | The Graph Ref, which is the `graph_id` and the `variant` concatenated using `@`(i.e. \<graph_id\>@\<variant\>)                                                |
|  platform | An arbitrary value which can contain the name of your website or some other value to identify your deployment uniqely, in case you have multiple deployments. |
|   version | Version of Apollo which is being used.                                                                                                                        |

By integrating the `@telemetry` directive into your GraphQL schema, you empower your development teams with critical insights into application performance, enabling proactive optimization and maintenance.

## Prerequisites

Consider we have the following GraphQL configuration that connects with jsonplaceholder.com to fetch the data about user and posts

```graphql
schema
  @server(port: 8000, hostname: "0.0.0.0")
  @upstream(
    baseURL: "http://jsonplaceholder.typicode.com"
  ) {
  query: Query
}

type Query {
  posts: [Post] @http(path: "/posts") @cache(maxAge: 3000)
  user(id: Int!): User @http(path: "/users/{{.args.id}}")
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
  phone: String
  website: String
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  user: User @http(path: "/users/{{.value.userId}}")
}
```

We will update that config with telemetry integration in following sections.

## GraphQL Configuration for Telemetry

By default, telemetry data is not generated by Tailcall since it requires some setup to know where to send this data and also that affects performance of server that could be undesirable in some cases.

Telemetry configuration is provided by [`@telemetry`](/docs/telemetry.md#telemetry-directive) directive to setup how and where the telemetry data is send.

To enable it we can update our config with something like config below:

```graphql
schema
  @telemetry(
    export: {
      otlp: {url: "http://your-otlp-compatible-backend.com"}
    }
  ) {
  query: Query
}
```

Here, `export` specifies the format of generated data and endpoint to which to send that data. Continue reading to know more about different options for it.

### Export to OTLP

[OTLP](https://opentelemetry.io/docs/specs/otlp/) is a vendor agnostic protocol that is supported by growing [number of observability backends](https://opentelemetry.io/ecosystem/vendors/).

#### OpenTelemetry Collector

[OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) is a vendor-agnostic way to receive, process and export telemetry data in OTLP format.

Although, tailcall can send the data directly to the backends that supports OTLP format using Otel Collector could be valuable choice since it's more robust solution well-suited for a high-scale, more flexible settings and ability to export in different formats other than OTLP.

In summary, if you're gonna to use OTLP compatible platform or [prometheus](#export-to-prometheus) and your load is not that massive you could send the data directly to platforms. From the other side, if you need to export to different formats (like Jaeger or Datadog) or your application involves high load consider using Otel Collector as an export target.

### Export to prometheus

[Prometheus](https://prometheus.io) is a metric monitoring solution. Please note that prometheus works purely with metrics and other telemetry data like traces and logs won't be sent to it.

Prometheus integration works by adding a special route for the GraphQL server's router that outputs generated metrics in prometheus format consumable by prometheus scraper.

## Data generated

You can find a reference of type of info generated by Tailcall in the [`@telemetry` reference](/docs/telemetry.md#telemetry-directive) or consult examples in the next section, in order to gain some understanding.

### Relation with other services

Tailcall fully supports [Context Propagation](https://opentelemetry.io/docs/concepts/context-propagation/) functionality and therefore you can analyze distributed traces across all of your services that are provides telemetry data.

That may look like this:

![honeycomb-propagation](../static/images/telemetry/honeycomb-propagation.png)

Where Tailcall is a part of whole distributed trace

### Customize generated data

In some cases you may want to customize the data that were added to telemetry payload to have more control over analyzing process. Tailcall supports that customization for specific use cases described below. For eg. the metric [`http.server.request.count`](/docs/telemetry.md#metrics) can be customized with the [`requestHeaders`](/docs/telemetry.md#requestheaders) property to allow splitting the overall count by specific headers.

:::important
The value of specified headers will be sent to telemetry backend as is, so use it with care to prevent of leaking any sensitive data to third-party services you don't have control over.
:::
