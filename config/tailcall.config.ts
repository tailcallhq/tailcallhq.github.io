import { TailcallConfig } from '@tailcallhq/tailcall';

const config: TailcallConfig = {
  schema: `
    schema @server @upstream(baseURL: "https://jsonplaceholder.typicode.com") {
      query: Query
    }

    type Address {
      city: String
      geo: Geo
      street: String
      suite: String
      zipcode: String
    }

    type Company {
      bs: String
      catchPhrase: String
      name: String
    }

    type Geo {
      lat: String
      lng: String
    }

    type Photo {
      albumId: Int
      id: Int
      thumbnailUrl: String
      title: String
      url: String
    }

    type Post {
      body: String
      id: Int
      title: String
      userId: Int
    }

    type Comment {
      body: String
      email: String
      id: Int
      name: String
      postId: Int
    }

    type Query {
      comment(id: Int!): Comment @http(path: "/comments/{{.args.id}}")
      comments: [Comment] @http(path: "/comments")
      photo(id: Int!): Photo @http(path: "/photos/{{.args.id}}")
      photos: [Photo] @http(path: "/photos")
      post(id: Int!): Post @http(path: "/posts/{{.args.id}}")
      posts: [Post] @http(path: "/posts")
      todo(id: Int!): Todo @http(path: "/todos/{{.args.id}}")
      todos: [Todo] @http(path: "/todos")
      user(id: Int!): User @http(path: "/users/{{.args.id}}")
      users: [User] @http(path: "/users")
    }

    type Todo {
      completed: Boolean
      id: Int
      title: String
      userId: Int
    }

    type User {
      address: Address
      company: Company
      email: String
      id: Int
      name: String
      phone: String
      username: String
      website: String
    }
  `,
};

export default config;
