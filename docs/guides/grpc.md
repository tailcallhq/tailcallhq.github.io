---
title: Integration with gRPC service
---

In this guide we will setup simple gRPC service and use it inside Tailcall's config to fetch some of the data provided by the service. This way Tailcall can provide single GraphQL interface wrapping any number of gRPC services.

## What is gRPC?

This guide assumes a basic familiarity with gRPC.

**gRPC** is a high-performance framework created by Google for remote procedure calls (RPCs). Its key features include:

- **HTTP/2 Transport:** Ensures efficient and fast data transfer.
- **Protocol Buffers (Protobuf):** Serves as a powerful interface description language.
- **Efficiency:** Offers binary serialization, reduced latency, and supports data streaming.

This combination of features makes gRPC ideal for microservices and distributed systems.

If you need a more detailed understanding or are new to gRPC, we recommend visiting the [official gRPC website](https://grpc.io/) for comprehensive documentation and resources.

Now, let's explore how gRPC can be integrated into our proxy gateway to enhance communication and data exchange in distributed systems.

## gRPC upstream

We need some gRPC service available to be able to execute requests from Tailcall gateway. For the pure example purposes, we will build some simple gRPC service.

### Protobuf definition

First, we need to create example protobuf file that will define the structure of data we want to transmit using gRPC.

Here are the definition of `NewsService` that implements CRUD operations on news data that we'll put into `news.proto` file.

```protobuf
syntax = "proto3";

import "google/protobuf/empty.proto";

// Define message type for News with all its fields
message News {
    int32 id = 1;
    string title = 2;
    string body = 3;
    string postImage = 4;
}

// Message with just id of single news
message NewsId {
    int32 id = 1;
}

// List of ids of news to get multiple response
message MultipleNewsId {
    repeated NewsId ids = 1;
}

// List of all news
message NewsList {
   repeated News news = 1;
}

// NewsService defines read and write operations for news items
service NewsService {
    // GetAllNews retrieves all news items without any arguments
    rpc GetAllNews (google.protobuf.Empty) returns (NewsList) {}

    // GetNews fetches a single news item by its ID
    rpc GetNews (NewsId) returns (News) {}

    // GetMultipleNews retrieves multiple news items based on their IDs
    rpc GetMultipleNews (MultipleNewsId) returns (NewsList) {}
}
```

### Implement gRPC service

Now having the protobuf file you can write a server that implements `NewsService` at any language you want that supports gRPC.

Tailcall organization has sample node.js service inside [this repo](https://github.com/tailcallhq/node-grpc) that you can pull to your local machine

To spin up the sample service just run inside repo

```sh
npm i
node server
```

and wait for logs about service is running.

## Tailcall config

Now when we have a running gRPC service we're going to write Tailcall's config to make the integration.

To do this we need to specify GraphQL types corresponding to gRPC types we have defined in protobuf file. Let's create new file `grpc.graphql` file with following content:

```graphql
# The GraphQL representation for News message type
type News {
  id: Int
  title: String
  body: String
  postImage: String
}

# Input type that is used to fetch news data by its id
input NewsInput {
  id: Int
}

# Resolves multiple news entries
type NewsData {
  news: [News]!
}
```

Now when we have corresponding types in schema we want to define GraphQL Query that specifies the operation we can execute onto news. We can extend our config with next Query:

```graphql
type Query {
  # Get all news i.e. NewsService.GetAllNews
  news: NewsData!
  # Get single news by id i.e. NewsService.GetNews
  newsById(news: NewsInput!): News!
}
```

It not working example yet because we haven't specified how to use connect to server. To do this you may want to explore more about [`@grpc` operator](../operators/grpc.md). It's usage is pretty straightforward and require you to specify some required options like path to protobuf file itself, name of the service and method that should be used to make a call.

If you need to provide any input to gRPC method call you can specify it with the `body` option that allows to specify a Mustache template and therefore it could use any input data like `args` and `value` to construct the body request. The body value is specified in the JSON format if you need to create the input manually and cannot just use `args` input.

```graphql
type Query {
  news: NewsData!
    @grpc(
      service: "NewsService"
      method: "GetAllNews"
      protoPath: "news.proto"
    )
  newsById(news: NewsInput!): News!
    @grpc(
      service: "NewsService"
      method: "GetNews"
      body: "{{args.news}}"
      protoPath: "news.proto"
    )
}
```

And it's only left to specify options of Tailcall's ingress and egress in the beginning of the config using [`@server`](../operators/server.md) and [`@upstrem`](../operators/upstream.md) operators. Wrapping up the whole result config that may look like this:

```graphql
# highlight-start
schema @server(port: 8000, graphiql: true) @upstream(baseURL: "http://localhost:50051", httpCache: true) {
  query: Query
}

type Query {
  news: NewsData!
    @grpc(
      service: "NewsService"
      method: "GetAllNews"
      protoPath: "src/grpc/tests/news.proto"
    )
  newsById(news: NewsInput!): News!
    @grpc(
      service: "NewsService"
      method: "GetNews"
      body: "{{args.news}}"
      protoPath: "src/grpc/tests/news.proto"
    )
}
# highlight-end

type News {
  id: Int
  title: String
  body: String
  postImage: String
}

input NewsInput {
  id: Int
}

type NewsData {
  news: [News]!
}
```

And now you can go to the page `http://127.0.0.1:8000/graphql` and execute some GraphQL queries e.g.:

```graphql
{
  news {
    news {
      id
      title
      body
    }
  }
}
```

Or

```graphql
{
  newsById(news: {id: 2}) {
    id
    title
    body
  }
}
```

### Batching

Another important feature of `@grpc` operator is that it allows you to implement request batching for remote data almost effortlessly as soon as you have gRPC methods that implements resolves multiple responses for multiple input in single request.

In out protobuf example file we have such a method called `GetMultipleNews` that we can use. To enable batching we need to enable [`@upstream.batch` option](../operators/upstream.md#batch) first and specify `groupBy` option for the `@grpc` operator.

```graphql
schema @server(port: 8000, graphiql: true) @upstream(baseURL: "http://localhost:50051", httpCache: true, batch: {delay: 10}) {
  query: Query
}

type Query {
  newsById(news: NewsInput!): News!
    @grpc(
      service: "NewsService"
      method: "GetNews"
      body: "{{args.news}}"
      protoPath: "src/grpc/tests/news.proto"
      # highlight-next-line
      groupBy: ["news", "id"]
    )
}
```

Restart the Tailcall server and make the query with multiple news separately, e.g.:

```graphql
{
  n1: newsById(news: {id: 1}) {
    id
    title
    body
  }
  n2: newsById(news: {id: 2}) {
    id
    title
    body
  }
}
```

Those 2 requests will be executed inside single request to gRPC method `GetMultipleNews`

## Conclusion

Well done on integrating a gRPC service with the Tailcall gateway! This tutorial has demonstrated the straightforward and efficient process, showcasing Tailcall's compatibility with advanced communication protocols like gRPC.

You can find this working example and test it by yourself by next links:

- [node-grpc](https://github.com/tailcallhq/node-grpc) - example implementation for gRPC service in node.js
- [gRPC example config](https://github.com/tailcallhq/tailcall/blob/main/examples/grpc.graphql) - Tailcall's config to integrate with gRPC service above

### Key Takeaways

- **Simplicity of Integration:** The integration of gRPC with Tailcall is not only seamless but also enhances the overall capability of your system to handle high-performance and efficient data composition.
- **Scalability and Performance:** By leveraging the power of gRPC along with Tailcall, we've laid a foundation for building scalable and high-performing distributed systems.

### Next Steps

With the basics in place, we encourage you to explore further:

- **Dive Deeper:** Tailcall gateway offers a lot of other features and configurations that you can utilize. Dive deeper into our documentation to explore more advanced settings and customization options.
- **Explore Other Guides:** Our documentation is filled with various guides and tutorials that can help you leverage the full potential of Tailcall in different scenarios. Whether it's adding security layers, load balancing, or detailed logging, there's a lot more to explore.
