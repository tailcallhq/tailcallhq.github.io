import React from "react"
import SectionTitle from "../shared/SectionTitle"
import Grid from "@site/static/images/about/grid-large.svg"
import Tweet1 from "@site/static/images/about/tweet-1.jpg"
import Tweet2 from "@site/static/images/about/tweet-2.jpg"

const SocialBuzz = () => {
  return (
    <section className="my-24 relative flex items-center mx-auto space-x-10 max-w-8xl">
      <Grid className="absolute inset-0 -z-10" />
      <div className="flex flex-col gap-y-44">
        <div className="ml-20">
          <SectionTitle title="About Us" />
          <span className="text-display-small">Social & Buzz</span>
        </div>
        <img
          src={Tweet1}
          alt=""
          className=" rounded-3xl p-2"
          style={{
            border: "1px solid #CECECF",
          }}
        />
      </div>
      <img
        src={Tweet2}
        alt=""
        className=" rounded-3xl p-2"
        style={{
          border: "1px solid #CECECF",
        }}
      />
    </section>
  )
}

export default SocialBuzz
