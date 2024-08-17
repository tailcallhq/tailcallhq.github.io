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
import {addBaseUrlToImages} from "./markdown"

const hashnodePostHandler = async (frontMatter: any, content: any) => {
  const {title, subtitle, slug, canonical_url, seo_title, description, coAuthors, cover_image} = frontMatter
  const processedMd = addBaseUrlToImages(content)
  const existsOnHashnode = await findOnHashnode(title)
  if (existsOnHashnode) {
    await updatePost({
      id: existsOnHashnode.id,
      title: title,
      subtitle: subtitle,
      slug: slug,
      originalArticleURL: canonical_url ? canonical_url : null,
      coAuthors: coAuthors,
      ...(seo_title && {
        metaTags: {
          description: description,
          image: null,
          title: seo_title,
        },
      }),
      coverImageOptions: {
        coverImageURL: cover_image,
      },
      contentMarkdown: processedMd,
    })
  }

  await createDraft({
    title: title,
    subtitle: subtitle,
    slug: slug,
    originalArticleURL: canonical_url ? canonical_url : null,
    ...(seo_title && {
      metaTags: {
        description: description,
        image: null,
        title: seo_title,
      },
    }),
    coverImageOptions: {
      coverImageURL: cover_image,
    },
    coAuthors: coAuthors,
    contentMarkdown: processedMd,
    // publishAs: '6697ec43b268f4c6823e916a',
    publicationId: HASHNODE_PUBLICATION_ID,
  })
}

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

const findOnHashnode = async (title: string) => {
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

export {createDraft, findOnHashnode, hashnodePostHandler as handler, updatePost, publishDraft, publishPost}
