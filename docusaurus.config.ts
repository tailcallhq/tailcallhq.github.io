import {themes as prismThemes} from "prism-react-renderer"
import type {Config} from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

const title = "Tailcall"
const organization = "tailcallhq"
const project = "tailcallhq.github.io"

function fetchRemoteContentConfig(author = "rajatbarman", repo = "tc-docs", branch = "main") {
  return fetch(`https://api.github.com/repos/${author}/${repo}/git/trees/${branch}?recursive=1`, {
    headers: {
      Authorization: "Bearer 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",
    },
  })
    .then((resp) => {
      return resp.json()
    })
    .then((resp) => {
      const config = []
      const docs = resp.tree.filter((doc) => {
        if (doc.path.startsWith("docs/")) {
          return true
        }
      })
      const folders = docs.filter((doc) => {
        return doc.type === "tree"
      })
      folders.forEach((folder) => {
        const folderName = folder.path.replace("docs/", "")
        config.push([
          "docusaurus-plugin-remote-content",
          {
            name: `${folderName}_docs`, // used by CLI, must be path safe
            sourceBaseUrl: `https://raw.githubusercontent.com/${author}/${repo}/${branch}/docs/${folderName}`, // the base url for the markdown (gets prepended to all of the documents when fetching)
            outDir: `docs/${folderName}`, // the base directory to output to.
            documents: docs
              .filter((doc) => {
                return (
                  doc.type === "blob" &&
                  doc.path.startsWith(`docs/${folderName}`) &&
                  (doc.path.endsWith(".md") || doc.path.endsWith(".mdx"))
                )
              })
              .map((doc) => {
                return encodeURIComponent(doc.path.replace(`docs/${folderName}/`, ""))
              }),
          },
        ])
      })
      return config
    })
    .catch((err) => {
      console.log(err)
    })
}

export default async function () {
  const remoteContentPluginConfig = await fetchRemoteContentConfig()
  return {
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
        {
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
        },
      ],
    ],

    themeConfig: {
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        logo: {
          alt: "My Site Logo",
          src: "icons/companies/taicall.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Tutorial",
          },
          {to: "/blog", label: "Blog", position: "left"},
          {
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        disableSwitch: true,
        defaultMode: "light",
        respectPrefersColorScheme: false,
      },
      tableOfContents: {},
    } satisfies Preset.ThemeConfig,
    plugins: [
      ...remoteContentPluginConfig,
      require.resolve("docusaurus-lunr-search"),
      async function myPlugin(context, options) {
        return {
          name: "docusaurus-tailwindcss",
          configurePostCss(postcssOptions) {
            // Appends TailwindCSS and AutoPrefixer.
            postcssOptions.plugins.push(require("tailwindcss"))
            postcssOptions.plugins.push(require("autoprefixer"))
            return postcssOptions
          },
        }
      },
    ],
  }
}
