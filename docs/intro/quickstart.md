---
sidebar_position: 1
title: Quick Start
slug: /
---

### Requirements

To run Tailcall, you need to have Java 11 or above installed on your machine.

### Installation

1. Download the latest release of Tailcall from <a href="https://github.com/tailcallhq/monotail/releases/latest" target="_blank">the latest release page </a>. The release is named `tailcall-v<x.y.z>.zip` where `x.y.z` is the latest release version.
2. Create a directory and unzip the file in the directory. The unzipped file contains the following directory structure -

   ```
   .
   ├── bin
   │   ├── tailcall
   │   ├── tailcall_cli_main
   │   ├── tailcall_cli_main.bat
   │   ├── tailcall_server_main
   │   ├── tailcall_server_main.bat
   │   └── tailcall.bat
   └── lib
       ├── cli-assembly-0.1.0-SNAPSHOT.jar
       └── server-assembly-0.1.0-SNAPSHOT.jar
   ```

3. `bin` contains the executable files for the tailcall server and the tailcall command line interface (cli)

Tailcall consists of two parts, the `CLI` or Command Line Interface, and the `Server`.
The CLI is used to define, validate and register a composed api definition with the server, and once registered, graphql queries can be made to the server. An instance of the server is running in ephemeral mode on `https://cloud.tailcall.run/graphql`.

### Compose REST apis into a GraphQL schema

For our first example, we are going to compose a graphql schema from the REST apis at <a href="https://jsonplaceholder.typicode.com/" target="_blank">https://jsonplaceholder.typicode.com/</a>, a free online REST api with some fake data.
We will use the api at `https://jsonplaceholder.typicode.com/users` to get a list of users, and `https://jsonplaceholder.typicode.com/users/:id/posts` to get the posts for each user, and compose them into a single GraphQL schema.

#### Create the schema definition

Create a file called `jsonplaceholder.graphql` and paste the following contents into it.

```graphql showLineNumbers
schema @server(baseURL: "http://jsonplaceholder.typicode.com") {
  query: Query
}

type Query {
  users: [User] @http(path: "/users")
}

type User {
  id: Int!
  name: String!
  username: String!
  email: String!
  email: String!
  posts: [Post] @http(path: "/users/{{value.id}}/posts")
}

type Post {
  id: Int!
  title: String!
  body: String!
}
```

In the above schema definition, we

1. Define a base URL for the resources that will be composed together
2. Define a query to query all users
3. Define the data types `User` and `Post`
4. Specify how to fetch the `posts` for a user

#### Register the schema definition with the server

Now, again in the `bin` directory, run the following command to register this schema with the server. Specify the full path to the `jsonplaceholder.graphql` file that you created above.

```shell
./tailcall_cli_main publish jsonplaceholder.graphql
```

If the command succeeds, you should see output like the following below.

```shell
Deployment was completed successfully.
Digest:     4ee03fde640e2f4c3e65c570971cc8b9ef6964926a79eed884eca6f864a43165
Endpoints:  2
Unsafe:     0
Playground: http://cloud.tailcall.run/graphql/4ee03fde640e2f4c3e65c570971cc8b9ef6964926a79eed884eca6f864a43165.
N + 1:      1
```

The server registers the schema, and makes it available for querying at the playground URL in the output. Open the **playground URL** in a new tab in your browser. You can query the composed schema here.

#### Query the registered schema

Lets try the following query, to get all the users, and the title of each post of each user.

```graphql showLineNumbers
query {
  users {
    id
    name
    posts {
      title
    }
  }
}
```

You should see output like the following:

```json showLineNumbers
{
  "data": {
    "users": [
      {
        "id": 1,
        "name": "Leanne Graham",
        "posts": [
          {
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
          },
          ...
        ]
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "posts": [
          {
            "title": "et ea vero quia laudantium autem"
          },
          {
            "title": "in quibusdam tempore odit est dolorem"
          },
          ...
        ]
      }
    ]
  }
}
```

You can now add additional fields, and compose more queries together!
