import React from "react"
import clsx from "clsx"
import ErrorBoundary from "@docusaurus/ErrorBoundary"
import {PageMetadata, SkipToContentFallbackId, ThemeClassNames} from "@docusaurus/theme-common"
import {useKeyboardNavigation} from "@docusaurus/theme-common/internal"
import SkipToContent from "@theme/SkipToContent"
import AnnouncementBar from "@theme/AnnouncementBar"
import Navbar from "@theme/Navbar"
import Footer from "@theme/Footer"
import LayoutProvider from "@theme/Layout/Provider"
import ErrorPageContent from "@theme/ErrorPageContent"
import type {Props} from "@theme/Layout"
import styles from "./styles.module.css"
import GlobalLayout from "@site/src/components/shared/GlobalLayout"
import Announcement from "@site/src/components/shared/Announcement"

export default function Layout(props: Props): JSX.Element {
  const {
    children,
    noFooter,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props

  useKeyboardNavigation()
  const targetDate = new Date("2024-11-25T20:00:00-08:00") // Nov 25, 6:00 PM - 8:00 PM PST
  const currentDate = new Date()
  return (
    <LayoutProvider>
      <GlobalLayout />

      <PageMetadata title={title} description={description} />

      <SkipToContent />

      <AnnouncementBar />

      {currentDate < targetDate && (
        <Announcement
          text={"🚀 Scaling APIs: Rest, gRPC, or GraphQL? Let’s Break It Down!"}
          refLink={"https://lu.ma/8sqfoc81"}
          refText={"Register here"}
        />
      )}

      <Navbar />

      <div
        id={SkipToContentFallbackId}
        className={clsx(ThemeClassNames.wrapper.main, styles.mainWrapper, wrapperClassName)}
      >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>{children}</ErrorBoundary>
      </div>

      {!noFooter && <Footer />}
    </LayoutProvider>
  )
}
