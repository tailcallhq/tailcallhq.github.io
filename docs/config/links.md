---
title: "links"
description: The links configuration is used for bringing external resources into your GraphQL schema.
slug: ../links-config
---

The `links` configuration is defined in a YAML file as follows:

```yaml title="Runtime Configuration" showLineNumbers
links:
  - src: "path_or_url_of_external_resource"
    type: "LinkType"
    id: "optional_identifier"
    headers:
      - key: "header_key"
        value: "header_value"
    protoPaths:
      - "path to proto"
```

The `links` configuration is used for bringing external resources into your GraphQL schema. It makes it easier to include configurations, .proto files for gRPC services, and other files into your schema. With this configuration, external resources are either merged with or used effectively in the importing configuration.

## How it Works

The `links` configuration requires specifying a source `src`, the resource's type `type`, and an optional identifier `id` for every entry:

- `src`: The source of the link is defined here. It can be either a URL or a file path. When a file path is given, it's relative to the file's location that is importing the link. (This field also supports Mustache template)

- `type`: This specifies the link's type, which determines how the imported resource is integrated into the schema. For a list of supported types, see the [Supported Types](#supported-types) section.

- `id`: This is an optional field that assigns a unique identifier to the link. It's helpful for referring to the link within the schema.

- `headers`: This is an optional field that assigns custom headers to the gRPC reflection server requests. Specifying a key-value map of header names and their values achieves this. (Values supports Mustache template)

- `proto_paths`: This is an optional field that specifies additional directories to search for imported proto files. It only takes effect when `type` is `Protobuf`.

### Linking other configs

