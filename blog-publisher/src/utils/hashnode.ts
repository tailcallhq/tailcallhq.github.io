import {
  GetPostsDocument,
  PublishPostInput,
  PublishPostDocument,
  UpdatePostInput,
  UpdatePostDocument,
  CreateDraftDocument,
  CreateDraftInput,
  PublishDraftDocument,
  PublishDraftInput,
} from "../../generated/graphql"
import {client} from "../client/client"
import {HASHNODE_PUBLICATION_ID} from "./constants"

const getPosts = async (publicationId: string, first: number, after?: string) => {
  const {data, errors} = await client.query({
    query: GetPostsDocument,
    variables: {
      publicationId,
      first,
      after,
    },
  })

  if (errors) {
    console.error(errors)
  }

  return data?.publication?.posts
}

const findPostByTitle = async (title: string) => {
  let cursor: string | null | undefined
  const pageSize = 50

  while (true) {
    const result = await getPosts(HASHNODE_PUBLICATION_ID, pageSize, typeof cursor === "string" ? cursor : undefined)

    if (!result) break

    const post = result.edges.find((edge) => edge.node.title === title)
    if (post) return post.node

    if (!result.pageInfo.hasNextPage) break
    cursor = result.pageInfo.endCursor
  }

  return null
}

const createDraft = async (input: CreateDraftInput) => {
    const {data} = await client.mutate({
        mutation: CreateDraftDocument,
        variables: {
            input,
        },
  })
  return data
}

const updatePost = async (input: UpdatePostInput) => {
  const {data} = await client.mutate({
    mutation: UpdatePostDocument,
    variables: {
      input,
    },
  })
  return data
}


const publishDraft = async (input: PublishDraftInput) => {
    const {data} = await client.mutate({
        mutation: PublishDraftDocument,
        variables: {
            input,
        },
    })
    return data
}
const publishPost = async (input: PublishPostInput) => {
    const {data} = await client.mutate({
        mutation: PublishPostDocument,
        variables: {
            input,
        },
    })
    return data
}


export {createDraft, findPostByTitle, updatePost, publishDraft, publishPost}
