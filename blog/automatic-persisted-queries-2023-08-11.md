---
title: The truth about scaling Automatic Persisted Queries
authors:
  - name: Tushar Mathur
    title: CEO @ Tailcall | Love to talk about programming, scale, distributed systems and building high performance systems.
    url: https://github.com/tusharmath
    image_url: https://avatars.githubusercontent.com/u/194482?v=4
description: Learn about the limitations and potential scaling issues that accompany Automatic Persisted Queries (APQ).
image: /images/blog/apq-cover.png
hide_table_of_contents: true
slug: the-truth-about-scaling-automatic-persisted-queries
canonical_url: https://tailcall.hashnode.dev/the-truth-about-scaling-automatic-persisted-queries
---

Persisted queries are often hailed as a solution to several challenges in GraphQL related to network performance, caching, and maintenance. However, they may not always be the silver bullet they appear to be. This post delves into the concept of persisted queries (PQ) and automatic persisted queries (APQ), highlighting the limitations and potential scaling issues that accompany these technologies.

<!-- truncate -->
<head>
<link rel="canonical" href="https://tailcall.hashnode.dev/the-truth-about-scaling-automatic-persisted-queries"/>
<title>The truth about scaling Automatic Persisted Queries</title>
</head>
### The Problem

#### Large Queries

Clients send queries to a GraphQL server as HTTP requests that include the query as the body. When these queries become large, they can lead to increased latency and network usage, degrading client performance.

For example, a normal GraphQL query might look like this:

```bash
curl -X POST -H "Content-Type: application/json" \
  --data '{"query": "{ largeQuery { field1 field2 ... } }"}' \
  http://your-graphql-server.com/graphql
```

Each GraphQL query is parsed every time the server receives it. If it's large, the parsing can take a significant amount of time, increasing latency even further.

#### Legacy Infrastructure

Existing CDN infrastructure is designed to cache only GET calls. To make a GraphQL request, one must make a POST call. This limits the usage of CDNs for caching purposes.

### Solution: Persisted Queries (PQ)

#### Definition and Benefits

To enhance network performance for large query strings, GraphQL server supports Persisted Queries (PQ). A PQ is a GraphQL query cached server-side, identified by its SHA-256 hash. Clients send this identifier instead of the query, dramatically reducing request sizes (without affecting response), saving parsing time, and enabling GET calls instead of POST.

A PQ request might look like this:

```bash
curl -X GET -H "Content-Type: application/json" \
  --data-urlencode 'extensions={"persistedQuery":{"version":1,"sha256Hash":"<SHA 256>"}}' \
  http://your-graphql-server.com/graphql
```

#### Application with CDNs

Using the PQ link automatically sends short hashed queries as GET requests, enabling CDNs to serve them.

##### **Latency Reduction**

- **No Parsing Overhead**: Since the query isn't sent to the server, the parsing stage, which can be computationally expensive, is eliminated. This saves valuable server processing time, directly reducing client latency.

- **Network Efficiency**: By transmitting only the hash instead of the full query, the request size is dramatically reduced, leading to faster network transmission and lower latency.

##### **Security Enhancements**

- **Control Over Allowed Queries**: The server can start with a finite set of "allowed" queries, ensuring that unauthorized or unoptimized GraphQL requests cannot be made. This control is a significant safeguard for production environments, preventing potential abuse or inefficiencies.

- **Reduction in Attack Surface**: By limiting the queries to a pre-defined set, the risk of malicious queries is reduced, enhancing the security profile of the application.

#### Problem

While PQs provide remarkable benefits, they are not without challenges:

- **Schema Rigidity**: If you aim to keep the schema open and queries dynamic, supporting any possible query becomes complex.

- **Maintenance of Cached Queries**: Managing the cache of allowed queries and keeping them in sync with evolving client needs can become a maintenance burden, especially in a fast-changing environment.

### Automatic Persisted Queries (APQs)

#### APQs vs PQs

