---
title: "Getting Started"
description: Detailed guide on the runtime configuration for Tailcall.
slug: runtime-configuration
---

The runtime configuration in Tailcall is designed to handle all runtime-related settings, such as server settings, upstream configurations, telemetry, and links to other resources. This configuration is written exclusively in `.json` or `.yml` format.

## Introduction

The runtime configuration separates runtime concerns from schema definitions, simplifying the management and merging of configurations. This approach ensures a clear distinction between runtime settings and schema definitions, making the configuration process more predictable and easier to manage.

## Configuration Structure

A typical runtime configuration file includes settings for the server, upstream services, telemetry, and links to other resources. Below is an example of a runtime configuration in YAML format:

```yaml title="main.yaml" showLineNumbers
server:
  port: 8000

upstream:
  batch:
    maxSize: 1000

telemetry:
  export:
    stdout:
      pretty: true

links:
  - src: "./users.graphql"
  - src: "./products.graphql"
```

## Example Usage

To start the Tailcall server with the runtime configuration, use the following command:

```sh
tailcall start ./main.yaml
```

This command will start the server using the settings defined in main.yml.

## Configuration Options

| Option                               | Description                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| [`server`](./config/server.md)       | Configuration settings for the Tailcall server, including port and host.      |
| [`upstream`](./config/upstream.md)   | Settings for upstream services, such as batching and timeouts.                |
| [`telemetry`](./config/telemetry.md) | Configuration for telemetry export options, including format and endpoints.   |
| [`links`](./config/links.md)         | Links to other resources or schema files to be included in the configuration. |
