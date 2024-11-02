import {themes as prismThemes} from "prism-react-renderer"
import type * as Preset from "@docusaurus/preset-classic"
import prismTheme from "./src/theme/CodeBlock/theme"
import type {Config} from "@docusaurus/types"

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
        id: "chatbotscript",
        "data-accountid": "CZPG9aVdtk59Tjz4SMTu8w==",
        "data-websiteid": "75VGI0NlBqessD4BQn2pFg==",
        src: "https://app.robofy.ai/bot/js/common.js?v=" + new Date().getTime(),
      },
    },
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
        type: "text/javascript",
      },
      innerHTML: `
      !function () {var reb2b = window.reb2b = window.reb2b || [];
    if (reb2b.invoked) return;reb2b.invoked = true;reb2b.methods = ["identify", "collect"];
    reb2b.factory = function (method) {return function () {var args = Array.prototype.slice.call(arguments);
    args.unshift(method);reb2b.push(args);return reb2b;};};
    for (var i = 0; i < reb2b.methods.length; i++) {var key = reb2b.methods[i];reb2b[key] = reb2b.factory(key);}
    reb2b.load = function (key) {var script = document.createElement("script");script.type = "text/javascript";script.async = true;
    script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/reb2b.js.gz";
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(script, first);};
    reb2b.SNIPPET_VERSION = "1.0.1";reb2b.load("0OV0VHL3P56Z");}();`,
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
    localeConfigs: {
      en: {
        label: "English",
      },
    },
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
    algolia: {
      appId: "X27WDVHRQ3",
      apiKey: "35bc100f239853cd8a7195b23ed7393b",
      indexName: "tailcall",
      contextualSearch: false,
      searchParameters: {
        facetFilters: [],
      },
    },

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
          type: "search",
          position: "right",
          className: "hidden lg:flex search-icon-navbar",
        },
      ],
    },
    prism: {
      theme: prismTheme,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["protobuf", "json", "diff"],
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
      "./plugins/custom-blog-plugin.ts",
      {
        path: "blog",
        editLocalizedFiles: false,
        blogTitle: "Feed of Tailcall blogs",
        blogDescription: "List of blog posts on Tailcall blog",
        blogSidebarCount: 10,
        blogSidebarTitle: "Recent Blog Posts",
        routeBasePath: "blog",
        include: ["**/*.{md,mdx}"],
        exclude: ["**/_*.{js,jsx,ts,tsx,md,mdx}", "**/_*/**", "**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**"],
        postsPerPage: "ALL",
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
          type: "all",
          copyright: `Copyright © ${new Date().getFullYear()} Tailcall, Inc.`,
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "privacy",
        path: "privacy",
        routeBasePath: "privacy",
        showLastUpdateTime: true,
        sidebarPath: require.resolve("./privacy/sidebar.ts"),
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
    async function tailwindPlugin() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          return {
            ...postcssOptions,
            plugins: [...postcssOptions.plugins, require("tailwindcss"), require("autoprefixer")],
          }
        },
      }
    },
  ],
} satisfies Config
