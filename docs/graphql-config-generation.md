---
title: GraphQL Configuration Generation with Tailcall
description: Migrate to GraphQL with Tailcall within minutes
slug: graphql-configuration-generation-with-tailcall
sidebar_label: GraphQL Config Generation
---

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

# GraphQL Configuration Generation with Tailcall

## What is Configuration Generation?

Configuration generation is the process of automatically generating graphQL configurations from the various sources such as **REST Endpoints**, **Proto files** and already existing **GraphQL configuration** files.

### Problems It Solves

1. **Consistency**: Ensures all configurations are standardized across environments.
2. **Efficiency**: Reduces the time and effort required to generate the configuration.
3. **Error Reduction**: Minimizes human errors in writing graphql configuration by hand.

### Why is it Hard to Write GraphQL Schemas by Hand?

Writing GraphQL schemas manually is challenging due to:

- **Complex API Responses**: APIs often return large and complex responses, making it tedious to map these to GraphQL types.
- **Data Consistency**: Handling APIs where some items might have missing properties requires meticulous examination to determine correct types and fields.
- **Migration Efforts**: Migrating existing APIs to GraphQL involves substantial manual work to create corresponding GraphQL schemas.

## Input Sources

Our system supports generating configurations from various input sources, including:

- **Proto Files**: Protocol buffer files defining the data structure.
- **URLs**: Direct API endpoints.
- **Existing Configurations**: Pre-existing configuration files.

## Features

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
        -  We've set `mergeType` to `1.0`, which basically tells config generator to merge any two GraphQL types that are exactly similar.

        if you're interested in understanding preset's in detail head over to this section. 
        **TODO: Add Linkage to Preset Detail Section**

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

2. **GET Request with Headers**

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
        - We've set `mergeType` to `1.0`, which basically tells config generator to merge any two GraphQL types that are exactly similar.

        if you're interested in understanding preset's in detail head over to this section. 
        **TODO: Add Linkage to Preset Detail Section**

    **Output**: Specifies where and in what format the output data should be saved.
        - **path**: Defines the output file path (in above example, it's `./jsonplaceholder.graphql`).
        - **format**: Specifies the output format as GraphQL (in above example, it's `graphQL`).

    **Schema**: Specifies the name of the Query operation type, which is `Query` in this example.

 ```graphql showLineNumbers title="Generated GraphQL Configuration"
    schema @server @upstream(baseURL: "https://jsonplaceholder.typicode.com") {
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

### Effortless Proto Integration:
### Hybrid Integration (REST + Proto):
## Advanced Features:
## Recommended Configuration Parameters
## FAQ