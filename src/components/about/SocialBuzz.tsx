import React from "react"
import SectionTitle from "../shared/SectionTitle"

const SocialBuzz = (): JSX.Element => {
  return (
    <section className="py-SPACE_16 sm:py-24 relative flex items-center justify-center mx-SPACE_04 sm:mx-SPACE_10 lg:mx-SPACE_12 lg:space-x-SPACE_10 max-w-8xl">
      <div className="flex flex-col gap-SPACE_06 lg:gap-y-44">
        <div className="ml-SPACE_04 lg:ml-32">
          <SectionTitle title="About Us" />
          <span className="text-title-semi-large sm:text-display-small">Social & Buzz</span>
        </div>

        <img
          src={require("@site/static/images/about/tweet-2.jpg").default}
          srcSet={`${require("@site/static/images/about/tweet-2.jpg").default} 1x,
          ${require("@site/static/images/about/tweet-2-2x.jpg").default} 2x
          `}
          alt="tweet 2"
          className="rounded-3xl m-SPACE_02 lg:hidden border border-solid border-tailCall-border-light-500"
        />

        <img
          src={require("@site/static/images/about/tweet-1.jpg").default}
          srcSet={`${require("@site/static/images/about/tweet-1.jpg").default} 1x,
          ${require("@site/static/images/about/tweet-1-2x.jpg").default} 2x
          `}
          alt="Devs love tailcall"
          className="border border-solid border-tailCall-border-light-500 rounded-3xl m-SPACE_02"
        />
      </div>
      <img
        src={require("@site/static/images/about/tweet-2.jpg").default}
        srcSet={`${require("@site/static/images/about/tweet-2.jpg").default} 1x,
          ${require("@site/static/images/about/tweet-2-2x.jpg").default} 2x
          `}
        alt="tweet 2"
        className="border border-solid border-tailCall-border-light-500 rounded-3xl m-SPACE_02 lg:block hidden"
      />
    </section>
  )
}

export default SocialBuzz
