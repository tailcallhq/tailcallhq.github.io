---
title: Using the CLI
sidebar_position: 2
---

The TailCall CLI (Command Line Interface) is an essential part of the TailCall toolkit. It allows developers to manage and optimize GraphQL configurations directly from the command line. Each command within the CLI is designed to handle a specific aspect of GraphQL composition. Below, you'll find a detailed overview of each command, along with its options and usage examples.

## check

The `check` command validates a composition spec. Notably, this command can detect potential N+1 issues. To use the `check` command, follow this format:

```bash
tc check [options] <file>...
```

The `check` command offers various options that control different settings, such as the display of the blueprint, endpoints, and schema of the composition spec.

### --n-plus-one-queries

This flag triggers the detection of N+1 issues.

- Type: Boolean
- Default: false

```bash
tc check --n-plus-one-queries <file>...
```

### --blueprint

This option enables the display of the blueprint of the composition spec.

- Type: Boolean
- Default: false

```bash
tc check --blueprint <file>...
```

### --endpoints

This option enables the display of the endpoints of the composition spec.

- Type: Boolean
- Default: false

```bash
tc check --endpoints <file>...
```

### --schema

This option enables the display of the schema of the composition spec.

- Type: Boolean
- Default: false

```bash
tc check --schema <file>...
```

## generate

The `generate` command creates a composition spec from a source file. You can specify the format of the generated spec.

To use the `generate` command, follow this format:

```bash
tc generate [options] <file>...
```

The `generate` command provides various options that control the source file format, the output format, and the output file.

### --source

Specifies the format of the source file.

- Type: `postman`, `sdl`
- Default: None

```bash
tc generate --source postman <file>...
```

### --target

Specifies the output format.

- Type: `config-json`, `config-yaml`, `config-graphql`,`json-lines`
- Default: None

```bash
tc generate --target config-json <file>...
```

### --write

Specifies the output file.

- Type: String
- Default: None

```bash
tc generate --write output.graphql <file>...
```

## start

The `start` command launches the TailCall Server, acting as an API Gateway for GraphQL with specific configurations. The server can publish various GraphQL configurations, also known as [composition specs].

To start the server, use the following command:

```bash
tc start [options]
```

By default, the server starts on port 8080. The `start` command offers options that allow you to control various settings, including the server port, response timeout, tracing, slow query duration limit, and more.

### --port

Sets the port number for the server.

- Type: Integer
- Default: 8080

```bash
tc start --port 8081
```

### --timeout

Sets the global response timeout for the server.

- Type: Integer (representing milliseconds)
- Default: 10000 (10 seconds)

```bash
tc start --timeout 5000
```

### --tracing

Enables or disables tracing.

- Type: Boolean
- Default: false

```bash
tc start --tracing
```

### --slow-query

Sets the slow query duration limit.

- Type: Integer (representing milliseconds)
- Optional
- Default: None

```bash
tc start --slow-query 2000
```

### --persisted-queries

Enables or disables persisted queries.

- Type: Boolean
- Default: false

```bash
tc start --persisted-queries
```

[composition specs]: /docs/intro/architecture#composition-specification-blueprint
[architecture]: /docs/intro/architecture
