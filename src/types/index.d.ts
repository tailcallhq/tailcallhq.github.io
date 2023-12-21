type PartnerImage = {
  id: number
  name: string
  logo: string
}

type Feature = {
  id: number
  logo: string
  title: string
  description1: string
  highlightedText: string
  description2: string
}

type MoreFeatures = {
  id: number
  title: string
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

type Social = {
  id: number
  name: string
  image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  href: string
}

type ChooseTailcall = {
  id: number
  title: string
  description: string
  image: string
}

type EnterpriseFeature = {
  id: number
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
}

type PricingPlans = {
  id: number
  name: string
  price: string
  for: string
  billing?: string
  volumeDiscounts?: string
  features: Array<{
    id: number
    name: string
  }>
  buttonText: string
  mostPopular: boolean
  href: string
}

type Founder = {
  id: number
  name: string
  title: string
  image: string
  socialLinks: Social[]
}

type Investor = {
  id: number
  image: string
  image2x: string
  name: string
  title: string
}
