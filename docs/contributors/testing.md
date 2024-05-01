---
title: "Testing Guidelines"
description: "Discover the Tailcall's Testing Guidelines designed for contributors. This guide covers our testing approach, how to run and write tests, and tips for troubleshooting. It's a straightforward resource for developers at any level aiming to contribute effectively and maintain high-quality code in Tailcall"
sidebar_position: 3
---

Proper testing ensures high-quality contributions and helps maintain the stability of the project. Below you will find the guidelines and procedures that you should follow when writing and running tests.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
- [Test Naming Conventions](#test-naming-conventions)
- [What to Test](#what-to-test)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
- [Additional Resources](#additional-resources)

## Testing Philosophy

**Tailcall** follows a comprehensive testing approach to ensure that functionality is verified and future changes do not break existing features. We encourage test-driven development (TDD) where practical.

## Running Tests

To run tests locally on your machine, follow these steps:

1. Make sure rust toolchain is installed on your machine.

2. To run all tests using the following command in the terminal type:

   ```sh
   cargo test
   ```

3. To run a specific test or group of tests change the command:

   ```sh
   cargo test test_name
   ```

4. If you want to see all output from tests (in case you've added debug logs to tests) use the command:

   ```sh
   cargo test -- --show-output
   ```

5. For more details and options how tests works please refer [Rust Book Testing Chapter](https://doc.rust-lang.org/book/ch11-00-testing.html) and [rustc tests guide](https://doc.rust-lang.org/rustc/tests/index.html)

### Filter running tests

In case you want to run specific set of tests or exclude some tests from running you can use following commands.

If you want to run tests that have names according to some pattern run:

```sh
cargo test test_pattern
# e.g. to run only grpc related tests:
cargo test grpc
```

If you want to run only specific test with exact name run passing the full module path to test:

```sh
cargo test -- --exact test_name
# e.g. for grpc protobuf conversion:
cargo test -- --exact grpc::protobuf::tests::convert_value
```

If you want to skip some tests:

```sh
cargo test -- --skip test_pattern
# e.g. to ignore grpc related tests
cargo test -- --skip grpc
```

For more available options please refer [rustc filter's documentation](https://doc.rust-lang.org/rustc/tests/index.html#filters)

## Writing Tests

### Unit Tests

Unit tests should focus on small functionality, ensuring that each component behaves as expected:

- Place unit tests in the same file as your code, under a `#[cfg(test)]` module.
- Use descriptive function names for your tests.
- Example:
  ```rust
  #[cfg(test)]
  mod tests {
  	#[test]
  	fn test_addition() {
  		assert_eq!(2 + 2, 4);
  	}
  }
  ```

### Integration Tests

Integration testing is implemented by our [Markdown-based testing framework](./execution_spec.md). Please, refer its documentation to learn more about it.

## Test Naming Conventions

- Test functions should start with `test_` followed by a description of what they cover.
- Use underscores to separate words in the test function name for readability.

## What to Test

- **Critical paths**: Core functionality that must always work.
- **Edge cases**: Conditions at the extremes of input boundaries.
- **Error handling**: Ensure the system gracefully handles invalid input and errors.

## Troubleshooting Common Issues

- If tests fail unexpectedly, make sure your environment matches the expected configurations (e.g., versions of Rust and dependencies).
- Ensure no external factors (like network dependencies) affect the tests.
