import path from 'node:path'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import type {Plugin} from '@docusaurus/types'

const VIMEO_VIDEO_ID = '1011521201'

export default function lazyHydrateHomePlugin(): Plugin {
  return {
    name: 'lazy-hydrate-home-plugin',
    async postBuild({outDir}) {
      const indexPath = path.join(outDir, 'index.html')
      let html: string
      try {
        html = await fs.readFile(indexPath, 'utf8')
      } catch {
        return
      }
      const before = html.length

      const runtimeMatch = html.match(/<script\s+src=(\/assets\/js\/runtime~main\.[^>\s]*?)\s+defer>/)
      const mainMatch = html.match(/<script\s+src=(\/assets\/js\/main\.[^>\s]*?)\s+defer>/)
      const runtimeUrl = runtimeMatch ? runtimeMatch[1] : ''
      const mainUrl = mainMatch ? mainMatch[1] : ''
      const preloadMatches = html.match(/<link\s+rel=preload\s+href=\/assets\/js\/[^>]*as=script[^>]*>/g) || []
      const modulePreloadMatches = html.match(/<link\s+rel=modulepreload\s+href=\/assets\/js\/[^>]*>/g) || []

      let stripped = false
      if (runtimeMatch && mainMatch) {
        for (const p of preloadMatches) html = html.replace(p, '')
        for (const p of modulePreloadMatches) html = html.replace(p, '')
        html = html.replace(runtimeMatch[0], '')
        html = html.replace(mainMatch[0], '')
        stripped = true
      }

      // Swap full styles.xxx.css with pre-baked home-min.css
      let cssSwapped = false
      const homeMinPath = path.join(outDir, 'assets', 'css', 'home-min.css')
      try {
        await fs.access(homeMinPath)
        const stylesLinkRe = /<link\s+rel=stylesheet\s+href=\/assets\/css\/styles\.[a-f0-9]+\.css>/
        const stylesPreloadRe = /<link\s+rel=preload\s+href=\/assets\/css\/styles\.[a-f0-9]+\.css[^>]*as=style[^>]*>/g
        const sm = html.match(stylesLinkRe)
        if (sm) {
          html = html.replace(sm[0], '<link rel=stylesheet href=/assets/css/home-min.css>')
          cssSwapped = true
        }
        html = html.replace(stylesPreloadRe, '')
      } catch {}

      // Self-host Google Fonts
      html = html.replace(/<link\s+rel=preconnect\s+href=https:\/\/fonts\.googleapis\.com[^>]*>/g, '')
      html = html.replace(/<link\s+rel=preconnect\s+href=https:\/\/fonts\.gstatic\.com[^>]*>/g, '')
      html = html.replace(/<link\s+rel=preload[^>]*googleapis[^>]*>/g, '')
      html = html.replace(/<link\s+rel=stylesheet\s+href="?https:\/\/fonts\.googleapis\.com[^>]*>/g, '')
      html = html.replace(/<noscript>\s*<link[^>]*googleapis[^<]*<\/noscript>/g, '')
      html = html.replace('<body', '<link rel=stylesheet href=/fonts/fonts.css><body')

      const vanillaStyle = '<style>body.nav-open{overflow:hidden}body.nav-open .navbar-sidebar__backdrop{display:block;opacity:1;background-color:rgba(0,0,0,.6);position:fixed;inset:0;z-index:99}body.nav-open .navbar__items--right{display:flex;flex-direction:column;position:fixed;top:60px;left:0;right:0;bottom:0;background:var(--ifm-background-color,#fff);padding:16px;z-index:100;overflow-y:auto;gap:8px;align-items:flex-start}@media(min-width:997px){body.nav-open .navbar__items--right{position:static;display:flex;background:transparent;padding:0;flex-direction:row;align-items:center}body.nav-open{overflow:auto}body.nav-open .navbar-sidebar__backdrop{display:none}}</style>'

      const vanillaScript = '<script>(function(){var loaded=false;function getDnt(){var m=document.cookie.match(/(?:^|; )userConsent=([^;]*)/);if(!m)return \"&dnt=1\";try{var v=JSON.parse(decodeURIComponent(m[1]));return v && v.accepted ? \"\" : \"&dnt=1\"}catch(e){return \"&dnt=1\"}}function loadMain(cb){if(loaded){if(cb)cb();return}loaded=true;var s1=document.createElement(\"script\");s1.src=\"' + runtimeUrl + '\";s1.defer=true;var s2=document.createElement(\"script\");s2.src=\"' + mainUrl + '\";s2.defer=true;if(cb)s2.onload=function(){setTimeout(cb,200)};document.head.appendChild(s1);document.head.appendChild(s2)}document.addEventListener(\"click\",function(e){if(!e.isTrusted)return;var t=e.target.closest(\".navbar__toggle\");if(t){e.preventDefault();document.body.classList.toggle(\"nav-open\");return}var na=e.target.closest(\".navbar__items--right a\");if(na && document.body.classList.contains(\"nav-open\")){document.body.classList.remove(\"nav-open\")}var pb=e.target.closest(\"button[aria-label=\'Play introduction video\']\");if(pb){e.preventDefault();var c=pb.parentElement;var f=document.createElement(\"iframe\");f.src=\"https://player.vimeo.com/video/' + VIMEO_VIDEO_ID + '?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479\" + getDnt();f.allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\";f.allowFullscreen=true;f.className=\"absolute top-0 left-0 w-full h-full\";f.title=\"Tailcall Introduction Video\";c.replaceChild(f,pb);return}var cc=e.target.closest(\"button[aria-label*=\'Copy code\']\");if(cc){var pre=cc.closest(\"pre\");var txt=\"\";if(pre){var code=pre.querySelector(\"code\");txt=code?code.innerText:pre.innerText}else{var pc=cc.parentElement;var pp=pc?pc.parentElement:null;if(pp){txt=(pp.innerText||\"\").trim()}}if(txt && navigator.clipboard){navigator.clipboard.writeText(txt);cc.setAttribute(\"data-copied\",\"1\");setTimeout(function(){cc.removeAttribute(\"data-copied\")},1500)}return}var sb=e.target.closest(\".DocSearch-Button\");if(sb){loadMain(function(){try{sb.click()}catch(err){}});return}})})();</script>'

      html = html + vanillaStyle + vanillaScript

      const imagesDir = path.join(outDir, 'assets', 'inline-imgs')
      await fs.mkdir(imagesDir, {recursive: true}).catch(() => {})
      const cache = new Map<string, string>()
      let extractedCount = 0
      let extractedBytes = 0
      html = html.replace(/data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,([A-Za-z0-9+\/=]+)/g, (full, fmt, b64) => {
        if (cache.has(full)) return cache.get(full)!
        const ext = fmt === 'svg+xml' ? 'svg' : (fmt === 'jpeg' ? 'jpg' : fmt)
        const hash = crypto.createHash('sha1').update(b64).digest('hex').slice(0, 12)
        const filename = 'img-' + hash + '.' + ext
        const filepath = path.join(imagesDir, filename)
        const url = '/assets/inline-imgs/' + filename
        try {
          require('node:fs').writeFileSync(filepath, Buffer.from(b64, 'base64'))
        } catch {
          return full
        }
        cache.set(full, url)
        extractedCount++
        extractedBytes += full.length
        return url
      })

      await fs.writeFile(indexPath, html, 'utf8')
      console.log('[home-vanilla] stripped=' + stripped + '; cssSwapped=' + cssSwapped + '; runtimeUrl=' + (runtimeUrl ? 'ok' : 'MISS') + '; mainUrl=' + (mainUrl ? 'ok' : 'MISS') + '; extracted ' + extractedCount + ' data:URI (' + extractedBytes + ' bytes); ' + before + ' -> ' + html.length + ' bytes')
    },
  }
}
