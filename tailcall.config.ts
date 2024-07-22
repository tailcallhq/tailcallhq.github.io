import {defineSchema, defineQuery, defineMutation} from "@tailcallhq/tailcall"
import fetch from "node-fetch"

const postToHashnode = async (title: string, content: string, publicationId: string, token: string) => {
  const response = await fetch("https://api.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      query: `
        mutation {
          createPublicationStory(input: {
            title: "${title}",
            contentMarkdown: "${content}",
            publicationId: "${publicationId}"
          }) {
            success
            message
          }
        }
      `,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Hashnode Error: ${errorData.message}`)
  }

  return response.json()
}

const postToDevto = async (title: string, content: string, apiKey: string) => {
  const response = await fetch("https://dev.to/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      article: {
        title: title,
        body_markdown: content,
      },
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Dev.to Error: ${errorData.message}`)
  }

  return response.json()
}

const schema = defineSchema({
  query: defineQuery({
    // Define any queries if needed
  }),
  mutation: defineMutation({
    publishPost: {
      type: "String",
      args: {
        title: "String!",
        content: "String!",
        platform: "String!",
        token: "String!",
        publicationId: "String",
      },
      resolve: async (_: any, {title, content, platform, token, publicationId}: any) => {
        if (platform === "hashnode") {
          const result = await postToHashnode(title, content, publicationId, token)
          return JSON.stringify(result)
        } else if (platform === "devto") {
          const result = await postToDevto(title, content, token)
          return JSON.stringify(result)
        } else {
          throw new Error("Unsupported platform")
        }
      },
    },
  }),
})

export default schema
