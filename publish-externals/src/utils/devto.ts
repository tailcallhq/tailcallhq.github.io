import {GraphQLClient} from "graphql-request"
import {addBaseUrlToImages} from "./markdown"
import {DEVTO_ORG_ID, DEVTO_ORG_NAME, TAILCALL_ENDPOINT} from "./constants"
import {ArticleInput, ArticleResponse, Publisher, PublisherInterface} from "./types"

const client = new GraphQLClient(TAILCALL_ENDPOINT as string)

export class DevToPublisher implements PublisherInterface {
  async publish(publisher: Publisher, id: string | undefined, article: ArticleInput): Promise<ArticleResponse> {
    if (id) {
      return this.updateDevToPost(id, article)
    } else {
      return this.publishDevToPost(article)
    }
  }


  private async publishDevToPost(article: ArticleInput): Promise<ArticleResponse> {
    const response: any = await client.request(
      `
      mutation($input: ArticleInput!) {
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
          ...article,
          organization_id: DEVTO_ORG_ID ? parseInt(DEVTO_ORG_ID) : undefined,
        },
      }
    )
    return response.publishToDevTo
  }

  private async updateDevToPost(id: string, article: ArticleInput): Promise<ArticleResponse> {
    const response: any = await client.request(
      `
      mutation($id: ID!, $article: ArticleInput!) {
        updateDevToArticle(id: $id, article: $article) {
          id
          title
          url
          published
          tags
        }
      }
      `,
      {
        id,
        article,
      }
    )
    return response.updateDevToArticle
  }

  async findOnDevTo(title: string) {
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
}
}
export async function devtoPostHandler(frontMatter: any, content: string) {
  const processedMd = addBaseUrlToImages(content)
  const existingPost = await new DevToPublisher().findOnDevTo(frontMatter.title)

  const article: ArticleInput = {
    title: frontMatter.title,
    body_markdown: processedMd,
    published: true,
    tags: frontMatter.tags,
    series: frontMatter.series,
    canonical_url: frontMatter.canonical_url,
    description: frontMatter.description,
  }

  const publisher = new DevToPublisher()
  return await publisher.publish(Publisher.DEVTO, existingPost?.id as string, article)
}
