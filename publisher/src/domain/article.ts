export interface SEO {
  title: string | null
  description: string | null
}

export interface Article {
  title: string
  subtitle: string | null
  cover: string | null
  tags: string[]
  slug: string
  content: string
  canonicalUrl: string | null
  seo: SEO | null
}

export class ArticleBuilder {
  private article: Partial<Article>

  constructor(title: string, slug: string, content: string) {
    this.article = {
      title,
      slug,
      content,
      tags: [],
      subtitle: null,
      cover: null,
      canonicalUrl: null,
      seo: null,
    }
  }

  withSubtitle(subtitle: string | null): ArticleBuilder {
    this.article.subtitle = subtitle
    return this
  }

  withCover(cover: string | null): ArticleBuilder {
    this.article.cover = cover
    return this
  }

  withTags(tags: string[]): ArticleBuilder {
    this.article.tags = tags
    return this
  }

  withCanonicalUrl(canonicalUrl: string | null): ArticleBuilder {
    this.article.canonicalUrl = canonicalUrl
    return this
  }

  withSEO(seo: SEO | null): ArticleBuilder {
    this.article.seo = seo
    return this
  }

  build(): Article {
    if (!this.article.title || !this.article.slug || !this.article.content) {
      throw new Error("Title, slug, and content are required.")
    }
    return this.article as Article
  }
}
