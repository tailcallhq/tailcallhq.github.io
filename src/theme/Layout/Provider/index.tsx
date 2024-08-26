import React, {ReactNode} from "react"
import {composeProviders} from "@docusaurus/theme-common"
import {
  ColorModeProvider,
  AnnouncementBarProvider,
  DocsPreferredVersionContextProvider,
  ScrollControllerProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
} from "@docusaurus/theme-common/internal"
import GithubStarsProvider from "@site/src/components/shared/GithubStarsProvider"
import Footer from "@site/src/components/shared/Footer"
import Announcement from "@site/src/components/shared/Announcement"

// Define the type for LayoutProvider props
type LayoutProviderProps = {
  children: ReactNode // ReactNode represents any React child (JSX, strings, etc.)
}

// Compose the providers to create a single Provider component
const Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
  GithubStarsProvider,
])

// LayoutProvider component wraps the composed providers around its children
const LayoutProvider = ({children}: LayoutProviderProps) => {
  return (
    <Provider>
      <Announcement
        text={"📣 Catch us at GraphQLConf 2024 • September 10-12 • San Francisco • "}
        refLink={"https://graphql.org/conf/2024/schedule/870876ffad45b79d11e09393e7f22587/"}
        refText={" Know more → "}
      />
      {children}
      <Footer />
    </Provider>
  )
}

export default LayoutProvider
