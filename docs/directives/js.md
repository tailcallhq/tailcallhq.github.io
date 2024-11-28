---
title: "@js"
description: The @js directive allows you to use JavaScript functions to resolve fields in your GraphQL schema.
slug: ../js-directive
---

The `@js` directive is defined as follows:

```graphql title="Directive Definition" showLineNumbers
directive @js(
  """
  Name of the JavaScript function to be used as resolver
  """
  name: String!
) on FIELD_DEFINITION
```

The `@js` directive allows you to use JavaScript functions to resolve fields in your GraphQL schema. This can be useful for custom data transformations or complex field resolutions.

## Usage

The `@js` directive is used to specify a JavaScript function that will resolve the value of a field. The directive takes
a single argument, `name`, which is the name of the JavaScript function to be used.

## Syntax

```graphql showLineNumbers
fieldName: FieldType @js(name: "functionName")
```

## Example

Let's consider a `foo.js` file which contains a `resolve` function:

```js
function resolve(val) {
  let json = JSON.parse(val)
  return JSON.stringify(json.id)
}
```

Here is an example of how the `@js` directive is used within a GraphQL schema:

```gql showLineNumbers
schema
  @link(type: Script, src: "./scripts/foo.js")
  @server(port: 8000)
  @upstream(httpCache: true) {
  query: Query
}

type Query {
  posts: [Post]
    @http(url: "https://jsonplaceholder.typicode.com/posts")
}

type Post {
  id: Int!
  idx: Int! @js(name: "resolve")
  userId: Int!
  title: String!
  body: String!
}
```

## Error Handling

When using the `@js` directive, it is important to handle errors within your JavaScript functions. For example, you can use try-catch blocks to catch and handle any errors that occur during the resolution process.

```javascript
function resolve(val) {
  try {
    let json = JSON.parse(val)
    return JSON.stringify(json.id)
  } catch (error) {
    console.error("Error resolving value:", error)
    throw new Error("Failed to resolve value")
  }
}
```

## Performance Considerations

When using the `@js` directive, keep in mind that JavaScript functions can introduce performance overhead, especially if they perform complex operations or are called frequently. To minimize performance impact, ensure that your functions are optimized and avoid unnecessary computations.

## Combining Directives

The `@js` directive can be used in combination with other [resolvable directives](../directives.md#resolvable-directives), with results merged deeply. This allows for powerful and flexible resolver configurations.

For more details, see [Directives Documentation](../directives.md).
