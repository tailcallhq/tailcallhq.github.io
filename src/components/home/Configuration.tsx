import React from "react"
import Heading from "@theme/Heading"
import CodeBlock from "@theme/CodeBlock"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import Link from "@docusaurus/Link"

const Configuration = (): JSX.Element => {
  return (
    <section className="flex flex-col mx-SPACE_04 my-SPACE_10 sm:mx-SPACE_07 lg:flex-row justify-center lg:mx-24 lg:my-SPACE_12 lg:space-x-SPACE_10">
      <div className="max-w-2xl">
        <Heading as="h2" className="text-title-large sm:text-display-tiny lg:text-display-small mb-SPACE_04">
          Get <span className="rounded-lg px-SPACE_02 bg-tailCall-yellow">Started</span>
        </Heading>
        <p className="text-content-small sm:text-content-medium mb-SPACE_11">
          Setup Tailcall via npm to build a high-performance <b>GraphQL API</b> on top of existing REST endpoints.
          Checkout our <Link href="/docs">docs</Link> for detailed tutorials and guides.
        </p>
      </div>
      <div>
        <CodeBlock language="bash">npm i -g @tailcallhq/tailcall</CodeBlock>

        <Tabs>
          {CodeTabItem({code: GRAPHQL_CONFIG, language: "graphql"})}
          {CodeTabItem({code: YML_CONFIG, language: "yaml"})}
          {CodeTabItem({code: JSON_CONFIG, language: "json"})}
        </Tabs>
      </div>
    </section>
  )
}

const CodeTabItem = ({code, language}: {code: string; language: "json" | "yaml" | "graphql"}) => (
  <TabItem value={language} label={language}>
    <CodeBlock
      language={language}
      showLineNumbers={true}
      className="overflow-y-auto h-96 md:min-w-[45rem] min-w-[100%]"
    >
      {code}
    </CodeBlock>
    <CodeBlock language="bash">tailcall start ./app.{language}</CodeBlock>
  </TabItem>
)

export default Configuration

const GRAPHQL_CONFIG = `schema 
@server @upstream(baseURL: "https://jsonplaceholder.typicode.com") {
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
  album: Album @call(steps: [{query: "album", args: {id: "{{.value.albumId}}"}}])
}

type Post {
  body: String
  id: Int
  title: String
  userId: Int
  user: User @call(steps: [{query: "user", args: {id: "{{.value.userId}}"}}])
  comments: [Comment] @call(steps: [{query: "comments"}])
}

type Comment {
  body: String
  email: String
  id: Int
  name: String
  postId: Int
  post: Post @call(steps: [{query: "post", args: {id: "{{.value.postId}}"}}])
}

type Query {
  album(id: Int!): Album @http(path: "/albums/{{.args.id}}")
  albums: [Album] @http(path: "/albums")
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
  user: User @call(steps: [{query: "user", args: {id: "{{.value.userId}}"}}])
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
  posts: [Post] @call(steps: [{query: "posts"}])
  todos: [Todo] @call(steps: [{query: "todos"}])
}

type Album {
  id: Int
  title: String
  userId: Int
  user: User @call(steps: [{query: "user", args: {id: "{{.value.userId}}"}}])
  photos: [Photo] @call(steps: [{query: "photos"}])
}
`

