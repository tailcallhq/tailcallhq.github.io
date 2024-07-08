---
title: "GraphQL in React: 5 Best Approaches for Data Fetching."
description: "Apollo Client and Urql provide comprehensive solutions for large-scale applications, while the React Query combinations offer more flexibility."
sidebar_label: "GraphQL with React"
slug: graphql-react-client
---

## Introduction

React developers often need to fetch data from GraphQL APIs. This comprehensive guide explores five effective methods for querying GraphQL data in React applications, using the SpaceX GraphQL API to demonstrate fetching and displaying data about recent space missions. We'll cover full-featured client libraries to lightweight solutions, providing a detailed comparison table and specific use cases for each method.

### 1. Apollo Client: The Comprehensive Solution

Apollo Client is the most feature-rich GraphQL library for React, widely adopted for its robust data fetching, built-in caching, and integrated state management.

#### Getting started with Apollo Client

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

#### To use Urql

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

| Method                        | Bundle Size (minified + gzip)\* | Learning Curve | Caching Capabilities                    | Community Support | Additional Features                     |
| ----------------------------- | ------------------------------- | -------------- | --------------------------------------- | ----------------- | --------------------------------------- |
| Apollo Client                 | ~47.04 KB                       | Moderate       | Extensive (InMemoryCache, customizable) | High              | State management, optimistic UI updates |
| Urql                          | ~2.18 KB                        | Low            | Moderate (Document caching)             | Moderate          | Extensible architecture                 |
| React Query + GraphQL Request | ~13 KB + ~185.8 KB              | Low            | Basic (Managed by React Query)          | Growing           | Minimal overhead                        |
| React Query + Axios           | ~13 KB + ~13.2 KB               | Low            | Basic (Managed by React Query)          | High              | Familiar HTTP handling                  |
| React Query + Fetch API       | ~13 KB + ~152.4 KB              | Low            | Basic (Managed by React Query)          | Moderate          | Browser-native, minimal setup           |

(*) culled from *bundlephobia.com\*

### Caching Capabilities

1. **Apollo Client**:
   - Normalized caching (stores entities by ID)
   - Automatic cache updates
   - Manual cache manipulation
   - Persistence and rehydration
   - Optimistic updates
2. **Urql**:
   - Document caching (stores full query responses)
   - Customizable caching with exchangers
   - Persistence support
3. **React Query** (applies to all React Query combinations):
   - Time-based caching
   - Stale-while-revalidate strategy
   - Manual cache manipulation
   - Persistence and rehydration

## Error Handling

Proper error handling is crucial for creating robust GraphQL applications. This section provides a detailed discussion on error handling for each client, including code examples for different types of errors and guidance on displaying user-friendly error messages.

### 1. Apollo Client

Apollo Client provides detailed error information through the `error` property returned by the `useQuery` hook. It distinguishes between GraphQL errors and network errors.

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
  if (error) {
    return <ErrorDisplay error={error} />
  }

  // Render data...
}

function ErrorDisplay({error}) {
  // Function to generate a user-friendly error message
  const getUserFriendlyErrorMessage = (error) => {
    if (error.networkError) {
      return "Unable to reach the server. Please check your internet connection and try again."
    }
    if (error.graphQLErrors.length > 0) {
      // You might want to customize this based on specific error codes or messages
      return "There was an issue processing your request. Please try again later."
    }
    return "An unexpected error occurred. Please try again."
  }

  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{getUserFriendlyErrorMessage(error)}</p>
      {process.env.NODE_ENV !== "production" && (
        <details>
          <summary>Technical Details</summary>
          {error.graphQLErrors.map(
            ({message, locations, path}, index) => (
              <div key={index}>
                <p>GraphQL error: {message}</p>
                <p>Location: {JSON.stringify(locations)}</p>
                <p>Path: {JSON.stringify(path)}</p>
              </div>
            ),
          )}
          {error.networkError && (
            <p>
              Network error: {error.networkError.message}
            </p>
          )}
        </details>
      )}
    </div>
  )
}
```

This example demonstrates how to:

- Display a user-friendly error message based on the type of error
- Show technical details only in non-production environments
- Handle both GraphQL and network errors

### 2. Urql

Urql provides error information through the `error` property in the result object.

```tsx
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
  if (error) {
    return <ErrorDisplay error={error} />
  }

  // Render data...
}

