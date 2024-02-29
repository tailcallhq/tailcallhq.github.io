---
title: "Sequencing & Parallelism"
---

Building data access layers often involves meticulous orchestration of API calls, but Tailcall simplifies this process. By analyzing your defined schema, it automatically determines the optimal execution strategy, deciding when to sequence calls and when to run them in parallel. This allows you to focus on your core application logic, while Tailcall handles the optimization seamlessly. Now, let's get into some real-world examples to illustrate its functionality.

## Examples

### Example 1: Fetching Comments and Users

Imagine you're building a social media platform and want to display a post with its associated comments and their respective authors.

**Schema:**

```graphql
type Query {
  posts: [Post] @http(path: "/posts")
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
  user: User
    @http(path: "/users", query: [{key: "id", value: "{{value.userId}}"}], matchPath: ["id"], matchKey: "userId")
}

type User {
  id: Int!
  name: String!
}
```

**GraphQL Query:**

```graphql
query getPostsWithUsers {
  posts {
    id
    userId
    title
    body
    user {
      id
      name
    }
  }
}
```

This query retrieves a post along with its associated comments and their corresponding authors. Tailcall recognizes that fetching a comment's author details requires knowing the comment's ID first. Therefore, it automatically fetches the comments in the initial step, then uses those IDs to retrieve the respective users in a sequential manner.

### Example 2: Searching Multiple Posts and Users by ID

Suppose you're building a social media platform and want to display profiles of specific users and their recent posts.

**Schema:**

```graphql
type Query {
  post(id: Int!): Post @http(path: "/posts", matchPath: ["id"], matchKey: "id")
  user(id: Int!): User @http(path: "/users", matchPath: ["id"], matchKey: "id")
}

type Post {
  id: Int!
  userId: Int!
  title: String!
  body: String!
}

type User {
  id: Int!
  name: String!
}
```

**GraphQL Query:**

```graphql
query getUserPosts($userIds: [Int!]!) {
  users(ids: $userIds) {
    id
    name
    posts(ids: $userIds) {
      id
      title
      body
    }
  }
}
```

This query retrieves details of multiple users and their most recent posts based on the provided user IDs. Tailcall intelligently recognizes that fetching user details and their individual posts are independent tasks. As a result, it can potentially execute these requests concurrently for each user.

In summary, Tailcall automates the management of sequence and parallelism in API calls. It analyzes the defined schema to optimize execution, freeing developers from manual intervention.
