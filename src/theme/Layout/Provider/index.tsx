import React from "react"
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

const Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
  GithubStarsProvider,
])
export default function LayoutProvider({children}) {
  return <Provider>{children}</Provider>
}
