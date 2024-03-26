---
title: Environment Variables
---

Environment variables are key-value pairs stored in our operating systems. Most of them come by default, and we can also create our own. They store information used by our operating system or other programs. For example, the `PATH` variable stores a list of directories the operating system searches when we run a command in the terminal. The `HOME` variable stores the path to our home directory.

These variables also serve in software development for storing configuration values.

## Need for Environment Variables

Applications rely on external tools, authentication methods, and configurations. For proper functioning, our code needs to access these values.

Consider a scenario of [JWT authentication](https://jwt.io/). When signing tokens for our users, we need:

- **Expiry time**: The duration after which the token expires.
- **Secret key**: The key for encrypting the token.
- **Issuer**: The token issuer, often the organization's name.

There are two ways to manage this:

1. **Hardcode the values in our code**: \
   This approach, while simple, poses a massive security risk by exposing sensitive information and requires code changes and application redeployment for updates.

2. **Store the values in environment variables**: \
   Storing sensitive values in the OS of the server running your application allows runtime access without code modifications, keeping sensitive information secure and simplifying value changes.

## Environment Variables

With Tailcall, you can seamlessly integrate environment variables into your GraphQL schema. Tailcall supports this through a `env` [Context](context.md) variable. All directives share this Context, allowing you to resolve values in your schema.

Example schema:

```graphql showLineNumbers
type Query {
  users: [User]!
    @http(
      baseUrl: "https://jsonplaceholder.typicode.com"
      path: "/users"
    )
}
```

Here, we fetch a list of users from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API. The `users` field will contain the fetched value at runtime. This works fine, but what if we want to change the API endpoint? We would need to update the code and redeploy the application, which is cumbersome.

We can address this issue using environment variables. Replace the API endpoint with an environment variable, allowing us to change the variable's value without altering our codebase.

```graphql showLineNumbers
type Query {
  users: [User]!
    @http(baseUrl: "{{env.API_ENDPOINT}}", path: "/users")
}
```

Here, you must set `API_ENDPOINT` as an environment variable on the device running your server. Upon startup, the server retrieves this value and makes it accessible through the `env` Context variable.

This approach allows us to change the API endpoint without modifying our codebase. For instance, we might use different API endpoints for development (`stage-api.example.com`) and production (`api.example.com`) environments.

Remember, environment variables are not limited to the `baseUrl` or `@http` directive. You can use them throughout your schema, as a Mustache template handles their evaluation.

Here's another example, using an environment variable in the `headers` of `@grpc`:

```graphql showLineNumbers
type Query {
  users: [User]
    @grpc(
      service: "UserService"
      method: "ListUsers"
      protoPath: "./proto/user_service.proto"
      baseURL: "https://grpc-server.example.com"
      headers: [
        {key: "X-API-KEY", value: "{{env.API_KEY}}"}
      ]
    )
}
```

## Security Aspects and Best Practices

Environment variables help reduce security risks, but it's crucial to understand that they do not remove these risks entirely because the values are in plain text. Even if configuration values are not always highly sensitive, there is still a potential for compromising secrets.
To ensure your secrets remain secure, consider the following tips:

- **Use a `.env` file**: \
  It's a common practice to create a `.env` file in your project's root directory for storing all environment variables. Avoid committing this file to your version control system; instead, add it to `.gitignore` to prevent public exposure of your secrets. For clarity and collaboration, maintain a `.env.example` file that enumerates all the necessary environment variables for your application, thereby guiding other developers on what variables they need to set.

  Within Tailcall (or in other environments), you can make use of this `.env` file by exporting its key-value pairs to your operating system.

  For example, if your `.env` file looks like this:

  ```bash
  API_ENDPOINT=https://jsonplaceholder.typicode.com
  ```

  Export it to your OS with:

  ```bash
  export $(cat .env | xargs)
  ```

  On Windows:

  ```powershell
  Get-Content .env | Foreach-Object { [System.Environment]::SetEnvironmentVariable($_.Split("=")[0], $_.Split("=")[1], "User") }
  ```

  After this, you can access `API_ENDPOINT` in your codebase.

- **Use Kubernetes Secrets**: \
  When deploying your application with Kubernetes, use its [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) feature to manage environment variables. This approach ensures your secrets remain private and are not embedded in your codebase, while also making it easier to update values as necessary.

- **Store Secrets Through Cloud Provider GUIs**: \
  For deployments using a cloud provider, use their GUI for environment variable management. These interfaces are intuitive and practical for containerized applications that automatically scale.

Following these practices ensures effective and secure management of your environment variables.
