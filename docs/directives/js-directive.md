---
title: "@js"
---

The `@js` directive allows you to use JavaScript functions to resolve fields in your GraphQL schema. This can be useful
for custom data transformations or complex field resolutions.

## Usage

The `@js` directive is used to specify a JavaScript function that will resolve the value of a field. The directive takes
a single argument, `name`, which is the name of the JavaScript function to be used.

### Syntax

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
  @upstream(
    baseURL: "http://jsonplaceholder.typicode.com"
    httpCache: true
  ) {
  query: Query
}

type Query {
  posts: [Post] @http(path: "/posts")
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
