const fs = require('fs')
const puppeteer = require('puppeteer')

const CH_BACKSLASH = 92
const CH_DQUOTE = 34
const CH_SQUOTE = 39
const CH_LBRACE = 123
const CH_RBRACE = 125
const CH_SEMI = 59

function walkRules(text) {
  const rules = []
  const n = text.length
  let i = 0
  while (i < n) {
    while (i < n && (text.charCodeAt(i) <= 32)) i++
    if (i >= n) break
    const ruleStart = i
    let depth = 0
    let inStr = 0
    let lastEsc = false
    while (i < n) {
      const c = text.charCodeAt(i)
      if (lastEsc) { lastEsc = false; i++; continue }
      if (c === CH_BACKSLASH) { lastEsc = true; i++; continue }
      if (inStr) {
        if (c === inStr) inStr = 0
        i++; continue
      }
      if (c === CH_DQUOTE || c === CH_SQUOTE) { inStr = c; i++; continue }
      if (c === CH_LBRACE) { depth++; i++; continue }
      if (c === CH_RBRACE) {
        depth--
        if (depth === 0) { i++; rules.push({start: ruleStart, end: i}); break }
        i++; continue
      }
      if (c === CH_SEMI && depth === 0) {
        i++; rules.push({start: ruleStart, end: i}); break
      }
      i++
    }
    if (depth > 0) break
  }
  return rules
}

function isUsedRange(used, start, end) {
  for (let i = start; i < end; i++) if (used[i]) return true
  return false
}

;(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true,
  })
  const page = await browser.newPage()
  await page.setViewport({width: 412, height: 915, deviceScaleFactor: 2})
  await page.coverage.startCSSCoverage()
  await page.goto(process.env.HOME_URL, {waitUntil: 'networkidle0', timeout: 60000})
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0
      const step = window.innerHeight / 2
      const id = setInterval(() => {
        window.scrollBy(0, step)
        total += step
        if (total >= document.body.scrollHeight) { clearInterval(id); resolve() }
      }, 50)
    })
  })
  await new Promise((r) => setTimeout(r, 1500))
  const coverage = await page.coverage.stopCSSCoverage()
  await browser.close()

  let usedCss = ''
  for (const entry of coverage) {
    if (!entry.text || !entry.url.endsWith('.css')) continue
    const text = entry.text
    const used = new Uint8Array(text.length)
    for (const r of entry.ranges) for (let i = r.start; i < r.end; i++) used[i] = 1
    const rules = walkRules(text)
    let kept = 0
    for (const rule of rules) {
      if (isUsedRange(used, rule.start, rule.end)) { usedCss += text.slice(rule.start, rule.end); kept++ }
    }
    console.log('CSS:', entry.url.split('/').pop(), 'rules:', rules.length, 'kept:', kept, 'bytes so far:', usedCss.length)
  }
  fs.writeFileSync('/tmp/home-used.css', usedCss)
})().catch((e) => { console.error('FAIL:', e.message, e.stack); process.exit(1) })
