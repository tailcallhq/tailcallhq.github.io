---
title: GraphQL Configuration Generation with Tailcall
description: Migrate REST or Protobuff to GraphQL within minutes
slug: graphql-configuration-generation-with-tailcall
sidebar_label: GraphQL Config Generation
---

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

# GraphQL Configuration Generation with Tailcall

## What is Configuration Generation?

Configuration generation is the process of automatically generating graphQL configurations from the various sources such as **REST Endpoints**, **Proto files** and already existing **GraphQL configuration** files.

### Problems It Solves

Configuration generation with Tailcall addresses several critical challenges in creating and maintaining GraphQL configurations, ensuring streamlined and error-free processes.

1. **Consistency**: By automatically generating schemas, types etc. Tailcall maintains a consistent structure, making it easier to manage and understand the API.
2. **Efficiency**:
   - **Time Savings**: Significantly reduces the time required to generate and update GraphQL configurations by automating the process, allowing developers to focus on core functionalities.
   - **Quick Migration**: Enables rapid migration from REST or Protbuff to GraphQL, transforming complex API structures into GraphQL schemas within minutes.
3. **Error Reduction**:
   - **Minimized Human Errors**: Automates the tedious and error-prone task of manually writing GraphQL configurations, ensuring accuracy and reducing the risk of mistakes.
   - **Accurate Type Mapping**: Automatically maps API responses to GraphQL types, ensuring correct and precise type definitions without manual intervention.

By addressing these challenges, Tailcall enhances the development workflow, making the process of creating and managing GraphQL configurations more reliable, efficient, and error-free.

### Why is it Hard to Write GraphQL Schemas by Hand?

Writing GraphQL schemas manually presents several challenges that can complicate and slow down the development process:

1. **Complex API Responses**:
   - **Large and Detailed Responses**: APIs often return extensive and intricate data, making it laborious to map these responses accurately to GraphQL types.
   - **Nested Structures**: Dealing with deeply nested JSON objects requires careful handling to ensure all relationships and data hierarchies are correctly represented in the schema.
2. **Data Consistency**:
   - **Missing Properties**: APIs can have inconsistent data where some items might lack certain properties, necessitating meticulous examination to define accurate types and optional fields.
   - **Dynamic Data**: Handling APIs with dynamic data fields adds another layer of complexity, requiring flexible and robust schema definitions to accommodate various data shapes.
3. **Migration Efforts**:
   - **Manual Workload**: Converting existing REST APIs or Protocol Buffers to GraphQL involves substantial manual effort, as each endpoint must be individually mapped to corresponding GraphQL types and queries.
   - **Error-Prone Process**: The manual creation of schemas increases the likelihood of errors, leading to potential issues in data fetching and integration.

These challenges highlight the need for automated tools, which streamline the process of generating GraphQL schemas, ensuring accuracy and efficiency while reducing the manual workload and error potential.

## Input Sources

Our system supports generating configurations from various input sources, including:

- **Proto Files**: By specifying a proto file path, Tailcall can parse the file and generate corresponding GraphQL types and queries, enabling seamless migration from Protocol Buffers to GraphQL within minutes.
  <Tabs>
  <TabItem value="json" label="JSON">
  ```json showLineNumbers
      "proto": {
          "src": "./news.proto"
      }
  ```
    </TabItem>
    <TabItem value="yml" label="YML">
    ```yml showLineNumbers
    proto:
        src: "./news.proto"
    ```
    </TabItem>
    </Tabs>
- **URLs**: By specifying a URL, Tailcall can fetch the API response and generate corresponding GraphQL types and queries, allowing migration from REST to GraphQL within minutes.
  <Tabs>
  <TabItem value="json" label="JSON">
  ```json showLineNumbers
  "curl": {
      "src": "https://jsonplaceholder.typicode.com/posts",
      "fieldName": "posts"
  }
  ```
    </TabItem>
    <TabItem value="yml" label="YML">
    ```yml showLineNumbers
    curl:
        src: "https://jsonplaceholder.typicode.com/posts"
        fieldName: "posts"
    ```
    </TabItem>
    </Tabs>

## Features

<hr/>

### Effortless REST Integration:

Tailcall simplifies GraphQL schema generation from REST APIs, supporting various request types and scenarios. Let's understand this through various examples.

