import {themes as prismThemes} from "prism-react-renderer"
import type * as Preset from "@docusaurus/preset-classic"
import prismTheme from "./src/theme/CodeBlock/theme"
import type {Config} from "@docusaurus/types"
import {getNavDropdownItemHtml} from "./src/utils"
import fs from "fs"
import path from "path"

const title = "Tailcall"
const organization = "tailcallhq"
const project = "tailcallhq.github.io"

const homeCriticalCss = `
*,::before,::after{box-sizing:border-box}
:root{--ifm-navbar-height:4.5rem}
html{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#121315;background:#fff}
body{margin:0;font-size:16px;line-height:1.5;background:#fff}
a{color:inherit;text-decoration:none}
img,svg{display:block;max-width:100%}
.skipToContent_fXgn{position:absolute;left:-999px}
.navbar{display:flex;align-items:center;min-height:4.5rem;width:100%;background:#fff;border-bottom:1px solid #e7e7e7;z-index:20}
.navbar__inner{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 1.25rem}
.navbar__items{display:flex;align-items:center;gap:1rem}
.navbar__items--right{margin-left:auto}
.navbar__brand{display:flex;align-items:center}
.navbar__logo{width:7.5rem;height:2.5rem;display:flex;align-items:center}
.navbar__logo img{height:2.25rem;width:auto}
.themedComponent--dark_xIcU{display:none}
.navbar__item,.navbarSearchContainer_Bca1,.dropdown__menu{display:none}
.navbar__toggle{display:inline-flex;align-items:center;justify-content:center;width:2.75rem;height:2.75rem;padding:0;border:0;background:transparent;color:#121315}
.main-wrapper{width:100%}
.grid{display:grid}.justify-center{justify-content:center}.flex{display:flex}.flex-col{flex-direction:column}.justify-between{justify-content:space-between}.items-center{align-items:center}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}
.hidden{display:none}.w-full{width:100%}.h-full{height:100%}.z-20{position:relative;z-index:1}.mx-auto{margin-left:auto;margin-right:auto}.mb-0{margin-bottom:0}.mt-SPACE_06{margin-top:24px}.space-x-SPACE_04>:not([hidden])~:not([hidden]){margin-left:16px}
.max-w-xs{max-width:20rem}.max-w-md{max-width:28rem}.max-w-7xl{max-width:80rem}
.px-8{padding-left:2rem;padding-right:2rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.px-SPACE_02{padding-left:8px;padding-right:8px}.px-SPACE_06{padding-left:24px;padding-right:24px}.py-SPACE_03{padding-top:12px;padding-bottom:12px}.\\!pb-0{padding-bottom:0!important}
.rounded-md{border-radius:.375rem}.rounded-lg{border-radius:.5rem}
.border{border-width:1px}.border-2{border-width:2px}.border-solid{border-style:solid}.border-tailCall-border-dark-100{border-color:#121315}
.bg-white{background:#fff}.bg-transparent{background:transparent}.bg-tailCall-yellow{background:#fdea2e}.bg-tailCall-dark-500{background:#121315}
.text-tailCall-dark-500{color:#121315}.text-tailCall-light-100{color:#fff}
.text-title-large{font-size:32px;line-height:41.6px;font-weight:700;letter-spacing:-1px}.text-content-small{font-size:16px;line-height:24px}.font-normal{font-weight:400}.font-bold{font-weight:700}
.hero-banner-title{margin:0;color:#121315}.hero-banner-sub-title{margin-top:1.5rem;color:#545556}
.group{overflow:hidden}.cursor-pointer{cursor:pointer}
.h-12{height:3rem}.gap-x-SPACE_03{column-gap:12px}.justify-center{justify-content:center}.items-center{align-items:center}
main.grid{width:100%}section.w-full{width:100%}
@media (max-width:639px){.sm\\:hidden{display:flex}.sm\\:flex{display:none}.hero-banner-title{max-width:22rem}.group{min-width:0}.group span{white-space:nowrap;font-size:14px}.navbar__inner{padding:0 1rem}.navbar__logo{width:6.8rem}}
@media (min-width:640px){:root{--ifm-navbar-height:6.5rem}.navbar{min-height:6.5rem}.navbar__inner{padding:0 2rem}.navbar__toggle{display:none}.navbar__item{display:inline-flex}.sm\\:hidden{display:none}.sm\\:flex{display:flex}.sm\\:items-center{align-items:center}.sm\\:text-center{text-align:center}.sm\\:max-w-2xl{max-width:42rem}.sm\\:max-w-5xl{max-width:64rem}.sm\\:m-auto{margin:auto}.sm\\:mt-SPACE_04{margin-top:16px}.sm\\:mt-SPACE_10{margin-top:40px}.sm\\:space-x-SPACE_06>:not([hidden])~:not([hidden]){margin-left:24px}.sm\\:rounded-2xl{border-radius:1rem}.sm\\:rounded-xl{border-radius:.75rem}.sm\\:h-16{height:4rem}.sm\\:text-display-small{font-size:56px;line-height:67.2px;font-weight:700;letter-spacing:-2px}.sm\\:text-content-medium{font-size:20px;line-height:32px}.sm\\:text-title-small{font-size:20px;line-height:26px;font-weight:700}.sm\\:px-SPACE_08{padding-left:32px;padding-right:32px}.sm\\:py-SPACE_04{padding-top:16px;padding-bottom:16px}.object-contain{object-fit:contain}.mt-8{margin-top:2rem}}
@media (min-width:768px){.md\\:px-24{padding-left:6rem;padding-right:6rem}.md\\:justify-center{justify-content:center}}
@media (min-width:1024px){.lg\\:py-20{padding-top:5rem;padding-bottom:5rem}.lg\\:px-36{padding-left:9rem;padding-right:9rem}.lg\\:text-display-large{font-size:96px;line-height:105.6px;font-weight:700;letter-spacing:-3px}.lg\\:text-content-large{font-size:24px;line-height:36px}.lg\\:px-SPACE_10{padding-left:40px;padding-right:40px}.lg\\:py-SPACE_05{padding-top:20px;padding-bottom:20px}.lg\\:block{display:block}.navbarSearchContainer_Bca1{display:flex}}
`