APQs are a supposed improvement over PQs. In a PQ setup, the server runs with a known set of queries, meaning client changes require server updates. This has implications for maintenance costs, particularly in supporting multiple versions of queries and making a server deployment for every change in the client query. APQs were introduced to overcome these challenges.

#### How APQs Work

The APQ process is a two-step approach:

1. **Hash Request**: The client sends a request with the hash of the query. If the server recognizes the hash, it returns the corresponding response:

   ```bash
   curl -X GET -H "Content-Type: application/json" \
     --data-urlencode 'extensions={"persistedQuery":{"version":1,"sha256Hash":"<SHA 256>"}}' \
     http://your-graphql-server.com/graphql
   ```

2. **Full Query Request**: If the server does not recognize the hash, it returns an error. The client then sends a new request that includes both the hash and the full query string:

   ```bash
   curl --get http://localhost:4000/graphql \
     --header 'content-type: application/json' \
     --data-urlencode '{"query": "{ largeQuery { field1 field2 ... } }"}' \
     --data-urlencode 'extensions={"persistedQuery":{"version":1,"sha256Hash":"<HASH>"}}'
   ```

   The server parses the full query, caches it for future use, and returns the GraphQL response. Subsequent requests use the hash.

This process optimizes network performance while allowing flexibility in the queries that can be run. You can read more about APQ [here](https://www.apollographql.com/docs/apollo-server/performance/apq/)

### Problems with APQs

#### Thundering Herd Problem

Consider a situation where a server has just been deployed or restarted, and the cache is empty. Now, multiple clients send hash requests for queries that are not yet cached.

1. **Massive Error Responses**: Since the cache is empty, the server returns errors for all hash requests, signaling the clients to send the full query strings.

2. **Simultaneous Full Query Requests**: All clients now simultaneously send full query requests, causing a sudden surge in demand.

3. **Server Strain**: The server must parse and cache each unique query, placing significant strain on its resources. This can lead to increased latency and even server failure if the demand is too high.

4. **Repeated Pattern**: If the server struggles to cache the queries quickly enough, the clients may continue to receive errors and retry the full query requests, perpetuating the problem.

In an environment with many clients and dynamically changing queries, the system can become vulnerable to sudden surges in demand. This vulnerability can undermine the performance benefits APQs are designed to provide, leading to potential system instability.

#### Cache Limitations

Queries are typically cached in memory, requiring cache warmup on each instance, hindering deployment on server-less solutions. An alternative could be using a centralized cache, but it typically nullifies performance gains due to serialization, deserialization, and IO call overhead.

#### Security Concerns

Automatically persisting queries can cause memory leaks, as clients can send varying query combinations, exhausting server memory. Mitigation through cache size limits and eviction mechanisms may lead to frequent cache misses, leading to doubling request numbers.

### Possible Solution

Persistent queries are a great improvement over regular queries. They clearly improve performance and are more secure. APQs on the other hand though try to give more flexibility they can become quite messy to deal with as you scale. One alternative that is significantly more effective, is to run GraphQL on Edge itself. Essentially write your own CDN layer that is smart enough to understand that it's a graphQL and deploy it on edge with caching and whatnot! This is hard, and that's exactly what [Tailcall](https://tailcall.run) helps solve.

### Conclusion

Automatic persisted queries, while offering some advantages in network performance, reveal significant challenges when it comes to scaling. The complexities of caching, potential security risks, and the inherent problems with automatic persistence highlight that persisted queries may not be the one-size-fits-all solution they are often portrayed as.

The question of whether to implement PQ or APQ must be approached with caution, taking into account the specific requirements and potential scalability issues of your system. While they may serve as a useful tool in certain scenarios, understanding the limitations and conducting thorough analysis is vital to avoid falling into the trap of a solution that doesn't truly scale. This blog post has aimed to shed light on these complexities, encouraging a more nuanced perspective on a topic that is often oversimplified.
