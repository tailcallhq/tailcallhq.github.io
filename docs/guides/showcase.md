---
title: Showcase
---

The `@server` directive's `showcase` option allows for hands-on experimentation with server configurations in a controlled environment. This feature simplifies the process of exploring and testing different settings.

#### Use cases

- **Quick Experimentation**: Enables experimenting with random configurations hosted, without the need to restart the server or affect existing setups.

#### Example Usage:

`Base schema`
```graphql showLineNumbers
schema @server(showcase: true) {
  query: Query
}

type User {
  notId: Int
  notName: String
}

type Query {
  notUser: User @http(path: "/users/1", baseURL: "http://jsonplaceholder.typicode.com")
}
```

To test it out, append `/showcase/graphql?config=YOUR_CONFIG_URL` to your GraphQL base URL when querying the data.

![Showcase](/images/docs/showcase.png)

The above example shows loading a schema file from Tailcall's Github repository [examples](https://github.com/tailcallhq/tailcall/tree/main/examples) and querying it.


#### Performance and Security Considerations

- **Performance Impact**: The `showcase` feature prioritizes flexibility and ease of testing over speed, leading to slower response times due to the overhead of dynamically applying configurations.
- **Security Risk**: There's a potential security risk as it may allow unauthorized access to files and environment variables.
- **Not for Production**: Due to these concerns, this mode is not recommended for production environments.
