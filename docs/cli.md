---
title: Command Line Reference
sidebar_position: 3
description: "Discover the TailCall CLI, a crucial tool for developers to manage and optimize GraphQL configurations from the command line. Learn commands like 'check', 'start', 'init', and 'gen' to validate specs, launch servers, bootstrap projects, and generate configurations. Detect N+1 issues, display schemas, format inputs, and more. Simplify GraphQL composition and enhance your development workflow with TailCall CLI."
slug: tailcall-graphql-cli
sidebar_label: Command Line
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

The `start` command launches the GraphQL Server for the specific configuration.

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

|                 File Name | Description                                                                                                                             |
| ------------------------: | --------------------------------------------------------------------------------------------------------------------------------------- |
| [.tailcallrc.schema.json] | Provides autocomplete in your editor when the configuration is written in `json` or `yml` format.                                       |
|          [.graphqlrc.yml] | An IDE configuration that references your GraphQL configuration (if it's in `.graphql` format) and the following `.tailcallrc.graphql`. |
|     [.tailcallrc.graphql] | Contains Tailcall specific auto-completions for `.graphql` format.                                                                      |

[.tailcallrc.schema.json]: https://github.com/tailcallhq/tailcall/blob/main/generated/.tailcallrc.schema.json
[.graphqlrc.yml]: https://the-guild.dev/graphql/config/docs
[.tailcallrc.graphql]: https://github.com/tailcallhq/tailcall/blob/main/generated/.tailcallrc.graphql

## gen

The `gen` command in the TailCall CLI is designed to generate GraphQL configurations from various sources, such as protobuf files and REST endpoints.

To generate a TailCall GraphQL configuration, provide a configuration file to the `gen` command. This configuration file should be in JSON or YAML format, as illustrated in the example below:

<Tabs>
<TabItem value="json" label="JSON">
```json
{
  "inputs": [
    {
      "curl": {
        "src": "https://jsonplaceholder.typicode.com/posts/1",
        "fieldName": "post",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer {{.env.AUTH_TOKEN}}"
        }
      }
    },
    {
      "proto": {
        "src": "./news.proto"
      }
    }
  ],
  "output": {
    "path": "./output.graphql",
    "format": "graphQL"
  },
  "schema": {
    "query": "Query"
  },
  "preset": {
    "mergeType": 1,
    "consolidateURL": 0.5
  }
}
```

</TabItem>
<TabItem value="yml" label="YML">

```yaml
inputs:
  - curl:
      src: "https://jsonplaceholder.typicode.com/posts/1"
      fieldName: "post"
      headers:
        Content-Type: "application/json"
        Accept: "application/json"
        Authorization: "Bearer {{.env.AUTH_TOKEN}}"
  - proto:
      src: "./news.proto"
output:
  path: "./output.graphql"
  format: "graphQL"
schema:
  query: "Query"
preset:
  mergeType: 1
  consolidateURL: 0.5
```

</TabItem>
</Tabs>

### Inputs

The `inputs` section specifies the sources from which the GraphQL configuration should be generated. Each source can be either a REST endpoint or a protobuf file.

1. **REST:** When defining REST endpoints, the configuration should include the following properties.

   1. **src (Required):** The URL of the REST endpoint. In this example, it points to a specific post on `jsonplaceholder.typicode.com`.
   2. **fieldName (Required):** A unique name that should be used as the field name, which is then used in the operation type. In the example below, it's set to `post`.
   3. **headers (Optional):** Users can specify the required headers to make the HTTP request in the headers section.

      :::info
      Ensure that secrets are not stored directly in the configuration file. Instead, use templates to securely reference secrets from environment variables. For example, see the following configuration where AUTH_TOKEN is referenced from the environment like `{{.env.AUTH_TOKEN}}`.
      :::

    <Tabs>
    <TabItem value="json" label="JSON">
      ```json
      {
        "curl": {
          "src": "https://jsonplaceholder.typicode.com/posts/1",
          "fieldName": "post",
          "headers": {
            "Authorization": "Bearer {{.env.AUTH_TOKEN}}"
          }
        }
      }
      ```
    </TabItem>
     <TabItem value="yml" label="YML">
      ```yml
      - curl:
          src: "https://jsonplaceholder.typicode.com/posts/1"
          fieldName: "post"
          headers:
            Content-Type: "application/json"
            Accept: "application/json"
            Authorization: "Bearer {{.env.AUTH_TOKEN}}"
      ```
    </TabItem>
    </Tabs>
   For the above input configuration, the following field will be generated in the operation type:

   ```graphql {2} showLineNumbers
   type Query {
     # field name is taken from the above JSON config
     post(p1: Int!): Post @http(path: "/posts/{{arg.p1}}")
   }
   ```

   :::important
   Ensure that each field name is **unique** across the entire configuration to prevent overwriting previous definitions.
   :::

2. **Proto:** For protobuf files, specify the path to the proto file (`src`).
   <Tabs>
   <TabItem value="json" label="JSON">
   ```json
   {
     "proto": {
       "src": "./path/to/file.proto"
     }
   }
   ```
   </TabItem>
   <TabItem value="yml" label="YML">
   ```yml
    - proto:
        src: "./news.proto"
    ```
   </TabItem>
   </Tabs>

### Output

The `output` section specifies the path and format for the generated GraphQL configuration.

- **path**: The file path where the output will be saved.
- **format**: The format of the output file. Supported formats are `json`, `yml`, and `graphql`.

:::tip
You can also change the format of the configuration later using the [check](#--format) command.
:::

### Preset

The config generator provides a set of tuning parameters that can make the generated configurations more readable by reducing duplication. This can be configured using the `preset` section.

<Tabs>
   <TabItem value="json" label="JSON">
   ```jsonc title="Presets with default values"
  {
    "preset": {
      "mergeType": 1,
      "consolidateURL": 0.5,
    },
  }
  ```
   </TabItem>
    <TabItem value="yml" label="YML">
   ```ymlc title="Presets with default values"
  preset:
    mergeType: 1
    consolidateURL: 0.5
  ```
   </TabItem>
</Tabs>

1. **mergeType:** This setting merges types in the configuration that satisfy the threshold criteria. It takes a threshold value between `0.0` and `1.0` to determine if two types should be merged or not. The default is `1.0`.

   For example, the following types `T1` and `T2` are exactly similar, and with a threshold value of `1.0`, they can be merged into a single type called `M1`:

   ```graphql {14} showLineNumbers title="Merging type T1 and T2 into M1"
   # BEFORE
   type T1 {
     id: ID
     firstName: String
     lastName: String
   }

   type T2 {
     id: ID
     firstName: String
     lastName: String
   }

   # AFTER: T1 and T2 are merged into M1.
   type M1 {
     id: ID
     firstName: String
     lastName: String
   }
   ```

2. **consolidateURL:** The setting identifies the most common base URL among multiple REST endpoints and uses this URL in the [upstream](directives.md#upstream-directive) directive. It takes a threshold value between 0.0 and 1.0 to determine the most common endpoint. The default is `0.5`.

   For example, if the `Query` type has three base URLs, using the `consolidateURL` setting with a `0.5` threshold will pick the base URL that is used in more than 50% of the [http](directives.md#http-directive) directives, `http://jsonplaceholder.typicode.com`, and add it to the upstream, cleaning the base URLs from the `Query` type.

   ```graphql showLineNumbers
   schema
     @server(hostname: "0.0.0.0", port: 8000)
     @upstream(httpCache: 42) {
     query: Query
   }

   type Query {
     post(id: Int!): Post
       @http(
         baseURL: "http://jsonplaceholder.typicode.com"
         path: "/posts/{{.args.id}}"
       )
     posts: [Post]
       @http(
         baseURL: "http://jsonplaceholder.typicode.com"
         path: "/posts"
       )
     user(id: Int!): User
       @http(
         baseURL: "http://jsonplaceholder.typicode.com"
         path: "/users/{{.args.id}}"
       )
     users: [User]
       @http(
         baseURL: "http://jsonplaceholder-1.typicode.com"
         path: "/users"
       )
   }
   ```

   After enabling the `consolidateURL` setting:

   ```graphql showLineNumbers
   schema
     @server(hostname: "0.0.0.0", port: 8000)
     @upstream(
       baseURL: "http://jsonplaceholder.typicode.com"
       httpCache: 42
     ) {
     query: Query
   }

   type Query {
     post(id: Int!): Post @http(path: "/posts/{{.args.id}}")
     posts: [Post] @http(path: "/posts")
     user(id: Int!): User @http(path: "/users/{{.args.id}}")
     users: [User]
       @http(
         baseURL: "http://jsonplaceholder-1.typicode.com"
         path: "/users"
       )
   }
   ```
