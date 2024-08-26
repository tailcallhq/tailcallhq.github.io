import React from "react"
import Playground from "./Playground"
import Announcement from "@site/src/components/shared/Announcement"

const PlaygroundPage = (): JSX.Element => {
  return (
    <>
      <Announcement
        text={"📣 Catch us at GraphQLConf 2024 • September 10-12 • San Francisco • "}
        refLink={"https://graphql.org/conf/2024/schedule/870876ffad45b79d11e09393e7f22587/"}
        refText={" Know more → "}
      />
      <Playground />
    </>
  )
}

export default PlaygroundPage
