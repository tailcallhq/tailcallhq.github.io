import React, {useState} from "react"
import {useDocsSidebar} from "@docusaurus/theme-common/internal"
import BackToTopButton from "@theme/BackToTopButton"
import DocRootLayoutSidebar from "@theme/DocRoot/Layout/Sidebar"
import DocRootLayoutMain from "@theme/DocRoot/Layout/Main"
import type {Props} from "@theme/DocRoot/Layout"

import styles from "./styles.module.css"
import Announcement from "@site/src/components/shared/Announcement"

export default function DocRootLayout({children}: Props): JSX.Element {
  const sidebar = useDocsSidebar()
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false)
  return (
    <>
      <Announcement
        text={"📣 Catch us at GraphQLConf 2024 • September 10-12 • San Francisco • "}
        refLink={"https://graphql.org/conf/2024/schedule/870876ffad45b79d11e09393e7f22587/"}
        refText={" Know more → "}
      />
      <div className={styles.docsWrapper}>
        <BackToTopButton />
        <div className={styles.docRoot}>
          {sidebar && (
            <DocRootLayoutSidebar
              sidebar={sidebar.items}
              hiddenSidebarContainer={hiddenSidebarContainer}
              setHiddenSidebarContainer={setHiddenSidebarContainer}
            />
          )}
          <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>{children}</DocRootLayoutMain>
        </div>
      </div>
    </>
  )
}
