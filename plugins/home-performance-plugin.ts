import {Plugin} from "@docusaurus/types"
import fs from "fs/promises"
import path from "path"

const criticalCss = `
:root{--ifm-navbar-height:3.75rem;--ifm-font-family-base:system-ui,-apple-system,"Segoe UI",sans-serif;--ifm-color-brand-light-100:#fff;--ifm-color-brand-dark-100:#121315}*{box-sizing:border-box}html{background:#fff;color:#121315;font:100%/1.65 var(--ifm-font-family-base);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;text-size-adjust:100%}body{margin:0;overflow-x:hidden;word-wrap:break-word}a{color:inherit;text-decoration:none}img,svg{max-width:100%}.skipToContent_fXgn,.themedComponent--dark_xIcU,.navbar-sidebar__backdrop,.dropdown__menu{display:none}.navbar{align-items:center;background:#fff;box-shadow:0 1px 2px #0000001a;display:flex;height:var(--ifm-navbar-height);padding:.5rem 1rem;position:sticky;top:0;z-index:200}.navbar__inner{align-items:center;display:flex;gap:1rem;width:100%}.navbar__items{align-items:center;display:flex;gap:1rem;min-width:0}.navbar__items--right{justify-content:flex-end;margin-left:auto}.navbar__brand{align-items:center;display:flex}.navbar__logo{align-items:center;display:flex;height:2rem}.navbar__logo img{display:block;height:2rem;max-width:11rem}.navbar__link{font-weight:500}.navbar__toggle{background:transparent;border:0;color:#121315;display:inherit;padding:.25rem}.DocSearch-Button{align-items:center;background:#fff;border:0;color:#121315;display:flex}.main-wrapper{min-height:calc(100vh - var(--ifm-navbar-height))}.grid{display:grid}.hidden{display:none}.flex{display:flex}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}.w-full,.w-\\[100\\%\\]{width:100%}.h-full{height:100%}.h-12{height:3rem}.max-w-xs{max-width:20rem}.max-w-md{max-width:28rem}.max-w-7xl{max-width:80rem}.mx-auto{margin-left:auto;margin-right:auto}.mt-8{margin-top:2rem}.mt-SPACE_06{margin-top:24px}.mb-0{margin-bottom:0}.px-8{padding-left:2rem;padding-right:2rem}.py-6{padding-bottom:1.5rem;padding-top:1.5rem}.\\!pb-0{padding-bottom:0!important}.px-SPACE_02{padding-left:8px;padding-right:8px}.px-SPACE_06{padding-left:24px;padding-right:24px}.py-SPACE_03{padding-bottom:12px;padding-top:12px}.space-x-SPACE_04>:not([hidden])~:not([hidden]){margin-left:16px}.text-title-large{font-size:32px;font-weight:700;letter-spacing:0;line-height:41.6px}.text-content-small{font-size:16px;font-weight:400;letter-spacing:0;line-height:24px}.font-normal{font-weight:400}.font-bold{font-weight:700}.hero-banner-title{color:#121315;margin:0}.hero-banner-sub-title{color:#545556;margin-bottom:0}.bg-tailCall-yellow{background:#fdea2f}.bg-tailCall-dark-500{background:#121315}.bg-white{background:#fff}.rounded-md{border-radius:.375rem}.rounded-lg{border-radius:.5rem}.border,.border-2{border-style:solid}.border{border-width:1px}.border-2{border-width:2px}.border-tailCall-border-dark-100{border-color:#121315}.text-tailCall-light-100{color:#fff}.text-tailCall-dark-500{color:#121315}main{justify-content:center}main section{width:100%}main a.group{align-items:center;border-radius:.5rem;display:flex;font-size:16px;font-weight:700;justify-content:center;line-height:24px;min-width:0;overflow:hidden;padding:12px 24px;position:relative;text-align:center}main a.group span{position:relative;z-index:1}main a.group .absolute{border-radius:.5rem}main picture,img{display:block}main picture img{height:auto;margin-left:auto;margin-right:auto;object-fit:contain;width:100%}@media (max-width:996px){.navbar__item,.navbarSearchContainer_Bca1{display:none}.navbar__items{justify-content:flex-end;margin-left:auto}.navbar__brand{margin-right:auto}}@media (min-width:640px){.sm\\:flex{display:flex}.sm\\:hidden{display:none}.sm\\:items-center{align-items:center}.sm\\:text-center{text-align:center}.sm\\:m-auto{margin:auto}.sm\\:mt-SPACE_04{margin-top:16px}.sm\\:mt-SPACE_10{margin-top:40px}.sm\\:max-w-2xl{max-width:42rem}.sm\\:max-w-5xl{max-width:64rem}.sm\\:rounded-2xl{border-radius:1rem}.sm\\:rounded-xl{border-radius:.75rem}.sm\\:h-16{height:4rem}.sm\\:px-SPACE_08{padding-left:32px;padding-right:32px}.sm\\:py-SPACE_04{padding-bottom:16px;padding-top:16px}.sm\\:space-x-SPACE_06>:not([hidden])~:not([hidden]){margin-left:24px}.sm\\:text-title-small{font-size:20px;font-weight:700;line-height:26px}.sm\\:text-content-medium{font-size:20px;line-height:32px}.sm\\:text-display-small{font-size:56px;font-weight:700;line-height:67.2px}.sm\\:h-full{height:100%}}@media (min-width:768px){.md\\:justify-center{justify-content:center}.md\\:px-24{padding-left:6rem;padding-right:6rem}}@media (min-width:1024px){.lg\\:px-36{padding-left:9rem;padding-right:9rem}.lg\\:py-20{padding-bottom:5rem;padding-top:5rem}.lg\\:px-SPACE_10{padding-left:40px;padding-right:40px}.lg\\:py-SPACE_05{padding-bottom:20px;padding-top:20px}.lg\\:text-content-large{font-size:24px;line-height:36px}.lg\\:text-display-large{font-size:96px;font-weight:700;line-height:105.6px}.lg\\:block{display:block}.lg\\:hidden{display:none}}
`.trim()

