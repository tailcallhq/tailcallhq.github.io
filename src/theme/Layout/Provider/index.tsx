import React, {ReactNode} from "react"
import {composeProviders} from "@docusaurus/theme-common"
import {
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
} from "@docusaurus/theme-common/internal"
import {DocsPreferredVersionContextProvider} from "@docusaurus/plugin-content-docs/client"
import GithubStarsProvider from "@site/src/components/shared/GithubStarsProvider"
import Footer from "@site/src/components/shared/Footer"
import Announcement from "@site/src/components/shared/Announcement"
import WrappedCookiesProvider from "@site/src/components/shared/WrappedCookiesProvider"
import {CookieConsentProvider} from "@site/src/components/shared/CookieConsentProvider"

// Define the type for LayoutProvider props
type LayoutProviderProps = {
  children: ReactNode // ReactNode represents any React child (JSX, strings, etc.)
}

// Compose the providers to create a single Provider component
const Provider = composeProviders([
  ColorModeProvider,
  WrappedCookiesProvider,
  CookieConsentProvider,
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
      {children}
      <Footer />
    </Provider>
  )
}

export default LayoutProvider
