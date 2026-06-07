import type {Plugin} from "@docusaurus/types"
import fs from "fs/promises"
import path from "path"

// Keep this in sync with the above-the-fold homepage styles in src/css/custom.css
// and the Tailwind classes used by the navbar, hero, and hero CTAs. The full
// stylesheet is loaded after first interaction/scroll; this is what keeps the
// homepage readable before that file arrives.
const criticalHomepageCss = `
@font-face{font-family:"Space Grotesk";font-style:normal;font-weight:400 700;font-display:swap;src:url("/fonts/space-grotesk-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:"Space Mono";font-style:normal;font-weight:400;font-display:swap;src:url("/fonts/space-mono-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}:root{--ifm-font-family-base:"Space Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif;--ifm-color-brand:#fdea2e;--ifm-color-brand-dark-100:#121315;--ifm-color-brand-dark-500:#121315;--ifm-color-brand-light-100:#fff;--ifm-navbar-height:4.5rem;--header-height:4.5rem}*{box-sizing:border-box}html{background:#fff;color:#121315;font-family:var(--ifm-font-family-base);line-height:1.5;-webkit-font-smoothing:antialiased;text-size-adjust:100%}body{margin:0;overflow-x:hidden;word-wrap:break-word}a{color:inherit;text-decoration:none}img,svg{max-width:100%}button{font:inherit}.skipToContent_fXgn,.navbar-sidebar__backdrop,.dropdown__menu,html[data-theme=light] .navbar__logo img[class*=themedComponent--dark],html[data-theme=dark] .navbar__logo img[class*=themedComponent--light],.hidden,.lg\\:flex.search-icon-navbar{display:none}.navbar{align-items:center;background:#fff;box-shadow:#e7e7e7 0 0 0 1px;display:flex;height:var(--ifm-navbar-height);padding:0 1rem;position:sticky;top:0;z-index:200}.navbar__inner{align-items:center;display:flex;margin:0 auto;position:relative;width:100%}.navbar__items{align-items:center;display:flex;justify-content:flex-end;margin-left:auto}.navbar__items--right{margin-left:0}.navbar__brand{align-items:center;display:flex;margin-right:auto}.navbar__logo{align-items:center;display:flex;height:2.25rem}.navbar__logo img{display:block;height:2.25rem;max-width:11rem}.navbar__toggle{align-items:center;background:transparent;border:0;color:#121315;display:flex;padding:.25rem}.navbar__item{display:none}.main-wrapper{min-height:calc(100vh - var(--ifm-navbar-height))}.grid{display:grid}.flex{display:flex}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}.w-full{width:100%}.h-full{height:100%}.h-12{height:3rem}.max-w-xs{max-width:20rem}.max-w-md{max-width:28rem}.max-w-7xl{max-width:80rem}.mx-auto{margin-left:auto;margin-right:auto}.mt-8{margin-top:2rem}.mt-SPACE_06{margin-top:24px}.mb-0{margin-bottom:0}.px-8{padding-left:2rem;padding-right:2rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.\\!pb-0{padding-bottom:0!important}.px-SPACE_02{padding-left:8px;padding-right:8px}.px-SPACE_06{padding-left:24px;padding-right:24px}.py-SPACE_03{padding-top:12px;padding-bottom:12px}.gap-x-SPACE_03{column-gap:12px}.space-x-SPACE_04>:not([hidden])~:not([hidden]){margin-left:16px}.rounded-md{border-radius:.375rem}.rounded-lg{border-radius:.5rem}.border{border-width:1px}.border-2{border-width:2px}.border,.border-2{border-style:solid}.border-tailCall-border-dark-100{border-color:#121315}.bg-tailCall-yellow{background:#fdea2e}.bg-tailCall-dark-500{background:#121315}.bg-white{background:#fff}.text-tailCall-light-100{color:#fff}.text-tailCall-dark-500{color:#121315}.font-bold{font-weight:700}.font-normal{font-weight:400}.cursor-pointer{cursor:pointer}.hero-banner-title{color:#121315;margin:0}.hero-banner-sub-title{color:#545556}.text-title-large{font-size:32px;font-weight:700;letter-spacing:-1px;line-height:41.6px}.text-content-small{font-size:16px;font-weight:400;letter-spacing:-.02em;line-height:24px}main.grid{justify-content:center}main section{width:100%}main a.group{align-items:center;border-radius:.5rem;display:flex;font-size:16px;font-weight:700;justify-content:center;line-height:24px;min-width:0;overflow:hidden;padding:12px 24px;position:relative;text-align:center}main a.group span{position:relative;z-index:20}.w-full.group{width:100%}main a.group .absolute{border-radius:.5rem;z-index:0}picture{display:block}.hero-visual{aspect-ratio:1400/672;max-width:80rem;width:100%}main picture img{aspect-ratio:1400/672;display:block;height:auto;margin-left:auto;margin-right:auto;object-fit:contain;width:100%}@media (min-width:640px){.hidden.sm\\:flex,.sm\\:flex{display:flex}.sm\\:hidden{display:none}.sm\\:items-center{align-items:center}.sm\\:text-center{text-align:center}.sm\\:m-auto{margin:auto}.sm\\:mt-SPACE_04{margin-top:16px}.sm\\:mt-SPACE_10{margin-top:40px}.sm\\:max-w-2xl{max-width:42rem}.sm\\:max-w-5xl{max-width:64rem}.sm\\:rounded-2xl{border-radius:1rem}.sm\\:rounded-xl{border-radius:.75rem}.sm\\:h-16{height:4rem}.sm\\:px-SPACE_08{padding-left:32px;padding-right:32px}.sm\\:py-SPACE_04{padding-top:16px;padding-bottom:16px}.sm\\:space-x-SPACE_06>:not([hidden])~:not([hidden]){margin-left:24px}.sm\\:text-title-small{font-size:20px;font-weight:700;line-height:26px}.sm\\:text-content-medium{font-size:20px;line-height:32px}.sm\\:text-display-small{font-size:56px;font-weight:700;letter-spacing:-2px;line-height:67.2px}.sm\\:h-full{height:100%}.w-\\[228px\\]{width:228px}}@media (min-width:768px){.md\\:justify-center{justify-content:center}.md\\:px-24{padding-left:6rem;padding-right:6rem}}@media (min-width:997px){:root{--ifm-navbar-height:6.5rem;--header-height:6.5rem}.navbar{height:6.5rem}.navbar__items{justify-content:center;margin-left:0}.navbar__brand{position:absolute;left:0}.navbar__item{display:flex}.navbar__toggle{display:none}.navbar__link{font-size:1.25rem;font-weight:700;margin-right:2.5rem;padding:0 .5rem}.navbar__items--right{position:absolute;right:14%;top:50%;transform:translateY(-50%)}.lg\\:px-36{padding-left:9rem;padding-right:9rem}.lg\\:py-20{padding-top:5rem;padding-bottom:5rem}.lg\\:px-SPACE_10{padding-left:40px;padding-right:40px}.lg\\:py-SPACE_05{padding-top:20px;padding-bottom:20px}.lg\\:text-content-large{font-size:24px;line-height:36px}.lg\\:text-display-large{font-size:96px;font-weight:700;letter-spacing:-3px;line-height:105.6px}.lg\\:block{display:block}.lg\\:hidden{display:none}}
`.trim()

