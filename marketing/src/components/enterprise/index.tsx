import React from "react"
import Hero from "./Hero"
import Partners from "../home/Partners"
import EnterpriseFeatures from "./EnterpriseFeatures"
import MoreEnterpriseFeatures from "./MoreEnterpriseFeatures"
import Discover from "../shared/Discover"
import Pricing from "./Pricing"

const EnterprisePage = (): JSX.Element => {
  return (
    <div>
      <Hero />
      <Partners />
      <EnterpriseFeatures />
      <MoreEnterpriseFeatures />
      <Pricing />
      <Discover />
    </div>
  )
}

export default EnterprisePage
