---
title: "GraphQL in React: 5 Best Approaches for Data Fetching."
description: "Apollo Client and Urql provide comprehensive solutions for large-scale applications, while the React Query combinations offer more flexibility."
sidebar_label: "GraphQL with React"
slug: graphql-react-client
---

## Introduction:
React developers often need to fetch data from GraphQL APIs, but with so many options available, choosing the right approach can be challenging. This comprehensive guide explores five effective methods for querying GraphQL data in React applications, ranging from full-featured client libraries to lightweight solutions. We'll use the SpaceX GraphQL API as an example to demonstrate how to fetch and display data about recent space missions.

### 1. Apollo Client: The Comprehensive Solution

Apollo Client stands out as the most feature-rich and widely adopted GraphQL library for React. It offers:

- Robust data fetching capabilities
- Built-in caching mechanism
- Integrated state management

#### Getting started with Apollo Client:

1. Install dependencies:
```
npm install @apollo/client graphql
```

2. Set up the Apollo Provider and client:

```jsx
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
```

3. Use the `useQuery` hook to fetch data:

```jsx
import { useQuery, gql } from "@apollo/client";

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

### 2. Urql: The Lightweight Contender

Urql offers a more streamlined alternative to Apollo, providing:

- Smaller bundle size
- Simpler setup process
- Optional caching capabilities

#### To use Urql:

1. Install dependencies:
```
npm install urql graphql
```

2. Set up the Urql Provider and client:

```jsx
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'https://api.spacex.land/graphql/',
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  rootElement
);
```

3. Implement data fetching with the `useQuery` hook:

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

### 3. React Query + GraphQL Request: The Flexible Duo

This combination offers a lightweight GraphQL client paired with a powerful data-fetching and state management library:

1. Install dependencies:
```
npm install react-query graphql-request
```

2. Set up React Query's QueryClientProvider:

```jsx
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  rootElement
);
```

3. Implement data fetching:

```jsx
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "https://api.spacex.land/graphql/";
const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

function SpaceXLaunches() {
  const { data, isLoading, error } = useQuery("launches", () =>
    request(endpoint, LAUNCHES_QUERY)
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

### 4. React Query + Axios: Leveraging a Popular HTTP Client

This approach combines React Query with the widely-used Axios library:

1. Install dependencies:
```
npm install react-query axios
```

2. Implement data fetching:

```jsx
import axios from "axios";
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
  const { data, isLoading, error } = useQuery("launches", () =>
    axios.post(endpoint, { query: LAUNCHES_QUERY })
      .then(response => response.data.data)
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

### 5. React Query + Fetch API: The Minimalist Approach

This method utilizes the browser's built-in Fetch API alongside React Query:

1. Install React Query:
```
npm install react-query
```

2. Implement data fetching:

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
  const { data, isLoading, error } = useQuery("launches", () =>
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

## Conclusion:
Each of these five approaches to fetching GraphQL data in React offers its own set of advantages. Apollo Client and Urql provide comprehensive solutions for large-scale applications, while the React Query combinations offer more flexibility and lighter-weight options. Consider your project's specific needs, such as bundle size, caching requirements, and overall complexity, when choosing the best method for your application.

By mastering these techniques, you'll be well-equipped to efficiently integrate GraphQL data fetching into your React projects, regardless of their scale or complexity.