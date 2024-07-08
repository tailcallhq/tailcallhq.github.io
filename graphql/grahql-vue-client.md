---
title: "GraphQL in Vue.js: 5 Best Approaches for Data Fetching."
description: "Apollo Client and Urql provide comprehensive solutions for large-scale applications, while the Vue Query combinations offer more flexibility."
sidebar_label: "GraphQL with Vue.js"
slug: graphql-vue-client
---

## Introduction

Vue.js developers often need to fetch data from GraphQL APIs. This guide explores five effective methods for querying GraphQL data in Vue.js applications, using the SpaceX GraphQL API to demonstrate fetching and displaying data about recent space missions. We'll cover full-featured client libraries to lightweight solutions, providing a detailed comparison table and specific use cases for each method.

### 1. Apollo Client: The Comprehensive Solution

Apollo Client is the most feature-rich GraphQL library for Vue.js, widely adopted for its robust data fetching, built-in caching, and integrated state management.

#### Getting started with Apollo Client

1. **Install dependencies**:

   ```bash
    npm install @apollo/client graphql-tag vue-apollo graphql
   ```

2. **Set up the Apollo Provider and client**:

```js
import { createApp, provide, h } from 'vue';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';

const apolloClient = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.mount('#app');
```

3. **Use the `useQuery` hook to fetch data**:

```js
import { defineComponent } from 'vue';
import { useQuery, gql } from '@vue/apollo-composable';

const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default defineComponent({
  setup() {
    const { result, loading, error } = useQuery(LAUNCHES_QUERY);
    return { result, loading, error };
  },
});
```

### 2. Urql: The Lightweight Contender

Urql provides a streamlined alternative to Apollo, with a smaller bundle size, simpler setup process, and optional caching.

#### To use Urql

1. **Install dependencies**:

   ```bash
    npm install urql @urql/vue graphql
   ```

2. **Set up the Urql Provider and client**:

```js
import { createApp, h } from 'vue';
import { createClient, provideClient } from '@urql/vue';
import App from './App.vue';

const client = createClient({
  url: 'https://api.spacex.land/graphql/',
});

const app = createApp({
  setup() {
    provideClient(client);
  },
  render: () => h(App),
});

app.mount('#app');
```

3. **Implement data fetching with the useQuery hook**:

```js
import { defineComponent } from 'vue';
import { useQuery } from '@urql/vue';

const LAUNCHES_QUERY = `
  query {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default defineComponent({
  setup() {
    const { data, fetching, error } = useQuery({ query: LAUNCHES_QUERY });
    return { data, fetching, error };
  },
});
```

### 3. Vue Query + GraphQL Request: The Flexible Duo

This combination pairs a lightweight GraphQL client with a powerful data-fetching library.

1. **Install dependencies**:

   ```bash
    npm install @vue/composition-api graphql-request vue-query
   ```

2. **Set up the GraphQL Request client:**:

```js
import { defineComponent, ref } from 'vue';
import { request, gql } from 'graphql-request';
import { useQuery } from 'vue-query';

const endpoint = 'https://api.spacex.land/graphql/';
const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default defineComponent({
  setup() {
    const { data, isLoading, error } = useQuery('launches', async () => {
      const response = await request(endpoint, LAUNCHES_QUERY);
      return response;
    });

    return { data, isLoading, error };
  },
});
```

### 4. Vue Axios + GraphQL Request: Leveraging a Popular HTTP Client

1. **Install dependencies**:

   ```bash
    npm install axios graphql-request vue
   ```

2. **Implement data fetching**:

```js
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { gql } from 'graphql-request';

const endpoint = "https://api.spacex.land/graphql/";
const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default defineComponent({
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        const response = await axios.post(endpoint, { query: LAUNCHES_QUERY });
        data.value = response.data;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    });

    return { data, loading, error };
  },
});
```

### 5. Vuw Query + Fetch API: The Minimalist Approach

Utilizes the browser's Fetch API with Vue Query for a minimalistic approach.

1. **Install Vue Composition API:**:

   ```bash
    npm install @vue/composition-api
   ```

2. **Implement data fetching**:

```js
import { defineComponent, ref, onMounted } from 'vue';

const endpoint = 'https://api.spacex.land/graphql/';
const LAUNCHES_QUERY = `
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default defineComponent({
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: LAUNCHES_QUERY }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        data.value = result.data;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    });

    return { data, loading, error };
  },
});
```

## Detailed Comparison Table