function loadDeferredAssetsSnippet(stylesheetUrl: string | undefined, scriptUrls: string[]) {
  const stylesheet = JSON.stringify(stylesheetUrl)
  const urls = JSON.stringify(scriptUrls)

  return `<script data-home-performance-loader>
!function(){var e=${urls},n=${stylesheet},t=!1;function r(e){return new Promise(function(n){var t=document.createElement("script");t.src=e,t.defer=!0,t.onload=n,t.onerror=n,document.body.appendChild(t)})}function o(){return n?new Promise(function(e){var t=document.createElement("link");t.rel="stylesheet",t.href=n,t.onload=e,t.onerror=e,document.head.appendChild(t)}):Promise.resolve()}function d(){if(t)return;t=!0,o().then(function(){return e.reduce(function(e,n){return e.then(function(){return r(n)})},Promise.resolve())})}["pointerdown","keydown","touchstart","wheel","scroll"].forEach(function(e){window.addEventListener(e,function(e){false!==e.isTrusted&&d()},{once:!0,passive:!0,capture:!0})}),window.setTimeout(d,9e4)}();
</script>`
}

function optimizeHomeHtml(html: string) {
  const scriptUrls: string[] = []

  html = html.replace(/<script data-rh="true">function insertBanner\(\)[\s\S]*?<\/script>/, "")

  html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.(?:googleapis|gstatic)\.com"[^>]*>\n?/g, "")
  html = html.replace(/<link rel="preload" href="https:\/\/fonts\.googleapis\.com[^>]*>\n?/g, "")

  html = html.replace(
    /<script src="([^"]*\/assets\/js\/(?:runtime~main|main)\.[^"]+\.js)" defer="defer"><\/script>\n?/g,
    (_match, scriptUrl) => {
      scriptUrls.push(scriptUrl)
      return ""
    },
  )

  html = html.replace(/<link rel="(?:preload|modulepreload)" href="[^"]*\/assets\/js\/[^"]+">/g, "")

  const stylesheetMatch = html.match(/<link rel="stylesheet" href="([^"]*\/assets\/css\/styles\.[^"]+\.css)">/)
  if (stylesheetMatch) {
    const stylesheetUrl = stylesheetMatch[1]
    const replacement = [
      `<style data-home-critical>${criticalCss}</style>`,
      `<noscript><link rel="stylesheet" href="${stylesheetUrl}"></noscript>`,
    ].join("")

    html = html.replace(stylesheetMatch[0], replacement)
  }

  if (stylesheetMatch || scriptUrls.length > 0) {
    html = html.replace("</body>", `${loadDeferredAssetsSnippet(stylesheetMatch?.[1], scriptUrls)}</body>`)
  }

  return html
}

async function homePerformancePlugin(): Promise<Plugin<void>> {
  return {
    name: "home-performance-plugin",
    async postBuild({outDir}) {
      const indexPath = path.join(outDir, "index.html")
      const html = await fs.readFile(indexPath, "utf8")
      await fs.writeFile(indexPath, optimizeHomeHtml(html))
    },
  }
}

module.exports = homePerformancePlugin
