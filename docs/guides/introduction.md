---
title: Introduction
sidebar_position: 1
description: Discover the power of Tailcall's introspection capabilities in tackling the N+1 problem, a common performance issue in systems where a single downstream request triggers numerous upstream requests. Tailcall allows you to identify all instances of N+1 issues before starting your server, ensuring optimal performance and efficiency. Learn more about how Tailcall addresses this challenge and enhances your system's functionality.
---

![N + 1 Problem](/images/docs/n+1-issue.png)

The **N+1 problem** significantly impacts systems performance by triggering numerous upstream requests in response to a single downstream request. However, with Tailcall's powerful introspection capabilities, you can identify all instances of N+1 issues even before you start your server! Amazing, right? but before we delve deeper into how Tailcall accomplishes this, let's understand the N+1 issue in detail.
