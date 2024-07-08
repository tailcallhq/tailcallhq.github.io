---
title: "GraphQL in Angualar: 5 Best Approaches for Data Fetching."
description: "Apollo Client and Urql provide comprehensive solutions for large-scale applications, while the Angualar Query combinations offer more flexibility."
sidebar_label: "GraphQL with Angular"
slug: graphql-angular-client
---

## Introduction

Angular developers often need to fetch data from GraphQL APIs. This guide explores five effective methods for querying GraphQL data in Angular applications, using the SpaceX GraphQL API to demonstrate fetching and displaying data about recent space missions. We'll cover full-featured client libraries to lightweight solutions, providing a detailed comparison table and specific use cases for each method.

### 1. Apollo Client: The Comprehensive Solution

Apollo Client is the most feature-rich GraphQL library for Angular, widely adopted for its robust data fetching, built-in caching, and integrated state management.

#### Getting started with Apollo Client

1. **Install dependencies**:

   ```bash
   npm install @apollo/client graphql-tag @angular/core apollo-angular graphql
   ```

2. **Set up the Apollo Provider and client**:

```ts
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
});

@NgModule({
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => {
        return {
          cache: new InMemoryCache(),
          link: client,
        };
      },
    },
  ],
})
export class GraphQLModule {}
```

3. **Use the `useQuery` hook to fetch data**:

```ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';

const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor(private apollo: Apollo) {}

  getLaunches() {
    return this.apollo.watchQuery({
      query: LAUNCHES_QUERY,
    }).valueChanges;
  }
}
```

### 2. Urql: The Lightweight Contender

Urql provides a streamlined alternative to Apollo, with a smaller bundle size, simpler setup process, and optional caching.

#### To use Urql

1. **Install dependencies**:

   ```bash
   npm install urql @angular/core @angular/common/http graphql
   ```

2. **Set up the Urql Provider and client**:

```ts
import { Injectable } from '@angular/core';
import { createClient } from 'urql';
import { HttpClientModule } from '@angular/common/http';

const client = createClient({
  url: 'https://api.spacex.land/graphql/',
});

@Injectable({
  providedIn: 'root',
})
export class UrqlService {
  constructor() {
    this.client = client;
  }

  getClient() {
    return this.client;
  }
}

@NgModule({
  imports: [HttpClientModule],
  providers: [UrqlService],
})
export class GraphQLModule {}
```
3. **Implement data fetching with the useQuery hook**:

```ts
import { Injectable } from '@angular/core';
import { gql } from 'graphql-tag';
import { useQuery } from 'urql';

const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  constructor(private urqlService: UrqlService) {}

  getLaunches() {
    return this.urqlService.getClient().query(LAUNCHES_QUERY).toPromise();
  }
}
```

### 3. Angular HttpClient + GraphQL Request: The Flexible Duo

This combination pairs a lightweight GraphQL client with a powerful data-fetching library.

1. **Install dependencies**:

   ```bash
    npm install @angular/core @angular/common/http rxjs graphql-request
   ```

2. **Set up the Urql Provider and client**:

```ts
import { Injectable } from '@angular/core';
import { request, gql } from 'graphql-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'https://api.spacex.land/graphql/';
const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GraphQLRequestService {
  constructor(private http: HttpClient) {}

  fetchLaunches(): Observable<any> {
    return this.http.post(endpoint, { query: LAUNCHES_QUERY });
  }
}
```

### 4. Angular HttpClient + Axios: Leveraging a Popular HTTP Client

Combines Angular HttpClient with Axios for familiar HTTP handling.

1. **Install dependencies**:

   ```bash
    npm install @angular/core axios
   ```

2. **Implement data fetching**:

```ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = "https://api.spacex.land/graphql/"
const LAUNCHES_QUERY = `
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  constructor(private http: HttpClient) {}

  fetchLaunches(): Observable<any> {
    return new Observable((observer) => {
      axios
        .post(endpoint, { query: LAUNCHES_QUERY })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
```

### 5. React Query + Fetch API: The Minimalist Approach

Utilizes the browser's Fetch API with Angular HttpClient for a minimalistic approach.

1. **Install Angular Core**:

   ```bash
    npm install @angular/common
   ```
2. **Implement data fetching**:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'https://api.spacex.land/graphql/';
const LAUNCHES_QUERY = `
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private http: HttpClient) {}

  fetchLaunches(): Observable<any> {
    return new Observable((observer) => {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: LAUNCHES_QUERY }),
      })
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then((result) => {
          observer.next(result.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
```
## Detailed Comparison Table

Here’s a comparison table to help choose the right method based on specific needs:

| Method                        | Bundle Size (minified + gzip)\* | Learning Curve | Caching Capabilities                    | Community Support | Additional Features                     |
| ----------------------------- | ------------------------------- | -------------- | --------------------------------------- | ----------------- | --------------------------------------- |
| Apollo Client                 | ~47.04 KB                       | Moderate       | Extensive (InMemoryCache, customizable) | High              | State management, optimistic UI updates |
| Urql                          | ~2.18 KB                        | Low            | Moderate (Document caching)             | Moderate          | Extensible architecture                 |
| Angular HttpClient + GraphQL Request | ~ KB + ~ KB              | Low            | Basic                                   | Growing           | Minimal overhead                        |
| Angular HttpClient + Axios           | ~ KB + ~ KB              | Low            | Basic                                   | High              | Familiar HTTP handling                  |
| Angular HttpClient + Fetch API       | ~ KB + ~ KB              | Low            | Basic                                    | Moderate          | Browser-native, minimal setup           |

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
3. **Angular HttpClient (all combinations):**
   - Time-based caching
   - Stale-while-revalidate strategy
   - Manual cache manipulation
   - Persistence and rehydration

## Error Handling

<!-- TODO -->

## Common Issues and Resolutions

### 1. Apollo Client

1. **Issue**: Cache inconsistencies **Resolution**: Use `refetchQueries` option when mutating data or implement cache update functions.
2. **Issue**: Overfeching data **Resolution**: Utilize fragment colocation and implement proper query splitting.

### 2. Urql

1. **Issue**: Stale data after mutations **Resolution**: Use the `cache-and-network` fetch policy or implement manual cache updates.
2. **Issue**: SSR hydration mismatches **Resolution**: Ensure consistent query variables between server and client, or use the `ssrExchange`.

### 3. Angular HttpClient (all combinations)

1. **Issue**: Stale data displayed briefly before refetch **Resolution:** Adjust staleTime and cacheTime options to fine-tune caching behavior.
2. **Issue**: Unnecessary refetches on component remount **Resolution:** Implement proper query keys and adjust refetchOnMount option.

### Use Cases for Each Method

- **Apollo Client**: Best for large-scale applications needing complex state management and data synchronization.
- **Urql**: Suitable for medium-sized projects where simplicity and performance are prioritized.
- **Angular HttpClient + GraphQL Request**: Ideal for projects requiring high flexibility with minimal GraphQL-specific setup.
- **Angular HttpClient + Axios**: Preferred when developers are already familiar with Axios and need robust HTTP capabilities.
- **Angular HttpClient + Fetch API**: Optimal for projects that require a minimalistic approach with no additional dependencies.

## Conclusion

By understanding the distinct features and use cases of each method, developers can select the most appropriate GraphQL fetching technique for their Angular projects. This guide aims to equip developers with the knowledge to efficiently integrate GraphQL data fetching into their applications, regardless of scale or complexity.
