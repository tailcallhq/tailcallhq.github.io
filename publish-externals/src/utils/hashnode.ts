import {GraphQLClient} from "graphql-request"
import {addBaseUrlToImages} from "./markdown"
import {HASHNODE_PUBLICATION_ID, TAILCALL_ENDPOINT} from "./constants"
import {ArticleInput, ArticleResponse, Publisher, PublisherInterface} from "./types"

const client = new GraphQLClient(TAILCALL_ENDPOINT as string)

export class HashnodePublisher implements PublisherInterface {
  async publish(publisher: Publisher, id: string | undefined, article: ArticleInput): Promise<ArticleResponse> {
    if (id) {
      return this.updateHashnodePost(id, article)
    } else {
      const draft = await this.createHashnodeDraft(article)
      return this.publishHashnodePost(draft.id)
    }
  }


  private async createHashnodeDraft(article: ArticleInput): Promise<ArticleResponse> {
    const response: any = await client.request(
      `
      mutation($input: ArticleInput!) {
        createHashnodeDraft(input: $input) {
          draft {
            id
            title
            slug
          }
        }
      }
      `,
      {
        input: {
          ...article,
          publicationId: HASHNODE_PUBLICATION_ID,
        },
      }
    )
    return response.createHashnodeDraft.draft
  }

  private async updateHashnodePost(id: string, article: ArticleInput): Promise<ArticleResponse> {
    const response: any = await client.request(
      `
      mutation($input: HashnodeUpdatePostInput!) {
        updateHashnodePost(input: $input) {
          post {
            id
            title
            slug
          }
        }
      }
      `,
      {
        input: {
          id,
          ...article,
        },
      }
    )
    return response.updateHashnodePost.post
  }

  private async publishHashnodePost(postId: string): Promise<ArticleResponse> {
    const response: any = await client.request(
      `
      mutation($input: HashnodePublishPostInput!) {
        publishHashnodePost(input: $input) {
          post {
            id
            title
            slug
          }
        }
      }
      `,
      {
        input: {
          postId,
        },
      }
    )
    return response.publishHashnodePost.post
  }

  async findOnHashnode(title: string) {
    const response: any = await client.request(
      `
      query($publicationId: ID!, $first: Int!, $after: String) {
        hashnodePosts(publicationId: $publicationId, first: $first, after: $after) {
          edges {
            node {
              id
              title
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
      `,
      {
        publicationId: HASHNODE_PUBLICATION_ID,
        first: 50,
      },
    )
  
    const post = response.hashnodePosts.edges.find((edge: { node: { title: string } }) => edge.node.title === title)
    return post ? post.node : null
  }
    
}

export async function hashnodePostHandler(frontMatter: any, content: string) {
  const processedMd = addBaseUrlToImages(content)
  const existingPost = await new HashnodePublisher().findOnHashnode(frontMatter.title)

  const article: ArticleInput = {
    title: frontMatter.title,
    body_markdown: processedMd,
    published: true,
    tags: frontMatter.tags,
    subtitle: frontMatter.subtitle,
    slug: frontMatter.slug,
    coverImageOptions: frontMatter.cover_image ? {coverImageURL: frontMatter.cover_image} : undefined,
  }

  const publisher = new HashnodePublisher()
  return await publisher.publish(Publisher.HASHNODE, existingPost?.id, article)
}
