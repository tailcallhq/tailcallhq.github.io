import fs from "node:fs"
import path from "node:path"
import {themes as prismThemes} from "prism-react-renderer"
import type * as Preset from "@docusaurus/preset-classic"
import prismTheme from "./src/theme/CodeBlock/theme"
import type {Config} from "@docusaurus/types"
import {getNavDropdownItemHtml} from "./src/utils"

const title = "Tailcall"
const organization = "tailcallhq"
const project = "tailcallhq.github.io"
const homeCriticalCss = String.raw`
:root{--ifm-color-scheme:light;--ifm-font-family-base:Arial,sans-serif;--ifm-font-color-base:#1c1e21;--ifm-background-color:#fff;--header-height:6.5rem;--ifm-navbar-height:6.5rem;--ifm-navbar-height-sm:4.5rem;--ifm-navbar-padding-vertical:.5rem;--ifm-navbar-padding-horizontal:1rem;--ifm-navbar-background-color:#fff;--ifm-navbar-shadow:0 1px 2px 0 rgba(0,0,0,.1);--ifm-navbar-link-color:#1c1e21;--ifm-navbar-link-hover-color:#121315;--ifm-font-weight-semibold:600;--ifm-z-index-fixed:200;--ifm-color-brand-light-400:#e7e7e7;--ifm-color-brand-dark-opacity-05:rgba(0,0,0,.05);--ifm-color-brand-light-opacity-15:rgba(255,255,255,.15);--ifm-grid-bg-size-sm:1.25rem;--ifm-navbar-logo-height:2.75rem;--ifm-navbar-logo-height-sm:2.25rem}
*{box-sizing:border-box}html{background:#fff;color:#1c1e21;font:16px/1.5 var(--ifm-font-family-base)}html,body{height:100%}body{word-wrap:break-word;margin:0}a{color:inherit;text-decoration:none}button{font:inherit}#__docusaurus{min-height:100%;display:flex;flex-direction:column}.mainWrapper_eExm{display:flex;flex-direction:column;flex:1 0 auto}.skipToContent_fXgn{position:fixed;left:100%;top:1rem;z-index:201}.navbar{height:var(--header-height);padding:var(--ifm-navbar-padding-vertical)var(--ifm-navbar-padding-horizontal);display:flex;background:#fff;box-shadow:var(--ifm-color-brand-light-400) 0 0 0 1px}.navbar--fixed-top{position:sticky;top:0;z-index:var(--ifm-z-index-fixed)}.navbar__inner{display:flex;flex-wrap:wrap;justify-content:space-between;width:100%;margin:0 auto;position:relative}.navbar__items{display:flex;align-items:center;justify-content:center;min-width:0;flex:1}.navbar__items--right{flex:none;justify-content:flex-end}.navbar__brand{display:flex;align-items:center;min-width:0;margin-right:1rem;color:inherit;position:absolute;left:0}.navbar__toggle{display:none;margin-right:.5rem;padding:0;border:0;background:none;color:inherit}.navbar__logo{flex:none;height:var(--ifm-navbar-logo-height);margin-right:.5rem}.navbar__logo img{height:100%}.navbar__item{display:inline-block}.navbar__link{font-weight:600}.navbar-sidebar__backdrop,.dropdown__menu,.navbarSearchContainer_Bca1:empty,.themedComponent_mlkZ{display:none}[data-theme=light] .themedComponent--light_NVdE,[data-theme=dark] .themedComponent--dark_xIcU,html:not([data-theme]) .themedComponent--light_NVdE{display:initial}@media(max-width:996px){.navbar{height:var(--ifm-navbar-height-sm);transform:none}.navbar__toggle{display:inherit}.navbar__item{display:none}.navbar__items{justify-content:flex-end;margin-left:auto}.navbar__logo{height:var(--ifm-navbar-logo-height-sm)}}
.home-hero{display:grid;justify-content:center}.w-full{width:100%}.max-w-7xl{max-width:80rem}.max-w-xs{max-width:20rem}.max-w-md{max-width:28rem}.mx-auto{margin-left:auto;margin-right:auto}.mb-0{margin-bottom:0}.mt-SPACE_06{margin-top:24px}.h-full{height:100%}.hidden{display:none}.flex{display:flex}.grid{display:grid}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-x-SPACE_03{column-gap:12px}.space-x-SPACE_04>:not([hidden])~:not([hidden]){margin-left:16px}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}.z-20{z-index:20}.cursor-pointer{cursor:pointer}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.border{border-width:1px}.border-2{border-width:2px}.border-solid{border-style:solid}.border-tailCall-border-dark-100{border-color:#121315}.bg-white{background-color:#fff}.bg-transparent{background-color:transparent}.bg-tailCall-dark-500{background-color:#121315}.bg-tailCall-yellow{background-color:#fdea2e}.text-tailCall-light-100{color:#fff}.text-tailCall-dark-500{color:#121315}.font-bold{font-weight:700}.font-normal{font-weight:400}.text-title-large{font-size:32px;font-weight:700;line-height:41.6px;letter-spacing:-1px}.text-content-small{font-size:16px;font-weight:400;line-height:24px;letter-spacing:0}.h-12{height:3rem}.px-8{padding-left:2rem;padding-right:2rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.px-SPACE_02{padding-left:8px;padding-right:8px}.px-SPACE_06{padding-left:24px;padding-right:24px}.py-SPACE_03{padding-top:12px;padding-bottom:12px}.\!pb-0{padding-bottom:0!important}.group{position:relative}.group .absolute{position:absolute}.group span{position:relative}@media(max-width:639px){.home-hero{min-height:calc(100vh - var(--ifm-navbar-height-sm));align-content:start}.hero-banner-title,.hero-banner-sub-title{max-width:unset;text-align:center}}`

