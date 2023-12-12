import {enterpriseFeatures} from "@site/src/constants"
import React from "react"

type EnterpriseFeaturesCardProps = {
  feature: {
    id: number
    title: string
    description: string
    logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  }
}

const EnterpriseFeaturesCard = ({feature}: EnterpriseFeaturesCardProps) => {
  return (
    <div
      className="rounded-3xl w-[328px] sm:w-[450px] sm:h-60 p-8 flex flex-col items-start space-y-4"
      style={{
        border: "1px solid #E7E7E7",
      }}
    >
      <feature.logo className="h-5 w-5 sm:h-8 sm:w-8" />
      <p className="text-title-tiny sm:text-title-medium">{feature.title}</p>
      <p className="text-content-tiny sm:text-title-tiny font-normal">{feature.description}</p>
    </div>
  )
}

const EnterpriseFeatures = () => {
  return (
    <section className="my-16 sm:my-24">
      <h4 className="text-title-semi-large sm:text-display-small text-center">Some of our enterprise features.</h4>
      <div className="flex items-center flex-wrap justify-center gap-6 mt-8">
        {enterpriseFeatures.map((feature) => (
          <EnterpriseFeaturesCard feature={feature} key={feature.id} />
        ))}
      </div>
    </section>
  )
}

export default EnterpriseFeatures
