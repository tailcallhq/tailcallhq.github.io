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
      // title: title,
      hideOnScroll: false,
      logo: {
        alt: "Tailcall Logo",
        src: "img/logo-v1.svg",
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
          position: "right",
          to: "https://discord.gg/Q2ZExpFCnA",
          html: `
          <div style="display: flex; align-items: center;">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M25.12,6.946c-2.424-1.948-6.257-2.278-6.419-2.292c-0.256-0.022-0.499,0.123-0.604,0.357 c-0.004,0.008-0.218,0.629-0.425,1.228c2.817,0.493,4.731,1.587,4.833,1.647c0.478,0.278,0.638,0.891,0.359,1.368 C22.679,9.572,22.344,9.75,22,9.75c-0.171,0-0.343-0.043-0.501-0.135C21.471,9.598,18.663,8,15.002,8 C11.34,8,8.531,9.599,8.503,9.615C8.026,9.892,7.414,9.729,7.137,9.251C6.86,8.775,7.021,8.164,7.497,7.886 c0.102-0.06,2.023-1.158,4.848-1.65c-0.218-0.606-0.438-1.217-0.442-1.225c-0.105-0.235-0.348-0.383-0.604-0.357 c-0.162,0.013-3.995,0.343-6.451,2.318C3.564,8.158,1,15.092,1,21.087c0,0.106,0.027,0.209,0.08,0.301 c1.771,3.11,6.599,3.924,7.699,3.959c0.007,0.001,0.013,0.001,0.019,0.001c0.194,0,0.377-0.093,0.492-0.25l1.19-1.612 c-2.61-0.629-3.99-1.618-4.073-1.679c-0.444-0.327-0.54-0.953-0.213-1.398c0.326-0.443,0.95-0.541,1.394-0.216 C7.625,20.217,10.172,22,15,22c4.847,0,7.387-1.79,7.412-1.808c0.444-0.322,1.07-0.225,1.395,0.221 c0.324,0.444,0.23,1.066-0.212,1.392c-0.083,0.061-1.456,1.048-4.06,1.677l1.175,1.615c0.115,0.158,0.298,0.25,0.492,0.25 c0.007,0,0.013,0,0.019-0.001c1.101-0.035,5.929-0.849,7.699-3.959c0.053-0.092,0.08-0.195,0.08-0.301 C29,15.092,26.436,8.158,25.12,6.946z M11,19c-1.105,0-2-1.119-2-2.5S9.895,14,11,14s2,1.119,2,2.5S12.105,19,11,19z M19,19 c-1.105,0-2-1.119-2-2.5s0.895-2.5,2-2.5s2,1.119,2,2.5S20.105,19,19,19z"/></svg>
          </div>                    
          `,
        },
        {
          to: "https://github.com/tailcallhq/tailcall/",
          position: "right",
          html: `
          <div style="display: flex; align-items: center; gap: 5px; transition: all 0.2s ease-in-out;">          
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"/></svg>          
          <span>Star</span>
          <span
            id="gh-button"
            style="transition: all 0.2s ease-in-out;"
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
