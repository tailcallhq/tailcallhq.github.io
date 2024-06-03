---
title: Command Line Reference
description: "Discover the TailCall CLI, a crucial tool for developers to manage and optimize GraphQL configurations from the command line. Learn commands like 'check', 'start', 'init', and 'gen' to validate specs, launch servers, bootstrap projects, and generate configurations. Detect N+1 issues, display schemas, format inputs, and more. Simplify GraphQL composition and enhance your development workflow with TailCall CLI."
slug: tailcall-cli-graphql-configuration-tool
sidebar_label: TailCall CLI
---

The TailCall CLI (Command Line Interface) allows developers to manage and optimize GraphQL configurations directly from the command line.

## check

The `check` command validates a composition spec. Notably, this command can detect potential N+1 issues. To use the `check` command, follow this format:

```
tailcall check [OPTIONS] <FILE_PATHS>...
```

The `check` command offers options that control settings such as the display of the generated schema, n + 1 issues etc.

### --n-plus-one-queries

This flag triggers the detection of N+1 issues.

- Type: Boolean
- Default: false

```
tailcall check --n-plus-one-queries <FILE_PATHS> ...
```

### --schema

This option enables the display of the schema of the composition spec.

- Type: Boolean
- Default: false

```bash
tailcall check --schema <file1> <file2> ... <fileN>
```

The `check` command allows for files. Specify each file path, separated by a space, after the options.

**Example:**

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

**Example:**

```bash
tailcall start ./path/to/file1.graphql ./path/to/file2.graphql http://example.com/file2.graphql
```

## init

The `init` command bootstraps a new TailCall project. It creates the necessary GraphQL schema files in the provided file path.

```bash
tailcall init <file_path>
```

This command prompts for file creation and configuration, creating the following files:

|                 File Name | Description                                                                                                                          |
| ------------------------: | ------------------------------------------------------------------------------------------------------------------------------------ |
| [.tailcallrc.schema.json] | Provides autocomplete in your editor when the configuration is written in `json` or `yml` format.                                    |
|          [.graphqlrc.yml] | A GraphQL Configuration that references your Tailcall config (if it's in `.graphql` format) and the following `.tailcallrc.graphql`. |
|     [.tailcallrc.graphql] | Contains Tailcall specific auto-completions for `.graphql` format.                                                                   |

[.tailcallrc.schema.json]: https://github.com/tailcallhq/tailcall/blog/main/generated/.tailcallrc.schema.json
[.graphqlrc.yml]: https://the-guild.dev/graphql/config/docs
[.tailcallrc.graphql]: https://github.com/tailcallhq/tailcall/blog/main/generated/.tailcallrc.graphql

## gen

The `gen` command in the TailCall CLI is designed for generating TailCall configurations from one or more source files.

### --input

Supported input formats include `PROTO`.

### --output

Output is same as [--format](#--format), it supports `graphql`, `json` and `yaml` as output type

**Example:**

```bash
tailcall gen <file1> <file2> ... <fileN> --input proto --output gql
```
