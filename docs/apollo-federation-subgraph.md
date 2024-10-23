---
title: Use Tailcall service as a Federation Subgraph
description: "Learn how to configure Tailcall to function as an Apollo Federation Subgraph, enabling seamless integration into a federated GraphQL environment."
slug: integrate-apollo-federation-graphql-tailcall-subgraph
sidebar_label: Apollo Federation Subgraph
---

This guide shows how to configure tailcall to function as an [Apollo Federation Subgraph](https://www.apollographql.com/docs/federation/building-supergraphs/subgraphs-overview/) in your GraphQL infrastructure.

## Create the Tailcall config

First, you need to create a basic Tailcall configuration. For reference, check out our [Getting Started](./getting-started.mdx) guide.

## Define Entity Resolvers

:::note
Skip this step if you don't have entities for now or want to add them later.
:::

Now you need to add [entity resolvers](https://www.apollographql.com/docs/federation/entities/) to the Tailcall config to make it act as a subgraph.

To do this, you need to define resolver on types by using one of the [directives](./configuration.mdx) that resolve the data. Use [`{{.value}}`](https://tailcall.run/docs/graphql-resolver-context-tailcall/#value) to access the fields that act as a federation `@key` and will be provided by the Federation Router when making the request to this subgraph.

```graphql
type Post
  @http(
    url: "https://jsonplaceholder.typicode.com/posts"
    query: [{key: "id", value: "{{.value.id}}"}]
  ) {
  id: Int!
  userId: Int!
  title: String!
  body: String!
}
```

:::note
Please, note that you don't need to specify the `@key` directive manually when defining entity resolver with Tailcall. It's because Tailcall can automatically infer the key definitions from the usage of the resolver itself.
:::

## Enable federation in the Tailcall config

Federation is controlled by the flag [`enableFederation`](./directives.md#enablefederation). Define it with `true` value to enable federation support.

## Register your subgraph

Registration of the subgraph depends on what Federation Router you use.

### GraphOS Router

For the **GraphOS Router** please refer to the [GraphOS documentation](https://www.apollographql.com/docs/graphos/quickstart/cloud). Please note that currently, to fetch subgraph schema from Tailcall instance, you need to use introspection request with the Rover cli instead of providing the Tailcall config as the subgraph schema.

When developing locally, use [Rover CLI](https://www.apollographql.com/docs/rover/) to start the development environment:

1. Start the tailcall server as usual with `tailcall start`.
2. Register the subgraph using introspection with `rover dev --url http://localhost:8001/graphql --name post`.
3. Go to `http://localhost:4000` to inspect the router schema.

### @apollo/gateway

When using [`@apollo/gateway`](https://www.apollographql.com/docs/apollo-server/using-federation/api/apollo-gateway/) package, you need to specify the URLs to your subgraphs in order to register them.

Example of `@apollo/gateway` configuration:

```ts
import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import {
  ApolloGateway,
  IntrospectAndCompose,
} from "@apollo/gateway"

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {name: "post", url: "http://localhost:8001/graphql"},
      {name: "user", url: "http://localhost:8002/graphql"},
    ],
  }),
})

const server = new ApolloServer({
  gateway,
  introspection: true,
})

const {url} = await startStandaloneServer(server)
console.log(`🚀  Server ready at ${url}`)
```

## Using federation specific directives

The Federation specification defines [multiple directives](https://www.apollographql.com/docs/federation/federated-schemas/federated-directives) that control how the data is resolved. While the `@key` directive is not necessary to be specified, any other directives should be specified the same way as in any other federation subgraph schema.

Example of using federation directives in the Tailcall config:

```graphql
type User
  @http(
    url: "https://jsonplaceholder.typicode.com/users/{{.args.id}}"
  )
  @shareable {
  id: Int!
  name: String!
}

type Post
  @expr(
    body: {
      id: "{{.value.id}}"
      title: "post-title-{{.value.id}}"
    }
  ) {
  id: Int!
  title: String! @override(from: "name")
}
```
