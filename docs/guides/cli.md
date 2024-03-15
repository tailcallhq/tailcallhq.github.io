---
title: CLI
---

The TailCall CLI (Command Line Interface) is an essential part of the TailCall toolkit. It allows developers to manage and optimize GraphQL configurations directly from the command line. Each command within the CLI handles a specific aspect of GraphQL composition. Below, you'll find a detailed overview of each command, along with its options and usage examples.

## check

The `check` command validates a composition spec. Notably, this command can detect potential N+1 issues. To use the `check` command, follow this format:

```bash
tailcall check [options] <file>...
```

The `check` command offers options that control settings such as the display of the generated schema, n + 1 issues etc.

### --n-plus-one-queries

This flag triggers the detection of N+1 issues.

- Type: Boolean
- Default: false

```bash
tailcall check --n-plus-one-queries <file>...
```

### --schema

This option enables the display of the schema of the composition spec.

- Type: Boolean
- Default: false

```bash
tailcall check --schema <file1> <file2> ... <fileN>
```

The `check` command allows for files. Specify each file path, separated by a space, after the options.

Example:

```bash
tailcall check --schema ./path/to/file1.graphql ./path/to/file2.graphql
```

### --format

This is an optional command which allows changing the format of the input file. It accepts `gql` or `graphql`,`yml` or `yaml`, `json` .

```bash
tailcall check ./path/to/file1.graphql ./path/to/file2.graphql --format json
```

## start

The `start` command launches the TailCall Server, acting as a GraphQL proxy with specific configurations. The server can publish GraphQL configurations.

To start the server, use the following command:

```bash
tailcall start <file1> <file2> ... <fileN> <http_path1> <http_path2> .. <http_pathN>
```

The `start` command allows for files and supports loading configurations over HTTP. You can mix file system paths with HTTP paths. Specify each path, separated by a space, after the options.

Example:

```bash
tailcall start ./path/to/file1.graphql ./path/to/file2.graphql http://example.com/file2.graphql
```

## init

The `init` command bootstraps a new TailCall project. It creates the necessary GraphQL schema files in the provided file path.

```bash
tailcall init <file_path>
```

This command prompts for file creation and configuration, creating a `.tailcallrc.graphql` file by default.
