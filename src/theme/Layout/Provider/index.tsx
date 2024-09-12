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
        text={"📣 GraphQL Conf Hackathon 2024 • September 10-12 • Win $5000 cash prize"}
        refLink={"/graphql/graphql-conf-hackathon-2024"}
        refText={" Know more → "}
      />
      {children}
      <Footer />
    </Provider>
  )
}

export default LayoutProvider
