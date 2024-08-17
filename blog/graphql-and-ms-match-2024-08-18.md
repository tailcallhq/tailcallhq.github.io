---
title: "GraphQL and Microservices: A Match Made in Heaven?"
description: ""
authors:
  - name: Hunain Ahmed
    title: A freelance software developer, always working on something new and fascinating.
    url: https://github.com/hunxjunedo
    image_url: https://avatars.githubusercontent.com/u/89797440?v=4
hide_table_of_contents: true
slug: graphql-match-microservices
tags: [GraphQL, Microservices, API]
---

Is it really worth combining GraphQL with microservices or is it just a new shiny object with all the hype ?

import CallToAction from '../src/components/blog/call-to-action.tsx';


<!-- truncate -->

## Introduction

In the fast-changing land of software development, two concepts have been gathering momentum: **GraphQL** and **microservices**. While the latter helps businesses decompose their applications into small independent services, the former makes it possible for the clients of these services to request only data of interest; therefore, making both create a perfect combo when used in your app.

But is it really worth combining the two or is it just a new shiny object with all the hype ? Is it really cost-efficient and time-saving or just an expensive thing for tech majors ? Read as I explore the challenges, features and considerations of using GraphQL with microservices 🚀

## What Are Microservices?

Compared to traditional monolithic architecture, in which all the constituents of an application are usually closely integrated and interwoven, it is that **microservices** presents a very compelling option. Microservices really orient the technique of decomposition and isolation. Development, scaling, and deployment for every service can be independent. It provides high flexibility and a better developer experience.

The three key characteristics of microservices are **scalability**, **flexibility**, and **maintainability**. The components of the system can be scaled as needed, and - in terms of priority. Different languages and technologies can also be used to realize each service according to use cases and appropriate for individual use, which can be developed and maintained independently by different teams. Cleanup will not only be in the debugging phase; it will also accelerate the development cycle, from which you can easily adapt and evolve your application over time.

One of the most famous examples of microservice adoption success is **Spotify**. To support millions of monthly users, Spotify wrote their application in microservices, and the results are stunning. They probably have separate microservices for various tasks, like the following:

- Knowing which tracks a user will love, given their history of listens.
- Knowing the genre and theme of a track.
- Personalization of playlists to users on any theme using the above two microservices.
- Providing lyrics for tracks.

