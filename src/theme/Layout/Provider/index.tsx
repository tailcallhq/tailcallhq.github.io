import React, { ReactNode } from "react"
import { composeProviders } from "@docusaurus/theme-common"
import {
  ColorModeProvider,
  AnnouncementBarProvider,
  DocsPreferredVersionContextProvider,
  ScrollControllerProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider
} from "@docusaurus/theme-common/internal"
import GithubStarsProvider from "@site/src/components/shared/GithubStarsProvider"

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
  GithubStarsProvider
])

// LayoutProvider component wraps the composed providers around its children
const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return <Provider>{children}</Provider>
}

export default LayoutProvider
