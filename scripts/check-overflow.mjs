// Checks every page for real horizontal overflow (document.documentElement.scrollWidth >
// viewport width) across a set of widths and both themes. Requires the dev server running
// (`npm run dev`) and a locally installed Chromium-based browser - puppeteer-core doesn't
// bundle or download one.
//
// IMPORTANT: use puppeteer-core's real viewport emulation (page.setViewport), not a plain
// headless-browser CLI screenshot (`--window-size` + `--screenshot`). That CLI combo does not
// reliably emulate a narrow CSS viewport - it has been observed rendering pages as if laid out
// wider than requested, then cropping the capture, which looks exactly like a horizontal
// overflow bug but isn't one. page.setViewport() uses the browser's real viewport-emulation
// protocol and reflects actual layout.
//
// Usage:
//   npm run check:overflow
//   CHECK_URL=http://localhost:5174 npm run check:overflow   (if the dev server picked a
//     different port because 5173 was already in use)
//   EDGE_PATH="C:\path\to\msedge.exe" npm run check:overflow  (override browser location)
import { existsSync } from "node:fs"
import puppeteer from "puppeteer-core"

const BASE_URL = process.env.CHECK_URL || "http://localhost:5173"
const WIDTHS = [320, 360, 375, 390, 414, 768]
const PAGES = ["/", "/privacy", "/terms", "/contact"]
const THEMES = ["light", "dark"]
const HEIGHT = 1000
const SETTLE_MS = 400

function findBrowser() {
  if (process.env.EDGE_PATH) return process.env.EDGE_PATH
  const candidates = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "/usr/bin/microsoft-edge",
    "/usr/bin/google-chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ]
  const found = candidates.find((p) => existsSync(p))
  if (!found) {
    console.error(
      "No local Chromium-based browser found. Set EDGE_PATH to your browser's executable.",
    )
    process.exit(1)
  }
  return found
}

const browser = await puppeteer.launch({ executablePath: findBrowser(), headless: true })
const page = await browser.newPage()

const failures = []
let total = 0

for (const theme of THEMES) {
  for (const width of WIDTHS) {
    for (const path of PAGES) {
      total++
      await page.setViewport({ width, height: HEIGHT })
      await page.evaluateOnNewDocument((t) => {
        try {
          localStorage.setItem("theme", t)
        } catch {
          // Storage can be blocked; the check still runs against whatever theme loads.
        }
      }, theme)

      try {
        await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle0", timeout: 15000 })
      } catch (error) {
        console.error(`Could not load ${BASE_URL}${path} - is the dev server running?`)
        console.error(String(error))
        process.exit(1)
      }
      await new Promise((resolve) => setTimeout(resolve, SETTLE_MS))

      const result = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth
        const viewportWidth = window.innerWidth
        if (docWidth <= viewportWidth) return { overflow: false }

        const offenderEls = new Set()
        for (const el of document.querySelectorAll("body *")) {
          const rect = el.getBoundingClientRect()
          if (rect.width === 0 && rect.height === 0) continue
          if (rect.right - viewportWidth > 2 || -rect.left > 2) offenderEls.add(el)
        }
        const roots = [...offenderEls].filter((el) => !offenderEls.has(el.parentElement))
        return {
          overflow: true,
          docWidth,
          viewportWidth,
          roots: roots.slice(0, 5).map((el) => ({
            tag: el.tagName,
            cls: typeof el.className === "string" ? el.className.slice(0, 120) : "",
            text: (el.textContent || "").trim().slice(0, 50),
          })),
        }
      })

      if (result.overflow) {
        failures.push({ theme, width, path, ...result })
        console.log(`FAIL  theme=${theme} width=${width} path=${path}`)
        for (const r of result.roots) console.log(`      <${r.tag} class="${r.cls}"> "${r.text}"`)
      }
    }
  }
}

await browser.close()

console.log(`\n${total} checks run (${WIDTHS.length} widths x ${PAGES.length} pages x ${THEMES.length} themes).`)
if (failures.length > 0) {
  console.log(`${failures.length} FAILED - see above.`)
  process.exit(1)
}
console.log("PASS - no horizontal overflow found.")
