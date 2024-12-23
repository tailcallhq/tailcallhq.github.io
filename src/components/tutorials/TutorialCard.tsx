import React from "react"
import {BlogAuthor} from "@site/src/theme/BlogAuthor"
import Link from "@docusaurus/Link"

interface TutorialCardProps {
  imgUrl: string
  title: string
  duration: string
  authorName: string
  authorImgUrl: string
  redirectionUrl: string
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  imgUrl,
  title,
  duration,
  authorName,
  authorImgUrl,
  redirectionUrl,
}) => {
  return (
    <Link to={redirectionUrl} className="!no-underline">
      <div className="flex flex-col rounded-md border border-solid border-tailCall-border-light-400 cursor-pointer">
        <img src={imgUrl} />
        <div className="flex flex-col py-6 px-4 lg:p-6 gap-2 lg:gap-3 text-black">
          <span className="flex flex-col gap-1 lg:gap-3">
            <span className="text-content-mini">{duration}</span>
            <span className="text-title-small line-clamp-2">{title}</span>
          </span>
          <BlogAuthor
            author={{
              name: authorName,
              imageURL: authorImgUrl,
            }}
            containerClassName="mt-auto"
            imgClassName="size-4 lg:size-5"
            textClassName="text-content-mini !font-medium lg:text-content-tiny"
          />
        </div>
      </div>
    </Link>
  )
}

export default TutorialCard