1.  **Simple GET Request:** In the following example, we demonstrate how to generate a GraphQL schema from `https://jsonplaceholder.typicode.com/posts` endpoint.

    This configuration allows Tailcall to fetch data from the specified endpoint, generate a GraphQL schema and save it to output path provided in configuration.

    <Tabs>
    <TabItem value="json" label="JSON Config Format">
    ```json showLineNumbers
    {
        "inputs": [
            {
                "curl": {
                    "src": "https://jsonplaceholder.typicode.com/posts",
                    "fieldName": "posts",
                }
            }
        ],
        "preset": {
            "mergeType": 1.0,
        },
        "output": {
            "path": "./jsonplaceholder.graphql",
            "format": "graphQL"
        },
        "schema": {
            "query": "Query"
        },
    }
    ```
    </TabItem>
     <TabItem value="yml" label="YML Config Format">
    ```yml showLineNumbers
    inputs:
        - curl:
            src: "https://jsonplaceholder.typicode.com/posts"
            fieldName: "posts"
    preset:
        mergeType: 1.0
    output:
        path: "./jsonplaceholder.graphql"
        format: "graphQL"
    schema:
        query: "Query"
    ```
    </TabItem>
    </Tabs>

    Let's understand the above configuration file.

    **Input**: Defines the API endpoints that the configuration interacts with. Each input specifies:

    - **src**: Specifies the endpoint URL (`https://jsonplaceholder.typicode.com/posts`) in this example.
    - **fieldName**: A unique name that should be used as the field name, which is then used in the operation type. In the example above, it's set to `posts`.

      :::important

      Ensure that each **field name** is unique across the entire configuration to prevent overwriting previous definitions.

      :::

    **Preset**: We've applied only one tuning parameter for the configuration. let's understand it in short.

    - We've set [mergeType](graphql-config-generation.md#mergetype) to `1.0`, which basically tells config generator to merge any two GraphQL types that are exactly similar.

      if you're interested in understanding preset's in detail head over to [preset](graphql-config-generation.md#understanding-presets) section.

    **Output**: Specifies where and in what format the output data should be saved.

    - **path**: Defines the output file path (in above example, it's `./jsonplaceholder.graphql`).
    - **format**: Specifies the output format as GraphQL (in above example, it's `graphQL`).

    **Schema**: Specifies the name of the Query operation type, which is `Query` in this example.

    ```graphql showLineNumbers title="Generated GraphQL Configuration"
    schema
      @server
      @upstream(
        baseURL: "https://jsonplaceholder.typicode.com"
      ) {
      query: Query
    }

    type Post {
      body: String
      id: Int
      title: String
      userId: Int
    }

    type Query {
      posts: [Post] @http(path: "/posts")
    }
    ```

    <hr />

2.  **GET Request with Headers**

    In the following example, we demonstrate how to generate a GraphQL schema from `https://jsonplaceholder.typicode.com/posts/1` endpoint which requires some headers in order to produce the response.

    This configuration allows Tailcall to fetch data from the specified endpoint with provided headers, generate a GraphQL schema and save it to output path provided in configuration.

    <Tabs>
    <TabItem value="json" label="JSON Config Format">
    ```json showLineNumbers
    {
        "inputs": [
            {
                "curl": {
                    "src": "https://jsonplaceholder.typicode.com/posts/1",
                    "fieldName": "post",
                    "headers": {
                        "Accept": "application/json",
                        "secretToken": "{{.env.TOKEN}}"
                    }
                }
            } 
        ],
        "preset": {
            "mergeType": 1.0
        },
        "output": {
            "path": "./jsonplaceholder.graphql",
            "format": "graphQL"
        },
        "schema": {
            "query": "Query"
        }
    }
    ```
    </TabItem>
    <TabItem value="yml" label="YML Config Format">
        ```yml showLineNumbers
        inputs:
            - curl:
                src: "https://jsonplaceholder.typicode.com/posts/1"
                fieldName: "post"
                headers:
                    Accept: "application/json"
                    secretToken: "{{.env.TOKEN}}"
        preset:
            mergeType: 1.0
        output:
            path: "./jsonplaceholder.graphql"
            format: "graphQL"
        schema:
            query: "Query"
        ```
    </TabItem>
    </Tabs>

    Let's understand the above configuration file.

    **Input**: Defines the API endpoints that the configuration interacts with. Each input specifies:

    - **src**: Specifies the endpoint URL (https://jsonplaceholder.typicode.com/posts/1 in this example).
    - **fieldName**: Assigns a descriptive name (`post` in this case) to uniquely identify the retrieved data.
    - **headers**: Optional section for specifying HTTP headers required for the API request.
      :::tip
      Never store sensitive information like access tokens directly in configuration files. Leverage templates to securely reference secrets from environment variables.
      :::

    **Preset**: We've applied only one tuning parameter for the configuration. let's understand it in short.

    - We've set [mergeType](graphql-config-generation.md#mergetype) to `1.0`, which basically tells config generator to merge any two GraphQL types that are exactly similar.

      if you're interested in understanding preset's in detail head over to [preset](graphql-config-generation.md#understanding-presets) section.

    **Output**: Specifies where and in what format the output data should be saved.

    - **path**: Defines the output file path (in above example, it's `./jsonplaceholder.graphql`).
    - **format**: Specifies the output format as GraphQL (in above example, it's `graphQL`).

    **Schema**: Specifies the name of the Query operation type, which is `Query` in this example.

```graphql showLineNumbers title="Generated GraphQL Configuration"
schema
  @server
  @upstream(
    baseURL: "https://jsonplaceholder.typicode.com"
  ) {
  query: Query
}

type Post {
  body: String
  id: Int
  title: String
  userId: Int
}

type Query {
  post(p1: Int!): Post @http(path: "/posts/{{.args.p1}}")
}
```

### Effortless Proto Integration

### Hybrid Integration (REST + Proto)

## Advanced Features

<hr/>

### Understanding Presets

This entire section is optional and we use best defaults to generate the configuration but you can override these parameter through preset section present in configuration like shown in following.
if you feel generated GraphQL configuration is good enough then feel free to skip this section.

The config generator provides a set of tuning parameters that can make the generated configurations more readable by reducing duplication and making configuration more readable. This can be configured using the `preset` section present in configuration.

<Tabs>
<TabItem value="json" label="JSON">
```json showLineNumbers
   "preset": {
    "mergeType": 0.8,
    "consolidateURL": 0.8
  }
```
</TabItem>
<TabItem value="yml" label="YML">
```yml showLineNumbers
   preset:
    mergeType: 0.8
    consolidateURL: 0.8
```
</TabItem>
</Tabs>

Let's understand how each of the parameter works.

- #### mergeType:

  This setting merges types in the configuration that satisfy the threshold criteria. It takes a threshold value between `0.0` and `1.0` to determine if two types should be merged or not. The default is `1.0`. MergeType also supports union types as well as interface types but merging of these types will happen only when they match exactly.

        **Example 1**: following types `T1` and `T2` are exactly similar, and with a threshold value of `1.0`, they can be merged into a single type called `M1`:

        ```graphql {14} showLineNumbers title="Merging type T1 and T2 into M1"
        # BEFORE
        type T1 {
            id: ID
            firstName: String
            lastName: String
        }

        type T2 {
            id: ID
            firstName: String
            lastName: String
        }

        # AFTER: T1 and T2 are merged into M1.
        type M1 {
            id: ID
            firstName: String
            lastName: String
        }
        ```

        **Example 2**: following types `T1` and `T2` are similar with a threshold value of `0.5`, they can be merged into a single type called `M1`:

        ```graphql {14} showLineNumbers title="Merging type T1 and T2 into M1"
        # BEFORE
        type T1 {
            id: ID
            firstName: String
            age: Int
        }

        type T2 {
            id: ID
            firstName: String
            lastName: String
        }

        # AFTER: T1 and T2 are merged into M1.
        type M1 {
            id: ID
            firstName: String
            lastName: String
            age: Int
        }
        ```

        **Example 3**: following types `T1` and `T2` are similar with a threshold value of `0.5` but we can't merge them as they have same field name but different types:

        ```graphql {5,11} showLineNumbers title="Can't Merge type T1 and T2 as they've same field name but different type"
        # BEFORE
        type T1 {
            id: ID
            firstName: String
            age: Int
        }

        type T2 {
            id: ID
            firstName: String
            age: Float
        }
        ```

        **Example 4**: following types `Foo` and `Bar` will be merged into type `M1` as they match exactly and same change will reflected in union type `FooBar`.

        ```graphql {24} showLineNumbers title="Merging type Foo and Bar into M1"
        # BEFORE
        type Foo {
            id: ID
            firstName: String
            age: Int
        }

        type Bar {
            id: ID
            firstName: String
            age: Int
        }

        union FooBar = Foo | Bar

        # After merging

        type M1 {
            id: ID
            firstName: String
            age: Int
        }

        union FooBar = M1
        ```

        **Example 5**: following types `Foo` and `Bar` won't be merged into type `M1` as they don't match exactly.

        ```graphql showLineNumbers title="Can't Merge type T1 and T2 as they've same field name but different type"
        # BEFORE
        type Foo {
            id: ID
            firstName: String
            age: Int
        }

        type Bar {
            id: ID
            firstName: String
            age: Int
        }

        union FooBar = Foo | Bar
        ```

        <hr/>

- #### consolidateURL:

  The setting identifies the most common base URL among multiple REST endpoints and uses this URL in the [upstream](directives.md#upstream-directive) directive. It takes a threshold value between 0.0 and 1.0 to determine the most common endpoint. The default is `0.5`.

  For example, if the `Query` type has three base URLs, using the `consolidateURL` setting with a `0.5` threshold will pick the base URL that is used in more than 50% of the [http](directives.md#http-directive) directives, `http://jsonplaceholder.typicode.com`, and add it to the upstream, cleaning the base URLs from the `Query` type.

  ```graphql showLineNumbers
  schema
    @server(hostname: "0.0.0.0", port: 8000)
    @upstream(httpCache: 42) {
    query: Query
  }

  type Query {
    post(id: Int!): Post
      @http(
        baseURL: "http://jsonplaceholder.typicode.com"
        path: "/posts/{{.args.id}}"
      )
    posts: [Post]
      @http(
        baseURL: "http://jsonplaceholder.typicode.com"
        path: "/posts"
      )
    user(id: Int!): User
      @http(
        baseURL: "http://jsonplaceholder.typicode.com"
        path: "/users/{{.args.id}}"
      )
    users: [User]
      @http(
        baseURL: "http://jsonplaceholder-1.typicode.com"
        path: "/users"
      )
  }
  ```

  After enabling the `consolidateURL` setting:

  ```graphql showLineNumbers
  schema
    @server(hostname: "0.0.0.0", port: 8000)
    @upstream(
      baseURL: "http://jsonplaceholder.typicode.com"
      httpCache: 42
    ) {
    query: Query
  }

  type Query {
    post(id: Int!): Post @http(path: "/posts/{{.args.id}}")
    posts: [Post] @http(path: "/posts")
    user(id: Int!): User @http(path: "/users/{{.args.id}}")
    users: [User]
      @http(
        baseURL: "http://jsonplaceholder-1.typicode.com"
        path: "/users"
      )
  }
  ```

## Recommended Configuration Parameters

When setting up your configuration file for GraphQL generation with Tailcall, consider these key parameters to optimize and customize your setup:

1. **[Merge Type](graphql-config-generation.md#mergetype)**:
Controls the merging of similar GraphQL types to reduce duplication. Adjust the threshold (0.0 to 1.0) based on how strictly you want types to match for merging.
the closer the number to 1.0, you get the best type inference in graphQL playground. Recommended threshold is anything above `0.9`.

   <Tabs>
   <TabItem value="json" label="JSON">
   ```json showLineNumbers
   "preset": {
       "mergeType": 0.9,
   }
   ```
   </TabItem>
   <TabItem value="yml" label="YML">
   ```yml showLineNumbers
   preset:
       mergeType: 0.9
   ```
   </TabItem>
   </Tabs>

2. **[Consolidate URL](graphql-config-generation.md#consolidateurl)**: Identifies the most common base URL among multiple REST endpoints and uses it in the [@upstream](directives.md#upstream-directive) directive. Set a threshold (0.0 to 1.0) to determine when to consolidate URLs. Recommended threshold is anything above `0.5`.
   <Tabs>
   <TabItem value="json" label="JSON">
   ```json showLineNumbers
   "preset": {
       "consolidateURL": 0.5
   }
   ```
   </TabItem>
   <TabItem value="yml" label="YML">
   ```yml showLineNumbers
   preset:
       consolidateURL: 0.5
   ```
   </TabItem>
   </Tabs>
3. **Headers**: Never store sensitive information like access tokens directly in configuration files. Leverage templates to securely reference secrets from environment variables.
   <Tabs>
   <TabItem value="json" label="JSON">
   ```json showLineNumbers
   "headers": {
       "secretToken": "{{.env.TOKEN}}"
   }
   ```
   </TabItem>
   <TabItem value="yml" label="YML">
   ```yml showLineNumbers
   headers:
       secretToken: "{{.env.TOKEN}}"
   ```
   </TabItem>
   </Tabs>

## FAQ
