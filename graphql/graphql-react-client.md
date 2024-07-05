---
title: "GraphQL in React: 5 Best Approaches for Data Fetching"
description: "Apollo Client and Urql provide comprehensive solutions for large-scale applications, while the React Query combinations offer more flexibility."
sidebar_label: "GraphQL with React"
slug: graphql-react-client
---

## Introduction:

React developers often need to fetch data from GraphQL APIs. This comprehensive guide explores five effective methods for querying GraphQL data in React applications, using the SpaceX GraphQL API to demonstrate fetching and displaying data about recent space missions. We'll cover full-featured client libraries to lightweight solutions, providing a detailed comparison table and specific use cases for each method.

[... existing content ...]

## Detailed Comparison Table

Here's a comprehensive comparison table to help choose the right method based on specific needs:

| Method                        | Bundle Size | Learning Curve | Caching Capabilities | Community Support | Additional Features                     |
| ----------------------------- | ----------- | -------------- | -------------------- | ----------------- | --------------------------------------- |
| Apollo Client                 | 30.7 kB     | Moderate       | Extensive            | High              | State management, optimistic UI updates |
| Urql                          | 12.1 kB     | Low            | Moderate             | Moderate          | Extensible architecture                 |
| React Query + GraphQL Request | 12.8 kB     | Low            | Basic                | Growing           | Minimal overhead                        |
| React Query + Axios           | 14.2 kB     | Low            | Basic                | High              | Familiar HTTP handling                  |
| React Query + Fetch API       | 11.5 kB     | Low            | Basic                | Moderate          | Browser-native, minimal setup           |

Note: Bundle sizes are approximate and may vary based on specific configurations and versions.

### Caching Capabilities

Let's dive deeper into the caching mechanisms supported by each GraphQL client:

1. **Apollo Client**:
   - Normalized cache with automatic updates
   - Customizable cache policies
   - Persistence and rehydration
   - Optimistic UI updates

2. **Urql**:
   - Document caching (default)
   - Normalized caching (via optional plugin)
   - Customizable cache updates
   - Offline support

3. **React Query + GraphQL Request**:
   - Time-based caching
   - Stale-while-revalidate strategy
   - Manual cache updates

4. **React Query + Axios**:
   - Time-based caching
   - Stale-while-revalidate strategy
   - Manual cache updates

5. **React Query + Fetch API**:
   - Time-based caching
   - Stale-while-revalidate strategy
   - Manual cache updates

## Error Handling

Proper error handling is crucial for creating robust GraphQL applications. Here's how to handle errors with each client:

### 1. Apollo Client

Apollo Client provides detailed error information through the `error` property returned by the `useQuery` hook.

```jsx
import { useQuery, gql } from '@apollo/client';

const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

function SpaceXLaunches() {
  const { data, loading, error } = useQuery(LAUNCHES_QUERY);

  if (loading) return "Loading...";
  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>Message: {error.message}</p>
        {error.graphQLErrors.map(({ message }, i) => (
          <p key={i}>GraphQL error: {message}</p>
        ))}
        {error.networkError && <p>Network error: {error.networkError.message}</p>}
      </div>
    );
  }

  // Render data...
}
```

### 2. Urql

Urql provides error information through the `error` property in the result object.

```jsx
import { useQuery } from 'urql';

const LAUNCHES_QUERY = `
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

function SpaceXLaunches() {
  const [result] = useQuery({ query: LAUNCHES_QUERY });
  const { data, fetching, error } = result;

  if (fetching) return "Loading...";
  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>Message: {error.message}</p>
        {error.graphQLErrors.map(({ message }, i) => (
          <p key={i}>GraphQL error: {message}</p>
        ))}
        {error.networkError && <p>Network error: {error.networkError.message}</p>}
      </div>
    );
  }

  // Render data...
}
```

### 3. React Query + GraphQL Request

With this combination, you can handle errors by checking the `error` property returned by the `useQuery` hook.

```jsx
import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';

