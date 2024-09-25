---
title: Integrating External Resources with the @link Directive
sidebar_label: "@link Directive"
---

## @link Directive

The `@link` directive is used for bringing external resources into your GraphQL schema. It makes it easier to include configurations, .proto files for gRPC services, and other files into your schema. With this directive, external resources are either merged with or used effectively in the importing configuration.

### How it Works

The `@link` directive requires specifying a source `src`, the resource's type `type`, and an optional identifier `id`.

- `src`: The source of the link is defined here. It can be either a URL or a file path. When a file path is given, it's relative to the file's location that is importing the link.

- `type`: This specifies the link's type, which determines how the imported resource is integrated into the schema. For a list of supported types, see the [Supported Types](#supported-types) section.

- `id`: This is an optional field that assigns a unique identifier to the link. It's helpful for referring to the link within the schema.

### Example

The following example illustrates how to utilize the `@link` directive to incorporate a Protocol Buffers (.proto) file for a gRPC service into your GraphQL schema.

```graphql showLineNumbers
schema
  @server(port: 8000)
  @upstream(
    baseURL: "http://news.local"
    httpCache: 42
    batch: {delay: 10}
  )
  @link(
    id: "news"
    src: "./src/grpc/news.proto"
    type: Protobuf
  ) {
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

### Supported Types

The `@link` directive enriches your configuration by supporting the integration of external resources. Each link type is designed to serve a specific purpose, enhancing the functionality and flexibility of your schema. Below is a detailed overview of each supported link type:

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

The `Htpasswd` link type allows the importation of an [`htpasswd`](https://httpd.apache.org/docs/2.4/programs/htpasswd.html) file. This file is utilized to set up [Basic authentication](./auth.md#basic-authentication).

### Jwks

The `Jwks` link type enables the importation of a [`JWKS`](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets) file. This file facilitates the provision of detailed access control through [JWT authentication](./auth.md#jwt-authentication).
