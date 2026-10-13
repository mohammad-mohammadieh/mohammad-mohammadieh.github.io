// Generates the small images the site needs from text and tokens only:
//
//   public/favicon-32.png, public/apple-touch-icon.png   (from the "MM" monogram)
//   public/og-home.png, public/og/<project>.png          (1200 x 630 link previews)
//
// Run it with "npm run images" after adding a project or changing a title or
// summary. The link previews are rendered with a Chromium browser that is
// already installed (Edge or Chrome). Nothing is downloaded. Set the BROWSER
// environment variable to the browser's full path if it is not found.
//
// The previews carry text only: no screenshots, logos or client names.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const tmp = join(root, ".tmp-images");

const INK = "#15171c";
const BG = "#f4f5f7";
const MUTED = "#555b66";
const LINE = "#d5d8de";
const ACCENT = "#b93a0b";

// ------------------------------------------------------------------ icons

const monogram = (size, radius) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="${BG}"/>
  <path d="M10 45V19l8.5 13 8.5-13v26M37 45V19l8.5 13 8.5-13v26" fill="none"
        stroke="${INK}" stroke-width="4.5" stroke-linecap="butt" stroke-linejoin="bevel"/>
</svg>`;

await sharp(Buffer.from(monogram(32, 8))).png().toFile(join(pub, "favicon-32.png"));
await sharp(Buffer.from(monogram(180, 0))).png().toFile(join(pub, "apple-touch-icon.png"));
console.log("Wrote public/favicon-32.png and public/apple-touch-icon.png");

// ------------------------------------------------------------ link previews

function findBrowser() {
  const candidates = [
    process.env.BROWSER,
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/microsoft-edge",
  ];
  return candidates.find((path) => path && existsSync(path));
}

const escapeHtml = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const siteData = readFileSync(join(root, "src/data/site.ts"), "utf8");
const pick = (key) => siteData.match(new RegExp(`${key}:\\s*\\n?\\s*"([^"]+)"`))?.[1] ?? "";
const NAME = pick("name");
const ROLE = pick("role");
const LOCATION = pick("location");
const STATEMENT = pick("statement");

