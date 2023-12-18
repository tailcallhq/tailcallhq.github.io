import {themes as prismThemes} from "prism-react-renderer"
import type {Config} from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

const title = "Tailcall"
const organization = "tailcallhq"
const project = "tailcallhq.github.io"

function fetchGithubStars() {
  console.log("Fetching stars on github...")
  return fetch("https://api.github.com/repos/tailcallhq/tailcall", {
    // headers: {
    //   Authorization: "Bearer <pat token>",
    // },
  })
    .then((resp) => {
      return resp.json()
    })
    .then((resp) => {
      return resp.stargazers_count ?? "200"
    })
}

// function fetchRemoteContentConfig(author = "rajatbarman", repo = "tc-docs", branch = "main") {
//   console.log(`Fetching docs content from ${author}/${repo}`)
//   return fetch(`https://api.github.com/repos/${author}/${repo}/git/trees/${branch}?recursive=1`, {
//     // headers: {
//     //   Authorization: "Bearer <pat token>",
//     // },
//   })
//     .then((resp) => {
//       return resp.json()
//     })
//     .then((resp) => {
//       if (resp.message) {
//         console.log(`\x1b[31m${resp.message}\x1b[0m`)
//       }
//       const config = []
//       const docs = resp.tree?.filter((doc) => {
//         if (doc.path.startsWith("docs/")) {
//           return true
//         }
//       })
//       const folders = docs?.filter((doc) => {
//         return doc.type === "tree"
//       })
//       folders.forEach((folder) => {
//         const folderName = folder.path.replace("docs/", "")
//         config.push([
//           "docusaurus-plugin-remote-content",
//           {
//             name: `${folderName}_docs`, // used by CLI, must be path safe
//             sourceBaseUrl: `https://raw.githubusercontent.com/${author}/${repo}/${branch}/docs/${folderName}`, // the base url for the markdown (gets prepended to all of the documents when fetching)
//             outDir: `docs/${folderName}`, // the base directory to output to.
//             documents: docs
//               .filter((doc) => {
//                 return (
//                   doc.type === "blob" &&
//                   doc.path.startsWith(`docs/${folderName}`) &&
//                   (doc.path.endsWith(".md") || doc.path.endsWith(".mdx"))
//                 )
//               })
//               .map((doc) => {
//                 return encodeURIComponent(doc.path.replace(`docs/${folderName}/`, ""))
//               }),
//           },
//         ])
//       })
//       return config
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

