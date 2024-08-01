import {GraphQLClient} from "graphql-request"
import {addBaseUrlToImages} from "./markdown"
import {HASHNODE_PUBLICATION_ID, TAILCALL_ENDPOINT} from "./constants"

const client = new GraphQLClient(TAILCALL_ENDPOINT)

export async function hashnodePostHandler(frontMatter: any, content: string) {
  const processedMd = addBaseUrlToImages(content)
  const existingPost = await findOnHashnode(frontMatter.title)

  if (existingPost) {
    return await updateHashnodePost(existingPost.id, frontMatter, processedMd)
  } else {
    const draft = await createHashnodeDraft(frontMatter, processedMd)
    return await publishHashnodePost(draft.id)
  }
}

async function findOnHashnode(title: string) {
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

  const post = response.hashnodePosts.edges.find((edge) => edge.node.title === title)
  return post ? post.node : null
}

async function createHashnodeDraft(frontMatter: any, content: string) {
  const response: any = await client.request(
    `
    mutation($input: HashnodeCreateDraftInput!) {
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
        title: frontMatter.title,
        subtitle: frontMatter.subtitle,
        slug: frontMatter.slug,
        contentMarkdown: content,
        tags: frontMatter.tags,
        coverImageOptions: frontMatter.cover_image ? {coverImageURL: frontMatter.cover_image} : undefined,
        publicationId: HASHNODE_PUBLICATION_ID,
      },
    },
  )
  return response.createHashnodeDraft.draft
}

async function updateHashnodePost(id: string, frontMatter: any, content: string) {
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
        title: frontMatter.title,
        subtitle: frontMatter.subtitle,
        slug: frontMatter.slug,
        contentMarkdown: content,
        tags: frontMatter.tags,
        coverImageOptions: frontMatter.cover_image ? {coverImageURL: frontMatter.cover_image} : undefined,
      },
    },
  )
  return response.updateHashnodePost.post
}

async function publishHashnodePost(postId: string) {
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
    },
  )
  return response.publishHashnodePost.post
}
