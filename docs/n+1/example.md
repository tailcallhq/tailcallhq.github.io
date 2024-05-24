---
title: Example
sidebar_position: 2
description: Discover how to efficiently address the N+1 problem in using Tailcall with our comprehensive guide. Learn to reduce server requests and optimize performance using practical solutions and step-by-step examples with the TailCall CLI for GraphQL applications. Enhance your coding practices and ensure scalable, high-performance web applications by mastering techniques to mitigate the N+1 problem, reduce server load, and improve response times.
---

Imagine we need to fetch data from the [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/), requiring both posts and their authors' details.

First, we request all posts:

```bash
❯ curl https://jsonplaceholder.typicode.com/posts
  [
    {
      "userId": 1,
      "id": 1,
      "title": "Creating Solutions for Challenges",
      "body": "We anticipate and understand challenges, creating solutions while considering exceptions and criticisms."
    },
    {
      "userId": 1,
      "id": 2,
      "title": "Understanding Identity",
      "body": "Life's essence, measured through time, presents pains and joys. We find solace in the mundane, seeking meaning beyond the visible."
    }
  ]
```

This command retrieves posts from the API, with each post containing a `userId` field indicating its author.

Next, we fetch details for each post's author, such as:

```bash
❯ curl https://jsonplaceholder.typicode.com/users/1
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
```

For 100 posts, this results in 100 additional requests for author details, totaling 101 requests. This is the infamous _N + 1 problem_:

- 1 request for `/posts`
- 100 or `N` requests for `/users/:id` for each user

:::info
This issue can escalate in real-world scenarios, leading to straining resources, increasing server costs, slowing response times, and potentially causing server downtime even at a moderate scale.
:::

Hope this gives you a high-level overview of what the N + 1 problem is in the API context. It's a common problem not specific to just APIs or GraphQL, you will see this problem very commonly in database queries also. However addressing the N+1 problem during application design and development is crucial and we will see how this is tackled in Tailcall.
