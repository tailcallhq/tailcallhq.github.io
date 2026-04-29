import path from 'node:path'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import type {Plugin} from '@docusaurus/types'

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

      const runtimeMatch = html.match(/<script\s+src=(\/assets\/js\/runtime~main\.[^>]*?)\s+defer><\/script>/)
      const mainMatch = html.match(/<script\s+src=(\/assets\/js\/main\.[^>]*?)\s+defer><\/script>/)
      const preloadMatches = html.match(/<link\s+rel=preload\s+href=\/assets\/js\/[^>]*as=script[^>]*>/g) || []
      const modulePreloadMatches = html.match(/<link\s+rel=modulepreload\s+href=\/assets\/js\/[^>]*>/g) || []

      let lazyHydrated = false
      if (runtimeMatch && mainMatch) {
        const runtimeSrc = runtimeMatch[1]
        const mainSrc = mainMatch[1]
        for (const p of preloadMatches) html = html.replace(p, '')
        for (const p of modulePreloadMatches) html = html.replace(p, '')
        const lazyScript = '<script>(function(){var loaded=false;function load(){if(loaded)return;loaded=true;var r=document.createElement("script");r.src="' + runtimeSrc + '";r.onload=function(){var m=document.createElement("script");m.src="' + mainSrc + '";document.body.appendChild(m)};document.body.appendChild(r)}var ev=["mousedown","touchstart","pointerdown","click"];function once(e){ev.forEach(function(x){window.removeEventListener(x,once,{passive:true,capture:true})});load()}ev.forEach(function(x){window.addEventListener(x,once,{passive:true,capture:true})});/* hydrate only on user interaction */})()</script>'
        html = html.replace(runtimeMatch[0], '')
        html = html.replace(mainMatch[0], lazyScript)
        lazyHydrated = true
      }

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
      console.log('[lazy-hydrate-home] lazyHydrated=' + lazyHydrated + '; extracted ' + extractedCount + ' data:URI (' + extractedBytes + ' bytes); ' + before + ' -> ' + html.length + ' bytes')
    },
  }
}
