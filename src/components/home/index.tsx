import React from "react"

import Banner from "./Banner"
import Graph from "./Graph"
import Benefits from "./Benefits"
import Discover from "../shared/Discover"
import Configuration from "./Configuration"
import Testimonials from "./Testimonials"
import Announcement from "../shared/Announcement"
const HomePage = (): JSX.Element => {
  return (
    <div className="">
      <Announcement
        text={"📣 Catch Us at GraphQLConf 2024 • September 10-12 • San Francisco • "}
        refLink={"https://graphql.org/conf/2024/schedule/870876ffad45b79d11e09393e7f22587/"}
        refText={" Know more → "}
      />
      <Banner />
      <Configuration />
      <Testimonials />
      <Benefits />
      <Graph />
      {/* <Playground /> */}
      <Discover />
    </div>
  )
}

export default HomePage
