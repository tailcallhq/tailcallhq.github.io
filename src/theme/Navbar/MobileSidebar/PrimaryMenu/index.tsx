import React from "react"
import {useThemeConfig} from "@docusaurus/theme-common"
import {useNavbarMobileSidebar} from "@docusaurus/theme-common/internal"
import NavbarItem from "@theme/NavbarItem"
import GithubStarsButton from "@site/src/components/shared/GithubStarsButton"

// Function to retrieve navbar items from the theme configuration
function useNavbarItems() {
  // TODO: temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items
}

// Component for the mobile version of the primary navigation menu
export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar()
  // TODO: How can the order be defined for mobile?
  // Should we allow providing a different list of items?

  // Get the navbar items using the custom hook
  const items = useNavbarItems()

  return (
    <ul className="menu__list">
      {items.map((item, i) => (
        // Render NavbarItem components based on navbar items
        <NavbarItem
          mobile
          {...(item as any)} // Temporarily casting until the type is improved
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
