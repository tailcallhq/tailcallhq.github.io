import React from "react"
import Hello from "./Hello"
import Announcement from "@site/src/components/shared/Announcement"

const ContactPage = (): JSX.Element => {
  return (
    <>
      <Announcement text={"📣 Catch Us at GraphQLConf 2024 • September 10-12 • San Francisco • "} refLink={"https://graphql.org/conf/2024/schedule/870876ffad45b79d11e09393e7f22587/"} refText={" Know more → "}/>
      <Hello />
    </>
  )
}

export default ContactPage
