---
title: Benchmarks
sidebar_position: 5
description: "Explore Tailcall's comprehensive guide to benchmarking for continuous integration (CI) systems. Learn how to seamlessly integrate and run performance tests on every commit to the main branch using Criterion. The guide covers installation of essential tools like cargo-criterion and rust-script, provides step-by-step instructions for executing benchmarks, and details procedures for comparing benchmark results across different code branches. Ensure code efficiency and detect performance degradations early with Tailcall's benchmarking strategies, essential for developers seeking to maintain and improve software performance consistently. Visit the complete guide to start optimizing your CI pipeline today."
---

Benchmarking infrastructure is crucial for Tailcall. We run a suite of benchmarks on our continuous integration (CI) system for every commit made to the `main` branch using [Criterion](https://bheisler.github.io/criterion.rs/book/).

## Running Benchmarks

1. Install [cargo-criterion](https://crates.io/crates/cargo-criterion) and [rust-script](https://crates.io/crates/rust-script):
   ```bash
   cargo install cargo-criterion rust-script
   ```
2. Execute the benchmarks:

   ```bash
   cargo bench
   ```

   This command will run all benchmarks and display the results. To run a specific benchmark you could modify the command and pass a pattern to the command:

   ```bash
   cargo bench -- 'foo.*bar'
   ```

## Comparing Benchmarks

To facilitate benchmark comparison, we have developed a Rust script capable of contrasting the outcomes of two benchmarks.

```bash
# Checkout the base branch
git checkout main

# Run the benchmarks for the main branch and store the result in a file
cargo bench --message-format=json > main.json

# Checkout the feature branch
git checkout feature

# Run the benchmarks again in your feature branch
cargo bench --message-format=json > feature.json

# Perform a comparison check between the two branches
./scripts/criterion_compare.rs base.json main.json table
```

If the benchmarks indicate a degradation exceeding **10%**, the script will terminate with an error. You can refer to the automatically generated `benches/benchmark.md` file to identify which benchmarks underperformed and investigate the corresponding code changes before submitting a pull request.
