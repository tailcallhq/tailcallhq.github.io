import React, {useEffect} from "react"
import Layout from "@theme/Layout"
import ReactGA from "react-ga4"
import {useLocation} from "@docusaurus/router"

import HomePage from "../components/home"
import {PageDescription, PageTitle} from "../constants/titles"
import Announcement from "../components/shared/Announcement"

const Home = (): JSX.Element => {
  const isDevelopment = process.env.NODE_ENV === "development"
  const location = useLocation()

  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: location.pathname, title: "Home Page"})
  }, [])

  return (
    <>
      <Announcement
        text={"📣 Catch us at GraphQLConf 2024 • September 10-12 • San Francisco • "}
        refLink={"https://graphql.org/conf/2024/schedule/870876ffad45b79d11e09393e7f22587/"}
        refText={" Know more → "}
      />
      <Layout title={PageTitle.HOME} description={PageDescription.HOME}>
        <HomePage />
        {!isDevelopment && (
          <img
            style={{height: 0, width: 0}}
            referrerPolicy="no-referrer-when-downgrade"
            src="https://static.scarf.sh/a.png?x-pxid=45ec365f-ab8a-4848-a6a9-bd4ffecfe72e"
            alt="pixel"
          />
        )}
      </Layout>
    </>
  )
}

export default Home
