// Regenerates public/topo.svg — an organic contour-line (izohips) field.
//
// It's the contour set of ONE irregular radial height field, so the lines are
// lumpy and non-parallel but, like real contour lines, never cross: after the
// wobble is applied, each level's radius is clamped to stay at least MIN_GAP
// outside the level below it. Run:  npm run gen:topo
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
const rnd = mulberry32(20260921);
const rr = (lo, hi) => lo + (hi - lo) * rnd();

const W = 440;
const H = 440;
const COLOR = "#6CFF00";
const STROKE = 1.9;
const SAMPLES = 160;
const LEVELS = 8;
const MIN_GAP = 10; // safety floor on spacing -> contours never cross

const cx = 200;
const cy = 262;

// broad, low-frequency harmonics -> organic lumps rather than ovals
const harm = [
  [2, rr(13, 19)],
  [3, rr(8, 13)],
  [4, rr(4, 7)],
  [5, rr(1.5, 3.5)],
].map(([k, amp]) => ({ k, amp, ph: rr(0, Math.PI * 2) }));

// base radius per level, spacing wide enough that the (near-constant) wobble
// never makes two levels touch on its own
const baseR = [];
let acc = 12;
for (let L = 0; L < LEVELS; L++) {
  acc += 30 + 20 * (0.5 + 0.5 * Math.sin(L * 0.8 + 1.3));
  baseR.push(acc);
}

// r[level][sample]: the SAME lumpy shape at each level (only a hair of drift),
// so the contours run roughly parallel like real izohips and don't intersect
const r = [];
for (let L = 0; L < LEVELS; L++) {
  const row = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = (i / SAMPLES) * Math.PI * 2;
    let rad = baseR[L];
    for (const { k, amp, ph } of harm) {
      rad += amp * (0.85 + L * 0.03) * Math.sin(k * t + ph + L * 0.05);
    }
    row.push(rad);
  }
  r.push(row);
}

// clamp each level to sit strictly outside the one below -> contours never cross
for (let L = 1; L < LEVELS; L++) {
  for (let i = 0; i <= SAMPLES; i++) {
    if (r[L][i] < r[L - 1][i] + MIN_GAP) r[L][i] = r[L - 1][i] + MIN_GAP;
  }
}

const paths = r.map((row) => {
  let d = "";
  for (let i = 0; i <= SAMPLES; i++) {
    const t = (i / SAMPLES) * Math.PI * 2;
    const x = cx + row[i] * Math.cos(t);
    const y = cy + row[i] * Math.sin(t);
    d += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
  }
  return `<path d="${d}Z"/>`;
});

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n` +
  `<g fill="none" stroke="${COLOR}" stroke-width="${STROKE}" stroke-linejoin="round">\n` +
  paths.join("\n") +
  `\n</g>\n</svg>\n`;

writeFileSync(OUT, svg);
console.log(`topo.svg written (${paths.length} contours, ${svg.length} bytes)`);