Here’s a comparison table to help choose the right method based on specific needs:

| Method                        | Bundle Size (minified + gzip)\* | Learning Curve | Caching Capabilities                    | Community Support | Additional Features                     |
| ----------------------------- | ------------------------------- | -------------- | --------------------------------------- | ----------------- | --------------------------------------- |
| Apollo Client                 | ~47.04 KB                       | Moderate       | Extensive (InMemoryCache, customizable) | High              | State management, optimistic UI updates |
| Urql                          | ~2.18 KB                        | Low            | Moderate (Document caching)             | Moderate          | Extensible architecture                 |
| Vue Query + GraphQL Request   | ~1 KB + ~185.8 KB               | Low            | Basic (Managed by Vue Query)            | Growing           | Minimal overhead                        |
| Vue Query + Axios             | ~1 KB + ~13.2 KB                | Low            | Basic (Managed by Vue Query)            | High              | Familiar HTTP handling                  |
| Vue Query + Fetch API         | ~1 KB + ~152.4 KB               | Low            | Basic (Managed by Vue Query)            | Moderate          | Browser-native, minimal setup           |

(*) culled from *bundlephobia.com\*

### Caching Capabilities
Caching is essential for optimizing the performance and efficiency of data fetching in GraphQL.

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
   - HTTP caching
   - Time-based caching
   - Manual cache manipulation
   - Persistence and rehydration
   - Stale-while-revalidate strategy

## Error Handling

Proper error handling is crucial for creating robust GraphQL applications. This section provides a detailed discussion on error handling for each client, including code examples for different types of errors and guidance on displaying user-friendly error messages.

### 1. Apollo Client

Apollo Client provides detailed error information through the `error` property returned by the `useQuery` hook. It distinguishes between GraphQL errors and network errors.

```tsx
import { defineComponent } from 'vue';
import { useQuery, gql } from '@vue/apollo-composable';

const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default defineComponent({
  setup() {
    const { result, loading, error } = useQuery(LAUNCHES_QUERY);

    return { result, loading, error };
  },
  template: `
    <div>
      <div v-if="loading">Loading...</div>
      <ErrorDisplay v-if="error" :error="error" />
      <div v-else>
        <!-- Render data -->
      </div>
    </div>
  `,
  components: {
    ErrorDisplay
  }
});

const ErrorDisplay = {
  props: ['error'],
  methods: {
    getUserFriendlyErrorMessage(error) {
      if (error.networkError) {
        return "Unable to reach the server. Please check your internet connection and try again.";
      }
      if (error.graphQLErrors.length > 0) {
        // You might want to customize this based on specific error codes or messages
        return "There was an issue processing your request. Please try again later.";
      }
      return "An unexpected error occurred. Please try again.";
    }
  },
  template: `
    <div class="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{{ getUserFriendlyErrorMessage(error) }}</p>
      <details v-if="process.env.NODE_ENV !== 'production'">
        <summary>Technical Details</summary>
        <div v-for="(graphQLError, index) in error.graphQLErrors" :key="index">
          <p>GraphQL error: {{ graphQLError.message }}</p>
          <p>Location: {{ JSON.stringify(graphQLError.locations) }}</p>
          <p>Path: {{ JSON.stringify(graphQLError.path) }}</p>
        </div>
        <p v-if="error.networkError">Network error: {{ error.networkError.message }}</p>
      </details>
    </div>
  `
};
```

This example demonstrates how to:

- Display a user-friendly error message based on the type of error.
- Show technical details only in non-production environments.
- Handle both GraphQL and network errors.

### 2. Urql

Urql provides error information through the error property in the result object.

```jsx
import { defineComponent } from 'vue';
import { useQuery } from '@urql/vue';

const LAUNCHES_QUERY = `
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default defineComponent({
  setup() {
    const { data, fetching, error } = useQuery({ query: LAUNCHES_QUERY });

    return { data, fetching, error };
  },
  template: `
    <div>
      <div v-if="fetching">Loading...</div>
      <ErrorDisplay v-if="error" :error="error" />
      <div v-else>
        <!-- Render data -->
      </div>
    </div>
  `,
  components: {
    ErrorDisplay
  }
});

