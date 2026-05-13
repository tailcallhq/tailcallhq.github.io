import fs from "fs/promises"
import crypto from "crypto"
import path from "path"

type PostBuildArgs = {
  outDir: string
}

const VIMEO_VIDEO_ID = "1011521201"

const escapeScriptString = (value: string): string => value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')

const replaceAll = (value: string, patterns: Array<RegExp | string>, replacement = ""): string => {
  let html = value

  for (const pattern of patterns) {
    html = html.replace(pattern, replacement)
  }

  return html
}

const imageExtension = (mime: string): string => {
  if (mime === "svg+xml") return "svg"
  if (mime === "jpeg") return "jpg"
  return mime
}

const getAssetUrl = (html: string, name: string): string => {
  const match = html.match(
    new RegExp(`<script\\s+src=["']?([^"' >]*/${name}\\.[^"' >]+\\.js)["']?\\s+defer[^>]*>\\s*</script>`),
  )
  return match?.[1] ?? ""
}

const appendToBody = (html: string, markup: string): string => {
  return html.includes("</body>") ? html.replace("</body>", `${markup}</body>`) : `${html}${markup}`
}

const runtimeScript = (runtimeUrl: string, mainUrl: string, stylesUrl: string, bgMapUrl: string): string => `
(function(){
  var runtimeUrl="${escapeScriptString(runtimeUrl)}";
  var mainUrl="${escapeScriptString(mainUrl)}";
  var stylesUrl="${escapeScriptString(stylesUrl)}";
  var bgMapUrl="${escapeScriptString(bgMapUrl)}";
  var mainLoaded=false;
  var stylesLoaded=false;
  var thumbLoaded=false;

  function loadStyles(callback){
    if(!stylesUrl || stylesLoaded || document.querySelector('link[href="'+stylesUrl+'"]')){
      stylesLoaded=true;
      if(callback) callback();
      return;
    }
    stylesLoaded=true;
    var styles=document.createElement("link");
    styles.rel="stylesheet";
    styles.href=stylesUrl;
    styles.onload=function(){ if(callback) callback(); };
    styles.onerror=function(){ if(callback) callback(); };
    document.head.appendChild(styles);
  }

  function loadMain(callback){
    if(mainLoaded){
      loadStyles(callback);
      return;
    }
    if(!runtimeUrl || !mainUrl) return;
    mainLoaded=true;
    var pending=2;
    function done(){
      pending-=1;
      if(pending===0 && callback) callback();
    }
    var runtime=document.createElement("script");
    runtime.src=runtimeUrl;
    runtime.defer=true;
    var main=document.createElement("script");
    main.src=mainUrl;
    main.defer=true;
    main.onload=function(){ window.setTimeout(done, 250); };
    main.onerror=done;
    loadStyles(done);
    document.head.appendChild(runtime);
    document.head.appendChild(main);
  }

  function cookieDnt(){
    var match=document.cookie.match(/(?:^|; )userConsent=([^;]*)/);
    if(!match) return "&dnt=1";
    try {
      var consent=JSON.parse(decodeURIComponent(match[1]));
      return consent && consent.accepted ? "" : "&dnt=1";
    } catch(error) {
      return "&dnt=1";
    }
  }

  function copyCode(button){
    var container=button.closest(".codeBlockContainer_Ckt0") || button.closest(".rounded-3xl") || button.parentElement;
    var code=container && container.querySelector("pre code");
    var text=code ? code.innerText : "";
    if(text && navigator.clipboard){
      navigator.clipboard.writeText(text);
      button.setAttribute("data-copied","true");
      window.setTimeout(function(){ button.removeAttribute("data-copied"); }, 1500);
    }
  }

  function loadDecorativeBackground(){
    if(!bgMapUrl) return;
    var target=document.querySelector(".customer-container");
    if(target) target.style.backgroundImage="url("+bgMapUrl+")";
  }

  function loadVideoThumbnail(){
    if(thumbLoaded) return;
    var thumbnail=document.querySelector(".video-thumbnail[data-src]");
    if(!thumbnail) return;
    thumbLoaded=true;
    thumbnail.src=thumbnail.getAttribute("data-src");
    thumbnail.removeAttribute("data-src");
  }

  ["scroll","pointerdown","keydown"].forEach(function(type){
    window.addEventListener(type, loadDecorativeBackground, {once:true, passive:true});
    window.addEventListener(type, loadVideoThumbnail, {once:true, passive:true});
  });

  var videoContainer=document.querySelector(".video-container");
  if(videoContainer && "IntersectionObserver" in window){
    var observer=new IntersectionObserver(function(entries){
      if(entries.some(function(entry){ return entry.isIntersecting; })){
        loadVideoThumbnail();
        observer.disconnect();
      }
    }, {rootMargin:"0px"});
    observer.observe(videoContainer);
  }

  function openSearchWhenReady(){
    var attempts=0;
    function retry(){
      var button=document.querySelector(".DocSearch-Button");
      if(!button) return;
      button.click();
      if(!document.querySelector(".DocSearch-Modal") && attempts<10){
        attempts+=1;
        window.setTimeout(retry, 250);
      }
    }
    window.setTimeout(retry, 500);
  }

  document.addEventListener("click", function(event){
    var target=event.target;
    if(!target || !target.closest) return;

    var navToggle=target.closest(".navbar__toggle");
    if(navToggle){
      event.preventDefault();
      var open=!document.body.classList.contains("home-nav-open");
      document.body.classList.toggle("home-nav-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      return;
    }

    if(target.closest(".navbar-sidebar__backdrop")){
      document.body.classList.remove("home-nav-open");
      var toggle=document.querySelector(".navbar__toggle");
      if(toggle) toggle.setAttribute("aria-expanded", "false");
      return;
    }

    var videoButton=target.closest(".video-play-button");
    if(videoButton){
      event.preventDefault();
      loadVideoThumbnail();
      var iframe=document.createElement("iframe");
      iframe.src="https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479"+cookieDnt();
      iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen=true;
      iframe.className="absolute top-0 left-0 w-full h-full";
      iframe.title="Tailcall Introduction Video";
      videoButton.replaceWith(iframe);
      return;
    }

    var copyButton=target.closest("button[aria-label*='Copy code']");
    if(copyButton){
      copyCode(copyButton);
      return;
    }

    var searchButton=target.closest(".DocSearch-Button");
    if(searchButton && !mainLoaded){
      event.preventDefault();
      loadMain(openSearchWhenReady);
    }
  });
})();
`

