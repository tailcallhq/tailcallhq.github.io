import {ApolloClient, InMemoryCache, HttpLink, ApolloLink} from "@apollo/client"
import {onError} from "@apollo/client/link/error"
import {HASHNODE_PAT} from "../utils/constants"

const httpLink = new HttpLink({
  uri: "https://gql.hashnode.com/",
  headers: {
    Authorization: HASHNODE_PAT!,
  },
})

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${JSON.stringify(path)}`,
      ),
    )
  if (networkError) {
    console.log(`[Network error]: ${JSON.stringify(networkError)}`)
  }
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})
