---
title: Introduction
sidebar_position: 1
description: Discover how to efficiently address the N+1 problem in using Tailcall with our comprehensive guide. Learn to reduce server requests and optimize performance using practical solutions and step-by-step examples with the TailCall CLI for GraphQL applications. Enhance your coding practices and ensure scalable, high-performance web applications by mastering techniques to mitigate the N+1 problem, reduce server load, and improve response times.
---

![N + 1 Problem](/images/docs/n+1-issue.png)

The **N+1 problem** significantly impacts systems performance by triggering numerous upstream requests in response to a single downstream request. However, with Tailcall's powerful introspection capabilities, you can identify all instances of N+1 issues even before you start your server. Before we delve deeper into how Tailcall accomplishes this, let's understand the N+1 issue in detail.
