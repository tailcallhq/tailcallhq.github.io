---
title: Field Level GraphQL Authentication
description: "Discover how to provide granular access to types and fields in your GraphQL schema using authentication providers. Our guide helps you enhance security and control by configuring precise access levels within your GraphQL server. Start implementing advanced access control measures today."
slug: field-level-access-control-graphql-authentication
sidebar_label: Authentication
sidebar_position: 1
---

This guide will walk you through entity level authentication in GraphQL and how it could be achieved with Tailcall.

## What is Authentication?

Authentication is the process of verifying a user's identity before granting access to data. In most modern applications, some information, such as a list of products in an e-commerce application, is accessible to all users without requiring identification. However, personal data, like a user's order history, is accessible to the user who owns that information. Verifying a user's identity to access such personal data is known as authentication.

The primary reasons for implementing authentication in an application include:

- **Protecting User-Specific Data** Ensuring that data belonging to a user is not accessible by others.
- **Security** The ability to block users based on certain criteria necessitates identifying them.
- **Customized User Experiences** Delivering personalized experiences based on a user's identity.

Authentication can be implemented using credential validation mechanisms, such as:

- [Basic Auth](#basic-authentication)
- [JWT](#jwt-authentication)
- OAuth
- API Key

### Entity Level Authentication in GraphqQL

Entity level authentication in GraphQL refers to applying authentication logic to specific entities or types within your GraphQL schema, rather than at the API entry point or resolver level for individual queries or mutations. This approach allows you to control access to particular data types or fields based on the user's authentication status, enabling a more granular and flexible security model.

Advantages of this approach:

- **Flexibility**: Tailors security measures to precisely fit the needs of your application, enhancing the protection of sensitive data.
- **Scalability**: Facilitates extending security policies to new entities and fields as your schema expands.
- **Customization**: Enables implementing different authentication mechanisms for distinct entities based on their security requirements.

## Tailcall Authentication

Tailcall provides a straightforward way to implement entity level authentication in your GraphQL schema. By leveraging custom directives, you can define which entities or fields require authentication to access their data. Tailcall supports multiple authentication providers, such as Basic Auth and JWT, allowing you to choose the authentication mechanism that best suits your application's requirements.
to know more about how to use it, read the following articles:

1. [Basic Auth](#basic-authentication)
2. [JWT](#jwt-authentication)

## Tailcall config

Enabling support for authentication in Tailcall could be done in two steps:

1. With the help of [`@link` directive](/docs/directives/#link-directive) connect multiple authentication files as you need for different provides. To connect it use either [`Htpasswd`](/docs/directives/#htpasswd) or [`Jwks`](/docs/directives/#jwks) link type
2. Mark that some type of field requires authentication to be fetched with the help of [`@protected` directive](/docs/directives/#protected-directive)

Your config could look like this now:

```graphql
schema
  @server(port: 8000)
  @upstream(baseURL: "http://jsonplaceholder.typicode.com")
  #highlight-start
  @link(id: "auth-basic", type: Htpasswd, src: "htpasswd")
  @link(id: "auth-jwt", type: Jwks, src: "jwks.json") {
  #highlight-end

  query: Query
  mutation: Mutation
}

type Query {
  posts: [Post] @http(path: "/posts")
  user(id: Int!): User @http(path: "/users/{{.args.id}}")
}

type Mutation {
  user(id: Int!): User @http(path: "/users/{{.args.id}}")
}

#highlight-start
type User @protected {
  #highlight-end
  id: Int!
  name: String!
  username: String!
  email: String!
  phone: String
  website: String
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  #highlight-start
  body: String! @protected
  #highlight-end
  user: User @http(path: "/users/{{.value.userId}}")
}
```

In that case the whole `User` type and `Post.body` are marked as protected and therefore requiring authentication to resolve its content. That means following points:

- any query for `Post.body` will require authentication
- any query for any field of `User` will require authentication
- any field that resolves to `User` type will require authentication

For more info about possible configuration for available providers read articles for [Basic Auth](#basic-authentication) and [JWT](#jwt-authentication)

## Making test requests

Now let's try to access some data from the example above. Start the tailcall server with provided config and use graphQL playground that should be opened automatically in your browser.

If you execute the query that don't have any `@protected` fields like

```graphql
{
  posts {
    title
  }
}
```

Then the data for this will be resolved as usual without providing any additional info. showing the list of posts with their titles:
![unprotected.png](../static/images/auth/unprotected.png)
But if you change the query to access protected data, then if you don't provide any authentication data, i.e. for query:

```graphql
{
  posts {
    body
  }
}
```

You will get an authentication failure error stating that authentication parameters were not provided. e.g.:

```json
{
  "data": null,
  "errors": [
    {
      "message": "Authentication Failure: Missing Authorization Header.",
      "locations": [
        {
          "line": 3,
          "column": 5
        }
      ]
    }
  ]
}
```

![protected.png](../static/images/auth/protected.png)

Now update the request by providing additional Authorization header. You can do in the Playground by navigating to the tab `HTTP HEADERS` at the bottom by adding following header for Basic Auth:

```json
{
  "Authorization": "Basic dGVzdHVzZXIxOnBhc3N3b3JkMTIzs"
}
```

Now after executing the request again you'll get the response for all the requested fields without any error.
![basic_auth.png](../static/images/auth/basic_auth.png)

## How it works

### @protected Type

If type is marked with `@protected` then:

- attempt to request any field of that type will require authentication
- attempt to request any field from other type that resolves to protected type will require authentication and the underlying IO operation won't be executed without it

### Mutation

For mutation entity level authentication works similar to queries. But since mutation involves requests that changes external state you should be careful where do you specify `@protected` directive because marking some nested field as protected doesn't prevent from executing the request to resolve the parent fields. I.e. following example is problematic:

```graphql
schema {
  query: Query
  mutation: Mutation
}

type Query {
  user(id: Int!): User @http(path: "/users/{{.args.id}}")
}

type Mutation {
  user(id: Int!): User
    @http(path: "/users/{{.args.id}}", method: POST)
}

type User {
  id: Int!
  name: String!
  website: String @protected
}
```

Here you can still execute the mutation without any authentication and fail on attempting to resolve `website` field.

To resolve this issue, consider marking root fields as protected in case they require authentication, i.e.:

```graphql
schema {
  query: Query
  mutation: Mutation
}

type Query {
  user(id: Int!): User @http(path: "/users/{{.args.id}}")
}

type Mutation {
  user(id: Int!): User
    @http(path: "/users/{{.args.id}}", method: POST)
    @protected
}

type User {
  id: Int!
  name: String!
  website: String @protected
}
```

### Multiple auth providers

In case you linked multiple authentication files all of them will be used to execute validation process. In that case, by default, Tailcall will validate all of them in parallel and succeed if at least one of them succeed.

### Authentication headers

To validate authentication for user request the specific headers are used (like `Authorization` header). In case auth is enabled for tailcall those headers will be also added to the [`allowedHeaders` list](/docs/directives/#allowedheaders) and therefore they will be forwarded to the upstream requests implicitly.

## Basic Authentication

**Basic Authentication** is a straightforward authentication scheme that sends base64-encoded usernames and passwords in the HTTP Authorization header with each request. It's simple to implement but requires HTTPS to ensure security due to its lack of encryption.

### Prerequisites

To be able to use Basic Authentication support you should have configured [`htpasswd`](https://httpd.apache.org/docs/2.4/programs/htpasswd.html) file that contains users credentials data.

To generate this data you can use [Apache tooling](https://httpd.apache.org/docs/2.4/programs/htpasswd.html) itself or available [web-tool](https://hostingcanada.org/htpasswd-generator/)

:::important

Since this file stores secure information make sure to hash the password you use with secure algorithms

:::

### Tailcall config

To use Basic Auth you should first include htpasswd file generated from [Prerequisites](#prerequisites) with the help of [`@link` directive](/docs/directives/#htpasswd).

We can use that file as an example for it that has data for `testuser:mypassword` credentials in encrypted format:

```plaintext title="htpasswd"
testuser:$2y$10$wJ/mZDURcAOBIrswCAKFsO0Nk7BpHmWl/XuhF7lNm3gBAFH3ofsuu
```

After adding `@link` you can use the [`@protected` directive](/docs/directives/#protected-directive) to mark the fields that requiring success authentication to be requested.

The whole example could look like this:

```graphql
schema
  @server(port: 8000)
  @upstream(baseURL: "http://jsonplaceholder.typicode.com")
  @link(id: "auth-basic", type: Htpasswd, src: "htpasswd") {
  query: Query
}

type Query {
  user(id: Int!): User @http(path: "/users/{{.args.id}}")
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

### Making test request

Now you can run the example file with Tailcall and try to make a query for data with specifying credentials.

To make the request first create base64 encoded string from the `testuser:mypassword` string and then append the result to the `Authorization: Basic` header.

A request example with curl:

```sh
curl --request POST \
  --url http://localhost:8000/graphql \
  --header 'Authorization: Basic dGVzdHVzZXI6bXlwYXNzd29yZA==' \
  --data '{"query":"query {\n\tuser(id: 1) { name }\n}"}'
```

or you can use the GraphQL Playground and add the header in the HTTP Headers section:

```json
{
  "Authorization": "Basic dGVzdHVzZXIyOm15cGFzc3dvcmQ="
}
```

with query:

```graphql
query {
  user(id: 1) {
    name
  }
}
```

Executing such request should be resolved with the user and its name.

## JWT Authentication

**JWT Authentication** uses digitally signed tokens to authenticate and transmit user information in a compact JSON format, allowing stateless and secure communication between clients and servers. It offers greater flexibility and security, supporting expiration times and custom data embedding within the token itself.

### Prerequisites

To be able to use JWT authentication you should have configured [`JSON Web Key Sets`](https://supertokens.com/blog/understanding-jwks) (JWKS for short) file.

To create this file you can use available web-tools like [JWK creator](https://russelldavies.github.io/jwk-creator/) in case you already have RSA key-pair or [mkjwk](https://mkjwk.org) if you don't.

### Tailcall config

To use JWT you should first include JWKS file generated from [Prerequisites](#prerequisites) with the help of [`@link` directive](/docs/directives/#jwks).

We can use that file as an example for it:

```json title="jwks.json"
{
  "keys": [
    {
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256",
      "kid": "I48qMJp566SSKQogYXYtHBo9q6ZcEKHixNPeNoxV1c8",
      "n": "ksMb5oMlhJ_HzAebCuBG6-v5Qc4J111ur7Aux6-8SbxzqFONsf2Bw6ATG8pAfNeZ-USA3_T1mGkYTDvfoggXnxsduWV_lePZKKOq_Qp_EDdzic1bVTJQDad3CXldR3wV6UFDtMx6cCLXxPZM5n76e7ybPt0iNgwoGpJE28emMZJXrnEUFzxwFMq61UlzWEumYqW3uOUVp7r5XAF5jQ_1nQAnpHBnRFzdNPVb3E6odMGu3jgp8mkPbPMP16Fund4LVplLz8yrsE9TdVrSdYJThylRWn_BwvJ0DjUcp8ibJya86iClUlixAmBwR9NdStHwQqHwmMXMKkTXo-ytRmSUobzxX9T8ESkij6iBhQpmDMD3FbkK30Y7pUVEBBOyDfNcWOhholjOj9CRrxu9to5rc2wvufe24VlbKb9wngS_uGfK4AYvVyrcjdYMFkdqw-Mft14HwzdO2BTS0TeMDZuLmYhj_bu5_g2Zu6PH5OpIXF6Fi8_679pCG8wWAcFQrFrM0eA70wD_SqD_BXn6pWRpFXlcRy_7PWTZ3QmC7ycQFR6Wc6Px44y1xDUoq3rH0RlZkeicfvP6FRlpjFU7xF6LjAfd9ciYBZfJll6PE7zf-i_ZXEslv-tJ5-30-I4Slwj0tDrZ2Z54OgAg07AIwAiI5o4y-0vmuhUscNpfZsGAGhE",
      "e": "AQAB"
    }
  ]
}
```

After adding `@link` you can use the [`@protected` directive](/docs/directives/#protected-directive) to mark the fields that requiring success authentication to be requested.

The whole example could look like this:

```graphql
schema
  @server(port: 8000)
  @upstream(baseURL: "http://jsonplaceholder.typicode.com")
  @link(id: "auth-jwks", type: Jwks, src: "jwks.json") {
  query: Query
}

type Query {
  user(id: Int!): User @http(path: "/users/{{.args.id}}")
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

### Making test request

Now you can run the example file with Tailcall and try to make a query for data with specifying credentials.

To make the request first obtain JWT token compatible with JWKS file you've linked before (if you've used the example `jwks.json` file from above then you can use the token from the example below).

An request example with curl:

```sh
curl --request POST \
  --url http://localhost:8000/graphql \
  --header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ikk0OHFNSnA1NjZTU0tRb2dZWFl0SEJvOXE2WmNFS0hpeE5QZU5veFYxYzgifQ.eyJleHAiOjIwMTkwNTY0NDEuMCwiaXNzIjoibWUiLCJzdWIiOiJ5b3UiLCJhdWQiOlsidGhlbSJdfQ.cU-hJgVGWxK3-IBggYBChhf3FzibBKjuDLtq2urJ99FVXIGZls0VMXjyNW7yHhLLuif_9t2N5UIUIq-hwXVv7rrGRPCGrlqKU0jsUH251Spy7_ppG5_B2LsG3cBJcwkD4AVz8qjT3AaE_vYZ4WnH-CQ-F5Vm7wiYZgbdyU8xgKoH85KAxaCdJJlYOi8mApE9_zcdmTNJrTNd9sp7PX3lXSUu9AWlrZkyO-HhVbXFunVtfduDuTeVXxP8iw1wt6171CFbPmQJU_b3xCornzyFKmhSc36yvlDfoPPclWmWeyOfFEp9lVhQm0WhfDK7GiuRtaOxD-tOvpTjpcoZBeJb7bSg2OsneyeM_33a0WoPmjHw8WIxbroJz_PrfE72_TzbcTSDttKAv_e75PE48Vvx0661miFv4Gq8RBzMl2G3pQMEVCOm83v7BpodfN_YVJcqZJjVHMA70TZQ4K3L4_i9sIK9jJFfwEDVM7nsDnUu96n4vKs1fVvAuieCIPAJrfNOUMy7TwLvhnhUARsKnzmtNNrJuDhhBx-X93AHcG3micXgnqkFdKn6-ZUZ63I2KEdmjwKmLTRrv4n4eZKrRN-OrHPI4gLxJUhmyPAHzZrikMVBcDYfALqyki5SeKkwd4v0JAm87QzR4YwMdKErr0Xa5JrZqHGe2TZgVO4hIc-KrPw' \
  --data '{"query":"query {\n\tuser(id: 1) { name }\n}"}'
```

Executing such request should be resolved with the user and its name.
