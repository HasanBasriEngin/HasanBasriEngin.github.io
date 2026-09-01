// Regenerates public/qr.svg — a QR code that points at the live site.
// Run:  npm run gen:qr
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const SITE_URL = "https://hasanbasriengin.github.io/";

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, "../public/qr.svg");

const svg = await QRCode.toString(SITE_URL, {
  type: "svg",
  margin: 1,
  color: { dark: "#0a0a0a", light: "#00000000" },
  errorCorrectionLevel: "M",
});

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, svg);
console.log(`qr.svg written for ${SITE_URL}`);
