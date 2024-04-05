---
title: Basic Auth
description: "Learn how you can provide granular access to types and fields in GraphQL schema with the help of authentication providers"
---

**Basic Authentication** is a straightforward authentication scheme that sends base64-encoded usernames and passwords in the HTTP Authorization header with each request. It's simple to implement but requires HTTPS to ensure security due to its lack of encryption.

## Prerequisites

To be able to use Basic Authentication support you should have configured [`htpasswd`](https://httpd.apache.org/docs/2.4/programs/htpasswd.html) file that contains users credentials data.

To generate this data you can use [Apache tooling](https://httpd.apache.org/docs/2.4/programs/htpasswd.html) itself or available [web-tool](https://hostingcanada.org/htpasswd-generator/)

:::important

Since this file stores secure information make sure to hash the password you use with secure algorithms

:::

## Tailcall config

To use Basic Auth you should first include htpasswd file generated from [Prerequisites](#prerequisites) with the help of [`@link` directive](../directives/link.md#htpasswd).

We can use that file as an example for it that has data for `testuser:mypassword` credentials in encrypted format:

```plaintext title="htpasswd"
testuser:$2y$10$wJ/mZDURcAOBIrswCAKFsO0Nk7BpHmWl/XuhF7lNm3gBAFH3ofsuu
```

After adding `@link` you can use the [`@protected` directive](../directives/protected.md) to mark the fields that requiring success authentication to be requested.

The whole example could look like this:

```graphql
schema
  @server(port: 8000, graphiql: true)
  @upstream(baseURL: "http://jsonplaceholder.typicode.com")
  @link(id: "auth-basic", type: Htpasswd, src: "htpasswd") {
  query: Query
}

type Query {
  user(id: Int!): User @http(path: "/users/{{args.id}}")
}

type User @protected {
  id: Int!
  name: String!
  username: String!
  email: String!
  phone: String
  website: String
}
```

## Making test request

Now you can run the example file with Tailcall and try to make a query for data with specifying credentials.

To make the request first create base64 encoded string from the `testuser:mypassword` string and then append the result to the `Authorization: Basic` header.

A request example with curl:

```sh
curl --request POST \
  --url http://localhost:8000/graphql \
  --header 'Authorization: Basic dGVzdHVzZXI6bXlwYXNzd29yZA==' \
  --data '{"query":"query {\n\tuser(id: 1) { name }\n}"}'
```

Executing such request should be resolved with the user and its name.
