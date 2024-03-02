---
title: "@link Directive Documentation"
---

# @link Directive

The **@link** directive is a crucial component for integrating external resources into your GraphQL schema. This documentation provides a detailed explanation of the directive's functionality, syntax, and the types it supports.

## Overview

The `@link` directive simplifies the process of incorporating external resources, including configurations, .proto files for gRPC services, and other files, into your GraphQL schema. This powerful operator allows for effective merging or utilization of external resources within the importing configuration.

## How it Works

The `@link` directive requires the specification of three key parameters:

- **src**: This defines the source of the link, which can be a URL or a file path. When using a file path, it's relative to the location of the file importing the link.

- **type**: Specifies the link's type, dictating how the imported resource integrates into the schema. Refer to the [Supported Types](#supported-types) section for a comprehensive list.

- **id (Optional)**: An optional field allowing the assignment of a unique identifier to the link. This identifier proves beneficial for referencing the link within the schema.

## Example

Explore the following example showcasing the implementation of the `@link` directive. In this scenario, a Protocol Buffers (.proto) file for a gRPC service is seamlessly incorporated into the GraphQL schema:

```graphql showLineNumbers
schema
  @server(port: 9000, graphiql: true)
  @upstream(baseURL: "http://localhost:60051", httpCache: true, batch: {delay: 5})
  @link(id: "blog", src: "../src/grpc/blog.proto", type: Protobuf) {
  query: Query
}

type Query {
  blogPosts: BlogData! @grpc(method: "blog.BlogService.GetAllPosts")
}

type BlogPost {
  postId: Int
  title: String
  content: String
  imageUrl: String
}

type BlogData {
  blogPosts: [BlogPost]!
}

- The GraphQL schema defines a new BlogPost type with different fields such as postId, title, content, and imageUrl.
- The @link directive is used with a unique identifier (id: "blog") to incorporate a Protocol Buffers (.proto) file for a gRPC service related to blogs.
- The @upstream directive specifies a different port and base URL for the gRPC service.
- The @grpc directive within the Query type is used to fetch blog posts from the gRPC service.

## Supported Types

The `@link` directive offers support for various types, each fulfilling a specific role in the integration of external resources into your GraphQL schema:

- **Config**: Imports a configuration file.
- **Protobuf**: Integrates a .proto file for gRPC services.
- **Script**: Permits the import of a JavaScript file.
- **Cert**: Includes a certificate file.
- **Key**: Facilitates the import of a key file.

This level of flexibility empowers developers to seamlessly incorporate a wide range of external resources, enhancing the versatility of their GraphQL schema.
```
