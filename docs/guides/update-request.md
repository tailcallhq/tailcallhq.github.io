---
title: Update Request
---

Tailcall enables the modification of upstream requests through JavaScript scripting. This capability is beneficial for altering requests prior to their dispatch to the destination service.

### How to Implement

To leverage this functionality, a JavaScript function named `onRequest` must be created. This function serves as middleware, allowing for the interception and modification of the request. Below is the function's prototype:

```javascript
function onRequest({request}) {
  // Filter the request and apply modifications
  if (request.url.startsWith("https://api.example.com")) {
    // Implement request modifications here
  }
  // Additional processing can be done here
  return {request} // Ensure the modified request is returned
}
```

The `request` parameter is structured as follows:

```typescript
// Definition of the HTTP request structure
type HttpRequest = {
  method: string
  url: string
  headers: {[key: string]: string}
  body?: Uint8Array | ArrayBuffer
}
```

The `onRequest` function is tasked with returning the `HttpRequest` object post-modification. For example:

```javascript
function onRequest({request}) {
  // select the request you want to modify
  if (request.url.startsWith("https://api.example.com")) {
    // Retrieve the current 'app-id' header value
    let appID = request.headers["app-id"]
    // Conditionally modify the 'app-id' header value
    if (appID === "123") {
      request.headers["app-id"] = "456" // Update the header value
    }
  }
  return {request} // Return the modified request 
}
```

To apply this script, save the code into a file named `update-request.js` and specify the file path within the Tailcall configuration file using the `@link` directive as shown below:

```graphql
schema @link(type: Script, src: "scripts/update-request.js") {
  query: Query
}
```

This configuration ensures that the `app-id` request header is updated from '123' to '456' for requests matching the filter criteria.

This feature empowers developers to dynamically alter requests. For instance, you can modify the request headers, body, or URL based on specific conditions or requirements.