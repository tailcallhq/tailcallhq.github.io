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