const axios = require("axios")
const fs = require("fs")
const path = require("path")

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_OWNER = "tailcallhq"
const REPO_NAME = "tailcall"

// Fetch releases using GitHub API
async function fetchReleases() {
  let releases = []
  let page = 1
  const perPage = 100

  while (true) {
    const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      params: {
        per_page: perPage,
        page,
      },
    })
    if (response.data.length === 0) break
    releases = releases.concat(response.data)
    page++
  }

  return releases
}

// Group releases by year and month
function groupReleasesByMonth(releases) {
  const grouped = {}

  releases.forEach((release) => {
    // Ignore draft releases
    if (release.draft) return

    const date = new Date(release.published_at)
    const year = date.getFullYear()
    const month = date.toLocaleString("default", {month: "long"})

    const folder = `releases/${year}/${month}`
    if (!grouped[folder]) {
      grouped[folder] = []
    }
    grouped[folder].push({
      name: release.name,
      body: release.body || "No release notes available",
      published_at: release.published_at,
    })
  })

  return grouped
}

function formatReleaseBody(body) {
  // Remove "## Changes" heading
  body = body.replace(/^## Changes\s*/gm, "")

  // Change all major section headings (like ## 🐛 Bug Fixes, ## Maintenance) to ####
  body = body.replace(/^##\s*(.*)$/gm, "### $1")

  // Convert @username (#prno) into proper GitHub links
  body = body.replace(/@(\w+)\s?\(#(\d+)\)/g, (match, username, prNumber) => {
    const userLink = `[@${username}](https://github.com/${username})`
    const prLink = `[#${prNumber}](https://github.com/${REPO_OWNER}/${REPO_NAME}/pull/${prNumber})`
    return `${userLink} (${prLink})`
  })

  // Escape double braces (like {{args}}) to prevent MDX parsing errors
  body = body.replace(/{{(.*?)}}/g, "{'{{$1}}'}")

  return body.trim()
}

// Write releases to files
function writeReleasesToFiles(groupedReleases) {
  let isFirstFileWrite = true

  for (const [folder, releases] of Object.entries(groupedReleases)) {
    const [fname, year, month] = folder.split("/")

    const folderPath = path.join(__dirname, `${fname}/${year}`)

    fs.mkdirSync(folderPath, {recursive: true})

    const filePath = path.join(folderPath, `${month}.mdx`)

    const monthNumber = new Date(`${month} 1, 2024`).getMonth() + 1
    const frontmatter = `---\nsidebar_position: ${12 - monthNumber + 1}\ntoc_max_heading_level: 2\n${isFirstFileWrite ? "slug: /\n" : ""}---\n\n`
    const versionUpdateCardBody = `import VersionUpdateCard from "@site/src/components/shared/VersionUpdateCard"\n\n<VersionUpdateCard />\n\n`

    const content = releases
      .map((release) => {
        const formattedBody = formatReleaseBody(release.body)
        return `## ${release.name} \n\n${formattedBody}\n`
      })
      .join("\n\n---\n")

    fs.writeFileSync(filePath, frontmatter + versionUpdateCardBody + content, "utf-8")
    isFirstFileWrite = false
    console.log(`Wrote releases to ${filePath}`)
  }
}

// Main function
async function main() {
  try {
    console.log("Fetching releases...")
    const releases = await fetchReleases()

    console.log("Grouping releases by year and month...")
    const groupedReleases = groupReleasesByMonth(releases)

    console.log("Writing releases to files...")
    writeReleasesToFiles(groupedReleases)

    console.log("Done!")
  } catch (error) {
    console.error("An error occurred:", error.message)
  }
}

main()
