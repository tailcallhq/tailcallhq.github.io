import React from "react"

import {founders} from "@site/src/constants"
import Link from "@docusaurus/Link"

type Founder = {
  founder: {
    id: number
    name: string
    title: string
    image: string
    socialLinks: Social[]
  }
}

const Founder = ({founder}: Founder) => {
  return (
    <div>
      <img src={founder.image} alt={founder.name} />

      <div className="flex flex-col space-y-2 items-start">
        <span className="text-content-small font-bold sm:text-title-small">{founder.name}</span>
        <span className="text-content-tiny sm:text-content-small text-tailCall-dark-100">{founder.title}</span>
        <div className="flex space-x-5">
          {founder.socialLinks.map((social) => (
            <Link href={social.href} key={social.id}>
              <social.image className="h-6 w-6 sm:h-7 sm:w-7" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const Founders = () => {
  return (
    <section className="my-8 sm:my-16 flex flex-wrap items-center justify-around max-w-6xl mx-auto gap-y-8 sm:gap-y-16">
      {founders.map((founder) => (
        <Founder founder={founder} key={founder.id} />
      ))}
    </section>
  )
}

export default Founders
