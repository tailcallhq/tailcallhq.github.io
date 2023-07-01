---
title: Server
---

The TailCall Server acts as an API Gateway for GraphQL. We can configure the server by passing cli options and we can publish various graphql configuration aka [composition specs]. To understand how the gateway works in detail refer the [architecture] document.

## Launch

To start the server, use the command:

```bash
$ server [options]
```

By default, the server starts on port 8080.

## Configuration

The TailCall Server provides various options to fine-tune its operation. These options control a variety of settings, including the server port, response timeouts, tracing, slow query thresholds, and more. Detailed descriptions and usage instructions for these options are provided in the [Options section](#options).

### --port

Sets the port number for the server.

- Type: Integer
- Default: 8080

```bash
$ server --port 8081
```

### --timeout

Sets the global response timeout for the server.

- Type: Integer (representing milliseconds)
- Default: 10000 (10 seconds)

```bash
$ server --timeout 5000
```

### --http-cache

Sets the HTTP cache size. This is an optional setting, by default caching is disabled on the server.

- Type: Integer
- Optional
- Default: None

```bash
$ server --http-cache 500
```

### --tracing

Enables or disables tracing.

- Type: Boolean
- Default: false

```bash
$ server --tracing
```

### --slow-query

Sets the slow query duration limit.

- Type: Integer (representing milliseconds)
- Optional
- Default: None

```bash
$ server --slow-query 2000
```

### --db

Enables or disables database connectivity. By default the server uses an in-memory implementation which lives as long as the server is up. The database is required to keep a record of the published configurations.

- Type: Boolean
- Default: false

```bash
$ server --db
```

### --db-host

Sets the database host.

- Type: String
- Default: "localhost"

```bash
$ server --db-host "localhost"
```

### --db-port

Sets the database port.

- Type: Integer
- Default: 3306

```bash
$ server --db-port 3307
```

### --db-username

Sets the database username.

- Type: String
- Optional
- Default: "tailcall_main_user"

```bash
$ server --db-username "new_user"
```

### --db-password

Sets the database password.

- Type: String
- Optional
- Default: "tailcall"

```bash
$ server --db-password "new_password"
```

### --persisted-queries

Enables or disables persisted queries.

- Type: Boolean
- Default: false

```bash
$ server --persisted-queries
```

These options allow developers to fine-tune the TailCall server according to their requirements, providing a versatile platform for managing GraphQL configurations.
[composition specs]: /docs/intro/architecture#composition-specification-blueprint
[architecture]: /docs/intro/architecture
