---
title: Data Dog Telemetry Integration
description: "Discover how to enhance application performance with our guide on enabling and analyzing telemetry data in Tailcall. Learn to configure observability support using OpenTelemetry for insights into logs, metrics, and traces, with practical integration examples for platforms like Honeycomb.io, New Relic, and Datadog."
slug: graphql-data-dog-telemetry-tailcall
sidebar_label: Data Dog
---

This guide is based on the [official doc](https://docs.datadoghq.com/getting_started/opentelemetry/?s=header#exploring-observability-data-in-datadog).

---

### Steps to Integrate Datadog with Tailcall

1. **Log in to Datadog:**

- Go to [datadoghq.com](https://www.datadoghq.com).
- Log in to your account. Ensure you select the correct region for your account during login.

2. **Obtain an API Key:**

- Navigate to `Organization Settings -> API Keys`.
- Copy the value of an existing API key or create a new one.

3. **Set Up OpenTelemetry Collector:**

- Integration with Datadog requires an [OpenTelemetry Collector](https://docs.datadoghq.com/opentelemetry/collector_exporter/otel_collector_datadog_exporter/?tab=onahost) to send data. Below is a sample configuration file:

  ```yml
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
  exporters:
    logging:
      verbosity: detailed
    datadog:
      traces:
        span_name_as_resource_name: true
      hostname: "otelcol"
      api:
        key: ${DATADOG_API_KEY}
        site: us5.datadoghq.com
  processors:
    batch:
    datadog/processor:
    probabilistic_sampler:
      sampling_percentage: 30
  service:
    pipelines:
      traces:
        receivers: [otlp]
        processors: [batch, datadog/processor]
        exporters: [datadog]
      metrics:
        receivers: [otlp]
        processors: [batch]
        exporters: [datadog]
      logs:
        receivers: [otlp]
        processors: [batch]
        exporters: [datadog]
  ```

4. **Start OpenTelemetry Collector:**
   Follow these steps to start the collector:

- **Download and Install:**
  Download the OpenTelemetry Collector from the [release page](https://github.com/open-telemetry/opentelemetry-collector-releases/releases). Select the appropriate version for your platform and install it.

- **Save the Configuration File:**
  Save the configuration above to a file named `otel-collector-config.yml` in your working directory.

- **Set the Environment Variable:**
  Replace `<your-api-key>` with the API key copied earlier:

  ```bash
  export DATADOG_API_KEY=<your-api-key>
  ```

- **Run the Collector:**
  Start the collector with:

  ```bash
  ./otelcol --config otel-collector-config.yml
  ```

- **Verify the Collector:**
  Confirm that it is running by checking the terminal logs. It should indicate that the collector is listening on the `OTLP` endpoint (`0.0.0.0:4317`).

5. **Update Tailcall Configuration:**
   Add telemetry support to your Tailcall configuration as follows:

   ```graphql
   schema
     @telemetry(
       export: {otlp: {url: "http://localhost:4317"}}
     ) {
     query: Query
   }
   ```

6. **Set the Environment Variable for Tailcall:**

- Ensure that the `DATADOG_API_KEY` environment variable is set.
- Start both the OpenTelemetry Collector and Tailcall with the updated configuration.

7. **Send and Analyze Data:**

- Make requests to the running service.
- Wait for Datadog to process the telemetry data.

---

### Viewing Data in Datadog

#### Viewing Traces:

- Navigate to `APM -> Traces` in the Datadog dashboard.
- Locate the span named `request` and click on it.
- You should see details similar to the screenshot below:

  ![datadog-trace](../static/images/telemetry/datadog-trace.png)

#### Viewing Metrics:

- Go to `Metrics -> Explorer` in the Datadog dashboard.
- Search for the desired metric.
- Update the query to visualize data, as shown below:

  ![datadog-metrics](../static/images/telemetry/datadog-metrics.png)
