---
sidebar-position: 2
title: Why Tailcall?
---

What we have built is an open-source API Gateway solution that thinks about the problem from first principles and achieves far superior results than the legacy solutions that are available today. To understand how it works, here is the technical implementation of our solution.

## High-Level Architecture

The clients and the services remain the same with an addition of three components viz. The **Composition Spec** (Also known as the “Blueprint”), Schema **Registry,** and the Tailcall **Gateway**.

![tailcall-architecture](/img/tailcall-architecture.png)

The metadata about how the APIs are composed is saved in the Schema Registry. Metadata includes - information about the service’s endpoint, the schema of the endpoint’s input, and security and resilience settings. Whenever a client makes a request to the gateway, the metadata is fetched from the registry, and based on the logic, requests are made to the customer’s microservices.

## Composition Specification (Blueprint)

The Composition Spec contains all the information that is required to compose APIs. Which includes the schema of the valid requests and responses, host and protocol information, and, resiliency expectations such as throttling, caching, and security features such as authentication, authorization, etc.

![tailcall-blueprint](/img/tailcall-blueprint.png)

## Publishing

Once the composition specification is ready, we publish the specification on the tailcall registry. The publishing process has two steps:

1. **Pre-Publish:**

   1. We run all the validations and check if there are any invalid states in the composition specification provided by the developer.
   2. We also identify performance bottlenecks in the way APIs are composed for eg: the N + 1 problem.

      > 💡 The N + 1 problem in API composition refers to a situation where a single request to API, results in multiple additional requests being made. This can occur when an API returns a list of objects that each require additional data from another API, resulting in a separate request for each object. This can lead to poor performance and increased load on the API. The problem can be solved by using techniques such as "eager loading" or "batching" to reduce the number of requests made.

   3. We recommend standard best practices for API composition so that developers can integrate it on day one.
   4. We also apply many optimizations eg: including constant folding, inlining, etc.
   5. Before publishing a unique sha1 hash is generated for the specification provided by the developer (We will learn more about this in the coming sections)

2. **Post-Publish:**

   1. A unified endpoint is automatically generated.

![tailcall-blueprint](/img/tailcall-digest.png)

## Client Consumption

When the client makes a request it needs to make sure the hash is sent as a part of the request. This is the same hash that’s produced before publishing on the registry.

```bash
curl 'https://tailcall.com/d5fb0/graphQL' \
  --data-raw '{"query": "{ posts { title body user { name email } } } }"}'
```

## Hash Code

The hash is used to address the composition spec. It’s basically a SHA1 of the specification. When the specification changes, the SHA1 changes. This gives us a lot of power for eg:

1. **Versioning:** Each change is version controlled. You can run multiple versions of the specification at the same time in production, without actually maintaining each one of them or using the additional infrastructure.
2. **Canary Releases:** This becomes a first-class feature of the gateway. Because the spec is versioned we can control the exposure of a newly developed feature easily.
3. **Immutability:** Each spec is immutable, this guarantees that once a specification is deployed and stable in production, no one can change it at runtime. Thus making product rollbacks much safer.
4. **Breaking Changes:** Since each specification is independent of the other, we can deploy breaking changes in production without causing any issues for the existing clients.

## Programming Interface

Essentially what we are building is a programmable API Gateway. And the way we could do that is by using some embedded DSLs in general-purpose languages such as Typescript, Javascript etc. Or using configs in YAML, JSON or some other format. We could even have a Graphical User Interface on the web that could allow developers to drag and drop endpoints and create a composition layer on the fly.

![tailcall-interface](/img/tailcall-interface.png)

Once the composition spec is created by the developer it will be compiled into an intermediary representation (IR). This layer is basically for the computer to understand so developers don’t need to write it by hand. However, this layer will have high-performance primitives to perform API composition. The intermediary representation is then sent to the runtime for execution. The idea of creating a layered architecture is that we should potentially be able to swap out the current runtime which will be in Scala to a Rust-based implementation for high performance. For projects such as these massive adoption happens when you beat other frameworks in performance benchmarks.

## GraphQL in Production

At Tailcall, we understand the power of GraphQL and the great developer experience it provides when building UI applications. However, we also recognize that it comes with its own set of challenges, particularly when working with legacy infrastructure. For example:

1. GraphQL as a protocol is not as widely understood by CDNs, proxies, and telemetry platforms as compared to other protocols such as REST.
2. Additionally, in certain cases, GraphQL can be slower for communication between client and server when compared to its peers such as REST and GRPC.

That's why Tailcall provides a flexible solution. Our unified endpoint allows developers to choose the protocol that works best for them, whether it be GraphQL, REST, or GRPC. Our approach is to recommend using GraphQL in the development environment, but in production mode, we offer the ability to seamlessly convert it to a more standard and more performant protocol without any additional development work.

This way, teams can enjoy the benefits of GraphQL in the development phase, but also ensure the best performance and compatibility in production. Tailcall's goal is to strike a balance between developer experience and performance, making it easier for teams to build and deploy their applications.

## Summary

1. **Generic Solution:** It’s a reusable solution across many use cases.
2. **Robust**: It’s designed to recover from failure without any dev intervention.
3. **Predictable Performance**: Introspection allows transparency around performance.
4. **Modular:** Allows developers to write, maintain and version control just their bit of the composition spec.
5. **Canary Support**:\*\* Provides first-class support for canary releases.
6. **Decoupled Releases:** Immutability and versioning allow multiple versions of the composition spec to be deployed in production simultaneously.
7. **E2E Solution:** It’s a complete programmable API Gateway with first-class support for API composition.
