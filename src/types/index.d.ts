type PartnerImage = {
  id: number
  name: string
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

type Feature = {
  id: number
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
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
  Image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}
