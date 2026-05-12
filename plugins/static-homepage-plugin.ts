import fs from "fs/promises"
import path from "path"

function staticHomepagePlugin() {
  return {
    name: "static-homepage-plugin",
    async postBuild({outDir}: {outDir: string}) {
      const indexPath = path.join(outDir, "index.html")
      const html = await fs.readFile(indexPath, "utf8")
      const staticHtml = html
        .replace(/<script data-rh="true">function insertBanner\(\)[\s\S]*?<\/script>/, "")
        .replace(/<link rel="stylesheet" href="\/assets\/css\/styles\.[^"]+\.css">/g, "")
        .replace(/<script src="\/assets\/js\/runtime~main\.[^"]+\.js" defer="defer"><\/script>/g, "")
        .replace(/<script src="\/assets\/js\/main\.[^"]+\.js" defer="defer"><\/script>/g, "")
        .replace("</head>", "<style>html,body{margin:0}*{box-sizing:border-box}</style></head>")

      await fs.writeFile(indexPath, staticHtml)
    },
  }
}

export default staticHomepagePlugin
