---
title: "Case Study: How Dream11 Uses GraphQL to Power Their Fantasy Sports Platform"
authors:
  - name: Amit Singh
    title: Head of Growth and Strategy @ Tailcall
    url: https://github.com/amitksingh1490
    image_url: https://avatars.githubusercontent.com/u/23661702?v=5
description: Learn how Dream11 leverages GraphQL to build a scalable, performant, and user-friendly fantasy sports platform.
hide_table_of_contents: true
slug: dream11-graphql-case-study
image: /images/blog/cover-dream11-case-study.png
---

import CallToAction from '../src/components/blog/call-to-action.tsx';

Dream11 is India's largest fantasy sports platform, with over 200 million users, It has revolutionized the sports industry by offering users the chance to create their fantasy teams and compete against each other in various sports leagues.

<!-- truncate -->

## Case Study: Dream11's GraphQL Journey

### Challenge

Building a backend to serve multiple clients—mobile, web, and desktop—can get complicated over time. The requirements and capabilities of these clients can differ significantly, and accommodating them all can leave your backend bloated. For mobile apps, this can cause a decline in performance due to over-fetching unnecessary data, while devices with larger screens may suffer from under-fetching data, forcing the application developers to filter and format the data best suited for each client. These added responsibilities and computing requirements on the frontend make it harder to adapt to rapid development and changes.

### Solution

One solution to this problem is creating a layer of backend-for-frontends. In this design, each frontend application has a dedicated backend responsible for fetching the resources from microservices and returning the proper response for this specific client. Backend-for-frontends do all the fetching, filtering, and structuring for the data requested, so the frontend applications get the exact data they asked for—nothing more, nothing less.

In this case study, we'll explore how Dream11 uses GraphQL to power their platform, enabling them to build a scalable, performant BFF(Backend for Frontend) to power a user-friendly application.

## What are backend-for-frontends (BFFs)?

BFFs sit in the middle of the micro-services and frontend applications, as shown in the following image.

BFFs customize the response and error handling specific to each client application so the frontend applications don't have to. By doing so, BFFs enhance the architecture and provide the following advantages over traditional backends:

- **No under/over-fetching:** By serving every client based on its specific requirements, BFFs ensure that the client gets what they need and nothing more. By doing this, BFFs save network bandwidth and reduce the risk of exposing sensitive information to clients.
- **Separation of concerns:** Using a layer of BFFs relieves the frontend from needing to format data, which allows developers flexibility in choosing and structuring their microservices, without the need to change the frontend. Clients usually don't need to be changed when a microservice is replaced or changes its API contract, because the BFFs are responsible for ensuring resilient APIs.
- **Fewer network calls:** Because BFFs can fetch the data from multiple resources at once, the client doesn't have to make multiple calls to get all the information. A good example of this is fetching nested information, such as a blog post that contains an author. The BFF can return the author's data with the blog post rather than forcing the client to first request the blog post, then request the author data associated with it.

## Dream11's BFF Journey

Dream11's BFF journey began with the need to serve multiple clients with different requirements. They needed a solution that could handle the complexity of their backend and frontend applications, while ensuring that the user experience was consistent across all platforms. They chose to implement a BFF layer using traditional REST APIs.
As the team size and feature set of Dream11 started to grow the REST API started to show its limitations. The REST API was becoming bloated, and the frontend developers were struggling to keep up with the changes. The team needed a solution that could help them scale their backend and frontend applications without compromising on performance or user experience.
With the introduction of GraphQL, Dream11 found the perfect solution to their problem. GraphQL allowed them to build a BFF layer that could serve multiple clients with different requirements, while ensuring that the user experience was consistent across all platforms. GraphQL's ability to fetch only the data that the client requested, and its ability to fetch data from multiple resources in a single request, made it the perfect choice for Dream11's BFF layer.

## Architecture of Dream11's BFF

Dream11's BFF architecture consists of the following components:

- **GraphQL Server:** The GraphQL server is responsible for fetching the data from the microservices and returning the data to the frontend applications. The GraphQL server is built using Apollo Server, which provides a flexible and powerful way to build GraphQL servers.
- **Microservices:** The microservices are responsible for fetching the data from the databases and returning the data to the GraphQL server. The microservices are built using Node.js and Express, which provide a fast and scalable way to build microservices.
- **Frontend Applications:** The frontend applications are responsible for rendering the data returned by the GraphQL server. The frontend applications are built using React, which provides a fast and efficient way to build user interfaces.
- **API Gateway:** The API Gateway is responsible for routing the requests from GraphQL server to the microservices. The API Gateway is built using Kong.

![Architecture diagram explaining Dream11 GraphQL Based BFF Architecture](../static/images/blog/dream11_bff.png)

## Advantages of using GraphQL for Dream11's BFF

- **Reduced network calls:** GraphQL allows Dream11 to fetch all the data required for a specific client in a single request, reducing the number of network calls required to load a page.
- **Less Bugs:** With GraphQL, type safe queries are generated at compile time, which reduces the chances of runtime errors.
- **Improved Performance:** GraphQL allows Dream11 to fetch only the data that the client requested, which reduces the amount of data that needs to be transferred over the network, improving performance.
- **Flexibility:** GraphQL allows Dream11 to fetch data from multiple resources in a single request, which gives them the flexibility to structure their data in a way that best suits their frontend applications.
- **Consistency:** GraphQL ensures that the user experience is consistent across all platforms, as the BFF layer can serve each client with the data that they require.
- **Scalability:** GraphQL allows Dream11 to scale their backend and frontend applications without compromising on performance or user experience.
- **Ease of Use:** GraphQL's intuitive query language makes it easy for frontend developers to request the data that they need, without having to worry about the complexities of the backend.
- **Resilient APIs:** GraphQL's ability to fetch data from multiple resources in a single request ensures that the BFF layer can serve the frontend applications even if a microservice changes its API contract.
- **Reduced Development Time:** With GraphQL, frontend developers can request the data that they need in a single query, reducing the time required to build and maintain the frontend applications.
- **Improved Developer Experience:** GraphQL's ability to fetch only the data that the client requested, and its ability to fetch data from multiple resources in a single request, makes it easier for frontend developers to build and maintain the frontend applications.
