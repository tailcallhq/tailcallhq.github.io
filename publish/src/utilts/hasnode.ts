import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { processBlog, BlogData } from './processBlog'; // Adjust the import path as needed
import { HASHNODE_API_TOKEN, HASHNODE_PUBLICATION_ID } from './variable'; // Adjust the import path as needed

// Example GraphQL mutations (you need to replace these with actual mutations from your graphql.ts file)
const PUBLISH_POST = gql`
  mutation PublishPost($title: String!, $content: String!, $tags: [String!], $coverImageURL: String, $publicationId: ID!) {
    publishPost(input: { title: $title, content: $content, tags: $tags, coverImageURL: $coverImageURL, publicationId: $publicationId }) {
      id
      title
      content
      tags
      coverImageURL
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $content: String!, $tags: [String!], $coverImageURL: String, $publicationId: ID!) {
    updatePost(id: $id, input: { title: $title, content: $content, tags: $tags, coverImageURL: $coverImageURL, publicationId: $publicationId }) {
      id
      title
      content
      tags
      coverImageURL
    }
  }
`;

const REMOVE_POST = gql`
  mutation RemovePost($id: ID!, $publicationId: ID!) {
    removePost(id: $id, publicationId: $publicationId) {
      id
    }
  }
`;

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://gql.hashnode.com', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
  headers: {
    Authorization: HASHNODE_API_TOKEN!,
  },
});

// Utility functions

/**
 * Publishes a new blog post.
 * @param blogData - The blog data to be published.
 */
export const publishPost = async (blogData: BlogData) => {
  const response = await client.mutate({
    mutation: PUBLISH_POST,
    variables: {
      title: blogData.title,
      content: blogData.content,
      tags: blogData.tags,
      coverImageURL: blogData.coverImageURL,
      publicationId: HASHNODE_PUBLICATION_ID,
    },
  });

  return response.data.publishPost;
};

/**
 * Updates an existing blog post.
 * @param id - The ID of the blog post to be updated.
 * @param blogData - The updated blog data.
 */
export const updatePost = async (id: string, blogData: BlogData) => {
  const response = await client.mutate({
    mutation: UPDATE_POST,
    variables: {
      id,
      title: blogData.title,
      content: blogData.content,
      tags: blogData.tags,
      coverImageURL: blogData.coverImageURL,
      publicationId: HASHNODE_PUBLICATION_ID,
    },
  });

  return response.data.updatePost;
};

/**
 * Removes an existing blog post.
 * @param id - The ID of the blog post to be removed.
 */
export const removePost = async (id: string) => {
  const response = await client.mutate({
    mutation: REMOVE_POST,
    variables: {
      id,
      publicationId: HASHNODE_PUBLICATION_ID,
    },
  });

  return response.data.removePost;
};