const YML_CONFIG = `server:
  port: 8000
upstream:
  baseURL: https://jsonplaceholder.typicode.com
schema:
  query: Query
types:
  Address:
    fields:
      city:
        type: String
      geo:
        type: Geo
      street:
        type: String
      suite:
        type: String
      zipcode:
        type: String
  Company:
    fields:
      bs:
        type: String
      catchPhrase:
        type: String
      name:
        type: String
  Geo:
    fields:
      lat:
        type: String
      lng:
        type: String
  Photo:
    fields:
      albumId:
        type: Int
      id:
        type: Int
      thumbnailUrl:
        type: String
      title:
        type: String
      url:
        type: String
      album:
        type: Album
        call:
          steps:
            - query: album
              args:
                id: "{{.value.albumId}}"
  Post:
    fields:
      body:
        type: String
      id:
        type: Int
      title:
        type: String
      userId:
        type: Int
      user:
        type: User
        call:
          steps:
            - query: user
              args:
                id: "{{.value.userId}}"
      comments:
        type: Comment
        list: true
        call:
          steps:
            - query: comments
  Comment:
    fields:
      body:
        type: String
      email:
        type: String
      id:
        type: Int
      name:
        type: String
      postId:
        type: Int
      post:
        type: Post
        call:
          steps:
            - query: post
              args:
                id: "{{.value.postId}}"
  Query:
    fields:
      album:
        type: Album
        args:
          id:
            type: Int
            required: true
        http:
          path: /albums/{{.args.id}}
      albums:
        type: Album
        list: true
        http:
          path: /albums
      comment:
        type: Comment
        args:
          id:
            type: Int
            required: true
        http:
          path: /comments/{{.args.id}}
      comments:
        type: Comment
        list: true
        http:
          path: /comments
      photo:
        type: Photo
        args:
          id:
            type: Int
            required: true
        http:
          path: /photos/{{.args.id}}
      photos:
        type: Photo
        list: true
        http:
          path: /photos
      post:
        type: Post
        args:
          id:
            type: Int
            required: true
        http:
          path: /posts/{{.args.id}}
      posts:
        type: Post
        list: true
        http:
          path: /posts
      todo:
        type: Todo
        args:
          id:
            type: Int
            required: true
        http:
          path: /todos/{{.args.id}}
      todos:
        type: Todo
        list: true
        http:
          path: /todos
      user:
        type: User
        args:
          id:
            type: Int
            required: true
        http:
          path: /users/{{.args.id}}
      users:
        type: User
        list: true
        http:
          path: /users
  Todo:
    fields:
      completed:
        type: Boolean
      id:
        type: Int
      title:
        type: String
      userId:
        type: Int
      user:
        type: User
        call:
          steps:
            - query: user
              args:
                id: "{{.value.userId}}"
  User:
    fields:
      address:
        type: Address
      company:
        type: Company
      email:
        type: String
      id:
        type: Int
      name:
        type: String
      phone:
        type: String
      username:
        type: String
      website:
        type: String
      posts:
        type: Post
        list: true
        call:
          steps:
            - query: posts
      todos:
        type: Todo
        list: true
        call:
          steps:
            - query: todos
  Album:
    fields:
      id:
        type: Int
      title:
        type: String
      userId:
        type: Int
      user:
        type: User
        call:
          steps:
            - query: user
              args:
                id: "{{.value.userId}}"
      photos:
        type: Photo
        list: true
        call:
          steps:
            - query: photos
`

