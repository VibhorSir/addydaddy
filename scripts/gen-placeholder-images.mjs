import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const DARK = "#0a0a0a";
const PASTELS = ["#f6d9de", "#d9e6f2", "#dceee0", "#f5ecc9"]; // blush, sky, mint, butter

function svgCard({ width, height, label, sub, seed }) {
  // Deterministic pseudo-random offsets from a seed string so each image differs slightly.
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = (n) => (h = (h * 1103515245 + 12345) >>> 0) % n;

  const blobX = 20 + rand(60);
  const blobY = 10 + rand(50);
  const pastel = PASTELS[seed.length % PASTELS.length];

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${DARK}" />
        <stop offset="100%" stop-color="#1a1a1a" />
      </linearGradient>
      <radialGradient id="glow" cx="${blobX}%" cy="${blobY}%" r="60%">
        <stop offset="0%" stop-color="${pastel}" stop-opacity="0.5" />
        <stop offset="100%" stop-color="${pastel}" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <rect width="${width}" height="${height}" fill="url(#glow)" />
    <text x="48" y="${height - 56}" font-family="Arial, sans-serif" font-weight="700" font-size="30" fill="#ffffff">${label}</text>
    <text x="48" y="${height - 24}" font-family="Arial, sans-serif" font-weight="400" font-size="15" fill="#a3a3a3">${sub}</text>
  </svg>`;
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function renderJpg(outPath, opts) {
  const svg = svgCard({ ...opts, label: escapeXml(opts.label), sub: escapeXml(opts.sub) });
  await sharp(Buffer.from(svg)).jpeg({ quality: 78 }).toFile(outPath);
  console.log("wrote", path.relative(ROOT, outPath));
}

const services = [
  ["performance-marketing", "Performance Marketing"],
  ["seo", "Search Engine Optimization"],
  ["social-media", "Social Media Marketing"],
  ["content-creative", "Content & Creative"],
  ["marketing-automation", "Marketing Automation & CRM"],
  ["cro", "Conversion Rate Optimization"],
];

const portfolio = [
  ["lumen-skincare", "Lumen Skincare"],
  ["northpeak-outdoors", "Northpeak Outdoors"],
  ["kavali-foods", "Kavali Foods"],
];

async function main() {
  const servicesDir = path.join(ROOT, "public/images/services");
  const portfolioDir = path.join(ROOT, "public/images/portfolio");
  await mkdir(servicesDir, { recursive: true });
  await mkdir(portfolioDir, { recursive: true });

  for (const [slug, label] of services) {
    await renderJpg(path.join(servicesDir, `${slug}.jpg`), {
      width: 1200,
      height: 900,
      label,
      sub: "Addy Daddy placeholder image",
      seed: slug,
    });
  }

  for (const [slug, label] of portfolio) {
    await renderJpg(path.join(portfolioDir, `${slug}.jpg`), {
      width: 1200,
      height: 900,
      label,
      sub: "Case study placeholder image",
      seed: slug,
    });
  }

  // Open Graph default image
  const ogSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${DARK}" />
        <stop offset="100%" stop-color="#1a1a1a" />
      </linearGradient>
      <radialGradient id="glow1" cx="15%" cy="20%" r="50%">
        <stop offset="0%" stop-color="${PASTELS[3]}" stop-opacity="0.45" />
        <stop offset="100%" stop-color="${PASTELS[3]}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glow2" cx="85%" cy="80%" r="50%">
        <stop offset="0%" stop-color="${PASTELS[1]}" stop-opacity="0.4" />
        <stop offset="100%" stop-color="${PASTELS[1]}" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)" />
    <rect width="1200" height="630" fill="url(#glow1)" />
    <rect width="1200" height="630" fill="url(#glow2)" />
    <text x="80" y="300" font-family="Arial, sans-serif" font-weight="700" font-size="72" fill="#ffffff">Addy<tspan fill="${PASTELS[3]}">Daddy</tspan></text>
    <text x="80" y="360" font-family="Arial, sans-serif" font-weight="400" font-size="28" fill="#d4d4d4">Performance Marketing Agency</text>
  </svg>`;
  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 85 }).toFile(path.join(ROOT, "public/og-image.jpg"));
  console.log("wrote public/og-image.jpg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
