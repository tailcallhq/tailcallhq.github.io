---
title: "Guidelines"
sidebar_position: 1
description: "This guide outlines the key steps and best practices for contributing to the Tailcall project, covering setup, coding, testing, and documentation to ensure quality and consistency in contributions."
slug: "/"
---

# Contribution Guidelines

Welcome to the **Tailcall** project! If you haven't stared us yet, make sure you do by clicking [here](https://github.com/tailcallhq/tailcall).
This document provides an overview of the best practices for contributing effectively. Follow these guidelines to ensure a smooth collaboration process.

## The Basics

1. **Fork and Clone:** Fork the repository on GitHub and clone your fork locally.

   ```bash
   git clone https://github.com/yourusername/tailcall.git
   ```

2. **Set Up Your Environment:**
   - **Install Rust:** Use [rustup](https://rustup.rs/) to install Rust and the `nightly` toolchain.
   - **Install Prettier:** Required for linting, install [Prettier](https://prettier.io/).
   - **Build the Application:** Navigate to the project directory and execute `cargo build`.
   - **Start the Server:** Run `cargo run -- start ./examples/jsonplaceholder.graphql` to start the server and access the GraphiQL interface at [https://tailcall.run/playground](https://tailcall.run/playground).

## Making and Discussing Changes

1. **Create a New Branch:** Always work on a new branch created from the latest main branch.

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Develop Incrementally:** Use small, [stacked PRs](https://benjamincongdon.me/blog/2022/07/17/In-Praise-of-Stacked-PRs/) for complex features. Break down large tasks into smaller, manageable pieces, each with its own PR. If you are working on a large bounty item add the bounty on your main PR and create stacked PRs wrt to your main PR.

3. **Discuss on Discord:** For real-time discussions, use the `#contributors` channel on Discord. Create a thread for each PR to facilitate focused discussions.

## Pull Requests and Code Quality

1. **Keep PRs Small:** Focus each PR on a single topic to simplify review and potential reverts. Describe your changes clearly in the PR description, explaining the solution and linking to any relevant discussions or issues.

2. **Commit Clearly:** Write concise, descriptive commit messages. Each commit should represent a self-contained change.

3. **Submit PRs:** Push your branch to GitHub and open a PR against the main branch. In the PR description, detail the purpose of your changes and any additional context needed.

4. **Code Review:** Engage with reviewers on GitHub and address feedback promptly. Use discussions on Discord to resolve complex issues or debates efficiently.

## Community Engagement

- **Star and Share:** Star the repository if you find it helpful and share your contributions on social media using `#tailcall` and tagging [@tailcallhq](https://twitter.com/tailcallhq).

## Final Notes

Tailcall thrives through your contributions. We aim to maintain a respectful and inclusive community. Thank you for helping to enhance Tailcall for everyone!
