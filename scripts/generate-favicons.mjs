import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const BG = [0x0a, 0x0a, 0x0a, 0xff]; // near-black
const FG = [0x25, 0x63, 0xeb, 0xff]; // blue-600

// Classic 5x7 dot-matrix glyphs, 1 = foreground pixel
const T = [
  "11111",
  "00100",
  "00100",
  "00100",
  "00100",
  "00100",
  "00100",
];
// Single "T" monogram for Tavynq.
const GLYPH_W = T[0].length; // 5
const GLYPH_H = T.length; // 7

const MASK = T.map((line) => line.split("").map((c) => c === "1"));

// Glyph fills ~60% of the icon along its longest side, centered.
function glyphScale(size) {
  return Math.max(1, Math.floor((size * 0.6) / Math.max(GLYPH_W, GLYPH_H)));
}

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      t[n] = c >>> 0;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function renderPng(size) {
  const rgba = Buffer.alloc(size * size * 4);

  const scale = glyphScale(size);
  const glyphPxW = GLYPH_W * scale;
  const glyphPxH = GLYPH_H * scale;
  const offsetX = Math.floor((size - glyphPxW) / 2);
  const offsetY = Math.floor((size - glyphPxH) / 2);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let color = BG;

      const gx = Math.floor((x - offsetX) / scale);
      const gy = Math.floor((y - offsetY) / scale);
      if (
        x >= offsetX && x < offsetX + glyphPxW &&
        y >= offsetY && y < offsetY + glyphPxH &&
        MASK[gy] && MASK[gy][gx]
      ) {
        color = FG;
      }

      const idx = (y * size + x) * 4;
      rgba[idx] = color[0];
      rgba[idx + 1] = color[1];
      rgba[idx + 2] = color[2];
      rgba[idx + 3] = color[3];
    }
  }

  // Build raw scanlines with filter-type 0 (None) prefix per row.
  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    const rowStart = y * (1 + size * 4);
    raw[rowStart] = 0;
    rgba.copy(raw, rowStart + 1, y * size * 4, (y + 1) * size * 4);
  }

  const idatData = deflateSync(raw, { level: 9 });

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", idatData),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function buildIco(sizes, outPath) {
  const images = sizes.map((s) => renderPng(s));
  const headerSize = 6;
  const entrySize = 16;
  const dirSize = headerSize + entrySize * images.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = dirSize;
  const entries = [];
  for (let i = 0; i < images.length; i++) {
    const size = sizes[i];
    const img = images[i];
    const entry = Buffer.alloc(entrySize);
    entry[0] = size >= 256 ? 0 : size;
    entry[1] = size >= 256 ? 0 : size;
    entry[2] = 0; // color palette
    entry[3] = 0; // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(img.length, 8); // bytes in resource
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += img.length;
  }

  const out = Buffer.concat([header, ...entries, ...images]);
  writeFileSync(outPath, out);
}

const outDir = process.argv[2];

const sizes = [16, 32, 48, 180, 192, 512];
for (const size of sizes) {
  const png = renderPng(size);
  let name;
  if (size === 16) name = "favicon-16x16.png";
  else if (size === 32) name = "favicon-32x32.png";
  else if (size === 180) name = "apple-touch-icon.png";
  else if (size === 192) name = "icon-192.png";
  else if (size === 512) name = "icon-512.png";
  else continue;
  writeFileSync(`${outDir}/${name}`, png);
  console.log(`wrote ${name} (${png.length} bytes)`);
}

buildIco([16, 32, 48], `${outDir}/favicon.ico`);
console.log("wrote favicon.ico");

function buildSvg(outPath) {
  const size = 512;
  const cell = glyphScale(size);
  const offsetX = Math.floor((size - GLYPH_W * cell) / 2);
  const offsetY = Math.floor((size - GLYPH_H * cell) / 2);
  const hex = (c) => "#" + c.slice(0, 3).map((v) => v.toString(16).padStart(2, "0")).join("");
  const rects = [];
  MASK.forEach((row, y) =>
    row.forEach((on, x) => {
      if (on) {
        rects.push(`<rect x="${offsetX + x * cell}" y="${offsetY + y * cell}" width="${cell}" height="${cell}"/>`);
      }
    }),
  );
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Tavynq">`,
    `  <rect width="${size}" height="${size}" rx="110" fill="${hex(BG)}"/>`,
    `  <g fill="${hex(FG)}">${rects.join("")}</g>`,
    "</svg>",
    "",
  ].join("\n");
  writeFileSync(outPath, svg);
}

buildSvg(`${outDir}/favicon.svg`);
console.log("wrote favicon.svg");
