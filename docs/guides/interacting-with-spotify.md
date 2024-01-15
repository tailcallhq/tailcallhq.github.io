---
title: Interacting with Spotify
---

This guide is aimed to demonstrate how you can interact seamlessly with the Spotify REST API using Tailcall's `@http` operator. Not only that, but we will also be using other operators such as `@cache` to demonstrate how you can harness the power of Tailcall's operators to build a powerful and efficient application.

## Roadmap

We would be building a simple server that would allow us to do the following using Spotify's REST API:

- Get an album's details
- Save an album
- Create a playlist
- Add tracks to a playlist
- Get a user's playlists
- Remove tracks from a playlist

## Getting started

### Set up development environment

First, let's create a new file that we will be using to write our schema. For this guide, we will be using a `.graphql` schema. So, let's create a file named `spotify.graphql`.

You would need to install the [Tailcall CLI](../getting_started/installation.mdx) to proceed any further. Once you have that set up, proceed to the next section.

### Obtaining Spotify Access Token

[This](https://developer.spotify.com/documentation/web-api#getting-started) section of Spotify API's documentation explains how you can obtain an access token. Once you have the access token, we will be using it as a `Bearer` token, which we will be passing in the `Authorization` header of our requests. This token enables spotify to identify the user on whose behalf the request is being made.

## Interacting with the API

### Setting up the types

Once we have got our file set up, we will have to set up the types that we will be using in our schema. For this guide, we will be using the following types:

```graphql showLineNumbers
type PlaylistInput {
  name: String!
  description: String
}

type DeleteTrackInput {
  tracks: [TrackUri]
  snapshot_id: String
}

type AddTrackInput {
  uris: [String]!
}

type TrackUri {
  uri: String!
}

type Playlist {
  id: String!
  name: String!
  description: String
  uri: String!
  href: String
  images: [Image]!
  tracks: Page
}

type Artist {
  id: String!
  name: String!
  type: String!
  uri: String!
}

type Track {
  id: String!
  name: String!
  type: String!
  uri: String!
  href: String
  artists: [Artist]!
}

type Album {
  id: String!
  name: String!
  type: String!
  uri: String!
  href: String
  images: [Image]!
  total_tracks: Int!
  tracks: TrackPage
  artists: [Artist]!
}

type Image {
  height: Int!
  url: String!
  width: Int!
}

interface Page {
  total: Int!
  limit: Int!
  offset: Int!
  previous: String
  next: String
  href: String
}

type TrackPage implements Page {
  items: [Track]!
  total: Int!
  limit: Int!
  offset: Int!
  previous: String
  next: String
  href: String
}

type AlbumPage implements Page {
  items: [Album]!
  total: Int!
  limit: Int!
  offset: Int!
  previous: String
  next: String
  href: String
}
```

You can copy and paste the content into your `spotify.graphql` file.

While some of the types such as `Album`, `Track` may be self explainatory, the other types would become clearer as we use them in our schema. **Note that, these types are a subset of what the Spotify API returns. We have only included the fields that we would be using in our schema.**

### Setting up our server

Tailcall provides us with a [`@server` operator](../operators/server.md) that allows us to set up a GraphQL server. There are a lot of parameters that we can pass to the `@server` operator to configure our server. For this guide, we will be using the following parameters:

- `port`: The port on which we want to run our server
- `graphiql`: Whether we want to enable the GraphiQL interface or not

Additionally, there's also an [`@upstream` operator](../operators/upstream.md) that allows us to specify various HTTP parameters that we would like to use in our schema. We will be using this operator to set up our HTTP client's configuration. We would be using the following parameters:

- `baseURL`: The base URL of the API that we want to interact with
- `timeout`: The timeout for our HTTP requests

All together, our schema would look like this:

```graphql showLineNumbers
schema @server(port: 8000, graphiql: true) @upstream(baseURL: "https://api.spotify.com/v1", timeout: 60) {
  query: Query
}
```

**Note that we don't have a `mutation` field in our schema. We will come to mutations later on, and hence, it's left blank for the moment.**

### [Get an album's details](https://developer.spotify.com/documentation/web-api/reference/albums/get-album/)

We will use this endpoint to get the details of an album. We will be using the `@http` operator to make a `GET` request to the endpoint. The `@http` operator takes in the following arguments:

- `id`: The id of the album
- `accessToken`: The access token that we obtained earlier

```graphql showLineNumbers
  getAlbum(id: String!, access_token: String!): Album
    @http(
      method: "GET"
      path: "/albums/{{args.id}}"
      headers: [{key: "Authorization", value: "Bearer {{args.accessToken}}"}]
    )
```

As you can see, we are passing the `id` and `access_token` to the `@http` operator via our schema's arguments. `@http` internally uses **Mustache Templates** to render the values of the arguments ar runtime.

Next up, we will be starting our server and testing this query. To start the server, run the following command:

```bash
tailcall start spotify.graphql
```

Once the server has started, you can open the GraphQL Playground at `http://localhost:8000` and run the following query:

```graphql showLineNumbers
getAlbum(id: "1OSzM1OWqtTnmIJJQpn62Q", accessToken: "<your token here>") {
    id,
    name,
    tracks {
      items {
          id
          name
          href
        }
      total
    }
    images {
    	url
    },
    artists{
      name
    }
  }
```

The id `1OSzM1OWqtTnmIJJQpn62Q` is for [Charlie Puth's Nine Track Mind](https://open.spotify.com/album/1OSzM1OWqtTnmIJJQpn62Q?autoplay=true). You can replace it with any album ID that you like.

Running this query will return the following response:

```json showLineNumbers
{
  "data": {
    "getAlbum": {
      "id": "1OSzM1OWqtTnmIJJQpn62Q",
      "name": "Nine Track Mind (Deluxe Edition)",
      "tracks": {
        "items": [
          {
            "id": "19f9roe77Hen23e6vJ1iBN",
            "name": "One Call Away",
            "href": "https://api.spotify.com/v1/tracks/19f9roe77Hen23e6vJ1iBN"
          },
          {
            "id": "0DbVHIAldoWzrImJU9WN5y",
            "name": "Dangerously",
            "href": "https://api.spotify.com/v1/tracks/0DbVHIAldoWzrImJU9WN5y"
          }
          //...
        ],
        "total": 15
      },
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d0000b27379ea6a5f1580c0e5aded18e9"
        },
        {
          "url": "https://i.scdn.co/image/ab67616d00001e0279ea6a5f1580c0e5aded18e9"
        },
        {
          "url": "https://i.scdn.co/image/ab67616d0000485179ea6a5f1580c0e5aded18e9"
        }
      ],
      "artists": [
        {
          "name": "Charlie Puth"
        }
      ]
    }
  }
}
```

### [Getting tracks of an album](https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks)

Yet another example of fetching, this time, we will shift our focus on how we can handle pagination with Tailcall. The `tracks` field of the `Album` type returns a `TrackPage` type. This type is an implementation of the `Page` interface. The `Page` interface is implemented by both `TrackPage` and `AlbumPage` types. This allows us to use the `Page` interface as a return type for our `tracks` field. This is how the query schema looks like:

```graphql showLineNumbers
    getTracksOfAlbum(id: String!, limit: Int!, offset: Int!, accessToken: String!): TrackPage
        @http(
            method: "GET"
            path: "/albums/{{args.id}}/tracks?limit={{args.limit}}&offset={{args.offset}}"
            headers: [{ key: "Authorization", value: "Bearer {{args.accessToken}}" }]
        )
```

As you can see, we are passing the `limit` and `offset` arguments to the `@http` operator. This allows us to control the number of items that we want to fetch and the offset from which we want to fetch the items. This is how the query looks like:

```graphql showLineNumbers
  getTracksOfAlbum(
    id: "1OSzM1OWqtTnmIJJQpn62Q",
    limit: 5,
    offset: 0,
    accessToken: "<your token here>") {
    total,
    items {
    	name
  	}
  }
```

Here, we are fetching 5 items (`limit=5`) per page, and we are starting with the very first (`offset=0`) element in the database.

The response to this query looks like this:

```json showLineNumbers
{
  "data": {
    "getTracksOfAlbum": {
      "total": 15,
      "items": [
        {
          "name": "One Call Away"
        },
        {
          "name": "Dangerously"
        },
        {
          "name": "Marvin Gaye (feat. Meghan Trainor)"
        },
        {
          "name": "Losing My Mind"
        },
        {
          "name": "We Don't Talk Anymore (feat. Selena Gomez)"
        }
      ]
    }
  }
}
```
