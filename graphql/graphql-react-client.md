---
title: "GraphQL in React: 5 Best Approaches for Data Fetching."
description: "Apollo Client and Urql provide comprehensive solutions for large-scale applications, while the React Query combinations offer more flexibility."
sidebar_label: "GraphQL with React"
slug: graphql-react-client
---

## Introduction:

React developers often need to fetch data from GraphQL APIs. This comprehensive guide explores five effective methods for querying GraphQL data in React applications, using the SpaceX GraphQL API to demonstrate fetching and displaying data about recent space missions. We'll cover full-featured client libraries to lightweight solutions, providing a detailed comparison table and specific use cases for each method.

### 1. Apollo Client: The Comprehensive Solution

Apollo Client is the most feature-rich GraphQL library for React, widely adopted for its robust data fetching, built-in caching, and integrated state management.

#### Getting started with Apollo Client:

1. **Install dependencies**:
   ```bash
   npm install @apollo/client graphql
   ```
2. **Set up the Apollo Provider and client**:

   ```jsx
   import {
     ApolloProvider,
     ApolloClient,
     InMemoryCache,
   } from "@apollo/client"

   const client = new ApolloClient({
     uri: "https://api.spacex.land/graphql/",
     cache: new InMemoryCache(),
   })

   ReactDOM.render(
     <ApolloProvider client={client}>
       <App />
     </ApolloProvider>,
     rootElement,
   )
   ```

3. **Use the `useQuery` hook to fetch data**:

   ```jsx
   import {useQuery, gql} from "@apollo/client"

   const LAUNCHES_QUERY = gql`
     {
       launchesPast(limit: 10) {
         id
         mission_name
       }
     }
   `

   function SpaceXLaunches() {
     const {data, loading, error} = useQuery(LAUNCHES_QUERY)

     if (loading) return "Loading..."
     if (error) return <pre>{error.message}</pre>

     return (
       <ul>
         {data.launchesPast.map((launch) => (
           <li key={launch.id}>{launch.mission_name}</li>
         ))}
       </ul>
     )
   }
   ```

### 2. Urql: The Lightweight Contender

Urql provides a streamlined alternative to Apollo, with a smaller bundle size, simpler setup process, and optional caching.

#### To use Urql:

1. **Install dependencies**:
   ```bash
   npm install urql graphql
   ```
2. **Set up the Urql Provider and client**:

   ```jsx
   import {createClient, Provider} from "urql"

   const client = createClient({
     url: "https://api.spacex.land/graphql/",
   })

   ReactDOM.render(
     <Provider value={client}>
       <App />
     </Provider>,
     rootElement,
   )
   ```

3. **Implement data fetching with the `useQuery` hook**:

   ```jsx
   import {useQuery} from "urql"

   const LAUNCHES_QUERY = `
     {
       launchesPast(limit: 10) {
         id
         mission_name
       }
     }
   `

   function SpaceXLaunches() {
     const [result] = useQuery({query: LAUNCHES_QUERY})
     const {data, fetching, error} = result

     if (fetching) return "Loading..."
     if (error) return <pre>{error.message}</pre>

     return (
       <ul>
         {data.launchesPast.map((launch) => (
           <li key={launch.id}>{launch.mission_name}</li>
         ))}
       </ul>
     )
   }
   ```

### 3. React Query + GraphQL Request: The Flexible Duo

This combination pairs a lightweight GraphQL client with a powerful data-fetching library.

1. **Install dependencies**:
   ```bash
   npm install react-query graphql-request
   ```
2. **Set up React Query's QueryClientProvider**:

   ```jsx
   import {
     QueryClient,
     QueryClientProvider,
   } from "react-query"

   const queryClient = new QueryClient()

   ReactDOM.render(
     <QueryClientProvider client={queryClient}>
       <App />
     </QueryClientProvider>,
     rootElement,
   )
   ```

