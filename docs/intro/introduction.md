---
title: Problem Statement
sidebar_position: 2
slug: /
---

## Traditional API Gateway

Traditional API Gateways ("TAGs") form the backbone of modern web based application architectures, offering a comprehensive suite of features essential for efficient API management. These gateways handle tasks such as routing, authentication, circuit breaking, caching, logging, monitoring, protocol translation and the list doesn't end!

API Gateways fail to provide developers with the appropriate abstraction for configuring these capabilities. Typically, a TAG offers primitives based on the underlying protocol (that is, the protocol serving the API). For instance, it allows performing authentication, routing, rate-limiting, etc., based on request headers, URL, or method—all components of the HTTP protocol. This approach occurs because they consider the contents of request and response bodies as simple byte sequences, without examining their actual content.

Over the years, we have gotten used to consuming and managing APIs this way. Writing our own custom abstractions and sticking it around an existing over the shelf API Gateway. Our personal experience has been that nearly all companies after a certain scale require an abstraction that's specific to their business entities and feel restricted by what the API Gateway can provide.

## Tailcall API Gateway

Based on our learnings of writing APIs at massive scale, we believe that the gateway should work around an enterprise's business entities and not the other way round. That is what Tailcall helps you achieve.
Tailcall provides first-class primitives designed to interact with your business entities directly without burdening the developer with the underlying protocol. This approach grants tremendous power and flexibility, transcending protocol constraints and focusing on the nature of the API's data. Let's take the `User` entity as an example:

```graphql
type User {
  id: ID
  name: String
  email: String
  account: Account
}

type Account {
  balance: Float
  lastUpdated: Date
}
```

Distinct APIs can return the `User` business entity. For example, a `/users` API might deliver the `id`, `name`, and `email`, while a `/accounts/:userId` API could supply the account `balance` and `lastUpdated` for a user. Tailcall's API Gateway enables specifying that requests to access account details require authentication, unlike other requests.

```graphql
type User {
  id: ID
  name: String
  email: String
  account: Account @private
}

type Account {
  balance: Float
  lastUpdated: Date
}
```

With Tailcall, specifying which parts of an entity should be public or private becomes straightforward, the platform also allows for the obfuscation of fields deemed sensitive or PII in specific contexts. This is all achievable through Tailcall's DSL, which facilitates all these complex operations efficiently and with minimal latency.

Tailcall's DSL further enhances its capabilities by supporting advanced API Orchestration, moving beyond simple request routing. This feature allows you to outline the desired API structure and guides you in integrating each component within the entity type. For example, consider a transaction API that includes a userId. Traditionally, expanding this userId to access the corresponding user details would involve micro-services. With Tailcall, using its DSL triggers the Tailcall runtime to automatically resolve and populate these details, removing the need for manual coding and making the API management process more efficient.
