import React from "react"
import Section from "../shared/Section"
import TutorialCard from "./TutorialCard"
import {tutorialsList} from "@site/src/constants"

const Tutorials = () => {
  return (
    <Section className="!px-4 lg:!px-36 lg:pt-6">
      <span className="text-title-large lg:text-display-small text-tailCall-dark-500">Tutorials</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-3 mt-7 lg:mt-6">
        {tutorialsList.map((tutorial: TutorialItem, index: number) => {
          const {imgUrl, title, duration, authorName, authorImgUrl, redirectionUrl} = tutorial
          return (
            <TutorialCard
              key={index}
              imgUrl={imgUrl}
              title={title}
              duration={duration}
              authorName={authorName}
              authorImgUrl={authorImgUrl}
              redirectionUrl={redirectionUrl}
            />
          )
        })}
      </div>
    </Section>
  )
}

export default Tutorials