const navStyle = `
<style>
body.home-nav-open{overflow:hidden}
body.home-nav-open .navbar-sidebar__backdrop{display:block;visibility:visible;opacity:1;background:rgba(0,0,0,.62);position:fixed;inset:0;z-index:99}
body.home-nav-open .navbar__items:not(.navbar__items--right){display:flex;flex-direction:column;align-items:flex-start;gap:8px;position:fixed;top:var(--ifm-navbar-height-sm,72px);left:0;right:0;max-height:calc(100vh - var(--ifm-navbar-height-sm,72px));overflow:auto;background:#fff;padding:16px 24px;z-index:100}
body.home-nav-open .navbar__brand{display:flex}
body.home-nav-open .navbar__item,body.home-nav-open .dropdown{display:block}
body.home-nav-open .dropdown__menu{display:block;position:static;box-shadow:none;padding:8px 0}
@media(min-width:997px){body.home-nav-open{overflow:auto}body.home-nav-open .navbar-sidebar__backdrop{display:none}body.home-nav-open .navbar__items:not(.navbar__items--right){position:static;max-height:none;overflow:visible;flex-direction:row;padding:0;background:transparent}}
</style>`

const deferredRenderingStyle = `
<style>
main>section:nth-of-type(n+4),footer{content-visibility:auto;contain-intrinsic-size:760px}
main>section:nth-of-type(n+6){contain-intrinsic-size:980px}
footer{contain-intrinsic-size:360px}
.video-container{background:#121315}
.video-thumbnail{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.video-play-button:before{z-index:1}
.video-play-icon{z-index:2}
</style>`

