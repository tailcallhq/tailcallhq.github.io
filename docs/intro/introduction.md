---
title: Problem Statement
sidebar_position: 2
slug: /
---

Traditional API Gateways form the backbone of modern application architectures, offering a comprehensive suite of features essential for efficient API management. These gateways handle tasks such as routing traffic to the correct services, ensuring system resilience through circuit breaking, and facilitating cross cutting functions like caching, logging, monitoring, and protocol translation.

Despite these capabilities, current API Gateways primarily offer primitives that are based on protocol. They treat the contents of request and response bodies as mere byte sequences, without delving into their substance. This limitation confines the use of all features to just the URL, headers, and HTTP method, without deeper engagement with the content.

Tailcall, in contrast, challenges this approach by offering first-class primitives designed to interact with your business entities directly. This approach grants tremendous power and flexibility, transcending protocol constraints and focusing on the nature of the API's data. With Tailcall, specifying which parts of an entity should be public or private becomes straightforward, and the platform allows for the obfuscation of fields deemed sensitive or PII in specific contexts. This is all achievable through Tailcall's DSL, which facilitates these complex operations efficiently and with minimal latency.

Further enhancing its capabilities, Tailcall's DSL supports sophisticated API Orchestration, going beyond mere request routing. It enables you to define the expected API structure and provides guidance on resolving each component within the entity type. For instance, consider a transaction API containing a userId. Traditionally, expanding this userId to retrieve the corresponding user details would require additional micro-services. However, with Tailcall, expressing this requirement through its DSL prompts the Tailcall runtime to automatically resolve and populate these details for you. This approach eliminates the need for any manual coding, streamlining the API management process significantly.
