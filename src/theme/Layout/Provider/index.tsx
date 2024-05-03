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

// Define the type for LayoutProvider props
type LayoutProviderProps = {
  children: ReactNode // ReactNode represents any React child (JSX, strings, etc.)
  showFooter?: boolean
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
const LayoutProvider = ({children, showFooter = true}: LayoutProviderProps) => {
  return (
    <Provider>
      {children}
      {showFooter && <Footer />}
    </Provider>
  )
}

export default LayoutProvider
