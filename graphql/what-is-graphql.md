---
title: "What is GraphQL?: A simple GraphQL Introduction"
sidebar_label: What is GraphQL?
description: "GraphQL is a query language for your API and a server-side runtime for executing queries using a type system you define for your data."
slug: what-is-graphql
---

<head>
  <title>What is GraphQL?: A simple GraphQL Introduction</title>
</head>

Due to the rise of mobile devices, the internet is now accessed by a variety of devices, not just web browsers. With the increase in types of internet users, the days of simply pulling data from databases and rendering it on web pages are over. Now, we need to consider how to retrieve data from databases and display it on mobile devices, smartwatches, smart TVs, and even refrigerators.

Today, we expect app developers to create rich, complex user interfaces that are accessible on a variety of devices, aiming to make the user experience as memorable as possible.

![Client asking for things it needs from servers](../static/images/graphql/gql-client.png)
_The client requests specific data from various APIs, knowing which data comes from each source and is responsible for combining the data into the desired format._

To cater to these diverse needs, we need a more flexible way to interact with APIs. This is where [**GraphQL**](/graphql) comes in.

## GraphQL on Client and Server

### Client Side

GraphQL is a query language for your APIs i.e. It is a language that gives clients capability to ask for exactly what they need without worrying where to get it from.

Instead of making traditional `GET`, `POST`, `PUT`, and `DELETE` requests to different endpoints.
GraphQL needs only one endpoint to interact typically on method `POST`. The client is responsible for sending queries in the body of the `POST` request. The request will look something like this:
![Sample graphql request](../static/images/graphql/graphql-request.png)
_The GraphQL query is sent as a string inside a JSON object_

### Server Side

GraphQL on the server side, GraphQL is a **runtime** which can understand these "queries" and fetches data from various data sources, bundle them up in the shape that the client requested and sends it back in an HTTP response.
![Sample GraphQL Response](../static/images/graphql/graphql-response.png)
_The response object is inside the `data` key of the JSON object._

GraphQL server is responsible to expose the schema, which is a contract between the client and the server. It defines what queries clients can make, what types of data can be fetched, and what mutations can be performed.

For GraphQL, the origin of the data is irrelevant—it could come from a database, a microservice, or even a RESTful API.

In essence, GraphQL is not concerned with the source of the data.

## GraphQL over HTTP

Check out the diagram below, to get a better understanding of how GraphQL is used in your stack.
![GraphQL over HTTP](../static/images/graphql/graphql-over-http.png)

### GraphQL client-server interaction:

1. The client sends a query to the server. Note that the query is not really in JSON format, but it looks like the shape of the JSON data client needs. So when the `POST` request is made, the query is sent as a string inside a JSON object by the client.
2. The server receives the JSON object and extracts the query string from it. Server than parses the query to check proper syntax and validates against the GraphQL schema(Contract between client and server).
3. Based on the query, the server than fetches the data from the data sources and bundles them up in the JSON object of shape that the client requested.

## GraphQL Adoption

Due to this flexibility the adoption of GraphQL has been increasing rapidly. There are many GraphQL implementations available in various languages like JavaScript, Python, Ruby, Java, Rust and more.

Starting off as a "Hobbyist" stack, GraphQL has now been adopted by many big companies like Netflix, GitHub, Twitter, Pinterest, Shopify, and [more](https://landscape.graphql.org/card-mode?category=graph-ql-adopter&grouping=category).

## Frequently Asked Questions

### What is GraphQL?

GraphQL is a query language for your API and a server-side runtime for executing queries by using a type system you define for your data.

### Is GraphQL frontend or backend?

GraphQL has two parts: the client-side and the server-side. On the client-side, GraphQL is a query language that allows you to ask for the data you need. On the server-side, GraphQL is a runtime for executing those queries by using a type system you define for your data.

### Is GraphQL an API Gateway?

GraphQL is not an API Gateway. However, it can be used as a layer between your client and your existing APIs to provide a more flexible and efficient way to interact with your data.

### Is GraphQL a Database?

GraphQL is not a database. It is a query language for your API and a server-side runtime for executing queries by using a type system you define for your data. GraphQL can be used to query data from databases, REST APIs, and other data sources.

### Is GraphQL better than REST?

It depends on your use case. GraphQL and REST are two different methodologies for developing APIs. GraphQL allows clients to request exactly the data they need, avoiding over-fetching and under-fetching issues common with REST. Since there is more efficiency associated with working with GraphQL, development is much faster with GraphQL than it would be with REST.

### How can I convert my REST APIs to GraphQL?

You can use tools like [Tailcall](https://tailcall.run). Which is the simplest way to convert your Rest APIs to GraphQL APIs. You can find more details on this [here](https://tailcall.run/docs).
