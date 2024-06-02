---
title: GraphQL on gRPC
description: "Learn how to integrate gRPC services with Tailcall's GraphQL gateway in this comprehensive guide. Discover the benefits of using gRPC, a high-performance framework by Google, for efficient data transfer in microservices and distributed systems. Understand how to set up simple gRPC services, define protobuf files, and implement a gRPC server. Explore how to configure Tailcall to seamlessly connect GraphQL types to gRPC types and enable advanced features like batching and reflection for dynamic service discovery. This guide is perfect for developers looking to enhance their system's capability to handle high-performance data operations with simplicity and scalability. Ideal for those with a basic understanding of gRPC, ready to dive into practical integration with Tailcall."
---

In this guide, we will set up a simple gRPC service and use it inside Tailcall's config to fetch some of the data provided by the service. This way Tailcall can provide a single GraphQL interface wrapping any number of gRPC services.

## What is gRPC?

This guide assumes a basic familiarity with gRPC. It is a high-performance framework created by Google for remote procedure calls (RPCs). Its key features include:

- **HTTP/2 Transport:** Ensures efficient and fast data transfer.
- **Protocol Buffers (Protobuf):** Serves as a powerful interface description language.
- **Efficiency:** Offers binary serialization, reduces latency, and supports data streaming.

This combination of features makes gRPC ideal for microservices and distributed systems. If you need a more detailed understanding or are new to gRPC, we recommend visiting the [official gRPC website](https://grpc.io/) for comprehensive documentation and resources.

Now, let's explore how gRPC can be integrated into our proxy gateway to enhance communication and data exchange in distributed systems.

## gRPC upstream

We need some gRPC service available to be able to execute requests from the Tailcall gateway. For pure example purposes, we will build some simple gRPC services.

### Protobuf definition

First, we need to create an example protobuf file that will define the structure of the data we want to transmit using gRPC. Here is the definition of `NewsService` that implements CRUD operations on news data that we'll put into the `news.proto` file.

```protobuf
syntax = "proto3";

import "google/protobuf/empty.proto";

package news;

// Define message type for News with all its fields
message News {
    int32 id = 1;
    string title = 2;
    string body = 3;
    string postImage = 4;
}

// Message with the id of a single news
message NewsId {
    int32 id = 1;
}

// List of IDs of news to get multiple responses
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

Now having the protobuf file you can write a server that implements `NewsService` at any language you want that supports gRPC. Tailcall organization has a sample node.js service inside [this repo](https://github.com/tailcallhq/node-grpc) that you can pull to your local machine. To spin up the sample service run inside the repo and wait for logs about the service running.

```sh
npm i
npm start
```

## Tailcall config

Now when we have a running gRPC service we're going to write Tailcall's config to make the integration. To do this we need to specify GraphQL types corresponding to gRPC types we have defined in the protobuf file. Let's create a new file `grpc.graphql` file with the following content:

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

Now when we have corresponding types in schema we want to define GraphQL Query that specifies the operation we can execute onto news. We can extend our config with the next Query:

```graphql
type Query {
  # Get all news i.e. NewsService.GetAllNews
  news: NewsData!
  # Get single news by id i.e. NewsService.GetNews
  newsById(news: NewsInput!): News!
}
```

Also, let's specify options for Tailcall's ingress and egress at the beginning of the config using [`@server`](/docs/directives/#server-directive) and [`@upstream`](/docs/directives/#upstream-directive) directives.

```graphql
schema
  @server(port: 8000)
  @upstream(
    baseURL: "http://localhost:50051"
    httpCache: 42
  ) {
  query: Query
}
```

To specify the protobuf file to read types from, use the `@link` directive with the type `Protobuf` on the schema. `id` is an important part of the definition that will be used by the `@grpc` directive later

```graphql
schema @link(id: "news", src: "./news.proto", type: Protobuf)
```

Now you can connect GraphQL types to gRPC types. To do this you may want to explore more about [`@grpc` directive](/docs/directives/#grpc-directive). Its usage is pretty straightforward and requires you to specify the path to a method that should be used to make a call. The method name will start with the package name, followed by the service name and the method name, all separated by the `.` symbol.

If you need to provide any input to the gRPC method call you can specify it with the `body` option that allows you to specify a Mustache template and therefore it could use any input data like `args` and `value` to construct the body request. The body value is specified in the JSON format if you need to create the input manually and cannot use `args` input.

```graphql
type Query {
  news: NewsData!
    @grpc(method: "news.news.NewsService.GetAllNews")
  newsById(news: NewsInput!): News!
    @grpc(
      service: "news.news.NewsService.GetNews"
      body: "{..args.news}}"
    )
}
```

Wrapping up the whole result config that may look like this:

```graphql
# file: app.graphql

schema
  @server(port: 8000)
  @upstream(
    baseURL: "http://localhost:50051"
    httpCache: 42
  )
  @link(id: "news", src: "./news.proto", type: Protobuf) {
  query: Query
}

type Query {
  news: NewsData!
    @grpc(method: "news.news.NewsService.GetAllNews")
  newsById(news: NewsInput!): News!
    @grpc(
      method: "news.news.NewsService.GetNews"
      body: "{{.args.news}}"
    )
}

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

Start the server by pointing it to the config.

```
tailcall start ./app.graphql
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

## Batching

Another important feature of the `@grpc` directive is that it allows you to implement request batching for remote data almost effortlessly as soon as you have gRPC methods that resolve multiple responses for multiple inputs in a single request.

In our protobuf example file, we have a method called `GetMultipleNews` that we can use. To enable batching we need to enable [`@upstream.batch` option](/docs/directives/#batch) first and specify `batchKey` option for the `@grpc` directive.

```graphql
schema
  @server(port: 8000)
  @upstream(
    baseURL: "http://localhost:50051"
    httpCache: 42
    batch: {delay: 10}
  )
  @link(id: "news", src: "./news.proto", type: Protobuf) {
  query: Query
}

type Query {
  newsById(news: NewsInput!): News!
    @grpc(
      method: "news.NewsService.GetNews"
      body: "{{.args.news}}"
      # highlight-next-line
      batchKey: ["news", "id"]
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

Those 2 requests will be executed inside a single request to the gRPC method `GetMultipleNews`

## Reflection

gRPC reflection is a potent feature enabling clients to dynamically discover services and their methods at runtime. Tailcall enhances this capability by obviating the need for developers to link each proto file individually. This feature proves particularly valuable in environments where proto files are continuously evolving or when services dynamically expose varying methods. Here are the steps to follow:

1. Add the gRPC endpoint as a [link] with type set to `Grpc`. This enables the Tailcall server to understand that the specified source is a gRPC endpoint that supports reflection.

   ```graphql
   schema
     @link(
       src: "https://my-grpc-service.com:50051"
       type: Grpc
     ) {
     query: Query
   }
   ```

2. Next, as before we will just add the methods with a fully qualified name:

   ```graphql
   type Query {
     news: [News]
       @grpc(method: "news.NewsService.GetAllNews")
   }

   type News {
     id: Int
     title: String
     body: String
     postImage: String
   }
   ```

## Conclusion

Well done on integrating a gRPC service with the Tailcall gateway! This tutorial has demonstrated the straightforward and efficient process, showcasing Tailcall's compatibility with advanced communication protocols like gRPC.

You can find this working example and test it by yourself by the next links:

- [node-grpc](https://github.com/tailcallhq/node-grpc) - example implementation for gRPC service in node.js
- [gRPC example config](https://github.com/tailcallhq/tailcall/blob/main/examples/grpc.graphql) - Tailcall's config to integrate with gRPC service above

### Key Takeaways

- **Simplicity of Integration:** The integration of gRPC with Tailcall seamlessly enhances the overall capability of your system to handle high-performance and efficient data composition.
- **Scalability and Performance:** By leveraging the power of gRPC along with Tailcall, we've laid a foundation for building scalable and high-performing distributed systems.

### Next Steps

With the basics in place, we encourage you to explore further:

- **Dive Deeper:** Tailcall gateway offers a lot of other features and configurations that you can utilize. Dive deeper into our documentation to explore more advanced settings and customization options.
- **Explore Other Guides:** Our documentation includes a variety of guides and tutorials that can help you leverage the full potential of Tailcall in different scenarios. Whether it's adding security layers, load balancing, or detailed logging, there's a lot more to explore.