[Read: Migrating To Microservices](https://tailcall.run/blog/graphql-microservices-migration/).

## What is GraphQL?

**[GraphQL](https://tailcall.run/graphql/)** was designed based on the concept of _returning precisely what is asked for; no more, no less_. Open-sourced by Facebook in 2015, it fixes ancient issues of over-fetching and under-fetching that plagued REST APIs right from their very invention.

It empowers the client with **flexibility** regarding which particular fields to request in any use case. This is possible due to the **strongly typed schema** that clearly defines the data structure of the API and specifies what it returns. Plus, subscriptions, allow GraphQL to return **real-time data**, meeting demands of modern applications.

**GitHub** is probably the best case example of applying GraphQL. By implementing GraphQL, GitHub provided an interface for a developer to fetch data from whatever available resources, greatly improving efficiency and flexibility when dealing with its platform.

## Combining GraphQL and Microservices

The true magic happens when **GraphQL** and **microservices** are combined. This pairing allows developers to harness the power of microservices while mitigating some of the complexities associated with them.

**Benefits of Combining GraphQL and Microservices**:

GraphQL allows the use of Tailcall for optimizing **data retrieval** and parallel resolutions baked into the system. Tailcall then decides how and when it should resolve requests sequentially, and which in parallel, reducing response times by quite a large margin. It makes **error handling** very efficient because of the automatic partial resolution and forming of responses, saving you a headache of trouble. Also, with the **flexibility** and clearly-defined ownership GraphQL brings, clients may be granted the freedom to fetch some data from some microservices; this enhances control over the process and efficiency.

_fetching data from multiple microservices using Tailcall:_

```graphql
type Query {
  tracks: TrackData!
    @grpc(method: "tracks.trackService.listTracks")
}

type Track {
  id: ID!
  title: String!
  audioUrl: String!
  reactions: [Reaction]
    @http(path: "/tracks/{{.value.id}}/reactions")
  lyrics: [Lyric]
    @grpc(
      body: "{{.value.id}}"
      method: "tracks.trackService.getLyrics"
    )
}

type TrackData {
  track: [Track]!
}

type Reaction {
  emoji: String!
  count: Int!
}

type Lyric {
  text: String!
  timestampSecond: Int!
}
```

This powerful combination is how **Netflix** makes seamless integrations between microservices and scale independently, depending on their usage by consumers. For example, the microservice that does the age-group rating calculation is probably under much less heavy load and would require less scaling compared to one that is used in making content recommendations, which would be highly resource-intensive.

**Challenges**:
Sometimes, it's a pathway to **overengineering** for an application. You could end up writing long, sprawling schemas and queries for things you could have implemented in a few lines of code in REST. It can bring in unnecessary **complexity** and make it harder for another developer to implement something else in the app.

Another well-known challenge is the **N+1 problem**: this happens when a GraphQL query requesting nested data provokes plural sequential calls to a microservice, often due to a poorly designed schema. Fortunately, Tailcall has a solution to this problem built into the box, thus making your development easier and more efficient. [Read How](https://tailcall.run/docs/graphql-n-plus-one-problem-solved-tailcall/#n1-in-graphql-using-tailcall).

## Designing Scalable APIs with GraphQL and Microservices

Designing scalable APIs that leverage both **GraphQL** and **microservices** requires careful planning and adherence to certain principles.

Your API should be **efficient**, **strongly typed** and most-importantly **secure**:

- **Security:** With **Tailcall's** [built-in auth](https://tailcall.run/docs/field-level-access-control-graphql-authentication/) and [@protected](https://tailcall.run/docs/tailcall-dsl-graphql-custom-directives/#protected-directive) directive you can add auth functionality and make fields protected with literally a few lines of code - which is intelligent enough to protect any query that indirectly resolves to that field:

```graphql
type Reaction @protected {
  emoji: String!
  count: Int!
}
```

- **Efficiency:** your API should be smart enough to prevent the N + 1 problem, have a good caching mechanism and provide verbose logs for risk management in case of emergencies. You can use [OpenTelemetry](https://opentelemetry.io/) to collect logs and analytics with Tailcall using the [@telemetry](https://tailcall.run/docs/tailcall-dsl-graphql-custom-directives/#telemetry-directive) directive.

- **Strong Typing:** Nothing can be more painful than having to work with a poorly-typed GraphQL schema where you had `email` and `url` as `string`, but with handmade validation code. These omissions are a big mistake which could usher in potential errors and inconsistencies in handling your data. Instead, make full use of GraphQL's in-built scalars and custom types. It leverages these built-in scalars to ensure that fields are valid according to the expected data types, reducing the need for error-prone manual validation:

```graphql
type Query {
  findMyAccount(phone: PhoneNumber!): Account!
    @http(path: "/accounts?phone={{.args.phone}}")
}
type Account {
  id: ID!
  name: String!
  email: String!
}
```

[Read: Designing The Perfect GraphQL Schema](https://tailcall.run/blog/graphql-schema/)

## Security and Authentication with GraphQL and Microservices

Security is a major concern when integrating **GraphQL** with **microservices**. Without proper safeguards, the powerful flexibility of GraphQL can lead to significant risks.

### Major Concerns about Security:

1. **Query Complexity**: The superpower of GraphQL is letting clients create incredibly intricate and deeply nested queries. Sometimes, however, this becomes a nemesis. Imagine this: a bad user sending a query that is as deep as a rabbit hole, asking for endless amounts of data and gasping your server's breath. To keep things at hand and prevent your server from melting down, some ground rules should be created. Design query complexity analysis and set **depth limits** to make sure that queries are of manageable size; otherwise, they can overload your server. Have A Look:

```graphql
query {
  songs {
    # Fetch all songs
    author {
      # For each song, fetch the author's details
      songs {
        # For each author, fetch their songs
        author {
          # For each song by the author, fetch the author's details again
          comments # Retrieve the comments for each author
        } # and this can go forever - until your server overloads
      }
    }
  }
}
```

2. **Authentication and Authorization**: If you need to protect your microservices, some strong security configuration is requisite. Every microservice should be armed with a guard at the level of authentication and authorization. But don't stop here. Scale up these security measures to the GraphQL layer. Next, it will help you set up solid authentication strategies and fine-grained access controls right in your GraphQL schema. Think of this as having a bouncer at your door to make sure only the proper users get access to the proper data.

3. **Exposure of Data**: GraphQL's introspection and flexible queries can sometimes be a two-edged sword. Unless properly controlled, sensitive information may slip out and unintentionally be exposed. Implement strict field-level access control that guides how data can be queried and by whom to keep your data safe and sound. [Read: How is Introspection a Hidden Treasure for Attackers](https://tailcall.run/blog/graphql-introspection-security/#the-security-implications-of-introspection)

The creators of GraphQL, **Facebook** themselves, have solid security measures in place to protect their GraphQL API. Query complexity analysis, rate limiting, and other strict authentication protocols are all part of Facebook's efforts to secure the platform. Read: Securing your GraphQL API

<CallToAction
title="Ready to build your next app with GraphQL ?"
subtitle= "don’t get left behind - Try Tailcall today"
buttonText="Get Started"
backgroundImageSrc="/icons/basic/bg-tailcall.svg"
/>

## Final Thoughts

Concluding, I would like to add that this, though easy and even exciting for some, can result in nightmares or career-ending disasters for some in case of entering into these technologies without any prior considerations. So always do your research and dive in before using GraphQL, and to make things easier, use a runtime like **Tailcall**, which comes with many safety guards against mishaps. See you next time 😄.