With `links` you can link [schema files](#config) that will be merged together.

The schema definitions (i.e. types, unions, enums) are merged by the [federation composition rules](https://www.apollographql.com/docs/graphos/reference/federation/composition-rules)

For example, consider the following files:

```yaml title="Runtime Config"
server:
  port: 8000

upstream:
  httpCache: 10
  batch:
    delay: 10

links:
  - src: a.graphql
    type: Config
  - src: b.graphql
    type: Config
```

```graphql title="a.graphql"
schema {
  query: Query
}

type User {
  id: Int
  age: Int
}

union Media = Book | Movie

type Query {
  media: media
    @http(url: "http://jsonplaceholder.typicode.com/media")
}
```

```graphql title="b.graphql"
schema {
  query: Query
}

type Query {
  user(id: Int!): User
    @http(
      url: "http://jsonplaceholder.typicode.com/users/{{.args.id}}"
    )
}

union Media = Book | Podcast

type User {
  id: Int
  name: String
}
```

The merged result config will look like this:

```graphql
union Media = Book | Movie | Podcast

type Query {
  media: Foo
    @http(url: "http://jsonplaceholder.typicode.com/media")
  post(id: Int!): Post
    @http(
      url: "http://jsonplaceholder.typicode.com/users/{{.args.id}}"
    )
}

type User {
  id: Int
  age: Int
  name: String
}
```

## Example

The following example illustrates how to utilize the `links` configuration to incorporate a Protocol Buffers (.proto) file for a gRPC service into your GraphQL schema.

```yaml title="config.yaml"
server:
  port: 8000

upstream:
  httpCache: 10
  batch:
    delay: 10

links:
  - id: schema
    src: schema.graphql
    type: Config
  - id: news
    src: "./src/grpc/news.proto"
    type: Protobuf
    headers:
      - key: authorization
        value: Bearer 123
```

```graphql title="schema.graphql" showLineNumbers
schema {
  query: Query
}

type Query {
  news: NewsData!
    @grpc(method: "news.NewsService.GetAllNews")
}

type News {
  id: Int
  title: String
  body: String
  postImage: String
}

type NewsData {
  news: [News]!
}
```

## Example using Mustache template

The following example illustrates how to utilize the `links` configuration to incorporate a Protocol Buffers (.proto) file for a gRPC service into your GraphQL schema using Mustache template.

```yaml title="config.yaml"
server:
  port: 8000

upstream:
  httpCache: 10
  batch:
    delay: 10

links:
  - id: schema
    src: schema.graphql
    type: Config
  - id: news
    src: "{{.env.NEWS_PROTO_PATH}}"
    type: Protobuf
    headers:
      - key: authorization
        value: "{{.env.BEARER}}"
```

```graphql title="schema.graphql" showLineNumbers
type Query {
  news: NewsData!
    @grpc(method: "news.NewsService.GetAllNews")
}

type News {
  id: Int
  title: String
  body: String
  postImage: String
}

type NewsData {
  news: [News]!
}
```

In the above example, you can notice that `src` is changed to `src: "{{.env.NEWS_PROTO_PATH}}"`
and value for auth is changed to `value: "{{.env.BEARER}}"`.

Assuming `BEARER="Bearer 123"` and `NEWS_PROTO_PATH=./src/grpc/news.proto` is set as
your environment variables, the parsed config will automatically parse the mustache templates
and populate it with the values given.

## Supported Types

The `links` configuration enriches your configuration by supporting the integration of external resources. Each link type is designed to serve a specific purpose, enhancing the functionality and flexibility of your schema. Below is a detailed overview of each supported link type:

### Config

The `Config` link type is essential for importing other configuration files. This feature enables a modular approach to schema management by allowing configurations from the imported file to override overlapping settings in the main schema. This functionality is useful in large projects, where maintaining a single monolithic schema file becomes impractical. By using `Config`, developers can split their schema configurations into manageable pieces, thus promoting better organization and scalability.

Example use case:

- Modularizing schema configurations for different environments (development, staging, production).
- Reusing common configurations across multiple schema files.

### Protobuf

The `Protobuf` link type integrates Protocol Buffers definitions by importing .proto files. This integration is crucial for Tailcall to communicate with gRPC services. By including `.proto` definitions, the GraphQL server can directly interact with gRPC services, allowing for efficient and type-safe communication.

For detailed integration steps and best practices, refer to the [gRPC Integration Guide](/docs/grpc.md).

### Script

The `Script` link type allows the config to link to an external JavaScript file. This file can contain custom logic that is executed in response to HTTP request-response events. This feature enables developers to implement custom behaviors, such as adding headers to responses or filtering requests based on specific criteria.

Example script for adding a custom header to all outgoing requests:

```javascript showLineNumbers
function onRequest({request}) {
  // Add a custom header for all outgoing requests
  request.headers["X-Custom-Header"] = "Processed"

  // Return the updated request
  return {request}
}
```

### Cert

The `Cert` link type is designed for importing SSL/TLS certificates, a crucial component for enabling HTTPS in your GraphQL server. This link type ensures that the server can expose connections over HTTPS.

:::tip
When using the `Cert` link type, specify the path to the certificate file. Ensure the certificate is up-to-date and issued by a trusted certificate authority (CA) to avoid security warnings or connection issues.
:::

Example use case:

- Securing communication between the GraphQL server and clients.
  - Enhancing privacy and security by encrypting data in transit.

### Key

The `Key` link type imports the private key associated with your SSL/TLS certificate, enabling HTTPS for your GraphQL server. The private key is a critical security element that decrypts information encrypted by the corresponding public key in the SSL/TLS certificate.

When configuring the `Key` link type, provide the path to your private key file. Ensure the private key matches the imported certificate specified by the [Cert](#cert) link above, and is protected by appropriate file permissions to maintain security.

### Operation

The `Operation` link type connects your schema to a set of predefined, GraphQL spec-compliant queries and mutations. This functionality allows for the validation and optimization of these operations by the GraphQL server.

Each type serves a specific purpose, enabling the flexible integration of external resources into your GraphQL schema.

### Htpasswd

The `Htpasswd` link type allows the importation of an [`htpasswd`](https://httpd.apache.org/docs/2.4/programs/htpasswd.html) file. This file is utilized to set up [Basic authentication](../auth.md#basic-authentication).

### Jwks

The `Jwks` link type enables the importation of a [`JWKS`](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets) file. This file facilitates the provision of detailed access control through [JWT authentication](../auth.md#jwt-authentication).

### Grpc

The `Grpc` link type enables the GraphQL server to understand that the specified source is a gRPC endpoint that supports reflection.
