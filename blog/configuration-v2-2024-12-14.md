---
title: GraphQL Configuration v2
subtitle: Migrating to the newer configuration format
authors: tusharmath
hide_table_of_contents: true
slug: migrating-to-graphql-configuration-v2/
---

Our current configuration architecture, while aiming for flexibility, has introduced complexities that hinder its usability and maintainability. This blog outlines the existing design, its shortcomings, and a proposed solution for a simpler, more predictable configuration experience.

<!-- truncate -->

## Current Configuration Design

Currently, developers define configurations using `.graphql`, `.json`, or `.yml` formats. These configurations contain schema information (types & resolvers), runtime information (upstream settings, server settings, telemetry), and links to other configurations. This linking mechanism was introduced to enable modular configuration management, particularly within larger organizations where each team wants to maintain their own configuration and compose them together to run a federated GraphQL server. A merge algorithm within the Tailcall binary, combines the linked configurations into a single effective configuration. Beyond configuration files, linking also supports external resources like JWTKS, Protobuf files, and JavaScript files.

Typical folder structure with linked configurations:

```bash title="Current Folder Structure"
├── .tailcallrc.graphql
├── .tailcallrc.schema.json
├── main.graphql
├── users.graphql
└── products.graphql
```

In the above example, `main.graphql` links to `users.graphql` and `products.graphql` using the `@link` directive. The merge algorithm combines these linked configurations into a single effective configuration.

```graphql title="main.graphql" showLineNumbers
schema
  @link(src: "./users.graphql")
  @link(src: "./products.graphql") {
  query: Query
}
```

## Merging Algorithm

The merging process in the current configuration design is intricate due to its implementation of three different algorithms, each tailored to handle specific aspects of the configurations.

### Deep Merge Right for Runtime Configurations

For **runtime configurations**, the merge algorithm performs a **deep merge right**, also known as a recursive merge. This process involves merging multiple configuration objects by traversing each level of their nested structures. Here's how it works:

- **Recursive Traversal**: The algorithm starts at the top level of the configuration objects and recursively moves through each nested level.
- **Right-Biased Overwriting**: When the same key or property exists in both configurations being merged, the value from the configuration on the **right** (the latter one in the sequence) overwrites the one on the left.
- **Combining Nested Objects**: If the property is itself an object or array, the algorithm continues to merge the nested elements deeply.

This approach allows developers to override specific settings in a controlled manner.

### Covariant Merging for Output Types in Schema Configurations

In **schema configurations**, the merging process differs based on whether the types are inputs or outputs. For **output types**—such as GraphQL object types returned by queries—the merge algorithm is **covariant**.

- **Covariant Merging**: Covariance, in type theory, allows a type to be replaced with its subtype. In the context of merging, covariant merging means combining all the fields from the output types with the same name across different configurations.
- **Field Union**: The resulting merged output type includes the union of all fields from each configuration.

### Contravariant Merging for Input Types in Schema Configurations

For **input types**—such as input objects used in mutations—the algorithm employs **contravariant** merging.

- **Contravariant Merging**: Contravariance allows a type to be substituted with its supertype. When merging input types, contravariant merging takes the intersection of fields from types with the same name.
- **Field Intersection**: The merged input type contains only the fields that are common to all configurations.

## Issues with the Current Design

The existing design suffers from several key issues:

1. **Unintuitive Merge Algorithm:** The complexity of the merge algorithm makes it difficult to predict the final configuration outcome. Runtime configurations are sometimes unintentionally overridden during the merge process. For example, if two linked configurations define different ports, the final port becomes unpredictable and might default to an undesirable setting.
2. **Confusing Relative Paths:** Linking via relative file paths or URLs introduces ambiguity. It's often unclear whether a relative path is relative to the current directory, the current file, or some other location.
3. **Unused Formats:** The `.json` and `.yml` options for writing configurations are rarely used in practice, adding unnecessary complexity to the system.
4. **Unstructured Linking Data:** Linking external resources requires handling unstructured data, leading to further complications. For example, JWTKS linking requires caching mechanisms, Protobuf files require path specifications, and supporting multiple JavaScript files introduces its own set of challenges.
5. **Inconsistency Between Local and Merged Configurations:** A configuration that works perfectly in isolation might break after being merged, making debugging and testing a significant challenge.
6. **Inflexible Merge Strategy:** The fixed deep merge right algorithm limits users who need different merging approaches like deep merge left or shallow merge.
7. **Fighting GraphQL Grammar:** In the `main.graphql` you will observe that a directive is applied to `schema` and a field `query` is defined. The `query` field is required because without it the schema will be invalid. This is a limitation of the GraphQL grammar and affects the overall design of the configuration.

## Proposed Configuration Design

The proposed design simplifies the configuration system by separating concerns and streamlining the merging process:

1. **Split Configuration:** Configurations are split into two distinct types: **Runtime** and **Schema**. This deprecates the use of `@upstream`, `@server`, `@telemetry` and `@link` directives within schema configurations.
2. **Runtime Configuration:** Contains only runtime information like **upstream** settings, **server** settings, **telemetry** and **links** to other resources. This is written exclusively in `.json` or `.yml` format.
3. **Schema Configuration:** Contains only schema information such as **types**, and resolvers. This is written exclusively in `.graphql` format.
4. **Simplified Merging:** Merging is only allowed for schema configurations and follows a straightforward covariant and contravariant algorithm like before.
5. **Streamlined Linking:** Linking is only possible within the runtime configuration. A single runtime configuration can link to multiple resources, including multiple schema configurations.
6. **Single Runtime Configuration:** Only one runtime configuration is permitted, eliminating potential conflicts and simplifying management.

The new folder structure with linked configurations would look as follows:

```bash title="New Folder Structure"
├── .tailcallrc.graphql
├── .tailcallrc.schema.json
├── main.yml
├── users.graphql
└── products.graphql
```

In the above example, `main.yml` links to `users.graphql` and `products.graphql` using the `@link` directive. The merge algorithm combines these linked configurations into a single effective configuration.

```yml title="main.yml" showLineNumbers
server:
  port: 8000
configs:
  - src: "./users.graphql"
  - src: "./products.graphql"
```

This would clearly separate the runtime and schema configurations, making it easier to manage and predict the final configuration outcome. The tailcall command would work like before, but with a more predictable outcome.

```bash title="Command"
tailcall start ./main.yml
```

However, like before starting with a `.graphql` file would still be possible.

```bash title="Command"
tailcall start ./users.graphql
```

## Migration Strategy

The proposed changes are designed to simplify the configuration process, and the migration should be relatively straightforward for most users. Existing configurations can be readily split into separate runtime and schema files. The clear separation of concerns and the simplified merging process will make future configuration management more predictable and less error-prone. Tools and documentation will be provided to further facilitate a smooth transition to the new design.

Would love to hear about your thoughts on this proposed design. Feel free to reach out to me on the usual channels!
