// Generates every favicon/home-screen icon from the vector mark (paths copied from
// src/components/logo.tsx - that's the source of truth now; this script has no potrace step
// because we have real vector paths, not a raster to trace). The header/footer mark itself
// is NOT generated here - it's inline SVG + CSS animation directly in logo.tsx, no raster
// export needed.
//
// sharp is NOT a project dependency. Install it temporarily, then run:
//   npm i --no-save sharp
//   node scripts/generate-brand-assets.mjs
//
// Outputs:
//   public/favicon.svg                                  flat blue silhouette (no heartbeat detail, no glow)
//   public/favicon-16x16.png, favicon-32x32.png, favicon.ico (16/32/48)  same, simplified for tiny sizes
//   public/apple-touch-icon.png (180)                   full mark (navy + heartbeat) + static glow on #0a0a0a
//   public/icon-192.png, icon-512.png                   same
//   public/icon-maskable-512.png                        same, kept inside the maskable safe zone
import { writeFileSync } from "node:fs"
import sharp from "sharp"

const PUBLIC_DIR = "public"
const BG = "#0a0a0a"
const NAVY = "#002050"
const HEARTBEAT = "#d9f5ff"
const ICON_BLUE = "#3b82f6" // flat favicon fill: reads on light and dark browser tabs
const GLOW_BLUE = { r: 59, g: 130, b: 246 }

const RIBBON_PATH =
  "M 370.742 49.374 C 358.051 64.074, 339.399 72.687, 307.428 78.610 C 305.818 78.909, 300.225 79.780, 295 80.547 C 267.854 84.530, 233.116 92.418, 222.500 97.009 C 221.400 97.485, 219.375 98.171, 218 98.533 C 216.625 98.896, 208.668 102.526, 200.317 106.600 C 169.425 121.670, 146.879 143.664, 138.248 167.150 L 135.546 174.500 135.228 223.371 L 134.910 272.242 144.205 271.807 C 156.383 271.236, 165.752 268.025, 179.500 259.710 C 180.600 259.044, 181.725 258.269, 182 257.986 C 182.275 257.704, 184.913 255.482, 187.862 253.049 C 190.811 250.617, 198.324 242.266, 204.557 234.492 C 226.545 207.071, 246.023 193.015, 273 185.101 C 285.585 181.409, 286.137 181.264, 298 178.536 C 344.341 167.879, 366.194 152.605, 374.780 124.869 C 376.610 118.960, 377.912 46.512, 376.219 44.819 C 375.763 44.363, 373.299 46.413, 370.742 49.374 Z"
const PANEL_PATH =
  "M 358 227.579 C 349.475 231.156, 341.600 234.476, 340.500 234.958 C 339.400 235.440, 335.350 237.187, 331.500 238.840 C 327.650 240.492, 320.450 243.657, 315.500 245.871 C 310.550 248.086, 303.238 251.271, 299.250 252.949 C 283.095 259.748, 278.254 261.824, 273 264.209 C 269.975 265.581, 263 268.631, 257.500 270.986 C 242.894 277.238, 236.700 279.969, 234.929 280.935 C 234.066 281.407, 230.241 283.017, 226.429 284.514 C 222.618 286.010, 216.197 288.757, 212.161 290.617 C 208.124 292.478, 204.481 294, 204.065 294 C 203.648 294, 202.001 294.646, 200.404 295.436 C 196.601 297.316, 156.075 315, 155.568 315 C 155.354 315, 151.876 316.499, 147.839 318.331 C 143.803 320.163, 139.262 322.178, 137.750 322.809 L 135 323.957 135 390.420 C 135 439.489, 135.301 457.068, 136.152 457.594 C 137.486 458.418, 374.772 458.259, 376.109 457.433 C 376.622 457.115, 377 406.886, 377 338.941 C 377 227.268, 376.907 221.002, 375.250 221.038 C 374.288 221.059, 366.525 224.003, 358 227.579 Z"
const HEARTBEAT_PATH = "M 193,371 L 222,371 L 240,332 L 267,400 L 285,371 L 346,371"

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

async function rasterize(svg, size) {
  return sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()
}

// Flat, single-colour silhouette (no heartbeat detail) for tiny tab icons.
function flatSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="${RIBBON_PATH}" fill="${color}"/>
    <path d="${PANEL_PATH}" fill="${color}"/>
  </svg>`
}

// Full mark (navy + pale heartbeat line), no glow - used as the source for the glow composite.
function fullMarkSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="${RIBBON_PATH}" fill="${NAVY}"/>
    <path d="${PANEL_PATH}" fill="${NAVY}"/>
    <path d="${HEARTBEAT_PATH}" fill="none" stroke="${HEARTBEAT}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
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

// Fit a rasterized mark into a square canvas, `scale` of the side, centred, with an optional
// solid background and an optional soft blurred glow behind it (for static icon files - the
// live header mark's glow is CSS/animation instead, see logo.tsx).
async function squareIcon(markPng, size, scale, { background, glow = false } = {}) {
  const inner = Math.round(size * scale)
  const fitted = await sharp(markPng)
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

// Simplified tab icons: flat blue silhouette, no heartbeat line, no glow.
const flatSvgMarkup = flatSvg(ICON_BLUE)
const flat512 = await rasterize(flatSvgMarkup, 512)
const tabIcons = []
for (const size of [16, 32, 48]) {
  const png = await squareIcon(flat512, size, 1)
  tabIcons.push({ size, png })
  if (size !== 48) writeFileSync(`${PUBLIC_DIR}/favicon-${size}x${size}.png`, png)
}
writeFileSync(`${PUBLIC_DIR}/favicon.ico`, buildIco(tabIcons))

// SVG favicon: the same flat silhouette, as real vector paths (crisp at any size).
writeFileSync(
  `${PUBLIC_DIR}/favicon.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="SignalFill">
  <path d="${RIBBON_PATH}" fill="${ICON_BLUE}"/>
  <path d="${PANEL_PATH}" fill="${ICON_BLUE}"/>
</svg>
`,
)

// Home-screen icons: full mark with a static baked glow on a solid background (no CSS
// available for an OS-rendered icon file, unlike the live header mark).
const fullMark = await rasterize(fullMarkSvg(), 512)
const bg = { ...hexToRgb(BG), alpha: 1 }
writeFileSync(`${PUBLIC_DIR}/apple-touch-icon.png`, await squareIcon(fullMark, 180, 0.7, { background: bg, glow: true }))
writeFileSync(`${PUBLIC_DIR}/icon-192.png`, await squareIcon(fullMark, 192, 0.7, { background: bg, glow: true }))
writeFileSync(`${PUBLIC_DIR}/icon-512.png`, await squareIcon(fullMark, 512, 0.7, { background: bg, glow: true }))
// Maskable: smaller scale so the mark's diagonal stays inside the 80% safe-zone circle.
writeFileSync(
  `${PUBLIC_DIR}/icon-maskable-512.png`,
  await squareIcon(fullMark, 512, 0.56, { background: bg, glow: true }),
)

console.log("brand assets written")
