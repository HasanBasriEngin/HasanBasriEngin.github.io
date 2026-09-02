// Builds public/favicon.png — a circular, downscaled crop of public/avatar.png
// (transparent outside the circle, with a 1.5px feathered edge). Pure JS, so
// no image tooling is needed. Run:  npm run gen:favicon
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const dir = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(dir, "../public/avatar.png");
const OUT = resolve(dir, "../public/favicon.png");
const SIZE = 256; // output dimensions

const src = PNG.sync.read(readFileSync(SRC));
const out = new PNG({ width: SIZE, height: SIZE });

const scaleX = src.width / SIZE;
const scaleY = src.height / SIZE;
const c = (SIZE - 1) / 2;
const r = SIZE / 2;

const sample = (sx, sy) => {
  // box average over the source block that maps to one output pixel
  const x0 = Math.floor(sx * scaleX);
  const y0 = Math.floor(sy * scaleY);
  const x1 = Math.min(src.width, Math.ceil((sx + 1) * scaleX));
  const y1 = Math.min(src.height, Math.ceil((sy + 1) * scaleY));
  let rr = 0;
  let gg = 0;
  let bb = 0;
  let n = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (src.width * y + x) << 2;
      rr += src.data[i];
      gg += src.data[i + 1];
      bb += src.data[i + 2];
      n++;
    }
  }
  return [rr / n, gg / n, bb / n];
};

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const i = (SIZE * y + x) << 2;
    const [rr, gg, bb] = sample(x, y);
    const d = Math.hypot(x - c, y - c);
    // feather the last ~1.5px so the circle edge isn't jagged
    let a = 255;
    if (d > r) a = 0;
    else if (d > r - 1.5) a = Math.round(255 * (r - d) / 1.5);
    out.data[i] = Math.round(rr);
    out.data[i + 1] = Math.round(gg);
    out.data[i + 2] = Math.round(bb);
    out.data[i + 3] = a;
  }
}

writeFileSync(OUT, PNG.sync.write(out));
console.log(`favicon.png written (${SIZE}x${SIZE})`);
