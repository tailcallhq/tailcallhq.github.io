import axios from "axios";
import slugify from "slugify";
import { Article, SEO } from "../domain/article";
import Publisher from "../domain/publisher";

interface SEORequest {
  title: string | null;
  description: string | null;
}

interface TagRequest {
  name: string;
  slug: string;
}

export default class HashnodePublisher implements Publisher {
  private api_endpoint: string = "https://gql.hashnode.com/"; 
  private api_token: string;
  private publication_id: string;

  constructor(api_token: string, publication_id: string) {
    this.api_token = api_token;
    this.publication_id = publication_id;
  }

  async publish(article: Article) {
    let query = `mutation CreateDraft($input: CreateDraftInput!) {
      createDraft(input: $input) {
        draft {
          id,
          title
        }
      }
    }`;

    let variables = {
      input: {
        title: article.title,
        subtitle: article.subtitle,
        slug: article.slug,
        contentMarkdown: article.content,
        originalArticleURL: article.canonicalUrl,
        tags: this.build_tags_request(article.tags),
        metaTags: this.build_meta_tags_request(article.seo),
        publicationId: this.publication_id,
        coverImageOptions: {
          coverImageURL: article.cover
        }
      }
    }

    try {
      let response = await axios.post(this.api_endpoint, {
        query, variables
      }, {
        headers: {
          'Authorization': this.api_token,
        }
      });

      if (response.data.errors) {
        console.log(`couldn't publish the article ${article.title})} to hashnode`);
        for (const error_message of response.data.errors) { 
          console.error(error_message);
        }
      } else {
        console.log(`Published to Hashnode: ${article.title}`);
      }
    } catch (error_message) {
      console.log(`couldn't publish the article ${article.title}) to hashnode`);
      console.error(error_message);
    }
  }

  build_meta_tags_request(seo: SEO | null): SEORequest | null {
    if (!seo) return null;
    return {
      title: seo.title,
      description: seo.description
    };
  }

  build_tags_request(tags: string[]): TagRequest[] {
    let updated_tags: TagRequest[] = [];
    for (const tag_name of tags) {
      let slug = slugify(tag_name, '-');
      updated_tags.push({
        name: tag_name,
        slug: slug
      });
    }
    return updated_tags;
  }
}

