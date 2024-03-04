---
title: Leveraging HTTP/2
---

HTTP/2 is a modern protocol that significantly improves web performance by introducing features like multiplexing, header compression, and more efficient connection handling.

Tailcall seamlessly supports HTTP/2 on both the server (ingress) and client (egress) sides. This means that Tailcall facilitates the utilization of HTTP/2 protocol for both incoming requests to your server and outgoing requests from your server to other services.

### Ingress Side Configuration

Tailcall's @http operator facilitates integration with HTTP/2 for server-side configurations. By specifying HTTP2 in the http field of the schema definition, you enable the utilization of the HTTP/2 protocol:

```graphql showLineNumbers
schema @server(port: 8000, graphiql: true, http: HTTP2, cert: "./cert.pem", key: "./key.pem") {
  query: Query
  mutation: Mutation
}
```

- http: Indicates the version of HTTP to be used, with HTTP2 signifying the usage of the HTTP/2 protocol.
- cert: Points to the path of the certificate file for HTTPS, ensuring secure communication over HTTP/2.
- key: Refers to the path of the key file essential for secure encryption and decryption of data.

:::note
When you set up Tailcall to use HTTP/2, it's important to include certificates (`cert` and `key`) to make sure communication happens securely via HTTPS. These certificates play a vital role in encrypting and decrypting data, guaranteeing that information remains private and unaltered during its transfer.
:::

## Creating Certificates

Certificates (cert.pem and key.pem) are necessary for secure communication over HTTPS, including when utilizing HTTP/2. They encrypt and decrypt data, ensuring its privacy and integrity during transmission.

To generate the necessary certificates (**cert.pem and key.pem**) for Tailcall's HTTP/2 configuration, you can use tools like [OpenSSL](https://www.openssl.org/source/)

### Local Certificate Generation

1. **Install OpenSSL**: If you don't have OpenSSL installed on your system, you can download and install it from the official OpenSSL website.

2. **Generate private key**

```bash
openssl genpkey -algorithm RSA -out key.pem
```

3. **Generate certificate signing request**

```bash
openssl req -new -key key.pem -out csr.pem
```

4. **Generate self-signed certificate**

```bash
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

5. **Clean up intermediate files**

```bash
rm csr.pem
```

By following these steps, you can create the necessary certificates locally for use with Tailcall's HTTP/2 configuration, ensuring secure communication between your server and clients.

## Egress Side Implementation

On the egress side, Tailcall's @http operator provides granular control over outgoing requests, enabling efficient utilization of HTTP/2 features:

```graphql showLineNumbers
type Query {
  users: [User] @http(path: "/users", baseURL: "https://jsonplaceholder.typicode.com")
}
```

- path: Specifies the API endpoint for the outgoing request.
- baseURL: Defines the base URL of the API. If omitted, it defaults to the base URL specified by the @upstream operator.

Tailcall autonomously determines the most suitable communication method when interfacing with services that support HTTP/2. Thus, HTTP/2 on the egress side is automatically adopted by Tailcall if the upstream service supports it, requiring no additional manual configuration or intervention.

## Conclusion

Leveraging HTTP/2 with Tailcall empowers applications with enhanced performance, reduced latency, and efficient handling of inbound and outbound requests. By properly configuring and utilizing @http directives, the full potential of HTTP/2 features can be harnessed for seamless communication with APIs. Additionally, Tailcall simplifies HTTP/2 adoption on both the server and client sides, providing automatic support where applicable.
