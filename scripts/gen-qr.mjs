// Regenerates the QR codes that point at the live site.
// Run:  npm run gen:qr
//
//   public/qr.svg        transparent background, used in the page footer
//   public/qr-share.png  white background, 1024px, for printing / sharing
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const SITE_URL = "https://hasanbasriengin.github.io/";

const here = dirname(fileURLToPath(import.meta.url));
const pub = resolve(here, "../public");
mkdirSync(pub, { recursive: true });

const svg = await QRCode.toString(SITE_URL, {
  type: "svg",
  margin: 1,
  color: { dark: "#0a0a0a", light: "#00000000" },
  errorCorrectionLevel: "M",
});
writeFileSync(resolve(pub, "qr.svg"), svg);

const png = await QRCode.toBuffer(SITE_URL, {
  type: "png",
  width: 1024,
  margin: 3,
  color: { dark: "#0a0a0a", light: "#ffffffff" },
  errorCorrectionLevel: "M",
});
writeFileSync(resolve(pub, "qr-share.png"), png);

console.log(`QR codes written for ${SITE_URL}`);
