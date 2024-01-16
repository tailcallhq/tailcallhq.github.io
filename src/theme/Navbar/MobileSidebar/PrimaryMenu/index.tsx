import React from "react"
import { useThemeConfig } from "@docusaurus/theme-common"
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal"
import GithubStarsButton from "@site/src/components/shared/GithubStarsButton"
import NavbarItem, { type Props as NavbarItemConfig } from "@theme/NavbarItem"

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[]
}

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar()

  // TODO how can the order be defined for mobile?
  // Should we allow providing a different list of items?
  const items = useNavbarItems()

  return (
    <ul className="menu__list">
      {items.map((item, i) => (
        <NavbarItem
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
          key={i}
        />
      ))}
      <li className="menu__list-item">
        {/* Render the GithubStarsButton component */}
        <GithubStarsButton className="menu__link" />
      </li>
    </ul>
  )
}
