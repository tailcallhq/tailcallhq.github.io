---
title: Frequently Asked Questions
description: Get answers to the most frequently asked questions about Tailcall, including performance, features, installation, and more.
slug: faq
---

# Frequently Asked Questions

Here are answers to some of the most frequently asked questions. If you don't see what you're looking for, please feel free to [contact us](https://discord.com/invite/kRZBPpkgwq)!

## Performance

**What sort of throughput and latency can we expect?**

Check out our [benchmarks page](https://github.com/tailcallhq/graphql-benchmarks) for detailed information.

**What is the maximum capacity that Tailcall can manage effectively?**

Tailcall is designed to scale horizontally and can handle billions of requests per second.

## Features

**I use REST APIs. How can I use Tailcall if I don’t currently use GraphQL?**

You can use Tailcall in two ways:

1. You can use Tailcall to build a GraphQL server atop your existing REST APIs and Tailcall's `@http` directive. And you can replace your REST APIs with GraphQL over time.
2. In case you don't want to use GraphQL, Tailcall has a directive called `@rest` that lets you use the composition capabilities of GraphQL without needing you to adopt GraphQL for your endpoints. This directive makes Tailcall GraphQL queries and mutations available as REST endpoints.

**Can Tailcall generate GraphQL from gRPC APIs?**

Absolutely! Tailcall automatically generates GraphQL configurations from REST, gRPC, and existing GraphQL configuration files. We even support a hybrid integration of REST and gRPC. You can learn more about generating GraphQL configuration from gRPC APIs [here](https://tailcall.run/docs/graphql-grpc-tailcall/).

**Is authentication built-in with Tailcall? If yes, how?**

Yes, Tailcall offers a simple way to add entity-level authentication to your GraphQL schema. You can read more about it [here](https://tailcall.run/docs/field-level-access-control-graphql-authentication/).

**Does Tailcall work with HTTP/2?**

Yes, Tailcall supports HTTP/2 for both server (ingress) and client (egress) operations, enabling the protocol for incoming and outgoing server requests. For egress, no special settings are needed Tailcall will automatically upgrade the connection to HTTP/2 whenever possible.

**Do you follow the Federation specification?**

Yes, our subgraph is fully compatible with the Federation specification.

**Are you going to have a control plan like Apollo or Cosmo that has a self-hosted solution?**

Yes, it’s in the works! Please [contact us](https://discord.com/invite/kRZBPpkgwq) to get more details.

## Installation

**What observability integrations do you support?**

Tailcall integrates with Apollo Studio, Data Dog, New Relic, and Honeycomb for telemetry.

**Where can I deploy Tailcall apps?**

Tailcall is built using Rust and when you compile Rust, it gets compiled to an executable. You can then run the binary from anywhere - including your own self-hosted server!
You can also run them as serverless functions through supported platforms like AWS Lambda. Each of these deployment methods have their own tradeoffs. You can also deploy Tailcall apps on Kubernetes, Docker, or any other container orchestration platform.
Tailcall can also be compiled to WebAssembly and run in the browser/js based server .

## Trivia

**Why did you start Tailcall?**

Tailcall was inspired by our experiences at Dream11, a fast-growing fantasy sports platform with over 200 million users. As the platform grew rapidly, we needed to make frequent UI changes and maintain type safety on the backend. We adopted GraphQL on the frontend’s recommendation, which reduced our workload, but as the platform expanded, infrastructure costs skyrocketed. Handwriting GraphQL servers also became cumbersome and error-prone.

We developed a Domain Specific Language (DSL) to address GraphQL’s performance issues and other concerns, which helped us cut infrastructure costs by 90%. Our key takeaway was that APIs should be independently built and operated, and GraphQL should be used as a client-side abstraction closer to the client, not the server. This knowledge shaped the way we architected Tailcall today! You can read more about our GraphQL journey at Dream11 [here](https://tailcall.run/blog/dream11-graphql-case-study/).

**What specific problem does Tailcall solve and for whom? Who is your ideal customer?**

Tailcall is perfect for growing companies that need efficient API management and are currently using REST APIs. Imagine you have a REST API and run an e-commerce store. The UI must make three separate requests:

- One to get the list of products.
- Another to get the seller details for each product.
- A third to get the reviews for each product and calculate the average rating.

**Manual Composition**: The UI is responsible for combining product data with seller names and calculating the average rating.

**Over-fetching**: REST endpoints may return unnecessary fields, leading to over-fetching of data that the UI does not need.

With GraphQL, a single query can be crafted to fetch exactly what the UI needs in one request. The GraphQL schema defines the relationships, simplifying data retrieval. However, setting this up usually involves writing backend code.

Tailcall takes it a step further, enabling you to build an efficient GraphQL server using only a configuration file—no code required. This significantly speeds up the development process.

**Is GraphQL dead? Why do you use GraphQL when so many in the industry think it’s dead?**

Handwriting GraphQL can solve certain problems but also introduces new challenges. While manual GraphQL might fade away, combining GraphQL with a powerful runtime like Tailcall has a bright future!

**We already have a GraphQL API ready and don't have a reason to change. Why should we use Tailcall?**

While GraphQL is great for querying, manually writing backend code introduces complexity and potential errors. Tailcall simplifies this by letting you build a fast GraphQL server with just a configuration file, greatly speeding up your development. We encourage you to [try it](https://tailcall.run/docs/) out, and if you have questions, we’re here to help!

**What does the name Tailcall mean?**

Our name was inspired by "tail call optimization" (TCO), a concept in programming that perfectly reflects our mission to optimize performance and turbocharge developers' productivity!

**I am ready for Tailcall. What next?**

Awesome! Check out our [Getting Started](https://tailcall.run/docs/) page to begin your journey. For any questions or to chat with us, join us on [Discord](https://discord.com/invite/kRZBPpkgwq).