const fontUrl = (file) => pathToFileURL(join(pub, "fonts", file)).href;
const page = (body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<style>
  @font-face { font-family: "Plex Sans"; font-weight: 400; font-display: block; src: url("${fontUrl("ibm-plex-sans-latin-400-normal.woff2")}") format("woff2"); }
  @font-face { font-family: "Plex Sans"; font-weight: 500; font-display: block; src: url("${fontUrl("ibm-plex-sans-latin-500-normal.woff2")}") format("woff2"); }
  @font-face { font-family: "Plex Sans"; font-weight: 600; font-display: block; src: url("${fontUrl("ibm-plex-sans-latin-600-normal.woff2")}") format("woff2"); }
  @font-face { font-family: "Plex Mono"; font-weight: 400; font-display: block; src: url("${fontUrl("ibm-plex-mono-latin-400-normal.woff2")}") format("woff2"); }
  @font-face { font-family: "Plex Mono"; font-weight: 500; font-display: block; src: url("${fontUrl("ibm-plex-mono-latin-500-normal.woff2")}") format("woff2"); }
  * { box-sizing: border-box; margin: 0; }
  html, body { background: ${BG}; }
  .card { position: absolute; top: 0; left: 0; width: 1200px; height: 630px; padding: 64px 72px;
          display: flex; flex-direction: column; background: ${BG}; color: ${INK};
          font-family: "Plex Sans", sans-serif; -webkit-font-smoothing: antialiased; }
  .mono { font-family: "Plex Mono", monospace; font-size: 22px; line-height: 1.5; }
  .muted { color: ${MUTED}; }
  .accent { color: ${ACCENT}; font-weight: 500; }
  .name { font-size: 30px; font-weight: 600; line-height: 1.3; }
  .role { font-size: 24px; line-height: 1.4; }
  .statement { margin-top: auto; max-width: 21ch; font-size: 66px; font-weight: 500;
               line-height: 1.12; letter-spacing: -0.015em; }
  .title { margin-top: 14px; max-width: 18ch; font-size: 68px; font-weight: 600;
           line-height: 1.08; letter-spacing: -0.02em; }
  .title.long { font-size: 58px; max-width: 22ch; }
  .summary { margin-top: 26px; max-width: 46ch; font-size: 27px; line-height: 1.4; }
  .foot { margin-top: auto; padding-top: 22px; border-top: 1px solid ${LINE};
          display: flex; justify-content: space-between; gap: 32px; }
  .statement + .foot { margin-top: 44px; }
</style></head><body>${body}</body></html>`;

const homeCard = page(`
<div class="card">
  <p class="name">${escapeHtml(NAME)}</p>
  <p class="role muted">${escapeHtml(`${ROLE}, ${LOCATION}`)}</p>
  <p class="statement">${escapeHtml(STATEMENT)}</p>
  <div class="foot mono muted"><span>Power BI, DAX, Microsoft Fabric, SQL, Power Apps</span></div>
</div>`);

const projectsDir = join(root, "src/content/projects");
const projects = readdirSync(projectsDir)
  .filter((slug) => !slug.startsWith("_") && statSync(join(projectsDir, slug)).isDirectory())
  .map((slug) => {
    const text = readFileSync(join(projectsDir, slug, "index.md"), "utf8");
    const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
    const field = (key) => front.match(new RegExp(`^${key}:\\s*"([^"]*)"`, "m"))?.[1] ?? "";
    return {
      slug,
      title: field("title"),
      summary: field("summary"),
      order: Number(front.match(/^order:\s*(\d+)/m)?.[1] ?? 999),
      draft: /^draft:\s*true\b/m.test(front),
    };
  })
  .filter((project) => !project.draft)
  .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

const cards = [
  { out: join(pub, "og-home.png"), html: homeCard },
  ...projects.map((project, i) => ({
    out: join(pub, "og", `${project.slug}.png`),
    html: page(`
<div class="card">
  <p class="mono accent">Project 2.${i + 1}</p>
  <h1 class="title${project.title.length > 34 ? " long" : ""}">${escapeHtml(project.title)}</h1>
  <p class="summary">${escapeHtml(project.summary)}</p>
  <div class="foot mono muted">
    <span>${escapeHtml(`${NAME}, ${ROLE}`)}</span><span>Shown with synthetic data</span>
  </div>
</div>`),
  })),
];

const browser = findBrowser();
if (!browser) {
  console.error(
    "No Edge or Chrome found, so link previews were not regenerated. Set BROWSER to the browser's full path and run again.",
  );
  process.exit(1);
}

rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
mkdirSync(join(pub, "og"), { recursive: true });

try {
  cards.forEach((card, i) => {
    const htmlFile = join(tmp, `card-${i}.html`);
    const shot = join(tmp, `card-${i}.png`);
    writeFileSync(htmlFile, card.html);
    execFileSync(
      browser,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-first-run",
        "--no-default-browser-check",
        "--force-device-scale-factor=1",
        "--window-size=1200,800",
        "--virtual-time-budget=4000",
        `--user-data-dir=${join(tmp, "profile")}`,
        `--screenshot=${shot}`,
        pathToFileURL(htmlFile).href,
      ],
      { stdio: "ignore", timeout: 60000 },
    );
    card.shot = shot;
  });

  // The window is taller than the card, so the card is cut out at its exact size.
  for (const card of cards) {
    await sharp(card.shot)
      .extract({ left: 0, top: 0, width: 1200, height: 630 })
      .png({ compressionLevel: 9, palette: true, colors: 128 })
      .toFile(card.out);
    const kb = (statSync(card.out).size / 1024).toFixed(0);
    console.log(`Wrote ${card.out.slice(root.length + 1).replace(/\\/g, "/")} (${kb} KB)`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
