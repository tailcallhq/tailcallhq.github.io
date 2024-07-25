---
title: "Exploring GraphiQL: The In-Browser IDE for GraphQL"
sidebar_label: "What is gRPC"
description: ""
image: /images/docs/grpc_logo.png
authors:
  - name: Hunain Ahmed
    title: A freelance software developer, always working on something new and fascinating.
    url: https://github.com/hunxjunedo
    image_url: https://avatars.githubusercontent.com/u/89797440?v=4
hide_table_of_contents: true
slug: exploring-graphqli
tags: [GraphQL, GraphiQL, IDE, debugging]
---

![banner](/images/graphiql/graphiql.png)

Meet GraphiQL, a true life-saver for testing, debugging and having fun with you graphQL server.

<!-- truncate -->

## Introduction

GraphQL development can be a hassle, especially when you need to set up an entire environment just to check if an endpoint is working. The process can be tedious, requiring server configuration, route setup, and writing test queries—all before you even start interacting with your data. This is where GraphiQL comes in, simplifying the whole process and making it way more manageable.

## Why Use GraphiQL?

GraphiQL lets you test out server endpoints without setting up a whole environment. It shines on documentation websites, saving you from writing a playground from scratch, which can be a real time-saver.

![A gif showing color-coding and auto-suggest/complete](/images/graphiql/qry.png)

- **Interactive Interface**: Provides a user-friendly interface to interact with your server. Features like auto-complete and syntax-highlighting help you write queries without needing to write the whole thing by hand.
- **Real-time Feedback**: Receive immediate responses and see results on the go, making debugging much faster.
- **Built-in Documentation Explorer**: No more switching tabs looking for documentation; the built-in explorer lets you see and interact with queries, types, and mutations all in one place.
- **History Tracking**: Access previous queries and results, making it easy to repeat, refine, and learn from past requests.
- **Customizable**: Tailor the GraphiQL setup to match your style. Adjust colors and options to blend with your website. For more information, see [Customization](https://graphiql-test.netlify.app/typedoc/modules/graphiql.html#customize).

## Accessing GraphiQL

You can access GraphiQL using either of these methods:

### Directly through Tailcall Playground

If you have a running GraphQL server and want to interact with it graphically, use [Tailcall Playground](https://tailcall.run/playground/). Open the playground and enter the root endpoint of your server:

![screenshot showing docs loading and endpoint entered](/images/graphiql/docs.png)

**Note:** Ensure your server's CORS policy allows requests from the Tailcall domain.

Once you enter the endpoint, the schema is automatically loaded, and you are good to go.

### By Starting the GraphQL Server with Tailcall

Or, if you use Tailcall for your GraphQL server, the playground URL is provided once you [start the server](https://tailcall.run/docs/#starting-the-graphql-server):

![screenshot showing the output in console](/images/graphiql/logoutput.png)

Simply click on the link, and it will open the Tailcall Playground with the endpoint already set up.

## Exploring the GraphiQL Interface

### Query Editor

Packed with handy features like autocomplete, syntax highlighting, error detection, and code folding, this editor keeps your code neat and saves you tons of time.

### Variables Editor

Easily edit variables with autocomplete based on the ones declared in your query—no more tedious copy-pasting of long variable names in complex queries.

![vars screenshot](/images/graphiql/vars.png)

### Response Pane

Check out the server's response here. It's super useful for handling lots of nested data, with built-in folding to keep things tidy and avoid getting lost in a sea of JSON.

![response pane](/images/graphiql/response.png)

## Setting Headers

1. Access the Headers Panel right beside the variables panel at the bottom

![headers screenshot](/images/graphiql/header.png)

2. Add Custom Headers

```json
{
  "Authorization": "Token myGhToken"
}
```

3. Run Your Query!

## Alternatives

In case GraphiQL doesn’t quite work out for you and you want to try another IDE, here are some options:

- **[Postman](https://learning.postman.com/docs/sending-requests/graphql/graphql-overview/)**
- **[Insomnia](https://docs.insomnia.rest/insomnia/graphql-queries)**
- **[Altair Client](https://altairgraphql.dev/)**

## Conclusion

Wrapping up, we discussed how GraphiQL is an absolute life-saver, especially when you have a server with hundreds of queries returning hundreds of fields of response data. It also makes it super easy to set up a GraphQL playground, like the Tailcall Playground.

It's relieving and exciting to see new open-source projects being launched that make our lives as programmers much easier. Tailcall absolutely boosts server speed and performance, GraphiQL is a total blessing for testing servers in the development stage, and [Voyager](https://graphql-kit.com/graphql-voyager/) is the ultimate tool to graphically view and edit your complex schemas.

Happy coding, and may your queries always be clean and your responses always be quick, see you in the next one! 🚀
