import fs from "fs"
import path from "path"
import type {LoadContext, Plugin} from "@docusaurus/types"

const HOME_CRITICAL_CSS = "/assets/css/home-critical.css"
const EXTRA_CRITICAL_CSS =
  ':root{--ifm-navbar-height:4.5rem;--ifm-navbar-logo-height:2.25rem;--ifm-font-family-base:"Space Grotesk",sans-serif;--ifm-font-color-base:#121315;--ifm-background-color:#fff;--ifm-link-color:#3578e5;--ifm-global-radius:.4rem}*,:after,:before{box-sizing:border-box}#__docusaurus-base-url-issue-banner-container,.themedComponent_mlkZ{display:none}[data-theme=dark] .themedComponent--dark_xIcU,[data-theme=light] .themedComponent--light_NVdE,html:not([data-theme]) .themedComponent--light_NVdE{display:initial}.relative{position:relative}.text-black{color:#000}.text-tailCall-light-300{color:#e7e7e7}.text-tailCall-light-100{color:#fff}.bg-tailCall-dark-600{background-color:#121212}.bg-tailCall-yellow{background-color:#fdea2e}'

const escapeClassName = (className: string): string => {
  return className.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1")
}

const getClassNeedles = (html: string): string[] => {
  const classNames = new Set<string>()

  for (const match of html.matchAll(/class="([^"]+)"/g)) {
    match[1]
      .split(/\s+/)
      .map((className) => className.trim())
      .filter(Boolean)
      .forEach((className) => classNames.add(`.${escapeClassName(className)}`))
  }

  return [...classNames]
}

const getBlocks = (css: string): Array<{prelude: string; body: string; block: string}> => {
  const blocks: Array<{prelude: string; body: string; block: string}> = []
  let cursor = 0

  while (cursor < css.length) {
    const open = css.indexOf("{", cursor)
    if (open === -1) break

    let depth = 1
    let close = open + 1
    while (close < css.length && depth > 0) {
      if (css[close] === "{") depth += 1
      if (css[close] === "}") depth -= 1
      close += 1
    }

    const preludeStart = css.lastIndexOf("}", open - 1) + 1
    const prelude = css.slice(Math.max(cursor, preludeStart), open).trim()
    const body = css.slice(open + 1, close - 1)
    const block = css.slice(Math.max(cursor, preludeStart), close).trim()

    if (prelude && block) blocks.push({prelude, body, block})
    cursor = close
  }

  return blocks
}

const isGlobalSelector = (prelude: string): boolean => {
  return /(^|,)\s*(:root|html|body|\*|::before|::after|a|button|code|footer|h[1-6]|img|li|main|nav|ol|p|picture|pre|section|svg|ul)(\W|$)/.test(
    prelude,
  )
}

const keepRule = (prelude: string, classNeedles: string[]): boolean => {
  if (prelude.startsWith("@font-face")) return false
  if (prelude.startsWith("@keyframes")) return true
  if (isGlobalSelector(prelude)) return true

  return classNeedles.some((needle) => prelude.includes(needle))
}

const filterCss = (css: string, classNeedles: string[]): string => {
  return getBlocks(css)
    .map(({prelude, body, block}) => {
      if (prelude.startsWith("@media") || prelude.startsWith("@supports") || prelude.startsWith("@container")) {
        const nested = filterCss(body, classNeedles)
        return nested ? `${prelude}{${nested}}` : ""
      }

      if (prelude.includes("DocSearch") || prelude.includes("graphiql")) {
        return ""
      }

      return keepRule(prelude, classNeedles) ? block : ""
    })
    .filter(Boolean)
    .join("\n")
}

const removeInitialHomepageAssets = (
  html: string,
  fullCssHref: string,
  scriptHrefs: string[],
  criticalCss: string,
): string => {
  const loader = `<script>
(()=>{let loaded=false;const css=${JSON.stringify(fullCssHref)};const scripts=${JSON.stringify(scriptHrefs)};
function load(){if(loaded)return Promise.resolve();loaded=true;const cssLink=document.createElement("link");cssLink.rel="stylesheet";cssLink.href=css;document.head.appendChild(cssLink);return scripts.reduce((chain,src)=>chain.then(()=>new Promise((resolve)=>{const script=document.createElement("script");script.src=src;script.defer=true;script.onload=script.onerror=resolve;document.body.appendChild(script);})),Promise.resolve());}
function loadDeferredImages(){document.querySelectorAll("img[data-src]").forEach((img)=>{img.setAttribute("src",img.getAttribute("data-src"));img.removeAttribute("data-src");});}
function loadAll(){loadDeferredImages();return load();}
["pointerdown","keydown","touchstart","wheel"].forEach((eventName)=>window.addEventListener(eventName,loadAll,{once:true,passive:true}));
})();</script>`

  return html
    .replace(/<script\b[^>]*id="chatbotscript"[^>]*><\/script>/, "")
    .replace(
      /<link data-rh="true" rel="preconnect" href="https:\/\/X27WDVHRQ3-dsn\.algolia\.net" crossorigin="anonymous">/i,
      "",
    )
    .replace(/<link\b[^>]*rel="(?:preload|modulepreload)"[^>]*as="script"[^>]*>/g, "")
    .replace(
      new RegExp(`<link rel="stylesheet" href="${fullCssHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">`),
      `<style>${criticalCss}</style>`,
    )
    .replace(/<script src="\/assets\/js\/(?:runtime~main|main)\.[^"]+\.js" defer="defer"><\/script>/g, "")
    .replace("</body>", `${loader}</body>`)
}

export default function homepageFirstLoadPlugin(_context: LoadContext): Plugin {
  return {
    name: "homepage-first-load-plugin",
    async postBuild({outDir}) {
      const indexPath = path.join(outDir, "index.html")
      if (!fs.existsSync(indexPath)) return

      let html = fs.readFileSync(indexPath, "utf8")
      const stylesheetMatch = html.match(/<link rel="stylesheet" href="([^"]*\/assets\/css\/styles\.[^"]+\.css)">/)
      if (!stylesheetMatch) return

      const fullCssHref = stylesheetMatch[1]
      const fullCssPath = path.join(outDir, fullCssHref.replace(/^\//, ""))
      const fullCss = fs.readFileSync(fullCssPath, "utf8")
      const criticalHtml = html.split("</main>")[0] || html
      const criticalCss = `${filterCss(fullCss, getClassNeedles(criticalHtml))
        .replace(/\.customer-container\{[^}]*bg-map[^}]*\}/g, "")
        .replace(/background-image:url\([^)]*video-thumbnail[^)]*\);?/g, "")}\n${EXTRA_CRITICAL_CSS}`

      const cssOutputPath = path.join(outDir, HOME_CRITICAL_CSS.replace(/^\//, ""))
      fs.mkdirSync(path.dirname(cssOutputPath), {recursive: true})
      fs.writeFileSync(cssOutputPath, criticalCss)

      const scriptHrefs = [
        ...html.matchAll(/<script src="(\/assets\/js\/(?:runtime~main|main)\.[^"]+\.js)" defer="defer"><\/script>/g),
      ].map((match) => match[1])

      html = removeInitialHomepageAssets(html, fullCssHref, scriptHrefs, criticalCss)
      fs.writeFileSync(indexPath, html)
    },
  }
}
