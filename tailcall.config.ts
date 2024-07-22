// tailcall.config.ts

schema @server {
    query: Query
  }
  
  type PostInput {
    title: String!
    body: String!
  }
  
  type PostResponse {
    success: Boolean!
    message: String
  }
  
  type Query {
    publishPostToHashnode(input: PostInput!): PostResponse @http(
      method: "POST",
      url: "https://api.hashnode.com",
      headers: { "Content-Type": "application/json" },
      body: { query: "mutation { createStory(input: { title: \"{{.input.title}}\", contentMarkdown: \"{{.input.body}}\" }) { success message } }" }
    )
    publishPostToDevTo(input: PostInput!): PostResponse @http(
      method: "POST",
      url: "https://dev.to/api/articles",
      headers: {
        "Content-Type": "application/json",
        "api-key": "{{devToApiKey}}"
      },
      body: { article: { title: "{{.input.title}}", body_markdown: "{{.input.body}}" } }
    )
  }
  
  type Mutation {
    publishPost(input: PostInput!): PostResponse @call(
      call: "publishPostToHashnode(input: {{.input}})",
      call: "publishPostToDevTo(input: {{.input}})"
    )
  }
  