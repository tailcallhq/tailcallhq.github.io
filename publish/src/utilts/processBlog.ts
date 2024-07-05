import * as fs from 'fs';
import * as path from 'path';
const matter = require('gray-matter');

interface Author {
  name: string;
  title: string;
  url: string;
  image_url: string;
}

export interface BlogData {
  title: string;
  description: string;
  slug: string;
  authors: Author[];
  tags: string[];
  coverImageURL: string;
  hideTableOfContents: boolean;
  content: string;
}

/**
 * Reads the content of a file.
 * @param filePath - Path to the markdown file.
 * @returns Content of the file as a string.
 */
export const readFileContent = (filePath: string): string => {
  return fs.readFileSync(filePath, 'utf8');
};

/**
 * Parses the front matter of a markdown file.
 * @param fileContent - Content of the file.
 * @returns Parsed front matter and content.
 */
export const parseFrontMatter = (fileContent: string) => {
  return matter(fileContent);
};

/**
 * Updates image links to absolute paths.
 * @param content - Content of the file.
 * @param filePath - Path to the markdown file.
 * @returns Content with updated image links.
 */
export const updateImageLinks = (content: string, filePath: string): string => {
  return content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, altText, imagePath) => {
    const localPath = path.resolve(path.dirname(filePath), imagePath);
    return `![${altText}](${localPath})`;
  });
};

/**
 * Constructs the blog data object from the parsed content.
 * @param data - Front matter data.
 * @param content - Content of the file.
 * @returns Constructed blog data object.
 */
export const constructBlogData = (data: any, content: string): BlogData => {
  return {
    title: data.title,
    description: data.description,
    slug: data.slug,
    authors: data.authors,
    tags: data.tags,
    coverImageURL: data.image,
    hideTableOfContents: data.hide_table_of_contents,
    content: content,
  };
};

/**
 * Processes the blog file to extract information and manipulate image links.
 * @param filePath - Path to the markdown file.
 * @returns Processed blog data.
 */
export const processBlog = (filePath: string): BlogData => {
  const fileContent = readFileContent(filePath);
  const { data, content } = parseFrontMatter(fileContent);
  const updatedContent = updateImageLinks(content, filePath);
  return constructBlogData(data, updatedContent);
};

