---
title: Optimizing Client Performance
description: "Learn how to tune your client for optimal performance. Our guide provides essential tips and techniques to enhance responsiveness and efficiency in your applications. Start optimizing your client today for a faster, smoother user experience."
slug: client-performance-tuning
sidebar_label: Client Performance
---

### HTTP (Hypertext Transfer Protocol)

HTTP, the most widely used protocol for communication between clients and servers, carries your request to the server and then brings back the data to your client. TCP forms the foundation of HTTP.

### HTTP Versions: 1.x, 2, and 3

Each version has enhanced HTTP's flexibility and performance.

- **HTTP/1.x**: Creates a separate TCP connection for each HTTP request (or reuses one sequentially).
- **HTTP/2**:
  Introduces multiplexing to allow concurrent sending of requests and responses over a single TCP connection, enhancing performance.
- **HTTP/3**:
  Employs QUIC instead of TCP, further reducing connection setup time and improving packet loss and network change handling.

:::note
The server determines the HTTP version. Thus, if the server supports HTTP/1, the client cannot make an HTTP/2 request, even if compatible. If the client supports HTTP/1, the server should, according to the specification, downgrade to serve the request over HTTP/1.
:::

### TCP (Transmission Control Protocol)

TCP ensures the data sent and received over the internet reaches its destination and in order.

TCP, like dialing a number before talking on the phone, establishes a connection between the client and server before exchanging data using HTTP. This guide will show how to tune Tailcall's HTTP client to enhance this connection's performance. Learn more about TCP in detail [here](https://www.techtarget.com/searchnetworking/definition/TCP).

### QUIC (Quick UDP Internet Connections)

Developed by Google, QUIC aims to make web communications faster and more efficient than TCP. It reduces connection establishment time, handles packet loss better, and supports multiplexed streams over a single connection, preventing a slow request from holding up others. HTTP/3 uses QUIC.
Learn more about QUIC in detail [here](https://blog.cloudflare.com/the-road-to-quic).

### Why Managing Connections is Important?

- **Performance Overhead**:
  Establishing TCP connections with HTTP/1.x consumes time due to the complete TCP handshake for each new connection. This process adds latency and increases system resources.

- **Limited Ports on Client Side**:
  A unique combination of an IP address and a port number is necessary for each TCP connection from a client. With each new connection, the IP remains the same because the client is the same, but a new port gets used. The number of available ports on a machine is 65535. These ports get shared among all processes, and not all are available for use. Excessive creation of new connections can lead to port exhaustion on the client side, preventing new connections and causing system failures across running processes.

  :::tip
  Use `lsof` and `netstat` commands to check the ports to process mapping.
  :::

Connection pooling mitigates these issues by reusing existing connections for requests, reducing connection establishment frequency (and thus handshake overhead) and conserving client-side ports. This approach enhances application performance by minimizing the resources and time spent on managing connections.

## Tuning HTTP Client

Tailcall uses connection pooling by default and sets up with default tuning suitable for most use cases. You might need to further tune the HTTP client to improve your application's performance. Tailcall DSL provides a directive named [`@upstream`](/docs/directives/#upstream-directive) for this purpose.

:::note
Connection pooling optimizes HTTP/1. Since HTTP/2 and HTTP/3 support multiplexing, pooling enabled does not noticeably affect performance.
:::

When using HTTP/1.x, tune the connection pool with the following parameters:

### poolMaxIdlePerHost

`poolMaxIdlePerHost` specifies the allowed number of idle connections per host, defaulting to `60`. Example:

```graphql showLineNumbers
schema
  @upstream(
    # highlight-start
    poolMaxIdlePerHost: 60
    # highlight-end
  ) {
  query: Query
}
```

Too idle connections can unnecessarily consume memory and ports, while too few might cause delays as new connections need frequent establishment. `poolMaxIdlePerHost` ensures judicious use of network and memory resources, avoiding wastage on seldom-used connections.

For applications connecting to hosts, set this value lower to keep connections available for other hosts. Conversely, if you have hosts and all requests must resolve through them, maintain a higher value for this setting.

### tcpKeepAlive

`tcpKeepAlive` keeps TCP connections alive for a duration, during inactivity, by periodically sending packets to the server to check if the connection remains open. In connection pooling, `tcpKeepAlive` maintains reusable connections in a ready-to-use state. This setting is useful for long-lived connections, preventing -lived connections, preventing the client from using a connection the server has closed due to inactivity. Without `tcpKeepAlive`, connections in the pool might get dropped by the server or intermediate network devices (like firewalls or load balancers). When your client tries to use such a dropped connection, it would fail, causing delays and errors. Keeping connections alive and monitored means you can efficiently reuse them, reducing the overhead of establishing new connections frequently.

Tailcall provides a parameter named `tcpKeepAlive` for the upstream which defaults to 5 seconds. Example:
schema

```graphql
@upstream (
# highlight-start
  tcpKeepAlive: 300
# highlight-end
) {
query: Query
}

```

### connectTimeout

`connectTimeout` specifically applies to the phase where your client attempts to establish a connection with the server. When making a connection request, the client tries to resolve the DNS, complete the SSL handshake, and establish a TCP connection. In environments where pods are frequently created and destroyed, maintaining a low `connectTimeout` is crucial to avoid unnecessary delays. In systems using connection pooling, the system aborts the attempt if it cannot establish a connection within the `connectTimeout` period. This approach prevents indefinite waiting for a connection to establish, which could cause delays and timeouts.

Tailcall offers a `connectTimeout` parameter to set the connection timeout in seconds for the HTTP client, defaulting to 60 seconds. Example:

```graphql showLineNumbers
schema
  @upstream(
    # highlight-start
    connectTimeout: 10
    # highlight-end
  ) {
  query: Query
}
```

In summary, maximizing HTTP client performance requires understanding the underlying protocols and configuring client settings through testing. This ensures efficient, robust, and high-performing client-server communication, crucial for the smooth operation of modern web applications.
