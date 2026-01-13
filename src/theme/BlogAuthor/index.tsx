import React from "react"
import clsx from "clsx"

interface AuthorDisplayProps {
  author: {
    name?: string
    imageURL?: string
  }
  containerClassName?: string
  textClassName?: string
}

export const BlogAuthor: React.FC<AuthorDisplayProps> = ({author, containerClassName, textClassName}) => (
  <div className={clsx("flex items-center", containerClassName)}>
    <img src={author.imageURL} alt={author.name} className="mr-2 size-6 rounded-full" />
    <span className={clsx("font-medium text-black", textClassName)}>{author.name}</span>
  </div>
)
