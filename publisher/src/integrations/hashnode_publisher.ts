import axios from "axios"
import slugify from "slugify"
import {Article, SEO} from "../domain/article"
import Publisher from "../domain/publisher"

interface SEORequest {
  title: string | null
  description: string | null
}

interface TagRequest {
  name: string
  slug: string
}

interface Draft {
  id: string
  title: string
}

interface CreateDraftResponse {
  createDraft: {
    draft: Draft
  }
}

interface Post {
  id: string
  title: string
}

interface PublishPostResponse {
  publishPost: {
    post: Post
  }
}
interface UpdatePostResponse {
  updatePost: {
    post: Post
  }
}

interface GraphQLError {
  message: string
  locations: {line: number; column: number}[]
  path: string[]
  extensions: {
    type: string
    id: string
    code: string
  }
}

interface ApiResponse<T> {
  data: T
  errors?: GraphQLError[]
}

export default class HashnodePublisher implements Publisher {
  private api_endpoint: string = "https://gql.hashnode.com/"
  private api_token: string
  private publication_id: string

  constructor(api_token: string, publication_id: string) {
    this.api_token = api_token
    this.publication_id = publication_id
  }

  async publishDraft(article: Article): Promise<void> {
    let query = `mutation CreateDraft($input: CreateDraftInput!) {
      createDraft(input: $input) {
        draft {
          id,
          title
        }
      }
    }`

    let variables = {
      input: {
        title: article.title,
        subtitle: article.subtitle,
        slug: article.slug,
        contentMarkdown: article.content,
        originalArticleURL: article.canonicalUrl,
        tags: this.buildTagsRequest(article.tags),
        metaTags: this.buildMetaTagsRequest(article.seo),
        publicationId: this.publication_id,
        coverImageOptions: {
          coverImageURL: article.cover,
        },
      },
    }

    let response = await axios.post<ApiResponse<CreateDraftResponse>>(
      this.api_endpoint,
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: this.api_token,
        },
      },
    )

    if (response.data.errors) {
      throw new Error(
        `couldn't publish the article ${article.title} on hashnode : \n ${response.data.errors.map((error) => error.message).join("\n")}`,
      )
    }

    console.log(`Article draft was created on hashnode successfully: ${article.title}`)
  }

  async publish(article: Article): Promise<string> {
    let query = `mutation PublishPost($input: PublishPostInput!) {
      publishPost(input: $input) {
        post {
          id,
          title
        }
      }
    }`

    let variables = {
      input: {
        title: article.title,
        subtitle: article.subtitle,
        slug: article.slug,
        contentMarkdown: article.content,
        originalArticleURL: article.canonicalUrl,
        tags: this.buildTagsRequest(article.tags),
        metaTags: this.buildMetaTagsRequest(article.seo),
        publicationId: this.publication_id,
        coverImageOptions: {
          coverImageURL: article.cover,
        },
      },
    }

    let response = await axios.post<ApiResponse<PublishPostResponse>>(
      this.api_endpoint,
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: this.api_token,
        },
      },
    )

    if (response.data.errors) {
      throw new Error(
        `couldn't publish the article ${article.title} on hashnode : \n ${response.data.errors.map((error) => error.message).join("\n")}`,
      )
    }

    console.log(`Article published on hashnode successfully: ${article.title}`)
    let id = response.data.data.publishPost.post.id
    console.log(response.data.data)
    return id
  }

  async edit(id: string, article: Article) {
    let query = `mutation UpdatePost($input: UpdatePostInput!) {
      updatePost(input: $input) {
        post {
          id,
          title
        }
      }
    }`

    let variables = {
      input: {
        id,
        title: article.title,
        subtitle: article.subtitle,
        contentMarkdown: article.content,
        originalArticleURL: article.canonicalUrl,
        tags: this.buildTagsRequest(article.tags),
        metaTags: this.buildMetaTagsRequest(article.seo),
        publicationId: this.publication_id,
        coverImageOptions: {
          coverImageURL: article.cover,
        },
      },
    }

    let response = await axios.post<ApiResponse<UpdatePostResponse>>(
      this.api_endpoint,
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: this.api_token,
        },
      },
    )

    if (response.data.errors) {
      throw new Error(
        `couldn't update the article ${article.title} on hashnode : \n ${response.data.errors.map((error) => error.message).join("\n")}`,
      )
    }

    console.log(`Article updated on hashnode successfully: ${article.title}`)
  }

  getContentId(matter_data: {[key: string]: any}): string {
    if (!matter_data.hashnodeId) {
      throw new Error("The content id couldn't be found in the file")
    }

    return matter_data.hashnodeId
  }

  addContentId(matter_data: {[key: string]: any}, id: string): {[key: string]: any} {
    return {
      ...matter_data,
      hashnodeId: id,
    }
  }

  buildMetaTagsRequest(seo: SEO | null): SEORequest | null {
    if (!seo) return null
    return {
      title: seo.title,
      description: seo.description,
    }
  }

  buildTagsRequest(tags: string[]): TagRequest[] {
    let updated_tags: TagRequest[] = []
    for (const tag_name of tags) {
      let slug = slugify(tag_name, "-")
      updated_tags.push({
        name: tag_name,
        slug: slug,
      })
    }
    return updated_tags
  }
}
