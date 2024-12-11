import TrustedByMarquee from "@site/src/components/home/TrustedByMarquee"
import {partnerImages} from "@site/src/constants"
import React from "react"

const Partners = () => {
  const handleClick = () => {
    window.open("/docs/deploy-graphql-github-actions/", "_blank")
  }

  return <TrustedByMarquee logos={partnerImages} onClick={handleClick} />
}

export default Partners
