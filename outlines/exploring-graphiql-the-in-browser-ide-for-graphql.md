# Exploring GraphiQL: The In-Browser IDE for GraphQL

**Target Audience:** This article is for all developers and testers who integrate or test GraphQL APIs, whether front-end developers, back-end developers, or QA testers. It's also for anyone else interested in the world of GraphQL APIs.

**Aim:** This article aims to provide developers with an in-depth understanding of GraphiQL, its features, and how to effectively use it to interact with GraphQL APIs. It will cover the fundamentals, and practical applications for utilizing GraphiQL as an in-browser IDE for GraphQL.

## Introduction
Why waste time and effort troubleshooting your GraphQL API directly in your application when there's a more efficient way? Imagine testing and perfecting your queries outside your app, ensuring they work flawlessly before implementation. Sounds ideal, right? With [GraphiQL](https://github.com/graphql/graphiql), you're saving time and gaining control over your development process, empowering you to work more confidently and effectively.

## Prerequisites
To follow along with this guide, you need:
* Fundamental understanding of GraphQL 
* Basic knowledge of schemas, queries, mutations, and resolvers. 
* A web browser
* A GraphQL API endpoint: This is how GraphiQL can communicate with a server to access the data. 

## What is GraphiQL?
* Definition and overview of GraphiQL

## Why use GraphiQL?
* Advantages/benefits of using GraphiQL (things like Improving your request, validating your improvements, and easily debugging requests running into problems)

## Getting Started with the GraphiQL
* Configuring GraphiQL
* Connecting GraphiQL to your Tailcall GraphQL server

## Accessing GraphiQL
For this guide, accessing GraphiQL can be done using any of the methods below:
* Simply head over to [https://tailcall.run/playground/](https://tailcall.run/playground/) and give your graphql server url in input. Note, make sure your graphql server allows cors for Tailcall domain
* After starting your [GraphQL server](https://tailcall.run/docs/#starting-the-graphql-server), head over to the GraphiQL playground link you get


## Exploring the GraphiQL Interface
* Exploring the GraphiQL interface and understanding the functions of the various panes. The application is two-pane by default, but it becomes three when we access the Documentation Explorer.
* Explain each of the main parts in the GraphiQL interface: Query Editor, Variables Editor, Response pane, and Documentation Explorer.
[add screenshot to display the interface of each of these 4 main interface parts]

## Key Features and Capabilities of GraphiQl
Explain the various core features that GraphiQL provides.
* Type-ahead and Auto Completion feature that is aware of the GraphQL type schema you are currently exploring. In addition, explain Context-awareness.
```graphql
# add a simple code that references the type-ahead feature
```

[Screenshot a live view of type-ahead feature in action]

* Live syntax and validation error highlighting.
```graphql
"""
add a simple code that references the live syntax and validation error
"""
```

[Screenshot a live view of validation error highlighting]

* Query history

[Screenshot the history interface]

* Fragments: This feature helps us maintain the Don’t Repeat Yourself (DRY) pattern when dealing with repetitive code in our query. Instead, you can easily merge fragments into a query.
```
# code that references fragments that can be merged to a query
```

* Documentation: GraphiQL generates documentation for your schema, making it easy to understand and explore.

[Screenshot the documentation interface]

## Testing out the Interface
Writing and executing Queries, mutations and Subscriptions
* Writing the query
* Integrating Variables with Your Query
* Utilising fragments to aid query construction
* Executing/Testing the query: Sending requests and handling responses
[take a screenshot and add code for each of the step above]

## Conclusion
* Summary of what we discussed 
* Final thoughts on the subject

## Resources
Additional materials to solidify readers' knowledge
* [GraphiQL documentation](https://github.com/graphql/graphiql)








