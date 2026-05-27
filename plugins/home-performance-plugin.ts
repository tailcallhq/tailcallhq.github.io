import {readFileSync, writeFileSync} from "fs"
import {join} from "path"
import type {Plugin} from "@docusaurus/types"

const CRITICAL_HOME_CSS = String.raw`
html,body{margin:0;background:#fff;color:#121315;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
*,*::before,*::after{box-sizing:border-box}
a{color:inherit;text-decoration:none}
img,svg{display:block;max-width:100%}
.skipToContent_fXgn{position:absolute;left:-999px}
.navbar{position:sticky;top:0;z-index:20;height:72px;background:#fff;border-bottom:1px solid #f3f4f7;padding:0 24px;display:flex;align-items:center}
.navbar__inner{align-items:center;display:flex;justify-content:space-between;margin:0 auto;max-width:1280px;width:100%}
.navbar__items{align-items:center;display:flex;gap:24px}
.navbar__items--right{margin-left:auto}
.navbar__brand,.navbar__link{align-items:center;display:flex}
.navbar__logo img{height:44px;width:auto}
.themedComponent--dark_xIcU{display:none}
.navbar__link{color:#323335;font-size:16px;font-weight:500}
.navbar__link--active{color:#121315;font-weight:700}
.navbar__toggle{background:transparent;border:0;color:#121315;display:none;padding:8px}
.dropdown{position:relative}
.dropdown__menu{background:#fff;border:1px solid #e7e7e7;border-radius:12px;box-shadow:0 16px 48px rgba(18,19,21,.12);display:none;list-style:none;margin:0;padding:8px;position:absolute;top:100%;width:180px}
.dropdown:hover .dropdown__menu,.dropdown:focus-within .dropdown__menu{display:block}
.dropdown__link{border-radius:8px;color:#323335;display:block;padding:8px 10px}
.DocSearch{display:none}
.hidden{display:none!important}
.flex{display:flex}
.grid{display:grid}
.items-center{align-items:center}
.justify-center{justify-content:center}
.justify-between{justify-content:space-between}
.relative{position:relative}
.absolute{position:absolute}
.inset-0{inset:0}
.z-20{position:relative;z-index:2}
.w-full{width:100%}
.h-full{height:100%}
.max-w-7xl{max-width:80rem}
.max-w-xs{max-width:20rem}
.max-w-md{max-width:28rem}
.mx-auto{margin-left:auto;margin-right:auto}
.mb-0{margin-bottom:0}
.mt-SPACE_06{margin-top:24px}
.space-x-SPACE_04>*+*{margin-left:16px}
main.grid{justify-content:center}
section.w-full{padding:24px 32px 0;width:100%}
.hero-banner-title{color:#121315;font-size:32px;font-weight:700;letter-spacing:0;line-height:41.6px;margin:0}
.hero-banner-sub-title{color:#545556;font-size:16px;font-weight:400;line-height:24px;margin-top:16px}
.bg-tailCall-yellow{background:#fdea2e}
.rounded-md{border-radius:8px}
.px-SPACE_02{padding-left:8px;padding-right:8px}
main a.group{align-items:center;border-radius:8px;display:flex;font-size:16px;font-weight:700;height:48px;justify-content:center;overflow:hidden;padding:12px 24px;position:relative;width:100%}
.border{border:1px solid #121315}
.border-2{border:2px solid #121315}
.border-solid{border-style:solid}
.bg-tailCall-dark-500{background:#121315}
.bg-transparent{background:transparent}
.text-tailCall-light-100{color:#fff}
.text-tailCall-dark-500{color:#121315}
html[data-has-hydrated="false"] footer.flex{display:none!important}
@media (max-width:767px){
  .navbar{height:72px;padding:0 20px}
  .navbar__toggle{display:block}
  .navbar__item,.navbar__items--right{display:none}
}
@media (min-width:640px){
  .sm\:flex{display:flex!important}
  .sm\:hidden{display:none!important}
  .sm\:items-center{align-items:center}
  .sm\:text-center{text-align:center}
  .sm\:max-w-5xl{max-width:64rem}
  .sm\:max-w-2xl{max-width:42rem}
  .sm\:m-auto{margin:auto}
  .sm\:mt-SPACE_04{margin-top:16px}
  .sm\:mt-SPACE_10{margin-top:40px}
  .sm\:space-x-SPACE_06>*+*{margin-left:24px}
  .sm\:rounded-2xl{border-radius:16px}
  .sm\:rounded-xl{border-radius:12px}
  .sm\:text-display-small{font-size:56px;letter-spacing:0;line-height:67.2px}
  .sm\:text-content-medium{font-size:20px;line-height:32px}
  .sm\:text-title-small{font-size:20px;line-height:26px}
  .sm\:h-16{height:64px}
  .sm\:px-SPACE_08{padding-left:32px;padding-right:32px}
  .sm\:py-SPACE_04{padding-bottom:16px;padding-top:16px}
}
@media (min-width:768px){
  section.w-full{padding:48px 96px 0}
}
@media (min-width:1024px){
  section.w-full{padding:80px 144px 0}
  .lg\:flex{display:flex!important}
  .lg\:block{display:block!important}
  .lg\:text-display-large{font-size:96px;letter-spacing:0;line-height:105.6px}
  .lg\:text-content-large{font-size:24px;line-height:36px}
  .lg\:px-SPACE_10{padding-left:40px;padding-right:40px}
  .lg\:py-SPACE_05{padding-bottom:20px;padding-top:20px}
}
`

const createDeferredAssetLoader = (stylesheets: string[], scripts: string[]) => `<script>
(function(){
  var loaded=false;
  var styles=${JSON.stringify(stylesheets)};
  var scripts=${JSON.stringify(scripts)};
  function loadAssets(){
    if(loaded)return;
    loaded=true;
    window.__homeAssetsRequested=true;
    styles.forEach(function(href){
      var link=document.createElement("link");
      link.rel="stylesheet";
      link.href=href;
      document.head.appendChild(link);
    });
    scripts.reduce(function(chain,src){
      return chain.then(function(){
        return new Promise(function(resolve){
          var script=document.createElement("script");
          script.src=src;
          script.defer=true;
          script.onload=resolve;
          script.onerror=resolve;
          document.body.appendChild(script);
        });
      });
    },Promise.resolve());
  }
  ["scroll","pointerdown","touchstart","keydown"].forEach(function(eventName){
    window.addEventListener(eventName,loadAssets,{once:true,passive:true});
  });
  window.__loadTailcallHomeAssets=loadAssets;
})();
</script>`

export default function homePerformancePlugin(): Plugin<void> {
  return {
    name: "home-performance-plugin",
    postBuild({outDir}) {
      const indexPath = join(outDir, "index.html")
      let html = readFileSync(indexPath, "utf8")
      const stylesheets = Array.from(html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g), (match) => match[1])
      const scripts = Array.from(html.matchAll(/<script src="([^"]+)" defer="defer"><\/script>/g), (match) => match[1])

      html = html.replace(/<script data-rh="true">function insertBanner\(\)[\s\S]*?<\/script>/, "")
      html = html.replace(/<link rel="stylesheet" href="[^"]+">\n?/g, "")
      html = html.replace(/<script src="[^"]+" defer="defer"><\/script>\n?/g, "")
      html = html.replace("</head>", `<style>${CRITICAL_HOME_CSS}</style></head>`)
      html = html.replace("</body>", `${createDeferredAssetLoader(stylesheets, scripts)}</body>`)

      writeFileSync(indexPath, html)
    },
  }
}
