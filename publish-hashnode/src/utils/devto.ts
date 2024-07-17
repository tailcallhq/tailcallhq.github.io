import axios from "axios"
import {DEVTO_API_KEY} from "./constants"

interface Post {
  title: string
  body_markdown: string
  published: boolean
  description?: string
  canonical_url?: string
  cover_image?: string
  tags?: string[]
}

// Function to find a post by title on Dev.to
export const findDevToPostByTitle = async (title: string) => {
  const response = await axios.get("https://dev.to/api/articles/me/published", {
    headers: {
      "api-key": DEVTO_API_KEY,
    },
  })
  return response.data.find((post: {title: string}) => post.title === title)
}

// Function to create a new post on Dev.to
export const createDevToPost = async (post: Post) => {
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

// Function to update an existing post on Dev.to
export const updateDevToPost = async (id: number, post: Post) => {
  await axios.put(
    `https://dev.to/api/articles/${id}`,
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
