---
title:  "GraphQL : Why you should use it in microservices architecture"
subtitle: subtitile.
authors:
  - name: Hunain Ahmed
    title: A freelance software developer, always working on something new and fascinating.
    url: https://github.com/hunxjunedo
    image_url: https://avatars.githubusercontent.com/u/89797440?v=4
hide_table_of_contents: true
slug: benefits-of-graphql
tags: [GraphQL, API, Microservices]
image: /images/blog/benefits-cover.jpg
---


GraphQL rocks at connecting modern web apps with backends, but how good is it at hooking up microservices?

<!-- truncate -->

## Introduction

Imagine you're building an API for a social media app that pulls user profiles, followers, and recent activities from different microservices. Without a well-designed API, this can result in a tangled mess of multiple endpoints and inefficient data retrieval.

GraphQL, developed by Facebook in 2015, addresses these challenges by allowing clients to request exactly the data they need through a single endpoint. This eliminates the common problems of over-fetching and under-fetching, simplifying data retrieval across various services.

In a microservices architecture, managing type validation, error handling, and parallel processing can become complex. GraphQL streamlines these tasks, enhancing the developer experience and improving integration efficiency. In this blog, we’ll explore how GraphQL can optimize microservices architectures and why you should consider it [Read more about GraphQL](https://tailcall.run/graphql/).


## Distinct Data Ownership and Precise Data Fetching
GraphQL clarifies data ownership and simplifies data retrieval in microservices. It defines which service owns what data and how it can be accessed.

For example, consider a video-hosting app. With GraphQL, a client can request data from the relevant service, which handles it autonomously based on the schema definition:

![ownership_graphql](/images/blog/ownership1.jpeg)

 This clear data ownership ensures that services work independently without overlapping responsibilities. Read more about [building GraphQL schema](https://tailcall.run/blog/graphql-schema/).

 Contrastingly, REST doesn't ensure distinct ownership, it is either that the client has to send a request to each microservice one-by-one; or it calls a single endpoint which calls the other services in chain - either way it takes away flexibility and explicit ownership definition.

 ![ownership_rest](/images/blog/ownership2.jpeg)


In addition, clients can specify exactly what information they need through GraphQL’s query language. For instance, if a client only requires the count and visibility status of followers, the query can be tailored to retrieve just that:

**Example Query:**
```graphql
query {
  user(id: "123") {
    followers {
      count
      publicOnly
    } 
  }
}
```


In contrast, REST APIs expect requests to fixed endpoints:

**Example REST Request:**
```javascript
https://api.server.com/users/123/followers?countOnly=true&publicOnly=true
```

these endpoints generally offer less flexibility, which is time-consuming to implement compared to GraphQL, where queries can be finely tuned to match client needs in a matter of seconds - which becomes even simpler with **[Tailcall](https://tailcall.run/)**.

## Parallel Execution of Requests 

GraphQL's architecture inherently supports parallel execution of resource requests, making it particularly advantageous in microservices environments -  unlike traditional REST APIs, where requests are typically handled sequentially.

**GraphQL Resolvers Example:**

Consider a microservices architecture where different services handle user data, user activities, and user preferences. Here’s how a GraphQL query can efficiently request data from these services in parallel:

```javascript
const resolvers = {
  User: {
    profile: async (parent) => {
      return await fetchUserProfile(parent.id); // Service A
    },
    activities: async (parent) => {
      return await fetchUserActivities(parent.id); // Service B
    },
    preferences: async (parent) => {
      return await fetchUserPreferences(parent.id); // Service C
    },
  },
};
```

In this example, the `profile`, `activities`, and `preferences` resolvers query different microservices independently and in parallel. On top of that, Tailcall makes it simpler to control and connect multiple resolvers. [Read More](https://tailcall.run/docs/graphql-resolver-context-tailcall/).

**REST API Example:**

To achieve similar functionality with REST APIs in a microservices setup, you would need to manually handle parallel requests, which introduces additional complexity:

```javascript
// Fetch user profile from Service A
const fetchProfile = axios.get('http://service-a.example.com/users/123');

// Fetch user activities from Service B
const fetchActivities = axios.get('http://service-b.example.com/users/123/activities');

// Fetch user preferences from Service C
const fetchPreferences = axios.get('http://service-c.example.com/users/123/preferences');

// Execute the requests in parallel
Promise.all([fetchProfile, fetchActivities, fetchPreferences])
  .then(([profileResponse, activitiesResponse, preferencesResponse]) => {
    // Combine and process responses
  })
  .catch(error => console.error('Error fetching data:', error));
```



GraphQL simplifies this by allowing a single query to fetch data from multiple microservices simultaneously. This leads to faster responses and a smoother client experience, making it particularly useful in microservices architectures.

[Tomer Elmalem](https://nordicapis.com/speakers/tomer-elmalem/), a GraphQL expert, highlights that "GraphQL’s ability to execute multiple queries in parallel not only reduces latency but also enhances application performance, delivering a more responsive user experience."


## Budgeting and Prioritization

Imagine your server is a busy restaurant during peak hours. Not every order can be processed with the same urgency. Similarly, GraphQL supports request budgeting and prioritization, enabling clients and servers to allocate resources efficiently. This feature becomes essential when some queries are more critical than others, ensuring that high-priority requests are handled promptly while managing overall resource use effectively.

**Example**

Consider a social media app that displays user profiles. A typical profile query might return the following data:

```json
{
  "username": "exampleUser",
  "profile_picture": "url_to_picture",
  "followers": {
    "count": 123,
    "list": ["follower1", "follower2"]
  },
  "related": ["relatedUser1", "relatedUser2"]
}
```

While this response format is suitable under normal conditions, during high-traffic periods when the server is particularly busy, it would be inefficient to allocate resources to prepare less critical data, such as the list of `followers` or `related` users.

GraphQL allows you to manage the complexity and depth of incoming queries through third-party modules like [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) and [graphql-query-complexity](https://www.npmjs.com/package/graphql-query-complexity) in JavaScript. These tools help set limits on the processing done per request:

```javascript
const { ApolloServer } = require('apollo-server');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-query-complexity');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [createComplexityLimitRule(1000), depthLimit(5)],
});
```


By integrating tools to manage query complexity and depth, GraphQL can prioritize critical requests and limit execution during peak times. This approach reduces timeouts: less depth means less time, and improves resource allocation, leading to faster response times and a more efficient app.


## Service Caching and Error Handling

GraphQL makes caching simple and effective by using unique object identifiers, which helps reduce redundant server processing and speeds up response times. For instance, in the video app, if video content remains the same but `upvotes` frequently change, GraphQL can cache the video data and only fetch updates for the upvotes, thus minimizing unnecessary processing. You can even go a step further and specify the size of cache and control cache headers [HTTP Cache](https://tailcall.run/docs/graphql-http-cache-guide-tailcall/) with Tailcall.

It also supports _partial resolution_, meaning a request can still return useful data even if part of it fails. This is a significant improvement over traditional REST APIs, where failures often result in no data being returned. In microservices setups, where multiple services are involved in processing a request, partial resolution allows clients to receive data from the services that succeeded while providing detailed error information about the failures: 

 ![partial_ress](/images/blog/error_handle.jpeg)


 This results in more resilient systems, easier error handling, and targeted retries, making it more efficient compared to REST APIs. [Read The Documentation](https://www.apollographql.com/docs/apollo-server/data/errors/).

##  Conclusion

From robust error handling and built-in caching to parallel execution with minimal code and scalable server support, GraphQL offers a powerful toolkit for integrating microservices into a unified, optimized backend interface. Tools like Tailcall enhance this experience even further, providing streamlined runtimes that simplify deployment and management of GraphQL services. When used effectively, GraphQL can significantly boost your system’s flexibility and performance.

However there are scenarios where GraphQL is an overkill, just making things more complex; and REST or other options suit best, so choose wisely and as I always say, what really matters is how you choose the right technology and implement it the right way. See you in the next one, with another cool topic! 🚀

