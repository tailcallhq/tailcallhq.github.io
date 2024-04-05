type PartnerImage = {
  id: number
  name: string
  logo: string
}

type Feature = {
  logo: string
  title: string
  content: React.JSX.Element
}

type MoreFeatures = {
  id: number
  title: string
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

type Social = {
  id: number
  name: string
  image?: FunctionComponent<SVGProps<SVGSVGElement>> | undefined
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

type AdditionalEnterpriseFeatures = {
  id: number
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
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

type RadioOptions = {
  id: string
  name: string
  value: string
}

type SidebarLink = {
  type: "link"
  label: string
  href: string
  docId: string
  unlisted: boolean
}

type SidebarCategory = {
  type: "category"
  label: string
  collapsible: boolean
  collapsed: boolean
  items: SidebarLink[]
}

type SidebarItem = {
  type: "category" | "link"
  label: string
  collapsible?: boolean
  collapsed?: boolean
  items?: SidebarLink[]
  href?: string
  docId?: string
  unlisted?: boolean
}

type SidebarConfig = {
  sidebar: SidebarItem[]
  hiddenSidebarContainer: boolean
}

declare module "docusaurus-lunr-search/src/theme/SearchBar"
declare module "react-platform-js" {
  import { Component, ReactNode, CSSProperties } from 'react';

  interface PlatformProps {
    children?: ReactNode | ((props: PlatformState) => ReactNode);
    rules?: Partial<PlatformState>;
    className?: string;
    style?: CSSProperties;
  }

  interface PlatformState {
    OS: string;
    OSVersion: string;
    Browser: string;
    BrowserVersion: string;
    DeviceType: string;
    DeviceModel: string;
    DeviceVendor: string;
    Engine: string;
    EngineVersion: string;
    CPU: string;
    UA: string;
  }

  export default class Platform extends Component<PlatformProps, {}> {
    static OS: string;
    static OSVersion: string;
    static Browser: string;
    static BrowserVersion: string;
    static DeviceType: string;
    static DeviceModel: string;
    static DeviceVendor: string;
    static Engine: string;
    static EngineVersion: string;
    static CPU: string;
    static UA: string;

    static select: (selectMap: any) => string | undefined;
  }
}
