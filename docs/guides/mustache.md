---
title: Mustache template with tailcall
---

Whenever you have a string literal used in a directive, it should support mustache template.The mustache templates serve as placeholders, allowing you to insert dynamic content into your configurations. Simply enclose the dynamic content within double curly braces ({{ }}) wherever you need it within the directive.
Learn more about mustache template [here](https://mustache.github.io/)

### Leveraging mustache template

#### Contextual Transformation

To get a list of todos you will run the query `todo` defined below.

> [!NOTE]
> The base url used for this example is https://jsonplaceholder.typicode.com

```graphql
type Query {
  todos: [Todo] @http(path: "/todos")
}
type Todo {
  id: ID!
  title: String!
  completed: Boolean!
}
```

Suppose you now only want the completed todos to be shown.You can accomplish this by utilizing the `completedTodos` query. This modified query includes a `completed` argument, allowing you to specify whether you want to retrieve completed or ongoing todos.

```graphql
type Query {
  todos(completed: Boolean): [Todo] @http(path: "/todos", query: [{key: "completed", value: "{{args.completed}}"}])
}
```

In the changed `completedTodos` query, we have added a way to ask for either completed or ongoing tasks. When you run this `completedTodos` query in the playground, you can ask for only the completed tasks by typing `completed: true` in the box where you normally put details. This way, you'll get a list that includes only the tasks that are finished.

#### Dynamic URL path

Consider the `Post` type with comments as a nested field. You can dynamically generate the URL for fetching comments based on the `id` of the current post:

```graphql
type Post {
  id: ID!
  title: String!
  body: String!
  comments: [Comment] @http(path: "/posts/{{value.id}}/comments")
}
```

In this example `value.id` is used to access the id field of the current Post. When querying for comments for a specific post, the Mustache template `"/posts/{{value.id}}/comments"` dynamically incorporates the id into the URL. For instance, if you run a query for a post with ID 1, the resulting HTTP request path becomes `/posts/1/comments`, fetching comments associated with that post.

#### Customization in Queries

Imagine a scenario where you need to fetch paginated data from an API

```graphql
type Query {
  paginatedPosts(page: Int!): [Post] @http(path: "/posts", query: [{key: "page", value: "{{args.page}}"}])
}
```

when you run the query `paginatedPosts` it accepts a crucial argument, page, enabling the selection of specific pages of posts.Utilizing a Mustache template `/posts?page={{args.page}}`, the query dynamically generates a URL structure. When calling `paginatedPosts(page: 2)`, for instance, this template dynamically forms the URL `/posts?page=2`. This crafted URL then instructs the API to provide the posts located on the second page.

The above example can also be constructed by dynamically incorpating Mustache templates directly into the path field.

```graphql
type Query {
  paginatedPosts(page: Int!): [Post] @http(path: "/posts?page={{args.page}}")
}
```

When executing `paginatedPosts(page: 2)`it constructs a dynamic path: `/posts?page=2`. Here, the Mustache template `/posts?page={{args.page}}` inserts the provided page number directly into the path(in our case 2), guiding the API to retrieve posts from the specified page. This flexibility allows for dynamic path creation, tailored to the required page, through the use of Mustache templates.

#### Dynamic input

Suppose you want to create a post with your input

```graphql
type Mutation {
  createPost(input: PostInput!): Post
    @http(
      method: "POST"
      path: "/posts"
      body: "{{headers.input}}"
      headers: [{key: "Content-type", value: "application/json; charset=UTF-8"}]
    )
}

input PostInput {
  title: String!
  body: String!
  userId: Int!
}
```

The createPost mutation needs specific details like title, body, and userId to make a new post.With Mustache's dynamic templating, the `{{headers.input}}` tag inside the body parameter puts the entire input object into the request. This lets us adjust what data gets sent in the POST request.When we use the mutation with the right title, body, and userId, it makes a POST request, creating a new post with the details. Mustache's flexibility helps customize the data sent through the request.To ensure everything's understood, we set the Content-type header to application/json; charset=UTF-8, signaling that the request sends data in JSON format with UTF-8 encoding.

#### Consistency in Configuration

Consider a case where you're utilizing the same base URL across multiple API endpoints.Mustache templates help us to do this in the simplified form below

```graphql
type Query {
  users: [User] @http(path: "/users", baseURL: "{{env.API_BASE_URL}}")
  posts: [Post] @http(path: "/posts", baseURL: "{{env.API_BASE_URL}}")
}
```

In this scenario, Mustache templates are employed to integrate environment variables( [env variables in tailcall](environment-variables.md) ), specifically `API_BASE_URL`, into the base URL across multiple API endpoints. By referencing {{env.API_BASE_URL}}, the schema standardizes the base URL for both `users` and `posts` endpoints, ensuring any modifications to the environment variable automatically reflect across all API calls involving these queries. This approach enhances maintainability by allowing global changes to the base URL through the environment variable, promoting consistency in configuration management.

Using Mustache templates in Tailcall lets you create flexible and powerful API configurations. They are like tools that help developers build strong and adaptable systems by allowing dynamic adjustments in how APIs are set up. When used wisely and with smart thinking, Mustache templates make it easier to create strong and adaptable systems for your APIs.
