---
title: HTTP Filters
description: Modify upstream requests and responses using Javascript
---

Tailcall provides a light-weight JS runtime to modify requests and resolve with custom responses.
The runtime is not a full-fledged Node.js environment and has no access to the file system or the network. It is designed to be used for simple request/response modifications.

## Getting Started

To leverage this functionality, a JavaScript function named `onRequest` must be created in a `worker.js` file. This function serves as middleware, allowing for the interception and modification of the request. Here is a simple example of a `worker.js` file that logs the request and returns the original request without any modifications.

```javascript
function onRequest({request}) {
  console.log(`${request.method} ${request.uri.path}`)

  return {request}
}
```

Once you have a worker file ready, you link that file to the tailcall configuration using the [@link] operator.

[@link]: /docs/operators/link

```graphql
schema @link(type: Script, src: "./worker.js") {
  query: Query
}
```

Once the worker is linked, you can start the server using the usual [start] command. Making requests to tailcall will now be intercepted by the worker and logged to the console.

[start]: /docs/guides/cli/#start

## Modify Request

You can modify the request by returning a `request` object from the `onRequest` function. Below is an example where we are modifying the request to add a custom header.

```javascript
function onRequest({request}) {
  request.headers["x-custom-header"] = "Hello, Tailcall!"

  return {request}
}
```

## Create Response

You can respond with custom responses by returning a `response` object from the `onRequest` function. Below is an example where we are responding with a custom response for all requests that start with `https://api.example.com`.

```javascript
function onRequest({request}) {
  if (request.uri.path.startsWith("https://api.example.com")) {
    return {
      response: {
        status: 200,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({message: "Hello, Tailcall!"})
      }
    }
  }
  else {
    return {request}
  }
```

## Response Redirect

Sometimes you might want to redirect the request to a different URL. You can do this by returning a `response` object with a `status` of `301` or `302` and a `Location` header. The following example redirects all requests to `https://example.com` to `https://tailcall.com`.

```javascript
function onRequest({request}) {
  if (request.uri.path.startsWith("https://example.com")) {
    return {
      response: {
        status: 301,
        headers: {
          Location: "https://tailcall.com",
        },
      },
    }
  } else {
    return {request}
  }
}
```

:::important
The new request that's created as a result of the redirect will not be intercepted by the worker.
:::

## Schema

The `onRequest` function takes a single argument that contains the request object. The return value of the `onRequest` function can be a `request` object, or a `response` object. It can not be null or undefined.

### Request

The request object has the following shape:

```typescript
type Request = {
  method: string
  uri: {
    path: string
    query?: {[key: string]: string}
    scheme: "Http" | "Https"
    host?: string
    port?: number
  }
  headers: {[key: string]: string}
  body?: string
}
```

:::tip
By default the headers field will be empty in most cases, unless headers are whitelisted via the [allowedHeaders](../operators/upstream.md#allowedheaders) setting in [@upstream](../operators/upstream.md).
:::

The http filter doesn't have access to the request's body. However the modified request that's returned can optionally provide the body.

### Response

The response object has the following shape:

```typescript
type Response = {
  status: number
  headers: {[key: string]: string}
  body?: string
}
```

## Modify Incoming Request Data

You can also modify incoming request data by parsing and transforming the request's query parameters or body. Below is an example where we modify the incoming request data by extracting user information from a query parameter and then setting the request body with the transformed user data.

```graphql
type Mutation {
  createUser(input: InputUser): User
    @http(
      method: POST
      path: "/"
      baseURL: "https://echo.free.beeceptor.com"
      query: [{ key: "user", value: "{{args.input}}" }]
    )
}

type Query {
  user: User @http(baseURL: "https://jsonplaceholder.typicode.com", path: "/user/1")
}

type UserProperties {
  userFirstName: String
  userLastName: String
  userAge: Int
}

type User {
  parsedQueryParams: UserProperties
}

input InputUser {
  firstName: String
  lastName: String
  age: Int
}

schema
  @link(type: Script, src: "./worker.js")
  @server(graphiql: true) {
  mutation: Mutation
  query: Query
}

```

```javascript
function onRequest({ request }) {
    console.log(request);
    const baseUrl = request.url.split('?')[0];
    const user = JSON.parse(decodeURIComponent(request.url.split('?user=')[1]));
    const modifiedUrl = baseUrl + `?userAge=${encodeURIComponent(user.age)}&userFirstName=${encodeURIComponent(user.firstName)}&userLastName=${encodeURIComponent(user.lastName)}`;
    request.url = modifiedUrl;

    return { request: request }
}
```

### Transformed Data

#### Request
```graphql
mutation {
  createUser(input: { firstName: "John", lastName: "Doe", age: 23 }) {
    parsedQueryParams {
      userAge
      userLastName
      userFirstName
    }
  }
}
```
#### Response
```json
{
  "data": {
    "createUser": {
      "parsedQueryParams": {
        "userAge": "23",
        "userLastName": "Doe",
        "userFirstName": "John"
      }
    }
  }
}
```