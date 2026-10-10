// Generates every logo/icon asset from the master mark (src/assets/brand/signalfill-logo-master.png).
//
// sharp and potrace are NOT project dependencies. Install them temporarily, then run:
//   npm i --no-save sharp potrace
//   node scripts/generate-brand-assets.mjs
//
// Outputs:
//   src/assets/brand/signalfill-mark-{28,56,84}.{webp,png}  header mark at 1x/2x/3x (28px tall)
//   public/favicon.svg                                  traced, simplified silhouette
//   public/favicon-16x16.png, favicon-32x32.png, favicon.ico (16/32/48)  simplified silhouette
//   public/apple-touch-icon.png (180)                   full mark + glow on #0a0a0a
//   public/icon-192.png, icon-512.png                   full mark + glow on #0a0a0a
//   public/icon-maskable-512.png                        same, kept inside the maskable safe zone
//
// AS OF 2026-10-10: this script still WRITES the four home-screen icons above (lines below
// unchanged), but those four files in public/ were manually overridden afterward with a
// separately designed favicon pack (flat navy + blue glow mark on a #08122a background,
// instead of this script's glossy mark on #0a0a0a) - see git history around 2026-10-10 for
// the source. Re-running this script will silently clobber that override back to the old
// look. If you want this script to be the source of truth again, either revert that
// override first or update BG here to #08122a and swap in the new mark art as MASTER.
import { writeFileSync } from "node:fs"
import { promisify } from "node:util"
import sharp from "sharp"
import potrace from "potrace"

const MASTER = "src/assets/brand/signalfill-logo-master.png"
const BRAND_DIR = "src/assets/brand"
const PUBLIC_DIR = "public"
const BG = "#0a0a0a"
const ICON_BLUE = "#3b82f6" // flat favicon fill: reads on light and dark browser tabs
const GLOW_BLUE = { r: 59, g: 130, b: 246 }
const HEADER_HEIGHT = 28

// Tight crop around every non-transparent pixel of the master. Threshold is 16, not 0: some
// exports carry a handful of near-invisible stray pixels (alpha 1-10) scattered out near the
// canvas edges (compression noise), which would otherwise blow the bbox out to the full canvas.
async function trimmedMark() {
  const { data, info } = await sharp(MASTER).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let x0 = info.width, y0 = info.height, x1 = 0, y1 = 0
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 16) {
        if (x < x0) x0 = x
        if (x > x1) x1 = x
        if (y < y0) y0 = y
        if (y > y1) y1 = y
      }
    }
  }
  return sharp(MASTER)
    .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
    .png()
    .toBuffer()
}

// Solid single-colour silhouette of the mark (no circuit lines, no glow), from the opaque core.
async function silhouette(mark, color) {
  const { data, info } = await sharp(mark).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { r, g, b } = hexToRgb(color)
  const out = Buffer.alloc(data.length)
  for (let i = 0; i < data.length; i += 4) {
    out[i] = r
    out[i + 1] = g
    out[i + 2] = b
    out[i + 3] = data[i + 3] > 128 ? 255 : 0
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer()
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

// Fit `buffer` into a square canvas, `scale` of the side, centred.
async function squareIcon(buffer, size, scale, { background, glow = false } = {}) {
  const inner = Math.round(size * scale)
  const fitted = await sharp(buffer)
    .resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  const layers = []
  if (glow) {
    const { data, info } = await sharp(fitted).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const tint = Buffer.alloc(data.length)
    for (let i = 0; i < data.length; i += 4) {
      tint[i] = GLOW_BLUE.r
      tint[i + 1] = GLOW_BLUE.g
      tint[i + 2] = GLOW_BLUE.b
      tint[i + 3] = Math.round(data[i + 3] * 0.55)
    }
    const glowLayer = await sharp(tint, { raw: { width: info.width, height: info.height, channels: 4 } })
      .blur(Math.max(1, size / 40))
      .png()
      .toBuffer()
    layers.push({ input: glowLayer, gravity: "center" })
  }
  layers.push({ input: fitted, gravity: "center" })
  return sharp({
    create: { width: size, height: size, channels: 4, background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite(layers)
    .png()
    .toBuffer()
}

function buildIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  let offset = 6 + 16 * pngs.length
  const entries = pngs.map(({ size, png }) => {
    const entry = Buffer.alloc(16)
    entry[0] = size >= 256 ? 0 : size
    entry[1] = size >= 256 ? 0 : size
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(png.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += png.length
    return entry
  })
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.png)])
}

const mark = await trimmedMark()
const meta = await sharp(mark).metadata()
console.log(`trimmed mark: ${meta.width}x${meta.height}`)

// Header mark at 1x/2x/3x.
for (const scale of [1, 2, 3]) {
  const height = HEADER_HEIGHT * scale
  const resized = sharp(mark).resize({ height })
  await resized.clone().webp({ quality: 90, alphaQuality: 100 }).toFile(`${BRAND_DIR}/signalfill-mark-${height}.webp`)
  await resized.clone().png({ compressionLevel: 9 }).toFile(`${BRAND_DIR}/signalfill-mark-${height}.png`)
}
const headerMeta = await sharp(mark).resize({ height: HEADER_HEIGHT }).toBuffer({ resolveWithObject: true })
console.log(`header mark 1x: ${headerMeta.info.width}x${headerMeta.info.height}`)

// Simplified tab icons.
const flat = await silhouette(mark, ICON_BLUE)
const tabIcons = []
for (const size of [16, 32, 48]) {
  const png = await squareIcon(flat, size, 1)
  tabIcons.push({ size, png })
  if (size !== 48) writeFileSync(`${PUBLIC_DIR}/favicon-${size}x${size}.png`, png)
}
writeFileSync(`${PUBLIC_DIR}/favicon.ico`, buildIco(tabIcons))

// Traced SVG favicon from the silhouette.
const trace = promisify(potrace.trace)
const tracePng = await sharp(flat).resize({ height: 512 }).flatten({ background: "#ffffff" }).png().toBuffer()
const traced = await trace(tracePng, { color: ICON_BLUE, background: "transparent", threshold: 180, turdSize: 20 })
writeFileSync(`${PUBLIC_DIR}/favicon.svg`, traced.replace("<svg ", '<svg role="img" aria-label="SignalFill" '))

// Home-screen icons: full mark with glow on a solid background.
const bg = hexToRgb(BG)
const solid = { ...bg, alpha: 1 }
writeFileSync(`${PUBLIC_DIR}/apple-touch-icon.png`, await squareIcon(mark, 180, 0.7, { background: solid, glow: true }))
writeFileSync(`${PUBLIC_DIR}/icon-192.png`, await squareIcon(mark, 192, 0.7, { background: solid, glow: true }))
writeFileSync(`${PUBLIC_DIR}/icon-512.png`, await squareIcon(mark, 512, 0.7, { background: solid, glow: true }))
// Maskable: the mark's diagonal stays inside the 80% safe-zone circle.
writeFileSync(`${PUBLIC_DIR}/icon-maskable-512.png`, await squareIcon(mark, 512, 0.56, { background: solid, glow: true }))

console.log("brand assets written")
