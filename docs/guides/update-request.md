---
title: Update Request
---

Tailcall enables the modification of upstream requests through JavaScript scripting. This capability is particularly beneficial for altering requests prior to their dispatch to the destination service.

### How to Implement

To leverage this functionality, a JavaScript function named `onEvent` must be crafted. This function serves as middleware, allowing for the interception and modification of the request. Below is the function's prototype:

```javascript
function onEvent(event) {
  // Check if the event contains a request
  if (event.message.request) {
    // Implement request modifications here
  }
  // Additional processing can be done here
  return event; // Ensure the modified event is returned
}
```

The `event` parameter is structured as follows:

```typescript
// Definition of the HTTP request structure
type HttpRequest = {
    method: string;
    url: string;
    headers: {[key: string]: string};
};

// Definition of the HTTP response structure
type HttpResponse = {
    status: number;
    headers: {[key: string]: string};
    body: ArrayBuffer | Uint8Array;
};

// Message structure can either be a request or a response
type Message = {request: HttpRequest} | {response: HttpResponse};

// Event interface encapsulating the message, optionally including an identifier
interface Event {
    message: Message;
    id?: number;
}
```

The `onEvent` function is tasked with returning the `event` object post-modification. For example:

```javascript
function onEvent(event) {
  // Check if the event encapsulates a request
  if (event.message.request) {
    // Retrieve the current 'app-id' header value
    let appID = event.message.request.headers['app-id'];
    // Conditionally modify the 'app-id' header value
    if (appID === '123') {
      event.message.request.headers['app-id'] = '456'; // Update the header value
    }
  }
  return event; // Return the potentially modified event object
}
```

To apply this script, save the code into a file named `update-request.js` and specify the file path within the Tailcall configuration file using the `Script` directive as shown below:

```graphql
schema @link(type: Script, src: "scripts/update-request.js") {
  query: Query
}
```

This configuration ensures that the `app-id` request header is updated from '123' to '456' for all outgoing requests managed by Tailcall.

This feature empowers developers to dynamically alter requests.

:::tip The `onEvent` function is applied for every request, If you want to apply the modification for a specific request, you can use the `url` property of the `HttpRequest` object to filter the request.
