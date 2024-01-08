import React from "react"
import SectionTitle from "../shared/SectionTitle"

const SocialBuzz = () => {
  return (
    <section className="py-16 sm:py-24 relative flex items-center justify-center mx-4 sm:mx-10 lg:mx-12 lg:space-x-10 max-w-8xl">
      <div className="flex flex-col gap-6 lg:gap-y-44">
        <div className="ml-4 lg:ml-32">
          <SectionTitle title="About Us" />
          <span className="text-title-semi-large sm:text-display-small">Social & Buzz</span>
        </div>

        <img
          src={require("@site/static/images/about/tweet-2.jpg").default}
          srcSet={`${require("@site/static/images/about/tweet-2.jpg").default} 1x,
          ${require("@site/static/images/about/tweet-2-2x.jpg").default} 2x
          `}
          alt="tweet 2"
          className="rounded-3xl m-2 lg:hidden"
          style={{
            border: "1px solid var(--ifm-color-brand-light-500)",
          }}
        />

        <img
          src={require("@site/static/images/about/tweet-1.jpg").default}
          srcSet={`${require("@site/static/images/about/tweet-1.jpg").default} 1x,
          ${require("@site/static/images/about/tweet-1-2x.jpg").default} 2x
          `}
          alt=""
          className=" rounded-3xl m-2"
          style={{
            border: "1px solid var(--ifm-color-brand-light-500)",
          }}
        />
      </div>
      <img
        src={require("@site/static/images/about/tweet-2.jpg").default}
        srcSet={`${require("@site/static/images/about/tweet-2.jpg").default} 1x,
          ${require("@site/static/images/about/tweet-2-2x.jpg").default} 2x
          `}
        alt="tweet 2"
        className="rounded-3xl m-2 lg:block hidden"
        style={{
          border: "1px solid var(--ifm-color-brand-light-500)",
        }}
      />
    </section>
  )
}

export default SocialBuzz