3. **Implement data fetching**:

   ```jsx
   import {request, gql} from "graphql-request"
   import {useQuery} from "react-query"

   const endpoint = "https://api.spacex.land/graphql/"
   const LAUNCHES_QUERY = gql`
     {
       launchesPast(limit: 10) {
         id
         mission_name
       }
     }
   `

   function SpaceXLaunches() {
     const {data, isLoading, error} = useQuery(
       "launches",
       () => request(endpoint, LAUNCHES_QUERY),
     )

     if (isLoading) return "Loading..."
     if (error) return <pre>{error.message}</pre>

     return (
       <ul>
         {data.launchesPast.map((launch) => (
           <li key={launch.id}>{launch.mission_name}</li>
         ))}
       </ul>
     )
   }
   ```

### 4. React Query + Axios: Leveraging a Popular HTTP Client

Combines React Query with Axios for familiar HTTP handling.

1. **Install dependencies**:
   ```bash
   npm install react-query axios
   ```
2. **Implement data fetching**:

   ```jsx
   import axios from "axios"
   import {useQuery} from "react-query"

   const endpoint = "https://api.spacex.land/graphql/"
   const LAUNCHES_QUERY = `
     {
       launchesPast(limit: 10) {
         id
         mission_name
       }
     }
   `

   function SpaceXLaunches() {
     const {data, isLoading, error} = useQuery(
       "launches",
       () =>
         axios
           .post(endpoint, {query: LAUNCHES_QUERY})
           .then((response) => response.data.data),
     )

     if (isLoading) return "Loading..."
     if (error) return <pre>{error.message}</pre>

     return (
       <ul>
         {data.launchesPast.map((launch) => (
           <li key={launch.id}>{launch.mission_name}</li>
         ))}
       </ul>
     )
   }
   ```

### 5. React Query + Fetch API: The Minimalist Approach

Utilizes the browser's Fetch API with React Query for a minimalistic approach.

1. **Install React Query**:
   ```bash
   npm install react-query
   ```
2. **Implement data fetching**:

   ```jsx
   import { useQuery } from "react-query";

   const endpoint = "https://api.spacex.land/graphql/";
   const LAUNCHES_QUERY = `
     {
       launchesPast(limit: 10) {
         id
         mission_name
       }
     }
   `;

   function SpaceXLaunches() {
     the { data, isLoading, error } = useQuery("launches", () =>
       fetch(endpoint, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ query: LAUNCHES_QUERY })
       })
         .then(response => {
           if (!response.ok) throw new Error("Network response was not ok");
           return response.json();
         })
         .then(result => result.data)
     );

     if (isLoading) return "Loading...";
     if (error) return <pre>{error.message}</pre>;

     return (
       <ul>
         {data.launchesPast.map((launch) => (
           <li key={launch.id}>{launch.mission_name}</li>
         ))}
       </ul>
     );
   }
   ```

## Detailed Comparison Table

Here’s a comparison table to help choose the right method based on specific needs:

| Method                        | Bundle Size | Learning Curve | Caching Capabilities | Community Support | Additional Features                     |
| ----------------------------- | ----------- | -------------- | -------------------- | ----------------- | --------------------------------------- |
| Apollo Client                 | \_          | Moderate       | Extensive            | High              | State management, optimistic UI updates |
| Urql                          | \_          | Low            | Moderate             | Moderate          | Extensible architecture                 |
| React Query + GraphQL Request | \_          | Low            | \_                   | Growing           | Minimal overhead                        |
| React Query + Axios           | \_          | Low            | \_                   | High              | Familiar HTTP handling                  |
| React Query + Fetch API       | \_          | Low            | \_                   | Moderate          | Browser-native, minimal setup           |

### Use Cases for Each Method

- **Apollo Client**: Best for large-scale applications needing complex state management and data synchronization.
- **Urql**: Suitable for medium-sized projects where simplicity and performance are prioritized.
- **React Query + GraphQL Request**: Ideal for projects requiring high flexibility with minimal GraphQL-specific setup.
- **React Query + Axios**: Preferred when developers are already familiar with Axios and need robust HTTP capabilities.
- **React Query + Fetch API**: Optimal for projects that require a minimalistic approach with no additional dependencies.

## Conclusion:

By understanding the distinct features and use cases of each method, developers can select the most appropriate GraphQL fetching technique for their React projects. This guide aims to equip developers with the knowledge to efficiently integrate GraphQL data fetching into their applications, regardless of scale or complexity.
