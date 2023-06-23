---
title: Problem Statement
sidebar_position: 1
slug: /
---

There are two things that are happening in the tech ecosystem nowadays:

1. **Rich User Interfaces:** Responsive websites that worked on desktop and mobile are dead. To build a successful B2C business, you need to build for all three platforms viz. Android, iOS, and Web (Desktop/PWA). The applications need to look slick, rich in information and have snappy response times.
2. **Microservice Proliferation:** Companies these days bootstrap themselves on microservices instead of monoliths. This is because the tooling has gotten a lot better, and reusable components are available either in open-source or as a SAAS solution. This allows developers to focus on their core business logic and move fast.

## Microservice Architecture

This is what a typical microservices architecture looks like:

![Microservice Architecture Diagram](/img/microservices.svg)

The clients (Mobile/Web) make requests to the microservices through an API gateway. An API gateway is a server that acts as a single point of entry for any type of request. It is responsible for routing them to the appropriate backend service and then returning the response from the backend service to the client. An API gateway can also perform tasks such as authentication, rate limiting, and caching. This makes it a useful component in a microservices architecture, where each service has its API and the API gateway acts as the "front door" for clients to access the services.

## API Composition

API composition refers to the process of combining multiple APIs to create a new API or a new functionality. This can be done by sending requests to multiple APIs and combining the results, or by creating a new API that acts as a façade for the underlying APIs.

> 💡 API Composition is also known as API Orchestration. This is however vastly different from Microservice Orchestration.

For example, consider a scenario where a client application wants to display a timeline of posts with the profile information of each user on a social media platform. In this case, the client can send two separate requests to two different APIs and combines them together as follows:

1. First to **/posts** to retrieve recent posts, with the following response:

   ```graphql
   type Post {
     id: ID!
     title: String!
     body: String!
     userId: ID! # Reference to user by it's id.
   }
   ```

2. Second, with the **userId** from the above post response, make a request to **/users** to retrieve the user's profile information, with the following response:

   ```graphql
   type User {
     id: ID!
     name: String!
     email: String!
   }
   ```

3. The client can then combine the results from these two APIs to create a single response that contains all the required information. This new response can be considered as the output of the composed API.

   ```graphql
   type Post {
     id: ID!
     title: String!
     body: String!
     user: User! # Reference to the complete user object
   }
   ```

## Composition on Clients

The composition on the client side remains unstandardised. There is often a problem of over fetching where the client makes a request to get some data, but the server ends up sending more than what’s required on the screen. And under fetching where the client end up making multiple API calls to get relevant data for a particular screen. This, with a modest hardware and in conjunction with flaky network conditions makes the overall solution unreliable and non-performant.

> 💡 Modest hardware and flaky network conditions on the client side results in poor user-experience.

### 1. Increased Complexity

To build a rich user interface, API composition is necessary on the client side. One of the main challenges with API composition on the client side is that it can lead to increased complexity in the client application. This is because the client needs to handle the process of sending requests to multiple APIs and combining the results, which can add to the overall size and complexity of the client code.

### 2. Reduced Performance

Another challenge with API composition on the client side is that it can result in reduced performance and increased latency. This is because the client needs to make multiple requests to different APIs, which can take more time and result in a slower response from the composed API.

### 3. Increased Risk

In addition, API composition on the client side can also lead to increased security risks. This is because the client needs to handle sensitive information, such as API keys and authentication credentials, which can be vulnerable to attacks if not properly secured. The client doesn't have access to powerful CPUs or a reliable network either. This makes the composition problem even more challenging to implement and manage. It is therefore often more efficient and effective to perform API composition on the server side instead.

## Backend For Frontend (BFF)[](https://tailcall.in/ab#backend-for-frontend)

A BFF layer can help to solve the challenges of API composition by providing a separate backend service that is optimized for each specific frontend client. This can enable the BFF to perform API composition on behalf of the client, which can help to improve the performance and reliability of the composed API. The BFF layer typically sits as a separate component in the overall architecture, between the frontend client and the microservices. It can communicate with both the frontend client and the microservices using well-defined interfaces and protocols, such as REST or gRPC.

![BFF Diagram](/img/bff.svg)

> 💡 BFFs can dramatically improve the reliability and performance of the system, there by having a direct impact on user-experience.

