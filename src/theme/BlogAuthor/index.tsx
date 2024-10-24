import React from "react"
import clsx from "clsx"

interface AuthorDisplayProps {
  author: {
    name?: string
    imageURL?: string
  },
  className?: string
}

export const BlogAuthor: React.FC<AuthorDisplayProps> = ({ author, className }) => (
  <div className={clsx("flex items-center", className)}>
    <img src={author.imageURL} alt={author.name} className="mr-2 size-6 rounded-full" />
    <span className="font-medium text-black">{author.name}</span>
  </div>
)