const homeBaseUrlWarningScript =
  /<script data-rh=true>document\.addEventListener\("DOMContentLoaded",function\(\)\{void 0===window\.docusaurus&&insertBanner\(\)\}\);function insertBanner\(\)\{[\s\S]*?<\/script>/
const homeChatbotScript = /<script[^>]*id=chatbotscript[\s\S]*?<\/script>/

const homeStylesheetLink = /<link rel=stylesheet href=([^\s>]+)>/
const homeDeferredScript = /<script src=([^\s>]+) defer><\/script>/g

function optimizeHomePage(outDir: string) {
  const indexPath = path.join(outDir, "index.html")
  if (!fs.existsSync(indexPath)) return

  let html = fs.readFileSync(indexPath, "utf8")
  const stylesheetMatch = html.match(homeStylesheetLink)
  if (!stylesheetMatch) return

  const stylesheetHref = stylesheetMatch[1]
  html = html.replace(homeBaseUrlWarningScript, "")
  html = html.replace(homeChatbotScript, "")
  html = html.replace(
    stylesheetMatch[0],
    `<style data-critical-home>${homeCriticalCss}</style><script>(function(){var loaded=false;function load(){if(loaded)return;loaded=true;var l=document.createElement("link");l.rel="stylesheet";l.href="${stylesheetHref}";document.head.appendChild(l);for(var i=0;i<scripts.length;i++){var s=document.createElement("script");s.src=scripts[i];s.defer=true;document.body.appendChild(s)}cleanup()}function cleanup(){events.forEach(function(e){window.removeEventListener(e,load,opts)})}var scripts=[];var events=["pointerdown","keydown","touchstart","scroll"];var opts={once:true,passive:true};events.forEach(function(e){window.addEventListener(e,load,opts)});window.addEventListener("load",function(){setTimeout(load,3000)})})();</script><noscript><link rel=stylesheet href=${stylesheetHref}></noscript>`,
  )

  const scripts: string[] = []
  html = html.replace(homeDeferredScript, (_match, scriptSrc: string) => {
    scripts.push(scriptSrc)
    return ""
  })
  html = html.replace("var scripts=[];", `var scripts=${JSON.stringify(scripts)};`)

  fs.writeFileSync(indexPath, html)
}

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
  onBrokenMarkdownLinks: "throw",
  onBrokenAnchors: "throw",
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
  future: {
    experimental_faster: true, // Required for faster production builds. For reference: https://docusaurus.io/blog/releases/3.6#adoption-strategy
  },
  presets: [
    [
      "classic",
      /** @type {import("@docusaurus/preset-classic").Options} */
      {
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
    image: "icons/companies/tailcall.svg",
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
        src: "icons/companies/tailcall.svg",
      },
      items: [
        {to: "/", label: "Home", position: "left", activeBaseRegex: "^/$"},
        // {to: "/about", label: "About", position: "left"},
        // {to: "/enterprise", label: "Enterprise", position: "left"},
        {to: "/blog", label: "Blog", position: "left"},
        {
          label: "Developers",
          position: "left",
          items: [
            {
              to: "/docs",
              html: getNavDropdownItemHtml("/images/home/book.svg", "Docs Icon", "Docs"),
            },
            {
              to: "/graphql",
              html: getNavDropdownItemHtml("/images/home/archive.svg", "Learn Icon", "Learn"),
            },
            {
              to: "/releases",
              html: getNavDropdownItemHtml("/images/home/git-merge.svg", "Releases Icon", "Releases"),
            },
          ],
        },
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
        onInlineAuthors: "throw",
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
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "releases",
        path: "releases",
        routeBasePath: "releases",
        showLastUpdateTime: true,
        async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}: any) {
          const sidebarItems = await defaultSidebarItemsGenerator(args)
          return sidebarItems.reverse()
        },
      },
    ],
    async function homePagePerformancePlugin() {
      return {
        name: "home-page-performance",
        postBuild({outDir}: {outDir: string}) {
          optimizeHomePage(outDir)
        },
      }
    },
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
