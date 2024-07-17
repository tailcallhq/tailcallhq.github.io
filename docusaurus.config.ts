import {themes as prismThemes} from "prism-react-renderer"
import type * as Preset from "@docusaurus/preset-classic"

const title = "Tailcall"
const organization = "tailcallhq"
const project = "tailcallhq.github.io"

export default {
  title,
  trailingSlash: true,
  tagline: "GraphQL platform engineered for scale",
  headTags: [
    {
      tagName: "script",
      attributes: {
        async: "true",
        src: "https://tag.clearbitscripts.com/v1/pk_498a76355e253f5c7f4e7c7bed78748e/tags.js",
        referrerPolicy: "strict-origin-when-cross-origin",
      },
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "WebSite",
        name: "Tailcall",
        url: "https://tailcall.run/",
      }),
    },
  ],
  url: "https://tailcall.run",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "images/favicon.ico",

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
      /** @type {import("@docusaurus/preset-classic").Options} */
      {
        gtag: {
          trackingID: "G-JEP3QDWT0G",
          anonymizeIP: false,
        },
        docs: {
          // docRootComponent: require.resolve("./src/components/docs/Layout.tsx"),
          sidebarPath: require.resolve("./sidebars.ts"),
          showLastUpdateTime: true,
          sidebarCollapsible: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `https://github.com/${organization}/${project}/tree/develop`,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/blogs/**"],
        },
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "icons/companies/taicall.svg",
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "My Site Logo",
        src: "icons/companies/taicall.svg",
        height: "2.5rem",
      },
      items: [
        {to: "/", label: "Home", position: "left", activeBaseRegex: "^/$"},
        // {to: "/about", label: "About", position: "left"},
        // {to: "/enterprise", label: "Enterprise", position: "left"},
        {to: "/docs", label: "Docs", position: "left"},
        {to: "/graphql", label: "Learn", position: "left"},
        {to: "/blog", label: "Blog", position: "left"},
        {
          href: "https://discord.gg/kRZBPpkgwq",
          position: "right",
          className: "header-button header-button-discord",
          html: `      
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.2405 2.2332C21.5408 1.42782 19.7182 0.834436 17.8125 0.494586C17.7779 0.488038 17.7432 0.504423 17.7253 0.53721C17.4909 0.967757 17.2312 1.52944 17.0494 1.97092C14.9998 1.65402 12.9607 1.65402 10.953 1.97092C10.7712 1.51963 10.5021 0.967757 10.2666 0.53721C10.2488 0.505525 10.2141 0.489124 10.1794 0.494586C8.2748 0.83335 6.45219 1.42673 4.75149 2.2332C4.73677 2.23977 4.72414 2.25071 4.71577 2.26489C1.25866 7.59877 0.311625 12.8016 0.776218 17.9398C0.778307 17.9649 0.791981 17.9889 0.810899 18.0042C3.0918 19.7341 5.30124 20.7843 7.46966 21.4804C7.50435 21.4913 7.54112 21.4781 7.56321 21.4486C8.07614 20.7252 8.53339 19.9626 8.92543 19.1604C8.94856 19.1134 8.92648 19.0577 8.8792 19.0391C8.15394 18.755 7.46334 18.4086 6.79905 18.0152C6.7465 17.9836 6.74229 17.9058 6.79063 17.8687C6.93043 17.7605 7.07025 17.648 7.20374 17.5344C7.22789 17.5135 7.26154 17.5093 7.28994 17.5223C11.6542 19.5801 16.3789 19.5801 20.6915 17.5223C20.7199 17.508 20.7536 17.5125 20.7788 17.5333C20.9122 17.647 21.0521 17.7605 21.193 17.8687C21.2413 17.9058 21.2382 17.9836 21.1856 18.0152C20.5213 18.4162 19.8306 18.755 19.1044 19.038C19.0571 19.0565 19.0361 19.1134 19.0592 19.1604C19.4596 19.9613 19.9168 20.7242 20.4204 21.4475C20.4414 21.4781 20.4792 21.4913 20.5139 21.4804C22.6928 20.7843 24.9023 19.7341 27.1832 18.0042C27.2032 17.9889 27.2158 17.966 27.2179 17.9409C27.7739 12.0005 26.2866 6.84038 23.2752 2.26598C23.2678 2.25071 23.2552 2.23977 23.2405 2.2332ZM9.57715 14.8112C8.26323 14.8112 7.1806 13.5653 7.1806 12.0355C7.1806 10.5056 8.24223 9.25986 9.57715 9.25986C10.9225 9.25986 11.9948 10.5164 11.9737 12.0355C11.9737 13.5653 10.912 14.8112 9.57715 14.8112ZM18.438 14.8112C17.1241 14.8112 16.0414 13.5653 16.0414 12.0355C16.0414 10.5056 17.103 9.25986 18.438 9.25986C19.7833 9.25986 20.8555 10.5164 20.8345 12.0355C20.8345 13.5653 19.7833 14.8112 18.438 14.8112Z" fill="#121315"/>
              </svg>`,
        },
      ],
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["protobuf"],
    },
    colorMode: {
      disableSwitch: true,
      defaultMode: "light",
      respectPrefersColorScheme: false,
    },
    tableOfContents: {},
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/about",
            to: "/",
          },
          {
            from: "/docs/guides/n+1/",
            to: "/docs/graphql-n-plus-one-problem-solved-tailcall/",
          },
          {
            from: "/docs/intro/architecture",
            to: "/docs/",
          },
          {
            from: "/docs/intro/cli/",
            to: "/docs/tailcall-graphql-cli/",
          },
          {
            from: "/docs/intro/operators/",
            to: "/docs/tailcall-dsl-graphql-custom-directives/",
          },
          {
            from: "/docs/intro/server",
            to: "/docs/",
          },
          {
            from: "/docs/getting-started-with-graphql/",
            to: "/docs/",
          },
          {
            from: "/docs/operators/add-field/",
            to: "/docs/tailcall-dsl-graphql-custom-directives/#addfield-directive",
          },
          {
            from: "/docs/operators/graphql/",
            to: "/docs/tailcall-dsl-graphql-custom-directives/#graphql-directive",
          },
          {
            from: "/docs/operators/http/",
            to: "/docs/tailcall-dsl-graphql-custom-directives/#http-directive",
          },
          {
            from: "/docs/operators/server/",
            to: "/docs/tailcall-dsl-graphql-custom-directives/#server-directive",
          },
          {
            from: "/docs/operators/telemetry/",
            to: "/docs/tailcall-dsl-graphql-custom-directives/#telemetry-directive",
          },
          {
            from: "/docs/operators/upstream/",
            to: "/docs/tailcall-dsl-graphql-custom-directives/#upstream-directive",
          },
          {
            from: "/docs/n+1/introduction/",
            to: "/docs/graphql-n-plus-one-problem-solved-tailcall/",
          },
          {
            from: "/enterprise/",
            to: "/",
          },
        ],
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        path: "blog",
        editLocalizedFiles: false,
        blogTitle: "Feed of Tailcall blogs",
        blogDescription: "List of blog posts on Tailcall blog",
        blogSidebarCount: 5,
        blogSidebarTitle: "Recent Blog Posts",
        routeBasePath: "blog",
        include: ["**/*.{md,mdx}"],
        exclude: ["**/_*.{js,jsx,ts,tsx,md,mdx}", "**/_*/**", "**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**"],
        postsPerPage: 5,
        blogListComponent: "@theme/BlogListPage",
        blogPostComponent: "@theme/BlogPostPage",
        blogTagsListComponent: "@theme/BlogTagsListPage",
        blogTagsPostsComponent: "@theme/BlogTagsPostsPage",
        rehypePlugins: [],
        beforeDefaultRemarkPlugins: [],
        beforeDefaultRehypePlugins: [],
        truncateMarker: /<!--\s*(truncate)\s*-->/,
        showReadingTime: true,
        feedOptions: {
          type: "atom",
          title: "Blog title",
          description: "Blog",
          copyright: "Copyright © 2024 Tailcall, Inc.",
        },
      },
    ],

    [
      "@docusaurus/plugin-content-docs",
      {
        id: "graphql",
        path: "graphql",
        routeBasePath: "graphql",
        showLastUpdateTime: true,
        sidebarPath: require.resolve("./graphql/sidebar.ts"),
      },
    ],
    [
      require.resolve("docusaurus-lunr-search"),
      {
        highlightResult: true,
      },
    ],
    async function myPlugin() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions: {[key: string]: any}) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"))
          postcssOptions.plugins.push(require("autoprefixer"))
          return postcssOptions
        },
      }
    },
  ],
}