const endpoint = 'https://api.spacex.land/graphql/';
const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

function SpaceXLaunches() {
  const { data, isLoading, error } = useQuery('launches', () =>
    request(endpoint, LAUNCHES_QUERY)
  );

  if (isLoading) return "Loading...";
  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>Message: {error.message}</p>
        {error.response?.errors?.map(({ message }, i) => (
          <p key={i}>GraphQL error: {message}</p>
        ))}
      </div>
    );
  }

  // Render data...
}
```

### 4. React Query + Axios

Error handling with Axios is similar to the GraphQL Request approach, but you'll need to extract the GraphQL errors from the Axios error object.

```jsx
import { useQuery } from 'react-query';
import axios from 'axios';

const endpoint = 'https://api.spacex.land/graphql/';
const LAUNCHES_QUERY = `
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

function SpaceXLaunches() {
  const { data, isLoading, error } = useQuery('launches', () =>
    axios.post(endpoint, { query: LAUNCHES_QUERY })
      .then(response => response.data.data)
  );

  if (isLoading) return "Loading...";
  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>Message: {error.message}</p>
        {error.response?.data?.errors?.map(({ message }, i) => (
          <p key={i}>GraphQL error: {message}</p>
        ))}
      </div>
    );
  }

  // Render data...
}
```

### 5. React Query + Fetch API

Error handling with the Fetch API requires manual parsing of the response to extract GraphQL errors.

```jsx
import { useQuery } from 'react-query';

const endpoint = 'https://api.spacex.land/graphql/';
const LAUNCHES_QUERY = `
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

function SpaceXLaunches() {
  const { data, isLoading, error } = useQuery('launches', () =>
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: LAUNCHES_QUERY })
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(result => {
        if (result.errors) throw result.errors;
        return result.data;
      })
  );

  if (isLoading) return "Loading...";
  if (error) {
    return (
      <div>
        <h2>Error</h2>
        {Array.isArray(error) ? (
          error.map(({ message }, i) => <p key={i}>GraphQL error: {message}</p>)
        ) : (
          <p>Error: {error.message}</p>
        )}
      </div>
    );
  }

  // Render data...
}
```

## Common Issues and Resolutions

When working with GraphQL clients in React, developers may encounter several common issues. Here are some problems you might face and their solutions:

1. **Caching Issues**:
   - Problem: Stale data being displayed after updates.
   - Solution: 
     - For Apollo Client: Use the `refetchQueries` option in mutations or the `refetch` function from `useQuery`.
     - For Urql: Use the `cache-and-network` request policy or manually update the cache.
     - For React Query: Use the `invalidateQueries` function to mark queries as stale.

2. **Network Errors**:
   - Problem: Unable to connect to the GraphQL server.
   - Solution: Implement proper error handling as shown in the Error Handling section. Consider adding retry logic and offline support.

3. **Performance Issues with Large Queries**:
   - Problem: Slow loading times due to overfetching data.
   - Solution: Use pagination, implement lazy loading, or split large queries into smaller ones.

4. **Type Mismatch Errors**:
   - Problem: Unexpected data types causing runtime errors.
   - Solution: Use TypeScript with codegen tools like GraphQL Code Generator to ensure type safety.

5. **Authorization Issues**:
   - Problem: Unauthorized access to protected queries or mutations.
   - Solution: Properly configure the GraphQL client to include authentication tokens in requests. For Apollo Client, use the `setContext` function to add headers.

6. **Optimistic UI Updates**:
   - Problem: UI not updating immediately after mutations.
   - Solution: Implement optimistic updates. Apollo Client has built-in support for this, while for other clients, you may need to manually update the cache or local state.

7. **Server-Side Rendering (SSR) Issues**:
   - Problem: Hydration errors or mismatched content between server and client.
   - Solution: Ensure proper SSR setup for your chosen GraphQL client. Apollo Client and Urql have specific SSR configurations.

By being aware of these common issues and their solutions, developers can create more robust and efficient GraphQL-powered React applications.

