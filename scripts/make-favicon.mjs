// Generates public/favicon.ico from the FJ monogram so consumers that request
// /favicon.ico (browsers, address bar, crawlers) get the brand mark instead of
// a generic placeholder. Mirrors the design in src/app/(frontend)/icon.tsx.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const svg = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.75" y2="1">
      <stop offset="0" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#6d28d9"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="7" fill="url(#g)"/>
  <text x="16" y="22.5" text-anchor="middle" fill="#ffffff"
        font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="800"
        letter-spacing="-1">FJ</text>
</svg>`;

const sizes = [16, 32, 48];

// Minimal ICO container wrapping PNG payloads (PNG-in-ICO, supported since Vista).
function pngsToIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const { size, buffer } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette colors
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(buffer.length, 8); // image data size
    e.writeUInt32LE(offset, 12); // offset
    offset += buffer.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.buffer)]);
}

const images = [];
for (const size of sizes) {
  const buffer = await sharp(Buffer.from(svg(size)))
    .resize(size, size)
    .png()
    .toBuffer();
  images.push({ size, buffer });
}

// Also emit a standalone 32px PNG so we can eyeball the rendering.
writeFileSync("scripts/favicon-preview.png", images[1].buffer);
writeFileSync("public/favicon.ico", pngsToIco(images));
console.log("Wrote public/favicon.ico", "(" + sizes.join(", ") + " px)");
