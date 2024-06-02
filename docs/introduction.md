---
title: Transforming API Orchestration with Tailcall
description: Discover how Tailcall revolutionizes API integration with its robust DSL, enabling efficient orchestration, caching, and governance. Learn how Tailcall simplifies Backend for Frontend (BFF) layers, optimizing performance and scalability for modern applications.
slug: introduction-to-tailcall
---

Good APIs craft a broad spectrum of functionalities. Yet, the broader their scope, the more they diverge from being the perfect fit for any specific use case. This fundamental discrepancy — the impedance mismatch between the general capabilities of an API and the precise needs of a particular scenario — amplifies the necessity for an orchestration layer. Such a layer adeptly bridges this gap, tailor-fitting generic APIs to meet exact requirements with finesse. Tailcall stands at the forefront of this innovation, seamlessly transforming the way APIs are integrated and interacted with.

Tailcall introduces a robust DSL (Domain-Specific Language), enabling developers to fine-tune how APIs are orchestrated. This DSL facilitates specifying different caching and batching strategies to enhance the system's efficiency. It also enables precise governance and access control mechanisms. Tailcall serves as a central hub for team collaboration, offering a unified point for managing all APIs, documentation, and more. Once configured, it positions itself between the clients and microservices, adeptly managing all requests and orchestrating them as needed.

![Architecture Diagram](/images/docs/architecture.png)

Manually crafting BFF (Backend for Frontend) layers has become outdated. With Tailcall, API orchestration evolves into a streamlined and highly optimized process. It functions as an essential intermediary, intelligently directing requests and assembling responses from each microservice. This approach diminishes the development burden associated with traditional BFF layers but also bolsters performance, reliability, and scalability throughout the application infrastructure.
