---
title: Telemetry
description: "Discover how to elevate application observability with Tailcall's comprehensive guide on implementing telemetry using the OpenTelemetry specification. This guide provides a detailed overview of using Rust crates such as rust-opentelemetry, tracing, and tracing-opentelemetry for effective data collection and export. It includes specific examples and best practices for tracing significant operations, naming spans accurately, and adhering to semantic conventions. Perfect for developers seeking to enhance monitoring and debugging capabilities in their applications, this resource is your go-to for integrating advanced observability features efficiently. Learn more about how to optimize your development process by visiting Tailcall's contributor guidelines."
---

At Tailcall, we adhere to high observability standards in line with the [OpenTelemetry](https://opentelemetry.io) specification. Our implementation utilizes several key Rust crates:

- [rust-opentelemetry](https://docs.rs/opentelemetry/latest/opentelemetry/index.html) and associated crates are used to support the collection and export of telemetry data.
- [tracing](https://docs.rs/tracing/latest/tracing/index.html) and [tracing-opentelemetry](https://docs.rs/tracing-opentelemetry/latest/tracing_opentelemetry/index.html) facilitate the definition of logs and traces. Integration with OpenTelemetry allows for the automatic transfer of this data to the OpenTelemetry system. This layered approach ensures that the `tracing` library, which is effective across various scenarios, can also function as a standalone telemetry system for logging when OpenTelemetry integration is not required.

When developing any features that necessitate observability, consider the following guidelines:

- Implement traces for tasks that represent a significant operation. This practice aids in the efficient diagnosis of issues and performance bottlenecks.
- Name spans clearly and specifically, adhering to the guidelines outlined in the [OpenTelemetry specifications](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#span). Avoid names that introduce a high cardinality of potential values.
- Due to the constraints of tracing libraries, span names must be static strings. This limitation can be overcome by adding an extra field named `otel.name` to provide more dynamic descriptions (see the [tracing-opentelemetry](https://github.com/tokio-rs/tracing-opentelemetry) documentation for more details).
- Attribute naming should follow OpenTelemetry's [semantic conventions](https://opentelemetry.io/docs/concepts/semantic-conventions/). Utilize constants available in the [opentelemetry_semantic_conventions](https://docs.rs/opentelemetry-semantic-conventions/latest/opentelemetry_semantic_conventions/index.html) crate for standardized attribute names.
