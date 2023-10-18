// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const title = "Tailcall"
const organization = "tailcallhq"
const project = "tailcallhq.github.io"

/** @type {import('@docusaurus/types').Config} */
const config = {
  title,
  trailingSlash: true,
  tagline: "<tagline>",
  url: "https://tailcall.run",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: organization, // Usually your GitHub org/user name.
  projectName: project, // Usually your repo name.
  deploymentBranch: "main", // Branch that GitHub pages will deploy from.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: "G-JEP3QDWT0G",
          anonymizeIP: false,
        },
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `https://github.com/${organization}/${project}/tree/develop`,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `https://github.com/${organization}/${project}/tree/develop`,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/blog/**", "/docs/**"],
        },
      }),
    ],
  ],

  themeConfig: {
    navbar: {
      title: title,
      hideOnScroll: false,
      logo: {
        alt: "Tailcall Logo",
        src: "img/logo-light.svg",
      },
      items: [
        {to: "/about", label: "About", position: "right"},
        {
          to: "https://github.com/tailcallhq/graphql-benchmarks#benchmark-results",
          label: "Performance",
          position: "right",
        },
        {
          to: "/docs",
          label: "Docs",
          position: "right",
        },
        {
          to: "https://blog.tailcall.run",
          label: "Blog",
          position: "right",
        },
        {
          label: "Discord",
          position: "right",
          to: "https://discord.gg/7fseDEXUNU",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              to: "/docs/intro/quickstart",
              label: "Introduction",
            },
            {
              to: "/docs/guides/installation/",
              label: "Installation",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Github",
              to: "https://github.com/tailcallhq/tailcall",
            },
            {
              to: "https://blog.tailcall.run",
              label: "Blog",
              position: "right",
            },
            {
              label: "Discord",
              to: "https://discord.gg/7fseDEXUNU",
            },
          ],
        },
        {
          title: "More",
          items: [
            {to: "/about", label: "About"},

            {
              label: "Linkedin",
              to: "https://www.linkedin.com/company/tailcall",
            },
            {
              label: "Twitter",
              to: "https://twitter.com/tailcallhq",
            },
            {
              label: "hi@tailcall.run",
              to: "mailto:hi@tailcall.run",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${title}, Inc. `,
    },
    prism: {
      theme: require("prism-react-renderer/themes/vsDark"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
      showLineNumbers: true,
    },
    colorMode: {
      disableSwitch: true,
      defaultMode: "light",
      respectPrefersColorScheme: false,
    },
  },
}

module.exports = config
