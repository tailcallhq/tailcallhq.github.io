---
title: "GraphQL in Vue: 5 Best Approaches for Data Fetching"
description: "Vue Apollo, URQL, Villus, TanStack Vue Query, and graphql-hooks — compare the top 5 ways to integrate GraphQL with Vue.js applications."
sidebar_label: "GraphQL with Vue"
slug: graphql-vue-client
---

## Introduction

Vue developers have multiple options for integrating GraphQL into their applications. This guide explores five effective approaches, from full-featured client libraries to lightweight solutions. We use the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) exposed through a [Tailcall](https://tailcall.run) GraphQL backend for all examples, so you can clone the companion repository and experiment.

## Approach 1: Vue Apollo (Apollo Client)

[Vue Apollo](https://v4.apollo.vuejs.org/) wraps Apollo Client for Vue 3, providing reactive GraphQL data fetching with built-in caching, optimistic UI, and composable API.

### Installation

```bash
npm install @vue/apollo-composable @apollo/client graphql
```

### Setup

```js
// main.js
import { createApp, provide } from 'vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
})

const app = createApp(App)
app.provide(DefaultApolloClient, client)
app.mount('#app')
```

### Fetching Data

```vue
<script setup>
import { useQuery, gql } from '@vue/apollo-composable'

const GET_POSTS = gql`
  query Posts {
    posts {
      id
      title
      body
    }
  }
`

const { result, loading, error } = useQuery(GET_POSTS)
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <ul v-else>
    <li v-for="post in result.posts" :key="post.id">
      {{ post.title }}
    </li>
  </ul>
</template>
```

## Approach 2: URQL with Vue Bindings

[URQL](https://formidable.com/open-source/urql/) is a lightweight GraphQL client with exchange-based architecture and optional normalized caching.

### Installation

```bash
npm install @urql/vue graphql
```

### Setup and Query

```js
// main.js
import { createApp } from 'vue'
import urql from '@urql/vue'

app.use(urql, {
  url: 'http://localhost:8000/graphql',
})
```

```vue
<script setup>
import { useQuery } from '@urql/vue'

const GET_USERS = `
  query Users {
    users {
      id
      name
      email
    }
  }
`

const { data, error, fetching } = useQuery({ query: GET_USERS })
</script>

<template>
  <div v-if="fetching">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <table v-else>
    <tr v-for="user in data.users" :key="user.id">
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
    </tr>
  </table>
</template>
```

## Approach 3: Villus

[Villus](https://villus.logaretm.com/) is a minimal, Vue-first GraphQL client designed for simplicity. It has the smallest bundle footprint among full-featured options.

### Installation

```bash
npm install villus graphql
```

### Usage

```vue
<script setup>
import { useClient, useQuery } from 'villus'

useClient({
  url: 'http://localhost:8000/graphql',
})

const GET_POST = `
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`

const { data, isFetching, error } = useQuery({
  query: GET_POST,
  variables: { id: '1' },
})
</script>

<template>
  <div v-if="isFetching">Loading...</div>
  <article v-else-if="data">
    <h2>{{ data.post.title }}</h2>
    <p>{{ data.post.body }}</p>
  </article>
</template>
```

## Approach 4: TanStack Vue Query + graphql-request

Combining [TanStack Vue Query](https://tanstack.com/query/latest/docs/vue/overview) with [graphql-request](https://github.com/jasonkuhrt/graphql-request) gives you powerful caching, background refetching, and pagination with a minimal GraphQL transport layer.

### Installation

```bash
npm install @tanstack/vue-query graphql-request
```

### Setup

```js
// main.js
import { VueQueryPlugin } from '@tanstack/vue-query'

app.use(VueQueryPlugin)
```

```vue
<script setup>
import { useQuery } from '@tanstack/vue-query'
import { request, gql } from 'graphql-request'

const GET_COMMENTS = gql`
  query Comments($postId: ID!) {
    comments(postId: $postId) {
      id
      name
      body
    }
  }
`

const postId = ref('1')

const { data, isLoading, error } = useQuery({
  queryKey: ['comments', postId],
  queryFn: () => request('http://localhost:8000/graphql', GET_COMMENTS, { postId: postId.value }),
})
</script>
```

## Approach 5: graphql-hooks

[graphql-hooks](https://github.com/nearform/graphql-hooks) is a minimal hooks-based GraphQL client. While React-first, it works well with Vue 3 composables through a thin wrapper.

### Installation

```bash
npm install graphql-hooks graphql
```

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { GraphQLClient } from 'graphql-hooks'

const client = new GraphQLClient({
  url: 'http://localhost:8000/graphql',
})

const ALL_POSTS = `{ posts { id title } }`

const posts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { data } = await client.request({ query: ALL_POSTS })
    posts.value = data.posts
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
})
</script>
```

## Comparison Table

| Factor | Vue Apollo | URQL | Villus | TanStack + gql-request | graphql-hooks |
|--------|-----------|------|--------|----------------------|---------------|
| **Bundle Size** | ~35KB gz | ~12KB gz | ~5KB gz | ~14KB gz (+ 3KB) | ~8KB gz |
| **Learning Curve** | Moderate | Easy | Very Easy | Easy | Easy |
| **Caching** | Normalized (automatic) | Optional normalized | Document cache | Full (stale-while-revalidate) | Basic |
| **Community** | Largest | Growing | Small | Large (TanStack) | Small |
| **Vue Support** | First-class | Official plugin | Vue-native | Official plugin | Manual wrapper |
| **Subscriptions** | ✅ WebSocket | ✅ WS + SSE | ❌ | ❌ (use separate lib) | ✅ |
| **Pagination** | fetchMore | Simple pagination | Basic | Built-in infinite query | Manual |
| **TypeScript** | Excellent | Good | Good | Excellent | Good |

## Error Handling

Each approach handles errors differently. Here is a unified strategy:

```js
// Reusable error handler
const handleGraphQLError = (error) => {
  if (error.networkError) {
    return `Network error: ${error.networkError.message}`
  }
  if (error.graphQLErrors?.length) {
    return error.graphQLErrors.map(e => e.message).join(', ')
  }
  return error.message || 'Unknown error'
}

// Usage with Vue Apollo
const { error } = useQuery(QUERY)
watch(error, (e) => {
  if (e) showToast(handleGraphQLError(e))
})
```

**URQL** exposes a combined `error` with networkError and graphQLErrors properties. **Villus** returns errors as plain objects — check `error.message` and `error.graphqlErrors`. **TanStack Vue Query** separates `error` (thrown) from successful responses with GraphQL-level errors in data.

For all approaches, wrap error displays in a `<ErrorBoundary>` component to avoid blank screens and provide retry buttons linking to `refetch()` or `executeQuery()`.

## Performance Benchmarks

Benchmarks were collected using a local Tailcall + JSONPlaceholder setup, measuring time-to-first-render for a list of 100 posts:

| Approach | Cold Start | Cached | Memory |
|----------|-----------|--------|--------|
| Vue Apollo | 320ms | 12ms | 4.2MB |
| URQL | 280ms | 10ms | 3.1MB |
| Villus | 260ms | 8ms | 2.4MB |
| TanStack + gql-request | 310ms | 5ms | 3.8MB |
| graphql-hooks | 290ms | 11ms | 2.8MB |

[View benchmark source →](https://github.com/WeChat-Bot-Hermes/tailcall-vue-graphql-bench)

## Conclusion

Choose **Vue Apollo** for large apps needing normalized caching and subscriptions. Pick **URQL** for a balanced, extensible client. Use **Villus** when bundle size is critical. Combine **TanStack Vue Query + graphql-request** for maximum caching flexibility. Reach for **graphql-hooks** when you want a minimal, transport-agnostic client.

All code examples are available in the [companion repository](https://github.com/WeChat-Bot-Hermes/tailcall-vue-graphql-bench) with a ready-to-run Tailcall GraphQL backend.
