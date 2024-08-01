import {GraphQLClient} from "graphql-request"
import {addBaseUrlToImages} from "./markdown"
import {DEVTO_ORG_ID, DEVTO_ORG_NAME, TAILCALL_ENDPOINT} from "./constants"

const client = new GraphQLClient(TAILCALL_ENDPOINT)

export async function devtoPostHandler(frontMatter: any, content: string) {
  const processedMd = addBaseUrlToImages(content)
  const existingPost = await findOnDevTo(frontMatter.title)

  if (existingPost) {
    return await updateDevToPost(existingPost.id, frontMatter, processedMd)
  } else {
    return await publishDevToPost(frontMatter, processedMd)
  }
}

async function findOnDevTo(title: string) {
  const response: any = await client.request(
    `
    query($username: String!, $page: Int!, $per_page: Int!) {
      devToArticles(username: $username, page: $page, per_page: $per_page) {
        id
        title
      }
    }
    `,
    {
      username: DEVTO_ORG_NAME || "me",
      page: 1,
      per_page: 50,
    },
  )

  return response.devToArticles.find((article) => article.title === title)
}

async function publishDevToPost(frontMatter: any, content: string) {
  const response: any = await client.request(
    `
    mutation($input: DevToPublishInput!) {
      publishToDevTo(input: $input) {
        id
        title
        url
        published
        tags
      }
    }
    `,
    {
      input: {
        article: {
          title: frontMatter.title,
          body_markdown: content,
          published: true,
          tags: frontMatter.tags,
          series: frontMatter.series,
          canonical_url: frontMatter.canonical_url,
          description: frontMatter.description,
          organization_id: DEVTO_ORG_ID ? parseInt(DEVTO_ORG_ID) : undefined,
        },
      },
    },
  )
  return response.publishToDevTo
}

async function updateDevToPost(id: string, frontMatter: any, content: string) {
  const response: any = await client.request(
    `
    mutation($input: DevToUpdateArticleInput!) {
      updateDevToArticle(input: $input) {
        id
        title
        url
        published
        tags
      }
    }
    `,
    {
      input: {
        id,
        article: {
          title: frontMatter.title,
          body_markdown: content,
          published: true,
          tags: frontMatter.tags,
          series: frontMatter.series,
          canonical_url: frontMatter.canonical_url,
          description: frontMatter.description,
        },
      },
    },
  )
  return response.updateDevToArticle
}