const JSON_CONFIG = `
{
  "server": {
    "port": 8000
  },
  "upstream": {
    "baseURL": "https://jsonplaceholder.typicode.com"
  },
  "schema": {
    "query": "Query"
  },
  "types": {
    "Address": {
      "fields": {
        "city": {"type": "String"},
        "geo": {"type": "Geo"},
        "street": {"type": "String"},
        "suite": {"type": "String"},
        "zipcode": {"type": "String"}
      }
    },
    "Company": {
      "fields": {
        "bs": {"type": "String"},
        "catchPhrase": {"type": "String"},
        "name": {"type": "String"}
      }
    },
    "Geo": {
      "fields": {
        "lat": {"type": "String"},
        "lng": {"type": "String"}
      }
    },
    "Photo": {
      "fields": {
        "albumId": {"type": "Int"},
        "id": {"type": "Int"},
        "thumbnailUrl": {"type": "String"},
        "title": {"type": "String"},
        "url": {"type": "String"},
        "album": {
          "type": "Album",
          "call": {
            "steps": [
              {
                "query": "album",
                "args": {"id": "{{.value.albumId}}"}
              }
            ]
          }
        }
      }
    },
    "Post": {
      "fields": {
        "body": {"type": "String"},
        "id": {"type": "Int"},
        "title": {"type": "String"},
        "userId": {"type": "Int"},
        "user": {
          "type": "User",
          "call": {
            "steps": [
              {
                "query": "user",
                "args": {"id": "{{.value.userId}}"}
              }
            ]
          }
        },
        "comments": {
          "type": "Comment",
          "list": true,
          "call": {
            "steps": [
              {
                "query": "comments"
              }
            ]
          }
        }
      }
    },
    "Comment": {
      "fields": {
        "body": {"type": "String"},
        "email": {"type": "String"},
        "id": {"type": "Int"},
        "name": {"type": "String"},
        "postId": {"type": "Int"},
        "post": {
          "type": "Post",
          "call": {
            "steps": [
              {
                "query": "post",
                "args": {"id": "{{.value.postId}}"}
              }
            ]
          }
        }
      }
    },
    "Query": {
      "fields": {
        "album": {
          "type": "Album",
          "args": {"id": "Int!"},
          "http": {"path": "/albums/{{.args.id}}"}
        },
        "albums": {
          "type": "Album",
          "list": true,
          "http": {"path": "/albums"}
        },
        "comment": {
          "type": "Comment",
          "args": {"id": "Int!"},
          "http": {"path": "/comments/{{.args.id}}"}
        },
        "comments": {
          "type": "Comment",
          "list": true,
          "http": {"path": "/comments"}
        },
        "photo": {
          "type": "Photo",
          "args": {"id": "Int!"},
          "http": {"path": "/photos/{{.args.id}}"}
        },
        "photos": {
          "type": "Photo",
          "list": true,
          "http": {"path": "/photos"}
        },
        "post": {
          "type": "Post",
          "args": {"id": "Int!"},
          "http": {"path": "/posts/{{.args.id}}"}
        },
        "posts": {
          "type": "Post",
          "list": true,
          "http": {"path": "/posts"}
        },
        "todo": {
          "type": "Todo",
          "args": {"id": "Int!"},
          "http": {"path": "/todos/{{.args.id}}"}
        },
        "todos": {
          "type": "Todo",
          "list": true,
          "http": {"path": "/todos"}
        },
        "user": {
          "type": "User",
          "args": {"id": "Int!"},
          "http": {"path": "/users/{{.args.id}}"}
        },
        "users": {
          "type": "User",
          "list": true,
          "http": {"path": "/users"}
        }
      }
    },
    "Todo": {
      "fields": {
        "completed": {"type": "Boolean"},
        "id": {"type": "Int"},
        "title": {"type": "String"},
        "userId": {"type": "Int"},
        "user": {
          "type": "User",
          "call": {
            "steps": [
              {
                "query": "user",
                "args": {"id": "{{.value.userId}}"}
              }
            ]
          }
        }
      }
    },
    "User": {
      "fields": {
        "address": {"type": "Address"},
        "company": {"type": "Company"},
        "email": {"type": "String"},
        "id": {"type": "Int"},
        "name": {"type": "String"},
        "phone": {"type": "String"},
        "username": {"type": "String"},
        "website": {"type": "String"},
        "posts": {
          "type": "Post",
          "list": true,
          "call": {
            "steps": [
              {
                "query": "posts"
              }
            ]
          }
        },
        "todos": {
          "type": "Todo",
          "list": true,
          "call": {
            "steps": [
              {
                "query": "todos"
              }
            ]
          }
        }
      }
    },
    "Album": {
      "fields": {
        "id": {"type": "Int"},
        "title": {"type": "String"},
        "userId": {"type": "Int"},
        "user": {
          "type": "User",
          "call": {
            "steps": [
              {
                "query": "user",
                "args": {"id": "{{.value.userId}}"}
              }
            ]
          }
        },
        "photos": {
          "type": "Photo",
          "list": true,
          "call": {
            "steps": [
              {
                "query": "photos"
              }
            ]
          }
        }
      }
    }
  }
}
`