export default function homepageLighthousePlugin() {
  return {
    name: "homepage-lighthouse-plugin",
    async postBuild({outDir}: PostBuildArgs) {
      const indexPath = path.join(outDir, "index.html")
      let html = await fs.readFile(indexPath, "utf8")
      const inlineImageDir = path.join(outDir, "assets", "inline-imgs")
      const runtimeDir = path.join(outDir, "assets", "js")

      const runtimeUrl = getAssetUrl(html, "runtime~main")
      const mainUrl = getAssetUrl(html, "main")
      const stylesUrl =
        html.match(
          /<link\s+rel=["']?stylesheet["']?\s+href=["']?(\/assets\/css\/styles\.[^"' >]+\.css)["']?\s*\/?>/,
        )?.[1] ?? ""

      await fs.mkdir(inlineImageDir, {recursive: true})
      await fs.mkdir(runtimeDir, {recursive: true})
      const inlineImages = new Map<string, string>()
      html = html.replace(/data:image\/(png|jpe?g|webp|svg\+xml);base64,([A-Za-z0-9+/=]+)/g, (match, mime, payload) => {
        const extension = imageExtension(mime === "jpg" ? "jpeg" : mime)
        const hash = crypto.createHash("sha1").update(payload).digest("hex").slice(0, 12)
        const fileName = `${hash}.${extension}`
        inlineImages.set(fileName, payload)
        return `/assets/inline-imgs/${fileName}`
      })

      await Promise.all(
        [...inlineImages].map(([fileName, payload]) =>
          fs.writeFile(path.join(inlineImageDir, fileName), Buffer.from(payload, "base64")),
        ),
      )

      html = html.replace(/<img([^>]+src=["']?\/assets\/inline-imgs\/[^"' >]+["']?)([^>]*)>/g, (tag, source, rest) => {
        const loading = /\sloading=/.test(tag) ? "" : ' loading="lazy"'
        const decoding = /\sdecoding=/.test(tag) ? "" : ' decoding="async"'
        return `<img${source}${rest}${loading}${decoding}>`
      })
      html = html.replace(
        /src=["']?\/images\/video-thumbnail\.webp["']?(?=[^>]*class=["']?[^"' >]*video-thumbnail)/,
        'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" data-src="/images/video-thumbnail.webp"',
      )

      html = replaceAll(html, [
        /<script\s+data-rh=["']?true["']?>document\.addEventListener\("DOMContentLoaded",function\(\)\{void 0===window\.docusaurus&&insertBanner\(\)\}\);function insertBanner\(\)\{[\s\S]*?<\/script>/,
        /<link\s+rel=["']?preload["']?\s+href=["']?\/assets\/js\/[^>]+?as=["']?script["']?[^>]*>/g,
        /<link\s+rel=["']?modulepreload["']?\s+href=["']?\/assets\/js\/[^>]*>/g,
        /<script\s+src=["']?\/assets\/js\/runtime~main\.[^"' >]+\.js["']?\s+defer[^>]*>\s*<\/script>/g,
        /<script\s+src=["']?\/assets\/js\/main\.[^"' >]+\.js["']?\s+defer[^>]*>\s*<\/script>/g,
      ])

      const homeCss = await fs.readFile(path.join(outDir, "assets", "css", "home.css"), "utf8")
      const bgMapUrl = homeCss.match(/url\((\/assets\/images\/bg-map-[^)]+\.png)\)/)?.[1] ?? ""
      const criticalCss = homeCss
        .replace(/background(?:-image)?:url\(\/assets\/images\/bg-map-[^)]+\.png\)\s+no-repeat/g, "background:none")
        .replace(/background-image:url\(\/assets\/images\/bg-map-[^)]+\.png\)/g, "background-image:none")
        .replace(/background-image:url\(\/assets\/images\/video-thumbnail-[^)]+\.webp\);?/g, "")
      html = html.replace(
        /<link\s+rel=["']?stylesheet["']?\s+href=["']?\/assets\/css\/styles\.[^"' >]+\.css["']?\s*\/?>/,
        `<style>${criticalCss}</style>`,
      )

      html = html.replace(
        "<body",
        '<link rel="preload" as="image" href="/images/home/hero-mobile.avif" media="(max-width: 767px)" fetchpriority="high"><link rel="preload" as="image" href="/images/home/hero.avif" media="(min-width: 768px)" fetchpriority="high"><body',
      )
      await fs.writeFile(
        path.join(runtimeDir, "homepage-runtime.js"),
        runtimeScript(runtimeUrl, mainUrl, stylesUrl, bgMapUrl).trim(),
      )
      html = appendToBody(
        html,
        `${deferredRenderingStyle}${navStyle}<script defer src="/assets/js/homepage-runtime.js"></script>`,
      )
      await fs.writeFile(indexPath, html)
    },
  }
}
