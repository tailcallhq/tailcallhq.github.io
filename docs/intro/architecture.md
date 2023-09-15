---
title: Architecture
sidebar_position: 3
---

What we have built is a open-source API orchestration solution that really thinks about the problem from first principles and achieves far superior results than the legacy solutions that are available today. To understand how it works, here is the technical implementation of our solution.

## High-Level Architecture

The clients and the services remain the same with an addition of three components viz. The **Composition Spec** (also known as the “Blueprint”), Schema **Registry,** and the Tailcall **Proxy**.

![Tailcall Architecture Diagram](/img/tailcall-architecture.png)

The Schema Registry serves as a repository for the metadata that outlines how the APIs are structured. This metadata encompasses a range of information, including details about the service endpoint, the input schema associated with the endpoint, and any pertinent security and resilience parameters. Upon receipt of a client request via the proxy, the system dynamically retrieves the corresponding metadata from the registry. It then uses this information to shape its logic and effectively communicate with the client's microservices, ensuring efficient and secure request handling.

## Composition Specification (Blueprint)

The Composition Specification (Spec) encompasses all necessary data required for constructing APIs. It comprises the schema of valid request-response pairs, host and protocol specifics, and anticipations for resiliency such as throttling and caching mechanisms. Additionally, it encapsulates critical security aspects, including authentication and authorization measures, among others. This all-encompassing document ensures each component in the API architecture aligns with the defined standards, thus ensuring a robust and secure system.

![Composition Spec Visualization](/img/tailcall-blueprint.png)

## Publish

Once the composition specification is ready, we publish the specification on the tailcall registry. The publishing process has multiple steps.

1. We run all the validations and check if there are any invalid states in the composition specification provided by the developer.
2. We also identify performance bottlenecks in the way APIs are composed for eg: the N + 1 problem.

   :::info
   The N + 1 problem in API composition refers to a situation where a single request to an API results in multiple additional requests being made. This can occur when an API returns a list of objects that each require additional data from another API, resulting in a separate request for each object. This can lead to poor performance and increased load on the API. The problem can be solved by using techniques such as "eager loading" or "batching" to reduce the number of requests made.
   :::

3. We recommend standard best practices for API composition so that developers can integrate it on day one.
4. We also apply many optimizations eg: including constant folding, inlining, [data-loader], etc.
5. Before publishing a unique sha256 hash is generated for the specification provided by the developer (We will learn more about this in the coming sections)
6. As a final step in this publishing process, a unified endpoint is automatically generated, ensuring seamless API integration.

[data-loader]: https://github.com/graphql/dataloader

## Client Consumption

When the client makes a request it needs to make sure the hash is sent as a part of the request. This is the same hash that’s produced before publishing on the registry.

```bash
curl 'https://cloud.tailcall.com/graphql/d5fb012' \
  --data-raw '{"query": "{ posts { title body user { name email } } } }"}'
```

## Hash Code

The SHA-256 hash for the composition specification isn't created merely from the textual representation of the specification. Instead, it is derived from the semantic meaning of the specification - that is, the underlying logic, structure, and purpose behind the API composition, rather than the literal text or syntax.

This method provides a more stable hash because changes in comment, formatting, or syntax, which do not affect the overall function or purpose of the API, do not alter the hash. The hash, therefore, remains consistent unless there are changes to the specification's semantic meaning. This approach ensures that the hash serves as an accurate and reliable identifier for each unique orchestration. This is the most important and differentiated feature of the system because it allows us to do the following:

1. **Versioning:** Each change is version controlled. You can run multiple versions of the specification at the same time in production, without actually maintaining the source code of each one of them or using the additional infrastructure.
2. **Canary Releases:** This becomes a first-class feature of the proxy. Because the spec is versioned we can control the exposure of a newly developed feature easily.
3. **Immutability:** Every specification is immutable, ensuring that once deployed and stabilized in production, it cannot be altered at runtime. This characteristic enhances the safety of product rollbacks.
4. **Breaking Changes:** As each specification operates independently, deploying breaking changes in production won't affect existing clients, maintaining operational stability and integrity.

![Digest Creation](/img/tailcall-digest.png)

Hope the architecture makes sense. If you have any questions, please feel free to reach out to us on our [discord] channel, we would love to hear from you.

[discord]: https://discord.gg/7fseDEXUNU
