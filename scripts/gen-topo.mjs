// Regenerates public/topo.svg — an organic contour-line (izohips) field.
// Each contour is a closed polar curve r(theta) distorted by several sine
// harmonics whose amplitude grows and phase drifts per level, so the rings
// are lumpy and NOT parallel ellipses. Run:  npm run gen:topo
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, "../public/topo.svg");

// deterministic PRNG so the pattern is stable across regenerations
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20260904);
const rr = (lo, hi) => lo + (hi - lo) * rnd();

const W = 620;
const H = 620;
const COLOR = "#6ee7b7";
const paths = [];

function loop(cx, cy, r0, harmonics, samples = 132) {
  let d = "";
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    let rad = r0;
    for (const [k, amp, ph] of harmonics) rad += amp * Math.sin(k * t + ph);
    const x = cx + rad * Math.cos(t);
    const y = cy + rad * Math.sin(t);
    d += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
  }
  return `<path d="${d}Z"/>`;
}

// two hills + one saddle between them
const peaks = [
  { cx: rr(150, 210), cy: rr(170, 240), levels: 9 },
  { cx: rr(410, 480), cy: rr(390, 470), levels: 9 },
  { cx: rr(330, 380), cy: rr(90, 150), levels: 6 },
];

for (const p of peaks) {
  // low frequencies dominate (broad organic lumps); high frequencies are
  // small, just surface texture — avoids sharp star points.
  const base = [
    [2, rr(7, 12)],
    [3, rr(4.5, 8)],
    [4, rr(2.5, 5)],
    [5, rr(1.4, 3)],
    [7, rr(0.6, 1.6)],
  ].map(([k, amp]) => [k, amp, rr(0, 6.28)]);

  for (let L = 1; L <= p.levels; L++) {
    // contour spacing tightens on "steep" bands and opens on flat ones
    const step = 12 + 22 * (0.55 + 0.45 * Math.sin(L * 0.7 + p.cx));
    const r0 = 10 + L * step;
    // amplitude grows gently with level, phase drifts -> non-parallel rings
    const harm = base.map(([k, amp, ph]) => [
      k,
      amp * (0.6 + L * 0.09),
      ph + L * 0.1,
    ]);
    paths.push(loop(p.cx, p.cy, r0, harm));
  }
}

// a few open meander lines running across the tile
for (let m = 0; m < 4; m++) {
  const y0 = rr(50, H - 50);
  const a1 = rr(16, 46);
  const a2 = rr(6, 20);
  const k1 = rr(1.6, 3.2);
  const k2 = rr(4, 7);
  const ph1 = rr(0, 6.28);
  const ph2 = rr(0, 6.28);
  let d = "";
  for (let x = -24; x <= W + 24; x += 7) {
    const u = (x / W) * Math.PI * 2;
    const y = y0 + a1 * Math.sin(k1 * u + ph1) + a2 * Math.sin(k2 * u + ph2);
    d += (x <= -24 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
  }
  paths.push(`<path d="${d}"/>`);
}

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n` +
  `<g fill="none" stroke="${COLOR}" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round">\n` +
  paths.join("\n") +
  `\n</g>\n</svg>\n`;

writeFileSync(OUT, svg);
console.log(`topo.svg written (${paths.length} contours, ${svg.length} bytes)`);
