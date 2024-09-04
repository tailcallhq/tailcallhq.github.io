
# Frequently Asked Questions

Below are answers to some frequently asked questions. Please [contact us](https://discord.com/invite/kRZBPpkgwq) if you do not see your answer here.

## Performance

**What sort of throughput and latency can we expect?**

Please refer to our [benchmarks page](https://github.com/tailcallhq/graphql-benchmarks).

**How much scale can Tailcall handle?**

We are horizontally scalable and can handle billions of requests per second.

## Features

**I use REST APIs. How can I use Tailcall if I don’t currently use GraphQL?**

Tailcall has developed a directive called `@rest` to take advantage of the composition capabilities of GraphQL without requiring you to adopt GraphQL for your endpoints. With the help of this directive, Tailcall GraphQL queries and mutations may be made available as REST endpoints.

**Can Tailcall generate GraphQL from gRPC APIs?**

Yes, Tailcall automatically generates GraphQL configuration from various sources such as REST, gRPC, and already existing GraphQL configuration files. In fact, we support a hybrid integration of REST and gRPC. You can read more about generating GraphQL configuration from gRPC [here](https://tailcall.run/docs/graphql-grpc-tailcall/).

**Is authentication built-in with Tailcall? If yes, how?**

Yes, Tailcall provides a straightforward way to implement entity-level authentication in your GraphQL schema. You can read more about it [here](https://tailcall.run/docs/field-level-access-control-graphql-authentication/).

**Does Tailcall work with HTTP/2?**

Yes, Tailcall enables support for HTTP/2 for both server (ingress) and client (egress) operations, facilitating the protocol's adoption for both incoming and outgoing server requests. For egress, there is no special setting required; Tailcall will automatically upgrade the connection to HTTP/2 whenever possible.

**Do you follow the Federation specification?**

Yes, the subgraph spec is compatible with the Federation specification.

**Are you going to have a control plan like Apollo or Cosmo that has a self-hosted solution?**

Yes, it’s in the works! Please [contact us](https://discord.com/invite/kRZBPpkgwq) to get more details.

## Installation

**What observability integrations do you support?**

Tailcall is integrated for telemetry with Apollo Studio, Data Dog, New Relic, and Honeycomb.

**What production environments do you support? Where can I deploy Tailcall apps?**

The GitHub Action [tailcallhq/gh-action](https://github.com/tailcallhq/gh-action) can be used to easily deploy a Tailcall server to any supported cloud provider. Currently, [AWS Lambda and Fly](https://tailcall.run/docs/deploy-graphql-github-actions/) are supported.

## Trivia

**Why did you start Tailcall?**

The idea for Tailcall was born from our learnings at Dream11, a fast-growing fantasy sports platform (>200M users) where rapid growth introduced frequent changes to the UI and a need for the backend to make these updates while ensuring Type Safety. On the frontend’s recommendation, the backend team adopted GraphQL and saw a reduction in their workload. However, the infrastructure cost ballooned as the platform grew. Handwriting the GraphQL servers also introduced problems in the code and didn’t scale well.

We created a Domain Specific Language (DSL) that could abstract these performance problems of GraphQL and cross-cutting concerns and detect these problems at compile time. We also got a 90% reduction in infrastructure costs.

Our main learnings at Dream11 were that APIs should be independently built and operated. GraphQL should be used as a client-side abstraction and sit closer to the client than the server. The client in this case could be a mobile app, a website, or even some other service that's querying data from some external or internal source. Because it's a client-side abstraction, responsibility is with the consumer of APIs and not with the producer.

Read more about our GraphQL adventures at Dream11 [here](https://tailcall.run/blog/dream11-graphql-case-study/). All this learning has helped us architect Tailcall the way it is today!

**What specific problem does Tailcall solve and for whom? Who is your ideal customer?**

A growing company that needs efficient management of APIs and is currently using REST APIs is a good prospect for Tailcall.

Suppose you use a REST API that returns a list of products, and another API that returns the reviews for a specific product (or a list of products). The frontend needs to compose these APIs together so that first you get a list of products, and then use the reviews API to fetch reviews for these products, and compose the data together.

With GraphQL, you can define a schema that describes the data and their relationships, and the GraphQL server implementation allows you to build this data structure efficiently using existing REST APIs. GraphQL also allows the UI to only fetch the fields it needs, thus preventing over-fetching. However, you have to write backend code to do this.

Tailcall takes this a step further and enables you to build an efficient and fast GraphQL server with only a configuration file that specifies the shape of the data you want, and the sources the data is composed from. No code is required. This greatly speeds up the development process.

**Is GraphQL dead? Why do you use GraphQL when so many in the industry think it’s dead?**

Writing GraphQL by hand solves some problems but creates another set of problems. So, handwritten GraphQL will most likely be phased out. Combining the power of GraphQL with a powerful GraphQL runtime like Tailcall has a bright future!

**We already have a GraphQL API ready and we don't have reason to change. Why should we use Tailcall?**

GraphQL has powerful querying capabilities. However, you have to hand-write backend code to do this. This introduces complexity and potential for making mistakes. Read more about it [here](https://tailcall.run/docs/graphql-configuration-generation-with-tailcall/).

Tailcall enables you to build an efficient and fast GraphQL server with only a configuration file that specifies the shape of the data you want, and the sources the data is composed from. No code is required. This greatly speeds up the development process. We highly recommend you install it, and if you have questions, we’d be happy to help!

**What does the name Tailcall mean?**

Tail call optimization (TCO) is the inspiration behind the name of our company :).

**I am ready for Tailcall. What next?**

That’s awesome! Please visit our [Getting Started](https://tailcall.run/docs/) page. For any questions or to chat with us, please join us on [Discord](https://discord.com/invite/kRZBPpkgwq).
