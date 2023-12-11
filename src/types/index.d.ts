type PartnerImage = {
  id: number
  name: string
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

type Feature = {
  id: number
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
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
  image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

type EnterpriseFeature = {
  id: number
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
}
