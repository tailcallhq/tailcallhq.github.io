---
title: "How Dream11 Revolutionized Fantasy Sports with GraphQL"
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

As a former Director of Engineering at Dream11, India's largest fantasy sports platform with over 200 million users, I've seen firsthand how we transformed the sports industry by giving users the power to create their own fantasy teams and compete against each other in various leagues. Now, as the Head of Growth and Strategy at Tailcall, I'm excited to share my insights on how Dream11 harnessed the power of GraphQL to build a scalable, performant, and user-friendly platform.


<!-- truncate -->


## The Challenge: Breaking Free from Monolithic Architecture

During my time at Dream11, we embarked on a major refactor to improve performance and scalability. We moved from a monolithic architecture to a microservices architecture, but this journey was not without its challenges. One of the biggest hurdles was ensuring that our frontend applications didn't have to worry about how our backend was structured. That's when we turned to GraphQL as our backend-for-frontend (BFF) solution.

[//]: # (During my time at Dream11, we did many major re architectures to improve the performance and scalabitity of our systems as well as to improve the developer experience.)

[//]: # (One of the major refactorings was our journey of moving from a monolithic architecture to a micro-services architecture.)

[//]: # (This journey was not easy and we faced many challenges along the way.)

[//]: # (During this journey we had only one rule that we followed.)

[//]: # ("Frontend should not have any dependency on how the backend is structured".)

[//]: # (This where we thought of using GraphQL as backend-for-frontend aka BFF .)

## What are Backend-for-Frontends (BFFs)?

BFFs sit between our microservices and frontend applications, customizing responses and error handling for each client application. By implementing BFFs, we gained several advantages:

- **No under/over-fetching:** Our BFFs ensure that clients get exactly what they need, without any unnecessary data.
- **Separation of concerns:** Our frontend applications no longer had to worry about formatting data, giving our developers the flexibility to choose and structure our microservices as needed.
- **Fewer network calls:** Our BFFs can fetch data from multiple resources at once, reducing the number of calls our clients need to make.

## Dream11's Microservices Journey
To make our migration smooth and minimize risk, we decided to move all our APIs to a GraphQL-based BFF. We then updated our frontend applications to use the BFF for all data fetching, adding a lint check to ensure that no frontend application was making direct API calls to our monolith. Once we were confident that all our frontend applications were using the BFF, we began moving our APIs to microservices one by one. This approach may have been longer, but it was smoother and helped us minimize risk and testing.

[//]: # (To make the migration smooth and limit the scope of changes, risk and testing.)

[//]: # (We Decided we will move all the api in our monolith to a GraphQL based BFF.)

[//]: # (and make the frontend applications to use the BFF for all the data fetching. We also added a lint check to make sure that no frontend application is making any direct api calls to the monolith.)

[//]: # (Once we were confident that all the frontend applications are using the BFF we started moving the api's to microservices one by one.)

[//]: # (This was a longer path, but it was smoother and it helped us minimize the risk and testing.)


![Micro service journey](../static/images/blog/monolith-to-microservices.png)

## Architecture of Dream11's BFF

Our BFF architecture at Dream11 consisted of the following components:

- **GraphQL Server:** Built using Apollo Server, responsible for fetching data from microservices and returning it to frontend applications.
- **Microservices:** Built using Node.js and Express, responsible for fetching data from databases and returning it to the GraphQL server.
- **Frontend Applications:** Built using React, responsible for rendering the data returned by the GraphQL server.
- **API Gateway:** Built using Kong, responsible for routing requests from the GraphQL server to the microservices.

![Architecture diagram explaining Dream11 GraphQL Based BFF Architecture](../static/images/blog/dream11_bff.png)

In this architecture, the GraphQL server acts as a mediator between the frontend applications and the microservices. It fetches data from the microservices and returns it to the frontend applications in the format they require.
You might be wondering why we put an API Gateway after the GraphQL server. The reason is resiliency of our microservices.
We wanted to rate limit and circuit breaking the usage of apis based on the capacity and status of individual microservices. But we were not able to do that with GraphQL because GraphQL has only one endpoint and Rate limiting based on query depth or query cost was not giving us the desired results.

This architecture worked for us for many years and we were able to scale our systems to 10s of millions of users without any issues. Until we started facing issues with the performance of our GraphQL server.

<CallToAction
title="To more about what we did to improve the performance of our GraphQL server"
subtitle= "Please Join us at GraphQL Conference 2024"
buttonText="See You At GraphQL Conf"
href="https://graphql.org/conf/2024/schedule/870876ffad45b79d11e09393e7f22587/"
backgroundImageSrc="/icons/basic/bg-tailcall.svg"
/>



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
- **Improved developer experience*

## 

As I reflect on my time at Dream11 and our journey with GraphQL, I'm excited to bring these insights to my new role at Tailcall. The success we achieved with this architecture has reinforced my belief in the power of GraphQL for building scalable and efficient backend systems.
