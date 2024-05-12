---
title: "Unit Testing"
description: "Discover the Tailcall's Testing Guidelines designed for contributors. This guide covers our testing approach, how to run and write tests, and tips for troubleshooting. It's a straightforward resource for developers at any level aiming to contribute effectively and maintain high-quality code in Tailcall"
sidebar_position: 3
---

**Tailcall** employs a thorough testing methodology to verify functionality and ensure that future modifications do not compromise existing features. We promote test-driven development (TDD) where feasible.

## Running Tests

To execute tests locally on your machine, follow these steps:

1. Ensure the Rust toolchain is installed on your machine.

2. Execute all tests with the following command in the terminal:

   ```sh
   cargo test
   ```

3. To run a specific test or group of tests, modify the command accordingly:

   ```sh
   cargo test test_name
   ```

4. To view all output from tests (useful if you have added debug logs to your tests), use the command:

   ```sh
   cargo test -- --show-output
   ```

5. For more details and options on how tests function, please refer to the [Rust Book Testing Chapter](https://doc.rust-lang.org/book/ch11-00-testing.html) and the [rustc tests guide](https://doc.rust-lang.org/rustc/tests/index.html).

### Filtering Running Tests

To execute a specific set of tests or exclude some tests, use the following commands:

To run tests that match a certain pattern:

```sh
cargo test test_pattern
# e.g., to run grpc related tests:
cargo test grpc
```

To run a specific test by passing the full module path:

```sh
cargo test -- --exact test_name
# e.g., for grpc protobuf conversion:
cargo test -- --exact grpc::protobuf::tests::convert_value
```

To skip certain tests:

```sh
cargo test -- --skip test_pattern
# e.g., to ignore grpc related tests:
cargo test -- --skip grpc
```

For more available options, please refer to [rustc filter's documentation](https://doc.rust-lang.org/rustc/tests/index.html#filters).

## Writing Tests

### Unit Tests

Unit tests should focus on individual components, ensuring each functions as expected:

1. Place unit tests in the same file as your code, under a `#[cfg(test)]` module.
2. Use descriptive function names for your tests, for eg:

   ```rust
   #[cfg(test)]
   mod tests {
      #[test]
      fn test_addition() {
         assert_eq!(2 + 2, 4);
      }
   }
   ```

3. For every new feature or bug fix, structure your tests as follows:

   - Set up the value using helper methods in tests.
   - Compare an actual and an expected value.
   - Assert the two values on separate lines.
   - Ensure there is one assertion per test.

     For eg:

     ```rust
     use pretty_assertions::assert_eq;
     fn test_something_important() {
        // Setup
        let value = setup_something_using_a_function();

        // Compute Actual
        let actual = perform_some_operation_on_the_value(value);

        // Compute Expected
        let expected = ExpectedValue {foo: 1, bar: 2};

        // Compare Actual and Expected
        assert_eq!(actual, expected);
     }
     ```

4. Before submitting a pull request, verify all tests pass.

### Integration Tests

Integration testing is conducted using our [markdown-based DSL](./integration-testing.mdx). Please refer to its own documentation for detailed information.

## Naming Conventions

- Test functions should begin with `test_` followed by a description of their purpose.
- Use underscores to separate words in the test function names for readability.

## What to Test

In essence, test everything! Write unit tests for modules that can be tested independently and supplement them with integration tests to ensure the overall system stability.

## Troubleshooting Common Issues

- Ensure your branch is up-to-date with the latest commits from the main branch.
- Verify that your environment conforms to the required configurations (e.g., versions of Rust and dependencies).
- Confirm that test failures are not caused by your changes (e.g., run tests with a clean build on the main branch).