export default async function () {
  // const remoteContentPluginConfig = await fetchRemoteContentConfig()
  const githubStarsCount = await fetchGithubStars()
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
            // docRootComponent: require.resolve("./src/components/docs/Layout.tsx"),
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
          height: "2.5rem",
        },
        items: [
          {to: "/about", label: "About", position: "left"},
          // {to: "/enterprise", label: "Enterprise", position: "left"},
          {to: "/docs", label: "Docs", position: "left"},
          {to: "https://blog.tailcall.run/", label: "Blog", position: "left"},
          {
            href: "https://discord.gg/Q2ZExpFCnA",
            position: "right",
            className: "header-button header-button-discord",
            html: `      
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.2405 2.2332C21.5408 1.42782 19.7182 0.834436 17.8125 0.494586C17.7779 0.488038 17.7432 0.504423 17.7253 0.53721C17.4909 0.967757 17.2312 1.52944 17.0494 1.97092C14.9998 1.65402 12.9607 1.65402 10.953 1.97092C10.7712 1.51963 10.5021 0.967757 10.2666 0.53721C10.2488 0.505525 10.2141 0.489124 10.1794 0.494586C8.2748 0.83335 6.45219 1.42673 4.75149 2.2332C4.73677 2.23977 4.72414 2.25071 4.71577 2.26489C1.25866 7.59877 0.311625 12.8016 0.776218 17.9398C0.778307 17.9649 0.791981 17.9889 0.810899 18.0042C3.0918 19.7341 5.30124 20.7843 7.46966 21.4804C7.50435 21.4913 7.54112 21.4781 7.56321 21.4486C8.07614 20.7252 8.53339 19.9626 8.92543 19.1604C8.94856 19.1134 8.92648 19.0577 8.8792 19.0391C8.15394 18.755 7.46334 18.4086 6.79905 18.0152C6.7465 17.9836 6.74229 17.9058 6.79063 17.8687C6.93043 17.7605 7.07025 17.648 7.20374 17.5344C7.22789 17.5135 7.26154 17.5093 7.28994 17.5223C11.6542 19.5801 16.3789 19.5801 20.6915 17.5223C20.7199 17.508 20.7536 17.5125 20.7788 17.5333C20.9122 17.647 21.0521 17.7605 21.193 17.8687C21.2413 17.9058 21.2382 17.9836 21.1856 18.0152C20.5213 18.4162 19.8306 18.755 19.1044 19.038C19.0571 19.0565 19.0361 19.1134 19.0592 19.1604C19.4596 19.9613 19.9168 20.7242 20.4204 21.4475C20.4414 21.4781 20.4792 21.4913 20.5139 21.4804C22.6928 20.7843 24.9023 19.7341 27.1832 18.0042C27.2032 17.9889 27.2158 17.966 27.2179 17.9409C27.7739 12.0005 26.2866 6.84038 23.2752 2.26598C23.2678 2.25071 23.2552 2.23977 23.2405 2.2332ZM9.57715 14.8112C8.26323 14.8112 7.1806 13.5653 7.1806 12.0355C7.1806 10.5056 8.24223 9.25986 9.57715 9.25986C10.9225 9.25986 11.9948 10.5164 11.9737 12.0355C11.9737 13.5653 10.912 14.8112 9.57715 14.8112ZM18.438 14.8112C17.1241 14.8112 16.0414 13.5653 16.0414 12.0355C16.0414 10.5056 17.103 9.25986 18.438 9.25986C19.7833 9.25986 20.8555 10.5164 20.8345 12.0355C20.8345 13.5653 19.7833 14.8112 18.438 14.8112Z" fill="#121315"/>
              </svg>`,
          },
          {
            href: "https://github.com/tailcallhq/tailcall",
            position: "right",
            className: "header-button header-button-github",
            html: `
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9672 0C4.90263 0 0 5.04167 0 11.2789C0 16.2646 3.14128 20.485 7.49908 21.9787C8.04392 22.091 8.24349 21.736 8.24349 21.4374C8.24349 21.1759 8.22553 20.2796 8.22553 19.3458C5.17471 20.0182 4.53941 18.0013 4.53941 18.0013C4.04912 16.6941 3.32267 16.3581 3.32267 16.3581C2.32414 15.6672 3.39541 15.6672 3.39541 15.6672C4.50304 15.7419 5.08424 16.825 5.08424 16.825C6.06459 18.5428 7.64433 18.0574 8.27986 17.7586C8.37055 17.0303 8.66126 16.5261 8.96994 16.2461C6.53669 15.9846 3.97661 15.0136 3.97661 10.6812C3.97661 9.44877 4.41212 8.44044 5.1022 7.65623C4.99333 7.37619 4.61192 6.21821 5.21131 4.66835C5.21131 4.66835 6.13733 4.36952 8.22531 5.8261C9.11924 5.57921 10.0411 5.45362 10.9672 5.45256C11.8932 5.45256 12.8372 5.58342 13.7089 5.8261C15.7971 4.36952 16.7231 4.66835 16.7231 4.66835C17.3225 6.21821 16.9409 7.37619 16.832 7.65623C17.5403 8.44044 17.9578 9.44877 17.9578 10.6812C17.9578 15.0136 15.3978 15.9658 12.9463 16.2461C13.3459 16.6008 13.6907 17.273 13.6907 18.3375C13.6907 19.85 13.6728 21.0638 13.6728 21.4372C13.6728 21.736 13.8726 22.091 14.4172 21.9789C18.775 20.4847 21.9163 16.2646 21.9163 11.2789C21.9342 5.04167 17.0136 0 10.9672 0Z" fill="#121315"/>
              </svg>
              <span>Star ${githubStarsCount}</span>
            `,
          },
        ],
      },
      prism: {
        theme: prismThemes.vsDark,
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
      // ...(remoteContentPluginConfig || []),
      [
        require.resolve("docusaurus-lunr-search"),
        {
          highlightResult: true,
        },
      ],
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