const ErrorDisplay = {
  props: ['error'],
  methods: {
    getUserFriendlyErrorMessage(error) {
      if (error.networkError) {
        return "Unable to reach the server. Please check your internet connection and try again.";
      }
      if (error.graphQLErrors.length > 0) {
        return "There was an issue processing your request. Please try again later.";
      }
      return "An unexpected error occurred. Please try again.";
    }
  },
  template: `
    <div class="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{{ getUserFriendlyErrorMessage(error) }}</p>
      <details v-if="process.env.NODE_ENV !== 'production'">
        <summary>Technical Details</summary>
        <div v-for="(graphQLError, index) in error.graphQLErrors" :key="index">
          <p>GraphQL error: {{ graphQLError.message }}</p>
          <p v-if="graphQLError.locations">Location: {{ JSON.stringify(graphQLError.locations) }}</p>
          <p v-if="graphQLError.path">Path: {{ JSON.stringify(graphQLError.path) }}</p>
        </div>
        <p v-if="error.networkError">Network error: {{ error.networkError.message }}</p>
      </details>
    </div>
  `
};
```

### 3. Vue Query (applies to all Vue Query examples)

Vue Query provides error information through the `error` property returned by the `useQuery` hook.

When using Vue Query with GraphQL Request, you need to handle errors from both libraries. This approach requires more manual error handling but offers fine-grained control.

```jsx
import { defineComponent } from 'vue';
import { request, gql } from 'graphql-request';
import { useQuery } from 'vue-query';

const endpoint = 'https://api.spacex.land/graphql/';
const LAUNCHES_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

export default defineComponent({
  setup() {
    const { data, isLoading, error } = useQuery('launches', async () => {
      try {
        return await request(endpoint, LAUNCHES_QUERY);
      } catch (error) {
        if (error.response) {
          throw new Error(JSON.stringify(error.response.errors));
        } else {
        // Network error or other non-GraphQL error
          throw new Error(`Network error: ${error.message}`);
        }
      }
    });

    return { data, isLoading, error };
  },
  template: `
    <div>
      <div v-if="isLoading">Loading...</div>
      <ErrorDisplay v-if="error" :error="error" />
      <div v-else>
        <!-- Render data -->
      </div>
    </div>
  `,
  components: {
    ErrorDisplay
  }
});

const ErrorDisplay = {
  props: ['error'],
  methods: {
    getUserFriendlyErrorMessage(error) {
      try {
        const parsedError = JSON.parse(error.message);
        if (Array.isArray(parsedError)) {
          return "There was an issue processing your request. Please try again later.";
        }
      } catch {
        return "Unable to reach the server. Please check your internet connection and try again.";
      }
      return "An unexpected error occurred. Please try again.";
    }
  },
  template: `
    <div class="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>{{ getUserFriendlyErrorMessage(error) }}</p>
      <details v-if="process.env.NODE_ENV !== 'production'">
        <summary>Technical Details</summary>
        <pre>{{ error.message }}</pre>
      </details>
    </div>
  `
};
```

## Common Issues and Resolutions

### 1. Apollo Client

1. **Issue**: Cache inconsistencies **Resolution**: Use `refetchQueries` option when mutating data or implement cache update functions.
2. **Issue**: Overfeching data **Resolution**: Utilize fragment colocation and implement proper query splitting.

### 2. Urql

1. **Issue**: Stale data after mutations **Resolution**: Use the `cache-and-network` fetch policy or implement manual cache updates.
2. **Issue**: SSR hydration mismatches **Resolution**: Ensure consistent query variables between server and client, or use the `ssrExchange`.


### 3. Vue Query (with GraphQL Request, Axios, or Fetch API)

1. **Issue**: Stale data displayed briefly before refetch **Resolution**: Adjust `staleTime` and `cacheTime` options to fine-tune caching behavior.
2. **Issue**: Unnecessary refetches on component remount **Resolution**: Implement proper query keys and adjust `refetchOnMount` option.

### Use Cases for Each Method

- **Apollo Client**: Best for large-scale applications needing complex state management and data synchronization.
- **Urql**: Suitable for medium-sized projects where simplicity and performance are prioritized.
- **Vue Query + GraphQL Request**: Ideal for projects requiring high flexibility with minimal GraphQL-specific setup.
- **Vue Axios + GraphQL Request**: Preferred when developers are already familiar with Axios and need robust HTTP capabilities.
- **Vue Query + Fetch API**: Optimal for projects that require a minimalistic approach with no additional dependencies.


## Conclusion

By understanding the distinct features and use cases of each method, developers can select the most appropriate GraphQL fetching technique for their Vue.js projects. This guide aims to equip developers with the knowledge to efficiently integrate GraphQL data fetching into their applications, regardless of scale or complexity.
