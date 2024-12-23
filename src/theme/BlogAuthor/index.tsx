import React from "react"
import clsx from "clsx"

interface AuthorDisplayProps {
  author: {
    name?: string
    imageURL?: string
  }
  containerClassName?: string
  textClassName?: string
  imgClassName?: string
}

export const BlogAuthor: React.FC<AuthorDisplayProps> = ({author, containerClassName, textClassName, imgClassName}) => (
  <div className={clsx("flex items-center", containerClassName)}>
    <img src={author.imageURL} alt={author.name} className={clsx("mr-2 size-6 rounded-full", imgClassName)} />
    <span className={clsx("font-medium text-black", textClassName)}>{author.name}</span>
  </div>
)