The BFF can take advantage of a powerful CPU and access to a fast network to improve the performance and reliability of the composed API. It can also provide added flexibility and control over the composition process. This can make it a useful tool for developers who want to create new APIs by combining the functionality of multiple underlying APIs. However, there are a few challenges with a BFF layer:

### 1. Highly Specialized

One of the challenges with using a BFF layer is that it is a highly specialized solution that requires a significant amount of hand-written code. Unlike an API gateway, there is no standard BFF solution that can be deployed out-of-the-box, and each BFF implementation must be custom-tailored to the specific requirements of the frontend client. This lack of standardization and reusability can make the BFF solution more complex and difficult to maintain.

### 2. Fragile

Another challenge with using a BFF layer is that it can be fragile and susceptible to failure. The BFF solution is dependent on the developers to follow best practices and handle all error scenarios, and if these steps are not taken, the solution can be prone to bugs and performance issues. Additionally, the BFF solution must be thoroughly tested, including performance testing, unit testing, and integration testing, to ensure that it is reliable and performs well in production. This can require significant effort and expertise, and if these steps are not properly followed, the BFF solution can be fragile and prone to failure. Also, it's worth mentioning that a BFF layer is an entry point to all your backend, it going down basically means nothing is accessible for the user so this layer needs to be robust and resilient to exceptions.

### 3. Speculative Performance

Because BFF layers are typically custom-written for each use case, it can be difficult to predict the performance impact of a small code change. Issues such as unoptimized algorithms, inefficient caching, and unnecessary downstream requests can go unnoticed and only be discovered very late in the development cycle. Typically companies perform thorough benchmarking and load testing before anything goes live. This results in a very high time to market even for minor changes.

### 4. Monolith

Eventually, this layer turns out to be a big monolith touching every service in your backend. The layer contains a lot of handwritten spaghetti code that's hard to maintain. Onboarding new engineers also become harder and upgrading libraries or architecture gets costlier. Any tiny change requires a full-fledged deployment on your infrastructure.

### 5. Canary Support (Lack thereof)

Every change that happens in the backend requires the deployment of the BFF layer. Any feature that is built on the client also requires changes on the BFF layer. Such frequent changes can not be exposed to 100% of users because the reliability and performance of this system are unknown. A common way to solve this problem is to use [Blue-Green](https://www.redhat.com/en/topics/devops/what-is-blue-green-deployment) deployments. This requires additional infrastructure and complex routing mechanisms. First-class support to do canary releases is very important and should be part of a modern BFF layer, however, most companies rely on DevOps for its support.

### 6. Coupled Release

BFF layers can't be deployed independently since they act as a bridge between the clients and the services. Generally, the services need to go live first, and they need to make sure that the change is compatible with the current version of the BFF layer running in production. The interesting problem is in case there is a bug in the microservice and it needs to be reverted, even the BFF layer needs to be reverted. This kind of coupling makes it operationally very expensive to manage.

### 7. Legacy Gateway

BFF layers often end up implementing some of the cross-cutting concerns of an API gateway such as rate limiting, authentication, throttling, etc. This makes its purpose quite confusing if we already have an API gateway. Moreover, it's not very clear if we use an API gateway with a BFF layer, where should we place it? Should we place it between the clients and the BFF layer or the BFF layer and the service mesh? These are subjective decisions that each company ends up making as there is no standard way of doing this. However, it's worth mentioning that legacy gateways do introduce a gap that's being attempted to be filled by a BFF layer.

> 💡 BFF, Presentation Layer, Facade, Middleware, Frontend Layer, Orchestration Layer, API Adapter — Are all different nomenclatures used for the same thing.

### 8. Organizational Friction

The Backends for Frontend (BFF) pattern, while designed to enhance user experience, introduces undeniable organizational friction. These issues include communication delays that hinder development, incompatible skill-sets and perspective of what a BFF layer should be doing causing inefficiencies, and a diminished sense of ownership affecting the frontend teams' productivity. While one might suggest transferring BFF ownership to frontend teams as a potential solution, it's not a foolproof fix. This shift necessitates an expansion of skill-sets among frontend teams and demands enhanced coordination, presenting its own challenges.

At Tailcall, we are fervently committed to resolving this issue. We perceive this intricate conundrum as a compelling fusion of organizational dynamics and technical intricacies. It presents a uniquely riveting challenge that propels us beyond the confines of conventional software development paradigms.
