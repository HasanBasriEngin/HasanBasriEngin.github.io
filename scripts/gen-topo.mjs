// Regenerates public/topo.svg — a real contour-line (izohips) field.
//
// A tileable 2-D height field is built as a sum of sine waves with integer
// wavenumbers (so it wraps seamlessly), then iso-contours are traced with
// marching squares and stitched into polylines. Contours of one continuous
// field meander, branch, form saddles and closed loops — and never cross.
// Run:  npm run gen:topo
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../public/topo.svg");

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20261002);
const rr = (lo, hi) => lo + (hi - lo) * rnd();
const ri = (lo, hi) => Math.floor(rr(lo, hi + 1));

const W = 640;
const H = 640;
const GRID = 128; // field sampling resolution
const LEVELS = 9;
const COLOR = "#6CFF00";
const STROKE = 1.8;

// ---- tileable height field: sum of sines, integer wavenumbers ----
const waves = [];
for (let n = 0; n < 4; n++)
  waves.push({ kx: ri(1, 3), ky: ri(1, 3), ph: rr(0, 6.283), amp: rr(0.8, 1.4) });
for (let n = 0; n < 5; n++)
  waves.push({ kx: ri(2, 6), ky: ri(2, 6), ph: rr(0, 6.283), amp: rr(0.25, 0.55) });
for (let n = 0; n < 6; n++)
  waves.push({ kx: ri(4, 11), ky: ri(4, 11), ph: rr(0, 6.283), amp: rr(0.06, 0.18) });

const field = (fx, fy) => {
  let h = 0;
  for (const w of waves)
    h += w.amp * Math.sin(2 * Math.PI * (w.kx * fx + w.ky * fy) + w.ph);
  return h;
};

// ---- sample grid (wraps: index GRID == index 0 in value) ----
const g = [];
let mn = Infinity;
let mx = -Infinity;
for (let j = 0; j <= GRID; j++) {
  const row = [];
  for (let i = 0; i <= GRID; i++) {
    const v = field(i / GRID, j / GRID);
    row.push(v);
    if (i < GRID && j < GRID) {
      if (v < mn) mn = v;
      if (v > mx) mx = v;
    }
  }
  g.push(row);
}

const levels = [];
for (let l = 0; l < LEVELS; l++) levels.push(mn + (mx - mn) * ((l + 0.5) / LEVELS));

// ---- marching squares ----
const cw = W / GRID;
const ch = H / GRID;
const lerp = (a, b, va, vb, lvl) => a + (b - a) * ((lvl - va) / (vb - va));

function segmentsFor(lvl) {
  const segs = [];
  for (let j = 0; j < GRID; j++) {
    for (let i = 0; i < GRID; i++) {
      const v0 = g[j][i];
      const v1 = g[j][i + 1];
      const v2 = g[j + 1][i + 1];
      const v3 = g[j + 1][i];
      let idx = 0;
      if (v0 > lvl) idx |= 1;
      if (v1 > lvl) idx |= 2;
      if (v2 > lvl) idx |= 4;
      if (v3 > lvl) idx |= 8;
      if (idx === 0 || idx === 15) continue;
      const x0 = i * cw;
      const x1 = (i + 1) * cw;
      const y0 = j * ch;
      const y1 = (j + 1) * ch;
      const top = () => [lerp(x0, x1, v0, v1, lvl), y0];
      const right = () => [x1, lerp(y0, y1, v1, v2, lvl)];
      const bottom = () => [lerp(x0, x1, v3, v2, lvl), y1];
      const left = () => [x0, lerp(y0, y1, v0, v3, lvl)];
      const P = (a, b) => segs.push([a, b]);
      switch (idx) {
        case 1:
        case 14:
          P(left(), top());
          break;
        case 2:
        case 13:
          P(top(), right());
          break;
        case 3:
        case 12:
          P(left(), right());
          break;
        case 4:
        case 11:
          P(right(), bottom());
          break;
        case 6:
        case 9:
          P(top(), bottom());
          break;
        case 7:
        case 8:
          P(left(), bottom());
          break;
        case 5: {
          if ((v0 + v1 + v2 + v3) / 4 > lvl) {
            P(left(), top());
            P(right(), bottom());
          } else {
            P(top(), right());
            P(left(), bottom());
          }
          break;
        }
        case 10: {
          if ((v0 + v1 + v2 + v3) / 4 > lvl) {
            P(top(), right());
            P(left(), bottom());
          } else {
            P(left(), top());
            P(right(), bottom());
          }
          break;
        }
      }
    }
  }
  return segs;
}

// ---- stitch segments into polylines ----
const key = (p) => Math.round(p[0] * 10) + "," + Math.round(p[1] * 10);

function chain(segs) {
  const map = new Map();
  segs.forEach((s, i) => {
    for (const p of s) {
      const k = key(p);
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(i);
    }
  });
  const used = new Array(segs.length).fill(false);
  const polys = [];
  const nextFrom = (k) => (map.get(k) || []).find((si) => !used[si]);

  for (let i = 0; i < segs.length; i++) {
    if (used[i]) continue;
    used[i] = true;
    const pts = [segs[i][0].slice(), segs[i][1].slice()];
    for (let guard = 0; guard < 200000; guard++) {
      const c = nextFrom(key(pts[pts.length - 1]));
      if (c == null) break;
      used[c] = true;
      const s = segs[c];
      pts.push((key(s[0]) === key(pts[pts.length - 1]) ? s[1] : s[0]).slice());
    }
    for (let guard = 0; guard < 200000; guard++) {
      const c = nextFrom(key(pts[0]));
      if (c == null) break;
      used[c] = true;
      const s = segs[c];
      pts.unshift((key(s[0]) === key(pts[0]) ? s[1] : s[0]).slice());
    }
    if (pts.length >= 4) polys.push(pts);
  }
  return polys;
}

const out = [];
for (const lvl of levels) {
  for (const p of chain(segmentsFor(lvl))) {
    let d = "M" + p[0][0].toFixed(1) + " " + p[0][1].toFixed(1);
    for (let i = 1; i < p.length; i++)
      d += "L" + p[i][0].toFixed(1) + " " + p[i][1].toFixed(1);
    out.push(`<path d="${d}"/>`);
  }
}

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n` +
  `<g fill="none" stroke="${COLOR}" stroke-width="${STROKE}" stroke-linejoin="round" stroke-linecap="round">\n` +
  out.join("") +
  `\n</g>\n</svg>\n`;

writeFileSync(OUT, svg);
console.log(`topo.svg written (${out.length} paths, ${(svg.length / 1024).toFixed(1)} KB)`);