function ErrorDisplay({error}) {
  const getUserFriendlyErrorMessage = (error) => {
    if (error.networkError) {
      return "Unable to reach the server. Please check your internet connection and try again."
    }
    if (error.graphQLErrors.length > 0) {
      // Customize based on specific error types if needed
      return "There was an issue processing your request. Please try again later."
    }
    return "An unexpected error occurred. Please try again."
  }

  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{getUserFriendlyErrorMessage(error)}</p>
      {process.env.NODE_ENV !== "production" && (
        <details>
          <summary>Technical Details</summary>
          {error.graphQLErrors.map(
            (graphQLError, index) => (
              <div key={index}>
                <p>GraphQL error: {graphQLError.message}</p>
                {graphQLError.locations && (
                  <p>
                    Location:{" "}
                    {JSON.stringify(graphQLError.locations)}
                  </p>
                )}
                {graphQLError.path && (
                  <p>
                    Path:{" "}
                    {JSON.stringify(graphQLError.path)}
                  </p>
                )}
              </div>
            ),
          )}
          {error.networkError && (
            <p>
              Network error: {error.networkError.message}
            </p>
          )}
        </details>
      )}
    </div>
  )
}
```

### React Query (applies to all React Query examples)

React Query provides error information through the `error` property returned by the `useQuery` hook.

When using React Query with GraphQL Request, you need to handle errors from both libraries. This approach requires more manual error handling but offers fine-grained control.

```tsx
import {useQuery} from "react-query"
import {request, gql} from "graphql-request"

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
    async () => {
      try {
        return await request(endpoint, LAUNCHES_QUERY)
      } catch (error) {
        // GraphQL Request wraps GraphQL errors in a ClientError
        if (error.response) {
          throw new Error(
            JSON.stringify(error.response.errors),
          )
        } else {
          // Network error
          throw new Error(`Network error: ${error.message}`)
        }
      }
    },
  )

  if (isLoading) return "Loading..."
  if (error) {
    return <ErrorDisplay error={error} />
  }

  // Render data...
}

function ErrorDisplay({error}) {
  const getUserFriendlyErrorMessage = (error) => {
    try {
      const parsedError = JSON.parse(error.message)
      if (Array.isArray(parsedError)) {
        // GraphQL errors
        return "There was an issue processing your request. Please try again later."
      }
    } catch {
      // Network error or other non-GraphQL error
      return "Unable to reach the server. Please check your internet connection and try again."
    }
    return "An unexpected error occurred. Please try again."
  }

  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{getUserFriendlyErrorMessage(error)}</p>
      {process.env.NODE_ENV !== "production" && (
        <details>
          <summary>Technical Details</summary>
          <pre>{error.message}</pre>
        </details>
      )}
    </div>
  )
}
```

## Common Issues and Resolutions

### 1. Apollo Client

1. **Issue**: Cache inconsistencies **Resolution**: Use `refetchQueries` option when mutating data or implement cache update functions.
2. **Issue**: Overfeching data **Resolution**: Utilize fragment colocation and implement proper query splitting.

### 2. Urql

1. **Issue**: Stale data after mutations **Resolution**: Use the `cache-and-network` fetch policy or implement manual cache updates.
2. **Issue**: SSR hydration mismatches **Resolution**: Ensure consistent query variables between server and client, or use the `ssrExchange`.

### 3. React Query (all combinations)

1. **Issue**: Stale data displayed briefly before refetch **Resolution**: Adjust `staleTime` and `cacheTime` options to fine-tune caching behavior.
2. **Issue**: Unnecessary refetches on component remount **Resolution**: Implement proper query keys and adjust `refetchOnMount` option.

### Use Cases for Each Method

- **Apollo Client**: Best for large-scale applications needing complex state management and data synchronization.
- **Urql**: Suitable for medium-sized projects where simplicity and performance are prioritized.
- **React Query + GraphQL Request**: Ideal for projects requiring high flexibility with minimal GraphQL-specific setup.
- **React Query + Axios**: Preferred when developers are already familiar with Axios and need robust HTTP capabilities.
- **React Query + Fetch API**: Optimal for projects that require a minimalistic approach with no additional dependencies.

## Conclusion

By understanding the distinct features and use cases of each method, developers can select the most appropriate GraphQL fetching technique for their React projects. This guide aims to equip developers with the knowledge to efficiently integrate GraphQL data fetching into their applications, regardless of scale or complexity.
