---
title: "Scripting"
description: "Discover how to effortlessly manipulate HTTP requests and responses using Tailcall's lightweight JS runtime. Tailcall provides a streamlined JavaScript environment specifically designed for simple yet powerful request/response modifications without the complexity of a full Node.js setup. Ideal for developers looking to implement middleware solutions, Tailcall's runtime does not require file system or network access, ensuring a secure and focused development process."
slug: scripting-guide
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

Once you have a worker file ready, you link that file to the tailcall configuration using the [`@link`](/docs/directives/#link-directive) directive.

```graphql
schema @link(type: Script, src: "./worker.js") {
  query: Query
}
```

Once the worker is linked, you can start the server using the usual [start] command. Making requests to tailcall will now be intercepted by the worker and logged to the console.

[start]: /docs/cli/#start

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

By default the headers field will be empty in most cases, unless headers are whitelisted via the [allowedHeaders](/docs/directives/#allowedheaders) setting in [`@upstream`](/docs/directives/#upstream-directive).

The http filter doesn't have access to the request's body, hence you can't directly modify the body of an outgoing request. This is more of a design choice than a limitation we have made to ensure that developers don't misuse this API to write all kind of business logic in Tailcall.

:::tip
As an escape hatch you can pass the request body as a query param instead of an actual request body and read in the JS.
:::

The modified request that's returned from the above `onRequest` function can optionally provide the body. This body is used by Tailcall as the request body while making the upstream request.

### Response

The response object has the following shape:

```typescript
type Response = {
  status: number
  headers: {[key: string]: string}
  body?: string
}
```
