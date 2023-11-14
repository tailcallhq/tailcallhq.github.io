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
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://codesandbox.io",
      },
    },
  ],
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
          to: "https://discord.gg/Q2ZExpFCnA",
        },
        {
          to: "https://github.com/tailcallhq/tailcall/",
          position: "right",
          html: `
          <div style="display: flex; align-items: center; gap: 5px; font-weight: 600">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2.5"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-line-join="round"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>
          </svg>
          <span>&nbsp;Github</span>
          <span
            id="gh-button"
            style="transition: 'max-width 1s', opacity: '1s'"
            className="w-full overflow-hidden whitespace-nowrap max-w-[100px] opacity-100"
          >
          </span>
        </div>        
          `,
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
              to: "/docs/",
              label: "Introduction",
            },
            {
              to: "/docs/getting_started/",
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
              to: "https://discord.gg/Q2ZExpFCnA",
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
  plugins: [require.resolve("docusaurus-lunr-search")],
}

module.exports = config
