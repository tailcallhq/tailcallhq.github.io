import React from "react"
import Section from "../shared/Section"
import TutorialCard from "./TutorialCard"
import {tutorialsList} from "@site/src/constants"

const Tutorials = () => {
  return (
    <Section className="lg:pt-6">
      <span className="text-display-small text-tailCall-dark-500">Tutorials</span>
      <div className="grid grid-cols-3 gap-3 mt-6">
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
