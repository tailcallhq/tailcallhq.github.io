import {DEVTO_API_KEY} from "./constants"
import axios from "axios"

interface UpdatePostInput {
  coAuthors?: string[]
  contentMarkdown?: string
  coverImageOptions?: {
    coverImageURL?: string
  }
  id: number
  metaTags?: {
    description?: string
    image?: string | null
    title?: string
  }
  originalArticleURL?: string | null
  publicationId?: string
  publishAs?: string
  publishedAt?: string // Assuming ISO8601 date-time format
  seriesId?: string
  settings?: {
    enableTableOfContents?: boolean
  }
  slug?: string
  subtitle?: string
  tags?: string[]
  title?: string
}

interface CreateDraftInput {
  title?: string
  body_markdown?: string
  published?: boolean
  series?: string
  main_image?: string
  canonical_url?: string | null
  description?: string
  tags?: string[]
  organization_id?: number

  coAuthors?: string[]
  coverImageOptions?: {
    coverImageURL?: string
  }
  disableComments?: boolean
  draftOwner?: string
  metaTags?: {
    image?: string | null
    title?: string
  }
  publicationId: string
  publishAs?: string
  settings?: {
    enableTableOfContents?: boolean
  }
  slug?: string
  subtitle?: string
}

const findDevToPostByTitle = async (title: string) => {
  const per_page = 50
  let url = `https://dev.to/api/articles/me?per_page=${per_page}`

  const response = await axios.get(url, {
    headers: {
      "api-key": DEVTO_API_KEY,
    },
  })
  return response.data.find((post: {title: string}) => post.title === title)
}

const createDevToPost = async (post: CreateDraftInput) => {
  await axios.post(
    "https://dev.to/api/articles",
    {
      article: post,
    },
    {
      headers: {
        "api-key": DEVTO_API_KEY,
      },
    },
  )
}

const updateDevToPost = async (id: number, post: UpdatePostInput) => {
  await axios.put(
    "https://dev.to/api/articles/" + id,
    {
      article: post,
    },
    {
      headers: {
        "api-key": DEVTO_API_KEY,
      },
    },
  )
}

export {findDevToPostByTitle, createDevToPost, updateDevToPost}
