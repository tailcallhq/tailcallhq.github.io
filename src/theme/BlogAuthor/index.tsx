import React from "react"

interface AuthorDisplayProps {
  author: {
    name?: string
    imageURL?: string
  }
}

export const BlogAuthor: React.FC<AuthorDisplayProps> = ({author}) => (
  <div className="mt-4 flex items-center">
    <img src={author.imageURL} alt={author.name} className="mr-2 size-6 rounded-full" />
    <span className="font-medium text-black">{author.name}</span>
  </div>
)
