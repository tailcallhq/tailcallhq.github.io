---
title: "Case Study: How Dream11 Uses GraphQL to Power Their Fantasy Sports Platform"
authors:
  - name: Amit Singh
    title: Head of Growth and Strategy @ Tailcall | Ex Director of Engineering @ Dream11
    url: https://github.com/amitksingh1490
    image_url: https://avatars.githubusercontent.com/u/23661702?v=5
description: Learn how Dream11 leverages GraphQL to build a scalable, performant, and user-friendly fantasy sports platform.
hide_table_of_contents: true
slug: dream11-graphql-case-study
image: /images/blog/cover-dream11-case-study.png
---

import CallToAction from '../src/components/blog/call-to-action.tsx';

As a former employee of Dream11, India's largest fantasy sports platform with over 200 million users, I witnessed firsthand how we revolutionized the sports industry by offering users the chance to create their fantasy teams and compete against each other in various sports leagues. Now that I've joined Tailcall, I'm excited to share my insights on how Dream11 leveraged GraphQL to build a scalable, performant, and user-friendly platform.

<!-- truncate -->

## Case Study: Dream11's GraphQL Journey

### Challenge

During my time at Dream11, we faced the challenge of building a backend to serve multiple clients—mobile, web, and desktop. This became increasingly complicated over time. The requirements and capabilities of these clients differed significantly, and accommodating them all left our backend bloated. For mobile apps, this caused a decline in performance due to over-fetching unnecessary data, while devices with larger screens suffered from under-fetching data, forcing our application developers to filter and format the data best suited for each client. These added responsibilities and computing requirements on the frontend made it harder for us to adapt to rapid development and changes.

### Solution

We found a solution to this problem by creating a layer of backend-for-frontends (BFFs). In this design, each frontend application has a dedicated backend responsible for fetching the resources from microservices and returning the proper response for that specific client. Our BFFs do all the fetching, filtering, and structuring for the data requested, so the frontend applications get the exact data.

## What are backend-for-frontends (BFFs)?

BFFs sit in the middle of the micro-services and frontend applications. They customize the response and error handling specific to each client application so the frontend applications don't have to. By implementing BFFs, we enhanced our architecture and gained several advantages:

- **No under/over-fetching:** By serving every client based on its specific requirements, our BFFs ensure that the client gets what they need and nothing more.
- **Separation of concerns:** Using a layer of BFFs relieved our frontend from needing to format data, which allowed our developers flexibility in choosing and structuring our microservices.
- **Fewer network calls:** Because our BFFs can fetch the data from multiple resources at once, the client doesn't have to make multiple calls to get all the information.

## Dream11's BFF Journey

Our BFF journey at Dream11 began with the need to serve multiple clients with different requirements. We initially implemented a BFF layer using traditional REST APIs. However, as our team size and feature set grew, the REST API started to show its limitations. It was becoming bloated, and our frontend developers were struggling to keep up with the changes.

With the introduction of GraphQL, we found the perfect solution to our problem. GraphQL allowed us to build a BFF layer that could serve multiple clients with different requirements, while ensuring that the user experience was consistent across all platforms. GraphQL's ability to fetch only the data that the client requested, and its ability to fetch data from multiple resources in a single request, made it the perfect choice for our BFF layer.

## Architecture of Dream11's BFF

Our BFF architecture at Dream11 consisted of the following components:

- **GraphQL Server:** Built using Apollo Server, responsible for fetching data from microservices and returning it to frontend applications.
- **Microservices:** Built using Node.js and Express, responsible for fetching data from databases and returning it to the GraphQL server.
- **Frontend Applications:** Built using React, responsible for rendering the data returned by the GraphQL server.
- **API Gateway:** Built using Kong, responsible for routing requests from the GraphQL server to the microservices.

![Architecture diagram explaining Dream11 GraphQL Based BFF Architecture](../static/images/blog/dream11_bff.png)

## Advantages of using GraphQL for Dream11's BFF

Implementing GraphQL for our BFF layer at Dream11 brought numerous advantages:

- **Reduced network calls**
- **Fewer bugs** due to type-safe queries generated at compile time
- **Improved performance** by fetching only the required data
- **Flexibility** in structuring our data
- **Consistency** across all platforms
- **Scalability** without compromising performance or user experience
- **Ease of use** for frontend developers
- **Resilient APIs**
- **Reduced development time**
- **Improved developer experience**

As I reflect on my time at Dream11 and our journey with GraphQL, I'm excited to bring these insights to my new role at Tailcall. The success we achieved with this architecture has reinforced my belief in the power of GraphQL for building scalable and efficient backend systems.
