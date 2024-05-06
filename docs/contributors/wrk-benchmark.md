---
title: Macro Benchmarks
sidebar_position: 6
description: "Learn how to benchmark a Tailcall server using `wrk` with this comprehensive guide. Discover the steps for building your project in release mode, starting the server with controlled log output, and using `wrk` with a custom Lua script for precise benchmarking. This tutorial also covers how to verify server responsiveness with `curl` and how to interpret benchmark results to assess server performance under load. Perfect for developers looking to optimize their Rust applications."
---

This document outlines the steps to benchmark a Tailcall server using `wrk`, a modern HTTP benchmarking tool. It covers building your Rust project in release mode, starting the server, and performing the benchmark.

## Prerequisites

- Rust and Cargo ([https://rustup.rs/](https://rustup.rs/))
- `wrk` benchmarking tool (Installation instructions: [https://github.com/wg/wrk](https://github.com/wg/wrk))

## Step 1: Build Tailcall

Ensure you are on the desired branch you want to benchmark, and then build Tailcall in release mode to optimize performance:

```bash
cargo build --release
```

## Step 2: Start the Server

Start the Tailcall server by setting the appropriate environment variable to control log output and using the release binary:

```bash
export TC_LOG_LEVEL=error
cargo run --release -- start ./jsonplaceholder.graphql
```

This command sets the log level to `error` to minimize logging output, which can affect performance during benchmarks.

## Step 3: Verify Server is Running

Before running `wrk`, verify that the server is responsive. Use `curl` to send a request:

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"operationName":null,"variables":{},"query":"{posts{title}}"}' \
    http://127.0.0.1:8000/graphql
```

Repeat this a couple of times to ensure the server is handling requests correctly.

## Step 4: Customize WRK Setup with Lua Script

To customize the `wrk` setup, create a Lua script named `wrk_script.lua` and paste the following content:

```lua
wrk.method = "POST"
wrk.body = '{"operationName":null,"variables":{},"query":"{posts{title}}"}'
wrk.headers["Connection"] = "keep-alive"
wrk.headers["Content-Type"] = "application/json"
```

This script configures `wrk` to send POST requests with a specific JSON body and headers.

## Step 5: Run the Benchmark

Open another terminal window and execute `wrk` to start the benchmark. Here is a basic example:

```bash
wrk -t12 -c400 -d30s -s wrk_script.lua http://127.0.0.1:8000/graphql
```

This command uses 12 threads and maintains 400 open HTTP connections over a duration of 30 seconds, targeting the server running on localhost port 8000.

## Step 6: Interpreting Results

`wrk` will output statistics about the tests, which include:

- Total number of requests completed
- Throughput, measured in requests per second
- Latency distribution

These metrics help assess the performance capabilities and robustness of your server under high load conditions.
