import {Plugin} from "@docusaurus/types"
import fs from "fs/promises"
import path from "path"

const launcherHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Tailcall Playground</title>
  <meta name="description" content="Open Tailcall's GraphQL playground and connect it to your API endpoint.">
  <style>
    :root{color-scheme:light;--ink:#121315;--muted:#545556;--accent:#fdea2f;--border:#dedede}
    *{box-sizing:border-box}html{font:100%/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ink);background:#fff;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
    body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px}
    main{width:min(720px,100%);display:grid;gap:24px;text-align:center}
    .brand{width:158px;height:auto;margin:0 auto}
    h1{font-size:clamp(36px,8vw,72px);line-height:1.05;margin:0;letter-spacing:0}
    p{color:var(--muted);font-size:18px;margin:0 auto;max-width:560px}
    a{align-items:center;background:var(--accent);border:2px solid var(--ink);border-radius:8px;color:var(--ink);display:inline-flex;font-weight:700;justify-content:center;justify-self:center;min-height:52px;padding:12px 24px;text-decoration:none}
    a:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
  </style>
</head>
<body>
  <main>
    <img class="brand" src="/icons/companies/tailcall.svg" alt="Tailcall" width="158" height="32">
    <h1>GraphQL Playground</h1>
    <p>Launch the full Tailcall GraphiQL workspace when you are ready to connect an endpoint and run queries.</p>
    <a id="open-playground" href="/playground/app/">Open Playground</a>
  </main>
  <script>
    !function(){var e=document.getElementById("open-playground");if(location.search)e.href="/playground/app/"+location.search}();
  </script>
</body>
</html>`

async function playgroundPerformancePlugin(): Promise<Plugin<void>> {
  return {
    name: "playground-performance-plugin",
    async postBuild({outDir}) {
      const playgroundDir = path.join(outDir, "playground")
      await fs.mkdir(playgroundDir, {recursive: true})
      await fs.writeFile(path.join(playgroundDir, "index.html"), launcherHtml)
    },
  }
}

module.exports = playgroundPerformancePlugin