function stylesheetLoader(stylesheetHref: string): string {
  return `<script data-homepage-css-loader>
!function(){var e=${JSON.stringify(stylesheetHref)},t=!1;function n(){if(t)return;t=!0;var n=document.createElement("link");n.rel="stylesheet",n.href=e,document.head.appendChild(n)}function r(){window.setTimeout(n,1e4)}["pointerdown","keydown","touchstart","wheel","scroll"].forEach(function(e){window.addEventListener(e,n,{once:!0,passive:!0,capture:!0})}),"complete"===document.readyState?r():window.addEventListener("load",r,{once:!0})}();
</script>`
}

function scriptLoader(scriptUrls: string[]): string {
  return `<script data-homepage-script-loader>
!function(){var e=${JSON.stringify(scriptUrls)},n=!1,t=null;function r(){return t||(t=e.reduce(function(e,n){return e.then(function(){return new Promise(function(e){var t=document.createElement("script");t.src=n,t.async=!1,t.defer=!0,t.onload=e,t.onerror=e,document.body.appendChild(t)})})},Promise.resolve()).then(function(){n=!0})),t}function o(){window.setTimeout(r,5e3)}["pointerdown","keydown","touchstart","wheel","scroll"].forEach(function(e){window.addEventListener(e,r,{once:!0,passive:!0,capture:!0})}),document.addEventListener("click",function(e){if(n)return;var t=e.target&&e.target.closest&&e.target.closest("button,[role=button]");t&&(e.preventDefault(),e.stopImmediatePropagation(),r().then(function(){setTimeout(function(){t.click()},1e3)}))},!0),"complete"===document.readyState?o():window.addEventListener("load",o,{once:!0})}();
</script>`
}

function optimizeHomepageHtml(html: string): string {
  html = html.replace(/<script data-rh="true">function insertBanner\(\)[\s\S]*?<\/script>/, "")

  const scriptUrls: string[] = []
  html = html.replace(
    /<script src="([^"]*\/assets\/js\/(?:runtime~main|main)\.[^"]+\.js)" defer="defer"><\/script>/g,
    (_match, scriptUrl) => {
      scriptUrls.push(scriptUrl)
      return ""
    },
  )

  if (scriptUrls.length === 0) {
    throw new Error("homepage-performance-plugin: expected Docusaurus runtime/main scripts in homepage HTML")
  }

  const stylesheetMatch = html.match(/<link rel="stylesheet" href="([^"]*\/assets\/css\/styles\.[^"]+\.css)">/)

  if (!stylesheetMatch) {
    throw new Error("homepage-performance-plugin: expected Docusaurus stylesheet in homepage HTML")
  }

  const stylesheetHref = stylesheetMatch[1]
  html = html.replace(
    stylesheetMatch[0],
    `<style data-homepage-critical>${criticalHomepageCss}</style><noscript><link rel="stylesheet" href="${stylesheetHref}"></noscript>`,
  )

  return html.replace("</body>", `${stylesheetLoader(stylesheetHref)}${scriptLoader(scriptUrls)}</body>`)
}

async function homepagePerformancePlugin(): Promise<Plugin<void>> {
  return {
    name: "homepage-performance-plugin",
    async postBuild({outDir}) {
      const homepagePath = path.join(outDir, "index.html")
      const html = await fs.readFile(homepagePath, "utf8")
      await fs.writeFile(homepagePath, optimizeHomepageHtml(html))
    },
  }
}

module.exports = homepagePerformancePlugin