const deferHomeAssetsScript = (styleHref: string, scriptSrcs: string[]) => `
<script>
window.docusaurus=window.docusaurus||{};
(function(){
  var loaded=false;
  var scripts=${JSON.stringify(scriptSrcs)};
  function loadStyle(){
    if(!${JSON.stringify(styleHref)})return;
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.href=${JSON.stringify(styleHref)};
    document.head.appendChild(link);
  }
  function loadScripts(index){
    if(index>=scripts.length)return;
    var script=document.createElement('script');
    script.src=scripts[index];
    script.defer=true;
    script.onload=function(){loadScripts(index+1)};
    document.head.appendChild(script);
  }
  function load(){
    if(loaded)return;
    loaded=true;
    loadStyle();
    loadScripts(0);
  }
  ['pointerdown','keydown','touchstart','scroll'].forEach(function(eventName){
    window.addEventListener(eventName,load,{once:true,passive:true});
  });
  window.addEventListener('load',function(){setTimeout(load,9000)});
})();
</script>`

export default {
  title,
  trailingSlash: true,
  tagline: "GraphQL platform engineered for scale",
  headTags: [
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
    experimental_faster: false, // Required for faster production builds. For reference: https://docusaurus.io/blog/releases/3.6#adoption-strategy
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
    async function homePagePerformancePlugin() {
      return {
        name: "home-page-performance",
        async postBuild({outDir}) {
          const indexPath = path.join(outDir, "index.html")
          if (!fs.existsSync(indexPath)) return

          let html = fs.readFileSync(indexPath, "utf8")
          const styleMatch = html.match(/<link rel="stylesheet" href="([^"]+)">/)
          const scriptSrcs = Array.from(html.matchAll(/<script src="([^"]+)" defer="defer"><\/script>/g)).map(
            (match) => match[1],
          )

          html = html.replace(
            /<link rel="stylesheet" href="([^"]+)">/,
            `<style id="home-critical-css">${homeCriticalCss}</style><noscript><link rel="stylesheet" href="$1"></noscript>`,
          )
          html = html.replace(/<script src="[^"]+" defer="defer"><\/script>\n?/g, "")
          html = html.replace("</head>", `${deferHomeAssetsScript(styleMatch?.[1] ?? "", scriptSrcs)}</head>`)

          fs.writeFileSync(indexPath, html)
        },
      }
    },
  ],
} satisfies Config
