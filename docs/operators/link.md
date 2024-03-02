---
title: "@link"
---

The **@link** operator is used for bringing external resources into your GraphQL schema. It makes it easier to include configurations, .proto files for gRPC services, and other files into your schema. With this operator, external resources are either merged with or used effectively in the importing configuration.

## How it Works

The `@link` directive requires specifying a source (`src`), the resource's type (`type`), and an optional identifier (`id`).

- `src`: The source of the link is defined here. It can be either a URL or a file path. When a file path is given, it's relative to the file's location that is importing the link.

- `type`: This specifies the link's type, which determines how the imported resource is integrated into the schema. For a list of supported types, see the [Supported Types](#supported-types) section.

- `id`: This is an optional field that assigns a unique identifier to the link. It's helpful for referring to the link within the schema.

## Example

The following example illustrates how to utilize the `@link` directive to incorporate a Protocol Buffers (.proto) file for a gRPC service into your GraphQL schema.

```graphql showLineNumbers
schema
  @server(port: 8000, graphiql: true)
  @upstream(baseURL: "http://localhost:50051", httpCache: true, batch: {delay: 10})
  @link(id: "news", src: "../src/grpc/news.proto", type: Protobuf) {
  query: Query
}

type Query {
  news: NewsData! @grpc(method: "news.NewsService.GetAllNews")
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

## Supported Types

The `@link` directive supports the following types of links:

- `Config`: Imports a schema configuration file.
- `Protobuf`: Imports a .proto file for gRPC services.
- `Script`: Imports a JavaScript file.
- `Cert`: Imports a certificate file.
- `Key`: Imports a key file.

Each type serves a specific purpose, enabling the flexible integration of external resources into your GraphQL schema.
