import matter from "gray-matter";
import {readFileSync} from "fs";
import path from "path";
import { Article, ArticleBuilder } from "./domain/article";
import Publisher from "./domain/publisher";
import HashnodePublisher from "./integrations/hashnode_publisher";

interface HashNodeConfig {
  api_token: string | null;
  publication_id: string | null;
}

interface Config {
  post_title: string;
  posts_directory: string;
  hashnode: HashNodeConfig | null;
}

export function start(config: Config) {
  if (!config.post_title) {
    throw new Error("Must provide the title of the blog");
  }

  if (!config.posts_directory) {
    throw new Error("Must provide the posts directory");
  }

  const blog_content = readFileSync(path.join(config.posts_directory, `${config.post_title}.md`), 'utf-8');
  if (!blog_content) {
    throw new Error("Couldn't find the content in the provided path");
  }

  const { data, content } = matter(blog_content);
  let article: Article = new ArticleBuilder(data.title, data.slug, content)
  .withSubtitle(data.subtitle)
  .withCanonicalUrl(data.canonicalUrl)
  .withSEO({ title: data.seoTitle, description: data.seoDescription})
  .withTags(data.tags)
  .withCover(data.cover)
  .build();

  const publishers: Publisher[] = [];

  if (config.hashnode) {
    let { api_token, publication_id } = config.hashnode;

    if (!api_token) {
      throw new Error("The api_token for hashnode must be present");
    }

    if (!publication_id) {  
      throw new Error("The publication_id for hashnode must be present");
    }

    publishers.push(new HashnodePublisher(api_token, publication_id));
  }

  for (let publisher of publishers) {
      publisher.publish(article);
  }
}
