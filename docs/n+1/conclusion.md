---
title: Conclusion
sidebar_position: 7
description: Discover how to efficiently address the N+1 problem in using Tailcall with our comprehensive guide. Learn to reduce server requests and optimize performance using practical solutions and step-by-step examples with the TailCall CLI for GraphQL applications. Enhance your coding practices and ensure scalable, high-performance web applications by mastering techniques to mitigate the N+1 problem, reduce server load, and improve response times.
---

To summarize, we learnt that N + 1 is a general problem and not specific to GraphQL. It's a hard problem to identify, and developers often resort to runtime analysis to find such scenarios. N + 1 can really strain your infrastructure, leading to serious downtime in certain cases. We also learnt that in Tailcall, the CLI can introspect your configuration and identify all the potential N + 1 issues upfront. Using `dedupe`, you can improve the N + 1 problem significantly, however, it's not a complete solution. To completely eliminate the N + 1 problem, you can configure Tailcall to leverage Batch APIs. Hopefully, this guide underscores the effectiveness of Tailcall in addressing the N + 1 problem.
