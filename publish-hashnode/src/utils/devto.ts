import {
  GetArticlesDocument,
  PublishArticleInput,
  PublishArticleDocument,
  UpdateArticleInput,
  UpdateArticleDocument,
  CreateDraftDocument,
  CreateDraftInput,
  PublishDraftDocument,
  PublishDraftInput,
} from "../../generated/graphql"
import {client} from "../client/client"
import {DEVTO_API_KEY} from "./constants"

const getArticles = async (publicationId: string, first: number, after?: string) => {
  const {data, errors} = await client.query({
    query: GetArticlesDocument,
    variables: {
      publicationId,
      first,
      after,
    },
  })

  if (errors) {
    console.error(errors)
  }

  return data?.publication?.articles
}

const findDevToArticleByTitle = async (title: string) => {
  let cursor: string | null | undefined
  const pageSize = 50

  while (true) {
    const result = await getArticles(DEVTO_API_KEY, pageSize, typeof cursor === "string" ? cursor : undefined)

    if (!result) break

    const article = result.edges.find((edge) => edge.node.title === title)
    if (article) return article.node

    if (!result.pageInfo.hasNextPage) break
    cursor = result.pageInfo.endCursor
  }

  return null
}

const createDevToDraft = async (input: CreateDraftInput) => {
  const {data} = await client.mutate({
    mutation: CreateDraftDocument,
    variables: {
      input,
    },
  })
  return data
}

const updateDevToArticle = async (input: UpdateArticleInput) => {
  const {data} = await client.mutate({
    mutation: UpdateArticleDocument,
    variables: {
      input,
    },
  })
  return data
}

const publishDevToDraft = async (input: PublishDraftInput) => {
  const {data} = await client.mutate({
    mutation: PublishDraftDocument,
    variables: {
      input,
    },
  })
  return data
}

const publishDevToArticle = async (input: PublishArticleInput) => {
  const {data} = await client.mutate({
    mutation: PublishArticleDocument,
    variables: {
      input,
    },
  })
  return data
}

export {createDevToDraft, findDevToArticleByTitle, updateDevToArticle, publishDevToDraft, publishDevToArticle}
