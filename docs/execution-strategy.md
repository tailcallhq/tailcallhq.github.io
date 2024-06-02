---
title: Sequencing & Parallelism
description: "Tailcall revolutionizes data access layer development by automating API call orchestration, ensuring optimal execution strategies through advanced sequencing and parallelism techniques."
slug: data-access-optimization
sidebar_label: Data Access Optimization
---

Building data access layers often involves meticulous orchestration of API calls, but Tailcall simplifies this process. By analyzing your defined schema, it automatically determines the optimal execution strategy, deciding when to sequence calls and when to run them in parallel. This allows you to focus on your core application logic, while Tailcall handles the optimization seamlessly. Now, let's get into some real-world examples to illustrate its functionality.

## Examples

### Example 1: Fetching a Specific User and Their Posts

Imagine you're building a blog and want to display a specific user's profile page containing their information and all their posts.

**Schema:**

```graphql
type Query {
  # Retrieve a specific user by ID
  user(id: Int!): User @http(path: "/users/{{.value.id}}")
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!

  # Access user's posts using their ID in the path
  posts: [Post] @http(path: "/users/{{.value.id}}/posts")
}

type Post {
  id: Int!
  title: String!
  body: String!
}
```

**GraphQL Query:**

```graphql
query getUserAndPosts($userId: Int!) {
  # Fetch the user by ID
  user(id: $userId) {
    id
    name
    username
    email
    # Sequentially retrieve all posts for the fetched user
    posts {
      id
      title
      body
    }
  }
}
```

Tailcall understands that retrieving the user's posts depends on knowing the user's ID, which is obtained in the first step. Therefore, it automatically fetches the user first and then uses their ID to retrieve all their posts in a sequential manner.

### Example 2: Searching Multiple Posts and Users by ID

Suppose you're building a social media platform and want to display profiles of specific users and their recent posts.

**Schema:**

```graphql
type Query {
  # Retrieve users from the "/users" endpoint
  users: [User] @http(path: "/users")
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!

  # Access user's posts using their ID in the path
  posts: [Post] @http(path: "/users/{{.value.id}}/posts")
}

type Post {
  id: Int!
  title: String!
  body: String!
}
```

**GraphQL Query:**

```graphql
query getUsersWithLatestPosts {
  # Retrieve all users
  users {
    id
    name
    username
    email
    # Access user's posts through the nested field
    posts {
      id
      title
      body
    }
  }
}
```

This query retrieves details of multiple users and their most recent posts based on the provided user IDs. Tailcall recognizes that fetching user details and their individual posts are independent tasks. As a result, it can execute these requests concurrently for each user.

### Example 3: Fetching Posts with Users

Imagine you're building a social media platform and want to display a list of posts with each post's author. Traditionally, you might write a query that retrieves all posts and then, for each post, make a separate request to fetch its corresponding user. This approach leads to the N+1 problem, where N represents the number of posts, and 1 represents the additional request per post to retrieve its user.

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
  user: User @http(path: "/users/{{.value.userId}}")
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

Tailcall analyzes the schema and recognizes that fetching user details for each post is independent. It can potentially execute these requests to `/users/{{.value.userId}}` concurrently, fetching user data for multiple posts simultaneously.

In summary, Tailcall automates the management of sequence and parallelism in API calls. It analyzes the defined schema to optimize execution, freeing developers from manual intervention.
