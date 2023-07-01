---
title: CLI
---

TailCall CLI (Command Line Interface) is a powerful part of the TailCall toolkit, enabling developers to manage and optimize GraphQL configurations directly from the command line. Each command is purposefully designed to handle a particular aspect of GraphQL composition.

The general syntax for running TailCall CLI commands is as follows:

```bash
$ tc <command>
```

## Commands

### `check`

The `check` command validates a composition spec. If a remote environment is specified, it also displays the status of the spec in that environment. It has the capacity to detect potential N+1 issues as well.

```bash
$ tc check [options] <file>...
```

**Options:**

- `-r, --remote <URL>`: Specifies the remote environment URL. The default is `https://cloud.tailcall.run`.
- `--n-plus-one-queries, --npo`: Flag to detect N+1 issues.
- `--blueprint`: Displays blueprint of the composition spec.
- `--endpoints`: Displays endpoints of the composition spec.
- `-s, --schema`: Displays the schema of the composition spec.

### `publish`

The `publish` command publishes the configuration file to the specified remote environment.

```bash
$ tc publish [options] <file>...
```

**Options:**

- `-r, --remote <URL>`: Specifies the remote environment URL. The default is `https://cloud.tailcall.run`.

### `drop`

The `drop` command removes a composition spec from the remote environments using its SHA-256 hash.

```bash
$ tc drop [options] <digest>
```

**Options:**

- `-r, --remote <URL>`: Specifies the remote environment URL. The default is `https://cloud.tailcall.run`.

### `list`

The `list` command displays all published composition specs on the remote address.

```bash
$ tc list [options]
```

**Options:**

- `-r, --remote <URL>`: Specifies the remote environment URL. The default is `https://cloud.tailcall.run`.
- `--offset <integer>`: Specifies the number of entries to skip for paginating output.
- `--limit <integer>`: Specifies the limit to the number of entries in the output.

### `show`

The `show` command displays information for a composition spec using its SHA-256 hash on the remote server.

```bash
$ tc show [options] <digest>
```

**Options:**

- `-r, --remote <URL>`: Specifies the remote environment URL. The default is `https://cloud.tailcall.run`.
- `--blueprint`: Displays blueprint of the composition spec.
- `--endpoints`: Displays endpoints of the composition spec.
- `-s, --schema`: Displays the schema of the composition spec.

### `generate`

The `generate` command generates a composition spec from a source file. The generated format can be specified.

```bash
$ tc generate [options] <file>...
```

**Options:**

- `--source postman | sdl`: Specifies the format of the source file.
- `--target config-json | config-yaml | config-graphql | json-lines`: Specifies the output format.
- `--write <file>`: Writes the output to the specified file.

All these commands are designed to handle specific tasks, providing a powerful toolkit for managing GraphQL configurations. This makes TailCall CLI an essential tool for anyone working with GraphQL compositions.
