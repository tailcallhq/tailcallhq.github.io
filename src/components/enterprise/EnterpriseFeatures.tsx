import React from "react"
import Heading from "@theme/Heading"

import {enterpriseFeatures} from "@site/src/constants"

type EnterpriseFeaturesCardProps = {
  feature: {
    id: number
    title: string
    description: string
    logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  }
}

const EnterpriseFeaturesCard = ({feature}: EnterpriseFeaturesCardProps): JSX.Element => {
  return (
    <div className="border border-solid border-tailCall-border-light-400 rounded-3xl w-full sm:w-[450px] sm:h-60 p-SPACE_08 flex flex-col items-start space-y-SPACE_04">
      <feature.logo className="h-5 w-5 sm:h-8 sm:w-8" />
      <p className="text-title-tiny sm:text-title-medium">{feature.title}</p>
      <p className="text-content-tiny sm:text-content-small font-normal">{feature.description}</p>
    </div>
  )
}

const EnterpriseFeatures = () => {
  return (
    <section className="my-SPACE_16 sm:my-SPACE_20 lg:my-24">
      <Heading as="h4" className="text-title-semi-large sm:text-display-tiny lg:text-display-small text-center">
        Some of our enterprise features.
      </Heading>
      <div className="flex items-center flex-wrap justify-center gap-SPACE_06 mt-SPACE_08 mx-SPACE_04 sm:mx-0">
        {enterpriseFeatures.map((feature) => (
          <EnterpriseFeaturesCard feature={feature} key={feature.id} />
        ))}
      </div>
    </section>
  )
}

export default EnterpriseFeatures
